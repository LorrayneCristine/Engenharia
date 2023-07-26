import './Main.css'
import React from 'react'
import dogs from '../../assets/imgs/dogs.png'
import { GoogleLogin } from 'react-google-login';
import Header from './Header'

export default props =>
    <React.Fragment>
        <Header/>
            <main className="content">
                <div className="left">
                    <form>
                        <button typ="button"> Entrar com o Facebook </button>
                        <button typ="button"> Entrar com o Google </button>
                        <div class="divider">
                            <span>ou</span>
                        </div>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required></input>
                        <label for="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" required></input>
                        <button type="submit">Entrar</button>
                        <a href="#">Esqueceu sua senha?</a>
                        <a href="#">Não possui uma conta? Criar conta</a>
                    </form>
                </div>
                <div className="right">
                    <a href="/" className="dogs">
                        <img src={dogs} alt="dogs" />
                    </a>
                </div>
            </main>
    </React.Fragment>
