import Component from '@ember/component';
import $ from 'jquery';
import { action } from '@ember/object';
import {inject as service} from '@ember/service';

export default class ChatRoomComponent extends Component{

    // @service('session') userSession;

    // user = null;

    // @action
    // send(){
    //     this.userSession.setSession("86745");
    //     alert(this.userSession.session);
    //     user = this.userSession.session;
    // }

    // @service('websockets') websockets;
    
    // message: '',

    // init() {
    //   this._super(...arguments);
    //   this.sockjs.on('messageReceived',this, 'messageReceived');
    // },

    // messageReceived(message){
    //   $('#chat-content').val((i, text)=>  `${text}${message}`);
    //   this.set('message',message);
    // },
    
    // actions :{
    //   enter(info,username) {
    //     this.sockjs.sendInfo(`${username}: ${info}`);
    //   }
    // }
}