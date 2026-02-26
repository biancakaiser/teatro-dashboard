<template>
  <form>
    <md-card>
      <md-card-header class="md-card-header-text md-card-header-accent">
        <div class="card-text">
          <h4 class="title">Cadastro de teatro</h4>
        </div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Nome</label>
          <div class="md-layout-item">
            <md-field s>
              <md-input v-model="name" name="name" type="text" v-validate="'required'"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('name')">Nome inválido</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Outros nomes</label>
          <div class="md-layout-item">
            <md-field s>
              <md-input v-model="otherNames"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Endereço original</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="foundationAddress" name="foundationAddress" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Data de fundação</label>
          <div class="md-layout-item">
            <md-field>
              <md-input
                v-model="foundationDate"
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
          <label class="md-layout-item md-size-20 md-form-label">Bairro</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="neighborhood" name="neighborhood" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Endereço atualizado</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="currentAddress" name="currentAddress" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Data de fechamento</label>
          <div class="md-layout-item">
            <md-field>
              <md-input
                v-model="dissolutionDate"
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
          <label class="md-layout-item md-size-20 md-form-label">Razão para o fechamento</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="dissolutionReason" name="dissolutionReason" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Lotação</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="seatsNumber" name="seatsNumber" type="text" v-validate="'numeric'"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('seatsNumber')">Número inválido</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Tipo de espetáculo</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="kind" name="kind" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Trajetória</label>
          <div class="md-layout-item">
            <md-field s>
              <md-input v-model="history"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Notas</label>
          <div class="md-layout-item">
            <md-field s>
              <md-input v-model="notes"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Bibliografia</label>
          <div class="md-layout-item">
            <md-field s>
              <md-input v-model="bibliography"></md-input>
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
import TheaterAPI from "@/api/Theater.vue";

export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      name: "",
      foundationAddress: "",
      foundationDate: null,
      neighborhood: "",
      currentAddress: "",
      dissolutionDate: null,
      dissolutionReason: "",
      seatsNumber: null,
      kind: "",
      history: "",
      otherNames: "",
      bibliography: "",
      notes: ""
    };
  },
  created() {
    // this.setClient(dummyData.users[0]);
  },
  methods: {
    validateAndSubmit() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.createTheater();
        } else this.showFailSwal("Preencha os campos obrigatórios.");
      });
    },
    createTheater() {
      return TheaterAPI.create(this.getTheater())
        .then(response => {
          this.showSuccessSwal("Teatro cadastrado com sucesso.", true);
        })
        .catch(error => {
          if (error.message === "CANCELLED") {
            swal({
              title: "Cancelado",
              text: "O registro foi cancelado",
              type: "error",
              confirmButtonClass: "md-button md-info",
              buttonsStyling: false,
              animation: false
            });
          } else {
            console.error(error);
            this.showFailSwal("Não foi possível cadastrar esse teatro.");
          }
        });
    },
    getTheater() {
      let data = {
        name: this.name,
        foundationAddress: this.foundationAddress,
        neighborhood: this.neighborhood,
        currentAddress: this.currentAddress,
        dissolutionReason: this.dissolutionReason,
        seatsNumber: this.seatsNumber,
        dissolutionDate: reverseDate(this.dissolutionDate),
        foundationDate: reverseDate(this.foundationDate),
        kind: this.kind,
        bibliography: this.bibliography,
        otherNames: this.otherNames,
        notes: this.notes,
        history: this.history
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
          this.$router.push("/teatros");
        }
      });
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
</script>


<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}

.text-center {
  justify-content: center !important;
}
</style>