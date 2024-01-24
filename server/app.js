const express = require("express")
const cors = require('cors');
const app = express()

const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes =  require("./routes/categoryRoutes")
const wilayaRoutes = require("./routes/wilayaRoutes")
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const faqRoutes = require('./routes/faqRoutes')
const productCategory = require('./routes/productCategoryRoutes')

app.use(cors())
app.use(express.json())
app.use('/api/blog/images', express.static('public/images'));

app.use('/api/blog', blogRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/wilaya', wilayaRoutes)
app.use('/api/product', productRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/faq', faqRoutes)
app.use('/api/product-by-category', productCategory)


app.listen(3001, () => {
    console.log("Yey, my server is running on port 3001");
});