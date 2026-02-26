<template>
  <form>
    <md-card>
      <md-card-header class="md-card-header-text md-card-header-accent">
        <div class="card-text">
          <h4 class="title">Cadastro de companhia</h4>
        </div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Visibilidade</label>
          <div class="md-layout-item">
            <md-field>
              <md-select v-model="company.visible">
                <md-option value="1">Vísivel</md-option>
                <md-option value="0">Não vísivel</md-option>
              </md-select>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('name')">Nome inválido</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Nome</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="company.name" name="name" type="text" v-validate="'required'"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('name')">Nome inválido</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Nomes alternativos</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="company.otherNames" name="otherNames" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Nacionalidade</label>
          <div class="md-layout-item">
            <md-field>
              <md-select v-model="company.nationalityId" type="text">
                <md-option
                  v-for="nationality in nationalities"
                  :value="nationality.id"
                >{{nationality.name}}</md-option>
              </md-select>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Data de fundação</label>
          <div class="md-layout-item">
            <md-field>
              <md-input
                v-model="company.foundationDate"
                name="foundationDate"
                v-mask="['##/##/####']"
                v-validate="'date_format:DD/MM/YYYY'"
              ></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('foundationDate')">Data inválida</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Local de fundação</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="company.foundationPlace" name="foundationPlace" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Data de dissolução</label>
          <div class="md-layout-item">
            <md-field>
              <md-input
                v-model="company.dissolutionDate"
                name="dissolutionDate"
                v-mask="['##/##/####']"
                v-validate="'date_format:DD/MM/YYYY'"
              ></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('dissolutionDate')">Data inválida</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Trajetória</label>
          <div class="md-layout-item">
            <md-field>
              <md-textarea v-model="company.path" name="path" type="text"></md-textarea>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Notas</label>
          <div class="md-layout-item">
            <md-field>
              <md-textarea v-model="company.notes" name="notes" type="text"></md-textarea>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Bibliografia</label>
          <div class="md-layout-item">
            <md-field>
              <md-textarea v-model="company.bibliography" name="bibliography" type="text"></md-textarea>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Citações</label>
          <div class="md-layout-item">
            <md-field>
              <md-textarea v-model="company.citation" name="citation" type="text"></md-textarea>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>
      </md-card-content>
      <md-card-actions class="text-center">
        <md-button
          native-type="submit"
          @click.native.prevent="validateAndSubmit"
          class="md-accent"
        >Enviar</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>



<script>
import { SlideYDownTransition } from "vue2-transitions";
import swal from "sweetalert2";
import CompanyAPI from "@/api/Company.vue";
import ListsAPI from "@/api/Lists.vue";

export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      company: {
        name: "",
        otherNames: "",
        nationalityId: null,
        foundationDate: null,
        foundationPlace: "",
        dissolutionDate: null,
        path: "",
        notes: "",
        bibliography: "",
        citation: "",
        visible: null
      },
      nationalities: []
    };
  },
  mounted() {
    ListsAPI.getEntries({ listName: "Nationality" })
      .then(response => {
        this.nationalities = response.entries;
        this.nationalities.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    validateAndSubmit() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.createCompany();
        } else this.showFailSwal("Preencha os campos obrigatórios.");
      });
    },
    createCompany() {
      return CompanyAPI.create(this.getCompany())
        .then(response => {
          this.showSuccessSwal("Companhia cadastrada com sucesso.", true);
        })
        .catch(error => {
          console.error(error);
          this.showFailSwal("Não foi possível cadastrar essa companhia.");
        });
    },
    getCompany() {
      let data = {
        name: this.company.name,
        otherNames: this.company.otherNames,
        nationalityId: this.company.nationalityId,
        foundationPlace: this.company.foundationPlace,
        path: this.company.path,
        notes: this.company.notes,
        bibliography: this.company.bibliography,
        citation: this.company.citation,
        dissolutionDate: reverseDate(this.company.dissolutionDate),
        foundationDate: reverseDate(this.company.foundationDate),
        visible: this.company.visible
      };
      return data;
    },
    showFailSwal(message = "Houve uma falha no servidor.") {
      swal({
        title: "Erro",
        text: message,
        type: "error",
        confirmButtonClass: "md-button md-danger",
        buttonsStyling: false,
        animation: false
      });
    },
    showSuccessSwal(text = "O registro foi criado.", redirect = false) {
      swal({
        title: "Sucesso",
        text: text,
        type: "success",
        confirmButtonClass: "md-button md-success",
        buttonsStyling: false,
        animation: false
      }).then(result => {
        if (redirect) {
          this.$router.push("/companhias");
        }
      });
    }
  }
};

let reverseDate = function(date) {
  if (date !== null && date !== "" && date !== undefined) {
    return date
      .split("/")
      .reverse()
      .join("-");
  }
  return null;
};
</script>

<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}

.text-center {
  justify-content: center !important;
}
</style>