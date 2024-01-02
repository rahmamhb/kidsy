const db = require('../db');

const readAll = (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT * FROM category WHERE productID = ?';
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
    readAll,
    readOne,
};