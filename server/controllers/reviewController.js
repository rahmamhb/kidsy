const db = require("../db")

const create = (req, res) => {

    const { productID , reviewContent , reviewRate , reviwerName , reviwerEmail} = req.body;
  
    const sql = 'INSERT INTO review (productID , reviewContent , reviewRate , reviwerName , reviwerEmail , adminID , reviewApproved) VALUES (?, ? , ? , ? , ? , ? , ?)';
    const values = [productID , reviewContent || null , reviewRate , reviwerName , reviwerEmail, 1 , 0];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating review: ', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  
      const newItem = {
        id: result.insertId,  
        productID ,
        reviewContent ,
        reviewRate , 
        reviwerName , 
        reviwerEmail, 
        adminID : 1 , 
        reviewApproved :0 ,
        created_at: new Date().toISOString()
      };
  
      res.status(201).json(newItem);
    });
};
const readAll = (req , res)=>{
    const sql = "SELECT * FROM review WHERE reviewApproved = 0 "
    db.query(sql , (err , result)=>{
        if(err){
            console.log("error retrieving review")
            return res.status(500).json({error : "Internal Server Error"})
        }
        res.status(200).json(result)
    })
}
const readApproved = (req , res) =>{
    const itemId = req.params.id;
    const sql = "SELECT * FROM review r WHERE r.productID = 4 AND r.reviewApproved = 1 ORDER BY r.created_at DESC "
    const values = [itemId]
    db.query(sql , values ,(err , results)=>{
        if(err){
            console.log("error fetching review")
            return res.status(500).json({error : "Internal Server Error"})
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'review not found' });
        }

        res.status(200).json(results);
    })
}
const updateOne = (req , res)=>{
    const itemId = req.params.id;
    const sql = "UPDATE review SET reviewApproved = 1 WHERE reviewID = ? "
    const values = [itemId];
    db.query(sql , values ,(err , results)=>{
        if(err){
            console.log("error updating review")
            return res.status(500).json({error : "Internal Server Error"})
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'category not found' });
        }

        res.status(200).json(results);
    })
}
const deleteOne = (req , res)=>{
    const itemId = req.params.id;
    const sql = "DELETE FROM review WHERE reviewID = ? "
    const values = [itemId];
    db.query(sql , values ,(err , results)=>{
        if(err){
            console.log("error deleting review")
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
    updateOne,
    deleteOne,
    readApproved,
}