const db = require('../db');

const create = (req, res) => {

    const { categoryName } = req.body;
  
    const sql = 'INSERT INTO category VALUES (?, ?)';
    const values = [NULL , categoryName];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating item: ', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      const newItem = {
        id: result.insertId,  // Automatically generated ID
        categoryName,
      };
  
      res.status(201).json(newItem);
    });
};

const readAll = (req, res) => {
    const sql = "SELECT * FROM category"
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
    const sql = 'SELECT * FROM category WHERE id = ?';
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
  
module.exports = {
    create,
    readAll,
    readOne,
};