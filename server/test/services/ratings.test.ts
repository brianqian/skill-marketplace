import assert from 'assert';
import app from '../../src/app';

describe('\'ratings\' service', () => {
  it('registered the service', () => {
    const service = app.service('ratings');

    assert.ok(service, 'Registered the service');
  });
});
