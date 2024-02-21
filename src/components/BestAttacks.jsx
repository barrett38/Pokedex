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
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=150`
        );
        const data = await response.json();

        const pokemons = await Promise.all(
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

        // Filter pokemons whose Attack stat is over 99
        const strongPokemons = pokemons.filter((pokemon) =>
          pokemon.stats.some(
            (stat) => stat.name === "attack" && stat.base >= 110
          )
        );

        setLoadedPokemons(strongPokemons);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
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
        {loadedPokemons.map((pokemon) => (
          <li key={pokemon.id}>
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
