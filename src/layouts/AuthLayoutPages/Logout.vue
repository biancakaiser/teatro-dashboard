<template>
  <div>logging out</div>
</template>
<script>
	import UserAPI from '@/api/User.vue'
	import session from '@/api/session.vue'

	export default {
    created() {
      UserAPI.logout()
        .catch(error => {
          console.log(error);
        });
      this.$router.push('/login');
    },
	}
</script>

<style>

</style>
