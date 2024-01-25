const db = require('../db');

const create = (req, res) => {

    const { cartID, productID, productQuantityInCart } = req.body;

    // Check if the product is already in the cart
    db.query(
      'SELECT * FROM cart_product WHERE cartID = ? AND productID = ?',
      [cartID, productID],
      (error, results) => {
        if (error) {
          console.error('Error checking cart:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          if (results.length > 0) {
            // Product already in cart, update quantity
            db.query(
              'UPDATE cart_product SET productQuantityInCart = productQuantityInCart + 1 WHERE cartID = ? AND productID = ?',
              [cartID, productID],
              (updateError, updateResults) => {
                if (updateError) {
                  console.error('Error updating quantity:', updateError);
                  res.status(500).json({ error: 'Internal Server Error' });
                } else {
                  res.status(200).json({ status: 'Success' });
                }
              }
            );
          } else {
            db.query(
              'INSERT INTO cart_product (cartID, productID, productQuantityInCart) VALUES (?, ?, ?)',
              [cartID, productID, productQuantityInCart],
              (insertError, insertResults) => {
                if (insertError) {
                  console.error('Error inserting into cart:', insertError);
                  res.status(500).json({ error: 'Internal Server Error' });
                } else {
                  res.status(200).json({ status: 'Success' });
                }
              }
            );
          }
        }
      }
    );
};
  
const readAll = (req, res) => {
    const cartId= req.params.id;
    const sql = "SELECT p.* ,  cp.productQuantityInCart AS 'productCartQuantity' FROM product p JOIN cart c JOIN cart_product cp ON cp.cartID = c.cartID AND cp.productID = p.productID WHERE c.cartID = ?"
    const values = [cartId]
    db.query(sql , values , (err , results)=>{
        if(err){
            console.error('Error retrieving items: ', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    })
};
  
const deleteOne = (req, res) => {
    const productId = req.params.prodid;
    const cartId = req.params.id;
    const sql = 'DELETE FROM cart_product WHERE productID = ? AND cartID = ?';
    const values = [productId , cartId];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error deleting item: ', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'product not found' });
      }
  
      const item = results[0];
      res.status(200).json(item);
    });
};
const updateOne = (req, res) => {
    const productId = req.params.prodid;
    const cartId = req.params.id;
    const { productQuantityInCart } = req.body ;
    const sql = 'UPDATE cart_product SET productQuantityInCart = productQuantityInCart + ? WHERE productID = ? AND cartID = ?';
    const values = [productQuantityInCart, productId , cartId];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating item: ', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'product not found' });
      }
  
      const item = results[0];
      res.status(200).json(item);
    });
};

module.exports = {
    create,
    readAll,
    deleteOne,
    updateOne,
};