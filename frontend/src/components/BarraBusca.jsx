import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BarraBusca.css'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      const newPath = `/search/${encodeURIComponent(searchQuery)}`;
      navigate(newPath);
    }
  };

  return (
    <div className='barraBusca'>
      <input
        type="text"
        placeholder="Pesquisar por cidade ou nome do cuidador"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
};

export default SearchBar;
