import { clearPage,renderPageTitle } from '../../utils/render';
import { getAuthenticatedUser } from '../../utils/auths';

const companyPage = async () => {

  const idCompany = getAuthenticatedUser().id;
  const companyDescription = await getDescriptionFromAPI(idCompany);
  const allJobOfferOfCompany = await getAllJobOfferOfCompanyFromAPI(idCompany);
  
  renderCompanyPage(companyDescription, allJobOfferOfCompany);
};

async function getDescriptionFromAPI(idCompany) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/compagnies/${idCompany}`);

    if (!response.ok) throw new Error('fetch error : ', response.status, response.statusText);

    const description = await response.json();
    // eslint-disable-next-line no-console
    return description;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('CompanyPageDev  error: ', error);
    throw error;
  }
}

async function getAllJobOfferOfCompanyFromAPI(idCompany) {
  // /jobOffers/allJobOfferFromCompany/

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/allJobOfferFromCompany/${idCompany}`);

    if (!response.ok) throw new Error('fetch error : ', response.status, response.statusText);

    const allJobOffer = await response.json();
    // eslint-disable-next-line no-console
    return allJobOffer;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('CompanyPageDev all jobOffer error: ', error);
    throw error;
  }
}

/* async function getMatchesOfCompanyFromAPI(idCompany){

} */

async function renderCompanyPage(description, allJobOfferOfCompany) {
  const main = document.querySelector('main');
  main.style = ' ';
  const allJobOfferString = await renderAllJobOfferOfCompany(allJobOfferOfCompany);
  const descriptionString = renderDescriptionAsString(description);
  clearPage();
  renderPageTitle('Vos données');
  main.innerHTML += descriptionString+ allJobOfferString ;
}

async function renderAllJobOfferOfCompany(jobOffers) {
  let allOffer = `<div class="container my-1"><h4>Mes dernières offres d'emplois:</h4>`;

  // eslint-disable-next-line no-restricted-syntax
  for (const offer of jobOffers) {
    let matchesDev;
    // eslint-disable-next-line no-await-in-loop
    const response = await fetch( `${process.env.API_BASE_URL}/jobOffers/getMatchesDevAndCompnay/${offer.id_offer}` );
    if(!response.ok){
       matchesDev = undefined;
    }
    else{
    // eslint-disable-next-line no-await-in-loop
      matchesDev = await response.json();  
    }
        const date = new Date(offer.upload_date);

    allOffer += `<div class="container my-4 descCompany"> 
    
    <h4>Concernant votre offre : ${offer.title}</h4>
        <h5>Type d'offre : ${offer.type_offer}</h5>
        
      <h4>Description : ${offer.description}</h4>

      <p>Publié le ${date.toLocaleDateString()}</p>
        `;

        if(matchesDev===undefined){
          allOffer+= `    <h2> Aucun matches pour l'instant</h2>
          `
        }
        else{
          allOffer+=`<h4> Les developpeurs qui vous intéressent : </h4>`
          // eslint-disable-next-line no-restricted-syntax
          for (const dev of matchesDev) {

            allOffer+= `
            <h6 id ="h2HP"> Profil concis </h6>
            <ul class="list-group list-group-flush rounded-4"> 
              <li class="list-group-item list-group-item-dark"> Nom : ${dev.lastname} </li>
              <li class="list-group-item list-group-item-dark"> Prénom : ${dev.firstname} </li>
              <li class="list-group-item list-group-item-dark"> Email : ${dev.mail} </li>
              <li class="list-group-item list-group-item-dark"> 
              <a id="sendMail" href="mailto:${dev.mail}?subject=${offer.title}&body=Bonjour,%0D%0A%0D%0ANous avons matches sur DevJob">
              Envoyer Email</a> </li>
            </ul>
            `
        }
  }
  allOffer+=`</div>`

  }
  allOffer += `</div>`

  
  return allOffer;
}

function renderDescriptionAsString(description) {

  const descriptionString = `
    <div class = "container descCompany" id="CompanyInfo"> 
    <h4>informations de la société</h4>
    <h4 id="companyN">Nom de la société: ${description.company_name}</h4>
    <h4>Description: ${description.description}</h4>
    <h4>Adresse: ${description.adress}</h4>
    <h4>Mail:  ${description.mail}</h4> </div>
    `;

  return descriptionString;
}


export default companyPage;
