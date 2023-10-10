import React from 'react';

function PokemonDisplay({ pokemon }) {
  if (!pokemon) return null;

  return (
    <div className="pokemon-details">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      {/* Add other details as needed */}
    </div>
  );
}

export default PokemonDisplay;
