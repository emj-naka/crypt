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
    key: fs.readFileSync('server.key'),    // �T�[�o�[�ؖ������̌��J���Ƒ΂��Ȃ�private key
    cert: fs.readFileSync('server.crt'),    // �T�[�o�[�ؖ���
    ca: fs.readFileSync('client.crt'),    // �N���C�A���g�ؖ���
    requestCert: true,            // �N���C�A���g�F�؁itrue:����, false:���Ȃ��j
    rejectUnauthorized: true        // �F�؎��s���ɔj���itrue:����, false:���Ȃ��j
};
 
var server = https.createServer(option, app).listen(process.env.port, function () {
    console.log("server listening on port %d", server.address().port);
});