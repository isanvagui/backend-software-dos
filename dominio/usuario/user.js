class User {
  constructor(username, email, password, bio, avatar) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.bio = bio;
    this.avatar = avatar;
    this.followers = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  setUsername(username) {
    this.username = username;
    this.updatedAt = new Date();
  }

  setEmail(email) {
    this.email = email;
    this.updatedAt = new Date();
  }

  setPassword(password) {
    this.password = password;
    this.updatedAt = new Date();
  }

  setBio(bio) {
    this.bio = bio;
    this.updatedAt = new Date();
  }

  setAvatar(avatar) {
    this.avatar = avatar;
    this.updatedAt = new Date();
  }
  // Metodo para seguir un usuario
  follow(userToFollow) {
    this.followers.push(userToFollow);
    this.updatedAt = new Date();
  }

  // Método para dejar de seguir a un usuario 
  unfollow(userToUnfollow) {
    this.followers = this.followers.filter(follower => follower !== userToUnfollow);
    this.updatedAt = new Date();
  }
}

module.exports = User;
