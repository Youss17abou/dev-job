/* eslint-disable no-console */
import Swiper, { Navigation, Pagination , Keyboard   } from 'swiper';
import { clearPage, renderPageTitle } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
// core version + navigation, pagination modules:

// configure Swiper to use modules
Swiper.use([Navigation, Pagination  , Keyboard ]);
// d'abbord afficher les offres avant d'executer le script

const SwipePage = async () => {
 
  renderPageTitle('Offres');
  const AllOffers = await getAllOffersFromAPI();
  await renderSwipePage(AllOffers);
  
  // renderAllOffers(AllOffers);
};

async function renderSwipePage(AllOffers) {
  try {
    const head = document.querySelector('head');
    const foot = document.querySelector('footer');
    head.innerHTML += `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>`;
    foot.innerHTML += `<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>`;
    foot.innerHTML += ``;
    const main = document.querySelector('main');
    const allJobOfferFromCompany = await renderAllJobOffersAsString(AllOffers);
   
    console.log(
      'TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      allJobOfferFromCompany,
    );
    main.innerHTML += `<!-- Slider main container -->
  <div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    ${allJobOfferFromCompany}
  </div>
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>

  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- If we need scrollbar -->
  <div class="swiper-scrollbar"></div>
  </div>`;

    const swiper = new Swiper('.swiper', {
      // Optional parameters

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        // clickable : true
      },
       keyboard : {
        enabled : true
       },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });

    swiper();
  } catch (error) {
    console.log(error);
  }
}

async function renderAllJobOffersAsString(jobOffers) {
 
  let allOffers = ``;
 // eslint-disable-next-line no-restricted-syntax
 for (const offer of jobOffers) {
    const date = new Date(offer.upload_date);
     // eslint-disable-next-line no-await-in-loop
     const language = await getAllLanguageFromOfferAPI(offer.id_offer);
     const languageString = getLanguageAsString(language);
   //  console.log('LANGUAGE STRING', languageString);
    allOffers += ` <div class="swiper-slide ">
    <table class="table table-dark">
    <thead>
      <th scope="row">${offer.title} chez ${offer.company_name} <br> 
      Publié le ${date.toLocaleDateString()}</th>
      <th scope="row"></th>
      
    </thead>

      <th scope="row">${offer.type_offer} </th>
      <th scope="row">${offer.description}</th>
      <th scope="row">${languageString} </th> 
    
      </table>
      
      </div>
     `;
  };
  clearPage();
  
  return allOffers;
}

// eslint-disable-next-line no-unused-vars
function renderAllOffers(jobOffers) {
  const tablesAllOffers = renderAllJobOffersAsString(jobOffers);
  const main = document.querySelector('main');
  main.innerHTML += tablesAllOffers;
}

async function getAllOffersFromAPI() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/jobOffers`);

    if (!response.ok) throw new Error('fetch error : ', response.status, response.statusText);

    const allOffers = await response.json();

    return allOffers;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('HomePageDev  error: ', error);
    throw error;
  }
}

 async function getAllLanguageFromOfferAPI(idOffer) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/getLanguageRequired/${idOffer}`);

    if (!response.ok) throw new Error('fetch error : ', response.status, response.statusText);

    const languages = await response.json();
    // console.log(languages);
    return languages;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('HomePageDev  error: ', error);
    throw error;
  }
}

function getLanguageAsString(listLanguage) {
  let languageRequired = ``;
  listLanguage?.forEach((l) => {
   
    languageRequired += `<p>${l.language}</p>`;
  });
 
  return languageRequired;
}

export default SwipePage;
