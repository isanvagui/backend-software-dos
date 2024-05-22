const ProductRepository = require('../dominio/producto/productRepository');
const CommentRepository = require('../dominio/comentario/commentRepository');
const ProductService = require('../dominio/producto/productService');

jest.mock('../dominio/producto/productRepository');
jest.mock('../dominio/comentario/commentRepository');

describe('Product Service', () => {
    let productService;
    let productRepository;
    let commentRepository;

    beforeEach(() => {
        productRepository = new ProductRepository();
        commentRepository = new CommentRepository();
        productService = ProductService
    });

    test('createProduct should create a new product', async () => {
        const newProductData = {
            name: 'Test Product',
            description: 'Test description',
            url: 'https://example.com',
            tags: ['tag1', 'tag2'],
            userId: '123',
            username: 'testuser'
        };
        const savedProduct = { ...newProductData, _id: '123' };
        productRepository.createProduct.mockResolvedValue(savedProduct);

        const product = await productService.createProduct(newProductData);
        expect(product).toEqual(savedProduct);
    });

});
