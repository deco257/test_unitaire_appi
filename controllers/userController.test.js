// userController.test.js
const request = require('supertest');
const sequelize = require('../database');
const app = require('../Server'); // Importer l'application
const User = require('../models/User');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Réinitialise la base de données avant les tests
});

afterAll(async () => {
  await sequelize.close(); // Ferme la connexion à la base de données après les tests
});

describe('User API', () => {
  let userId; // Variable pour stocker l'ID de l'utilisateur créé

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ nom: 'Doe', prenom: 'John', username: 'johndoe', adresse: '123 Main St' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id'); // Vérifie que l'utilisateur a un ID
    expect(response.body.nom).toBe('Doe');

    userId = response.body.id; // Stocke l'ID pour les tests suivants
  });

  it('should get all users', async () => {
    const response = await request(app).get('/users');

    expect(response.statusCode).toBe(200);
    // expect(response.body).toEqual(
    //   expect.arrayContaining([expect.objectContaining({ username: 'derick' })])
    // );
  });

  it('should update the user', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .send({ nom: 'Smith', prenom: 'John', username: 'johnsmith', adresse: '456 Main St' });

    expect(response.statusCode).toBe(200);
    expect(response.body.nom).toBe('Smith'); // Vérifie que le nom a été mis à jour
    expect(response.body.username).toBe('johnsmith'); // Vérifie que le nom d'utilisateur a été mis à jour
  });

  it('should delete the user', async () => {
    const response = await request(app).delete(`/users/${userId}`);

    expect(response.statusCode).toBe(204); // Vérifie que la suppression a réussi

    const getResponse = await request(app).get(`/users`);
    expect(getResponse.body).not.toEqual(expect.arrayContaining([expect.objectContaining({ id: userId })])); // Vérifie que l'utilisateur n'existe plus
  });
});