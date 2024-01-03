import ProductService from "./ProductService.js";

class ProductController {
  async getAll(req, res) {
    try {
      const products = await ProductService.getAll();
      return res.json(products);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

export default new ProductController();
