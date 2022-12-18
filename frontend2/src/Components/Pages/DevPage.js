/* eslint-disable no-restricted-syntax */
import { clearPage,renderPageTitle } from '../../utils/render';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';

const developerPage = () => {
  if(isAuthenticated()){
    renderDevPage();
  }else{
    Navigate('/');
  }
};

 async function renderDevPage() {
 const descriptionDev= await getDescriptionDev();
const masteredLanguagesDev= await getmasteredLanguageByIdDevandGetAllLanguages();
const  matchesInfos = await getCompleteMatchesInfosCompanies();
  clearPage();
  renderPageTitle('Votre profile')
  const main = document.querySelector('main');
  main.innerHTML = descriptionDev+ masteredLanguagesDev+matchesInfos ;
  const form = document.getElementById('test');
  form.addEventListener('submit',addLangageEvent);
}

async function getDescriptionDev() {
  try {
    const idUser=getAuthenticatedUser().id;
    const { token } = getAuthenticatedUser();
    const options = {
      headers: {
        authorization: token
      }
   
    }
    let descriptionDev = await fetch(`${process.env.API_BASE_URL}/developers/profileDev/${idUser}`, options);
    if (!descriptionDev.ok){

     throw new Error('fetch error : ', descriptionDev.status, descriptionDev.statusText);
    }
    descriptionDev = await descriptionDev.json();
    return renderDescriptionDev(descriptionDev);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('pageDev  error: ', error);
    throw error;
  }
}


async function getmasteredLanguageByIdDevandGetAllLanguages() {

    const idUser=getAuthenticatedUser().id;
    const { token } = getAuthenticatedUser();
    const options = {
      headers: {
        authorization: token
      }
      
    }
    let masteredLanguages = await fetch(`${process.env.API_BASE_URL}/developers/masteredLanguageDev/${idUser}`, options);

    const listLanguages = await getAllLanguages();

    if (!masteredLanguages.ok) return masteredLanguageByIdDevandGetAllLanguages(undefined,listLanguages);

    masteredLanguages = await masteredLanguages.json();

    // eslint-disable-next-line no-console
    return masteredLanguageByIdDevandGetAllLanguages(masteredLanguages,listLanguages);
  
}
 async function getAllLanguages() {
    try {

      let allLanguages = await fetch(`${process.env.API_BASE_URL}/developers/getAllLanguages`);
      
      if (!allLanguages.ok){
       throw new Error('fetch error : ', allLanguages.status, allLanguages.statusText);
      }
      allLanguages = await allLanguages.json();
      
      return renderAlllanguages(allLanguages);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('ALl languages in devPage  error: ', error);
      throw error;
    }
  }

  async function getCompleteMatchesInfosCompanies(){

      let matchesCompanies = await fetch(`${process.env.API_BASE_URL}/jobOffers/getCompaniesMatchInfos/${getAuthenticatedUser().id}`);

      if (!matchesCompanies.ok){
        matchesCompanies=undefined
        return renderMatchesInfos(matchesCompanies);
      }

      matchesCompanies = await matchesCompanies.json();
      
      return renderMatchesInfos(matchesCompanies);
  }

  async function renderMatchesInfos(matchesCompanies){
    let infos = `
    <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3 bg-info">
    <h3>Vos matches <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box2-heart-fill" viewBox="0 0 16 16">
    <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1v3ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
  </svg> </h3> 
    </div>
`;

    if(matchesCompanies===undefined) {
      infos += `<h3>Aucun matches pour l'instant</h3>
      `
      return infos;
    }
    for (const comp of matchesCompanies) {
      let cpt =1;
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/getJobOffersMatchInfos/${comp.id_company}/${getAuthenticatedUser().id}`);
      // eslint-disable-next-line no-await-in-loop
      const offers = await response.json();
      infos+=`    
      <div class="infoDev" >
      <h4 class = "h4DevPage ">Compagnie : ${comp.company_name} </h4>
      <br>
      `;
      for (const offer of offers) {
        infos+=`   
        <h5> Offre ${cpt} de l'entreprise</h5>
        <h5>Compagnie ${offer.title} </h5>
        <h5>Compagnie ${comp.description} </h5><br>
      `;
      cpt+=1;
      }

      infos+=`</div>`
    }
      infos+=`
      </div>`
    return infos;
  }


 function renderDescriptionDev(description) {
  // eslint-disable-next-line no-template-curly-in-string
  
  const descriptionDev =  `
  
  <div class="container mx-auto my-4 bg-info">
  <div class="row justify-content-center my-4 bg-info">
    <div class="container-sm py-2 px-4 m-3 w-auto m-0 rounded-4  bg-info"> 
      <div class="align-self-baseline"><h3 >Mon profil</h3></div>
    </div>
  <div class="row justify-content-center my-4 bg-info">
    <div id="contIm" class="container-sm py-2 px-4 m-3 w-auto m-0 rounded-4  bg-muted"> 
      <div id="idImageDevPage" class="align-self-baseline" alt="">
    </div>
  </div>
  <div class="row">
    <div class="col-lg-3 rounded-4 mx-2 bg-info">
      <div class="d-flex justify-content-center my-5 py-2 bg-info">
      </div>
      
    </div>
    <div class="col rounded-4 bg-muted mx-2 bg-muted">
      <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3  bg-info">  
          <h3>Informations générales</h3> 
      </div>
      <ul class="infoDev" style="list-style-type:none;"> 
          <li>Prénom : ${description.lastname}   </li>
          <li>Nom : ${description.firstname}  </li>
          <li>Date de naissance : ${new Date(description.birth_date).toLocaleDateString()} </li>
          <li>Numero de téléphone : ${description.tel}    </li>
          <li>Adresse email : ${description.mail}    </li>
          <li>Type d'offre recherché : ${description.type_offer}    </li>
        </ul>
    `
  return descriptionDev;
}


function masteredLanguageByIdDevandGetAllLanguages(languages,listLanguages) {

  const masteredLanguagesDev =  renderMasteredlanguageDev(listMasteredlanguage(languages),listLanguages);

  return masteredLanguagesDev;
}

 

function renderMasteredlanguageDev(listMasteredlanguages,listLanguages) {



  const descriptionString = `
  
  <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3 bg-info">
            <h3>Langages informatiques </h3>
        </div>
        <ul class="infoDev">
       ${listMasteredlanguages}  
       </ul>
        ${listLanguages}
  `;
          
  return descriptionString;
}

function listMasteredlanguage(listLanguage){

  if(!listLanguage){
    return  `<li>Vous n'avez ajoutez aucun language de programmation</li>`
  }

  let listMasteredlanguag = '';

    listLanguage?.forEach((language) => {  listMasteredlanguag  += `
      <li>${language.language}</li>`;
  
 

});
return listMasteredlanguag;
}

function renderAlllanguages(listLanguages){
  let list = `

  <form id="test" class="form-group" >
                                <label style="font-family: Arial" for="">Ajouter un language à mes compétences</label> <br>
                                <select id="idLanguage">
                                    `;

listLanguages?.forEach((language) => {  list += `

<option value="${language.id_language}">${language.language}</option>
 `;  
 });

list +=  `
</select>
<br>
<input id="inputDevPage"  type="submit" value = "AJOUTER"/>

</form>
`;
return list;
}



async function addLangageEvent(e){
  e.preventDefault();
  const idLanguage = document.getElementById('idLanguage').value
  const idDev = getAuthenticatedUser().id;
  const { token } = getAuthenticatedUser();
   
  const options = {
    method: 'POST',
    body: JSON.stringify({
      idDev,
      idLanguage,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/developers/addLanguageProgramationToDev`, options);

  if (!response.ok){
   throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  }

  Navbar();
  Navigate('/devPage');
  window.location.reload()
}


export default developerPage;
