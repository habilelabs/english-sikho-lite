var request = require('request');

module.exports = function (app) {

    app.home = function (req, res) {
        var param = {};
        param.title = 'Englishsikho Lite. Learn english any where.';
        res.render('pages/home', {
            param: param
        });
    };

    app.browsePage = function (req, res) {
        var param = {};
        param.title = 'browse-by-letter';
        var latters = 'abcdefghijklmnopqrstuvwxyz'
        param.englishChars = latters.split('');
        param.hindiChars = hindiChars();
        res.render('pages/browsebyletter', {
            param: param
        });
    };

    app.wordPage = function (req, res) {

        request('https://www.englishsikho.com/api/v1/getword/' + req.params.word, function (error, response, body) {
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

    function hindiChars(){
        return ['अ','आ','इ','ई','उ','ऊ','ए','ऐ','औ','अं','अः','ऍ','ऒ','ऑ','अँ','आँ','ऋ','ऌ','क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह','ळ','क्ष','ज्ञ']
    }

	app.searchPage = function (req, res) {
		var page = 0;
		if (req.params.page) {
			page = req.params.page;
		}
		//"https://www.englishsikho.com/api/v1/search/an/0"
		request('https://www.englishsikho.com/api/v1/search/' + req.params.word + "/" + page, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var param = {};
				param.title = 'Englishsikho - Learn English from Hindi- Best English Learning website';
				param.data = JSON.parse(body);
				console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',param.data);
				param.page = page;
				param.word = req.params.word;
				res.render('pages/wordSearch', {
					param: param
				});
			}
		});
	};
}

