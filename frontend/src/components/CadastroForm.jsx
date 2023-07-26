import React, { useState } from 'react';
import './CadastroForm.css';
import dogs from '../assets/imgs/dogs.png';
import logo from '../assets/imgs/Logo.png';
import LoginButtons from './LoginButtons';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CadastroForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    dateOfBirth: '',
    fullName: '',
    phone: '',
  });

  const [error, setError] = useState(null); // Estado para armazenar o erro

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dateOfBirth') {
      const date = new Date(value);
      const formattedDate = date.toISOString().substr(0, 10);
      setFormData({
        ...formData,
        [name]: formattedDate,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error('As senhas não coincidem');
      return;
    }

    try {

      axios
        .post("http://localhost:3000/auth/register", {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          cpf: formData.cpf,
          dateOfBirth: formData.dateOfBirth,
          phone: formData.phone,
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log('Cadastro realizado com sucesso');
            setFormData({
              email: '',
              password: '',
              confirmPassword: '',
              cpf: '',
              dateOfBirth: '',
              fullName: '',
              phone: '',
            });
          } else {
            console.error('Erro ao cadastrar');
          }
      })
      .catch((error) => {
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

  const handleCadastroClick = (e) => {
    handleSubmit(e);
  };
  

  return (
    <div className="cadastroGeral">
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

      <div className="dividida">
        <div className="forms-caixa">
          <div className="cor-caixa">
          <h1 className="tituloForms">Crie sua conta no Home Pet</h1>

            <div className="GoogleFacebook">
              <LoginButtons />
            </div>

            <form className="cadastro-form" onSubmit={handleSubmit}>
              <div className="geralItens">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Nome Completo"
                />
              </div>

              <div className="geralItens">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="E-mail"
                />
              </div>

              <div className="geralItens">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Senha"
                />
              </div>

              <div className="geralItens">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirmar Senha"
                />
              </div>

              <div className="geralItens">
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                  placeholder="CPF"
                />
              </div>

              <div className="geralItens">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  placeholder="Data de Nascimento"
                />
              </div>

              <div className="geralItens">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Telefone"
                />
              </div>
              <Link to="/login" className = "link-cadastro">Já possuo cadastrado</Link> 
              <p className='cadastro_ou'>ou</p>
              <Link to="/login" className = "link-cadastro">Quero me cadastrar como cuidador</Link> 

              <button type="submit" onClick={handleCadastroClick}>
                Cadastrar
              </button>
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
};

export default CadastroForm;

