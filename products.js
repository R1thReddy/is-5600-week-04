// products.js
const fs = require('fs').promises
const { get } = require('express/lib/response')
const path = require('path')
const { title } = require('process')

const productsFile = path.join(__dirname, 'data/full-products.json')

async function list (options = {}) {
    const { offset = 0, limit = 25, tag } = options
    const data = await fs.readFile(productsFile)
  
    return JSON.parse(data)
    .filter(product => {
        if (!tag) {
            return product
        }
        return product.tags.find(({title}) => title == tag)
    })
    
    .slice(offset, offset + limit) // Slice the products
}
const updateProduct = (id, updatedData) => {
    const productdetails = products.findIndex((product) => product.id === id);
    if (productdetails === -1) return null;
    const updatedProduct = { ...products[productdetails], ...updatedData };
    products[productdetails] = updatedProduct;

    console.log(`Product with ID number ${id} has been updated:`, updatedProduct);
    return updatedProduct;
};
const deleteProduct = (id) => {
    const productdetails = products.findIndex((product) => product.id === id);
    if (productdetails === -1) return null;

    const deletedProduct = products.splice(productdetails, 1);  
    console.log(`Product with ID Number ${id} was deleted:`, deletedProduct[0]);
    return deletedProduct[0];
};
module.exports = {
    list,
    get,
    updateProduct,
    deleteProduct
    
  }