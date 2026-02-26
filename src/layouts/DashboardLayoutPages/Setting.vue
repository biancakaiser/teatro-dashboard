<template>
	<div class="md-layout">

		<div class="md-layout md-layout-item md-size-100">
			<tabs :tab-name="['Dados', 'Editar', 'Espetáculos']" :tab-icon="['description', 'edit', 'movie_filter']" class="page-subcategories md-layout md-layout-item md-size-100"
			 nav-pills-icons plain color-button="accent">

				<template slot="tab-pane-1" class="md-large-size-100">
					<form class="md-layout md-layout-item md-size-100">
						<md-card>
							<md-card-header class="md-card-header-text md-card-header-accent">
								<div class="card-text">
									<h4 class="title">Dados</h4>
								</div>
							</md-card-header>
							<md-card-content>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Companhia
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="setting.company">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
								<!-- <div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Gênero
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="setting.genre">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div> -->
                <div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Tipo de espetáculo
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="setting.kind">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Ano
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="setting.year">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
                <div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Idioma
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="setting.language">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Tradutor</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input disabled :value="setting.translator"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Adaptador</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input disabled :value="setting.adapter"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>
							</md-card-content>
							<md-card-actions class="text-center">
								<md-button native-type="submit" @click.native.prevent="deleteSetting" class="md-danger">Excluir</md-button>
							</md-card-actions>
						</md-card>
					</form>
          <md-card-actions class="text-center">
              <md-button native-type="submit" @click.native.prevent="backToPlay()" class="md-primary">Voltar para a peça</md-button>
          </md-card-actions>
				</template>

        <template slot="tab-pane-2" class="md-large-size-100">
					<form class="md-layout md-layout-item md-size-100">
						<md-card>
							<md-card-header class="md-card-header-text md-card-header-accent">
								<div class="card-text">
									<h4 class="title">Dados</h4>
								</div>
							</md-card-header>
							<md-card-content>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Companhia
									</label>
									<div class="md-layout-item">
										<md-field>
                      <md-select v-model="companyId" name="company" v-validate="'required'">
                        <md-option v-for="company in companies" :value="company.id" :key="company.id">{{company.name}}</md-option>
                      </md-select>
                    </md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
								<!-- <div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Gênero
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="setting.genre">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div> -->
                <div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Tipo de espetáculo
									</label>
									<div class="md-layout-item">
                    <md-field>
                      <md-select type="text" v-model="rawSettingKind">
                        <md-option
                          v-for="({name, value}, index) in kindsOfPlay" :value="value" :key="index"
                        >{{name}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Ano
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input v-model="setting.year">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
                <div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Idioma
									</label>
									<div class="md-layout-item">
                    <md-field>
                      <md-select type="text" v-model="setting.languageId">
                        <md-option
                          v-for="language in languages"
                          :value="language.id"
                          :key="language.id"
                        >{{language.name}}</md-option>
                      </md-select>
                    </md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">ID do tradutor</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="setting.translatorId"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">ID do adaptador</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="setting.adapterId"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>
							</md-card-content>
							<md-card-actions class="text-center">
								<md-button native-type="submit" @click.native.prevent="updateSetting()" class="md-primary">Editar</md-button>
							</md-card-actions>
						</md-card>
					</form>
          <md-card-actions class="text-center">
              <md-button native-type="submit" @click.native.prevent="backToPlay()" class="md-primary">Voltar para a peça</md-button>
          </md-card-actions>
				</template>



				<template slot="tab-pane-3" class="md-large-size-100">
					<form class="md-layout md-layout-item md-size-100">
						<md-card>
							<md-card-header class="md-card-header-text md-card-header-accent">
								<div class="card-text">
									<h4 class="title">Espetáculo</h4>
								</div>
							</md-card-header>
							<md-card-content>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Teatro
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-select v-model="presentation.theaterId" v-validate="'required'" name="theater">
												<md-option v-for="theater in theaters" :value="theater.id" :key="theater.id">{{theater.name}}</md-option>
											</md-select>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
										<code v-if="errors.has('theater')">Teatro inválido</code>
									</label>
								</div>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Data do espetáculo
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input  v-model="presentation.date" v-validate="'required|date_format:DD/MM/YYYY'" v-mask="'##/##/####'" name="date">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
										<code v-if="errors.has('date')">Data inválida</code>
									</label>
								</div>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Número de sessões
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input v-model="presentation.sessionsNumber" v-validate="'required|numeric'" name="session">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
										<code v-if="errors.has('session')">Sessões inválida</code>
									</label>
								</div>
							</md-card-content>
							<md-card-actions class="text-center">
								<md-button native-type="submit" @click.native.prevent="addPresentation" class="md-primary">Adicionar</md-button>
							</md-card-actions>
						</md-card>
					</form>
          <md-card-actions class="text-center">
              <md-button native-type="submit" @click.native.prevent="backToPlay()" class="md-primary">Voltar para a peça</md-button>
          </md-card-actions>
          <md-card v-for="(presentation, index) in presentations" :key="index">
							<md-card-content >
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Teatro
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="presentation.theater.name"></md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Data do espetáculo
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="presentation.date">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Número de sessões
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="presentation.sessionsNumber">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
                 <md-card-actions class="text-center">
                  <md-button native-type="submit" @click.native.prevent="deletePresentation(presentation)" class="md-danger">Excluir</md-button>

                </md-card-actions>

							</md-card-content>
						</md-card>
				</template>

			</tabs>
		</div>
	</div>
</template>

<script>
import { SlideYDownTransition } from "vue2-transitions";
import swal from "sweetalert2";
import ListsAPI from "@/api/Lists.vue";
import SettingAPI from "@/api/Setting.vue";
import CompanyAPI from "@/api/Company.vue";
import TheaterAPI from "@/api/Theater.vue";
import PersonAPI from "@/api/Person.vue";
import { Tabs } from "@/components";

export default {
  components: {
    SlideYDownTransition,
    Tabs
  },
  data() {
    return {
      id: this.$route.params.montagemId,
      castMember: {
        settingId: this.$route.params.montagemId,
        personId: "",
        roleId: ""
      },
      presentation: {
        theaterId: "",
        date: null,
        sessionsNumber: null
      },
      delete: false,
      theaters: [],
      setting: {
        company: "",
        genre: "",
        year: "",
        adapterId: null,
        translatorId: null,
      },
      kindsOfPlay: [
        { name: "Sessões", value: "SESSIONS" },
        { name: "Palco e tela", value: "STAGE_SCREEN" },
        { name: "Completo", value: "COMPLETE" }
      ],
      languages: [],
      companies: [],
      people: [],
      roles: [],
      presentations: [],
      castMembers: [],
      playId: null,
      companyId: null,
      genreId: null,
      rawSettingKind: null,
    };
  },
  mounted() {
    this.getRecord();
    this.getLanguages();
    this.getCompanies();

    TheaterAPI.getAll()
      .then(response => {
        this.theaters = response.theaters;
        this.theaters.sort(function(a, b) {
          return a.name.localeCompare(b.name);
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
    validate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.updatePlay();
        } else {
          this.showFailSwal("Preencha os campos obrigatórios.");
        }
      });
    },
    deleteSetting() {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          SettingAPI.delete({ id: this.id }).then(response => {
            this.showSuccessSwal("Montagem excluída com sucesso.", true);
          });
        }
      });
    },
    addPresentation() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          SettingAPI.addPresentation(this.getPresentationData())
            .then(response => {
              this.showSuccessSwal("Espetáculo adicionado com sucesso.");
            })
            .catch(response => {
              this.showFailSwal("Não foi possível adicionar esse espetáculo.");
              console.log(response);
            });
        } else {
          this.showFailSwal("Preencha os campos obrigatórios.");
        }
      });
    },
    deletePresentation(presentation) {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          SettingAPI.removePresentation({
            presentationId: presentation.id
          })
            .then(response => {
              this.showSuccessSwal("Espetáculo excluído com sucesso.");
            })
            .catch(response => {
              this.showFailSwal(
                "Não foi possível excluir esse espetáculo."
              );
              console.log(response);
            });
        }
      });
    },
    getLanguages() {
      ListsAPI.getEntries({ listName: "Language" })
        .then(response => {
          this.languages = response.entries;
        });
    },
    getCompanies() {
      CompanyAPI.getAll()
        .then(response => {
          this.companies = response.companys;
          this.companies.sort(function(a, b) {
            return a.name.localeCompare(b.name);
          });
        });
    },
    getRecord() {
      SettingAPI.getRecord({ settingId: this.id }).then(async response => {
        let translator = "", adapter = "";
        this.companyId = response.setting.company.id;
        this.playId = response.setting.playId;
        this.rawSettingKind = response.setting.kind;

        if (response.setting.translatorId){

          const translators  = response.setting.translatorId.split(',');

          const translatorNames = await Promise.all(translators.map(async translator => {
            const value = await PersonAPI.getInfo({ personId: translator });

            return value.person.artistName;
          }));
          translator = translatorNames.join(', ');

        }

        if (response.setting.adapterId){

          const adapters  = response.setting.adapterId.split(',');

          const adapterNames = await Promise.all(adapters.map(async adapter => {
            const value = await PersonAPI.getInfo({ personId: adapter });

            return value.person.artistName;
          }));

          adapter = adapterNames.join(', ');

        }

        this.setting.adapter      = adapter;
        this.setting.translator   = translator;

        this.setting.playId       = response.setting.playId;
        this.setting.company      = response.setting.company.name;
        this.setting.year         = response.setting.year;
        this.setting.genre        = response.setting.genre;
        this.setting.languageId   = response.setting.languageId;
        this.setting.language     = response.setting.language;
        this.setting.adapterId    = response.setting.adapterId;
        this.setting.translatorId = response.setting.translatorId;
        this.setting.kind         = response.setting.kind;
        this.presentations        = response.setting.presentations;
        this.presentations.forEach(presentation => {
          presentation.date = formatDate(presentation.date);
        });

        switch (this.setting.kind) {
        case "SESSIONS":
          this.setting.kind = "Sessões";
          break;
        case "STAGE_SCREEN":
          this.setting.kind = "Palco e tela";
          break;
        case "COMPLETE":
          this.setting.kind = "Completo";
          break;
        }
      });


    },
    getPresentationData() {
      let data = {
        settingId: this.id,
        theaterId: this.presentation.theaterId,
        date: reverseDate(this.presentation.date),
        sessionsNumber: this.presentation.sessionsNumber
      };
      return data;
    },
    getSettingData() {
      return {
        id: this.id,
        playId: this.playId,
        companyId: this.companyId,
        year: this.setting.year,
        languageId: this.setting.languageId,
        kind: this.rawSettingKind,
        translatorId: this.setting.translatorId,
        adapterId: this.setting.adapterId,
      }
    },
    async updateSetting() {
      try {
        const response = await SettingAPI.update(this.getSettingData());
        console.log("edit setting", response);
        this.showSuccessSwal("Montagem editada!");
      } catch (error) {
        console.error(error);
        this.showFailSwal("Houve um erro na edição");
      }
    },
    showSuccessSwal(message = "Sua requisição foi enviada.", redirect = false) {
      swal({
        title: "Sucesso",
        text: message,
        type: "success",
        confirmButtonClass: "md-button md-success",
        buttonsStyling: false,
        animation: false
      }).then(result => {
        if (redirect) this.$router.push("/pecas");
        this.getRecord();
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
    },
    backToPlay() {
      this.$router.push({path: `/peca/${this.setting.playId}`});
    },
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
  if ((date === "") | (date === null)) return null;
  return date
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("/");
};
</script>


<style>
.tab-pane-3 {
  width: 100%;
}

.md-card .md-card-actions {
  border: none;
}

.text-center {
  justify-content: center !important;
}
</style>
