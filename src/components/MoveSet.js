import React, { useState, useEffect } from "react";
import kanto_pokedex from "../pokedex/kanto_pokedex.json";
import johto_pokedex from "../pokedex/johto_pokedex.json";
import hoenn_pokedex from "../pokedex/hoenn_pokedex.json";
import sinnoh_pokedex from "../pokedex/sinnoh_pokedex.json";
import unova_pokedex from "../pokedex/unova_pokedex.json";
import kalos_pokedex from "../pokedex/kalos_pokedex.json";
import alola_pokedex from "../pokedex/alola_pokedex.json";
import galar_pokedex from "../pokedex/galar_pokedex.json";
import paldea_pokedex from "../pokedex/paldea_pokedex.json";

function transformMoveData(pokemonMoves) {
  const movesByGame = {};

  const regionFiles = [kanto_pokedex, johto_pokedex, hoenn_pokedex, sinnoh_pokedex, unova_pokedex, kalos_pokedex, alola_pokedex, galar_pokedex, paldea_pokedex]; 

  useEffect(() => {
      regionFiles.forEach(region => {
          region.forEach(pokemon => {
              const transformedData = transformMoveData(pokemon.moves);
              // Do something with the transformed data
              // E.g., set it to state, send it to a server, etc.
          });
      });
  }, []);



  pokemonMoves.forEach(moveDetail => {
      moveDetail.version_group_details.forEach(versionDetail => {
          const versionName = versionDetail.version_group.name;
          if (!movesByGame[versionName]) {
              movesByGame[versionName] = [];
          }
          movesByGame[versionName].push({
              name: moveDetail.move.name,
              level: versionDetail.level_learned_at
          });
      });
  });

  return movesByGame;
}



function MoveSet({ movesByGame }) {


  const defaultGame = Object.keys(movesByGame).length ? Object.keys(movesByGame)[0] : null;
  const [selectedGame, setSelectedGame] = useState(defaultGame);
  const handleGameChange = (event) => setSelectedGame(event.target.value);
  
  
  
  MoveSet.defaultProps = {
    movesByGame: {}
  };
  if (!selectedGame) {
    return <div>No moves available.</div>;
  }
  return (
    <div>
      <h3>Moveset</h3>
      
      {/* Dropdown for game selection */}
      <select value={selectedGame} onChange={handleGameChange}>
        {Object.keys(movesByGame).map(game => (
          <option key={game} value={game}>
            {game}
          </option>
        ))}
      </select>

      {/* Display moves for the selected game */}
      <ul>
        {movesByGame[selectedGame].map(move => (
          <li key={move.name}>
            {move.name} - Learned at {move.level}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MoveSet;