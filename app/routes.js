module.exports = function (app) {
    //pages
    app.get('/', app.home);
    app.get('/word/:word', app.wordPage);
    app.get('/browse', app.browsePage);
	app.get('/search/:word', app.searchPage);
    app.get('/search/:word/:page', app.searchPage);
};
