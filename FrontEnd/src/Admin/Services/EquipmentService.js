import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/api/equipment';
class EquipmentService {
    AddEquipmentByCategory(catId, equipment) {
        return axios.post(USER_API_BASE_URL + '/add-equipment/' + catId, equipment);
    }

    updateEquipment(id, equipment) {
        return axios.put(USER_API_BASE_URL + '/update-equipment/' + id, equipment);
    }

    getAllEquipments() {
        return axios.get(USER_API_BASE_URL + "/fetch-all-equipments");
    }
    loadNewEquipments() {
        return axios.get(USER_API_BASE_URL + "/get-latest-equipment");
    }

    getEquipmentById(id) {
        return axios.get(USER_API_BASE_URL + "/get-equipment-by-id/" + id);
    }
    getEquipmentByName(name) {
        return axios.get(USER_API_BASE_URL + "/get-equipment-by-name/" + name);
    }
    getAllEquipmentsByCatId(catId) {
        return axios.get(USER_API_BASE_URL + "/fetch-equipment-by-cat-id/" + catId);
    }
    deleteProduct(equipId) {
        return axios.delete(USER_API_BASE_URL + "/remove-equipment/" + equipId);
    }
    async fileUpload(file) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        return await axios.post('http://localhost:8080/api/upload', file, config);
    }
}
export default new EquipmentService();
