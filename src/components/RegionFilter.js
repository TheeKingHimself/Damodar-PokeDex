import React, { useState } from 'react';

const REGION_RANGES = {
  all: { label: 'All Regions', start: 1, end: 1010, color: 'bg-gray-200', activeColor: 'bg-gray-400' },
  kanto: { label: 'Kanto', start: 1, end: 151, color: 'bg-red-200', activeColor: 'bg-red-500' },
  johto: { label: 'Johto', start: 152, end: 251, color: 'bg-blue-200', activeColor: 'bg-blue-500' },
  hoenn: { label: 'Hoenn', start: 252, end: 386, color: 'bg-green-200', activeColor: 'bg-green-500' },
  sinnoh: { label: 'Sinnoh', start: 387, end: 496, color: 'bg-yellow-200', activeColor: 'bg-yellow-500' },
  unova: { label: 'Unova', start: 497, end: 649, color: 'bg-orange-200', activeColor: 'bg-orange-500' },
  kalos: { label: 'Kalos', start: 650, end: 721, color: 'bg-indigo-200', activeColor: 'bg-indigo-500' },
  alola: { label: 'Alola', start: 722, end: 809, color: 'bg-purple-200', activeColor: 'bg-purple-500' },
  galar: { label: 'Galar', start: 810, end: 898, color: 'bg-pink-200', activeColor: 'bg-pink-500' },
  paldea: { label: 'Paldea', start: 899, end: 1010, color: 'bg-teal-200', activeColor: 'bg-teal-500' }
};

function RegionFilter({ onFilterChange, currentRegion }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.keys(REGION_RANGES).map(regionKey => (
        <button 
          key={regionKey}
          onClick={() => onFilterChange(regionKey)}
          className={`py-2 px-4 rounded ${currentRegion === regionKey ? REGION_RANGES[regionKey].activeColor : REGION_RANGES[regionKey].color}`}
        >
          {REGION_RANGES[regionKey].label}
        </button>
      ))}
    </div>
  );
}




export default RegionFilter;
