import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import './cuidadorIndividualReserva.css'

const CuidadorDetails = () => {
  const { id } = useParams();
  const [cuidadorDetails, setCuidadorDetails] = useState(null);

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
    async function fetchCuidadorDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/cuidador/${id}`);
        setCuidadorDetails(response.data);
      } catch (error) {
        console.log(error);
        console.error('Erro ao buscar detalhes do cuidador:', error);
      }
    }
    fetchCuidadorDetails();
  }, [id]);

  if (!cuidadorDetails) {
    return <p>Carregando...</p>;
  }

  return (
    <div className='GeralCuidadorIndividual'>
      <div className='cardCor'>
          <h2>Sobre nós!</h2>
          <div key={cuidadorDetails._id} className='divisao'>
              <div className='img_divisao'>
                <Carousel  controls={false}>
                  {cuidadorDetails.src.map((imageUrl, index) => (
                    <Carousel.Item key={index}>
                      <img className='carousel-image' src={imageUrl} alt={`Imagem ${index}`}/>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div className='dados_divisao'>
                <div className='dados_org'>
                  <h3>{cuidadorDetails.nameOrganization}</h3>
                  <p className='services'>Animais: {getAnimalTypes(cuidadorDetails.animalTypes)}</p>
                  <p className='services'>Serviços: {getServiceTypes(cuidadorDetails.servicesIncluded)}</p>
                  <p className='services'>Valor Semanal: {cuidadorDetails.weeklyServicePrice}</p>
                  <p>Histórico de capacidades: {cuidadorDetails.capabilitiesHistory}</p>
                  <p>Nome do responsável: {cuidadorDetails.fullName}</p>
                  <p>Telefone: {cuidadorDetails.phone}, E-mail: {cuidadorDetails.email}</p>
                  <p>{cuidadorDetails.city}, {cuidadorDetails.state}, {cuidadorDetails.address}, {cuidadorDetails.numberHome}</p>
                </div>
                <div className='dados_grana'>
                    <p>Valor diário:</p>
                    <h3>R$ {cuidadorDetails.dailyServicePrice}</h3>
                    <button className='reserva'>
                      Fazer reserva
                    </button>
                </div>
              </div>
      
          </div>
        </div>

    </div>
  );
};

export default CuidadorDetails;
