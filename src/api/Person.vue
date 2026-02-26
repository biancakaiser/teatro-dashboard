<script>
import request from "./request.vue";

export default {
  create(data) {
		return request.send("person", "create", data, true)
		.then(response => {
      return response;
    });
  },
  update(data) {
		return request.send("person", "update", data, true)
		.then(response => {
      return response;
    });
  },
  getInfo(data) {
		return request.send("person", "getInfo", data, true)
		.then(response => {
      return response;
    });
  },
  getAllNames() {
    return request.send("person", "getAllNames", {}, true)
		.then(response => {
      return response;
    });
  },
  getAll() {
    return request.send("person", "getAll", {}, true)
		.then(response => {
      return response;
    });
  },
  delete(data) {
    return request.send("person", "delete", data, true)
		.then(response => {
      return response;
    });
  },
  addJob(data) {
    return request.send("person", "addJob", data, true)
		.then(response => {
      return response;
    });
  },
  removeJob(data) {
    return request.send("person", "removeJob", {jobId: data}, true)
		.then(response => {
      return response;
    });
  },
  updateJob(data) {
    return request.send("person", "updateJob", data, true)
		.then(response => {
      return response;
    });
  },
  getRecord(data) {
    return request.send("person", "getRecord", data, true)
		.then(response => {
      return response;
    });
  },
  uploadPicture(personId, formData) {
    return request.sendFormData("person", `uploadPicture/${personId}`, formData)
    .then(response => {
      return response;
    });
  },
  removePicture(data){
    return request.send("person", "removePicture", data, true)
    .then(response => {
      return response;
    });
  },
  addRole() {}
};
</script>
