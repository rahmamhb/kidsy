const db = require("../db")

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
    readAll,
    updateOne,
    deleteOne,
}