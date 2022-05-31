var express = require('express');
var router = express.Router();
var Mapa = require('../controllers/mapa')

router.get('/cidades', function(req,res){
  if(req.query['distrito'] != undefined) {
    Mapa.listarPorDistrito(req.query['distrito'])
      .then( dados => {
        res.status(200).jsonp(dados)
      })
      .catch(e => {
        res.status(502).jsonp({error: e})
      })
  }
  else {
    Mapa.listarCidades()
      .then( dados => {
        res.status(200).jsonp(dados)
      })
      .catch(e => {
        res.status(503).jsonp({error: e})
      })
  }
})

router.get('/cidades/nomes', function(req,res){
  Mapa.listarNomesCidades()
    .then( dados => {
      res.status(200).jsonp(dados)
    })
    .catch(e => {
      res.status(501).jsonp({error: e})
    })
})

router.get('/cidades/:id', function(req,res){
  Mapa.consultarID(req.params.id)
    .then( dados => {
      res.status(200).jsonp(dados)
    })
    .catch(e => {
      res.status(500).jsonp({error: e})
    })
})

router.get('/distritos', function(req,res){
  Mapa.listar()
    .then(dados => {
      var final = {}
      dados.forEach(c => {
        if(final[c.distrito] == undefined) {
          final[c.distrito] = []
          final[c.distrito].push({"id":c.id,"nome":c.nome})
        } else {
          final[c.distrito].push({"id":c.id,"nome":c.nome})
        }
      })
      res.status(200).jsonp(final)
    })
    .catch(e => {
      res.status(504).jsonp({error: e})
    })
})

router.get('/ligacoes', function(req,res){
  if(req.query['origem'] != undefined) {
    Mapa.listarOrigemLigacao(req.query['origem'])
      .then( dados => {
        res.status(200).jsonp(dados)
      })
      .catch(e => {
        res.status(505).jsonp({error: e})
      })
  }
  else if(req.query['dist'] != undefined) {
    Mapa.listarLigacoesDistancia()
      .then(dados => {
        var final = []
        dados.forEach(d => {
          if (d.distância > dis) {
            final.push(d)
          }
        })
        res.status(200).jsonp(final)
      })
      .catch(e => {
        res.status(506).jsonp({error: e})
      })
  }
})

module.exports = router;
