export default class SessionService {

  sessionKey

  constructor(key = "react_session") {
    this.sessionKey = key
  }

  createSession(data) {
    sessionStorage.setItem(this.sessionKey, JSON.stringify(data))
  }
  
  destroySession() {
    sessionStorage.removeItem(this.sessionKey)
  }

  getSessionData() {
    return JSON.parse(sessionStorage.getItem(this.sessionKey)) || {}
  }
  
  isAuthenticated() {
    return !!this.getSessionData()
  }

}