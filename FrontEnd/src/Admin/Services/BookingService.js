import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/api/booking';
class UserServices {

     getAllBookings() {
          return axios.get(USER_API_BASE_URL + '/fatch-all-booking');
     }
     updateBookingStatus(id, status) {
          return axios.post(USER_API_BASE_URL + '/update-booking/' + id + '/status/' + status);
     }
     viewBookingDetails(bookingId) {
          return axios.get(USER_API_BASE_URL + '/booking-details/' + bookingId);
     }
     getBookingById(bookingId) {
          return axios.get(USER_API_BASE_URL + '/booking-by-id/' + bookingId);
     }
     getBookingDataForChart(){
          return axios.get(USER_API_BASE_URL + '/booking-data-for-chart');
     }
     getBookingDataForChartStatus(status){
          return axios.get(USER_API_BASE_URL + '/booking-data-for-chart/status/'+status);
     }

     getBookingsByCriteria(criteria, search){
          return axios.get(USER_API_BASE_URL + '/fatch-booking-by-criteria/'+criteria+"/search/"+search);
     }
}
export default new UserServices();
