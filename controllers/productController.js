const productService = require("../services/productService");
async function getProducts(req, res) {
    try {
        let products = await productService.getProducts();
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
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = {
    getProducts,
    getProductById
};