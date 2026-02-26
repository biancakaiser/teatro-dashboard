<script>
	const sessionItems = [
		"token",
		"firstName",
		"lastName",
		"role",
		"email"
	];

	export default {
		setSessionData: (sessionData) => {
			sessionItems.forEach(sessionItem => {
				localStorage.setItem(sessionItem, sessionData[sessionItem]);
			});
			return true;
		},
		isActive: () => {
			let token = localStorage.getItem("token");
			if (token) {
				return true;
			}
			return false;
		},
		clear: () => {
			localStorage.clear();
			return true;
		},
		getItem: (sessionItem) => {
			if (sessionItems.includes(sessionItem)) {
				return localStorage.getItem(sessionItem);
			}
			throw Error("ERR_INVALID_SESSION_ITEM");
		},
		setItem: (sessionItem, value) => {
			if (sessionItems.has(sessionItem)) {
				localStorage.setItem(sessionItem, value);
				return;
			}
			throw Error("ERR_INVALID_SESSION_ITEM");
		}
	}
</script>