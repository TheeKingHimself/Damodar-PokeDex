import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchbar';
import PokemonDisplay from './components/pokemondisplay';
import NavigationButtons from './components/navigationbuttons';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then(response => response.json())
      .then(data => {
        // Fetch the details for each Pokémon and store it
        Promise.all(
          data.results.map(pokemon =>
            fetch(pokemon.url).then(response => response.json())
          )
        )
        .then(pokemonDetails => setPokemonList(pokemonDetails))
        .catch(error => console.error("Error fetching individual Pokémon details:", error));
      })
      .catch(error => console.error("Error fetching Pokémon list:", error));
  }, []);



  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => setPokemonData(data))
      .catch(error => console.error("Error fetching Pokémon data:", error));
  }, [pokemonId]);

  return (
    <div className="pokedex-app">
      <SearchBar onSearch={name => console.log("Handle the search:", name)} />
  
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon, index) => (
          <div key={index} className="border p-4 rounded text-center">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2 className="text-xl mb-2">{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default App;
