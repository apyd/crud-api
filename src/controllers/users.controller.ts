import http from 'node:http'
import { v4 } from 'uuid'
import { getAllUsers, getUserById, addUser, updateUserById, deleteUserById } from '../services/users.service'
import { isUUIDv4, validateUser } from '../utils'
import { ERROR_MESSAGE } from '../constants'

export const getUsers = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const users = getAllUsers()
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(users))
  return
}

export const getUser = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const userId = req.url?.split('/')[3] || ''
  const isIdValid = isUUIDv4(userId)
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

export const createUser = (req: http.IncomingMessage, res: http.ServerResponse) => {
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
  })
  req.on('end', () => {
    const parsedUserData = JSON.parse(data)
    const isUserDataValid = validateUser(parsedUserData)
    if (!isUserDataValid) {
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
  })
}

export const updateUser = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const userId = req.url?.split('/')[3] || ''
  const isIdValid = isUUIDv4(userId)
  if (!isIdValid) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: ERROR_MESSAGE.INVALID_USER_ID }))
    return
  }
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
  })
  req.on('end', () => {
    const parsedUserData = JSON.parse(data)
    const isUserDataValid = validateUser(parsedUserData)
    if (!isUserDataValid) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: ERROR_MESSAGE.INVALID_USER_DATA }))
      return
    }
    const user = updateUserById(userId, parsedUserData)
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(user))
      return
    }
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: ERROR_MESSAGE.USER_NOT_FOUND }))
  })
}

export const deleteUser = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const userId = req.url?.split('/')[3] || ''
  const isIdValid = isUUIDv4(userId)
  if (!isIdValid) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: ERROR_MESSAGE.INVALID_USER_ID }))
    return
  }
  const user = deleteUserById(userId)
  if (user) {
    res.writeHead(204, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(user))
    return
  }
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: ERROR_MESSAGE.USER_NOT_FOUND }))
}