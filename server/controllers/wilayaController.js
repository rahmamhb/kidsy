const db = require('../db');

const readAll = (req, res) => {
    const sql = "SELECT * FROM wilaya"
    db.query(sql , (err , results)=>{
        if(err){
            console.error('Error retrieving items: ', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    })
};

module.exports = {
    readAll,
};