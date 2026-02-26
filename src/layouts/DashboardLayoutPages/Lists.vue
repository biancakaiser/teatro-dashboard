<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-accent">
          <div class="card-icon">
            <md-icon>format_list_bulleted</md-icon>
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

              <md-field>
                <md-input
                  type="search"
                  class="mb-3"
                  clearable
                  style="width: 280px"
                  placeholder="Busca por nome"
                  v-model="searchQuery">
                </md-input>
              </md-field>

            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }" >
              <md-table-cell md-label="Nome" md-sort-by="name">{{item.name}}</md-table-cell>


							<md-table-cell md-label="Adicionar item" >
                <md-button @click="showAddModal(item)"
                  class="md-just-icon md-primary md-simple">
                  <md-icon>note_add</md-icon>
                </md-button>

              </md-table-cell>

							<md-table-cell md-label="Visualizar itens">
                <md-button @click="openList(item)"
                  class="md-just-icon md-primary md-simple">
                  <md-icon>description</md-icon>
                </md-button>
              </md-table-cell>
							<md-table-cell>    </md-table-cell>


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


      <modal v-if="addModal" @close="addModalHide">
        <template slot="header">
          <h4 class="modal-title">Adicionar item</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="addModalHide">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
					<md-field>
            <label>Nova entrada</label>
            <md-input v-model="newEntrie.name" name='name' v-validate="'required'"></md-input>
          </md-field>
					<label class="md-layout-item md-size-20 md-label-on-right">
						<code v-if="errors.has('name')"></code>
					</label>
        </template>

        <template slot="footer">
          <md-button class="md-accent" @click="validate">Adicionar</md-button>
        </template>
      </modal>

    </div>
  </div>

</template>

<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import { Pagination, Modal } from "@/components";
import Fuse from "fuse.js";
import swal from "sweetalert2";
import ListsAPI from "@/api/Lists"


export default {
  components: {
    Modal,
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
      propsToSearch: ["name"],
      tableData: [],
      searchedData: [],
			fuseSearch: null,
			newEntrie:{
				listName: "",
				name: ""
			},
			addModal: false,
			lists: [ {
				name: 'Gênero',
				val: 'Genre'
				},
				{
				name: 'Função',
				val: 'Role'
				},
				{
				name: 'Nacionalidade',
				val: 'Nationality'
				},
				{
				name: 'Idioma',
				val: 'Language'
				}]
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
		addModalHide() {
      this.addModal = false;
    },
    showAddModal(item) {
      this.addModal = true;
      this.newEntrie.listName = item.val;
		},
		addEntrie(){
			ListsAPI.addEntrie(this.newEntrie)
        .then(response => {
          this.showSuccessSwal("Item adicionado com sucesso.");
        }).catch(response => {
          // eslint-disable-next-line no-console
          console.error(response)
          this.showFailSwal();
        })
		},
		openList: function(list) {
      // this.$router.push(`/lista/${list.val}`);
      let routeData = this.$router.resolve(`/lista/${list.val}`);
      window.open(routeData.href, '_blank');
    },
    validate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.addEntrie();
        } else {
          this.showFailSwal("Preencha todos os campos.");
        }
      });
    },
    populatePage() {
			this.tableData = this.lists;
			this.fuseSearch = new Fuse(this.tableData, {
          keys: ["name"],
          threshold: 0.3
        });
		},
    showSuccessSwal(message = "Sua requisição foi enviada.", reload = false) {
      this.addModalHide();
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
      this.addModalHide();
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
