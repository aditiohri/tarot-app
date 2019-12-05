const Reading = require('../models/reading');
const User = require('../models/user');
const request = require('request');
const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

module.exports = {
    index,
    show,
    new: newCard,
    pull: pullCard,
    add: addCard,
    edit,
    update,
    deleteAll,
    deleteOne,
};


//show all readings saved by user
function index(req, res){
Reading.find({}, function(err, readings){
    res.render(`readings/index`, {
        user: req.user,
        readings
    });
});
};

//show individual reading
function show(req, res) {
Reading.findById(req.params.id, (function(err, reading){
        if (err) return res.render('/error');
        res.render(`readings/show`, {
            user: req.user,
            reading
        })}))
}

//returns form to ask a question and pull a new card
function newCard (req, res) {
    res.render('readings/new', {
        user: req.user,
        card: null,
        question: null
    });
};

//returns card from API
function pullCard (req, res) {
    console.log('reading starts');
    console.log('question: ', req.body.question);
    request(rootURL, function (err, response, body) {
        let pull = JSON.parse(body);
        let card = pull.cards[0];
        console.log(card);
        if (err) return res.render('/error');
            res.render(`readings/question`,  {
                user: req.user,
                question: req.body.question,
                cardName: card.name,
                cardDesc: card.desc,
                cardMean: card.meaning_up
            });
        })
}

//allows user to save card to their database
function addCard (req, res) {
    let newReading = new Reading({
        user: req.user.name,
        question: req.body.question,
        name: req.body.name,
        desc: req.body.desc,
        meaning: req.body.meaning
    });
    User.findById(req.user._id, function(err, user){
        user.readings.push(newReading._id);
        user.save(function(err, user){
            res.redirect(`readings`);
        })
    })
    newReading.save(function(err, reading) {});
}
// function addCard (req, res) {
//     let reading = new Reading(req.body);
//     reading.question = req.body.question;
//     reading.name = req.body.name;
//     reading.description = req.body.desc;
//     reading.meaning = req.body.meaning;
//     reading.save(function(err){
//         console.log('saved reading: ', reading)
//         if (err) return res.render('/error');
//         res.redirect('readings');
//     })
// }

//edit reading content
function edit (req, res) {
Reading.findById(req.params.id, function(err, reading){
    res.render('readings/edit', {
        user: req.user,
        reading
    })
})
}

//update reading content
function update(req, res) {
Reading.findById(req.params.id, function(err, reading){
    reading.question = req.body.question;
    reading.name = req.body.name;
    reading.description = req.body.desc;
    reading.meaning = req.body.meaning;
    console.log('reading after edit: ', reading);
    reading.save(function(err){
        console.log('saved reading: ', reading)
        if (err) return res.render('/error');
        res.render(`readings/show`, {
            user: req.user,
            reading
        });
})  
})
}

//delete all saved readings 
function deleteAll(req, res) {
Reading.deleteMany({}, function(err){
    if (err) return res.render('/error');
    res.redirect('/readings');
})
}

//delete one reading
function deleteOne(req, res) {
Reading.findByIdAndDelete(req.params.id, function(err){
    if (err) return res.render('/error');
    res.redirect('/readings');
})
}