const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://ritesh7767:Ritesh7767@cluster0.gl85cov.mongodb.net/backendProject")
        console.log("DataBase connection successfull .... !! host name :- ", connectionInstance.connection.host)
    }
    catch(err){
        if(err) throw err
    }
}

module.exports = connectDB