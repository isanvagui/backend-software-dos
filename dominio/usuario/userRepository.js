const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: String,
  avatar: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', userSchema);

class UserRepository {
  async followUser(userId, userToFollowId) {
    return UserModel.findByIdAndUpdate(userId, { $addToSet: { followers: userToFollowId } }, { new: true });
  }

  async unfollowUser(userId, userToUnfollowId) {
    return UserModel.findByIdAndUpdate(userId, { $pull: { followers: userToUnfollowId } }, { new: true });
  }

  async createUser(user) {
    return UserModel.create(user);
  }

  async findByUsername(username) {
    return UserModel.findOne({ username });
  }

  async findByEmail(email) {
    return UserModel.findOne(email);
  }

  async findById(id) {
    return UserModel.findById(id).populate('followers').exec();
  }

  async updateUser(id, updates) {
    return UserModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteUser(id) {
    return UserModel.findByIdAndDelete(id);
  }

  async Profile(filters) {
    return UserModel.find(filters);
  }

  async findAll() {
    return UserModel.find({});
  }
}

module.exports = UserRepository;
