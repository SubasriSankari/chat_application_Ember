import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | choose-chat-room', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:choose-chat-room');
    assert.ok(route);
  });
});
