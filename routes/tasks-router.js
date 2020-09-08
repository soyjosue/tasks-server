const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.get('/', 
    auth,
    tasksController.getTasks
);

router.post('/',
    auth,
    [
        check('name', 'Coloque un nombre a la tarea').not().isEmpty(),
    ],
    tasksController.createTasks
);

router.put('/',
    auth,
    [
        check('id', 'Debe colocar el id de la tarea').not().isEmpty(),
        check('name', 'Debe colocar el nombre de la tarea').not().isEmpty(),
        check('isEmpy', 'Debe colocar el valor de completado de la tarea').not().isEmpty()
    ],
    tasksController.changeInformation
)

router.delete('/',
    auth,
    [
        check('id', 'Debe colocar el id de la tarea').not().isEmpty()
    ],
    tasksController.deleteTasks
)

module.exports = router;