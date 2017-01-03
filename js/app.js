Parse.initialize("SU0myMIe1AUitLKar0mum8My8RbQ87lEaRjjKDgh","GtvnNXChRLZRYBbWxNy9fM0LPloMfpYICCtMdJIL");
Parse.serverURL = 'https://parseapi.back4app.com/';

var Professores = Parse.Object.extend("Professores");
var query = new Parse.Query(Professores);

query.find({
	success: function (results) {
		for (var i = 0; i < results.length; i++)
		{
			var prof = results[i];
				alert("Nome: " + prof.get('nome'));
		}
	},
	error: function (error) {
		alert("Error: " + error.code + " " + error.message);
	}
})
