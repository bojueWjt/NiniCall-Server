const assert = require('chai').assert;
const errCode = require('../common/erroCode');
const friendRequest = require('../controllers/friendRequest');

describe('Test FriendRequest API', function() {
  
  describe('Add friendRequest', function() {
    
    it('should return has add this request', function() {
      
      assert.equal({
        code: 0,
        status: 'success',
      }, friendRequest.addFriendRequest('1', '2'));
    })
  });
});