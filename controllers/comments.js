const Reading = require('../models/reading');
// const request = require('request');
// const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

module.exports = {
    create,
    delete: deleteComment
} 
    

function create(req, res){
console.log('create function says hello aditi!!!');
Reading.findById(req.params.id, function(err, reading){
    if (err) return res.render('/error');
    reading.diary.push(req.body);
    reading.save(function(err){
        console.log('diary with reading: ', reading)
        if (err) return res.render('/error');
        res.redirect(`/readings/${reading._id}`)
    })
})
}

function deleteComment(req, res){
    console.log('deleting...');
    

}