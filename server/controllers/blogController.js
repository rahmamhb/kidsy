const db = require('../db');

const create = (req, res) => {

    const { blogTitle , blogContent } = req.body;
    const blogImg = req.file.filename ;
  
    const sql = 'INSERT INTO blog (blogTitle, blogContent , blogImg ,adminID) VALUES (?, ? , ? , ?)';
    const values = [blogTitle , blogContent , blogImg , 1];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating item: ', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      const newItem = {
        id: result.insertId,  
        blogTitle,
        blogContent,
        blogImg ,
        created_at: new Date().toISOString()
      };
  
      res.status(201).json(newItem);
    });
};
const readAll = (req, res) => {
    const sql = "SELECT * FROM blog ORDER BY created_at DESC"
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
    const sql = 'SELECT * FROM blog WHERE blogID = ?';
    const values = [itemId];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error retrieving blog: ', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'blog not found' });
      }
  
      const item = results[0];
      res.status(200).json(item);
    });
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
const updateOne = (req , res)=>{
    const itemId = req.params.id;
    const { blogTitle , blogContent } = req.body;
    const sql = "UPDATE review SET blogTitle = ? blogContent ? WHERE blogID = ? "
    const values = [blogTitle , blogContent , itemId];
    db.query(sql , values ,(err , results)=>{
        if(err){
            console.log("error updating blog")
            return res.status(500).json({error : "Internal Server Error"})
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'category not found' });
        }

        res.status(200).json(results);
    })
}

module.exports = {
    create,
    readAll,
    readOne,
    deleteOne,
    updateOne,
};