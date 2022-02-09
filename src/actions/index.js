export const LOGIN = 'LOGIN';

export function actionLogin(email) {
  return { type: LOGIN, email };
}
