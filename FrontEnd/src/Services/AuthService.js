import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/api';
class UserServices {
     authenticateUser(loginRequest) {
          return axios.post(USER_API_BASE_URL + '/auth/sign-in/', loginRequest);
     }
     resetPassword(resetPassword) {
          return axios.post(USER_API_BASE_URL + '/auth/reset-password', resetPassword);
     }
     forgotPassword(forgotPassword) {
          return axios.put(USER_API_BASE_URL + '/auth/forgot-password', forgotPassword);
     }
}
export default new UserServices();
