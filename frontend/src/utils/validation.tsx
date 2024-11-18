const validatePassword = (password: string) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  if (!/[0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password)) {
    return 'Password must include at least one number or special character';
  }

  return '';
};

const validateName = (name: string) => {
  if (!/[a-zA-z]/.test(name)) {
    return 'Name must include latin letters only';
  }

  return '';
};

const validateEmail = (email: string) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return 'Invalid email';
  }

  return '';
};

export { validatePassword, validateName, validateEmail };
