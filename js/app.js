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

function init()
{
	// Pega todos os professores do banco

	var Professores = Parse.Object.extend("Professores");
	var query = new Parse.Query(Professores);

	query.find({
		success: function (results) {
			for (var i = 0; i < results.length; i++)
			{
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

	// Não realiza a busca se a caixa de texto está vazia
	if(nome == '')
		return;

	for(var i = 0; i < professores.length; i++)
	{
		var prof = professores[i];

		if(prof.nome.startsWith(nome))
		{
			$(".professores").append("Nome: " + prof.nome + "<br />Materia: " + prof.materia + "<br />");
		}
	}



}
