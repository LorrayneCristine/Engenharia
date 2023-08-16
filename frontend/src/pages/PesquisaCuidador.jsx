import React from 'react';
import SearchResults from '../components/SearchResults'
import Logo from '../components/logo'
import SearchBar from '../components/BarraBusca'



const PesquisaCuidador = () => {
  return (
    <div>
      <Logo/>
      <SearchBar/>
      <SearchResults />
    </div>
  );
};

export default PesquisaCuidador;
