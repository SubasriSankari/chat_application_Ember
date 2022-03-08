import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';

export default class ChatController extends Controller {
    @service('websockets') websockets;
    socketRef = null;

    constructor() {
        super(...arguments);
        var socket = this.websockets.socketFor('ws://localhost:7000/');
        socket.on('open', this.myOpenHandler, this);
        socket.on('message', this.myMessageHandler, this);
        socket.on('close', function (event) {
            console.log('closed');
        }, this);
        this.set('socketRef', socket);
    };
    message = '';

    myOpenHandler = function (event) {
        console.log('On open event has been called: ' + event);
    };

    myMessageHandler = function (event) {
        console.log('Message: ' + event.data);
        this.set('message', event.data);
    };

    @action
    sendButtonPressed() {
        console.log("Button Called");
        // var socket = this.get('websockets').socketFor('ws://localhost:7000/');
        this.socketRef.send('Hello Websocket World');
    };
}
