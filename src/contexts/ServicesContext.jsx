import { createContext } from 'react';
import AuthService from '../services/API/AuthService'
import SSS from '../services/SessionStorage/SessionService'
import LSS from '../services/LocalStorage/SessionService'
import ProductService from '../services/API/ProductService';
import UserService from '../services/API/UserService';

const ServicesContext = createContext();

export const ServicesContextProvider = ({ children }) => {

  const services = {
    authService: new AuthService(),
    lSessionService: new LSS(),
    sSessionService: new SSS(),
    productService: new ProductService(),
    userService: new UserService(),
  };
  
  return (
    <ServicesContext.Provider value={{ ...services }}>
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesContext;