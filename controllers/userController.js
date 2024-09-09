// userController.js
const User = require('../models/User');

// Fonction pour ajouter un utilisateur
const addUser = async (req, res) => {
  try {
    const { nom, prenom, username, adresse } = req.body;
    const user = await User.create({ nom, prenom, username, adresse });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fonction pour afficher tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fonction pour modifier un utilisateur
const updateUser = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'utilisateur à partir des paramètres de l'URL
  const { nom, prenom, username, adresse } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Mettre à jour les informations de l'utilisateur
    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom;
    user.username = username || user.username;
    user.adresse = adresse || user.adresse;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'utilisateur à partir des paramètres de l'URL
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy(); // Supprimer l'utilisateur
    res.status(204).send(); // Répondre avec un statut 204 No Content
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addUser, getUsers, updateUser, deleteUser };