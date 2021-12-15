const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { find, findById } = require('../models/rollos');
const rollos = require('../models/rollos');
const User = require('../models/user');
const bitacora = require('../models/bitacora');
const empleadosentrada = require('../models/empleadosentrada');
const empleadossalida = require('../models/empleadossalida');
const prendas = require('../models/prendas');

////////// Index /////////////////////
router.get('/',(req, res) => {
    res.render('index')
})

//////////////Signup ////////////////
router.get('/signup',(req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup' ,{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

/////////////////Signin ////////////////////
router.get('/signin',(req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

/////////Logout (Salir)///////////////
router.get('/logout', (req,res,next) =>{
    req.logOut();
    res.redirect('/signin');
});

////////////////// perfil del usuario /////////////////
router.post('/profile', async function(req, res, next){
    const rollonuevo = new rollos(req.body);
    console.log(rollonuevo);
    const user = req.user.id;
    rollonuevo.cuenta = user;
    console.log('Usuario', user);
    await rollonuevo.save();
    res.redirect('profile');
});


router.get('/profile',isAuthenticated, (req, res, next) => {
    res.render('profile');
});

/////////////////// inventario de rollos ///////////
router.get('/inventario', isAuthenticated,lecrollos , async (req,res,next) =>{
    
});

async function lecrollos(req,res,next){
    const rollo = await rollos.find({ cuenta:req.user.id  });
    res.render('inventario', { rollo });
};

/////////////////////// Función de la bitacora //////////
router.get('/bitacora', isAuthenticated ,lecbitacora, (req,res,next) =>{
});
router.post('/bitacora', async function(req, res, next){
    const bitacoranueva = new bitacora(req.body);
    console.log(bitacoranueva);
    bitacoranueva.cuenta = req.user.id; 
    await bitacoranueva.save();
    res.redirect('bitacora');

});

async function lecbitacora(req,res,next){
    const bitacoraN = await bitacora.find({ cuenta: req.user.id });
    res.render('bitacora', {bitacoraN});
};
///////////////registro de llegada de los empleados///////////
router.get('/empleados', isAuthenticated,lecempleadosEn,(req,res,next) =>{
    
});
router.post('/empleados_entrada', async function(req,res,next){
    const empleadosEntadaN = new empleadosentrada(req.body);
    console.log(empleadosEntadaN);
    empleadosEntadaN.cuenta = req.user.id;
    await empleadosEntadaN.save();
    res.redirect('empleados');
});
router.post('/empleados_salida', async function(req,res,next){
    const empleadosSalidaN = new empleadossalida(req.body);
    empleadosSalidaN.cuenta = req.user.id;
    await empleadosSalidaN.save();
    res.redirect('empleados');
});
async function lecempleadosEn(req,res,next){
    const empleadosEnN = await empleadosentrada.find({ cuenta:req.user.id });
    const empleadosSaN = await empleadossalida.find({ cuenta:req.user.id});
    res.render('empleados', { empleadosEnN, empleadosSaN });
}

/////////////funcion de autenticación para las sesiones /////////////////////
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

module.exports = router;