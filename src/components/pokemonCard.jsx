export default function PokemonCard({ pokemon }) {
  return (
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
  );
}
