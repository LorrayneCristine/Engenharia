import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './LoginButtons.css'; // Crie um arquivo CSS para estilizar os botões (opcional)

const LoginButtons = () => {
  // Configurações para o botão do Google
  const googleClientId = 'SEU_CLIENT_ID_DO_GOOGLE';

  // Configurações para o botão do Facebook
  const facebookAppId = 'SEU_APP_ID_DO_FACEBOOK';

  const responseGoogle = (response) => {
    console.log(response); // Aqui você pode lidar com a resposta do Google
  };

  const responseFacebook = (response) => {
    console.log(response); // Aqui você pode lidar com a resposta do Facebook
  };

  return (
    <div className="login-buttons">
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Acessar com Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />

      <FacebookLogin
        appId={facebookAppId}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="facebook-button"
        textButton="Acessar com Facebook"
      />
    </div>
  );
};

export default LoginButtons;
