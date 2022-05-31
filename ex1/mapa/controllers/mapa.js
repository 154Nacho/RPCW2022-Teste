var Cidade = require('../models/cidade')
var Ligacao = require('../models/ligacao')

module.exports.listar = function() {
    return Cidade
            .find({},{_id:0,id:1,nome:1,distrito:1})
            .exec()
}

// 4.1. GET /api/cidades - Devolve a lista das cidades, com os campos: id, nome, e distrito;
module.exports.listarCidades = function() {
    return Cidade
            .find({},{_id:0,nome:1,distrito:1})
            .sort({nome:1})
            .exec()
}

// 4.2. GET /api/cidades/:id - Devolve a informação completa de uma cidade;
// NOTA: Usar find ele encapsula numa lista, usar findOne encapsula num objeto.
module.exports.consultarID = function(id) {
    return Cidade
            .findOne({id: id})
            .exec()
}

// 4.3. GET /api/cidades/nomes - Devolve apenas uma lista com os nomes das cidades ordenada alfabeticamente;
module.exports.listarNomesCidades = function() {
    return Cidade
            .distinct('nome')
            .sort()
            .exec()
}

// 4.4 GET /api/cidades?distrito=DDDD - Devolve a lista de cidades pertencentes ao distrito DDDD,
// para cada cidade apresenta os campos: id e nome;
module.exports.listarPorDistrito = function(d) {
    var distrito = RegExp(d)
    return Cidade
            .find({distrito: distrito},{_id:0,id:1,nome:1})
            .exec()
}


// 4.6. GET /api/ligacoes?origem=XX - Devolve a lista de ligações que têm a cidade XX como origem, 
// a lista deverá ter os seguintes campos: id da ligação, id da cidade destino, nome da cidade destino;
module.exports.listarOrigemLigacao = function(o) {
    var origem = RegExp(o)
    return Ligacao
            .find({origem: origem},{_id:0,id:1,destino:1})
}

// 4.7. GET /api/ligacoes?dist=YY - Devolve a lista de ligações que têm uma distância maior ou igual a YY,
// a lista deverá ter os seguintes campos: id da ligação, id da cidade origem, nome da cidade origem, id da cidade destino
// e nome da cidade destino.
module.exports.listarLigacoesDistancia = function() {
    return Ligacao
            .find({},{_id:0,id:1,origem:1,destino:1})
}