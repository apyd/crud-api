import http from 'node:http';
import { type UserData, type ValidatedUserData } from '../models/users.model';

export const validateUser = (userData: UserData): boolean => {
  if(typeof userData !== 'object' || !userData) {
    return false;
  }

  const { username, age, hobbies } = userData
  
  if( !username || typeof username !== 'string' || typeof age !== 'number' || age < 0 || !Array.isArray(hobbies)) {
    return false
  }

  return true
}

export const getRequestBody = (req: http.IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => data += chunk);
    req.on('end', () => resolve(data));
    req.on('error', (error) => reject(error));
  });
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}

export const getValidatedUserData = (userData: unknown): ValidatedUserData | null => {
  if(typeof userData !== 'object' || !userData) {
    return null
  }

  const { username, age, hobbies } = userData as { username?: unknown, age?: unknown, hobbies?: unknown };
  const filteredValidData: ValidatedUserData = {};

  if (typeof username === 'string') {
    filteredValidData.username = username;
  }

  if (typeof age === 'number') {
    filteredValidData.age = age;
  }

  if (Array.isArray(hobbies)) {
    filteredValidData.hobbies = hobbies;
  }

  return Object.keys(filteredValidData).length === 0 ? null : filteredValidData;
}