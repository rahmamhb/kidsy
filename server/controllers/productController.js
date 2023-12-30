const db = require('../db');

const create = async (req, res) => {
  console.log(req.files)
  console.log(req.body.productImages)
  const {
      productName,
      productDescription,
      productPrice,
      productDiscount,
      productCategory,
      productQuantity,
      productColors,
  } = req.body;

  const images = req.files[0]; 
  console.log(images)

  db.beginTransaction(async (err) => {
      if (err) {
          console.error('Error starting transaction: ', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      try {
          
          const productQuery = 'INSERT INTO product VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          const productValues = [
              productName,
              productDescription,
              /*images[0].filename ||*/ null, 
              /*images[1].filename ||*/ null,
              /*images[2].filename ||*/ null,
              productPrice,
              productDiscount,
              productCategory,
              productQuantity,
          ];

          const [productResult] = await db.query(productQuery, productValues);
          const productId = productResult.insertId;

          // Second query: Insert into color table and associate with product
          for (const color in productColors) {
              const colorQuery = 'INSERT INTO color VALUES (NULL, ?)';
              const colorValues = [color];

              const [colorResult] = await db.query(colorQuery, colorValues);
              const colorId = colorResult.insertId;

              // Third query: Insert into product_color table
              const productColorQuery = 'INSERT INTO product_color VALUES (?, ?)';
              const productColorValues = [productId, colorId];

              await db.query(productColorQuery, productColorValues);
          }

          // Commit the transaction if all queries succeed
          db.commit((commitErr) => {
              if (commitErr) {
                  console.error('Error committing transaction: ', commitErr);
                  return res.status(500).json({ error: 'Internal Server Error' });
              }

              const newItem = {
                  id: productId,
                  productName,
                  productDescription,
                  productImg: null,
                  productImg1: null,
                  productImg2: null,
                  productPrice,
                  productDiscount,
                  productCategory,
                  productQuantity,
                  colors: productColors,
              };

              res.status(201).json(newItem);
          });
      } catch (queryErr) {
          // If any query fails, roll back the transaction
          db.rollback(() => {
              console.error('Error rolling back transaction: ', queryErr);
              res.status(500).json({ error: 'Internal Server Error' });
          });
      }
  });
};

const readAll = (req, res) => {
    const sql = "SELECT * FROM product"
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
    const sql = 'SELECT * FROM product WHERE id = ?';
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
    const sql = "SELECT * FROM product "
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
    const sql = 'DELETE FROM product WHERE id = ?';
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
};
const updateOne = (req, res) => {
    
};
  
module.exports = {
    create,
    readAll,
    readOne,
    readTopSix,
    deleteOne,
    updateOne,
};