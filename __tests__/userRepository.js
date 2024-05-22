const mongoose = require('mongoose');
const UserRepository = require('../dominio/usuario/userRepository');

// Simulamos mongoose y su modelo
jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');
    return {
        ...actualMongoose,
        model: jest.fn().mockReturnValue({
            create: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            find: jest.fn()
        })
    };
});

describe('User Repository', () => {
    let userRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    test('createUser should create a new user', async () => {
        const newUser = { username: 'testuser', email: 'test@example.com', password: 'testpass' };
        const savedUser = { ...newUser, _id: '123' };
        mongoose.model().create.mockResolvedValue(savedUser);

        const user = await userRepository.createUser(newUser);
        expect(user).toEqual(savedUser);
    });

    test('findByUsername should find a user by username', async () => {
        const username = 'testuser';
        const user = { username, email: 'test@example.com', password: 'testpass' };
        mongoose.model().findOne.mockResolvedValue(user);

        const foundUser = await userRepository.findByUsername(username);
        expect(foundUser).toEqual(user);
    });

    // Otros tests para las demás funciones del repositorio...

});
