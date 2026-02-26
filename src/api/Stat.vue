<script>
	import request from './request.vue';

	export default {
		send: async function (anonymous, professionalPositionId, orderSubjectId, companyId, location, locationDetail, description, supervisorAwareness, witnesses, personFullName, personGender, personState, personCity, personPhone, personEmail) {
			let response = await request.send("order", "send", {
				anonymous: anonymous,
				professionalPositionId: professionalPositionId,
				orderSubjectId: orderSubjectId,
				companyId: companyId,
				location: location,
				locationDetail: locationDetail,
				description: description,
				supervisorAwareness: supervisorAwareness,
				witnesses: witnesses,
				personFullName: personFullName,
				personGender: personGender,
				personState: personState,
				personCity: personCity,
				personPhone: personPhone,
				personEmail: personEmail
			}, true);
			return response;
		},
		find: async function (companyId, status) {
			let response = await request.send("order", "find", {
				companyId: companyId,
				status: status
			}, true);
			return response.orders;
		},
		getByProtocolNumber: async function (protocolNumber) {
			let response = await request.send("order", "getByProtocolNumber", {
				protocolNumber: protocolNumber,
			}, true);
			return response.order;
		},
		getOptions: async function (companyUrlCode) {
			let response = await request.send("order", "getOptions", {
				companyUrlCode: companyUrlCode,
			}, true);
			return response;
		},
		getStats: async function (companyId) {
			let response = await request.send("order", "getStats", {
				companyId: companyId
			}, true);
			return response;
		},
		respond: async function (orderId, responseText) {
			let response = await request.send("order", "respond", {
				orderId: orderId,
				response: responseText
			}, true);
			return response.success;
		}
	}
</script>