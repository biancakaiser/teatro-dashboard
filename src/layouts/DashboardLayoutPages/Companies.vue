<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-accent">
          <div class="card-icon">
            <md-icon>group</md-icon>
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

              <md-button class="md-accent" style="margin-top: -25px;" @click="createCompany">Adicionar Companhia</md-button>

              <md-field>
                <md-input
                  type="search"
                  class="mb-3"
                  clearable
                  style="width: 280px"
                  placeholder="Busca por nomes ou IDs"
                  v-model="searchQuery">
                </md-input>
              </md-field>

            </md-table-toolbar>
           
            <md-table-row slot="md-table-row" slot-scope="{ item }" @click="openCompany(item)" style="cursor: pointer">
              <md-table-cell md-label="Nome" md-sort-by="name" >{{ item.name }}</md-table-cell>
              <md-table-cell md-label="Nomes alternativos" md-sort-by="otherNames">{{ item.otherNames }}</md-table-cell>
              <md-table-cell md-label="ID da companhia" md-sort-by="id">{{ item.id }}</md-table-cell>
              <!-- <md-table-cell md-label="Data de fundação" md-sort-by="foundationDate">{{ item.foundationDate|formatDatetime }}</md-table-cell> -->

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
import CompanyAPI from "@/api/Company.vue";
import { Circle4 } from "vue-loading-spinner";

export default {
  components: {
    Modal,
    Pagination,
    Circle4,
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
      propsToSearch: ["name", "otherNames", "id"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
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
    loadCompanies() {
      CompanyAPI.getAll()
        .then(data => {
          this.tableData = data.companys;
          this.fuseSearch = new Fuse(this.tableData, {
            keys: ["name", "otherNames"],
            threshold: 0.3
          });
          this.hideModal();
          this.removeEvent();
        })
        .catch(error => {
          this.hideModal();
          this.removeEvent();
          console.log(error);
        });
    },
    openCompany: function(company) {
      // this.$router.push(`/companhia/${company.id}`);
      let routeData = this.$router.resolve(`/companhia/${company.id}`);
      window.open(routeData.href, '_blank');
    },
    createCompany() {
      this.$router.push(`/novo/companhia`);
    }
  },
  mounted() {
    this.loadCompanies();
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
</style>
