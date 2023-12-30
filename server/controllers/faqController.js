const db = require('../db');

const create = (req, res) => {

    const { faqQuestion , faqAnswer } = req.body;
  
    const sql = 'INSERT INTO faq (faqQuestion, faqAnswer , adminID) VALUES (?, ? , ?)';
    const values = [faqQuestion , faqAnswer , 1];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating item: ', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      const newItem = {
        id: result.insertId,  
        faqQuestion,
        faqAnswer,
        created_at: new Date().toISOString()
      };
  
      res.status(201).json(newItem);
    });
};
const readAll = (req, res) => {
    const sql = "SELECT * FROM faq"
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
    const sql = 'DELETE FROM faq WHERE id = ?';
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
  
module.exports = {
    create,
    readAll,
    deleteOne,
};