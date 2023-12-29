import axios from "axios";

let axiosInstance=axios.create({
    baseURL:"http://localhost:8080/"
})

export default axiosInstance