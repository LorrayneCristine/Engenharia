import './Header.css'
import logo from '../../assets/imgs/Logo.png'
import React from 'react'

export default props =>
    <header className="header">
        <a href="/" className="logo">
            <img src={logo} alt="logo" />
        </a>
    </header>