import { clearPage, renderPageTitle } from '../../utils/render';

const main = document.querySelector('main');

const homePageCompany = async () => {
  try {
    clearPage();
    renderPageTitle('Vos intressÃ©s');

    const idCompany = 1;

    const jobOffers = await getAllJobsOfferFromCompanyFromApi(idCompany);

    const allOffers = allOffersAsString(jobOffers);
   

    main.innerHTML += allOffers;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('HomePageCompany error: ', error);
  }
};


function allOffersAsString(jobOffers) {
  let string = '<div class = "container">';

  let i = 1;
  jobOffers?.forEach((offer) => {
    string += `<div class="accordion accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        ${offer.title}
        </button>
      </h2>
      <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">This is the ${i} item's accordion body.</div>
      </div>
    </div>
    
  </div>
  <br>
  
    `;
    
    
    i += 1;
  });

  string += `</div>`;
  return string;
}

async function getAllJobsOfferFromCompanyFromApi(idCompany) {
  /// jobOffers/allJobOfferFromCompany/1

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/matchesCompany/${idCompany}`);

    if (!response.ok) throw new Error('fetch error : ', response.status, response.statusText);

    const allOffers = await response.json();

    // eslint-disable-next-line no-console
    console.log(allOffers);
    return allOffers;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('HomePageDev  error: ', error);
    main.innerHTML = `<div class="alert alert-danger" role="alert">
    Erreur dans le chargemnt de cette page
    </div>`;
    throw error;
  }
}

export default homePageCompany;