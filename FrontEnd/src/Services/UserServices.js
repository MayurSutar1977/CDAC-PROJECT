import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/api';
class UserServices {
     registerNewUser(newUser) {
          //http://localhost:8080/api/user/signup
          return axios.post(USER_API_BASE_URL + '/user/signup', newUser);
     }
     async userProfile(newUser) {
          return await axios.post(USER_API_BASE_URL + '/user/user_profile', newUser);
     }
    async fileUpload(file) {
          const config = {
               headers: {
                    'Content-Type': 'multipart/form-data'
               }
          }
               return await axios.post(USER_API_BASE_URL + '/upload', file, config); 
     }
     async getUserProfile(userId) {
          return await axios.get(USER_API_BASE_URL + '/user/user-profile/' + userId);
     }
     loadUserAddress(userId) {

          return axios.get(USER_API_BASE_URL + '/user/fetch-user-address/' + userId);


     }
     updateProfile(userId, userProfile) {

          return axios.put(USER_API_BASE_URL + "/user/update-profile/" + userId, userProfile);
     }
}
export default new UserServices();
