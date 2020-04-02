import assert from 'assert';
import app from '../../src/app';

describe('\'contact_info\' service', () => {
  it('registered the service', () => {
    const service = app.service('contact/info');

    assert.ok(service, 'Registered the service');
  });
});
