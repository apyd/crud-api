import request from 'supertest';
import { server } from '../index';
import { ROUTES } from '../constants';
import { type UserData } from '../models/users.model';
import { users } from '../models/users.model';

describe('Users API', () => {
  let userData: UserData;
  let invalidId : string
  let invalidUserData: Record<string, unknown>

  beforeEach(() => {
    userData = {
      username: 'Test User',
      age: 25,
      hobbies: ['Reading', 'Gaming']
    }
    invalidId = '00000000-0000-0000-0000-000000000000'
    invalidUserData = {
      username: [],
      age: '12',
      hobbies: null
    }
  })

  afterEach(() => {
    users.length = 0
  })

  afterAll(() => {
    server.close();
  });

  it('should get all users', async () => {
    expect.assertions(2);
    const res = await request(server).get(ROUTES.USERS);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new user', async () => {
    expect.assertions(5)
    const res = await request(server)
      .post(ROUTES.USERS)
      .send(userData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual(userData.username);
    expect(res.body.age).toEqual(userData.age);
    expect(res.body.hobbies).toEqual(userData.hobbies);
  });

  it('should get a user by id', async () => {
    expect.assertions(5)
    const createUserResponse = await request(server)
      .post(ROUTES.USERS)
      .send(userData);
    const userId = createUserResponse.body.id
    const getUserResponse = await request(server).get(`${ROUTES.USERS}/${userId}`);
    expect(getUserResponse.statusCode).toEqual(200);
    expect(getUserResponse.body).toHaveProperty('id');
    expect(getUserResponse.body.username).toEqual(userData.username);
    expect(getUserResponse.body.age).toEqual(userData.age);
    expect(getUserResponse.body.hobbies).toEqual(userData.hobbies);
  });

  it('should update a user by id and return updated user', async () => {
    expect.assertions(5)
    const createUserResponse = await request(server)
      .post(ROUTES.USERS)
      .send(userData);
    const userId = createUserResponse.body.id
    const newUserData = {
      username: 'Test',
      age: 30,
      hobbies: []
    } 
    const updateUserResponse = await request(server)
      .put(`${ROUTES.USERS}/${userId}`)
      .send({...newUserData});
    expect(updateUserResponse.statusCode).toEqual(200);
    expect(updateUserResponse.body).toHaveProperty('id');
    expect(updateUserResponse.body.username).toEqual(newUserData.username);
    expect(updateUserResponse.body.age).toEqual(newUserData.age);
    expect(updateUserResponse.body.hobbies).toEqual(newUserData.hobbies);
  })

  it('should delete a user by id and return 204 code', async () => {
    expect.assertions(2)

    const createUserResponse = await request(server)
      .post(ROUTES.USERS)
      .send(userData);
    const userId = createUserResponse.body.id

    const deleteUserResponse = await request(server)
      .delete(`${ROUTES.USERS}/${userId}`)

    const getAllUsersResponse = await request(server).get(`${ROUTES.USERS}`)

    expect(deleteUserResponse.statusCode).toEqual(204)
    expect(getAllUsersResponse.body).toEqual([])
  })

  it('should return 404 when getting a user using invalid id', async () => {
    expect.assertions(1)
    const res = await request(server).get(`${ROUTES.USERS}/${invalidId}`)
    expect(res.statusCode).toEqual(404)
  })

  it('should return 404 when updating a user using invalid id', async () => {
    expect.assertions(1)
    const res = await request(server).put(`${ROUTES.USERS}/${invalidId}`).send({...userData})
    expect(res.statusCode).toEqual(404)
  })

  it('should return 404 when deleting a user using invalid id', async () => { 
    expect.assertions(1)
    const res = await request(server).delete(`${ROUTES.USERS}/${invalidId}`)
    expect(res.statusCode).toEqual(404)
  })

  it('should return 400 when creating a user with missing data', async () => {
    expect.assertions(1)
    const res = await request(server).post(`${ROUTES.USERS}`).send({ ...invalidUserData })
    expect(res.statusCode).toEqual(400)
  })

  it('should return 400 when updating a user with invalid data', async () => {
    expect.assertions(1)
    const createUserRes = await request(server)
      .post(ROUTES.USERS)
      .send(userData);
    const userId = createUserRes.body.id
    const res = await request(server).put(`${ROUTES.USERS}/${userId}`).send({...invalidUserData})
    expect(res.statusCode).toEqual(400)
  })
});