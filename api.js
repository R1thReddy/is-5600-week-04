const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')


/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  }
  
  /**
   * List all products
   * @param {object} req
   * @param {object} res
   */
  async function listProducts(req, res) {


    const { offset = 0, limit = 25, tag } = req.query


    try {
      res.json(await Products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag,
        }))
    
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
  
async function getProduct (req, res, next) {

    const { id } = req.params

  try {
    const product = await Products.get(id)
    if (!product) {
      // next() is a callback that will pass the request to the next available route in the stack
      return next()
    }

    return res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function createProduct (req, res) {
    console.log('request body:', req.body)
    res.json(req.body)
}

async function deleteProduct (req, res) {
    const productId = req.params.id;
    products.delete(productId);
    res.status(202).send(`Product with ID ${productId} deleted.`);
}

async function updateProduct (req, res) {
        const { id } = req.params;
        const updatedData = req.body;
        
        const updatedProduct = Products.updateProduct(id, updatedData);
        
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    };
module.exports = autoCatch({
    handleRoot,
    listProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
});