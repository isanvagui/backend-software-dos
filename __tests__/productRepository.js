const mongoose = require('mongoose');
const ProductRepository = require('../dominio/producto/productRepository');

// Simulamos el modelo de producto
jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');
    const mockProductModel = {
        create: jest.fn(),
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn()
    };
    return {
        ...actualMongoose,
        model: jest.fn().mockReturnValue(mockProductModel)
    };
});

describe('Product Repository', () => {
    let productRepository;

    beforeEach(() => {
        productRepository = new ProductRepository();
    });

    test('createProduct should create a new product', async () => {
        const newProduct = { name: 'Test Product', userId: '123', username: 'testuser' };
        mongoose.model().create.mockResolvedValue(newProduct);

        const product = await productRepository.createProduct(newProduct);
        expect(product).toEqual(newProduct);
    });

    test('searchProductsByQuery should return products based on filters', async () => {
        const mockFilters = { name: 'Test Product' };
        const mockProducts = [{ name: 'Test Product', userId: '123', username: 'testuser' }];
        mongoose.model().find.mockResolvedValue(mockProducts);

        const products = await productRepository.searchProductsByQuery(mockFilters);
        expect(products).toEqual(mockProducts);
    });

    // Otros tests para las demás funciones del repositorio...

});
