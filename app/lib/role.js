import { DenaliObject } from 'denali';

const Role = DenaliObject.extend({

  is(/* user, params */) {
    throw new Error('You must implement the `is(user)` method for roles - it should return a Boolean indicating whether or not the supplied user has that role.');
  }

});

Role.singleton = true;

export default Role;
