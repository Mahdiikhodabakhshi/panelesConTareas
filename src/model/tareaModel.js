const mongoose = require('mongoose');

const tareaModel = mongoose.Schema({
    panel_ID: {type:mongoose.Schema.Types.ObjectId , ref:'panel'},
    text : {type : String , require : true}
});

module.exports = mongoose.model('tarea' , tareaModel , 'tareas')