const Product = require('../dominio/producto/product');

describe('Product', () => {
  test('constructor should create a new product object with correct properties', () => {
    const name = 'Test Product';
    const description = 'Test description';
    const url = 'https://example.com';
    const tags = ['tag1', 'tag2'];
    const userId = '123';
    const username = 'testuser';
    const rateAverage = 4;
    
    const product = new Product(name, description, url, tags, userId, username, rateAverage);

    expect(product).toHaveProperty('name', name);
    expect(product).toHaveProperty('description', description);
    expect(product).toHaveProperty('url', url);
    expect(product).toHaveProperty('tags', tags);
    expect(product).toHaveProperty('userId', userId);
    expect(product).toHaveProperty('username', username);
    expect(product).toHaveProperty('rateAverage', rateAverage);
    expect(product).toHaveProperty('createdAt');
    expect(product).toHaveProperty('updatedAt');
  });

  test('setName should update name and updatedAt property', () => {
    const name = 'Test Product';
    const newName = 'Updated Product Name';
    const product = new Product(name, '', '', [], '', '', 0);
    product.setName(newName);

    expect(product.name).toBe(newName);
    expect(product.updatedAt).toEqual(expect.any(Date));
  });

  test('setDescription should update description and updatedAt property', () => {
    const description = 'Test description';
    const newDescription = 'Updated Product Description';
    const product = new Product('', description, '', [], '', '', 0);
    product.setDescription(newDescription);

    expect(product.description).toBe(newDescription);
    expect(product.updatedAt).toEqual(expect.any(Date));
  });

  // Similar tests for setUrl, setTags, setUserId, setUsername, setRateAverage
});
