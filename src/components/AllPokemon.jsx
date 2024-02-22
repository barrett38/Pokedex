import { useState, useEffect } from "react";
import Header from "./Header";
import PokemonCard from "./pokemonCard.jsx";

// https://pokemon-reset-bloodlines.fandom.com/wiki/Ash_Ketchum/Relationships
// See above link for the list of Ash's pokemons

// Constants
const numOfPokemons = 333;
const statLevel = 110;

// Only 1 API request is made to get all the pokemons
async function fetchPokemons(
  numOfPokemons,
  setLoadedPokemons,
  setIsLoading,
  setError,
  filterFunction
) {
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${numOfPokemons}`
    );

    const data = await response.json();
    let pokemons = await Promise.all(
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

    // Apply the filter function if one was provided
    if (filterFunction) {
      pokemons = pokemons.filter(filterFunction);
    }

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
    fetchPokemons(333, setLoadedPokemons, setIsLoading, setError);
  }, []);

  if (isLoading) {
    return <div id="loading-header"></div>;
  }

  if (error) {
    return <div id="loading-header">Error: {error}</div>;
  }

  return (
    <div>
      <h3 id="component-header">All Pokemons</h3>
      <Header />
      <ul id="pokemons">
        {loadedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}

// Functions to filter pokemons by their stats
export function BestAttacks() {
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filterFunction = (pokemon) =>
      pokemon.stats.some(
        (stat) => stat.name === "attack" && stat.base >= statLevel
      );
    fetchPokemons(
      numOfPokemons,
      setLoadedPokemons,
      setIsLoading,
      setError,
      filterFunction
    );
  }, []);

  if (isLoading) {
    return <div id="loading-header">Loading...</div>;
  }

  if (error) {
    return <div id="loading-header">Error: {error}</div>;
  }

  return (
    <div>
      <h3 id="component-header">Attacking</h3>
      <Header />
      <ul id="pokemons">
        {loadedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}

export function BestSpeed() {
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filterFunction = (pokemon) =>
      pokemon.stats.some(
        (stat) => stat.name === "speed" && stat.base >= statLevel
      );
    fetchPokemons(
      numOfPokemons,
      setLoadedPokemons,
      setIsLoading,
      setError,
      filterFunction
    );
  }, []);

  if (isLoading) {
    return <div id="loading-header">Loading...</div>;
  }

  if (error) {
    return <div id="loading-header">Error: {error}</div>;
  }

  return (
    <div>
      <h3 id="component-header">Fastest</h3>
      <Header />
      <ul id="pokemons">
        {loadedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}

export function BestEndurance() {
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filterFunction = (pokemon) =>
      pokemon.stats.some(
        (stat) => stat.name === "hp" && stat.base >= statLevel
      );
    fetchPokemons(
      numOfPokemons,
      setLoadedPokemons,
      setIsLoading,
      setError,
      filterFunction
    );
  }, []);

  if (isLoading) {
    return <div id="loading-header">Loading...</div>;
  }

  if (error) {
    return <div id="loading-header">Error: {error}</div>;
  }

  return (
    <div>
      <h3 id="component-header">Strongest</h3>
      <Header />
      <ul id="pokemons">
        {loadedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}

export function BestDefense() {
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filterFunction = (pokemon) =>
      pokemon.stats.some(
        (stat) => stat.name === "defense" && stat.base >= statLevel
      );
    fetchPokemons(
      numOfPokemons,
      setLoadedPokemons,
      setIsLoading,
      setError,
      filterFunction
    );
  }, []);

  if (isLoading) {
    return <div id="loading-header">Loading...</div>;
  }

  if (error) {
    return <div id="loading-header">Error: {error}</div>;
  }

  return (
    <div>
      <h3 id="component-header">Defensive</h3>
      <Header />
      <ul id="pokemons">
        {loadedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}
