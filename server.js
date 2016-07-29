const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

// app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3003);
// app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    db.collection('userinfo').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('index.ejs', { userinfo: result })
    })
})

var db

MongoClient.connect('mongodb://user:123@ds033015.mlab.com:33015/charitytab', (err, database) => {
    if (err) return console.log(err)
    db = database
    // http.createServer(app).listen(app.get('port'), app.get('ip'), function() {
    //     console.log("✔ Express server listening at %s:%d ", app.get('ip'), app.get('port'));
    // });
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})
app.post('/form', function (req, res) {
    db.collection('userinfo').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
})