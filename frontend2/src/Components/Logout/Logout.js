import { clearAuthenticatedUser } from '../../utils/auths';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const Logout = () => {
  clearAuthenticatedUser();
  Navbar();
  Navigate('/');
};

export default Logout;
