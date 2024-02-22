import { useState, useEffect } from "react";
import Header from "./Header";
import PokemonCard from "./pokemonCard.jsx";

// Constants
const numOfPokemons = 333;

async function fetchPokemons(
  numOfPokemons,
  setLoadedPokemons,
  setIsLoading,
  setError
) {
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${numOfPokemons}`
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

// Function to get all pokemons
export function AllPokemon() {
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
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}

export function BestAttacks() {
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemons() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=333`
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
        const attackingPokemon = fetchedPokemons.filter((pokemon) =>
          pokemon.stats.some(
            (stat) => stat.name === "attack" && stat.base >= 110
          )
        );

        setLoadedPokemons(attackingPokemon);
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
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}
