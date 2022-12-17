import { clearPage, renderPageTitle } from '../../utils/render';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';

const developerPage = () => {
  clearPage();
  renderPageTitle('Dev Page');
  if(isAuthenticated()){
    renderDevPage();
  }else{
    Navigate('/');
  }
  
};

 async function renderDevPage() {

  const descriptionDev= await getDescriptionDev();
  const masteredLanguagesDev= await getmasteredLanguageByIdDevandGetAllLanguages();

  const main = document.querySelector('main');
  main.innerHTML = descriptionDev+ masteredLanguagesDev;
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
    // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      return renderAlllanguages(allLanguages);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('ALl languages in devPage  error: ', error);
      throw error;
    }
  }




 function renderDescriptionDev(description) {
  const descriptionDev =  `
  
  <div class="container mx-auto my-4 bg-white">
  <div class="row justify-content-center my-4">
    <div class="container-sm py-2 px-4 m-3 w-auto m-0 rounded-4  bg-secondary">  
          <h3> Profil</h3> 
    </div>
  </div>
  <div class="row">
    <div class="col-lg-3 rounded-4 bg-light mx-2">
      <div id="idImageDevPage" class="d-flex justify-content-center my-5 py-2 bg-">
      </div>
    </div>
    <div class="col rounded-4 bg-light mx-2">
      <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3  bg-secondary">  
          <h3>Informations generales</h3> 
      </div>
      <ul> 
          <li>Prénom : ${description.lastname}   </li>
          <li>Nom : ${description.firstname}  </li>
          <li>Date de naissance :${description.birth_date} </li>
          <li>Numero de téléphone : ${description.tel}    </li>
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
  
  <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3   bg-secondary">
            <h3>Vos langages de programmation </h3>
        </div>
        <ul>
       ${listMasteredlanguages}  
       </ul>
        ${listLanguages}
      </div>
    </div>

  </div>
  

  
  `;
          
  return descriptionString;
}

function listMasteredlanguage(listLanguage){

// eslint-disable-next-line no-console
console.log(listLanguage);
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

  <form  id="test" class="form-group">
  <div class = "box"  >
                                <label for="">Vous voulez ajoutez un language dans votre cv, choisisez parmis cette liste</label> <br>
                                <select id="idLanguage">
                                    `;

listLanguages?.forEach((language) => {  list += `

<option value="${language.id_language}">${language.language}</option>
 `;  
 });

list +=  `



</select>
</div>
<br>
<input id="inputDevPage"  type="submit" value = "ajoutez"/>

</form>
`;
return list;
}



async function addLangageEvent(e){
  e.preventDefault();

  const idLanguage = document.getElementById('idLanguage').value;
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
