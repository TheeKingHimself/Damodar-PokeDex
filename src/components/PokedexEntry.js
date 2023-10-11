import React from 'react';

function PokedexEntry({ entries }) {
  console.log(entries);

  if (!entries) return null; // Add this line

  return (
    <div className="pokedex-entry mt-4">
      {entries.filter(entry => entry.language.name === 'en').map(entry => (
        <div key={entry.version.name} className="mb-2">
          <h4 className="font-bold">{entry.version.name}</h4>
          <p>{entry.flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')}</p>
        </div>
      ))}
    </div>
  );
}

export default PokedexEntry;
