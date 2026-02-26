<script>
import request from "./request.vue";

export default {
  create(data) {
    return request.send("play", "create", data, true)
    .then(response => {
      return response;
    });
  },
  update(data) {
    return request.send("play", "update", data, true)
    .then(response => {
      return response;
    });
  },
  getInfo(data){
    return request.send("play", "getInfo", data, true)
    .then(response => {
      return response;
    });
  },
  getAll() {
    return request.send("play", "getAll", {}, true)
    .then(response => {
      return response;
    });
  },
  addConception(data) {
    return request.send("play", "addConception", data, true)
    .then(response => {
      return response;
    });
  },
  delete(data){
    return request.send("play", "delete", data, true)
    .then(response => {
      return response;
    });
  },
  getRecord(data){
    return request.send("play", "getRecord", data, true)
    .then(response => {
      return response;
    });
  },
  addConception(data){
    return request.send("play", "addConception", data, true)
    .then(response => {
      return response;
    });
  },
  removeConception(data){
    return request.send("play", "removeConception", data, true)
    .then(response => {
      return response;
    });
  },
  uploadPicture(playId, formData) {
    return request.sendFormData("play", `uploadPicture/${playId}`, formData)
    .then(response => {
      return response;
    });
  },
  removePicture(data){
    return request.send("play", "removePicture", data, true)
    .then(response => {
      return response;
    });
  },
};
</script>