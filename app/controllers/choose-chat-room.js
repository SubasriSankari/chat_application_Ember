import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChooseChatRoomController extends Controller {

    @service('chat-room-name') chat_room_name;

    @action
    roomSelect(buttonValue) {
        self = this;
        self.chat_room_name.setChatRoomName(buttonValue);
        self.transitionToRoute('chat-window');
        // console.log(this.chat_room_name.chatRoomName);

    }
}