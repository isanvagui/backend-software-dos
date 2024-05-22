const express = require('express');
const router = express.Router();
const productService = require('../../dominio/producto/productService');
const commentService = require('../../dominio/comentario/commentService');
const CommentRepository = require("../../dominio/comentario/commentRepository");
const commentRepository = new CommentRepository();

router.post('/', async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:productId', async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.productId, req.body);
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            throw new Error('Se requiere el ID del usuario en el query string');
        }

        await productService.deleteProduct(req.params.productId, userId);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/buscar', async (req, res) => {
    try {
        const { name, description, tags, url, rateAverage } = req.query;

        const filters = {};
        if (name) filters.name = new RegExp(name, 'i'); // Búsqueda por nombre (insensible a mayúsculas y minúsculas)
        if (description) filters.description = new RegExp(description, 'i'); // Búsqueda por descripción (insensible a mayúsculas y minúsculas)
        if (tags) filters.tags = { $in: tags.split(',') }; // Búsqueda por etiquetas (separadas por coma)
        if (url) filters.url = new RegExp(url, 'i'); // Búsqueda por URL (insensible a mayúsculas y minúsculas)
        if (rateAverage) filters.rateAverage = parseInt(rateAverage);

        const products = await productService.searchProductsByQuery(filters);

        let updatedProducts = [...products];

        for (let i = 0; i < updatedProducts.length; i++) {
            const productId = updatedProducts[i]._id; // Assuming _id is the unique identifier for product
            let comments = await commentRepository.getCommentsByProductId(productId); // Assuming there's a method to get comments by product ID
            updatedProducts[i]._doc.comments = comments; // Assuming there's a property named 'comments' in product to store comments
        }

        res.json(updatedProducts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/getDetail/:productId', async (req, res) => {
    try {

        const fieldsParam = req.query.fields;
        const productId = req.params.productId;

        const fieldsToSelect = fieldsParam.split(',');

        const product = await productService.getProductByID(productId);

        const copiedObject = {};
        fieldsToSelect.forEach(propertyName => {
            copiedObject[propertyName] = product[propertyName];
        });

        // Return the filtered product details
        res.json(copiedObject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getRateAverage/:productId', async (req, res) => {
    try {

        const productId = req.params.productId;

        const fieldsToSelect = ['rateAverage']

        const product = await productService.getProductByID(productId);

        const copiedObject = {};
        fieldsToSelect.forEach(propertyName => {
            copiedObject[propertyName] = product[propertyName];
        });

        res.json(copiedObject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getComments/:productId', async (req, res) => {
    try {

        const productId = req.params.productId;

        const comments = await commentService.getReviewsByProductId(productId);

        res.json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;