<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>''
        <md-card-header class="md-card-header-icon md-card-header-accent">
          <div class="card-icon">
            <md-icon>newspaper</md-icon>
          </div>
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

              <md-button class="md-accent" style="margin-top: -25px;" @click="handleNewPage">Adicionar página</md-button>

              <md-field>
                <md-input
                  type="search"
                  class="mb-3"
                  clearable
                  style="width: 280px"
                  placeholder="Busca por título"
                  v-model="searchQuery">
                </md-input>
              </md-field>

            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }" >
              <md-table-cell md-label="Titulo" md-sort-by="title" >{{ item.title }}</md-table-cell>
              <md-table-cell md-label="Descrição" md-sort-by="description" >{{ item.description }}</md-table-cell>
              <md-table-cell md-label="Data de criação" md-sort-by="creationDate" >{{ formatDate(item.creationDate) }}</md-table-cell>
             <md-table-cell md-label="Alterar">
                <md-button
                  class="md-just-icon md-info md-simple"
                  @click.native="editPage(item)">
                  <md-icon>edit</md-icon>
                </md-button>
              </md-table-cell>

              <md-table-cell md-label="Excluir">
								<md-button class="md-just-icon md-danger md-simple" @click.native="deletePage(item)">
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
import PageAPI from "@/api/Page.vue";
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
      currentSort: "creationDate",
      currentSortOrder: "asc",
      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["title", "description"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      pageId: "",
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
    handleNewPage() {
      this.$router.push("/pagina/new");
    },
    formatDate(date) {
      if ((date === "") | (date === null)) return null;
      return date
        .substring(0, 10)
        .split("-")
        .reverse()
        .join("/");
    },
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    deletePage(page) {
      this.showConfirmation().then(() => {
        if (this.delete) {
          this.delete = false;
          PageAPI.delete(page.id)
            .then(() => {
              this.showSuccess("Página excluída com sucesso.");
              this.populatePage();
            })
            .catch(response => {
              this.showError("Não foi possível excluir essa página.");
              // eslint-disable-next-line no-console
              console.error(response.error);
            });
        }
      });
    },
    editPage(item) {
      this.$router.push(`/pagina/${item.id}`);
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
      PageAPI.getAll().then(response => {
        this.tableData = response.pages;
        this.fuseSearch = new Fuse(this.tableData, {
          keys: ["title", "description"],
          threshold: 0.3
        });
        this.hideModal();
        this.removeEvent();
      });
    },
    showSuccess(message = "Sua requisição foi enviada.", reload = false) {
      swal({
        title: "Sucesso",
        text: message,
        type: "success",
        confirmButtonClass: "md-button md-success",
        buttonsStyling: false,
        animation: false
      }).then(() => {
        if (reload) {
          document.location.reload(true);
        }
      });
    },
    showError(message = "Houve uma falha no servidor.") {
      swal({
        title: "Erro",
        text: message,
        type: "error",
        confirmButtonClass: "md-button md-danger",
        buttonsStyling: false,
        animation: false
      });
    },
    async showConfirmation(
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
    this.showModal();
    this.populatePage();
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
