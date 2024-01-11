require('dotenv').config();
const express = require('express');
const app = express();
const {WebSocketServer} = require('ws');
const server = new WebSocketServer({port:443});
const mongoose = require('mongoose');
const panelModel = require('./model/panelModel');
const tareaModel = require('./model/tareaModel');



app.use('/' , express.static('./www'));
app.listen(3000);

server.on('connection',ws =>{
    console.log('nuevo cliente conectado');

    panelModel.find()
    .then((data) =>{
        data.forEach(p =>{
            ws.send(JSON.stringify({'tipo':'panel' , p}));
        })
    })

    ws.on('message' , data =>{
        var msg = JSON.parse(data);
        var {tipo} = msg;
        console.log(tipo);
        console.log(msg);


        switch(tipo){
            case'panel':
                var {title} = msg;
                console.log(title);
                const newPanel = new panelModel({title});
                newPanel.save()
                .then((data)=>{
                    console.log('ok')
                 msg.panel_ID = data._id; 
                })
                .catch(err=>console.error(err));
                break;
            case'tarea' : 
                var {panel_ID , text} = msg;
                const newTarea = new tareaModel(panel_ID , text);
                newTarea.save();
                break;
            default:
                break;
        }
        
        server.clients.forEach(e =>{
            e.send(JSON.stringify(msg))
        })
    })

    
    ws.on('close', ()=>{
        console.log('cliente desconectado')
    })
})



mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log('atlas esta conectado'))
.catch((e) =>console.error(e));

