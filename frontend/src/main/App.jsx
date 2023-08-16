import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroPageUsuario from '../pages/CadastroUsuario';
import LoginPage from '../pages/LoginUsuario';
import CadastroPageCuidador from '../pages/CadastroCuidador';
import HomeCuidadoresPage from '../pages/homePage';
import PesquisaCuidador from '../pages/PesquisaCuidador';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/register" element={<CadastroPageUsuario />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/registeCuidador" element={<CadastroPageCuidador />} />
        <Route path="/" element={<HomeCuidadoresPage />} />
        <Route path="/search/:query" element={<PesquisaCuidador />} />
      </Routes>
    </Router>
  );
};

export default App;
