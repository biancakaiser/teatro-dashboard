<template>
  <div class="md-layout">


    <div class="md-layout md-layout-item md-size-100">
      <tabs :tab-name="['Dados', 'Responsáveis', 'Fotos']" :tab-icon="['description', 'person', 'photo_library']" class="page-subcategories md-layout md-layout-item md-size-100"
        nav-pills-icons plain color-button="rose">
        <template slot="tab-pane-1" class="md-large-size-100">
          <form class="md-layout md-layout-item md-size-100">
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-accent">
                <div class="card-text">
                  <h4 class="title">Edição do teatro</h4>
                </div>
              </md-card-header>

              <md-card-content>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Nome
                  </label>
                  <div class="md-layout-item">
                    <md-field s>
                      <md-input v-model="theater.name" name="name" type="text" v-validate="'required'">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('name')">Nome inválido</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Outros nomes
                  </label>
                  <div class="md-layout-item">
                    <md-field s>
                      <md-input v-model="theater.otherNames">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Endereço original
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="theater.foundationAddress" name="foundationAddress" type="text">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">

                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Data de fundação
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="theater.foundationDate" name="foundationDate" type="text">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('foundationDate')">Data inválida</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Bairro
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="theater.neighborhood" name="neighborhood" type="text">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Endereço atualizado
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="theater.currentAddress" name="currentAddress" type="text">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">

                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Data de fechamento
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="theater.dissolutionDate" name="dissolutionDate" type="text">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('dissolutionDate')">Data inválida</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Razão para o fechamento
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="theater.dissolutionReason" name="dissolutionReason" type="text">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">

                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Lotação
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="theater.seatsNumber" name="seatsNumber" type="text">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('seatsNumber')">Número inválido</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Tipo de espetáculo
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="theater.kind" name="kind" type="text">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">

                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Trajetória
                  </label>
                  <div class="md-layout-item">
                    <md-field s>
                      <md-textarea v-model="theater.history" type="text">
                      </md-textarea>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Notas
                  </label>
                  <div class="md-layout-item">
                    <md-field s>
                      <md-textarea v-model="theater.notes" type="text">
                      </md-textarea>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Bibliografia
                  </label>
                  <div class="md-layout-item">
                    <md-field s>
                      <md-textarea v-model="theater.bibliography" type="text">
                      </md-textarea>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                  </label>
                </div>

              </md-card-content>

              <md-card-actions class="text-center">
                <md-button native-type="submit" @click.native.prevent="validate" class="md-primary">Atualizar</md-button>
                <md-button native-type="submit" @click.native.prevent="deleteTheater" class="md-danger">Excluir</md-button>
              </md-card-actions>
            </md-card>
          </form>
        </template>

        <template slot="tab-pane-2" class="md-large-size-100">
          <form class="md-layout md-layout-item md-size-100">
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-accent">
                <div class="card-text">
                  <h4 class="title">Responsáveis</h4>
                </div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Data de início
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="responsible.firstDate" name="firstDate" v-validate="'length:10'">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('firstDate')">Data inválida</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Data final
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="responsible.lastDate" name="lastDate" v-validate="'length:10'">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('lastDate')">Data inválida</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Id da Pessoa
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="responsible.personId" name="person">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('person')">Requerido</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Função
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-select v-model="responsible.role" name="role" v-validate="'required'">
                        <md-option value="OWNER"> Proprietário </md-option>
                        <md-option value="TENANT"> Arrendatário </md-option>
                        <md-option value="BUSINESS"> Empresário </md-option>
                        <md-option value="MANAGER"> Gerente </md-option>
                        <md-option value="COMPANY"> Empresa </md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('role')">Requerido</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Nome
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="responsible.name"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">

                  </label>
                </div>
                <md-card-actions class="text-center">
                  <md-button native-type="submit" @click.native.prevent="addResponsible" class="md-primary">Adicionar</md-button>

                </md-card-actions>

              </md-card-content>
            </md-card>

            <md-card v-for="responsible in this.responsibles">
              <md-card-content>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Inicio
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input disabled :value="responsible.firstDate">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Fim
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input disabled :value="responsible.lastDate">
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Pessoa
                  </label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-if="responsible.personId" disabled :value="responsible.person.artistName">
                      </md-input>
                      <md-input v-else disabled>
                      </md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                  </label>
                </div>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Nome
                  </label>
                  <div class="md-layout-item">
                    <md-field>

                      <md-input disabled :value="responsible.name">
                      </md-input>
                    </md-field>

                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">
                    Função
                  </label>
                  <div class="md-layout-item">
                    <md-field v-if="responsible.role">
                      <md-input disabled :value="roleTranslation[responsible.role]">
                      </md-input>
                    </md-field>

                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                  </label>
                </div>
                 <md-card-actions class="text-center">
                  <md-button native-type="submit" @click.native.prevent="removeResponsible(responsible)" class="md-danger">Excluir</md-button>

                </md-card-actions>
              </md-card-content>
            </md-card>
          </form>
        </template>

        <template slot="tab-pane-3" class="md-large-size-100">
          <form class="md-layout md-layout-item md-size-100">
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-accent">
                <div class="card-text">
                  <h4 class="title">Fotos do teatro</h4>
                </div>
              </md-card-header>

              <md-card-content class="md-card-content md-layout">

                <div v-for="(item, index) in pictures" :key="index" class="resource-container md-layout-item md-size-33 md-xsmall-size-100">
                  <div class="image-container product-resource">
                    <span style="display: inline-block;height: 100%;vertical-align: middle;"></span>
                    <img :src="item.url" title="">
                  </div>
                  <md-button class="md-icon-button md-danger resource-button md-raised" @click="removePicture(item)">
                    <md-icon>clear</md-icon>
                  </md-button>
                  <div class="picture-info">
                    <md-field>
                      <label>Descrição</label>
                      <md-input disabled :value="item.description"></md-input>
                    </md-field>
                    <md-field class="source-input">
                      <label>Fonte</label>
                      <md-input disabled :value="item.origin"></md-input>

                    </md-field>
                    <md-button class="md-icon-button md-primary info-picture-btn" @click="showModal(item)">
                      Editar
                    </md-button>
                  </div>
                </div>

                <div class="md-layout-item" :class="{'md-size-100': !pictures.length, 'md-size-33 md-xsmall-size-100': pictures.length}">
                  <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
                    <div class="dropbox">
                      <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                        accept="image/*" class="input-file">
                      <span style="padding-top:80px;">
                        <p v-if="isInitial">
                          Arraste aqui as fotos do teatro<br> ou clique para abrir o pesquisador
                        </p>
                        <p v-if="isSaving">
                          Salvando {{ fileCount }} fotos...
                        </p>
                      </span>
                    </div>
                  </form>
                </div>


              </md-card-content>
            </md-card>
          </form>
        </template>

      </tabs>

      <modal v-if="modal" @close="hideModal">
        <template slot="header">
          <h4 class="modal-title">Alterar Informações</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="hideModal">
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item mx-auto md-size-80">
              <label>Descrição</label>
              <md-input v-model="picture.description"></md-input>
            </md-field>
          </div>

          <div class="md-layout">
            <md-field class="md-layout-item mx-auto md-size-80">
              <label>Fonte</label>
              <md-input v-model="picture.origin"></md-input>
            </md-field>
          </div>
        </template>

        <template slot="footer">
          <md-button class="md-accent" @click="updatePicture">Enviar</md-button>
        </template>
      </modal>

    </div>

    <div  v-if="spinnerModal" class="modal" id="modal-1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
import { SlideYDownTransition } from "vue2-transitions";
import TheaterAPI from "@/api/Theater.vue";
import PersonAPI from "@/api/Person.vue";
import ResourceAPI from "@/api/Resource.vue";
//import ListsAPI from "@/api/Lists.vue";
import swal from "sweetalert2";
import { Tabs, Modal } from "@/components";
import { Circle4 } from "vue-loading-spinner";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  components: {
    SlideYDownTransition,
    Tabs,
    Modal,
    Circle4
  },
  data() {
    return {
      theaterId: this.$route.params.teatroId,
      theater: {
        name: "",
        foundationAddress: "",
        foundationDate: "",
        neighborhood: "",
        currentAddress: "",
        dissolutionDate: "",
        dissolutionReason: "",
        seatsNumber: "",
        kind: "",
        history: "",
        otherNames: "",
        bibliography: "",
        notes: ""
      },
      responsible: {
        theaterId: this.$route.params.teatroId,
        personId: null,
        firstDate: "",
        lastDate: "",
        role: "",
        name: ""
      },
      picture: {
        origin: "",
        description: "",
        UUID: ""
      },
      persons: [],
      responsibles: [],
      pictures: [],
      delete: false,
      // UPLOAD
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "file",
      modal: false,
      spinnerModal: false,
      // productPictures: []
      roleTranslation: {
        OWNER: "Proprietário",
        TENANT: "Arrendatário",
        BUSINESS: "Empresário",
        MANAGER: "Gerente",
        COMPANY: "Empresa"
      }
    };
  },
  created() {
    this.showSpinnerModal();
    this.blockClick();
    this.getRecord();
    this.resetUpload();

  },
  methods: {
    formatDate: date => formatDate(date),
    validate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.updateTheater();
        } else {
          this.showFailSwal("Preencha os campos obrigatórios.");
        }
      });
    },
    updateTheater() {
      TheaterAPI.update(this.getData())
        .then(response => {
          this.showSuccessSwal("Teatro atualizado com sucesso.");
        })
        .catch(error => {
          this.showFailSwal();
        });
    },
    deleteTheater() {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          TheaterAPI.delete({ theaterId: this.theater.id }).then(response => {
            this.showSuccessSwal("Teatro excluído com sucesso.", true);
          });
        }
      });
    },
    addResponsible() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          let resp = this.responsible;
          resp.firstDate = reverseDate(resp.firstDate);
          resp.lastDate = reverseDate(resp.lastDate);
          TheaterAPI.addResponsible(resp)
            .then(response => {
              this.showSuccessSwal("Responsável adicionado com sucesso.");
              this.getRecord();
            })
            .catch(response => {
              this.showFailSwal("Não foi possível adicionar esse responsável.");
            });
        } else {
          this.showFailSwal("Preencha todos os campos obrigatórios.");
        }
      });
    },
    async removeResponsible(responsible){
      const result = await TheaterAPI.removeResponsible({id: responsible.id});
      if (result){
        this.getRecord();
        this.showSuccessSwal("Responsável excluído com sucesso.");
      }
      else{
        this.showFailSwal("Não foi possível excluir esse responsável.")
      }
    },
    removePicture(picture) {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          TheaterAPI.removePicture({
            theaterId: this.theater.id,
            UUID: picture.UUID
          })
            .then(response => {
              this.showSuccessSwal("Foto removida com sucesso.");
              this.getRecord();
            })
            .catch(error => {
              this.showFailSwal("Não foi possível remover essa foto.");
            });
        }
      });
    },
    updatePicture() {
      this.modal = false;
      ResourceAPI.updateInfo(this.picture)
        .then(response => {
          this.showSuccessSwal("Informações atualizadas com sucesso.");
          this.getRecord();
        })
        .catch(error => {
          this.showFailSwal(
            "Não foi possível atualizar as informações dessa foto."
          );
        });
    },
    save(formData) {
      this.currentStatus = STATUS_SAVING;

      return TheaterAPI.uploadPicture(this.theaterId, formData)
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
          this.getRecord();
          this.resetUpload();
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
          this.getRecord();
          this.resetUpload();
          if (error.message === "PAYLOAD_TOO_LARGE") this.showFailSwal("Arquivo muito grande.");
          else this.showFailSwal("Não foi possível salvar a foto.");
        });
    },
    filesChange(fieldName, fileList) {
      if (!fileList.length) return;

      Array.from(Array(fileList.length).keys()).map(index => {
        let formData = new FormData();
        formData.append(fieldName, fileList[index], fileList[index].name);
        this.save(formData);
      });
    },
    showModal(picture) {
      this.modal = true;
      this.picture.origin = picture.origin;
      this.picture.description = picture.description;
      this.picture.UUID = picture.UUID;
    },
    hideModal() {
      this.modal = false;
    },
    showSpinnerModal() {
      this.spinnerModal = true;
    },
    hideSpinnerModal() {
      this.spinnerModal = false;
    },
    blockClick() {
      document.addEventListener("click", handler, true);
    },
    removeEvent() {
      document.removeEventListener("click", handler, true);
    },
    getData() {
      let data = {
        theaterId: this.$route.params.teatroId,
        name: this.theater.name,
        foundationAddress: nullToString(this.theater.foundationAddress),
        neighborhood: nullToString(this.theater.neighborhood),
        currentAddress: nullToString(this.theater.currentAddress),
        dissolutionReason: nullToString(this.theater.dissolutionReason),
        seatsNumber: nullToString(this.theater.seatsNumber),
        foundationDate: nullToString(this.theater.foundationDate),
        dissolutionDate: nullToString(this.theater.dissolutionDate),
        kind: nullToString(this.theater.kind),
        bibliography: nullToString(this.theater.bibliography),
        otherNames: nullToString(this.theater.otherNames),
        notes: nullToString(this.theater.notes),
        history: nullToString(this.theater.history)
      };
      return data;
    },
    getRecord() {
      TheaterAPI.getRecord({ theaterId: this.$route.params.teatroId })
        .then(response => {
          this.responsibles = response.responsibles;
          this.responsibles.forEach(responsible => {
            responsible.firstDate = formatDate(responsible.firstDate);
            responsible.lastDate = formatDate(responsible.lastDate);
          });
          this.theater = response.theater;
          this.pictures = response.pictures;
          this.responsibles = this.orderByYear(this.responsibles);
          this.hideSpinnerModal();
          this.removeEvent();
        })
        .catch(response => {
          this.hideSpinnerModal();
          this.removeEvent();
          this.showFailSwal("Não foi possível acessar todos os dados desse teatro.");
          console.log(response);
        });
    },
    orderByYear(arr){
      return arr.sort((a, b) => {
        return a.firstDate > b.firstDate;
      });
    },
    resetUpload() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
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
        if (redirect) {
          this.$router.push("/teatros");
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
    },
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  }
};

function handler(e) {
  e.stopPropagation();
  e.preventDefault();
}


let reverseDate = function(date) {
  if (date !== null && date !== "") {
    return date
      .split("/")
      .reverse()
      .join("-");
  }
  return "";
};

let formatDate = function(date) {
  if ((date === null) | (date === "")) return null;
  return date
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("/");
};

let nullToString = function(string) {
  if (string === null) return "";
  return string;
};
</script>


<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}

.text-center {
  justify-content: center !important;
}

.resource-container {
  position: relative;
}

.product-resource {
  height: 300px;
  max-width: 100%;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 auto 25px;
}

.dropbox {
  outline: 2px dashed grey;
  /* the dash box */
  outline-offset: -10px;
  background: whitesmoke;
  color: dimgray;
  padding: 10px 20px;
  height: 300px;
  position: relative;
  cursor: pointer;

  line-height: 200px;
  text-align: center;
}

.input-file {
  opacity: 0;
  /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: rgba(198, 240, 198, 0.502);
  /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  margin-top: 0;
}

.dropbox span {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

.resource-button {
  width: 40px;
  height: 40px;
  border-radius: 100px;

  position: absolute;
  top: -5px;
  right: -5px;
}

.picture-info {
  margin-bottom: 30px;
}

.info-picture-btn {
  width: 100%;
  height: 30px;
  border-radius: 3px;
  margin-left: 0px;
}
</style>
