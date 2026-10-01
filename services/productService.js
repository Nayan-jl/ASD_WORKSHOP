const {readFile,writeFile} = require('../database/db');
async function getProducts() {
    const products = await readFile();
    return products;
}
async function getProductById(id) {
    const products = await readFile();
    id = Number(id);
    const product = products.find((item) => {
        return item.id === id;
    });
    return product;
}
async function createProduct(product) {
    const products = await readFile();
    products.push(product);
    await writeFile(products);
    return product;
}
async function updateProduct(id, data) {
    const products = await readFile();
    const index = products.findIndex((item) => {
        return item.id === Number(id);
    });
    if (index === -1) {
        return null;
    }
    products[index] = {
        ...products[index],
        ...data
    };
    await writeFile(products);
    return products[index];
}
async function patchProduct(id, data) {
    return await updateProduct(id, data);
}
async function deleteProduct(id) {
    const products = await readFile();

    const index = products.findIndex((item) => {
        return item.id === Number(id);
    });
    if (index === -1) {
        return null;
    }
    const deletedProduct = products.splice(index, 1)[0];
    await writeFile(products);
    return deletedProduct;
}
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};