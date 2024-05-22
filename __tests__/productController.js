const express = require('express');
const request = require('supertest');
const productService = require('../../dominio/producto/productService');
const commentService = require('../../dominio/comentario/commentService');
const CommentRepository = require("../../dominio/comentario/commentRepository");
const commentRepository = new CommentRepository();
const router = require('./productController');

jest.mock('../../dominio/producto/productService');
jest.mock('../../dominio/comentario/commentService');
jest.mock("../../dominio/comentario/commentRepository");

describe('Product Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/v1/product should create a new product', async () => {
    const mockedProduct = { /* mock product data */ };
    productService.createProduct.mockResolvedValue(mockedProduct);
    const mockRequest = { /* mock request data */ };
    const response = await request(router).post('/').send(mockRequest);
    expect(response.statusCode).toBe(201);
    expect(productService.createProduct).toHaveBeenCalledWith(mockRequest);
    expect(response.body).toEqual(mockedProduct);
  });

  test('PUT /api/v1/product/:productId should update a product', async () => {
    const mockedProduct = { /* mock product data */ };
    productService.updateProduct.mockResolvedValue(mockedProduct);
    const productId = 'mockedProductId';
    const mockRequest = { /* mock request data */ };
    const response = await request(router).put(`/${productId}`).send(mockRequest);
    expect(response.statusCode).toBe(200);
    expect(productService.updateProduct).toHaveBeenCalledWith(productId, mockRequest);
    expect(response.body).toEqual(mockedProduct);
  });

  test('DELETE /api/v1/product/:productId should delete a product', async () => {
    const productId = 'mockedProductId';
    const userId = 'mockedUserId';
    const mockRequest = { /* mock request data */ };
    productService.deleteProduct.mockResolvedValue();
    const response = await request(router).delete(`/${productId}`).query({ userId });
    expect(response.statusCode).toBe(204);
    expect(productService.deleteProduct).toHaveBeenCalledWith(productId, userId);
  });

  test('GET /api/v1/product/buscar should search products', async () => {
    const mockRequestQuery = { /* mock request query */ };
    const mockProducts = [{ /* mock product data */ }];
    productService.searchProductsByQuery.mockResolvedValue(mockProducts);
    commentRepository.getCommentsByProductId.mockResolvedValue([]);
    const response = await request(router).get('/buscar').query(mockRequestQuery);
    expect(response.statusCode).toBe(200);
    expect(productService.searchProductsByQuery).toHaveBeenCalledWith(mockRequestQuery);
    expect(response.body).toEqual(mockProducts);
  });

  test('GET /api/v1/product/getDetail/:productId should get product details', async () => {
    const productId = 'mockedProductId';
    const mockRequestQuery = { fields: 'field1,field2' };
    const mockProduct = { /* mock product data */ };
    productService.getProductByID.mockResolvedValue(mockProduct);
    const response = await request(router).get(`/getDetail/${productId}`).query(mockRequestQuery);
    expect(response.statusCode).toBe(200);
    expect(productService.getProductByID).toHaveBeenCalledWith(productId);
    expect(response.body).toEqual(/* expected response based on mocked product and fields */);
  });

  test('GET /api/v1/product/getRateAverage/:productId should get product rate average', async () => {
    const productId = 'mockedProductId';
    const mockProduct = { /* mock product data */ };
    productService.getProductByID.mockResolvedValue(mockProduct);
    const response = await request(router).get(`/getRateAverage/${productId}`);
    expect(response.statusCode).toBe(200);
    expect(productService.getProductByID).toHaveBeenCalledWith(productId);
    expect(response.body).toEqual(/* expected response based on mocked product rate average */);
  });

  test('GET /api/v1/product/getComments/:productId should get product comments', async () => {
    const productId = 'mockedProductId';
    const mockComments = [{ /* mock comment data */ }];
    commentService.getReviewsByProductId.mockResolvedValue(mockComments);
    const response = await request(router).get(`/getComments/${productId}`);
    expect(response.statusCode).toBe(200);
    expect(commentService.getReviewsByProductId).toHaveBeenCalledWith(productId);
    expect(response.body).toEqual(mockComments);
  });
});
