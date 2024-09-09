// app.js
const express = require('express');
const sequelize = require('./database');
const { addUser, getUsers,updateUser,deleteUser } = require('./controllers/userController');

const app = express();
app.use(express.json());

// Routes dans les quelles je veux tester
app.post('/users', addUser);
app.get('/users', getUsers);
app.put('/users/:id', updateUser); // Route pour mettre à jour un utilisateur
app.delete('/users/:id', deleteUser); // Route pour supprimer un utilisateur

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Synchroniser la base de données et démarrer le serveur
const startServer = async () => {
  try {
    await sequelize.sync(); // Synchroniser les modèles avec la base de données
    const server = app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
    return server; // Retourner l'instance du serveur
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Démarrer le serveur seulement si le fichier est exécuté directement
if (require.main === module) {
  startServer();
}

// Exporter l'application pour les tests
module.exports = app;