<script>
import request from "./request.vue";

export default {
  create(data) {
    return request.send("setting", "create", data, true).then(response => {
      return response;
    });
  },
  update(data) {
    return request.send("setting", "update", data, true).then(response => {
      return response;
    });
  },
  delete(data) {
    return request.send("setting", "delete", data, true).then(response => {
      return response;
    });
  },
  addCastMember(data) {
    return request
      .send("setting", "addCastMember", data, true)
      .then(response => {
        return response;
      });
  },
  removeCastMember(data) {
    return request
      .send("setting", "removeCastMember", data, true)
      .then(response => {
        return response;
      });
  },
  addPresentation(data) {
    return request
      .send("setting", "addPresentation", data, true)
      .then(response => {
        return response;
      });
	},
	removePresentation(data) {
    return request
      .send("setting", "removePresentation", data, true)
      .then(response => {
        return response;
      });
  },
  getRecord(data){
    return request
      .send("setting", "getRecord", data, true)
      .then(response => {
        return response;
      });
  },
  getAll(){
    return request
      .send("setting", "getAll", {}, true)
      .then(response => {
        return response;
      });
  }
};
</script>