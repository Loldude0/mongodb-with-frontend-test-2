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

    async function getquery(colltoquery, findfunc, res) {

        await db.collection(colltoquery).find(findfunc).toArray()
        .then(results => {
            res.render('queryresults.ejs', { data : results, collection : colltoquery});
        })
        .catch(error => console.log(error))

    }

    /*
    COLLECTION FUNCTIONS
    */

    //homepage
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/pages/home.html');
    })

    //create collection
    app.get('/createcollection', (req, res) => {
        res.sendFile(__dirname + '/pages/createcollection.html');
    })


    //view collections
    app.get('/viewcollection', (req, res) => {
        db.listCollections().toArray()
        .then(names => {
            res.render('viewcollection.ejs' , { collections : names})
        })
        .catch(error => console.log(error));
    })


    //delete collections
    app.get('/deletecollection', (req, res) => {
        db.listCollections().toArray()
        .then(names => {
            res.render('deletecollection.ejs' , {collections : names})
        })
        .catch(error => console.log(error));
    })

    /*
    COLLECTION ENDPOINTS BELOW
    */

    //form submission endpoint
    app.post('/collectionpost', (req, res) =>{

        var colname = req.body.colname;
        colname = colname.toLowerCase();
        colname = colname.replace(/[^a-zA-Z1-9]/g, '');

        db.createCollection(colname)
        .then(result => res.redirect('createcollection'))
        .catch(error => console.log(error))
    })

    //delete collection endpoint
    app.delete('/collectiondelete', (req, res) => {
        var coldelname = req.body.name;
        db.collection(coldelname).drop()
        .catch(error => console.log(error));
    })

    /*
    DATA FUNCTIONS
    */

    //add data form
    app.get('/adddata', (req, res) => {
        db.listCollections().toArray()
        .then(names => {
            res.render('adddata.ejs' , { collections : names})
        })
        .catch(error => console.log(error));
    })

    //query data
    app.get('/querydata', (req, res) => {
        db.listCollections().toArray()
        .then(names => {
            res.render('querydata.ejs' , { collections : names})
        })
        .catch(error => console.log(error));
    })

    /*
    DATA ENDPOINTS
    */
    
    //add data to collections
    app.post('/datapost', (req, res) =>{

        var colltoaddto = req.body.collection;
        delete req.body.collection;
        
        //process main fields
        req.body.firstname = (req.body.firstname).replace(/[^a-zA-Z]/g, '');
        req.body.middlename = (req.body.middlename).replace(/[^a-zA-Z]/g, '');
        req.body.lastname = (req.body.lastname).replace(/[^a-zA-Z]/g, '');
        req.body.phonenumber = (req.body.phonenumber).replace(/[^0-9]/g, '');

        //process the custom fields
        var length = Object.keys(req.body).length - 9;

        for(var i = 0;i <= length;i++){
            if(i % 2 ==0){

                var temp1 = (req.body[(i)]);
                var temp2 = (req.body[(i + 1)])

                temp1 = temp1.replace(/[^a-zA-Z1-9]/g, '');
                temp2 = temp2.replace(/[^a-zA-Z1-9]/g, '');
                temp1 = temp1.toLowerCase();
                temp2 = temp2.toLowerCase();

                req.body[temp1] = temp2;

                delete req.body[(i)];
                delete req.body[(i + 1)];

            }
        }
        
        //add a second id and date
        var id = ((req.body.firstname).substring(0,2)).toUpperCase() + ((req.body.lastname).substring(0,2)).toUpperCase() + ((req.body.birthdate).replaceAll("-",""));
        var dt = new Date();
        var date = dt.getFullYear() + "_" + (dt.getMonth() + 1) + "_" + dt.getDate() + "-" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        date = date.toString();

        req.body["id2"] = id;
        req.body["creationdate"] = date;
        

        //finally, add it to the database
        db.collection(colltoaddto).insertOne(req.body)
        .then(result => res.redirect('/adddata'))
        .catch(error => console.log(error))
    })

    //query data endpoint
    app.post('/query', (req, res) => {
        
        var collectiontoquery = req.body.collection;
        var querytype = req.body.querytype;

        if(querytype == "custom"){

            delete req.body.collection;
            delete req.body.querytype;

            getquery(collectiontoquery, req.body, res);

        }else if(querytype == "all"){

        getquery(collectiontoquery, {}, res);
            
        }else{
            console.log("error!");
        }
    })

    //delete data
    app.delete('/deletedata', (req, res) => {
        var colltodelin = req.body.collection;
        delete req.body.collection;
        db.collection(colltodelin).deleteOne(req.body)
        .catch(error => console.log(error))
    })  

    /*
    port
    */

    app.listen(port, function() {
        console.log("initiated");
    })
})