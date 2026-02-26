<script>
import request from "./request.vue";

export default {
  create(data) {
    return request.send("theater", "create", data, true)
    .then(response => {
      return response;
    });
  },
  update(data) {
    return request.send("theater", "update", data, true)
    .then(response => {
      return response;
    });
  },
  getAll() {
    return request.send("theater", "getAll", {})
    .then(response => {
      return response;
    });
  },
  getInfo(data) {
    return request.send("theater", "getInfo", data)
    .then(response => {
      return response;
    });
  },
  addResponsible(data) {
    return request.send("theater", "addResponsible", data, true)
    .then(response => {
      return response;
    });
  },
  removeResponsible(data) {
    return request.send("theater", "removeResponsible", data, true)
    .then(response => {
      return response;
    });
  },
  delete(data) {
    return request.send("theater", "delete", data, true)
    .then(response => {
      return response;
    });
  },
  getRecord(data) {
    return request.send("theater", "getRecord", data, true)
    .then(response => {
      return response;
    });
  },
  uploadPicture(theaterId, formData) {
    return request.sendFormData("theater", `uploadPicture/${theaterId}`, formData)
    .then(response => {
      return response;
    });
  },
  removePicture(data){
    return request.send("theater", "removePicture", data, true)
    .then(response => {
      return response;
    });
  }
};
</script>