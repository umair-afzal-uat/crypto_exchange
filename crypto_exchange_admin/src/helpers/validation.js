export const emailValid = email => {
  const regExp = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+.[a-zA-Z]{2,4}/;
  if (!regExp.test(email)) return false;
  return true;
};

export const passwordValid = password => {
  if (password.length < 8) return false;
  const regExp =
    /(?=^.\S{7,}$)((?=.*\d)|(?=.*\W+))(?=.*[0-9])(?![.\n])(?=.*[A-Za-z0-9])(?=.*[~!^(){}<>%@#&*+.,=_-]).*$/;
  if (!regExp.test(password)) return false;
  return true;
};

export const codeValid = password => {
  if (password.length < 6) return false;
  const regExp = /^\d+$/;
  if (!regExp.test(password)) return false;
  return true;
};
