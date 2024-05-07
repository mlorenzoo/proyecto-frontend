import './App.scss'
import Logger from './library/Logger'
import { Route, Routes } from 'react-router-dom'

import { UserContextProvider } from './contexts/UserContext'
import { ServicesContextProvider } from './contexts/ServicesContext'

import NotFound from './pages/404'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/Auth/Profile'
import ProductList from './pages/Product/ProductList'
import ProductView from './pages/Product/ProductView'
import UserList from './pages/User/UserList'
import UserView from './pages/User/UserView'
import NuevoUsuario from './pages/Admin/NuevoUsuario'
import EditarUsuario from './pages/Admin/EditarUsuario'
import Pricing from './pages/Client/Pricing'
import ListSubscriptions from './pages/Admin/ListSubscriptions'
import NewPlan from './pages/Gestor/NewPlan'
import NewBarbershop from './pages/Gestor/NewBarbershop'
import BarbershopList from './pages/Barbershops/BarbershopList'

function App() {

  if (process.env.APP_ENV) {
    console.log("Environment: " + process.env.APP_ENV)
  }
  
  if (process.env.APP_DEBUG) {
    console.log("Debug enabled")
  }

  Logger.debug('App root component')
  
  return (
    <ServicesContextProvider>
      <UserContextProvider>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductView />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/nuevo-usuario" element={<NuevoUsuario />} />
          <Route path="/editar/:id" element={<EditarUsuario />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/subscriptions" element={<ListSubscriptions />} />
          <Route path="/new-plan" element={<NewPlan />} />
          <Route path="/new-barbershop" element={<NewBarbershop />} />
          <Route path="/barbershops" element={<BarbershopList />} />
        </Routes>
      </UserContextProvider>
    </ServicesContextProvider>
  )
}

export default App
