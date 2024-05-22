const User = require('../dominio/usuario/user');

describe('User', () => {
  test('constructor should create a new user object with correct properties', () => {
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'testpass';
    const bio = 'Test bio';
    const avatar = 'avatar.jpg';
    
    const user = new User(username, email, password, bio, avatar);

    expect(user).toHaveProperty('username', username);
    expect(user).toHaveProperty('email', email);
    expect(user).toHaveProperty('password', password);
    expect(user).toHaveProperty('bio', bio);
    expect(user).toHaveProperty('avatar', avatar);
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
  });

  test('setUsername should update username and updatedAt property', () => {
    const username = 'testuser';
    const newUsername = 'updateduser';
    const user = new User(username, '', '', '', '');
    user.setUsername(newUsername);

    expect(user.username).toBe(newUsername);
    expect(user.updatedAt).toEqual(expect.any(Date));
  });

  test('setEmail should update email and updatedAt property', () => {
    const email = 'test@example.com';
    const newEmail = 'updated@example.com';
    const user = new User('', email, '', '', '');
    user.setEmail(newEmail);

    expect(user.email).toBe(newEmail);
    expect(user.updatedAt).toEqual(expect.any(Date));
  });

});
