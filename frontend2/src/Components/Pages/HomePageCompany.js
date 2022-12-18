/* eslint-disable no-restricted-syntax */
import { clearPage, renderPageTitle } from '../../utils/render';
import { getAuthenticatedUser } from '../../utils/auths';

const main = document.querySelector('main');

let click;
const homePageCompany = async () => {
 
    
    const idCompany = getAuthenticatedUser().id;
    console.log("type",getAuthenticatedUser(),"id",getAuthenticatedUser().id)
    const jobOffers = await getAllLikedJobsOfferFromCompanyFromApi(idCompany);
    if (!jobOffers) {
      renderMessageNoJobOffer();
      return;
    }
    const allOffers = await allOffersAsString(jobOffers);
    renderPageTitle('Vos matches');
    clearPage();
    main.innerHTML += allOffers;

  const allformsadd = document.querySelectorAll('.formAdd'); 
  
  document.onclick = b => {
    click=b.target;
} 

  allformsadd.forEach(form => {
    form.addEventListener('submit',addDev);
  });

  const allformsdelete = document.querySelectorAll(".formDelete") 

  allformsdelete.forEach(form => {

    form.addEventListener('submit',deleteDev);
  });

  
}


async function allOffersAsString(jobOffers) {
  let string = '<div class="accordion accordion-flush" > ';

  for (const offer of jobOffers) {
    
    // eslint-disable-next-line no-await-in-loop
    const response = await fetch( `${process.env.API_BASE_URL}/jobOffers/allDevelopersInterstedOffer/${offer.id_offer}` );
      // eslint-disable-next-line no-await-in-loop
      const  devsInterested=  await response.json();

          

    string += `

    <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
    <h4>Notifications</h4>
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
      data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Titre de l'offre : ${offer.title}<br>
        Description : ${offer.description}<br>
        Type d'offre : ${offer.type_offer}
        </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">

        
  
    `;
    // eslint-disable-next-line no-loop-func, no-unused-vars
    // eslint-disable-next-line no-loop-func
    // eslint-disable-next-line no-loop-func
      for (const dev of devsInterested) {
        let masteredLanguageDev;

      // eslint-disable-next-line no-await-in-loop
      const response2 = await fetch( `${process.env.API_BASE_URL}/developers/masteredLanguageDev/${dev.id_developer}` );
      if(!response2.ok){
         masteredLanguageDev = undefined;
      }
      else{
      // eslint-disable-next-line no-await-in-loop
        masteredLanguageDev = await response2.json();  
      }

      string += `
     
      <div id="containerDevHomePageCompany" class="container my-5 mx-2 rounded-2">
        <div class="row py-2">
          <div class="col mx-1 text-center">
            <h6 id ="h2HP"> Profil concis </h6>
            <ul class="list-group list-group-flush rounded-4"> 
              <li class="list-group-item list-group-item-dark"> Nom : ${dev.lastname} </li>
              <li class="list-group-item list-group-item-dark"> Prénom : ${dev.firstname} </li>
              <li class="list-group-item list-group-item-dark"> Email : ${dev.mail} </li>
            </ul>
          </div>
        `;

      if(masteredLanguageDev===undefined){
        string+=`
        <div class="col mx-1 text-center">
        <h6 id ="h2HP"> Ce devloppeur ne maitrise aucun language </h6>
        </div>`
      }
      else{
        string+=`
        <div class="col mx-1 text-center">
          <h6 id ="h2HP"> Language maitrisés par le devloppeur </h6>
          <ul class="list-group list-group-flush rounded-4"> 
        `
        // eslint-disable-next-line no-loop-func
        masteredLanguageDev.forEach(language => {
          string+=`
          <li class="list-group-item list-group-item-dark"> ${language.language} </li>
          `  
        });
        string+=`
        </ul>
        </div>
        `
      }

      string+= `
      <div class="col mx-1 text-center">
        <div class="container rounded-2 my-3">
          <form  class="formAdd py-4">
          <input type="submit" class="btn btn-success" value="garder">
          <input type="hidden" value="${dev.id_developer}" class="add">
          <input type="hidden" value = "${offer.id_offer}" class="id_offer">
          </form>

          <form  class="formDelete ">
          <input type="submit" class="btn btn-danger" value="refuser">
          <input  type="hidden" value="${dev.id_developer}" class ="delete">
          <input type="hidden" value= "${offer.id_offer}" class ="id_offer">
          </form>
          <br>
        </div>
      </div>
      </div>
      </div>  `

    }
  
  string+=  `
    </div>
    </div>
    </div>

  `;
  }
  return string;
}

async function getAllLikedJobsOfferFromCompanyFromApi(idCompany) {

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/likedOffers/${idCompany}`);

    if (!response.ok) {
      return undefined;
    }

    const allOffers = await response.json();

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

function renderMessageNoJobOffer() {
  main.innerHTML = `<div class="alert alert-danger" role="alert">
  Vous n'avez créer aucune offre ou aucun devloppeur n'a aimé votre offre d'emploi !
  </div>`;
}


async function addDev(e){
  e.preventDefault()

  const tab = click.parentElement.elements;
  const idDev=tab[1].value;
  const idOffer =tab[2].value;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/likeDev/${idDev}/${idOffer}`,options );

  if (!response.ok){
    console.log("erreur lors du like du devloppeur")
   throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  }

  window.location.reload()
} 
  


async function deleteDev(e){
  e.preventDefault()

  const tab = click.parentElement.elements;
  const idDev=tab[1].value;
  const idOffer =tab[2].value;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/dislikeDev/${idDev}/${idOffer}`,options );

  if (!response.ok){
    console.log("erreur lors du dislike du devloppeur")
   throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  }
  window.location.reload()

}


export default homePageCompany;
