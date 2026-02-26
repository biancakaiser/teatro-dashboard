<script>
import request from "./request.vue";

export default {
  create(data) {
    return request.send("company", "create", data, true)
    .then(response => {
      return response;
    });
  },
  update(data) {
     return request.send("company", "update", data, true)
    .then(response => {
      return response;
    });
  },
  getInfo(data) {
     return request.send("company", "getInfo", data, true)
    .then(response => {
      return response;
    });
  },
  getAll(){
    return request.send("company", "getAll", {}, true)
    .then(response => {
      return response;
    });
  },
  delete(data){
    return request.send("company", "delete", data, true)
    .then(response => {
      return response;
    });
  },
  getRecord(data){
    return request.send("company", "getRecord", data, true)
    .then(response => {
      return response;
    });    
  },
  uploadPicture(companyId, formData) {
    return request.sendFormData("company", `uploadPicture/${companyId}`, formData)
    .then(response => {
      return response;
    });
  },
  removePicture(data){
    return request.send("company", "removePicture", data, true)
    .then(response => {
      return response;
    });
  },
};
</script>