
// userErrCode
const notMatch = {
  code: 2001,
  errorMessage: '账号或密码不正确',
};

const notCode = {
  code: 2002,
  errorMessage: '请先获取验证码',
};

const hadPhoneNum = {
  code: 2003,
  errorMessage: '该手机号已经被注册',
};

const codeErr = {
  code: 2004,
  errorMessage: '验证码错误',
};

const notFindUser = {
  code: 2005,
  errorMessage: '未发现该用户',
};

const notFindCurrentUser = {
  code: 2006,
  errorMessage: '当前操作用户不存在',
};

const hasBeenFriend = {
  code: 2007,
  errorMessage: '这个用户已经您的好友',
};

exports.notMatch = notMatch;
exports.notCode = notCode;
exports.hadPhoneNum = hadPhoneNum;
exports.codeErr = codeErr;
exports.notFindUser = notFindUser;
exports.notFindCurrentUser = notFindCurrentUser;
exports.hasBeenFriend = hasBeenFriend;
