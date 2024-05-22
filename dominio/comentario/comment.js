// comments.js
class Comments {
  constructor(productId, userId, content, rate) {
    this.productId = productId;
    this.userId = userId;
    this.content = content;
    this.rate = rate;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  setContent(content) {
    this.content = content;
    this.updatedAt = new Date();
  }

  setRate(rate) {
    this.rate = rate;
    this.updatedAt = new Date();
  }
}

module.exports = Comments;
