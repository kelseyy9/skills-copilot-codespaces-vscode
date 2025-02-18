//create a webserver
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var path = require('path');
var comments = [];
var server = http.createServer(function(req, res){
    var parseUrl = url.parse(req.url, true);
    var pathName = parseUrl.pathname;
    if(pathName === '/'){
        fs.readFile('./index.html', function(err, data){
            if(err){
                console.log(err);
                res.end('404 not found');
                return;
            }
            res.end(data);
        });
    }else if(pathName === '/comment'){
        var str = '';
        req.on('data', function(chunk){
            str += chunk;
        });
        req.on('end', function(){
            var obj = querystring.parse(str);
            obj.time = new Date();
            comments.push(obj);
            res.end(JSON.stringify(comments));
        });
    }else{
        fs.readFile('.' + pathName, function(err, data){
            if(err){
                console.log(err);
                res.end('404 not found');
                return;
            }
            res.end(data);
        });
    }
});
server.listen(3000, function(){
    console.log('listening on 3000');
});