import Product from "./Product.js";

class ProductService {
  async getAll() {
    const products = await Product.find();
    return products;
  }
}

export default new ProductService();
