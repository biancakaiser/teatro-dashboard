<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-accent">
          <div class="card-icon">
            <md-icon>build</md-icon>
          </div>
          <!-- <h4 class="title">Empresas cadastradas</h4> -->
        </md-card-header>
        <md-card-content>
          <md-table :value="queriedData" :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder" :md-sort-fn="customSort" class="paginated-table table-striped table-hover">
            <md-table-toolbar>
              <md-field>
                <label for="pages">Por página</label>
                <md-select v-model="pagination.perPage" name="pages">
                  <md-option
                    v-for="item in pagination.perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item">
                    {{ item }}
                  </md-option>
                </md-select>
              </md-field>

              <md-button class="md-accent" style="margin-top: -25px;" @click="addUserModal = true">Adicionar administrador</md-button>

              <md-field>
                <md-input
                  type="search"
                  class="mb-3"
                  clearable
                  style="width: 280px"
                  placeholder="Busca por nome ou e-mail"
                  v-model="searchQuery">
                </md-input>
              </md-field>

            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }" >
              <md-table-cell md-label="Nome" md-sort-by="name" >{{ item.firstName + " " + item.lastName}}</md-table-cell>
              <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
             <md-table-cell md-label="Alterar senha">
                <md-button
                  class="md-just-icon md-info md-simple"
                  @click.native="showChangePasswordModal(item)">
                  <md-icon>edit</md-icon>
                </md-button>
              </md-table-cell>

              <md-table-cell md-label="Alterar Dados">
                <md-button
                  class="md-just-icon md-info md-simple"
                  @click.native="showChangeDataModal(item)">
                  <md-icon>description</md-icon>
                </md-button>
              </md-table-cell>

              <md-table-cell md-label="Excluir">
								<md-button class="md-just-icon md-danger md-simple" @click.native="deleteUser(item)">
									<md-icon>delete</md-icon>
								</md-button>
							</md-table-cell>
            </md-table-row>
          </md-table>
          
          
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          <div class="">
            <p class="card-category">Mostrando {{from + 1}} a {{to}} de {{total}}</p>
          </div>
          <pagination class="pagination-no-border pagination-accent"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="total">
          </pagination>
        </md-card-actions>
      </md-card>


      <modal v-if="addUserModal" @close="addUserModalHide">
        <template slot="header">
          <h4 class="modal-title">Adicionar administrador</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="addUserModalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item mx-auto md-size-40">
              <label>Nome</label>
              <md-input v-model="admin.firstName" v-validate="'alpha_spaces|required|min:2'" ></md-input>
            </md-field>
            
            <md-field class="md-layout-item mx-auto md-size-40">
              <label>Sobrenome</label>
              <md-input v-model="admin.lastName" v-validate="'alpha_spaces|required|min:2'"></md-input>
            </md-field>
          </div>

          <div class="md-layout">
            <md-field class="md-layout-item mx-auto md-size-40">
              <label>CPF</label>
              <md-input v-model="admin.cpf" v-mask="['###.###.###-##']" v-validate="'length:14|required'"></md-input>
            </md-field>
            <md-field class="md-layout-item mx-auto md-size-40">
              <label>Data de nascimento</label>
              <md-input v-model="admin.dob" v-mask="['##/##/####']" v-validate="'length:10|required'"></md-input>
              <span class="md-helper-text">Formato dd/mm/aaaa</span>
            </md-field>
          </div>
          

          <div class="md-layout">
            <md-field class="md-layout-item mx-auto md-size-40">
              <label>Email</label>
              <md-input v-model="admin.email" type="email" v-validate="'email|required'"></md-input>
            </md-field>
            <md-field class="md-layout-item mx-auto md-size-40">
              <label>Senha</label>
              <md-input v-model="admin.password" type="password" v-validate="'min:6|required'"></md-input>
                <span class="md-helper-text">Minimo 6 caracteres</span>
            </md-field>
          </div>
        </template>

        <template slot="footer">
          <md-button class="md-accent" @click="validate">Enviar</md-button>
        </template>
      </modal>

       <modal v-if="changeDataModal" @close="changeDataModalHide">
        <template slot="header">
          <h4 class="modal-title">Alterar dados</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="changeDataModalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item mx-auto md-size-40">
              <label>Nome</label>
              <md-input v-model="adminUpdate.firstName" v-validate="'alpha_spaces|required|min:2'" ></md-input>
            </md-field>
            
            <md-field class="md-layout-item mx-auto md-size-40">
              <label>Sobrenome</label>
              <md-input v-model="adminUpdate.lastName" v-validate="'alpha_spaces|required|min:2'"></md-input>
            </md-field>
          </div>

          <div class="md-layout">
            <md-field class="md-layout-item mx-auto md-size-40">
              <label>CPF</label>
              <md-input v-model="adminUpdate.cpf" v-mask="['###.###.###-##']" v-validate="'length:14|required'"></md-input>
            </md-field>
            <md-field class="md-layout-item mx-auto md-size-40">
              <label>Data de nascimento</label>
              <md-input v-model="adminUpdate.dob" v-mask="['##/##/####']" v-validate="'length:10|required'"></md-input>
              <span class="md-helper-text">Formato dd/mm/aaaa</span>
            </md-field>
          </div>
        
        </template>

        <template slot="footer">
          <md-button class="md-accent" @click="updateUser">Atualizar</md-button>
        </template>
      </modal>


      <modal v-if="changePasswordModal" @close="changePasswordModalHide">
        <template slot="header">
          <h4 class="modal-title">Alterar senha</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="changePasswordModalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <md-field>
            <label>Senha atual</label>
            <md-input v-model="currentPassword" type="password"></md-input>
          </md-field>
          <md-field>
            <label>Nova senha</label>
            <md-input v-model="newPassword" v-validate="'min:6|required'" type="password"></md-input>
             <span class="md-helper-text">Minimo 6 caracteres</span>
          </md-field>
        </template>

        <template slot="footer">
          <md-button class="md-accent" @click="changePassword">Atualizar</md-button>
        </template>
      </modal>

    </div>

    <div  v-if="modal" class="modal" id="modal-1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
		 aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div>
					<div class="modal-body-spinner">						
						<circle4 id="spinner-circle"></circle4>	
					</div>
				</div>
			</div>
		</div>

  </div>

</template>

<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import { Pagination, Modal } from "@/components";
import Fuse from "fuse.js";
import swal from "sweetalert2";
import UserAPI from "@/api/User.vue";
import dummyData from "./dummyData.js";
import { Circle4 } from "vue-loading-spinner";

export default {
  components: {
    Modal,
    Circle4,
    Pagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      currentSort: "sentTime",
      currentSortOrder: "asc",
      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["name", "email"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      addUserModal: false,
      admin: {
        firstName: "",
        lastName: "",
        cpf: "",
        dob: "",
        password: "",
        email: ""
      },
      adminUpdate: {
        firstName: "",
        lastName: "",
        cpf: "",
        dob: "",
        userId: ""
      },
      delete: false,
      currentPassword: "",
      newPassword: "",
      userId: "",
      changePasswordModal: false,
      changeDataModal: false,
      modal:false
    };
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  methods: {
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    addUserModalHide() {
      this.addUserModal = false;
    },
    changePasswordModalHide() {
      this.changePasswordModal = false;
    },
    changeDataModalHide() {
      this.changeDataModal = false;
    },
    showChangePasswordModal(item) {
      this.changePasswordModal = true;
      this.userId = item.id;
    },
    showChangeDataModal(item) {
      this.changeDataModal = true;
      this.adminUpdate.dob = formatDate(item.dob);
      this.adminUpdate.cpf = item.cpf;
      this.adminUpdate.firstName = item.firstName;
      this.adminUpdate.lastName = item.lastName;
      this.adminUpdate.userId = item.id;
    },
    validate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.createUser();
        } else {
          this.showFailSwal("Preencha todos os campos");
        }
      });
    },
    createUser() {
      this.admin.dob = reverseDate(this.admin.dob);
      UserAPI.create(this.admin)
        .then(success => {
          if (success) {
            this.showSuccessSwal("Administrador cadastrado com sucesso.", true);
          } else {
            this.addUserModalHide();
            this.showFailSwal();
          }
        })
        .catch(error => {
          console.log(error);
          this.showFailSwal();
        });
    },
    deleteUser(user) {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          UserAPI.delete({ userId: user.id })
            .then(response => {
              this.showSuccessSwal("Administrador excluído com sucesso.");
              this.populatePage();
            })
            .catch(response => {
              this.showFailSwal("Não foi possível excluir esse administrador.");
              console.log(response.error);
            });
        }
      });
    },
    updateUser() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.adminUpdate.dob = reverseDate(this.adminUpdate.dob);
          UserAPI.update(this.adminUpdate)
            .then(response => {
              this.showSuccessSwal("Dados atualizados com sucesso.");
              this.populatePage();
            })
            .catch(error => {
              this.showFailSwal("Não foi possível atualizar os dados.");
              console.log(error);
            });
        } else {
          this.changeDataModalHide();
          this.showFailSwal("Preencha todos os campos");
        }
      });
    },
    changePassword() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          UserAPI.changePassword({
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            userId: this.userId
          })
            .then(success => {
              if (success) {
                this.showSuccessSwal("Senha alterada com sucesso.");
              } else {
                this.changePasswordModalHide();
                this.showFailSwal("Não foi possível atualizar essa senha.");
              }
            })
            .catch(error => {
              console.log(error);
              this.changePasswordModalHide();
              this.showFailSwal();
            });
        } else {
          this.changePasswordModalHide();
          this.showFailSwal("Preencha todos os campos.");
        }
      });
    },
    showModal() {
      this.modal = true;
    },
    hideModal() {
      this.modal = false;
    },
    blockClick() {
      document.addEventListener("click", handler, true);
    },
    removeEvent() {
      document.removeEventListener("click", handler, true);
    },
    populatePage() {
      UserAPI.getAll().then(response => {
        this.tableData = response.users;
        this.fuseSearch = new Fuse(this.tableData, {
          keys: ["name", "email"],
          threshold: 0.3
        });
        this.hideModal();
        this.removeEvent();
      });
    },
    showSuccessSwal(message = "Sua requisição foi enviada.", reload = false) {
      this.addUserModalHide();
      this.changePasswordModalHide();
      this.changeDataModalHide();
      swal({
        title: "Sucesso",
        text: message,
        type: "success",
        confirmButtonClass: "md-button md-success",
        buttonsStyling: false,
        animation: false
      }).then(result => {
        if (reload) {
          document.location.reload(true);
        }
      });
    },
    showFailSwal(message = "Houve uma falha no servidor.") {
      this.addUserModalHide();
      swal({
        title: "Erro",
        text: message,
        type: "error",
        confirmButtonClass: "md-button md-danger",
        buttonsStyling: false,
        animation: false
      });
    },
    showConfirmationSwal(
      text1 = "Tem certeza?",
      text2 = "Não é possível reverter a operação!"
    ) {
      return swal({
        title: text1,
        text: text2,
        type: "warning",
        animation: false,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        confirmButtonClass: "md-button md-success",
        cancelButtonClass: "md-button md-danger",
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          this.delete = true;
        }
      });
    }
  },
  mounted() {
    this.populatePage();
    this.showModal();
    this.blockClick();
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    }
  }
};

let reverseDate = function(date) {
  if (date !== null && date !== "") {
    return date
      .split("/")
      .reverse()
      .join("-");
  }
  return null;
};

let formatDate = function(date) {
  if (date === null) return null;
  return date
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("/");
};

function handler(e){
    e.stopPropagation();
    e.preventDefault();
}
</script>

<style lang="css">
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}

.paginated-table .md-table-head.md-sortable .md-table-sortable-icon {
  display: none;
}
</style>
