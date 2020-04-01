import assert from 'assert';
import app from '../../src/app';

describe('\'contact_methods\' service', () => {
  it('registered the service', () => {
    const service = app.service('contact/methods');

    assert.ok(service, 'Registered the service');
  });
});
