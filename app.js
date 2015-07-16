var mysql = require('mysql');
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');

app.engine('.html',ejs.__express);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/',function(req,res) {
    res.render('index',{});
});

function connectMysql() {
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'student',
        port : 3306
    });
}

app.get("/score", function(req, res){
    var client = connectMysql();
    client.connect();

    // var TABLE = 'student_name';
    // client.query('INSERT INTO ' + TABLE + ' SET student_id ' + 88,
    //     function(err, results){
    //         console.log("connect to mysql success!");
    // });

    client.query(' SELECT * FROM student_name ',
        function(err, results){
            res.send(results);
            client.end();
    });
});

app.delete("/deleteId",function(req,res) {
    var id = req.body.id;
    console.log(id);

    var client = connectMysql();
    client.connect();

    client.query('delete from student_name where student_id=' + id ,
        function(err,results) {})
    client.end();
})

app.post("/addInfo",function(req,res) {
    var client = connectMysql();
    client.connect();

    var student_name = req.body.name;

    client.query("INSERT INTO student_name(student_name) values('" + student_name + "')",function(err) {
        if(err) throw err;
    })
    client.end();
})



var server = app.listen(3000,function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listen at http://%s:%s' , host, port);
})
