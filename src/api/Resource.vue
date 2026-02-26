<script>
import request from "./request.vue";

export default {
  /**
 * @api {post} /resource/updateInfo Atualiza informações de um arquivo
 * @apiVersion 1.0.0
 * @apiName updateInfo
 * @apiGroup Resource
 * @apiPermission admin
 *
 * @apiParam {String} token Token de acesso do usuário
 * @apiParam {String} description Descrição
 * @apiParam {String} origin Fonte
 *
 * @apiSuccess {Bool} success
 */
	updateInfo(data) {
		return request.send("resource", "updateInfo", data, true)
		.then(response => {
      return response;
    });
  }
};
</script>