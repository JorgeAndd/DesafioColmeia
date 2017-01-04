Parse.initialize("SU0myMIe1AUitLKar0mum8My8RbQ87lEaRjjKDgh","GtvnNXChRLZRYBbWxNy9fM0LPloMfpYICCtMdJIL");
Parse.serverURL = 'https://parseapi.back4app.com/';

var professores = [];

$('#nome_input').bind('input', function() {
	var nome = $(this).val();

	getProfessores(nome);
});

$(document).ready(function(){
	init();
});

$.fn.nota = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}

// Classe professores
function Professor() {
	var objectId;
	var nome;
	var imagem;
	var curriculo;
	var materia;
	var nota;
}

// Função inicial para popular o array de professores
function init()
{
	// Pega todos os professores do banco
	var Professores = Parse.Object.extend("Professores");
	var query = new Parse.Query(Professores);

	query.find({
		success: function (results) {
			for (var i = 0; i < results.length; i++)
			{
				// Cria um novo objeto de professor e insere no array de professores
				var prof = new Professor();
				prof.objectId = results[i].get('objectId');
				prof.nome = results[i].get('nome');
				prof.imagem = results[i].get('imagem');
				prof.curriculo = results[i].get('curriculo');
				prof.materia = results[i].get('materia');
				prof.nota = results[i].get('nota');

				professores.push(prof);
			}
		},
		error: function (error) {
			alert("Erro: " + error.code + " " + error.message);
		}
	})
}

function getProfessores(nome)
{
		// Limpa os professores anteriores
		$(".professores").html("");

		for(var i = 0; i < professores.length; i++)
		{
			var prof = professores[i];

			// Busca o nome do professor no array
			// converte para uppercase para ser case-insensitive
			if(prof.nome.toUpperCase().startsWith(nome.toUpperCase()))
				createPannel(prof);
		}
}

function createPannel(professor)
{
		// Clona a div original do html e modifica os atributos
		var newProf = $('#profTemplate').clone(true);

		newProf.attr('id', professor.objectId);
		newProf.find('.foto').attr('src', professor.imagem.url());
		newProf.find('.nome').html(professor.nome);
		newProf.find('.materia').html(professor.materia);
		newProf.find('.nota').html(professor.nota);
		newProf.find('.nota').nota();
		newProf.find('.curriculo').html(professor.curriculo);
		newProf.show();

		$(".professores").append(newProf.clone(true));
}
