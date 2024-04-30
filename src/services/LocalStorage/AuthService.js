export default class AuthService {
  
  users = []
  user_tokens = []

  constructor() {
    this.users = JSON.parse(localStorage.getItem('users')) || []
    this.user_tokens = JSON.parse(localStorage.getItem('user_tokens')) || []
  }

  register(username, email, password) {
    const users = this.users.filter((user) => {
      return user.email === email
    })
    if (users.length) {
      // User already exists!
      return false
    } else {
      // Create new user
      this.users.push({username, email, password})
      localStorage.setItem('users', JSON.stringify(this.users))
      return true
    }
  }
  
  login(email, password) {
    const users = this.users.filter((user) => {
      return user.email === email
    })
    if (users.length && users[0].password === password) {
      // Valid credentials
      // Get user token
      let token = Math.random().toString(36).substr(2)
      this.user_tokens.push({email, token})
      localStorage.setItem('user_tokens', JSON.stringify(this.user_tokens))
      return token
    } else {
      // Wrong credentials
      return null
    }
  }

  user(token) {
    const user_tokens = this.user_tokens.filter((user_token) => {
      return user_token.token === token
    })
    if (user_tokens.length) {
      // Token exists!
      // Get user data
      const email = user_tokens[0].email
      const users = this.users.filter((user) => {
        return user.email === email
      })
      return users.length ? users[0] : null
    } else {
      // Invalid token
      return null 
    }
  }

  logout(token) {
    const user_tokens = this.user_tokens.filter((user_token) => {
      return user_token.token === token
    })
    if (user_tokens.length) {
      // Token exists!
      // Delete token
      this.user_tokens = this.user_tokens.filter((user_token) => {
        return user_token.token !== token
      })
      localStorage.setItem('user_tokens', JSON.stringify(this.user_tokens))
      return true
    } else {
      // Invalid token
      return false
    }
  }

}
