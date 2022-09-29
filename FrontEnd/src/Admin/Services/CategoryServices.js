import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/api';
 class UserServices  
 {
    addCategory(catName,file)
    {
        const config = {
            headers: {
                 'Content-Type': 'multipart/form-data'
            }
        }
        //http://localhost:8080/api/category/add-category/xyz?file=data
         return axios.post(USER_API_BASE_URL + '/category/add-category/'+catName, file,config);
    };

    getAllCategory()
    {
        return axios.get(USER_API_BASE_URL+"/category/fetch-category");
    }
    removeCategory(id)
    {
        return axios.delete(USER_API_BASE_URL+"/category/remove-category/"+id);
    }
 }
 export default new UserServices();
