export function initialize( application ) {
  //  application.inject('component', 'socketjs', 'service:socketjs');
  application.inject('controller', 'websockets', 'service:websockets');
}

export default {
  name: 'websockets',
  initialize
};
