<script>
/* eslint-disable */

let axios = require("axios");
import session from "./session.vue";
const serverUrl = process.env.API_URL || 'https://api.teatromusicado.com.br';
console.log("API URL:", serverUrl);
console.log("Process env:", process.env);

export default {
  send: async function(apiName, command, data, sendToken = false) {
    let config = {
      url: `${serverUrl}/v1/${apiName}/${command}`,
      method: "post",
      withCredentials: true,
      data: {
        data
      }
    };
    if (sendToken) {
      let token = session.getItem("token");
      config.data.token = token;
    }

    try {
      let response = await axios.request(config);
      if (!response.data.success) throw response;
      return response.data;
    } catch (responseError) {
      let response = responseError.response;
      let error = response.data.error;
      console.error(error);
      if (error === "Network Error") throw Error("API_CONNECTION_ERROR");

      switch (response.status) {
        case 401:
          // session.clear();
          // window.vueRouter.push("/login");
          throw(Error("API_UNAUTHORIZED")); // no authorization / invalid authorization was detected
        case 403:
          throw Error("API_FORBIDDEN"); // user does not have correct privileges
        case 404:
          throw Error("API_NOT_FOUND");
        case 429:
          throw Error("API_RATE_LIMIT");
        case 500:
          throw Error("API_SERVER_ERROR");
        default:
          throw response.data;
      }
    }
  },
  sendFormData: async function(apiName, command, data) {
    let config = {
      url: `${serverUrl}/v1/${apiName}/${command}`,
      method: "post",
      withCredentials: true,
      crossdomain: true,
      data: data
    };

    try {
      let response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
      if (error.message === "Network Error")
        throw Error("API_CONNECTION_ERROR");

      switch (error.response.status) {
        case 401:
          // session.clear();
          // window.vueRouter.push('/login');
          throw Error("API_UNAUTHORIZED"); // no authorization / invalid authorization was detected
        case 403:
          throw Error("API_FORBIDDEN"); // user does not have correct privileges
        case 404:
          throw Error("API_NOT_FOUND");
        case 429:
          throw Error("API_RATE_LIMIT");
        case 413:
          throw Error("PAYLOAD_TOO_LARGE");
        case 500:
          throw Error("API_SERVER_ERROR");
        default:
          throw error.response.data;
      }
    }
  }
};
</script>
