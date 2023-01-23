const showMessage = (message) => (
  <p
    data-testid="common_login__element-invalid-email"
    style={ { color: 'red' } }
  >
    { message }
  </p>);

const checkEmail = (email) => {
  const regExp = /\S+@\S+\.\S+/;
  return regExp.test(email);
};

export { showMessage, checkEmail };
