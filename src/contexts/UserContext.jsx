import { createContext, useState } from 'react'
import useServicesContext from '../hooks/useServicesContext'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  // Singletons from ServicesContext
  const { lSessionService, sSessionService } = useServicesContext()
  // Session
  var data = lSessionService.getSessionData()
  if (!data.authToken) {
    data = sSessionService.getSessionData()
  }
  // State
  const [authToken, setAuthToken] = useState(data.authToken || null)
  const [user, setUser] = useState(data.user || null)
  
  return (
    <UserContext.Provider value={{ authToken, setAuthToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext

/** 
 * Usage example with useContext hook: 
 * 
 * import { useContext } from 'react'
 * import UserContext from '../contexts/UserContext'
 * const { user, setUser } = useContext(UserContext)
 * 
 * Usage example with custom hook:
 * 
 * import useUserContext from  '../hooks/useUserContext'
 * const { user, setUser } = useUserContext()
 * 
 */