import { useState, useEffect } from "react";
import Header from "./Header";

export default function BestAttacks() {
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemons() {
      setIsLoading(true);
      setError(null);
      let pokemons = [];
      let page = 1;
      while (pokemons.length < 150) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=50&page=${page}`
          );
          const data = await response.json();

          const fetchedPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
              const pokemonDataResponse = await fetch(pokemon.url);
              const pokemonData = await pokemonDataResponse.json();
              return {
                id: pokemonData.id,
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

          // Filter pokemons whose Defense stat is over 99
          const defensivePokemons = fetchedPokemons.filter((pokemon) =>
            pokemon.stats.some(
              (stat) => stat.name === "defense" && stat.base >= 100
            )
          );

          pokemons = [...pokemons, ...defensivePokemons];
        } catch (error) {
          setError(error.message);
          break;
        }
        page++;
      }
      setIsLoading(false);
      setLoadedPokemons(pokemons.slice(0, 150)); // Ensure only 150 pokemons are set
    }

    fetchPokemons();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <ul id="pokemons">
        <h3 id="component-header">Best Attacks</h3>
        {loadedPokemons.map((pokemon) => (
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
        ))}
      </ul>
    </div>
  );
}
