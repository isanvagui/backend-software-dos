const UserRepository = require('../usuario/userRepository');
const userRepository = new UserRepository();
const jwt = require('jsonwebtoken');
const User = require('../usuario/user');

async function register(userData) {
    const existingUser = await userRepository.findByEmail({ email: userData.email });
    if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
    }

    const user = new User(
        userData.username,
        userData.email,
        userData.password,
        userData.bio,
        userData.avatar
    );

    await userRepository.createUser(user);
    return user;
}

async function login(credentials) {
    const user = await userRepository.findByEmail({ email: credentials.email });
    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    if (credentials.password != user.password) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign({ userId: user._id, username: user.username, email: user.email, contrasena: user.password, bio: user.bio, avatar: user.avatar }, 'secret', { expiresIn: '1h' });

    const caracteristicas = [
        user,
        token
    ];

    return caracteristicas;
}

async function Profile(token) {
    try {
        const userinfo = jwt.decode(token);
        return userinfo;
    } catch (error) {
        throw new Error('Error al buscar Perfil');
    }
}

// followers
async function followUser(userId, userToFollowId) {
    return userRepository.followUser(userId, userToFollowId);
}

async function unfollowUser(userId, userToUnfollowId) {
    return userRepository.unfollowUser(userId, userToUnfollowId);
}

// Nuevo método para obtener todos los usuarios
async function getAllUsers() {
    try {
        const users = await userRepository.findAll();
        return users;
    } catch (error) {
        throw new Error('Error al obtener la lista de usuarios');
    }
}

// Nuevo método para obtener los usuarios seguidos por el usuario autenticado
async function getFollowedUsers(token) {
    try {
        const decoded = jwt.verify(token, 'secret');
        const user = await userRepository.findById(decoded.userId);
        return user.followers; // Devuelve la lista de usuarios seguidos
    } catch (error) {
        throw new Error('Error al obtener los usuarios seguidos');
    }
}

module.exports = { Profile, register, login, followUser, unfollowUser, getAllUsers, getFollowedUsers };
