const Reading = require('../models/reading');
const request = require('request');
const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

module.exports = {
    new: newCard

};

function newCard (req, res) {
    console.log('reading starts')
    request(rootURL, function (err, response, body) {
        let card = JSON.parse(body)
        console.log('card: ', card);
    res.render('readings/new',  {
        title: 'Tarot Reading',
        card: card.name,
        user: req.user
    });
})
}

// function create(req, res) {

// }
// function newReading(req, res) {
//     res.render('users/index',  {
//         title: 'Tarot Reading',
//         cards: JSON.parse(body)
//     });
// })
// }
