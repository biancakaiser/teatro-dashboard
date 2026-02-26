<script>
import request from "./request.vue";

export default {
  getEntries(data) {
    return request.send("lists", "getEntries", data, true)
    .then(response => {
      return response;
    });
  },
  addEntrie(data) {
    return request.send("lists", "add", data, true)
    .then(response => {
      return response;
    });
  },
  updateEntrie(data) {
    return request.send("lists", "update", data, true)
    .then(response => {
      return response;
    });
  },
  deleteEntrie(data) {
    return request.send("lists", "delete", data, true)
    .then(response => {
      return response;
    });
  }
};
</script>