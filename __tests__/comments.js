const Comments = require('../dominio/comentario/comment');

describe('Comments', () => {
  test('constructor should create a new comment object with correct properties', () => {
    const productId = '123';
    const userId = '456';
    const content = 'Test comment content';
    const rate = 4;
    
    const comment = new Comments(productId, userId, content, rate);

    expect(comment).toHaveProperty('productId', productId);
    expect(comment).toHaveProperty('userId', userId);
    expect(comment).toHaveProperty('content', content);
    expect(comment).toHaveProperty('rate', rate);
    expect(comment).toHaveProperty('createdAt');
    expect(comment).toHaveProperty('updatedAt');
  });

  test('setContent should update content and updatedAt property', () => {
    const productId = '123';
    const userId = '456';
    const content = 'Test comment content';
    const rate = 4;
    
    const comment = new Comments(productId, userId, content, rate);
    const newContent = 'Updated comment content';
    comment.setContent(newContent);

    expect(comment).toHaveProperty('content', newContent);
    expect(comment.updatedAt).toEqual(expect.any(Date)); // Comprobamos que updatedAt es de tipo Date
  });

  test('setRate should update rate and updatedAt property', () => {
    const productId = '123';
    const userId = '456';
    const content = 'Test comment content';
    const rate = 4;
    
    const comment = new Comments(productId, userId, content, rate);
    const newRate = 5;
    comment.setRate(newRate);

    expect(comment).toHaveProperty('rate', newRate);
    expect(comment.updatedAt).toEqual(expect.any(Date)); // Comprobamos que updatedAt es de tipo Date
  });
});
