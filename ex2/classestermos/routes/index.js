var express = require('express');
var router = express.Router();
var axios = require('axios');
var fs = require('fs');

// Save the apiKey in a file
const token = fs.readFileSync('../token.txt',{encoding:'utf-8', flag:'r'})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Classes e Termos de Índice' });
});

router.get('/classes', function(req, res){
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
    .then(dados => {
      console.log('GET das Classes Nível 1')
      classes = dados.data
      res.render('classes',{lista: classes})
    })
    .catch(e => {
      res.render('error',{error: e})
    })
})

router.get('/classes/:id', function(req, res){
  id = req.params.id
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + id + '?token=' + token)
    .then(dados => {
      var classe = dados.data
      console.log('GET da classe ' + id)
      res.render('classe',{c: classe})
    })
    .catch(e => {
      res.render('error',{erro: e})
    })
})

router.get('/termos', function(req, res){
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
    .then(dados => {
      console.log('GET dos Termos Índice')
      termos = dados.data
      res.render('termos',{lista: termos})
    })
    .catch(e => {
      res.render('error',{error: e})
    })
})


module.exports = router;
