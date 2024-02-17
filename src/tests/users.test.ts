import request from 'supertest';
import { server } from '../index';
import { ROUTES } from '../constants';

describe('Users API', () => {
  let userId: string;
  let userData: any;

  afterAll(() => {
    server.close();
  });

  it('should get all users', async () => {
    const res = await request(server).get(ROUTES.USERS);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new user', async () => {
    userData = {
      username: 'Test User',
      age: 25,
      hobbies: ['Reading', 'Gaming']
    }

    const res = await request(server)
      .post(ROUTES.USERS)
      .send(userData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual('Test User');
    expect(res.body.age).toEqual(25);
    expect(res.body.hobbies).toEqual(['Reading', 'Gaming']);
    userId = res.body.id;
  });

  it('should get a user by id', async () => {
    const res = await request(server).get(`${ROUTES.USERS}/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual('Test User');
    expect(res.body.age).toEqual(25);
    expect(res.body.hobbies).toEqual(['Reading', 'Gaming']);
  });
});