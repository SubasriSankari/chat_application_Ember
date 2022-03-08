import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import $ from 'jquery';


export default class ChatWindowController extends Controller {

    @service('session') userSession;
    @service('chat-room-name') chat_room_name;
    @service('username') userName;
    @service('websockets') websockets;
    socketRef = null;

    constructor() {
        super(...arguments);
        var socket = this.websockets.socketFor('ws://localhost:8081/ChatApplication/ChatRoomWebsocket');
        socket.on('open', this.myOpenHandler, this);
        socket.on('message', this.myMessageHandler, this);
        socket.on('close', this.close, this);

        this.set('socketRef', socket);
    };
    message = '';

    myOpenHandler = function(event) {
        // this.renderOpen();
        console.log('On open event has been called: ' + event);
    };


    myMessageHandler = function(event) {
        console.log('Message: ' + event.data);
        var jsonData = JSON.parse(event.data);
        var currentTime = jsonData.time;
        var html;

        if (!(jsonData.action).localeCompare("start")) {
            if ((jsonData.username).localeCompare(this.userName.name)) {
                html = '<div class="row no-gutters"><div class="col-md-3--center"><center><h5>' + jsonData.username + '</h5> joined the conversation at <small>' + currentTime + '</small></center><div class="separator"></div></div></div>';
            } else {
                html = '<div class="row no-gutters"><div class="col-md-3--center"><center><h5>You joined the conversation at</h5> <small>' + currentTime + '</small></center><div class="separator"></div></div></div>';
            }
            document.getElementById("message_area").innerHTML += html;

        } else if (!(jsonData.action).localeCompare("stop")) {
            if ((jsonData.username).localeCompare(this.userName.name)) {
                html = '<div class="row no-gutters"><div class="col-md-3--center"><center><h5>' + jsonData.username + '</h5> left the conversation at <small>' + currentTime + '</small></center><div class="separator"></div></div></div>';
            }
            document.getElementById("message_area").innerHTML += html;

        } else if (!(jsonData.action).localeCompare("message")) {
            if (!(jsonData.room).localeCompare(this.chat_room_name.chatRoomName)) {
                if ((jsonData.username).localeCompare(this.userName.name)) {
                    html = '<div class="message-box others-message-box"><div class="message others-message"><h6>' + jsonData.username + '</h6><h7>' + jsonData.message + '</h7><br><small>' + currentTime + '</small></div><div class="separator"></div></div>';
                } else {
                    console.log("Message from yes " + jsonData.username);
                    html = '<div class="message-box my-message-box"><div class="message my-message"><h6>' + 'You' + '</h6><h7>' + jsonData.message + '</h7><br><small>' + currentTime + '</small></div><div class="separator"></div></div>';
                }
                document.getElementById("message_area").innerHTML += html;
            } else {

            }

        }

        console.log($('#message_area').html());
        message_area.scrollTop = message_area.scrollHeight;
    };

    @action
    sendButtonPressed() {
        var message = $('#typing-box').val();

        if (message.length == 0)
            return;

        const date = new Date();
        const chatAction = {
            "action": "message",
            "user": this.userName.name,
            "room": this.chat_room_name.chatRoomName,
            "message": message + "",
            "time": date.getHours() + " : " + date.getMinutes()
        }

        console.log(chatAction);

        this.get('socketRef').send(JSON.stringify(chatAction));
        $('#typing-box').val("");
    };

    close = function(event) {
        const date = new Date();
        const chatAction = {
            action: "stop",
            user: this.userName.name,
            time: date.getHours() + " : " + date.getMinutes()
        }
        this.get('socketRef').send(chatAction);
        console.log('On close event has been called: ' + event);
    }
}