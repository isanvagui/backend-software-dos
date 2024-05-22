// product.js
class Product {
  constructor(name, description, url, tags, userId, username, rateAverage) {
    this.name = name;
    this.description = description;
    this.url = url;
    this.tags = tags;
    this.userId = userId;
    this.username = username;
    this.rateAverage = rateAverage;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  setName(name) {
    this.name = name;
    this.updatedAt = new Date();
  }

  setDescription(description) {
    this.description = description;
    this.updatedAt = new Date();
  }

  setUrl(url) {
    this.url = url;
    this.updatedAt = new Date();
  }

  setTags(tags) {
    this.tags = tags;
    this.updatedAt = new Date();
  }

  setUserId(userId) {
    this.userId = userId;
    this.updatedAt = new Date();
  }

  setUsername(username) {
    this.username = username;
    this.updatedAt = new Date();
  }

  setRateAverage(rateAverage) {
    this.rateAverage = rateAverage;
    this.updatedAt = new Date();
  }
}

module.exports = Product;
