<script>
import request from './request.vue';

export default {

  getInfo(id) {
      return request.send("page", "getInfo", { pageId: id } , true)
      .then(response => {
          return response;
      });
  },
  create(data){
    return request.send("page", "create", data, true)
      .then(response => {
        return response;
    });
  },
  update(data){
    return request.send("page", "update", data, true)
      .then(response => {
        return response;
    });
  },
  delete(id) {
    return request.send("page", "delete", { pageId: id }, true)
      .then(response => {
        return response;
    });
  },
  getAll(){
    return request.send("page", "findAll", {}, true)
      .then(response => {
        return response;
    });
  },
  uploadImage(formData) {
    return request.sendFormData("page", "uploadImage", formData)
      .then(response => {
        return response;
    })
  }

};
</script>
