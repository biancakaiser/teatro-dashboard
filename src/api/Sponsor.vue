<script>
import request from "./request.vue";

export default {
  uploadPicture(formData) {
    return request.sendFormData("lists", "uploadSponsorPicture", formData)
    .then(response => {
      return response;
    });
  },
  update(data) {
    return request.send("lists", "updateSponsor", data, true)
    .then(response => {
      return response;
    });
  },
  list(data) {
    return request.send("lists", "listSponsors", data, true)
    .then(response => {
      return response;
    });
  },
  delete(id) {
    return request.send("lists", `deleteSponsor/${id}`, {}, true)
    .then(response => {
      return response;
    });
  }
};
</script>
