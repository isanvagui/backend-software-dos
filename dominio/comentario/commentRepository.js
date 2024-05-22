const Comments = require('./comment');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    rate: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const CommentModel = mongoose.model('Comment', commentSchema);

class CommentsRepository {

    async searchCommentsByRate(rate) {
        try {
            const filters = {};
            filters.rate = rate;
            return await CommentModel.find(filters);
        } catch (error) {
            throw new Error('Error al buscar comentarios por calificación.');
        }
    }
    async createComment(commentData) {
        return await CommentModel.create(commentData);
    }

    async getCommentsByProductId(productId) {
        return await CommentModel.find({ productId });
    }

    async deleteComment(commentId) {
        return await CommentModel.findByIdAndDelete(commentId);
    }
}

module.exports = CommentsRepository;
