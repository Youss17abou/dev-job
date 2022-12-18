import Swiper, { Navigation, Keyboard, EffectCube } from 'swiper';
import { clearPage, renderPageTitle } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuthenticatedUser } from '../../utils/auths';
// core version + navigation, pagination modules:

let click;
// configure Swiper to use modules
Swiper.use([Navigation, Keyboard, EffectCube]);
// d'abbord afficher les offres avant d'executer le script

const SwipePage = async () => {
  const AllOffers = await getAllOffersFromAPI();
  await renderSwipePage(AllOffers);

  const allLikeButton = document.querySelectorAll('.iLike');
  const allDislikeButton = document.querySelectorAll('.iDislike');

  document.onclick = (b) => {
    click = b.target;
  };

  allLikeButton.forEach((form) => {
    form.addEventListener('submit', onLikedOffer);
    form.addEventListener('click', () =>{
      document.getElementById('dislikeMessage').id = 'dislikeMessage';
      document.getElementById('likeMessage').id = 'getLikeMessage';
      document.getElementById('getDislikeMessage').id = 'dislikeMessage';
    })
  });

  allDislikeButton.forEach((form) => {
    form.addEventListener('submit', onUnlikedOffer);
    form.addEventListener('click', () =>{
      document.getElementById('likeMessage').id = 'likeMessage';
      document.getElementById('dislikeMessage').id = 'getDislikeMessage';
      document.getElementById('getLikeMessage').id = 'likeMessage';
    })
  });

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
    
    clearPage();
    renderPageTitle('Offres');
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
  
  <div class="swiper-button-next"></div>

  <!-- If we need scrollbar -->
  
  </div>`;

    const swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true,
      effect: 'cube',
      grabCursor: true,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 50,
        shadowScale: 0.3,
      },
      // If we need pagination
      keyboard: {
        enabled: true,
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // And if we need scrollbar
    });
    swiper.scrollbar.destroy();

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
   
    allOffers += ` <div class="swiper-slide ">
    <table class="table table-striped table-hover table-light">
    <thead>
      <th scope="row">${offer.title} chez ${offer.company_name} <br> 
      Publié le ${date.toLocaleDateString()}</th>
      <th scope="row"><div id=dislikeMessage>Vous n'êtes pas interressé par cette offre</div></th>
      <th scope="row"><div id=likeMessage>vous aimez</div></th>
    </thead>
      
      <th scope="row">${offer.type_offer} </th>
      <th scope="row">${offer.description}</th>
      <th scope="row">${languageString} </th> 
      
    </table>

          <div>
            <form class="iLike">
              <input type="submit" class="btn btn-outline-success btn-lg" value="j'aime">
              <input type="hidden" value = "${offer.id_offer}" class="id_offer">
            </form>
            <form class="iDislike">
              <input type="submit" class="btn btn-outline-danger btn-lg" value="je n'aime plus">
              <input type="hidden" value = "${offer.id_offer}" class="id_offer">
            </form>
          </div>
          
</div>
     `;
  }

  console.log(allOffers);
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

async function onLikedOffer(e) {
  e.preventDefault();

  const tab = click.parentElement.elements;
  const offer = tab[1].value;
  const developer = getAuthenticatedUser().id;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      idOffer: offer,
      idDeveloper: developer,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/addToInterstedDev`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  // eslint-disable-next-line no-console
  console.log('Newly match with the developer : ', developer);

}

async function onUnlikedOffer(e) {
  e.preventDefault();

  const tab = click.parentElement.elements;
  const offer = tab[1].value;
  const developer = getAuthenticatedUser().id;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      idOffer: offer,
      idDeveloper: developer,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/notInterestedDev`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  // eslint-disable-next-line no-console
  console.log('Newly unmatch with the developer : ', developer);
}

export default SwipePage;
