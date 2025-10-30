function validateProduct(req,res,next) {
const {name, description, price, category, inStock } = req.body;
if (!name || !description ||  price ===undefined || !category || inStock ===undefined) {
    res.status(400).json({message:'All product fields required'});
}
if (typeof price !== 'number' || price < 0 ) {
    return 
    res.status(400).json({message:'The price must be a positve value'});
}
next();
}
module.exports=validateProduct;