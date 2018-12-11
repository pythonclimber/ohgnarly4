module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    var homeCtrl = require('../controllers/homeController');
    var showCtrl = require('../controllers/showController');
    var movieCtrl = require('../controllers/movieController');
    var messageCtrl = require('../controllers/messageController')(io);

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    router.post('/login', (req, res) => {
        homeCtrl.login(req, res);
    });

    router.get('/messages', (req, res) => {
        messageCtrl.getMessages(req, res);
    });

    router.post('/message', (req, res) => {
        messageCtrl.createMessage(req, res);
    });

    router.get('/users', (req, res) => {
        homeCtrl.getUsers(req, res);
    });

    router.get('/categories', (req, res) => {
        homeCtrl.getCategories(req, res);
    });

    //Testing route for changes to messenger.  This simulates a message from DJ.
    router.get('/new-message', (req, res) => {
        req.body.body = 'Sup, dude';
        req.body.userId = '58cb3e444c8d5f6b7cdd71f6';
        homeCtrl.createMessage(req, res);
    });

    router.get('/new-movie', (req, res) => {
        movieCtrl.createUser(req, res);
    });

    router.get('/contacts/:userId', (req, res) => {
        homeCtrl.getContacts(req, res);
    });

    router.get('/movies/:userId', (req, res) => {
        movieCtrl.getMovies(req, res);
    });

    router.post('/movie', (req, res) => {
        movieCtrl.createMovie(req, res);
    });

    router.get('/movie-details/:onlineId', (req, res) => {
        // setTimeout(homeCtrl.getMovieDetails, 3000, req, res);
        movieCtrl.getMovieDetails(req, res);
    });

    router.get('/movie-search/:title/:page', (req, res) => {
        movieCtrl.searchMovies(req, res);
    });

    router.delete('/movie/:userId/:imdbid', (req, res) => {
        movieCtrl.deleteMovie(req, res);
    });

    router.patch('/movie', (req, res) => {
        movieCtrl.updateMovie(req, res);
    });

    router.get('/shows/:userId', (req, res) => {
        showCtrl.getUserShows(req, res);
    });

    router.post('/show', (req, res) => {
        showCtrl.createShow(req, res);
    });

    router.put('/show', (req, res) => {
        showCtrl.updateShow(req, res);
    });

    router.get('/show-search/:title/:page', (req, res) => {
        showCtrl.searchShows(req, res);
    });

    router.get('/all-messages/:userId', (req, res) => {
        messageCtrl.getAllMessages(req, res);
    });

    router.post('/messages', (req, res) => {
        messageCtrl.searchMessages(req, res);
    });

    router.get('/movie-formats', (req, res) => {
        movieCtrl.getFormats(req, res);
    });

    return router;
}