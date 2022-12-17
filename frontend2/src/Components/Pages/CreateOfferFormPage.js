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
                                <input type="text" class="form-control" id="idTitle" aria-describedby="titleHelp" placeholder="Entrez le titre de l'offre">
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

                            <button id="createOffer" type="submit" class="btn btn-primary">Poster l'offre</button>
                            </form>`;

  const form = document.getElementById('offerForm');
  form.style = 'background-color : azure;';
  form.addEventListener('submit', onCreateForm);
  const typeOfferList = await getAllTypeOffer();
  const categoriesOffer = document.getElementById('TypeOffre');
  const typeOfferAsString = allTypeOfferAsString(typeOfferList);
  categoriesOffer.innerHTML += typeOfferAsString;

  /*
  const categorie1 = document.createElement('option');
  const categorie2 = document.createElement('option');
  const categorie3 = document.createElement('option');
  const categorie4 = document.createElement('option');
  

  categoriesOffer.appendChild(categorie1);
  categoriesOffer.appendChild(categorie2);
  categoriesOffer.appendChild(categorie3);
  categoriesOffer.appendChild(categorie4); */

  async function onCreateForm(e) {
    e.preventDefault();
    const company = 1;
    const typeOffer = document.getElementById('TypeOffre').value;
    // eslint-disable-next-line no-console
    console.log(typeOffer);

    const title = document.getElementById('idTitle').value;
    const description = document.getElementById('idDescription').value;

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

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const validOffer = await response.json();

    // eslint-disable-next-line no-console
    console.log('Newly registered offer : ', validOffer);

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

function allTypeOfferAsString(allTypeOffer) {
  let typeOfferList = ' ';

  // eslint-disable-next-line no-console
  console.log(allTypeOffer);
  allTypeOffer?.forEach((typeOffer) => {
    typeOfferList += `<option value="${typeOffer.id_type_offer}"> ${typeOffer.type_offer} </option>`;
  });

  return typeOfferList;
}

const createOfferFormPage = () => {
  clearPage();
  renderPageTitle('CreateOfferForm');
  renderOfferFormPage();
};

export default createOfferFormPage;
