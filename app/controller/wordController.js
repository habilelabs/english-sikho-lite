var request = require('request');
var async  = require('async');
var url = 'https://www.englishsikho.com/api/v1/';
module.exports = function (app) {

    app.home = function (req, res) {
            request(url + 'getTrandingWord', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var param = {};
                    param.title = 'Englishsikho - Learn English from Hindi- Best English Learning website';
                    param.data = JSON.parse(body);
                    res.render('pages/home', {
                        param: param
                    });
                }
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
        var wordUrl = encodeURI(url + 'getword/' + req.params.word);
        request(wordUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var param = {};
                param.title = 'Englishsikho - Learn English from Hindi- Best English Learning website';
                param.data = JSON.parse(body);
                if(param.data.synonym) {
                    param.data.synonym = param.data.synonym.replace(/[|]/g, ",");
                }
                if(param.data.englishMeaning) {
                    param.data.englishMeaning = param.data.englishMeaning.replace(/[|]/g, ",");
                }
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
        var searchUrl = encodeURI(url + 'search/' + req.params.word + "/" + page);
        var urlCount = encodeURI(url + 'searchCount/' + req.params.word);
           async.parallel([
                function (callback) {
                        request(urlCount, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                               var countresult = {};
                                countresult.wcount = JSON.parse(body);
                                countresult.lastpage = Math.floor((JSON.parse(body))/20);
                                callback(null, countresult);
                            }
                        });
                },
                function (callback) {
                    request(searchUrl, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var param = {};
                            param.title = 'Englishsikho - Learn English from Hindi- Best English Learning website';
                            param.data = JSON.parse(body);
                            param.page = page;
                            param.word = req.params.word;
                            callback(null, param);
                        }
                    });

                }],
            function (err, results) {
                var allData = {};
                allData.countresult = results[0];
                allData.param = results[1];
                if (err) {
                    console.log(err);
                    return res.sendStatus(400);
                }
                else {
                    res.render('pages/wordSearch', {
                        param: allData
                    });
                }
            });
	};
};





