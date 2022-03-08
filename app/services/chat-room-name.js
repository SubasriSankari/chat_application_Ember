import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ChatRoomNameService extends Service {
    chat_room_name = null;

    setChatRoomName(chat_room_name) {
        this.chat_room_name = chat_room_name;
    }

    get chatRoomName() {
        return this.chat_room_name;
    }

}