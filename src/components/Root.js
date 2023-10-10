// Root.js or in your index.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import PokemonDetail from './PokemonDetail';


function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default Root;
