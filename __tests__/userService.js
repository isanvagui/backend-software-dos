const UserRepository = require('../dominio/usuario/userRepository');
const jwt = require('jsonwebtoken');

jest.mock('../dominio/usuario/userRepository');
jest.mock('jsonwebtoken');

const { register, login, Profile } = require('../dominio/usuario/userService');

describe('User Service', () => {
    let userRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    test('register should create a new user if email is not already registered', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'testpass', bio: 'Test bio', avatar: 'avatar.jpg' };
        userRepository.findByEmail.mockResolvedValue(null);
        userRepository.createUser.mockResolvedValue(userData);

        const user = await register(userData);
        expect(user).toEqual(userData);
    });

    test('login should return user info and token if credentials are valid', async () => {
        const credentials = { email: 'test@example.com', password: 'testpass' };
        const user = { _id: '123', username: 'testuser', email: 'test@example.com', password: 'testpass', bio: 'Test bio', avatar: 'avatar.jpg' };
        const token = 'jwt_token';
        userRepository.findByEmail.mockResolvedValue(user);
        jwt.sign.mockReturnValue(token);

        const result = await login(credentials);
        expect(result).toEqual([user, token]);
    });

    test('Profile should decode token and return user info', async () => {
        const token = 'jwt_token';
        const decodedToken = { userId: '123', username: 'testuser', email: 'test@example.com' };
        jwt.decode.mockReturnValue(decodedToken);

        const userinfo = await Profile(token);
        expect(userinfo).toEqual(decodedToken);
    });
});
