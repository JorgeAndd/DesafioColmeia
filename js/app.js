Parse.initialize("SU0myMIe1AUitLKar0mum8My8RbQ87lEaRjjKDgh","GtvnNXChRLZRYBbWxNy9fM0LPloMfpYICCtMdJIL");
Parse.serverURL = 'https://parseapi.back4app.com/';

var professores = [];
init();

$('#nome').bind('input', function() {
	var nome = $(this).val();

	getProfessores(nome);
});

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

		// Busca o nome do professor
		if(prof.nome.toUpperCase().startsWith(nome.toUpperCase()))
		{
			// $(".professores").append("Nome: " + prof.nome + "<br />Materia: " + prof.materia + "<br />Nota:" + prof.nota + "<br />Imagem:" + prof.imagem + "<br />");
			createPannel(prof);
		}
	}

	function createPannel(professor)
	{
		var newProf = $('#profTemplate').clone();

		newProf.attr('id', professor.objectId);
		newProf.appendTo(".professores");
		newProf.find('.foto').attr('src', professor.imagem.url());
		newProf.find('.nome').html(professor.nome);
		newProf.find('.materia').html(professor.materia);
		newProf.find('.curriculo').html(professor.curriculo);
		newProf.show();

	}
}
