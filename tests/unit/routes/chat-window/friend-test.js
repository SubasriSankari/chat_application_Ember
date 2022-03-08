import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | chat-window/friend', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:chat-window/friend');
    assert.ok(route);
  });
});
