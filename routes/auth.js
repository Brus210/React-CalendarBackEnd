// Rutas de Usuarios / Auth
// host + /api/auth
const {Router} = require('express');
const router = Router();

//validar
const {check} = require('express-validator');

const {crearUsuario,loginUsuario, revalidarToken} = require('../controllers/auth');
const { validateJWT } = require('../middlewares/Validate-JWT');
const { FillValidators } = require('../middlewares/fill-validators');

router.post(
    '/new', 
    //middlewares
    [check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({min:6}),
        FillValidators
    ] , 
    crearUsuario);

router.post('/',
    [   check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({min:6}),
        FillValidators
    ] , 
     loginUsuario);

router.get('/renew',validateJWT,revalidarToken );


module.exports = router;