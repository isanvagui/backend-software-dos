
const express = require('express');
const router = express.Router();
const commentService = require('../../dominio/comentario/commentService');

router.post('/rate', async (req, res) => {
    try {
        const { productId, userId, rate } = req.body;

        await commentService.rateProduct(productId, userId, rate);

        res.status(200).json({ message: 'Producto calificado exitosamente.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/new', async (req, res) => {
    try {
        const { productId, userId, content, rate } = req.body;

        await commentService.reviewProduct(productId, userId, content, rate);

        res.status(200).json({ message: 'Reseña agregada exitosamente.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/reviews/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        const reviews = await commentService.getCommentsByProductId(productId);

        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
