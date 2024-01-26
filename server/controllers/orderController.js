const db = require('../db');

const create = async (req, res) => {
    const {
        cartID,
        clientFisrtName,
        clientLastName,
        clientPhone,
        clientEmail,
        wilaya,
        fullAdress,
        zipCode,

    } = req.body;
  
      try {
          console.log(req.body)
          const adressQuery = 'INSERT INTO adress (fullAdress , zipCode , wilaya) VALUES (?, ?, ?)';
          const adressValues = [
            fullAdress,
            zipCode,
            wilaya,
          ];
  
          const adressResult = await new Promise((resolve, reject) => {
            db.query(adressQuery, adressValues, function (err, result, fields) {
              if (err) reject(err);
              resolve(result);
            });
          });
      
            const adressID= adressResult.insertId;
  

            const clientQuery = 'INSERT INTO client VALUES (NULL, ? , ? , ? , ? , ?)';
            const clientValues = [clientFisrtName , clientLastName , clientEmail , clientPhone , adressID];
            const clientResult = await new Promise((resolve, reject) => {
                db.query(clientQuery, clientValues, function (err, result, fields) {
                if (err) reject(err);
                resolve(result);
                });
            });
        
            const clientID = clientResult.insertId;
    
            const cartClientQuery = 'INSERT INTO cart_client VALUES (?, ?)';
            const cartClientValues = [cartID, clientID];
            await new Promise((resolve, reject) => {
                db.query(cartClientQuery, cartClientValues, function (err, result, fields) {
                if (err) reject(err);
                resolve(result);
                });
            });
            const orderQuery = 'INSERT INTO order_ (cartID , adminID) VALUES (?, ?)';
            const orderValues = [cartID, 1];
            await new Promise((resolve, reject) => {
                db.query(orderQuery, orderValues, function (err, result, fields) {
                if (err) reject(err);
                resolve(result);
                });
            });
        
        
    
            const newItem = {
            id: clientID,
            productName,
            productDescription,
            productImg,
            productPrice,
            productDiscount,
            productCategory,
            productQuantity,
            orderDate: new Date().toISOString()
            };
            res.status(201).json(newItem);
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
};

const readAll = (req, res) => {
    const sql = "SELECT o.* , CONCAT(c.clientFirstName, ' ', c.clientLastName) AS orderCostumer , (SELECT SUM(p.productPrice * cp.productQuantityInCart) FROM product p JOIN cart_product cp ON cp.productID = p.productID WHERE cp.cartID = o.cartID) + w.deliveryPrice AS orderCost FROM order_ o , client c , cart_client cc , adress a , wilaya w  WHERE o.cartID = cc.cartID AND c.clientID = cc.clientID AND c.adress = a.adressID AND a.wilaya = w.wilayaID GROUP BY o.orderID "
    db.query(sql , (err , results)=>{
        if(err){
            console.error('Error retrieving items: ', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    })
};
const readOne = (req, res) => {
    const orderID = req.params.id
    const sql = `SELECT o.* ,
    CONCAT(c.clientFirstName, ' ', c.clientLastName) AS orderCostumer ,
    c.clientPhone AS orderCostumerPhone ,
    (SELECT SUM(p.productPrice * cp.productQuantityInCart)
    FROM product p
    JOIN cart_product cp ON cp.productID = p.productID
    WHERE cp.cartID = o.cartID) + w.deliveryPrice AS orderCost 
    FROM order_ o , client c , cart_client cc , adress a , wilaya w 
    WHERE o.cartID = cc.cartID AND c.clientID = cc.clientID AND c.adress = a.adressID AND a.wilaya = w.wilayaID AND o.orderID = ?
    GROUP BY o.orderID `
    const values = [orderID]
    db.query(sql , values , (err , results)=>{
        if(err){
            console.error('Error retrieving items: ', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    })
};
const readOneProds = (req, res) => {
    const orderID = req.params.id
    const sql = `SELECT p.* , cp.productQuantityInCart
    FROM product p , cart_product cp , order_ o
    WHERE o.cartID = cp.cartID  AND cp.productID = p.productID AND  cp.cartID = o.cartID AND o.orderID = ?
    GROUP BY p.productID `
    const values = [orderID]
    db.query(sql , values , (err , results)=>{
        if(err){
            console.error('Error retrieving items: ', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    })
};
const deleteOne = (req, res) => {
    const itemId = req.params.id;
    const sql = 'DELETE FROM order_ WHERE orderID = ?';
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
    const {orderStatus} = req.body ;
    const sql = "UPDATE order_ SET orderStatus = ? WHERE orderID = ? "
    const values = [orderStatus , itemId];
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
module.exports = {
    create,
    readOne,
    updateOne,
    readAll,
    deleteOne,
    readOneProds
};