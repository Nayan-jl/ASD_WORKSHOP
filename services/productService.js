const { readFile } = require("../database/db");
async function getProducts() {
    let products = await readFile();
    return products;
}
async function getProductById(id) {
    let products = await readFile();
    id = Number(id);
    let product = products.find((item) => {
        return item.id === id;
    });
    return product;
}
module.exports = {
    getProducts,
    getProductById
};