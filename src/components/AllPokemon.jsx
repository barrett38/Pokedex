import { useState, useEffect } from "react";
import Header from "./Header";

// Constants
const numOfPokemons = 333;
const superiorLevel = 110;

// Function to get all pokemons
export default function AllPokemon() {
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Default useEffect:
  // useEffect(() => {}, []);

  useEffect(() => {
    async function fetchPokemons() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${numOfPokemons}`
          // There are around 898 pokemons in the API,
          // but we are not going to load all of them here
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

        setLoadedPokemons(pokemons);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }

    fetchPokemons();
  }, []);

  if (isLoading) {
    return <div></div>;
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

// Functions to filter pokemons based on their stats
export function bestAttack(pokemons) {
  return pokemons.filter((pokemon) => pokemon.stats.attack >= superiorLevel);
}

export function bestSpeed(pokemons) {
  return pokemons.filter((pokemon) => pokemon.stats.speed >= superiorLevel);
}

export function bestHp(pokemons) {
  return pokemons.filter((pokemon) => pokemon.stats.hp >= superiorLevel);
}

export function bestDefense(pokemons) {
  return pokemons.filter((pokemon) => pokemon.stats.defense >= superiorLevel);
}
