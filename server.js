const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.urlencoded({ extended : true}));
app.use(bodyparser.json());
app.use(express.static('public'))
app.set('views', './pages');
app.set('view engine', 'ejs');
const port = 3000;

MongoClient.connect("mongodb://localhost:27017/application4" , {useUnifiedTopology : true} , (err, client) => {

    if(err) return console.error(err);
    console.log("Connected to database");
    var collection = null;
    const db = client.db()

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/pages/home.html');
    })

    app.get('/createcollection', (req, res) => {
        res.sendFile(__dirname + '/pages/createcollection.html');
    })

    app.get('/viewcollection', (req, res) => {
        db.listCollections().toArray()
        .then(names => {
            res.render('viewcollection.ejs' , { collections : names})
        })
        .catch(error => console.log(error));
    })

    app.get('/deletecollection', (req, res) => {
        db.listCollections().toArray()
        .then(names => {
            res.render('deletecollection.ejs' , {collections : names})
        })
        .catch(error => console.log(error));
    })
    app.post('/collectionpost', (req, res) =>{

        var colname = req.body.colname;
        colname = colname.toLowerCase();
        colname = colname.replace(/[^a-zA-Z]/g, '');

        db.createCollection(colname)
        .then(result => {
            res.redirect('/createcollection');
            console.log(result);
        })
        .catch(error => console.log(error))
    })

    app.delete('/collectiondelete', (req, res) => {
        var coldelname = req.body.name;
        console.log(coldelname);
        db.collection(coldelname).drop()
        .catch(error => console.log(error));
    })

    app.listen(port, function() {
        console.log("initiated");
    })
})