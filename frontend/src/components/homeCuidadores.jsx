import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import './homeCuidadores.css';

const formDataCopy = new FormData();

const HomeCuidadores = () => {
  const [cuidadores, setCuidadores] = useState([]);


  const getAnimalTypes = (animalTypes) => {
  const types = [];
  if (animalTypes.dogs) types.push('Cães');
  if (animalTypes.cats) types.push('Gatos');
  if (animalTypes.birds) types.push('Pássaros');
  return types.join(', ');
};

const getServiceTypes = (servicesIncluded) => {
  const types = [];
  if (servicesIncluded.passeio) types.push('Passeio');
  if (servicesIncluded.banho) types.push('Banho');
  if (servicesIncluded.alimentacao) types.push('Alimentação');
  return types.join(', ');
};

  useEffect(() => {
    async function fetchHomeCuidadores() {
      try {
        const response = await axios.get('http://localhost:3000/home');
        setCuidadores(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar cuidadores aleatórios:', error);
      }
    }
    fetchHomeCuidadores();
  }, []);

  return (
    <div className='geralCardsHome'>
      <div className='row'>
        {cuidadores.map((cuidador) => (
          <div className='col-md-4' key={cuidador._id}>
            <div className='card_home'>
              <Carousel controls={false}>
                {cuidador.src.map((imageUrl, index) => (
                  <Carousel.Item key={index}>
                    <img className='carousel-image' src={imageUrl} alt={`Imagem ${index}`}/>
                  </Carousel.Item>
                ))}
              </Carousel>
              <p className='nome_cuidador'>{cuidador.nameOrganization}</p>
              <p>{cuidador.state}, {cuidador.city}</p>
              <p>{getAnimalTypes(cuidador.animalTypes)}</p>
              <p>{getServiceTypes(cuidador.servicesIncluded)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCuidadores;
