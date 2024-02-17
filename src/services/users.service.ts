import { type User, users } from '../models/users.model'

export const getAllUsers = () : User[] => {
  return users
}

export const getUserById = (id: string) : User | undefined => {
  return users.find(user => user.id === id)
}

export const addUser = (user: User) : User => {
  users.push(user)
  return user
}

export const updateUserById = (id: string, user: User) : User | undefined => {
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) {
    users[index] = user
    return user
  }
  return
}

export const deleteUserById = (id: string) : User | undefined => {
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) {
    const user = users[index]
    users.splice(index, 1)
    return user
  }
  return
}

