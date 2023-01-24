const showMessage = (message, testid) => (
  <p
    data-testid={ testid }
    style={ { color: 'red' } }
  >
    { message }
  </p>);

const checkEmail = (email) => {
  const regExp = /\S+@\S+\.\S+/;
  return regExp.test(email);
};

const checkUserInfo = (userInfo) => {
  const SIX = 6;
  const validEmail = checkEmail(userInfo.email);
  const validPassword = (userInfo.password && userInfo.password.length >= SIX);

  return (validEmail && validPassword);
};

export { showMessage, checkEmail, checkUserInfo };
