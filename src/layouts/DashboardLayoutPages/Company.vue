<template>
  <div class="md-layout">
    <div class="md-layout md-layout-item md-size-100">
      <tabs
        :tab-name="['Dados', 'Membros', 'Fotos']"
        :tab-icon="['description', 'group', 'photo_library']"
        class="page-subcategories md-layout md-layout-item md-size-100"
        nav-pills-icons
        plain
        color-button="accent"
      >
        <template slot="tab-pane-1" class="md-large-size-100">
          <form class="md-layout md-layout-item md-size-100">
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-accent">
                <div class="card-text">
                  <h4 class="title">Edição da companhia</h4>
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
                    <md-field s>
                      <md-input
                        v-model="company.name"
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
                  <label class="md-layout-item md-size-20 md-form-label">Outros nomes</label>
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
                          :key="nationality.id"
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
                      <md-input v-model="company.foundationDate" name="foundationDate"></md-input>
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
                      <md-input
                        v-model="company.foundationPlace"
                        name="foundationPlace"
                        type="text"
                      ></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Data de dissolução</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="company.dissolutionDate" name="dissolutionDate"></md-input>
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
              </md-card-content>

              <md-card-actions class="text-center">
                <md-button
                  native-type="submit"
                  @click.native.prevent="validate"
                  class="md-primary"
                >Atualizar</md-button>
                <md-button
                  native-type="submit"
                  @click.native.prevent="deleteCompany"
                  class="md-danger"
                >Excluir</md-button>
              </md-card-actions>
            </md-card>
          </form>
        </template>

        <template slot="tab-pane-2" class="md-large-size-100">
          <form class="md-layout md-layout-item md-size-100">
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-accent">
                <div class="card-text">
                  <h4 class="title">Membros</h4>
                </div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Data de início</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input
                        v-model="job.firstDate"
                        name="firstDate"
                        v-mask="['##/##/####']"
                        v-validate="'date_format:DD/MM/YYYY'"
                      ></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('firstDate')">Data inválida</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Data final</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input
                        v-model="job.lastDate"
                        name="lastDate"
                        v-mask="['##/##/####']"
                        v-validate="'date_format:DD/MM/YYYY'"
                      ></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('lastDate')">Data inválida</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Ids das Pessoas</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="job.personId" name="company" v-validate="'required'"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('company')">Requerido</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Ocupação</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-select v-model="job.roleId" name="role" v-validate="'required'">
                        <md-option v-for="role in performanceRoles" :value="role.id" :key="role.id">{{role.name}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('role')">Requerido</code>
                  </label>
                </div>

                <md-card-actions class="text-center">
                  <md-button
                    native-type="submit"
                    @click.native.prevent="addMember"
                    class="md-primary"
                  >Adicionar membro</md-button>
                </md-card-actions>
              </md-card-content>
            </md-card>

            <md-card v-for="(job, index) in filteredJobs" :key="index">
              <md-card-content>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Inicio</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input :value="job.firstDate" v-model="job.firstDate"></md-input>
                    </md-field>
                  </div>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Saída</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input :value="job.lastDate" v-model="job.lastDate"></md-input>
                    </md-field>
                  </div>
                </div>

                <div class="md-layout text-center">
                  <md-button
                    native-type="submit"
                    @click.native.prevent="deleteJobPeriod(job, index)"
                    class="md-danger">
                    Excluir Período
                  </md-button>
                </div>

                <div class="md-layout text-center">
                  <md-button
                    native-type="submit"
                    @click.native.prevent="updateJobPeriod(job, index)"
                    class="md-danger">
                    Atualizar Período
                  </md-button>
                </div>

                <div class="md-layout text-center">
                  <md-button
                    native-type="submit"
                    @click.native.prevent="addJobToPeriod(job)"
                    class="md-primary">
                    Adicionar Membro
                  </md-button>
                </div>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Membros</label>
                  <div class="md-layout-item">
                    <md-field v-for="member in job.cast" :key="member.id">
                      <md-input disabled :value="member.person"></md-input>
                       <md-button
                        native-type="submit"
                        @click.native.prevent="removeMember(member.id)"
                        class="md-danger"
                      >Excluir</md-button>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>
              </md-card-content>
            </md-card>
          </form>
        </template>

        <template slot="tab-pane-3" class="md-large-size-100">
          <form class="md-layout md-layout-item md-size-100">
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-accent">
                <div class="card-text">
                  <h4 class="title">Fotos</h4>
                </div>
              </md-card-header>

              <md-card-content class="md-card-content md-layout">
                <div
                  v-for="(item, index) in pictures"
                  :key="index"
                  class="resource-container md-layout-item md-size-33 md-xsmall-size-100"
                >
                  <div class="image-container product-resource">
                    <span style="display: inline-block;height: 100%;vertical-align: middle;"></span>
                    <img :src="item.url" title>
                  </div>
                  <md-button
                    class="md-icon-button md-danger resource-button md-raised"
                    @click="removePicture(item)"
                  >
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
                    <md-button
                      class="md-icon-button md-primary info-picture-btn"
                      @click="showModal(item)"
                    >Editar</md-button>
                  </div>
                </div>

                <div
                  class="md-layout-item"
                  :class="{'md-size-100': !pictures.length, 'md-size-33 md-xsmall-size-100': pictures.length}"
                >
                  <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
                    <div class="dropbox">
                      <input
                        type="file"
                        multiple
                        :name="uploadFieldName"
                        :disabled="isSaving"
                        @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                        accept="image/*"
                        class="input-file"
                      >
                      <span style="padding-top:80px;">
                        <p v-if="isInitial">Arraste aqui as fotos
                          <br>ou clique para abrir o pesquisador
                        </p>
                        <p v-if="isSaving">Salvando {{ fileCount }} fotos...</p>
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
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="hideModal"
          >
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

    <div
      v-if="spinnerModal"
      class="modal"
      id="modal-1"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
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
import swal from "sweetalert2";
import CompanyAPI from "@/api/Company.vue";
import PersonAPI from "@/api/Person.vue";
import ListsAPI from "@/api/Lists.vue";
import ResourceAPI from "@/api/Resource.vue";
import { Tabs, Modal } from "@/components";
import moment from "moment";
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
      company: {
        name: "",
        otherNames: "",
        nationalityId: null,
        foundationDate: "",
        foundationPlace: "",
        dissolutionDate: "",
        path: "",
        notes: "",
        bibliography: "",
        visible: null
      },
      job: {
        firstDate: "",
        lastDate: "",
        roleId: null,
        personId: null
      },
      nationalities: [],
      delete: false,
      jobs: [],
      filteredJobs: [
        { firstDate: null, lastDate: null, cast: [{ person: "" }] }
      ],
      firstJob: {},
      people: [],
      roles: [],
      performanceRoles: [],
      conceptionArray: [
        "Autor do texto",
        "Autor da música",
        "Tradutor",
        "Arranjador da música",
        "Arranjador"
      ],
      // UPLOAD
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "file",
      pictures: [],
      picture: {
        origin: "",
        description: "",
        UUID: ""
      },
      modal: false,
      spinnerModal: false
    };
  },
  mounted() {
    this.showSpinnerModal();
    this.blockClick();
    this.getRecord();
    this.resetUpload();

    ListsAPI.getEntries({ listName: "Nationality" })
      .then(response => {
        this.nationalities = response.entries;
        this.nationalities.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
      })
      .catch(data => {
        console.log(data.error);
      });

    ListsAPI.getEntries({ listName: "Role" })
      .then(response => {
        this.roles = response.entries;
        this.roles.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
        this.roles.filter(role => {
          if (!(this.conceptionArray.indexOf(role.name) > -1)) {
            this.performanceRoles.push(role);
          }
        });
      })
      .catch(error => {
        console.log(error);
      });

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
    validate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.updateCompany();
        } else {
          this.showFailSwal("Preencha os dados obrigatórios.");
        }
      });
    },
    getCompany() {
      let data = {
        id: this.company.id,
        name: nullToString(this.company.name),
        otherNames: nullToString(this.company.otherNames),
        nationalityId: this.company.nationalityId,
        foundationPlace: nullToString(this.company.foundationPlace),
        path: nullToString(this.company.path),
        notes: nullToString(this.company.notes),
        bibliography: nullToString(this.company.bibliography),
        dissolutionDate: reverseDate(this.company.dissolutionDate),
        foundationDate: reverseDate(this.company.foundationDate),
        visible: this.company.visible
      };
      return data;
    },
    getDataJob() {
      let arrPerson = this.job.personId.split(',');
      let data = new Array();

      arrPerson.forEach(pId => {
        data.push({
          firstDate: reverseDate(this.job.firstDate),
          lastDate: reverseDate(this.job.lastDate),
          personId: pId,
          companyId: this.$route.params.companhiaId,
          roleId: this.job.roleId
        })
      });

      return data;
    },
    updateCompany() {
      CompanyAPI.update(this.getCompany())
        .then(response => {
          this.showSuccessSwal("Companhia atualizada com sucesso!");
        })
        .catch(response => {
          this.showFailSwal("Não foi possível atualizar essa companhia.");
          console.error(response.error);
        });
    },
    addMember() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          const data = this.getDataJob();
          data.forEach(d => {
            PersonAPI.addJob(d)
            .then(response => {
              this.showSuccessSwal("Membro adicionado com sucesso.");
              this.getRecord();
              this.job = {
                firstDate: "",
                lastDate: "",
                roleId: null,
                personId: null
              }
            })
            .catch(response => {
              this.showFailSwal("Não foi possível adicionar essa pessoa.");
            });
          })
        } else {
          this.showFailSwal("Preencha todos os campos obrigatórios.");
        }
      });
    },
    removeMember(jobId) {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          PersonAPI.removeJob(jobId)
            .then(response => {
              this.showSuccessSwal("Membro removido com sucesso.");
              this.getRecord();
            })
            .catch(response => {
              this.showFailSwal("Não foi possível excluir essa pessoa.");
            });
        }
      });
    },
    addJobToPeriod(jobToEdit) {
      this.job.firstDate = jobToEdit.firstDate;
      this.job.lastDate  = jobToEdit.lastDate;
      window.scrollTo(0, 50);

    },
    updateJobPeriod(periodToUpdate, index) {
      this.$nextTick(function () {
        this.filteredJobs[index].cast.forEach(cast => {
          PersonAPI.updateJob({
            jobId: cast.id,
            firstDate: periodToUpdate.firstDate ? periodToUpdate.firstDate.split("/").reverse().join("-") : null,
            lastDate: periodToUpdate.lastDate ? periodToUpdate.lastDate.split("/").reverse().join("-") : null,
          })
          .then(response => {
            this.showSuccessSwal("Periodo atualizado com sucesso.");
            this.getRecord();
          })
          .catch(error => {
            this.showFailSwal("Não foi possível atualizar esse período.");
          })
        });
      })
    },
    deleteJobPeriod(periodToDelete, index) {
      this.filteredJobs[index].cast.forEach(cast => {
        PersonAPI.removeJob(cast.id)
        .then(response => {
          this.showSuccessSwal("Job removido com sucesso.");
          this.getRecord();
        })
        .catch(error => {
          this.showFailSwal("Não foi possível remover esse job.");
        })
      });
    },
    deleteCompany() {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          CompanyAPI.delete({ id: this.company.id }).then(response => {
            this.showSuccessSwal("Companhia excluída com sucesso.", true);
          });
        }
      });
    },
    filterCast() {
      this.jobs.forEach(job => {
        let exist = false;

        this.filteredJobs.filter((filterJob, index) => {
          if (
            filterJob.firstDate === job.firstDate &&
            filterJob.lastDate === job.lastDate &&
            !this.conceptionArray.includes(job.person.role)
          ) {
            this.filteredJobs[index].cast.push({
              person: `${job.person.artistName} - Função: ${job.person.role}`,
              id: job.id
            });
            exist = true;
          }
        });

        if (!exist && !this.conceptionArray.includes(job.person.role)) {
          let data = {
            firstDate: job.firstDate,
            lastDate: job.lastDate,
            cast: [
              {
                person: `${job.person.artistName} - Função: ${job.person.role}`,
                id: job.id
              }
            ]
          };
          this.filteredJobs.push(data);
        }
      });
    },
    removePicture(picture) {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          CompanyAPI.removePicture({
            companyId: this.company.id,
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
    resetUpload() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      this.currentStatus = STATUS_SAVING;

      return CompanyAPI.uploadPicture(this.company.id, formData)
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
          if (error.message === "PAYLOAD_TOO_LARGE")
            this.showFailSwal("Arquivo muito grande.");
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
    getRecord() {
      CompanyAPI.getRecord({ companyId: this.$route.params.companhiaId })
        .then(response => {
          this.pictures = response.pictures;
          this.company = response.company;
          this.jobs = response.jobs;
          this.jobs.forEach(job => {
            job.firstDate = job.firstDate ? this.formatDate(job.firstDate) : null;
            job.lastDate = job.lastDate ? this.formatDate(job.lastDate) : null;
          });
          this.filteredJobs = [];
          if (this.jobs && this.jobs.length > 0) {
            this.filterCast();
            this.orderJobs();
          }

          this.hideSpinnerModal();
          this.removeEvent();
        })
        .catch(response => {
          // eslint-disable-next-line no-console
          console.error(response)
          this.hideSpinnerModal();
          this.removeEvent();
          this.showFailSwal(
            "Não foi possível acessar os dados dessa companhia."
          );
        });
    },
    orderJobs() {
      this.filteredJobs.sort(function(a, b) {
        return a.firstDate - b.firstDate;
      });
      this.filteredJobs.forEach(job => {
        job.cast.sort(function(a, b) {
          return a.person.localeCompare(b.person);
        });
      });
    },
    formatDateYear(value) {
      if (!value) return null;
      return moment(value).format("YYYY");
    },
    formatDate(value) {
      if (!value) return null;
      return moment(value).format("DD/MM/YYYY");
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
          this.$router.push("/companhias");
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
  if (date !== null && date !== "" && date !== undefined) {
    return date
      .split("/")
      .reverse()
      .join("-");
  }
  return null;
};

let nullToString = function(data) {
  if (data === null) {
    return "";
  } else return data;
};

let formatDate = function(date) {
  if (date === null) return null;
  return date
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("/");
};
</script>

<style>
.firstCard {
  margin-bottom: -30px;
}

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
