function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (!/[0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password)) {
    return "Password must include at least one number or special character";
  }

  return "";
}

function validateName(name) {
  if (!/[a-zA-z]/.test(name)) {
    return "Name must include latin letters only";
  }

  return "";
}

export { validatePassword, validateName };
