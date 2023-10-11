import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchbar';
import RegionFilter from './components/RegionFilter';
import PokemonDetail from './components/PokemonDetail';
import Root from './components/Root';

import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route
} from 'react-router-dom';

function App() {
  const [regionFilter, setRegionFilter] = useState('all'); // Default to showing all Pokémon
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to keep track of search term

  const REGION_RANGES = {
    all: { start: 1, end: 1010 },
    kanto: { start: 1, end: 151 },
    johto: { start: 152, end: 251 },
    hoenn: { start: 252, end: 386 },
    sinnoh: { start: 387, end: 496 },
    unova: { start: 497, end: 649 },
    kalos: { start: 650, end: 721 },
    alola: { start: 722, end: 809 },
    galar: { start: 810, end: 898 },
    paldea: { start: 899, end: 1010 }
    };
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
  const filteredPokemonList = pokemonList
    .filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (regionFilter === 'all' || 
      (pokemon.id >= REGION_RANGES[regionFilter].start && pokemon.id <= REGION_RANGES[regionFilter].end))
    );




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
      <SearchBar onSearch={setSearchTerm} />
      <RegionFilter onFilterChange={setRegionFilter} currentRegion={regionFilter} />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemonList.slice(0, 1010).map((pokemon, index) => (
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
