import { openDB } from 'idb'

const dbPromise = openDB('wannapop', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('users')) {
      const usersStore = db.createObjectStore('users', { 
        keyPath: 'id', 
        autoIncrement: true 
      })
      usersStore.createIndex('username', 'username', {
        unique: true
      })
      usersStore.createIndex('email', 'email', { 
        unique: true
      })
      // Default users
      usersStore.add({ username: 'maria', email: 'maria@mail.cat', password: '12345678' });
      usersStore.add({ username: 'pep', email: 'pep@mail.cat', password: '12345678' });
    }
    if (!db.objectStoreNames.contains('user_tokens')) {
      const userTokensStore = db.createObjectStore('user_tokens', {
        keyPath: 'token'
      })
    }
  },
})

export default dbPromise