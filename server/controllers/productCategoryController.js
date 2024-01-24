const db = require('../db');

const readAll = (req, res) => {
    const categoryId = req.params.id;
    const sql = `SELECT p.*, c.categoryName AS "categoryName", COUNT(r.reviewID) AS "productReviewsNbr", AVG(r.reviewRate) AS "productRating" FROM product p 
                  JOIN category c ON c.categoryID = p.productCategory 
                  LEFT JOIN review r ON r.productID = p.productID AND r.reviewApproved = 1 
                  WHERE p.productCategory = ? 
                  GROUP BY p.productID, p.productName, p.productDescription, p.productImg, p.productPrice, p.productDiscount, p.productCategory, p.productQuantity, c.categoryName
                `;
    const values = [categoryId];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error retrieving item: ', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'category product not found' });
      }
  
      
      res.status(200).json(results);
    });
};
const readOne = (req, res) => {
    const categoryId= req.params.id;
    const itemId= req.params.prodid;
    const sql = `SELECT p.*, c.categoryName AS "categoryName", COUNT(r.reviewID) AS "productReviewsNbr", AVG(r.reviewRate) AS "productRating" FROM product p 
                  JOIN category c ON c.categoryID = p.productCategory 
                  LEFT JOIN review r ON r.productID = p.productID AND r.reviewApproved = 1 
                  WHERE p.productID = ? AND p.productCategory = ? 
                  GROUP BY p.productID, p.productName, p.productDescription, p.productImg, p.productPrice, p.productDiscount, p.productCategory, p.productQuantity, c.categoryName
                `;
    const values = [itemId , categoryId];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error retrieving item: ', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'category not found' });
      }
  
      const item = results[0];
      res.status(200).json(item);
    });
};

  
module.exports = {
    readAll,
    readOne,
};