const showMessage = (message) => <p style={ { color: 'red' } }>{ message }</p>;

const checkEmail = (email) => {
  const regExp = /\S+@\S+\.\S+/;
  return regExp.test(email);
};

export { showMessage, checkEmail };
