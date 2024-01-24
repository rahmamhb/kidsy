const db = require('../db');

const create = async (req, res) => {
  const {
      productName,
      productDescription,
      productPrice,
      productDiscount,
      productCategory,
      productQuantity,
      productColor1 ,
      productColor2 ,
      productColor3 ,
  } = req.body;
  const productImg = req.file.filename ;

    try {
        console.log(req.body)
        const productQuery = 'INSERT INTO product VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const productValues = [
            productName,
            productDescription,
            productImg,
            null,
            null,
            productPrice,
            productDiscount,
            productCategory,
            productQuantity,
        ];

        const productResult = await new Promise((resolve, reject) => {
          db.query(productQuery, productValues, function (err, result, fields) {
            if (err) reject(err);
            resolve(result);
          });
        });
    
        const productID = productResult.insertId;

      // Iterate over productColors array from req.body
        for (let i = 1 ; i<4 ; i++) {
          const colorQuery = 'INSERT INTO color VALUES (NULL, ?)';
          const value = `productColor${i}`
          const colorValues = [req.body[value]];
          const colorResult = await new Promise((resolve, reject) => {
            db.query(colorQuery, colorValues, function (err, result, fields) {
              if (err) reject(err);
              resolve(result);
            });
          });
    
          const colorID = colorResult.insertId;
  
        const productColorQuery = 'INSERT INTO product_color VALUES (?, ?)';
        const productColorValues = [productID, colorID];
        await new Promise((resolve, reject) => {
          db.query(productColorQuery, productColorValues, function (err, result, fields) {
            if (err) reject(err);
            resolve(result);
          });
        });
      }
  
      const newItem = {
        id: productID,
        productName,
        productDescription,
        productImg,
        productPrice,
        productDiscount,
        productCategory,
        productQuantity,
        colors: req.body.productColors,
      };
          res.status(201).json(newItem);
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

const readAll = (req, res) => {
    const sql = 'SELECT p.*, c.categoryName AS "categoryName", COUNT(r.reviewID) AS "productReviewsNbr", AVG(r.reviewRate) AS "productRating" FROM product p JOIN category c ON c.categoryID = p.productCategory LEFT JOIN review r ON r.productID = p.productID AND r.reviewApproved = 1 GROUP BY p.productID, p.productName, p.productDescription, p.productImg, p.productPrice, p.productDiscount, p.productCategory, p.productQuantity, c.categoryName; '
    db.query(sql , (err , results)=>{
        if(err){
            console.error('Error retrieving items: ', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    })
};
const readOne = (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT p.*, c.categoryName AS "categoryName", COUNT(r.reviewID) AS "productReviewsNbr", AVG(r.reviewRate) AS "productRating" FROM product p JOIN category c ON c.categoryID = p.productCategory LEFT JOIN review r ON r.productID = p.productID AND r.reviewApproved = 1 WHERE p.productID = ? GROUP BY p.productID, p.productName, p.productDescription, p.productImg, p.productPrice, p.productDiscount, p.productCategory, p.productQuantity, c.categoryName';
    const values = [itemId];
  
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
const readTopSix = (req, res) => {
    const sql = 'SELECT p.*, c.categoryName AS "categoryName", COUNT(r.reviewID) AS "productReviewsNbr", AVG(r.reviewRate) AS "productRating" FROM product p JOIN category c ON c.categoryID = p.productCategory LEFT JOIN review r ON r.productID = p.productID AND r.reviewApproved = 1 GROUP BY p.productID, p.productName, p.productDescription, p.productImg, p.productPrice, p.productDiscount, p.productCategory, p.productQuantity, c.categoryName ORDER BY `productRating` DESC LIMIT 6'
    db.query(sql , (err , results)=>{
        if(err){
            console.error('Error retrieving items: ', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    })
};

const deleteOne = (req, res) => {
    const itemId = req.params.id;
    const sql = 'DELETE FROM product WHERE productID = ?';
    const values = [itemId];
  
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
}
  
module.exports = {
    create,
    readAll,
    readOne,
    readTopSix,
    deleteOne,
};