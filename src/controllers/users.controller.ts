import http from 'node:http'
import { v4, validate as validateUUID } from 'uuid'
import { getAllUsers, getUserById, addUser, updateUserById, deleteUserById } from '../services/users.service'
import { getErrorMessage, getRequestBody, validateUser, getValidatedUserData } from '../utils'
import { ERROR_MESSAGE } from '../constants'

export const getUsers = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const users = getAllUsers()
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(users))
  return
}

export const getUser = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const userId = req.url?.split('/')[3] || ''
  const isIdValid = validateUUID(userId)
  if (!isIdValid) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: ERROR_MESSAGE.INVALID_USER_ID }))
    return
  }
  const user = getUserById(userId)
  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(user))
    return
  }
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: ERROR_MESSAGE.USER_NOT_FOUND }))
}

export const createUser = async(req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    const data = await getRequestBody(req)
    const parsedUserData = JSON.parse(data)
    const isUserDataValid = validateUser(parsedUserData)
    if(!isUserDataValid) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: ERROR_MESSAGE.INVALID_USER_DATA }))
      return
    }
    const newUser = {
      ...parsedUserData,
      id: v4(),
    }
    addUser(newUser)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(newUser))
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: getErrorMessage(error) }));
  }
}

export const updateUser = async(req: http.IncomingMessage, res: http.ServerResponse) => {
    const userId = req.url?.split('/')[3] || ''
    const isIdValid = validateUUID(userId)
    if (!isIdValid) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: ERROR_MESSAGE.INVALID_USER_ID }))
      return
    }
    try {
      const data = await getRequestBody(req)
      const parsedUserData = JSON.parse(data)
      const validatedData = getValidatedUserData(parsedUserData)
      if (!validatedData) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: ERROR_MESSAGE.INVALID_USER_DATA }))
        return
      }
      const user = updateUserById(userId, validatedData)
      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(user))
        return
      }
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: ERROR_MESSAGE.USER_NOT_FOUND }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: getErrorMessage(error) }))
    }
}

export const deleteUser = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const userId = req.url?.split('/')[3] || ''
  const isIdValid = validateUUID(userId)
  if (!isIdValid) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: ERROR_MESSAGE.INVALID_USER_ID }))
    return
  }
  const user = deleteUserById(userId)
  if (user) {
    res.writeHead(204, { 'Content-Type': 'application/json' })
    res.end()
    return
  }
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: ERROR_MESSAGE.USER_NOT_FOUND }))
}