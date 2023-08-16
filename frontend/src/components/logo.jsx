import logo from '../assets/imgs/Logo.png';
import React, { useState } from 'react';
import loginCadastro from '../assets/imgs/loginCadastro.png'
import './logo.css';


const Logo = () => {

    return (
        <div className="logoGeralCadastro">
            <div className="logo">
                <a href="/" className="logo">
                <img src={logo} alt="logo" />
                </a>
            </div>
            <div className='LoginCadastro'>
                <a href="/login" className="logo">login/</a>
                <a href="/auth/register" className="cadastro">cadastro</a>

                <img src={loginCadastro} alt="loginCadastro"/>
            </div>
        </div>
    )

};

export default Logo;