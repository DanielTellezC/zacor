const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { find, findById } = require('../models/rollos');
const rollos = require('../models/rollos');
const User = require('../models/user');
const bitacora = require('../models/bitacora');
const empleados = require('../models/empleados');
const prendas = require('../models/prendas');

router.get('/',(req, res) => {
    res.render('index')
})

router.get('/signup',(req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup' ,{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin',(req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req,res,next) =>{
    req.logOut();
    res.redirect('/');
});

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

router.get('/inventario', lecrollos , async (req,res,next) =>{
    
});

async function lecrollos(req,res,next){
    const rollo = await rollos.find();
    res.render('inventario', { rollo });
};

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};
/////borrar


/////////////////////// Función de la bitacora //////////
router.get('/bitacora', (req,res,next) =>{
    res.render('bitacora');
});
router.post('/bitacora', async function(req, res, next){
    const bitacoranueva = new bitacora(req.body);
    console.log(bitacoranueva);
    bitacoranueva.cuenta = req.user.id;
    
    await bitacoranueva.save();
    res.redirect('bitacora');

})

module.exports = router;