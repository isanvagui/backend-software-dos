const ProductRepository = require('./productRepository');
const productRepository = new ProductRepository();
const CommentRepository = require('../comentario/commentRepository');
const commentRepository = new CommentRepository();

const Product = require('./product');

async function createProduct(productData) {
  const product = new Product(productData.name, productData.description, productData.url, productData.tags, productData.userId, productData.username);
  const savedProduct = await productRepository.createProduct(product);
  return savedProduct;
}

async function searchProductsByQuery(filters) {
    try {
        let repProduct = productRepository.searchProductsByQuery(filters);
        
        return repProduct;
    } catch (error) {
        throw new Error('Error al buscar productos por calificación de comentarios.');
    }
}
async function getProductsByUserId(userId) {
  return productRepository.findByUserId(userId);
}

async function getProductByID(productId) {
    const product = await productRepository.findById(productId);
    if (!product) {
        throw new Error('Producto no encontrado');
    }

    return product;
}

async function getProductReviewsByID(productId) {
    const product = await productRepository.findById(productId);
    if (!product) {
        throw new Error('Producto no encontrado');
    }

    return product;
}
async function updateProduct(productId, body) {

    const product = await productRepository.findById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    if (product.userId.toString() !== body.userId) {
      throw new Error('No tienes permiso para editar este producto');
    }
  
    return productRepository.updateProduct(productId, body);
}

async function deleteProduct(productId,userId) {

    const product = await productRepository.findById(productId);
    if (!product) {
        throw new Error('Producto no encontrado');
    }

    if (product.userId.toString() !== userId) {
        throw new Error('No tienes permiso para editar este producto');
    }

    return await productRepository.deleteProduct(productId);;
}

module.exports = { searchProductsByQuery, createProduct, getProductsByUserId, updateProduct, deleteProduct,getProductByID };

