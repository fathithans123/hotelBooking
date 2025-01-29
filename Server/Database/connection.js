// mongodb+srv://thansi6166:12345678910@cluster0.ohueu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require('mongoose')

function RunServer() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('mongo connected!')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = RunServer