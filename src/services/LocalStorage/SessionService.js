export default class SessionService {

  sessionKey

  constructor(key = "react_session") {
    this.sessionKey = key
  }

  createSession(data) {
    localStorage.setItem(this.sessionKey, JSON.stringify(data))
  }
  
  destroySession() {
    localStorage.removeItem(this.sessionKey)
  }

  getSessionData() {
    return JSON.parse(localStorage.getItem(this.sessionKey)) || {}
  }
  
  isAuthenticated() {
    return !!this.getSessionData()
  }

}