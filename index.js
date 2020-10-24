const express = require('express')
const body = require('body-parser')
const app = express()
const port = 3000


app.use(express.static('public'));
app.use(body.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`)
})

var actividades = {act1:'Cocinar', act2:'Barrer', act3:'Trapear', act4:'Lavar la ropa', act5:'Lavar los platos' };

app.get('/', function(req, res){
    res.render('index.ejs',{tareas: actividades});
});


/* --- Inicializamos los arreglos ---*/
var actividadesHombres = {act1:0, act2 : 0, act3 : 0, act4 : 0, act5 : 0};
var actividadesMujeres = {act1:0, act2 : 0, act3 : 0, act4 : 0, act5 : 0};

app.get('/actividades/get', function(req, res) {
    sumaValores(req.query);
    res.render('actividades.ejs', {tareas:actividades, actividadesMujeres : actividadesMujeres, actividadesHombres: actividadesHombres});
});

app.post('/actividades/post', function(req, res) {
    sumaValores(req.body);
    res.render('actividades.ejs', {tareas:actividades, actividadesMujeres : actividadesMujeres, actividadesHombres: actividadesHombres});
    // res.redirect('../');
});

app.put('/actividades/put',function(req,res) {
    actualizaActividad(req.query);
    res.send('200');
});

app.get('/actividades/put',function(req,res) {
    actualizaActividad(req.query);
    res.redirect('/');
});

app.delete('/actividades/delete', function(req,res) {
    elimina(req.query);
    res.send('200');
})

/* --- Funcion que contabiliza las ocurrencias de un arreglo --- */
function sumaValores(arreglo){
    Object.keys(arreglo).forEach(function(e){
        (arreglo[e] == 'option1') ? actividadesHombres[e]++ : actividadesMujeres[e]++ ;
    });
}

function actualizaActividad(arreglo){
    Object.keys(arreglo).forEach(function(e){
        actividades[e] = arreglo[e];
    });
}

function elimina(arreglo){
    Object.keys(arreglo).forEach(function(e){
        delete actividades[e];
    });
}



