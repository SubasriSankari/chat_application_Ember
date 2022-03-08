import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SessionIdService extends Service {
    session = null;
    
    setSession(session_id){
        this.session = session_id;
    }

    getSession(){
        return this.session;
    }
    
}
