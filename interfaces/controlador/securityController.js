const express = require('express');
const router = express.Router();
const userService = require('../../dominio/usuario/userService');

router.post('/register', async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const token = await userService.login(req.body);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

router.get('/profile/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const profile = await userService.Profile(token);
        res.json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Nuevo endpoint para obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/follow/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userToFollowId = req.body.userToFollowId;
        await userService.followUser(userId, userToFollowId);
        res.status(200).json({ message: 'Usuario seguido exitosamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/unfollow/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userToUnfollowId = req.body.userToUnfollowId;
        await userService.unfollowUser(userId, userToUnfollowId);
        res.status(200).json({ message: 'Usuario dejado de seguir exitosamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Nuevo endpoint para obtener los usuarios seguidos por el usuario autenticado
router.get('/followedUsers/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const followedUsers = await userService.getFollowedUsers(token);
        res.json(followedUsers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
