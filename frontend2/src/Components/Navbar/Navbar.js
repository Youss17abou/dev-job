// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import { isAuthenticated, isDev } from '../../utils/auths';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const anonymousUserNavbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="" data-uri="/">DevJob</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="" data-uri="/login">Se connecter</a>
              </li>                    
            </ul>
          </div>
        </div>
      </nav>
  `;
  const companyNavbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="" data-uri="/homePageCompany">DevJob</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle mx-5" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Menu
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="nav-link" aria-current="page" href="" data-uri="/companyPage">Profil</a>
                    <li><a class="nav-link" aria-current="page" href="" data-uri="/createOfferPage">Créer une offre</a>
                    <li><a class="nav-link" aria-current="page" href="" data-uri="/homePageCompany">Vos intéressés</a>
                    <li><a class="nav-link" aria-current="page" href="" data-uri="/logout">Se déconnecter</a>
                  </ul>
                </div>
                
              </li>                    
            </ul>
          </div>
        </div>
      </nav>
  `;
  const devNavbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="" data-uri="/jobOffers">DevJob</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Menu
                  </button>
                  <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton1">
                    <li><a class="nav-link" aria-current="page" href="" data-uri="/devPage">Profil</a>
                    <li><a class="nav-link" aria-current="page" href="" data-uri="/jobOffers">Offres</a>
                    <li><a class="nav-link" aria-current="page" href="" data-uri="/logout">Se déconnecter</a>
                  </ul>
                </div>
                
              </li>                    
            </ul>
          </div>
        </div>
      </nav>
  `;
  if(!isAuthenticated()){
    navbarWrapper.innerHTML = anonymousUserNavbar
  }else if(isDev()){
    navbarWrapper.innerHTML = devNavbar
  }else{
    navbarWrapper.innerHTML = companyNavbar
  };
};

export default Navbar;
