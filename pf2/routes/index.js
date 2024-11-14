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
   router.get('/libros')
   res.render( 'libros',  {libros: results});
  });
});

router.get('/formLibro',function(req,res,next){
  res.render('formulario')
})


router.post('/nuevoLibro',(req, res, next) => {
  console.log(req.body);
  //const titulo = req.body.titulo;
//  const autor = req.body.autor;
  const {titulo, autor} = req.body;
  const sql = "INSERT INTO libros (titulo, autor) VALUES(? , ?)";

  db.query(sql, [titulo, autor], (err, result) => {
    if(err){
      console.error("Error al guardar libro en base de datos", err);
      return res.status(500).send("Error al guardar");
    }else{
      console.log(result.titulo)
      res.render('creado', {nuevo : {
        id : result.insertId,
        titulo: titulo,
        autor: autor
      }

      });
    }
  })

});

router.get('/detalleLibro',  (req, res, next) =>{
  // Recuperar datos de la vista localhost/:3000/detalleLibro?id=7
  const libroId = req.query.id;

  sql = "SELECT * FROM libros WHERE id = " + libroId;
  db.query(sql,(error, resultado) =>{
    if (error){
      //Mnadar pag personalizada de error
      console.log(error);
    }else{
      res.render('detalle', {libro : resultado[0]})
    }
  })
})

module.exports = router;
