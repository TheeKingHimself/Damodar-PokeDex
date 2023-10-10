import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchbar';
import PokemonDisplay from './components/pokemondisplay';
import NavigationButtons from './components/navigationbuttons';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonId, setPokemonId] = wuseState(1);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => setPokemonData(data))
      .catch(error => console.error("Error fetching Pokémon data:", error));
  }, [pokemonId]);

  return (
    <div className="pokedex-app">
      <SearchBar onSearch={name => console.log("Handle the search:", name)} />
      <PokemonDisplay pokemon={pokemonData} />
      <NavigationButtons 
        onNext={() => setPokemonId(pokemonId + 1)} 
        onPrevious={() => setPokemonId(pokemonId - 1)}
      />
    </div>
  );
}

export default App;
