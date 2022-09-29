import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/api/user';
class UserServices {

     getAllUsers() {
          return axios.get(USER_API_BASE_URL + '/fatch-all-users-only' );
     }

     removeUser(id){
          return axios.delete(USER_API_BASE_URL + '/remove-user' );
     }

     getUsersDataForChart(){
          return axios.get(USER_API_BASE_URL + '/get-user-data-for-chart' );
     }
     addNewAdmin(admin){
          return axios.post(USER_API_BASE_URL + '/signup', admin);
     }
}
export default new UserServices();
