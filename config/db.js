const mongoose =require('mongoose')
const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            UseNewUrlParser:true,
            UseUnifiedTopology:true,
        });
        console.log('MongoDB connected .')
    }catch(err) {
        console.error(error.message);
        Process.exit(1)
    }
}
module.exports=connectDB;