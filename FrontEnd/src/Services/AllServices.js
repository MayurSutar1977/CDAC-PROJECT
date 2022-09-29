import axios from 'axios';
import React, { Component } from 'react'
const USER_API_BASE_URL = 'http://localhost:8080/api';
class AllServices extends Component {

    //load images for slider 
    loadImages() {
        return axios.get("/Images/images.json");
    }

    getAllCategories() {
        return axios.get(USER_API_BASE_URL + "/category/fetch-category");
    }



    /**----------------------------Equipments services------------------------------**/
    getAllEquipments() {
        return axios.get(USER_API_BASE_URL + "/equipment/fetch-equipments");
    }

    getNewEquipments() {
        return axios.get(USER_API_BASE_URL + "/equipment/get-latest-equipment");
    }

    getAllEquipmentsByCategoryName(catName) {
        return axios.get(USER_API_BASE_URL + "/equipment/find-equipment-by-cat-name/" + catName);
    }
    getAllEquipmentsByCategoryId(catId) {
        console.log(catId)
        return axios.get(USER_API_BASE_URL + "/equipment/get-equipment-by-cat-id/" + catId);
    }
    getAllEquipmentsByCategory(categoryId) {
        return axios.get(USER_API_BASE_URL + "/equipment/get-equipment-by-cat-id/" + categoryId);
    }
    getEquipmentById(categoryId) {
        return axios.get(USER_API_BASE_URL + "/equipment/get-equipment-by-id/" + categoryId);
    }

    /*************************User Cart******************* */
    updateCartUserId(id) {
        return axios.get(USER_API_BASE_URL + "/cart/update-cart-user-id/" + id);
    }
    //get cart by user id from server
    loadRentLine(id) {
        console.log(id)
        return axios.get(USER_API_BASE_URL + "/cart/load-rent-lines-user-id/" + id);
    }
    //get cart by user id from server
    getCartByUserId(id) {
        return axios.get(USER_API_BASE_URL + "/cart/get-cart-user-id/" + id);
    }
    //Add equipment to cart and updating in data base
    addEquipmentToCart(equipmentCartId) {
        return axios.post(USER_API_BASE_URL + "/cart/add-to-rent", equipmentCartId);
    }

    removeFromRent(rentId) {
        return axios.delete(USER_API_BASE_URL + "/cart/remove-from-rent/" + rentId)
    }

    getRentTotalAmt(userId) {
        return axios.get(USER_API_BASE_URL + "/cart/get-total-rent-amount/" + userId)
    }

    getRentTotalSavingAmt(userId) {
        return axios.get(USER_API_BASE_URL + "/cart/get-total-saving-amount/" + userId)
    }

    //user address 
    getUserAddress(userId) {
        return axios.get(USER_API_BASE_URL + "/user/fetch-user-address/" + userId)
    }
    //user address 
    updateAddress(userId, userAddress) {
        return axios.put(USER_API_BASE_URL + "/user/update-user-address/" + userId, userAddress)
    }


    addBooking(totalPrice, userId, timeSlot, bookingDate, rentDays) {
        return axios.get(USER_API_BASE_URL + '/booking/add-booking/' + userId + '/price/' + totalPrice + '/time-slot/' + timeSlot + '/booking-date/' + bookingDate + '/rent-days/' + rentDays);
    }
    // @GetMapping("/booking/add-booking/{userId}/price/{totalPrice}/time-slot/{timeSlot}")
    addBookingDetails(userId, bookingId) {
        return axios.get(USER_API_BASE_URL + '/booking/booking-details/' + userId + '/' + bookingId);
    }

    addPaymentDetails(codPayment) {
        return axios.post(USER_API_BASE_URL + '/payment/cod-payment', codPayment);
    }
    addCardDetails(cardPayment) {
        return axios.post(USER_API_BASE_URL + '/payment/card-payment', cardPayment);
    }

    getPaymentDetailsByBookingId(bookingId) {
        return axios.get(USER_API_BASE_URL + '/booking/get-payment-by-booking/' + bookingId);
    }

    getBookingById(id) {
        return axios.get(USER_API_BASE_URL + '/booking/booking-by-id/' + id);
    }


    loadRentBookingHistory(userId) {
        return axios.get(USER_API_BASE_URL + '/booking/history/' + userId);
    }

    viewBookingDetails(bookingId) {
        return axios.get(USER_API_BASE_URL + '/booking/booking-details/' + bookingId);
    }

    getBookingTotalAmount(bookingId) {
        return axios.get(USER_API_BASE_URL + '/booking/get-booking-total-amount/' + bookingId);
    }

    cancelBooking(bookingId) {
        return axios.get(USER_API_BASE_URL + '/booking/booking-cancel/' + bookingId);
    }

}
export default new AllServices();

