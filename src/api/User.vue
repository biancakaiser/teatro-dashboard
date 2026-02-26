<script>
	import request from './request.vue';
	import session from './session.vue';

export default {

  getInfo: function() {
    return request.send("user", "getInfo", {}, true)
      .then(response => {
          return response;
      });
	},
	create(data){
		return request.send("user", "signup", data)
      .then(response => {
        return response;
    });
	},
  login (data) {
    return request.send("user", "login", data)
      .then(response => {
        session.setSessionData(response);
        return response;
    });
  },
  logout() {
    session.clear();
    return request.send("user", "logout", {}, true)
	},
	update(data){
		return request.send("user", "updateInfo", data, true)
      .then(response => {
        return response;
    });
	},
	changePassword(data){
		return request.send("user", "changePassword", data, true)
      .then(response => {
        return response;
    });
	},
	delete(data){
		return request.send("user", "exclude", data, true)
      .then(response => {
        return response;
    });
	},
	getAll(){
		return request.send("user", "findAll", {}, true)
      .then(response => {
        return response;
    });
	}

};
</script>