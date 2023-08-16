import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importe o hook useParams corretamente
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import './SearchResults.css'

const SearchResults = () => {
  const { query } = useParams(); // Use o hook useParams para obter o valor do parâmetro
  const [searchResults, setSearchResults] = useState([]);

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
  }






  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const response = await axios.get(`http://localhost:3000/search/${query}`);
        setSearchResults(response.data);
      } catch (error) {
        console.log(error)
        console.error('Erro ao buscar resultados de pesquisa:', error);
      }
    }
    fetchSearchResults();
  }, [query]);

  return (
    <div className='Pesquisa_cuidadores'>
      <h2>Cuidadores disponíveis</h2>
      <div className='geralPesquisa'>
        {searchResults.length === 0 ? (
          <p>Nenhum cuidador encontrado</p>
        ) : (
          searchResults.map((cuidador) => (
            <div key={cuidador._id} className='divisao'>
              <div className='img_divisao'>
                <Carousel  controls={false}>
                  {cuidador.src.map((imageUrl, index) => (
                    <Carousel.Item key={index}>
                      <img className='carousel-image' src={imageUrl} alt={`Imagem ${index}`}/>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div className='dados_divisao'>
                <div className='dados_org'>
                  <h3>{cuidador.nameOrganization}</h3>
                  <p className='services'>Animais: {getAnimalTypes(cuidador.animalTypes)}</p>
                  <p className='services'>Serviços: {getServiceTypes(cuidador.servicesIncluded)}</p>
                  <p className='services'>Valor Semanal: {cuidador.weeklyServicePrice}</p>
                  <p>Telefone: {cuidador.phone}</p>
                  <p>{cuidador.city}, {cuidador.state}, {cuidador.address}, {cuidador.numberHome}</p>
                </div>
                <div className='dados_grana'>
                    <p>Valor diário:</p>
                    <h3>R$ {cuidador.dailyServicePrice}</h3>
                    <button className='reserva'>Fazer reserva</button>

                </div>
                

              </div>
            </div>
          ))
        )}
      </div>
    </div>

  );
};

export default SearchResults;
