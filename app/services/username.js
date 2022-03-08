import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class UsernameService extends Service {
    username = null;

    setName(user) {
        this.username = user;
    }

    get name() {
        return this.username;
    }

}