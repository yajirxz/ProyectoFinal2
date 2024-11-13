var express = require('express');
var router = express.Router();
var db = require('../config/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/libros', function (req, res, next){
  const sql = 'SELECT * FROM libros';
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener libros:', error);
      //res.status(500).send('Error en el servidor');
 
    }
   // res.json(results);
   res.render( 'libros',  {libros: results});
  });
});

router.get('/formLibro',function(req,res,next){
  res.render('formulario')
})
module.exports = router;
