export function validateEmail(mail) {
  if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,12}$/.test(mail)) {
    return true;
  }
  return false;
}

export function validatePassword(pass) {
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(pass)) {
    return true;
  }
  return false;
}
