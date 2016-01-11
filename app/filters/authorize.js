import { Filter, Errors } from 'denali';
import any from 'lodash/collection/any';
import { singularize } from 'inflection';

export default Filter.extend({

  name: 'denali-can:authorize',

  before(params) {
    if (this.allow) {
      if (typeof this.allow === 'string') {
        this.allow = [ this.allow ];
      }
      if (!this.user) {
        return this.render(new Errors.Forbidden('You must be logged in to perform this request.'));
      }
      let isAllowed = any(this.allow, (roleName) => {
        let role = this.container.lookup('role:' + singularize(roleName));
        return role.is.call(this, this.user, params);
      });
      if (!isAllowed) {
        this.render(new Errors.Forbidden('You are not authorized to perform this request'));
      }
    }
  }

});
