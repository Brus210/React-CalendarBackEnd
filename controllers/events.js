const { response } = require('express');
const Evento = require('../models/Evento');

const getEvents = async(req, res = response) => {
    const eventos = await Evento.find()
                                .populate('user','name');

    res.json({
        ok:true,
        eventos,
    })
}


const postEvents = async(req, res = response) => {
    //verificar si viene un evento
    const evento = new Evento(req.body);
    try {
        evento.user = req.uid;
        const eventoDB = await evento.save();
        res.json({
            ok:true,
            evento: eventoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
        
    }

}

const putEvents = async(req, res = response) => {

    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento'
            })
        }


        const newEvento = {
            ...req.body,
            user:req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate
            (eventoId,newEvento,{new:true});
        
        res.json({
            ok:true,
            evento:eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
        
    }

}



const deleteEvents = async(req, res = response) => {
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de eliminar este evento'
            })
        }


        
        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
        
        res.json({
            ok:true,
            evento:eventoEliminado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
        
    }
}


//exportar funciones
module.exports = {
    getEvents,
    postEvents,
    putEvents,
    deleteEvents
}