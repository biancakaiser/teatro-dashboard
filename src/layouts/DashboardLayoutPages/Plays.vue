<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-accent">
          <div class="card-icon">
            <md-icon>movie</md-icon>
          </div>
          <!-- <h4 class="title">Produtos cadastradas</h4> -->
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

              <md-button class="md-accent" style="margin-top: -25px;" @click="createPlay">Adicionar peça</md-button>

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

            <md-table-row slot="md-table-row" slot-scope="{ item }" @click="openPlay(item)" style="cursor: pointer">
              <md-table-cell md-label="Título Original" md-sort-by="originalName" >{{ item.name ? item.name : item.originalName }}</md-table-cell>
              <md-table-cell md-label="Gênero" md-sort-by="genre">{{ item.genre }}</md-table-cell>
              <md-table-cell md-label="Idioma" md-sort-by="languageId">{{ item.language }}</md-table-cell>
              <md-table-cell md-label="Primeira exibição em SP" md-sort-by="spFirstDate">{{ item.spFirstDate|formatDatetime}}</md-table-cell>
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
import PlayAPI from "@/api/Play.vue";
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
      propsToSearch: ["name", "neighborhood"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      modal: false
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
    showSuccessSwal(message = "Sua resposta foi enviada.") {
      this.addPlayModalHide();
      swal({
        title: "Sucesso",
        text: message,
        type: "success",
        confirmButtonClass: "md-button md-success",
        buttonsStyling: false,
        animation: false
      });
    },
    showFailSwal(message = "Houve uma falha no servidor.") {
      this.addPlayModallHide();
      swal({
        title: "Erro",
        text: message,
        type: "error",
        confirmButtonClass: "md-button md-danger",
        buttonsStyling: false,
        animation: false
      }).then(_ => (this.addPlayModal = true));
    },
    loadPlays() {
      PlayAPI.getAll().then(response => {
        this.tableData = response.plays;
        this.fuseSearch = new Fuse(this.tableData, {
          keys: ["originalName", "name"],
          threshold: 0.3
        });
        this.hideModal();
        this.removeEvent();
      });
      // this.tableData = dummyData.products;
      // this.fuseSearch = new Fuse(this.tableData, {
      //   keys: ["name", "urlCode"],
      //   threshold: 0.3
      // });

      // return Product.list()
      //   .then(products => {
      //     this.tableData = products;
      //     this.fuseSearch = new Fuse(this.tableData, {keys: ['name', 'urlCode'], threshold: 0.3});
      //   })
      //   .catch(error => console.log(error));
    },
    openPlay: function(play) {
      let routeData = this.$router.resolve(`/peca/${play.id}`);
      window.open(routeData.href, '_blank');
      // this.$router.push(`/peca/${play.id}`);
    },
    createPlay() {
      this.$router.push(`novo/peca`);
    }
  },
  mounted() {
    this.loadPlays();
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

#spinner-circle{
	width: 80px!important;
	height: 80px!important;
  margin-top: 25%!important;
	margin-left: 46.4%!important;
}
</style>
