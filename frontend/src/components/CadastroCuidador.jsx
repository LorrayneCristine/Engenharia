import React, { useState } from 'react';
import './CadastroCuidador.css';
import dogs from '../assets/imgs/dogs.png';
import logo from '../assets/imgs/Logo.png';
import LoginButtons from './LoginButtons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CadastroCuidador = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    dateOfBirth: '',
    fullName: '',
    phone: '',
    capabilitiesHistory: '',
    animalTypes: {
      dogs: false,
      cats: false,
      birds: false,
    },
    image1: null,
    image2: null,
    image3: null,
    servicesIncluded: {
      passeio: false,
      banho: false,
      alimentacao: false,
    },
    dailyServicePrice: '',
    weeklyServicePrice: '',
    nameOrganization: '',

  });

  const [error, setError] = useState(null);
  const [checkboxError, setCheckboxError] = useState('');
  const [imageError, setImageError] = useState('');


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        animalTypes: {
          ...formData.animalTypes,
          [name]: checked,
        },
        servicesIncluded: {
          ...formData.servicesIncluded,
          [name]: checked,
        },
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else if (name === 'dateOfBirth') {
      const date = new Date(value);
      const formattedDate = date.toISOString().substr(0, 10);
      setFormData({
        ...formData,
        [name]: formattedDate,
      });
    }  else if (name === 'dailyServicePrice' || name === 'weeklyServicePrice') {
      setFormData({
        ...formData,
        [name]: parseFloat(value), // Converte o valor para um número de ponto flutuante
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
      setError('As senhas não coincidem');
      return;
    }
    const formDataToSend = new FormData();
    // Verificar se pelo menos um checkbox está marcado
    const isCheckboxChecked = Object.values(formData.animalTypes).some((value) => value);
    if (!isCheckboxChecked) {
      setCheckboxError('Selecione pelo menos uma opção de animal.');
      return;
    } else {
      setCheckboxError('');
    }

    const animalTypesObj = {
      dogs: formData.animalTypes.dogs,
      cats: formData.animalTypes.cats,
      birds: formData.animalTypes.birds,
    };
    

    // Criação do objeto com as informações dos serviços incluídos
    const servicesIncludedObj = {
      passeio: formData.servicesIncluded.passeio,
      banho: formData.servicesIncluded.banho,
      alimentacao: formData.servicesIncluded.alimentacao,
    };

    // Convertendo os objetos para strings JSON antes de enviar para o backend
    const animalTypesString = JSON.stringify(animalTypesObj);
    const servicesIncludedString = JSON.stringify(servicesIncludedObj);

    // Criação do objeto FormData para enviar os dados ao backend
    const formDataCopy = new FormData();
    formDataCopy.append('fullName', formData.fullName);
    formDataCopy.append('email', formData.email);
    formDataCopy.append('password', formData.password);
    formDataCopy.append('confirmPassword', formData.confirmPassword);
    formDataCopy.append('cpf', formData.cpf);
    formDataCopy.append('dateOfBirth', formData.dateOfBirth);
    formDataCopy.append('phone', formData.phone);
    formDataCopy.append('capabilitiesHistory', formData.capabilitiesHistory);
    formDataCopy.append('animalTypes', JSON.stringify(animalTypesObj));
    formDataCopy.append('image1', formData.image1);
    formDataCopy.append('image2', formData.image2);
    formDataCopy.append('image3', formData.image3);
    formDataCopy.append('servicesIncluded', JSON.stringify(servicesIncludedObj));
    formDataCopy.append('dailyServicePrice', formData.dailyServicePrice);
    formDataCopy.append('weeklyServicePrice', formData.weeklyServicePrice);
    formDataCopy.append('nameOrganization', formData.nameOrganization);

    // Verificar se todas as três imagens foram enviadas
    const isImageUploaded = formData.image1 && formData.image2 && formData.image3;
    if (!isImageUploaded) {
      setImageError('Selecione três imagens do local onde ficarão os animais.');
      return;
    } else {
      setImageError('');
    }

    for (const key in formData) {
      if (key === 'image1' || key === 'image2' || key === 'image3') {
        formData[key] && formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:3000/cuidador', formDataCopy, {
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.status === 201) {
        console.log('Cadastro realizado com sucesso');
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          cpf: '',
          dateOfBirth: '',
          fullName: '',
          phone: '',
          capabilitiesHistory: '',
          animalTypes: {
            dogs: false,
            cats: false,
            birds: false,
          },
          image1: null,
          image2: null,
          image3: null,
          servicesIncluded: {
            passeio: false,
            banho: false,
            alimentacao: false,
          },
          dailyServicePrice: '',
          weeklyServicePrice: '',
          nameOrganization: '',
        });
      }else{
        console.error('Erro ao cadastrar no front', response.data)
      }
  }catch (error) {
    console.error('Erro ao enviar requisição:', error);
    console.log('resposta back', error.response.data)
  }
};

  const handleCadastroClick = (e) => {
    handleSubmit(e);
  };

  return (
    <div className="cadastroGeralCuidadores">
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
            <h1 className="tituloForms">Venha ser um cuidador no Home Pet</h1>
            <form className="cadastro-form" onSubmit={handleSubmit} encType="multipart/form-data">
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
              <div className='compacto'>
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
              </div>

              <div className='compacto'>
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
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Telefone"
                    />
                  </div>
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
                <textarea
                  name="capabilitiesHistory"
                  value={formData.capabilitiesHistory}
                  onChange={handleChange}
                  required
                  placeholder="Fale mais sobre suas capacidades e história"
                />
              </div>
              
              <div className="geralItens">
                <div className='checkbox_animal'>
                  <input
                    type="checkbox"
                    id="dogs"
                    name="dogs"
                    checked={formData.animalTypes.dogs}
                    onChange={handleChange}
                  />
                  <label htmlFor="dogs">Cachorros</label>
                </div>
                <div className='checkbox_animal'>
                  <input
                    type="checkbox"
                    id="cats"
                    name="cats"
                    checked={formData.animalTypes.cats}
                    onChange={handleChange}
                  />
                  <label htmlFor="cats">Gatos</label>
                </div>
                  <div className='checkbox_animal'>
                    <input
                      type="checkbox"
                      id="birds"
                      name="birds"
                      checked={formData.animalTypes.birds}
                      onChange={handleChange}
                    />
                    <label htmlFor="birds">Pássaros</label>
                    {checkboxError && <p style={{ color: 'red' }}>{checkboxError}</p>}
                  </div>

              </div>
              <div className="geralItens">
                <div className='inputFotos'>
                <p>* Selecione três imagens do local onde ficarão os animais</p>

                  <input type="file" name="image1" onChange={handleChange}  accept="image/*" />
                  <input type="file" name="image2" onChange={handleChange}  accept="image/*" />
                  <input type="file" name="image3" onChange={handleChange}  accept="image/*" />
                  {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                </div>
               
              </div>

              <div className="geralItens">
                <div className='checkbox_animal'>
                  <input
                    type="checkbox"
                    id="passeio"
                    name="passeio"
                    checked={formData.servicesIncluded.passeio}
                    onChange={handleChange}
                  />
                  <label htmlFor="passeio">Passeio</label>
                </div>
                <div className='checkbox_animal'>
                  <input
                    type="checkbox"
                    id="banho"
                    name="banho"
                    checked={formData.servicesIncluded.banho}
                    onChange={handleChange}
                  />
                  <label htmlFor="banho">Banho</label>
                </div>
                  <div className='checkbox_animal'>
                    <input
                      type="checkbox"
                      id="alimentacao"
                      name="alimentacao"
                      checked={formData.servicesIncluded.alimentacao}
                      onChange={handleChange}
                    />
                    <label htmlFor="alimentacao">Alimentacão</label>
                  </div>

              </div>

              <div className = "compacto">
                <div className="geralItens">
                  <input
                    type="number"
                    name="dailyServicePrice"
                    value={formData.dailyServicePrice}
                    onChange={handleChange}
                    required
                    placeholder="Valor do serviço (diária)"
                  />
                </div>

                <div className="geralItens">
                  <input
                    type="number"
                    name="weeklyServicePrice"
                    value={formData.weeklyServicePrice}
                    onChange={handleChange}
                    required
                    placeholder="Valor do serviço (semanal)"
                  />
                </div>
              </div>
              <div className="geralItens">
                <input
                  type="text"
                  name="nameOrganization"
                  value={formData.nameOrganization}
                  onChange={handleChange}
                  required
                  placeholder="Nome da organização ou cuidador (aparecerá na busca)"
                />
              </div>

              <Link to="/login" className="link-cadastro">
                Já possuo cadastro
              </Link>

              <p className="cadastro_ou">ou</p>

              <Link to="/auth/register" className="link-cadastro">
                Quero me cadastrar como cliente
              </Link>

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

export default CadastroCuidador;
