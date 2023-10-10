import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function PokemonDetail() {
  const { id } = useParams();
  const currentId = parseInt(id);
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const goToNextPokemon = () => {
    navigate(`/pokemon/${parseInt(id) + 1}`);
  };

  const goToPreviousPokemon = () => {
    if (parseInt(id) > 1) { // Ensure we don't navigate to a Pokémon with id < 1
      navigate(`/pokemon/${parseInt(id) - 1}`);
    }
  };


  useEffect(() => {
    const regionFiles = [
      "kanto_pokedex.json",
      "johto_pokedex.json",
      "hoenn_pokedex.json",
      "sinnoh_pokedex.json",
      "unova_pokedex.json",
      "kalos_pokedex.json",
      "alola_pokedex.json",
      "galar_pokedex.json",
      "paldea_pokedex.json"
    ];

    const fetchPokemonData = async () => {
      for (const file of regionFiles) {
        const response = await fetch(process.env.PUBLIC_URL + `/pokedex/${file}`);
        const data = await response.json();
        const foundPokemon = data.find(p => p.id === parseInt(id));
        if (foundPokemon) {
          setPokemon(foundPokemon);
          break;
        }
      }
    };

    fetchPokemonData();

  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 capitalize text-center text-blue-600">{pokemon.name}</h2>
        <div className="flex justify-center mb-4">
        <img 
            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default} 
            alt={pokemon.name} 
            className="rounded-md"
        />
        </div>
        <p className="mb-2 text-gray-700">
            <span className="font-medium">Height:</span> {pokemon.height}
        </p>
        <p className="mb-2 text-gray-700">
            <span className="font-medium">Weight:</span> {pokemon.weight}
        </p>
        <p className="text-gray-700">
            <span className="font-medium">Type:</span> {pokemon.types.map(type => type.type.name).join(', ')}
        </p>
        {/* Display other Pokemon details as needed */}
        <div className="mt-6 flex justify-between">
        {/* Only render the Back button if currentId is greater than 1 */}
        {currentId > 1 && (
          <button 
            onClick={goToPreviousPokemon} 
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Back
          </button>
        )}

        {/* Only render the Next button if currentId is less than 1010 */}
        {currentId < 1010 && (
          <button 
            onClick={goToNextPokemon} 
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>


    </div>
  );
}
export default PokemonDetail;
