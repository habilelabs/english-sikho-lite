var request = require('request');

module.exports = function (app) {
	
    app.home = function (req, res) {
		var param = {};
		param.title = 'Englishsikho - Learn English from Hindi- Best English Learning website';
		res.render('pages/home', {
			param: param
		});
   };

    app.browsePage = function (req, res) {
		var param = {};
		param.title = 'browse-by-letter';
		res.render('pages/browsebyletter', {
			param: param
		});
    };
	
	  app.wordPage = function (req, res) {

           request('https://www.englishsikho.com/api/v1/getword/'+req.params.word , function (error, response, body) {

               

			if (!error && response.statusCode == 200) {
 
                

				var param = {};
				param.title = 'Englishsikho - Learn English from Hindi- Best English Learning website';
				param.data = JSON.parse(body);
				res.render('pages/word', {
					param: param
				});
			}
		})
       
    };
	
	  app.searchPage = function (req, res) {
		  
		  //"https://www.englishsikho.com/api/v1/search/an/0"
		 request('https://www.englishsikho.com/api/v1/search/'+req.params.word+"/0", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var param = {};
				param.title = 'Englishsikho - Learn English from Hindi- Best English Learning website';
				param.data = JSON.parse(body);
				res.render('pages/wordSearch', {
					param: param
				});
			}
		})

    };
	

}