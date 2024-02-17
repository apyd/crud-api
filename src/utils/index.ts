export const isUUIDv4 = (id: unknown): boolean => {
  if(typeof id !== 'string' || (typeof id === 'string' && id?.length !== 36)) {
    return false;
  }

  const uuidv4Regex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');
  return uuidv4Regex.test(id);
}

export const validateUser = (userData: unknown): boolean => {
  if(typeof userData !== 'object' || !userData) {
    return false;
  }

  const { username, age, hobbies } = userData as { username?: unknown, age?: unknown, hobbies?: unknown };
  
  if( !username || typeof username !== 'string' || typeof age !== 'number' || age < 0 || !Array.isArray(hobbies)) {
    return false
  }

  return true
}