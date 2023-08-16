import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './homeCaixa.css';
import dog from '../assets/imgs/image6.png';
import pata from '../assets/imgs/image5.png';


const HomeCaixa= () => {
  
    return (
      <div className='geralIntroHome'>
        <div className='caixa'>
        <div className='divisao'>
            <div className='texto'>
                <h1>Um cuidador incrível espera seu Pet</h1>
                <p>Opções perfeitas para você economizar!</p>
            </div>
            <a href="/" className="dog">
                <img src={dog} alt="cachorro em uma casa" />
            </a>        
        </div>
            <a href="/" className="patas">
                <img src={pata} alt="patas de cachorro" />
            </a> 
        
        </div>
        <div className='introducao'>

        </div>
      </div>
    );
  };
  
  export default HomeCaixa;