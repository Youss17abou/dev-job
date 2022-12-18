import { clearPage, renderPageTitle } from '../../utils/render';
import { setAuthenticatedUser,isDev } from '../../utils/auths';

import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
    clearPage();
    renderPageTitle('Login');
    renderLoginPage();

  };
  
  function renderLoginPage(){
     const main = document.querySelector('main');
     const form = document.createElement('form');
     form.className = 'px-5 pb-5';
     form.id = 'loginForm';
     const mail = document.createElement('input');
     mail.type = 'text';
     mail.id = 'mail';
     mail.placeholder = 'Indiquez votre adresse mail';
     mail.required = true;
     mail.className = 'form-control mb-3';
     const password = document.createElement('input');
     password.type = 'password';
     password.id = 'password';
     password.required = true;
     password.placeholder = 'Indiquez votre mot de passe';
     password.className = 'form-control mb-3';
     const submit = document.createElement('input');
     submit.value = 'Login';
     submit.type = 'submit';
     submit.className = 'btn btn-primary';
     form.appendChild(mail);
     form.appendChild(password);
     form.appendChild(submit);
     main.appendChild(form);
     form.addEventListener('submit', login);
  }


  function renderErrorLogin(){
  const main = document.querySelector('main');
  const h3 = document.createElement('h3');
  main.appendChild(h3);
   h3.id = 'idh3';
   const idh3 = document.getElementById('idh3');
  idh3.innerHTML = 'Utilisateur ou mot de passe erroné';
}

  async function login(e) {
    e.preventDefault();
  
    const mail = document.querySelector('#mail').value;
    const password = document.querySelector('#password').value;
    

    const options = {
      method: 'POST',
      body: JSON.stringify({
        mail,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/developers/login`, options);

    if (!response.ok){
      renderErrorLogin();
     throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    }
    const authenticatedUser = await response.json();
  
    // eslint-disable-next-line no-console
    console.log('Authenticated user : ', authenticatedUser);
  
    setAuthenticatedUser(authenticatedUser);
  
    Navbar();
  

    if(isDev()){
      Navigate('/devPage');
    }else{
      Navigate('/companyPage');
    }

    
  }





  export default LoginPage;
