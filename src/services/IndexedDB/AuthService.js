import dbPromise from './db'
import { v4 as uuidv4 } from 'uuid';

export default class AuthService {

  async register (username, email, password) {
    try {
      const db = await dbPromise
      const tx = db.transaction(['users'], 'readwrite')
      const usersStore = tx.objectStore('users')

      // Comprovar si l'usuari/a ja existeix
      const existingUsername = await usersStore.index('username').get(username)
      const existingEmail = await usersStore.index('email').get(email)
      if (existingUsername || existingEmail) {
        throw new Error('L\'usuari ja existeix')
      }

      // Afegir usuari/a
      const newUser = { username, email, password }
      const id = await usersStore.add(newUser)
      await tx.done
      return id
    } catch (error) {
      // Gestionar error
      throw error
    }
  }

  async login (email, password) {
    try {
      const db = await dbPromise
      const tx = db.transaction(['users', 'user_tokens'], 'readwrite')

      // Comprovar que existeix l'usuari/a
      const usersStore = tx.objectStore('users')
      const index = usersStore.index('email')
      const user = await index.get(email)

      // Comprovar les credencials de l'usuari/a
      if (user && user.password === password) {
        // Desar un nou token aleatori
        const token = uuidv4()
        const now = new Date()
        const tokensStore = tx.objectStore('user_tokens')
        await tokensStore.add({ token, user_id: user.id, created_at: now })
        await tx.done
        return token
      } else {
        return false
      }
    } catch (error) {
      // Gestionar error
      throw error
    }
  }

  async user (token) {
    try {
      const db = await dbPromise
      const tx = db.transaction(['user_tokens', 'users'], 'readonly')

      // Cercar usuari/a
      const tokenStore = tx.objectStore('user_tokens')
      const userToken = await tokenStore.get(token)

      if (userToken) {
        const usersStore = tx.objectStore('users')
        const user = await usersStore.get(userToken.user_id)
        await tx.done
        return user
      } else {
        throw new Error('Token invàlid')
      }
    } catch (error) {
      // Gestionar error
      throw error
    }
  }

  async logout (token) {
    try {
      const db = await dbPromise
      const tx = db.transaction('user_tokens', 'readwrite')
      const store = tx.objectStore('user_tokens')
      // Elimina el registre associat al token
      await store.delete(token)
      await tx.done
      return true
    } catch (error) {
      // Gestionar error
      throw error
    }
  }
}