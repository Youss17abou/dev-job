import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';



const main = document.querySelector('main');

const renderOfferFormPage = async () => {
  main.innerHTML = `<form id ="offerForm">
                            <div><h2>Poster une nouvelle offre</h2><div>

                            <div class="form-group">
                                <label for="Titre">Titre de l'offre</label>
                                <input type="text" class="form-control" id="idTitle" aria-describedby="titleHelp" placeholder="Entrez le titre de l'offre" required>
                            </div>

                            <div class="form-group">
                                <label for="Description">Description de l'offre</label>
                                <input type="text" class="form-control" id="idDescription" aria-describedby="offerTypeHelp" placeholder="Description">
                            </div>

                            <div class="offerList">
                                <label for="TypeDOffre">Type d'offre</label>
                                 <select id="TypeOffre">
                                      <div id="TypeOffreList">
                                      </div>
                                    </select>
                            </div>

                            <div class="languageList">
                                <label for="language">Langage requis</label>
                                 <select id="language">
                                      <div id="LanguageList">
                                      <option>Aucun langage</option>
                                      </div>
                                    </select>
                            </div>

                            <button id="createOffer" type="submit" class="btn btn-primary">Poster l'offre</button>
                            </form>`;

  const form = document.getElementById('offerForm');
  
  form.addEventListener('submit', onCreateForm);
  const typeOfferList = await getAllTypeOffer();
  const languageList = await getAllLanguages();
  console.log('aaaaaaaaaaaaaaaaaaaaaaa', languageList);
  const categoriesOffer = document.getElementById('TypeOffre');
  const languageOffer = document.getElementById('language');
  const typeOfferAsString = allTypeOfferAsString(typeOfferList);
  const langageListAsString = allLanguagesAsString(languageList);
  categoriesOffer.innerHTML += typeOfferAsString;
  languageOffer.innerHTML +=langageListAsString;

  

  async function onCreateForm(e) {
    e.preventDefault();
    const company = getAuthenticatedUser().id;
    const typeOffer = document.getElementById('TypeOffre').value;
    // eslint-disable-next-line no-console

    const title = document.getElementById('idTitle').value;
    const description = document.getElementById('idDescription').value;
    const language = document.getElementById('language').value;
    

    const options = {
      method: 'POST',
      body: JSON.stringify({
        idCompany: company,
        typeOffer,
        title,
        description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };


    // eslint-disable-next-line camelcase
    const idCompany = getAuthenticatedUser().id;

    // eslint-disable-next-line camelcase
    const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/create/${idCompany}`, options);


    console.log('console log reponse : ', response);

    const offer = await response.json();

    const optionL= {
      method: 'POST',
      body: JSON.stringify({
        offer: offer[0].id_offer,
        language
      }),
      headers: {
        'Content-Type': 'application/json',
        
      },
    };

    const responseLang = await fetch(`${process.env.API_BASE_URL}/jobOffers/addLanguageToOffer`, optionL)

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    if (!responseLang.ok) throw new Error(`fetch error : ${responseLang.status} : ${responseLang.statusText}`);

    const validOffer = await response;

    const validLanguage = await responseLang;

    // eslint-disable-next-line no-console
    console.log('Newly registered offer : ', validOffer, validLanguage);

    Navigate('/companyPage');
  }
};

async function getAllTypeOffer() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/allTypeOffer`);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const categories = await response.json();

    return categories;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getAllTypeOffer::error: ', err);
    throw err;
  }
}

async function getAllLanguages() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/jobOffers/getAllLanguages`);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const languages = await response.json();

    return languages;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getAllLanguage::error: ', err);
    throw err;
  }
}

function allTypeOfferAsString(allTypeOffer) {
  let typeOfferList = ' ';

  // eslint-disable-next-line no-console
  allTypeOffer?.forEach((typeOffer) => {
    typeOfferList += `<option value="${typeOffer.id_type_offer}"> ${typeOffer.type_offer} </option>`;
  });

  return typeOfferList;
};

function allLanguagesAsString(allLanguage) {
  let langageList = ' ';

  // eslint-disable-next-line no-console
  allLanguage?.forEach((l) => {
    langageList += `<option value="${l.id_language}"> ${l.language} </option>`;
  });

  return langageList;
}

const createOfferFormPage = () => {
  clearPage();
  renderPageTitle('CreateOfferForm');
  renderOfferFormPage();
};

export default createOfferFormPage;
