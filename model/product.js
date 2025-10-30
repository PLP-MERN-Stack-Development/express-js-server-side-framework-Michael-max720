const mongoose = require('mongoose');
const products = require('./data/products');
const productSchema =new mongoose .Schema({
  product_id : {type:INT ,required:true,unique:true} ,
  name:{type:String,required:true },
  description: {type:String,required:true},
  price:{type:Number, required:true},
  category:{type:string,required:true},
  inStock:{type:Boolean,required:true}
},{timestamp:true});
const Product=mongoose.model('Product',productSchema)
module.exports.Product