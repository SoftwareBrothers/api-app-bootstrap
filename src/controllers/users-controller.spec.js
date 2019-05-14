const UserService = require('../services/user-auth-service');
const UsersController = require('./users-controller');

describe('UsersController', function () {
  const email = 'user@example.com';
  const password = 'password';

  beforeEach(function () {
    sandbox.stub(UserService, 'authenticate').returns({ _id: 'userid' });
  });
  describe('#create', function () {
    beforeEach(async function () {
      this.ret = await UsersController.create({
        payload: { email, password },
      });
    });

    it('creates new user', function () {
      UsersController.auth({ payload: { email, password } });
      expect(UserService.authenticate).to.have.been.calledOnce;
    });

    it('returns token', function () {
      expect(this.ret.token).to.be.a('string');
      expect(this.ret.token).to.have.lengthOf.above(40);
    });
  });
});
