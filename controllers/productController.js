const productService = require("../services/productService");
const {setCache, invalidateCache} = require("../middleware/cache");
async function getProducts(req, res) {
    try {
        let products = await productService.getProducts();
        setCache(req.url, products);
        res.setHeader("X-Cache", "MISS");
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
}
async function getProductById(req, res) {
    try {
        let product =
            await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        setCache(req.url, product);
        res.setHeader("X-Cache", "MISS");
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
}
async function createProduct(req, res) {
    try {
        let product =
            await productService.createProduct(req.body);
        invalidateCache();
        res.status(201).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
}
module.exports = {
    getProducts,
    getProductById,
    createProduct
};