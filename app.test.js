const request = require('supertest');
const app = require('./Server');

describe('GET /api/hello', () => {
  it('should respond with a json message', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World!' });
  });
});