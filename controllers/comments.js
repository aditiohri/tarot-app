const Reading = require('../models/reading');

module.exports = {
    create,
    delete: deleteComment
} 
    

function create(req, res){
console.log('creating...');
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
    console.log('req.params.id: ', req.params.id);
    console.log('req.params.idt: ', req.params.id);
Reading.findById(req.params.id, function(err, reading){
    let diary = reading.diary;
    console.log('diary: ', diary)
    diary.pull(diary._id, function (err){
        if (err) return res.render('/error');
        res.redirect(`readings/${reading._id}`)
    })
})
}