// Setup basic express server
var chromelogger = require('chromelogger');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var fs = require('fs');

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));
app.use(chromelogger.middleware);


// Chatroom

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;
var log = "";
var userList = [];

io.on('connection', function (socket) {
    console.log("有人連進來了！");
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });
    
    socket.on('COUNT', function (data) {
        //console.log(data.count);
        // we tell the client to execute 'new message'
        socket.broadcast.emit('GET_COUNT', {
            count: data.count
        });
        socket.emit('GET_COUNT', {
            count: data.count
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {

        // we store the username in the socket session for this client
        socket.uid = guid();
        socket.username = username.username;
        socket.imgData = username.imgData;

        //console.log(socket.imgData)
        // add the client's username to the global list
        usernames[username.username] = username.username;
        ++numUsers;



        console.log("目前線上有" + numUsers + "位!")


        var _img = saveImg("pic" + socket.uid, socket.imgData);


        var user = {
            uid: socket.uid,
            nick_name: socket.username,
            pic_url: _img
        };
        userList.push(user);

        console.log(userList);

        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers,
            userList: userList
        });

        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });

    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        // remove the username from global usernames list
        removeUser(socket.uid);
        console.log("id:" + socket.uid + '----------disconnect-----------');
        if (addedUser) {
            delete usernames[socket.username];
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }


    });

    function removeUser(uid) {
        for (i = 0; i < userList.length; i++) {
            if(userList[i].uid==uid){
                fs.unlinkSync(userList[i].pic_url);
                delete userList[i];
            }
        }
        
        
    }

    function saveImg(fileName, imgDataString) {
        var matches = imgDataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        socket.imgData = response;

        var imgType = "";
        imgType = response.type.replace("image/", "");
        fs.writeFileSync("public/img/" + fileName + "." + imgType, response.data);
        var fileimg = "public/img/" + fileName + "." + imgType;
        return fileimg;
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


});