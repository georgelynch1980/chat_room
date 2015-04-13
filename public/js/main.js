// @koala-prepend "jquery-1.8.3.min.js"
// @koala-append "jquery.queryloader2.js"
// @koala-append "BaseUtil.min.js"
// @koala-append "UserAgent.js"
// @koala-append "underscore-min.js"
// @koala-append "backbone-min.js"
// @koala-append "greensock/TweenMax.js"
// @koala-append "purl.js"
//
//   █████▒█    ██  ▄████▄   ██ ▄█▀       ██████╗ ██╗   ██╗ ██████╗
// ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒        ██╔══██╗██║   ██║██╔════╝
// ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░        ██████╔╝██║   ██║██║  ███╗
// ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄        ██╔══██╗██║   ██║██║   ██║
// ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄       ██████╔╝╚██████╔╝╚██████╔╝
//  ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒       ╚═════╝  ╚═════╝  ╚═════╝
//  ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
//  ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
//           ░     ░ ░      ░  ░
//   
$(document).ready(function () {
    console.log("ready!!!");
    var styles = ['background: linear-gradient(#D33106, #571402)',
                  'font-family: "微軟正黑體", "Microsoft JhengHei", "新細明體", "PMingLiU", AppleGothic, Dotum, Lucida Grande, Verdana Sans-serif',
                  'border: 1px solid #3E0E02',
                  'color: white',
                  'font-size:35px',
                  'display: block',
                  'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
                  'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
                  'line-height: 40px',
                  'text-align: center',
                  'font-weight: bold'].join(';');
    console.log('%c 請不要這樣', styles);


    var _homeView = new APP.HomeView();

    var FADE_TIME = 150; // ms
    var TYPING_TIMER_LENGTH = 400; // ms
    var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];
    /*var _imgData = "data:image/jpeg;base64,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";*/

    // Initialize varibles
    var $window = $(window);
    var $usernameInput = $('.usernameInput'); // Input for username
    var $messages = $('.messages'); // Messages area
    var $inputMessage = $('.inputMessage'); // Input message input box

    var $loginPage = $('.login.page'); // The login page
    var $chatPage = $('.chat.page'); // The chatroom page

    // Prompt for setting a username
    var username;
    var connected = false;
    var typing = false;
    var lastTypingTime;
    var $currentInput = $usernameInput.focus();

    APP.socket = io();

    function addParticipantsMessage(data) {
        var message = '';
        if (data.numUsers === 1) {
            message += "there's 1 participant";
        } else {
            message += "there're " + data.numUsers + " participants";
        }
        log(message);
    }

    APP.setUsername = function () {

    }
    // Sets the client's username
    function setUsername() {
        username = cleanInput($usernameInput.val().trim());

        // If the username is valid
        if (username) {
            $loginPage.fadeOut();
            $chatPage.show();
            $loginPage.off('click');
            $currentInput = $inputMessage.focus();

            // Tell the server your username
            APP.socket.emit('add user', {
                username: username,
                imgData: _imgData
            });
            console.log("----------------------add user");
        }
    }

    // Sends a chat message
    function sendMessage() {
        var message = $inputMessage.val();
        // Prevent markup from being injected into the message
        message = cleanInput(message);
        // if there is a non-empty message and a socket connection
        if (message && connected) {
            $inputMessage.val('');
            addChatMessage({
                username: username,
                message: message
            });
            // tell server to execute 'new message' and send along one parameter
            APP.socket.emit('new message', message);
        }
    }

    // Log a message
    function log(message, options) {
        var $el = $('<li>').addClass('log').text(message);
        addMessageElement($el, options);
    }

    // Adds the visual chat message to the message list
    function addChatMessage(data, options) {
        // Don't fade the message in if there is an 'X was typing'
        var $typingMessages = getTypingMessages(data);
        options = options || {};
        if ($typingMessages.length !== 0) {
            options.fade = false;
            $typingMessages.remove();
        }

        var $usernameDiv = $('<span class="username"/>')
            .text(data.username)
            .css('color', getUsernameColor(data.username));
        var $messageBodyDiv = $('<span class="messageBody">')
            .text(data.message);

        var typingClass = data.typing ? 'typing' : '';
        var $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .addClass(typingClass)
            .append($usernameDiv, $messageBodyDiv);

        addMessageElement($messageDiv, options);
    }

    // Adds the visual chat typing message
    function addChatTyping(data) {
        data.typing = true;
        data.message = 'is typing';
        addChatMessage(data);
    }

    // Removes the visual chat typing message
    function removeChatTyping(data) {
        getTypingMessages(data).fadeOut(function () {
            $(this).remove();
        });
    }

    // Adds a message element to the messages and scrolls to the bottom
    // el - The element to add as a message
    // options.fade - If the element should fade-in (default = true)
    // options.prepend - If the element should prepend
    //   all other messages (default = false)
    function addMessageElement(el, options) {
        var $el = $(el);

        // Setup default options
        if (!options) {
            options = {};
        }
        if (typeof options.fade === 'undefined') {
            options.fade = true;
        }
        if (typeof options.prepend === 'undefined') {
            options.prepend = false;
        }

        // Apply options
        if (options.fade) {
            $el.hide().fadeIn(FADE_TIME);
        }
        if (options.prepend) {
            $messages.prepend($el);
        } else {
            $messages.append($el);
        }
        $messages[0].scrollTop = $messages[0].scrollHeight;
    }

    // Prevents input from having injected markup
    function cleanInput(input) {
        return $('<div/>').text(input).text();
    }

    // Updates the typing event
    function updateTyping() {
        if (connected) {
            if (!typing) {
                typing = true;
                APP.socket.emit('typing');
            }
            lastTypingTime = (new Date()).getTime();

            setTimeout(function () {
                var typingTimer = (new Date()).getTime();
                var timeDiff = typingTimer - lastTypingTime;
                if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
                    APP.socket.emit('stop typing');
                    typing = false;
                }
            }, TYPING_TIMER_LENGTH);
        }
    }

    // Gets the 'X is typing' messages of a user
    function getTypingMessages(data) {
        return $('.typing.message').filter(function (i) {
            return $(this).data('username') === data.username;
        });
    }

    // Gets the color of a username through our hash function
    function getUsernameColor(username) {
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }

    // Keyboard events

    $window.keydown(function (event) {
        // Auto-focus the current input when a key is typed
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $currentInput.focus();
        }
        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            if (username) {
                sendMessage();
                APP.socket.emit('stop typing');
                typing = false;
            } else {
                進入聊天室
                //setUsername();
            }
        }
    });

    $inputMessage.on('input', function () {
        updateTyping();
    });

    // Click events

    // Focus input when clicking anywhere on login page
    $loginPage.click(function () {
        $currentInput.focus();
    });

    // Focus input when clicking on the message input's border
    $inputMessage.click(function () {
        $inputMessage.focus();
    });

    // Socket events

    // Whenever the server emits 'login', log the login message
    APP.socket.on('login', function (data) {
        connected = true;
        // Display the welcome message
        var message = "Welcome to Socket.IO Chat – ";
        log(message, {
            prepend: true
        });
        addParticipantsMessage(data);
        console.log('----user login------------')
        console.log(data.userList)
        APP.userList=data.userList;
    });

    // Whenever the server emits 'new message', update the chat body
    APP.socket.on('new message', function (data) {
        addChatMessage(data);
    });

    // Whenever the server emits 'user joined', log it in the chat body
    APP.socket.on('user joined', function (data) {
        log(data.username + ' joined');
        console.log('----user joined------------')
        console.log(data)
        addParticipantsMessage(data);
    });

    // Whenever the server emits 'user left', log it in the chat body
    APP.socket.on('user left', function (data) {
        log(data.username + ' left');
        addParticipantsMessage(data);
        removeChatTyping(data);
    });

    // Whenever the server emits 'typing', show the typing message
    APP.socket.on('typing', function (data) {
        addChatTyping(data);
    });

    // Whenever the server emits 'stop typing', kill the typing message
    APP.socket.on('stop typing', function (data) {
        removeChatTyping(data);
    });


    APP.socket.on('tolog', function (data) {
        console.log(data);
        console.log("----------------------ok");
    });


});