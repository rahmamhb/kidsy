const db = require('../db');
const readAllByProdId = (req, res) => {
    const itemId = req.params.id;
    const sql = "SELECT c.* FROM color c JOIN product p  JOIN product_color pc ON pc.productID = p.productID AND pc.colorID = c.colorID WHERE p.productID = ?"
    const values = [itemId]
    db.query(sql , values , (err , results)=>{
        if(err){
            console.error('Error retrieving items: ', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    })
};
module.exports = {
    readAllByProdId,

};