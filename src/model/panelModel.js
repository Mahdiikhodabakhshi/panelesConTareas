const mongoose = require('mongoose');

const panelModel = new mongoose.Schema({
    title:{type:String , require:true}

})

module.exports = mongoose.model('panel' , panelModel , 'panels')