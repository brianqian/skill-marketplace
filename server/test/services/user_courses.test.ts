import assert from 'assert';
import app from '../../src/app';

describe('\'user_courses\' service', () => {
  it('registered the service', () => {
    const service = app.service('users/courses');

    assert.ok(service, 'Registered the service');
  });
});
