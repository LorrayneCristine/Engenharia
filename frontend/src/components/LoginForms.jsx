import React, { useState } from 'react';
import './LoginForms.css'; // Importe o arquivo CSS para aplicar os estilos
import dogs from '../assets/imgs/dogs.png'
import logo from '../assets/imgs/Logo.png'
import LoginButtons from './LoginButtons'; // Verifique o caminho do arquivo LoginButtons.js
import axios from 'axios';
import { Link } from 'react-router-dom';


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
    const [error, setError] = useState(null); // Estado para armazenar o erro


    const handleEmailChange = (e) => {
        setFormData({
            ...formData,
            email: e.target.value,
        });
    };

    const handlePasswordChange = (e) => {
        setFormData({
            ...formData,
            password: e.target.value,
        });  
    };

  const handleSubmit = (e) => {
    e.preventDefault();


    try {

        axios
            .post("http://localhost:3000/auth/login", {   
                email: formData.email,
                password: formData.password,
        })

            .then((response) => {
                console.log(response);
                if(response.status === 200){
                    console.log('Login realizado com sucesso:');
                    setFormData({
                        email: '',
                        password: ''
                    })
                }else {
                    console.error('Erro ao cadastrar');
                }
            })

           .catch ((error) => {
                if (error.response && error.response.data && error.response.data.msg) {
                    setError(error.response.data.msg);
                } else {
                    console.error('Erro ao enviar requisição:', error.message);
                }
                });
        } catch (error) {
                console.error('Erro ao enviar requisição', error);
    }
    
  };

  return (
    <div className="loginGeral"> 

        <div className="logo">
            <a href="/" className="logo">
                <img src={logo} alt="logo" />
            </a>
        </div>

        {error && (
        <div className="error-alert">
          <button className="close-button" onClick={() => setError(null)}>
            &#x2716;
          </button>
          <span className="error-message">{error}</span>    
        </div>
      )}

        <div className="divididaLogin">
            <div className='Logincaixa'>
                <div className='corLogin'>
                    <h3 className='tituloLogin'>Crie sua conta no Home Pet usando e-mail</h3>
                    <div className='GoogleFacebook'>
                        <LoginButtons />
                    </div>
                    <h3 className='tituloLogin'> ou </h3>

                    <form onSubmit={handleSubmit} className='geral-login'>
                        <div className='loginForms'>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={handleEmailChange}
                                required
                                placeholder="E-mail"

                            />
                        </div>
                        <div className='loginForms'>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={handlePasswordChange}
                                required
                                placeholder="Senha"
                            />
                        </div>
                        <Link to="/auth/register" className = "link-login">Não sou cadastrado</Link> 
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>

            <div className="animais">
                <a href="/" className="dogs">
                    <img src={dogs} alt="dogs" />
                </a>
            </div>
                
        </div>
    </div>

  );
}

export default Login;