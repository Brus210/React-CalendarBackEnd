// Rutas de Events
// host + /api/events
//
//Router de express
const {Router} = require('express');

//validar JWT
const { validateJWT } = require('../middlewares/Validate-JWT');

//Controladores
const { getEvents, postEvents, putEvents, deleteEvents } = require('../controllers/events');
const { check } = require('express-validator');

//validar campos
const { FillValidators } = require('../middlewares/fill-validators');
const {isDate} = require('../helpers/isDate');


const router = Router(); //generar router
router.use(validateJWT); //cuando se use cualquier peticion, se valida el JWT
//Todos tienen que pasar por la validacion del JWT
//Obtener eventos
router.get('/', getEvents);


//Crear eventos
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        FillValidators
    ]
    , postEvents);


//Actualizar eventos
router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        FillValidators
    ]
    , putEvents);


//Borrar eventos
router.delete('/:id', deleteEvents);


module.exports = router; //exportar router