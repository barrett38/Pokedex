import { useState, useEffect } from "react";
import Header from "./Header";

export default function BestDefense() {
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [defensivePokemons, setDefensivePokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    getDefensivePokemon();
  }, [loadedPokemons]);

  async function fetchPokemons() {
    for (let i = 0; i < 12; i++) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=100&offset=${i * 100}`
      );

      const data = await response.json();
      const pokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonDataResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonDataResponse.json();
          return {
            name: pokemon.name,
            image: pokemonData.sprites.front_default,
            abilities: pokemonData.abilities.map((a) => a.ability.name),
            stats: pokemonData.stats.map((s) => ({
              name: s.stat.name,
              base: s.base_stat,
            })),
            types: pokemonData.types.map((t) => t.type.name),
          };
        })
      );

      setLoadedPokemons((prevPokemons) => [...prevPokemons, ...pokemons]);
    }
  }

  function getDefensivePokemon() {
    const defensive = loadedPokemons.filter(
      (pokemon) => pokemon.stats.find((s) => s.name === "defense").base >= 110
    );
    setDefensivePokemons(defensive);
  }

  return (
    <div>
      <Header />
      <h3 id="component-header">Best </h3>
      <ul id="pokemons">
        {defensivePokemons.map((pokemon, index) => (
          <li key={index}>
            <div className="pokemon-card">
              <div>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="pokemon-image"
                />
                <h2>{pokemon.name}</h2>
              </div>

              <div className="pokemon-card-parts">
                <h3>Abilities</h3>
                <ul>
                  {pokemon.abilities.map((ability, index) => (
                    <li key={index}>{ability}</li>
                  ))}
                </ul>
              </div>

              <div className="pokemon-card-parts">
                <h3>Stats</h3>
                <ul>
                  {pokemon.stats.map((stat, index) => (
                    <li key={index}>
                      {stat.name}: {stat.base}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pokemon-card-parts">
                <h3>Types</h3>
                <ul>
                  {pokemon.types.map((type, index) => (
                    <li key={index}>{type}</li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
