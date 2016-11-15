

var express=require('express');
var quillrender=require('quill-render');


var mongodb=require('mongodb').MongoClient;

var bodyparser=require('body-parser');
var app=express();
app.use(bodyparser.urlencoded({extended:'true'}));
/*app.use(bodyparser.json());*/
app.use(express.static('public'));


var db;
mongodb.connect('mongodb://localhost:27017/Quilldata',function(err,con){
    if(err){
        console.log(err);
        process.exit(1);
    }


    db=con;
    console.log('database connection ready');

});
var collection="quilleditortext";

 app.get('/index',function(req,res){
     res.send('hi result from node ');
 })
var id=1;
app.post('/somedata',function(req,res){
    console.log('in post');
    var result=req.body.mydata;

    var newrecord={

        "id":id++,
        "title":"sampleData  "+id,
        "data":result
    }
    console.log('in post function    '+newrecord);



    db.collection(collection).insertOne(newrecord,function(err,docs){
        if(err){
            console.log('errors');
        }
        else
        {
            console.log(newrecord);
            console.log(docs.ops[0]);
            res.status(201).json(docs.ops[0]);

        }
    });
});
 app.get('/getdata',function(req,res){
     db.collection(collection).find({}).toArray(function(err,doc){
         res.setHeader('Content-Type','application/json');
         res.json(doc);
     })


 })

var port=7000;
app.listen(port);
console.log('Listening on port'+7000+'...');