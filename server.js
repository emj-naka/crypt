// https://vok.paburica.com/index.php?node.js%2F%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E8%AA%8D%E8%A8%BC%E3%81%8C%E3%81%97%E3%81%9F%E3%81%84

var https = require('https');
var fs = require('fs');
var express = require('express');
var app = express();
 
app.get('/', function (req, res) {
    console.log(req.connection.getPeerCertificate());
    res.send("/");
});
 
var option = {
    key: fs.readFileSync('server.key'),    // サーバー証明書内の公開鍵と対をなすprivate key
    cert: fs.readFileSync('server.crt'),    // サーバー証明書
    ca: fs.readFileSync('client.crt'),    // クライアント証明書
    requestCert: true,            // クライアント認証（true:する, false:しない）
    rejectUnauthorized: true        // 認証失敗時に破棄（true:する, false:しない）
};
 
var server = https.createServer(option, app).listen(process.env.port, function () {
    console.log("server listening on port %d", server.address().port);
});