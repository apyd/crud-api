import { type User, users, ValidatedUserData } from '../models/users.model'

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

export const updateUserById = (id: string, user: ValidatedUserData) : User | null => {
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) {
    const userToUpdate = users[index]
    const updatedUser = {
      id: userToUpdate.id,
      username: user?.username || userToUpdate?.username,
      age: user?.age || userToUpdate?.age,
      hobbies: user?.hobbies || userToUpdate?.hobbies,
    }
    users[index] = updatedUser
    return updatedUser
    }
    return null
}

export const deleteUserById = (id: string) : User | null => {
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)
    return deletedUser?.[0] || null
  }
  return null
}

