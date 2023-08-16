import React from 'react';
import CuidadorDetails from '../components/cuidadorIndinidualReserva';
import Logo from '../components/logo'
import SearchBar from '../components/BarraBusca'

const CuidadorDetalhesReserva = () => {
  return (
    <div>
      <Logo/>
      <SearchBar/>
      <CuidadorDetails />
    </div>
  );
};

export default CuidadorDetalhesReserva;
