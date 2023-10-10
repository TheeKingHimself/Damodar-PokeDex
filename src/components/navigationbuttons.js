import React from 'react';

function NavigationButtons({ onNext, onPrevious }) {
  return (
    <div className="navigation-buttons">
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default NavigationButtons;
