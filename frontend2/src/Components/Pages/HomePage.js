import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAuthenticated, isDev } from '../../utils/auths';


const renderHomePage = () => {
  const main = document.querySelector('main');

  if(isAuthenticated()){
    if(isDev()){
      Navigate('/jobOffers');
      return;
    }
    
    Navigate('/homePageCompany');
    return;
    
  }

  main.innerHTML =
  `<div class="homePageDiv">
  <div id="part1" class="position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
      <div class="col-md-6 p-lg-5 mx-auto my-5" id="part">
          <h1 class="display-4 font-weight-normal">Trouvez un job avec DevJob </h1>
          <p class="lead font-weight-normal">Site de mise en relation entre developpeurs et entreprise.</p>
          <small>Swipe dès maintenant les offres qui t'intéresse!</small>
          <button class="btn btn-outline-secondary mt-1" class="text-center" id="btn-register"
              data-uri="/register type=" button">S'inscrire maintenant</button>
      </div>
      <div class="product-device box-shadow d-none d-md-block"></div>
      <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
  </div>

  <div class="container">
      <div class="block block-inverse text-center">
          <div class="block-foreground">
              <h4 id="slogan">Par des developpeurs, pour des developpeurs.</h5>
          </div>
      </div>
  </div>
  <div id="who" class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
      <div class="bg-muted mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
          <div class="my-3 py-3">
              <h2 class="display-5">Qui sommes-nous ?</h2>
              <p class="lead" id="whoare">Groupes de jeunes developpeurs en informatique de gestion, <br> rapidement
              se fit ressentir le besoin de trouvez des offres nous convenant et de pouvoir y postuler facilement ,
                  <br> 2022 le projet DevJob voit le jour</p>
          </div>
      </div>
      <div id="homeOffer" class="bg-muted mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div class="my-3 p-3">
              <h2 class="display-5">Trouvez l'offre qui vous convient</h2>
              <p class="lead">Stage</p>
              <p class="lead">Job étudiant</p>
              <p class="lead">CDD</p>
              <p class="lead">CDI</p>
          </div>
      </div>
  </div>
  <div id="equipe" class="bg-muted mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
      <div class="my-3 p-3">
          <h2 class="display-5">Notre équipe <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
        </svg></h2>
          <p class="lead">Abid Ibrahim</p>
          <p class="lead">Abouhamid Youssef</p>
          <p class="lead">Choujaa Soulaimane</p>
          <p class="lead">El Bouhtani Oussama</p>
          <p class="lead">Fiore Matteo</p>
      </div>
  </div>
  <footer>
      <div id="contact" class="bg-muted mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <h2 class="display-5">Contactez-nous <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16">
          <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
        </svg></h2>
          <p class="lead">02/01010101</p>
          <p class="lead">devjob@vinci.be</p> 
      </div>
  </footer>`; // mettre ce lien dans les credits pour le background : Image de <a href="https://fr.freepik.com/photos-gratuite/vue-face-homme-costume-concept-hebergement-site-web_26412526.htm#page=2&query=background%20website%20IT&position=32&from_view=search&track=ais">Freepik</a>


  const part1= document.getElementById('part')
  part1.addEventListener('mouseover', () => {
    part1.id = 'part1a';
  });
  part1.addEventListener('mouseout', () => {
    part1.id = 'part';
  });
  const registerButton = document.getElementById('btn-register');
  registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    Navigate('/register');
  });
};



const Homepage = () => {
  clearPage();
  renderHomePage();
}

export default Homepage;