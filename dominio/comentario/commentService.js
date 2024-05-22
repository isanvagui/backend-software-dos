const CommentsRepository = require('./commentRepository');
const commentsRepository = new CommentsRepository();
const ProductRepository = require('../producto/productRepository');
const productRepository = new ProductRepository();
async function rateProduct(productId, userId, rate) {
        try {
            await productRepository.rateProduct(productId, userId, rate);
        } catch (error) {
            throw new Error('Error al calificar el producto.');
        }
    }

async function reviewProduct(productId, userId, content, rate) {
        try {
            const product = await productRepository.findById(productId);
            if (!product) {
                throw new Error('Producto no encontrado');
            }

            await commentsRepository.createComment({ productId, userId, content, rate });

            // Calculate the new average rate
            const comments = await commentsRepository.getCommentsByProductId(productId);
            const totalRates = comments.reduce((sum, comment) => sum + comment.rate, 0);
            const newRateAverage = totalRates / comments.length;

            // Update the product's rateAverage field
            product.rateAverage = newRateAverage;
            await productRepository.updateProduct(productId, product);

        } catch (error) {
            throw new Error('Error al agregar la reseña.');
        }
    }

async function getReviewsByProductId(productId) {
    const product = await productRepository.findById(productId);
    if (!product) {
        throw new Error('Producto no encontrado');
    }

    const comments = await commentsRepository.getCommentsByProductId(productId);

    return comments;
}
async function getProductAverageRating(productId) {
        try {
            return await productRepository.getProductAverageRating(productId);
        } catch (error) {
            throw new Error('Error al obtener la calificación promedio del producto.');
        }
    }


module.exports = {rateProduct,getProductAverageRating,reviewProduct,getReviewsByProductId};
