const {Schema,model}=require("mongoose");

const myschema= new Schema({

    name:{
        type:String,
        required:true
    },
   
    img: {
        type: String,
        required:true
        
    },
    price:{
        type:Number,
        required:true
    },
    discription: {
        type: String,
        // required:true
    }
})

const mymodel=model("product",myschema);
module.exports=mymodel;