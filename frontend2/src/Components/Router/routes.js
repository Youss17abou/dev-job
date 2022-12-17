import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterFormPage from '../Pages/RegisterPage';
import HomePageDev from '../Pages/HomePageDev';
import DevPage from '../Pages/DevPage';
import CreateOfferFormPage from '../Pages/CreateOfferFormPage';
import CompanyPage from '../Pages/CompanyPage';
import Logout from '../Logout/Logout';
import HomePageComany from '../Pages/HomePageCompany'
// eslint-disable-next-line import/no-named-as-default
import HomePageDevSwipe from '../Pages/HomePageDevSwipe';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register' : RegisterFormPage,
  '/jobOffers' : HomePageDev,
  '/devPage'  : DevPage,
  '/createOfferPage' : CreateOfferFormPage,
  '/companyPage' : CompanyPage,
  '/logout': Logout,
  '/homePageCompany' : HomePageComany,
  '/jobOffersSwipe' : HomePageDevSwipe
 };

export default routes;