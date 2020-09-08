const Tasks = require('../models/Tasks');
const {validationResult} = require('express-validator');
const { json } = require('express');

exports.getTasks = async(req, res) => {
    
    const author = req.user.id;
    const tasks = await Tasks.findOne({author});

    if(!tasks) return res.json({msg : 'Este usuario no tiene tareas'});
    
    res.json({tareas : {tasks}});
};

exports.createTasks = async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    };

    try {
        tasks = new Tasks(req.body);
        // Colocar autor
        tasks.author = req.user.id;

        await tasks.save()
        res.json({tasks});
    } catch (error) {
        console.log();
    }

    console.log('Creando tarea...');
}

exports.changeInformation = async (req, res) => {
    let { name, isChecked, id } = req.body;

    try {

        let tasks = await Tasks.findById(id);

        
        if(tasks.author !== req.user.id) return res.status(400).json({msg: 'Este usuario no tiene permiso en esta tarea.'});
        
        console.log(name);
        if(name === undefined) name = tasks.name;

        if(isChecked === undefined) isChecked = tasks.isChecked;

        const updateTasks = {
            name,
            isChecked
        };

        tasks = await Tasks.findByIdAndUpdate(id, {
            $set : updateTasks
        }, { new: true } );

        res.json(tasks);
        
    } catch (error) {
        console.log(`La tarea id: { ${id} } no existe`);
        res.status(400).json({msg : 'La tarea no existe'});
    }
}

exports.deleteTasks = async (req, res) => {
    const { id } = req.body;

    try {

        let tasks = await Tasks.findById(id);

        if(!tasks) {
            return res.status(400).json({msg: "Esa tarea no existe"});
        }

        if(tasks.author !== req.user.id) return res.status(400).json({msg: 'El usuario no tiene permiso de eliminar esta tarea'})

        tasks = await Tasks.findByIdAndRemove(id);
        res.json({msg : 'Tarea eliminada'});
        
    } catch (error) {
        console.log('Hubo un error');
    }
}