import React from 'react';
import HomeCuidadores from '../components/homeCuidadores';
import HomeCaixa from '../components/homeCaixa'
import SearchBar from '../components/BarraBusca'
import Logo from '../components/logo'
const HomeCuidadoresPage = () => {
  return (
    <div>
      <Logo/>
      <SearchBar/>
      <HomeCaixa/>
      <HomeCuidadores />
    </div>
  );
};

export default HomeCuidadoresPage;
