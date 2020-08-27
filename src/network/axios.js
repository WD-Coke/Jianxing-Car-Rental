import axios from "axios";

const MyHttpServer = {};

MyHttpServer.install = Vue => {
    axios.defaults.baseURL = "http://112.124.14.194:9001/"; // 基础地址
    axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";

    Vue.prototype.$axios = axios;
    axios.defaults.withCredentials = true
};

export default MyHttpServer;