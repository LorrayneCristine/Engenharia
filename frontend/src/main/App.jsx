import './App.css'
import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CadastroPageUsuario from '../pages/CadastroUsuario';
import LoginPage from '../pages/LoginUsuario';
import CadastroPageCuidador from '../pages/CadastroCuidador'



import { BrowserRouter } from 'react-router-dom'



const App = () => {
  return (
    <BrowserRouter>
      <Router>
        <Switch>
          <Route exact path="/auth/register" component={CadastroPageUsuario} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/auth/registeCuidador" component={CadastroPageCuidador} />

        </Switch>
      </Router>
    </BrowserRouter>
  
  );
};

export default App;

