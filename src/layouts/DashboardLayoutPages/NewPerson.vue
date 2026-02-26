<template>
  <form>
    <md-card>
      <md-card-header class="md-card-header-text md-card-header-accent">
        <div class="card-text">
          <h4 class="title">Cadastro de pessoa</h4>
        </div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Visibilidade</label>
          <div class="md-layout-item">
            <md-field>
              <md-select v-model="person.visible">
                <md-option value="1">Visível</md-option>
                <md-option value="0">Não visível</md-option>
              </md-select>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('visible')"></code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Nome civil</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="person.civilName" name="civilName" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Nome artístico</label>
          <div class="md-layout-item">
            <md-field>
              <md-input
                v-model="person.artistName"
                name="artistName"
                type="text"
                v-validate="'required'"
              ></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('artistName')">Nome inválido</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Gênero</label>
          <div class="md-layout-item">
            <md-field>
              <md-select v-model="person.gender" name="gender" type="text">
                <md-option value="M">Masculino</md-option>
                <md-option value="F">Feminino</md-option>
              </md-select>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Cor</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="person.race" name="race" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('race')">Somente texto</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Especialidade</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="person.expertise"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Nacionalidade</label>
          <div class="md-layout-item">
            <md-field>
              <!-- <md-input v-model="person.nationalityId" name="" type="text">
              // </md-input>-->
              <md-select v-model="person.nationalityId" type="text">
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
          <label class="md-layout-item md-size-20 md-form-label">Data de nascimento</label>
          <div class="md-layout-item">
            <md-field>
              <md-input
                v-model="person.birthDate"
                name="birthDate"
                
              ></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('birthDate')">Data inválida</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Local de nascimento</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="person.birthPlace" name="birthPlace" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Data da morte</label>
          <div class="md-layout-item">
            <md-field>
              <md-input
                v-model="person.deathDate"
                name="deathDate"
               
              ></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('deathDate')">Data inválida</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Local da morte</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="person.deathPlace" name="deathPlace" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Trajetória da vida pessoal</label>
          <div class="md-layout-item">
            <md-field>
              <md-textarea v-model="person.personalPath" name="personalPath" type="text"></md-textarea>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Trajetória da vida profissional</label>
          <div class="md-layout-item">
            <md-field>
              <md-textarea v-model="person.professionalPath" name="professionalPath" type="text"></md-textarea>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Notas</label>
          <div class="md-layout-item">
            <md-field>
              <md-textarea v-model="person.notes" name="notes" type="text"></md-textarea>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Bibliografia</label>
          <div class="md-layout-item">
            <md-field>
              <md-textarea v-model="person.bibliography" name="bibliography" type="text"></md-textarea>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>
        <br>
        <br>
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
import ListsAPI from "@/api/Lists.vue";
import PersonAPI from "@/api/Person.vue";

export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      person: {
        visible: null,
        civilName: "",
        artistName: "",
        gender: "",
        race: "",
        expertise: "",
        nationalityId: null,
        birthDate: null,
        deathDate: null,
        deathPlace: "",
        birthPlace: "",
        personalPath: "",
        professionalPath: "",
        notes: "",
        bibliography: "",
        citation: ""
      },
      nationalities: [],
      roles: []
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

    ListsAPI.getEntries({ listName: "Role" })
      .then(response => {
        this.roles = response.entries;
        this.roles.sort(function(a, b) {
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
          this.createPerson();
        } else {
          this.showFailSwal("Preencha os campos obrigatórios.");
        }
      });
    },
    getPerson() {
      let data = {
        visible: this.person.visible,
        civilName: this.person.civilName,
        artistName: this.person.artistName,
        gender: this.person.gender,
        race: this.person.race,
        expertise: this.person.expertise,
        nationalityId: this.person.nationalityId,
        deathPlace: this.person.deathPlace,
        birthPlace: this.person.birthPlace,
        personalPath: this.person.personalPath,
        professionalPath: this.person.professionalPath,
        notes: this.person.notes,
        bibliography: this.person.bibliography,
        citation: this.person.citation,
        birthDate: reverseDate(this.person.birthDate),
        deathDate: reverseDate(this.person.deathDate)
      };

      return data;
    },
    createPerson() {
      return PersonAPI.create(this.getPerson())
        .then(response => {
          this.showSuccessSwal("Pessoa cadastrada com sucesso", true);
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
            this.showFailSwal("Não foi possível cadastrar essa pessoa.");
          }
        });
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
          this.$router.push("/pessoas");
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