var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var connectMysql = require("./public/config-mysql.js");

app.engine('.html',ejs.__express);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/',function(req,res) {
    res.render('index');
});

app.get("/getStudentNams", function(req, res){
    var client = connectMysql();

    client.connect();
    client.query(' SELECT * FROM student_name ',
        function(err, results){
            res.send(results);
            client.end();
    });
});

app.delete("/deleteStudnetName",function(req,res) {
    var id = req.body.id;
    var client = connectMysql();

    client.connect();

    client.query('delete from student_name where student_id=' + id ,
        function(err,results) {
            console.log(results);
        })
    client.end();
    res.end();
})

app.post("/addStudentName",function(req,res) {
    var client = connectMysql();
    client.connect();

    var student_name = req.body.name;

    client.query("INSERT INTO student_name(student_name) values('" + student_name + "')",function(err) {
        if(err){
            alert("添加数据失败");
        };
    })
    client.end();
    res.end();
})



var server = app.listen(3000,function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listen at http://%s:%s' , host, port);
})
