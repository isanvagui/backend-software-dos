const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  url: String,
  tags: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true, unique: true},
  rateAverage: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model('Product', productSchema);

class ProductRepository {
  async createProduct(product) {
    return ProductModel.create(product);
  }

  async searchProductsByQuery(filters) {
    return ProductModel.find(filters)
  }

  async findByUserId(userId) {
    return ProductModel.find({ userId });
  }

  async findById(id) {
    return ProductModel.findById(id);
  }

  async updateProduct(id, updates) {
    return ProductModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteProduct(id) {
    return ProductModel.findByIdAndDelete(id);
  }
}

module.exports = ProductRepository;
