<template>
  <form>
    <md-card>
      <md-card-header class="md-card-header-text md-card-header-accent">
        <div class="card-text">
          <h4 class="title">Cadastro de peça</h4>
        </div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Visibilidade</label>
          <div class="md-layout-item">
            <md-field>
              <md-select v-model="play.visible">
                <md-option value="1">Vísivel</md-option>
                <md-option value="0">Não vísivel</md-option>
              </md-select>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">

          </label>
        </div>

				<div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Título da peça</label>
          <div class="md-layout-item">
            <md-field>
              <md-input
                v-model="play.name"
                name="name"
                type="text"
                v-validate="'required'"
              ></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('name')">Nome inválido</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Título Original</label>
          <div class="md-layout-item">
            <md-field>
              <md-input
                v-model="play.originalName"
                name="originalName"
                type="text"

              ></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <!-- <code v-if="errors.has('originalName')">Nome inválido</code> -->
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Obra de referência</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="play.referencePlay" name="referencePlay" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Primeira exibição mundial</label>
          <div class="md-layout-item">
            <md-field>
              <md-input
                v-model="play.globalFirstDate"
                name="globalFirstDate"


              ></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('globalFirstDate')">Data inválida</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Primeira exibição em São Paulo</label>
          <div class="md-layout-item">
            <md-field>
              <md-input
                v-model="play.spFirstDate"
                name="spFirstDate"
                type="text"


              ></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right">
            <code v-if="errors.has('spFirstDate')">Data inválida</code>
          </label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Trajetória</label>
          <div class="md-layout-item">
            <md-field>
              <md-textarea v-model="play.pressReleases" name="pressReleases" type="text"></md-textarea>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Críticas na imprensa</label>
          <div class="md-layout-item">
            <md-field>
              <md-textarea v-model="play.pressReviews" name="pressReviews" type="text"></md-textarea>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Bibliografia</label>
          <div class="md-layout-item">
            <md-field>
              <md-textarea v-model="play.bibliography" name="bibliography" type="text"></md-textarea>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Fontes primárias</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="play.source" name="source" type="text"></md-input>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Nacionalidade</label>
          <div class="md-layout-item">
            <md-field>
              <md-select v-model="play.nationalityId" type="text">
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
          <label class="md-layout-item md-size-20 md-form-label">Gênero</label>
          <div class="md-layout-item">
            <md-field>
              <md-select v-model="play.genreId" type="text">
                <md-option v-for="genre in genres" :value="genre.id">{{genre.name}}</md-option>
              </md-select>
            </md-field>
          </div>
          <label class="md-layout-item md-size-20 md-label-on-right"></label>
        </div>
        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">Autor do texto</label>
          <div class="md-layout-item">
            <md-field>
              <md-select v-model="play.authorId" name="person">
                <md-option v-for="person in people" :value="person.id">{{person.artistName}}</md-option>
              </md-select>
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
import PlayAPI from "@/api/Play.vue";
import ListsAPI from "@/api/Lists.vue";
import PersonAPI from "@/api/Person.vue";

export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      play: {
        originalName: "",
        globalFirstDate: null,
        spFirstDate: null,
        pressReleases: "",
        pressReviews: "",
        bibliography: "",
        source: "",
        nationalityId: null,
        genreId: null,
        authorId: null,
        referencePlay: "",
				visible: 1,
				name: ''
      },
      nationalities: [],
      genres: [],
      people: []
    };
  },
  mounted() {
    this.getEntries();
    PersonAPI.getAll()
      .then(response => {
        this.people = response.persons;
        this.people.sort(function(a, b) {
          return a.artistName.localeCompare(b.artistName);
        });
      })
      .catch(error => {
        console.log(error);
        this.showFailSwal(
          "Não foi possível acessar todos os dados dessa montagem."
        );
      });
  },
  methods: {
    validateAndSubmit() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.createPlay();
        } else this.showFailSwal("Preencha os campos obrigatórios.");
      });
    },
    createPlay() {
      return PlayAPI.create(this.getPlay())
        .then(response => {
          this.showSuccessSwal("Peça cadastrada com sucesso.", true);
        })
        .catch(error => {
          console.error(error);
          this.showFailSwal("Não foi possível cadastrar essa peça.");
        });
    },
    getEntries() {
      ListsAPI.getEntries({ listName: "Nationality" })
        .then(response => {
          this.nationalities = response.entries;
          this.nationalities = this.orderString(this.nationalities);
        })
        .catch(error => {
          console.log(error);
        });
      ListsAPI.getEntries({ listName: "Genre" })
        .then(response => {
          this.genres = response.entries;
          this.genres = this.orderString(this.genres);
        })
        .catch(error => {
          console.log(error);
        });
    },
    orderString(items) {
      items.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
      return items;
    },
    getPlay() {
      let data = {
        originalName: this.play.originalName,
        pressReleases: this.play.pressReleases,
        pressReviews: this.play.pressReviews,
        bibliography: this.play.bibliography,
        source: this.play.source,
        nationalityId: this.play.nationalityId,
        genreId: this.play.genreId,
        spFirstDate: reverseDate(this.play.spFirstDate),
        globalFirstDate: reverseDate(this.play.globalFirstDate),
        authorId: this.authorId,
        referencePlay: this.play.referencePlay,
				visible: this.play.visible,
				name: this.play.name
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
          this.$router.push("/pecas");
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
