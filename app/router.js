import EmberRouter from '@ember/routing/router';
import config from 'chat-application/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index-page');
  this.route('chat-window', function(){
    this.route('friend', {path: '/friend/:user_id'});
  });

  this.route('chat');
  this.route('signup');
  this.route('choose-chat-room');
});
