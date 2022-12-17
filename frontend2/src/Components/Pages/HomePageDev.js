import { clearPage, renderPageTitle } from '../../utils/render';

const HomePageDev = async () => {
  try {
    clearPage();
    renderPageTitle('Home Page Dev');

    const AllOffers = await getAllOffersFromAPI();

    renderAllOffers(AllOffers);
    attachListenerToButton();
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.error('HomePage::error: ', error);
    const errorText = document.querySelector('main');
    errorText.innerHTML = `<div class="alert alert-danger" role="alert">
    Erreur dans le chargemnt de cette page
    </div>`;
  }
};

function attachListenerToButton() {
  const buttonInterested = document.querySelector('.buttonInterested');
  buttonInterested.addEventListener('click', (e) => {
    e.preventDefault();
    buttonInterested.className = 'btn btn-primary buttonInterested';
  });
}

function renderAllJobOffersAsString(jobOffers) {
  let allOffers = `
  <div class="container">`;

  jobOffers?.forEach((offer) => {
    const date = new Date(offer.upload_date);
    allOffers += ` 
      <h2>${offer.title}</h2>
      <h3>Nom de l'entreprise : ${offer.company_name}</h3>

      <h3>Type d'offre : ${offer.type_offer}</h3>
      
      <h4>Description : ${offer.description}</h4>

      <p>Publié le ${date.toLocaleDateString()}</p>
      <div>
                        <form method="POST">
                        <input type="hidden" name="id_offer" value="${offer.id_offer}">
    
                        <button type="submit " class="btn btn-success buttonInterested">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path
                                        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                            </svg>
                            </svg>

                        </button>


                        </form>
                    </div>

     
  <hr>  `;
  });

  allOffers += `</div>`;

  return allOffers;
}

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

export default HomePageDev;
