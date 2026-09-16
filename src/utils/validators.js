// login and sign up
export const validateFormInputs = (formObject) => {
  let errors = {};
  Object.entries(formObject).forEach(([key, value]) => {
    if (!value || !value.trim()) {
      const k= `${key}Empty`
      errors[k] = `${key} is required`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
//  sign up
export const validateInputValues = (formObj) => {
  const errors = {};
  const { username, password, confirmPassword } = formObj;
  const usernameRegex = /^\w{3,30}$/;

  if (!usernameRegex.test(username)) {
    errors.usernameLength = "Username must be 3-30 characters long";
  }
  if (password.length < 8 || confirmPassword.length < 8) {
    errors.passwordLength = "Password must be at least 8 characters";
  }
  if (confirmPassword !== password) {
    errors.passwordMatch = "Passwords don't match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};