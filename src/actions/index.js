export const LOGIN = 'LOGIN';

export function actionLogin(email) {
  return { type: LOGIN, email };
}

// function actionWallet() {
//   return async (dispatch) => {
//     try {
//       const response = await fetch();
//       const data = await response.json();
//       return dispatch('dados');
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
// }
