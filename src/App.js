import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchbar';
import PokemonDetail from './components/PokemonDetail';
import Root from './components/Root';

import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route
} from 'react-router-dom';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const REGIONAL_FILES = [
    'kanto_pokedex.json',
    'johto_pokedex.json',
    'hoenn_pokedex.json',
    'sinnoh_pokedex.json',
    'unova_pokedex.json',
    'kalos_pokedex.json',
    'alola_pokedex.json',
    'galar_pokedex.json',
    'paldea_pokedex.json'
  ];


  useEffect(() => {
    Promise.all(
      REGIONAL_FILES.map(file => 
        fetch(process.env.PUBLIC_URL + '/pokedex/' + file)
          .then(response => response.json())
      )
    )
    .then(allData => {
      // Flatten the arrays into one list
      const combinedData = allData.flat();
      setPokemonList(combinedData);
    })
    .catch(error => console.error("Error fetching local Pokémon data:", error));
  }, []);
  




  return (
    <div className="pokedex-app">
      <SearchBar onSearch={name => console.log("Handle the search:", name)} />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.slice(0, 1010).map((pokemon, index) => (
          <Link key={index} to={`/pokemon/${pokemon.id}`}>
            <div className="border p-4 rounded text-center">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h2 className="text-xl capitalize mb-2">#{pokemon.id} {pokemon.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
  
}

export default App;
