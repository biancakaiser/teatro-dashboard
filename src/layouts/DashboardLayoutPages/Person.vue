<template>
	<div class="md-layout">


		<div class="md-layout md-layout-item md-size-100">
			<tabs :tab-name="['Pessoal', 'Fotos']" :tab-icon="['person','photo_library']" class="page-subcategories md-layout md-layout-item md-size-100"
			 nav-pills-icons plain color-button="accent">

				<template slot="tab-pane-1" class="md-large-size-100">
					<form class="md-layout md-layout-item md-size-100">
						<md-card>
							<md-card-header class="md-card-header-text md-card-header-accent">
								<div class="card-text">
									<h4 class="title">Edição da pessoa</h4>
								</div>
							</md-card-header>

							<md-card-content>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Visibilidade
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-select  v-model="person.visible" >
												<md-option value="1">Visível</md-option>
												<md-option value="0">Não visível</md-option>
											</md-select>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
										<code v-if="errors.has('visible')"> </code>
									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Nome civil
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input v-model="person.civilName" name="civilName" type="text">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">

									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Nome artístico
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input v-model="person.artistName" name="artistName" type="text" v-validate="'required'">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
										<code v-if="errors.has('artistName')">Nome inválido</code>
									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Gênero
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-select v-model="person.gender" name="gender" type="text">
												<md-option value="M">Masculino</md-option>
												<md-option value="F">Feminino</md-option>
											</md-select>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">

									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Cor
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input v-model="person.race" name="race" type="text">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
										<code v-if="errors.has('race')">Somente texto</code>
									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Especialidade
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input v-model="person.expertise"></md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">

									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Nacionalidade
									</label>
									<div class="md-layout-item">
										<md-field>
											<!--	<md-input v-model="person.nationalityId" name="" type="text">
							</md-input> -->
											<md-select v-model="person.nationalityId" type="text">
												<md-option v-for="nationality in nationalities" :value="nationality.id"> {{nationality.name}} </md-option>

											</md-select>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">

									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Data de nascimento
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input v-model="person.birthDate" name="birthDate" type="text">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
										<code v-if="errors.has('birthDate')">Data inválida</code>
									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Local de nascimento
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input v-model="person.birthPlace" name="birthPlace" type="text">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">

									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Data da morte
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input v-model="person.deathDate" name="deathDate" type="text">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
										<code v-if="errors.has('deathDate')">Data inválida</code>
									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Local da morte
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input v-model="person.deathPlace" name="deathPlace" type="text">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">

									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Trajetória da vida pessoal
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-textarea v-model="person.personalPath" name="personalPath" type="text">
											</md-textarea>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">

									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Trajetória da vida profissional
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-textarea v-model="person.professionalPath" name="professionalPath" type="text">
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
										<md-field>
											<md-textarea v-model="person.notes" name="notes" type="text">
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
										<md-field>
											<md-textarea v-model="person.bibliography" name="bibliography" type="text">
											</md-textarea>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">

									</label>
								</div>
								<br><br>
							</md-card-content>

							<md-card-actions class="text-center">
								<md-button native-type="submit" @click.native.prevent="validate" class="md-primary">Atualizar</md-button>
								<md-button native-type="submit" @click.native.prevent="deletePerson" class="md-danger">Excluir</md-button>
							</md-card-actions>
						</md-card>
					</form>
				</template>


<!--

				<template slot="tab-pane-3" class="md-large-size-100">
					<form class="md-layout md-layout-item md-size-100">
						<md-card>
							<md-card-header class="md-card-header-text md-card-header-accent">
								<div class="card-text">
									<h4 class="title">Concepções</h4>
								</div>
							</md-card-header>
							<md-card-content>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Data de início
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input v-model="job.firstDate" name="firstDate" v-mask="['##/##/####']" v-validate="'date_format:DD/MM/YYYY'">
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
											<md-input v-model="job.lastDate" name="lastDate" v-mask="['##/##/####']" v-validate="'date_format:DD/MM/YYYY'">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
										<code v-if="errors.has('lastDate')">Data inválida</code>
									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Companhia
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-select v-model="job.companyId" name="company" v-validate="'required'">
												<md-option v-for="company in companies" :value="company.id"> {{company.name}} </md-option>
											</md-select>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
										<code v-if="errors.has('company')">Requerido</code>
									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Ocupação
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-select v-model="job.roleId" name="role" v-validate="'required'">
												<md-option v-for="role in conceptionRoles" :value="role.id"> {{role.name}} </md-option>
											</md-select>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
										<code v-if="errors.has('role')">Requerido</code>
									</label>
								</div>

								<md-card-actions class="text-center">
									<md-button native-type="submit" @click.native.prevent="addJob" class="md-primary">Adicionar</md-button>
								</md-card-actions>
							</md-card-content>
						</md-card>

						<md-card v-for="job in this.conceptionJob">
							<md-card-content>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Inicio
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="job.firstDate">
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
											<md-input disabled :value="job.lastDate">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>

								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Companhia
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="job.company.name">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>
								<div class="md-layout">
									<label class="md-layout-item md-size-20 md-form-label">
										Ocupação
									</label>
									<div class="md-layout-item">
										<md-field>
											<md-input disabled :value="job.role">
											</md-input>
										</md-field>
									</div>
									<label class="md-layout-item md-size-20 md-label-on-right">
									</label>
								</div>

							</md-card-content>
						</md-card>
					</form>
				</template> -->

				<template slot="tab-pane-2" class="md-large-size-100">
					<form class="md-layout md-layout-item md-size-100">
						<md-card>
							<md-card-header class="md-card-header-text md-card-header-accent">
								<div class="card-text">
									<h4 class="title">Fotos</h4>
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
													Arraste aqui as fotos<br> ou clique para abrir o pesquisador
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
import ListsAPI from "@/api/Lists.vue";
import swal from "sweetalert2";
import PersonAPI from "@/api/Person.vue";
import ResourceAPI from "@/api/Resource.vue";
import { Pagination, Tabs, Modal } from "@/components";
import { Circle4 } from "vue-loading-spinner";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  components: {
    Pagination,
    Tabs,
		Modal,
		Circle4
  },
  data() {
    return {
      person: {
        visible: "",
        civilName: "",
        artistName: "",
        gender: "",
        race: "",
        expertise: "",
        nationalityId: null,
        birthDate: "",
        deathDate: "",
				deathPlace: "",
				birthPlace: "",
        personalPath: "",
        professionalPath: "",
        notes: "",
        bibliography: "",
      },
      // job: {
      //   firstDate: "",
      //   lastDate: "",
      //   companyId: null,
      //   roleId: null
			// },
			// conceptionArray:[ "Autor do texto", "Autor da música", "Tradutor", "Arranjador da música" ],
      // companies: [],
      nationalities: [],
			// conceptionRoles: [],
			// performanceRoles: [],
      // roles: [],
      // performanceJob: [],
      // conceptionJob: [],
      // jobs: [],
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
    this.getEntries();
    this.resetUpload();


  },
  methods: {
    validate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) this.updatePerson();
        else this.showFailSwal("Preencha todos os campos obrigatórios.");
      });
    },
    updatePerson() {
      PersonAPI.update(this.getPerson())
        .then(response => {
          this.showSuccessSwal("Pessoa atualizada com sucesso.");
        })
        .catch(response => {
          console.log(response.error);
          this.showFailSwal("Não foi possível atualizar essa pessoa.");
        });
    },
    deletePerson() {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          PersonAPI.delete({ personId: this.person.id }).then(response => {
            this.showSuccessSwal("Pessoa excluída com sucesso.", true);
          });
        }
      });
    },
    // addJob() {
    //   this.$validator.validateAll().then(isValid => {
    //     if (isValid) {
    //       PersonAPI.addJob(this.getDataJob())
    //         .then(response => {
    //           this.showSuccessSwal("Trabalho adicionado com sucesso.");
    //           this.getRecord();
    //         })
    //         .catch(response => {
    //           this.showFailSwal("Não foi possível adicionar esse trabalho.");
    //         });
    //     } else {
    //       this.showFailSwal("Preencha todos os campos obrigatórios.");
    //     }
    //   });
    // },
    removePicture(picture) {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          PersonAPI.removePicture({
            personId: this.person.id,
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
    // getDataJob() {
    //   let data = {
    //     firstDate: reverseDate(this.job.firstDate),
    //     lastDate: reverseDate(this.job.lastDate),
    //     personId: this.$route.params.pessoaId,
    //     companyId: this.job.companyId,
    //     roleId: this.job.roleId
    //   };
    //   return data;
    // },
    resetUpload() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      this.currentStatus = STATUS_SAVING;

      return PersonAPI.uploadPicture(Number(this.$route.params.pessoaId), formData)
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
					if (err.message === "PAYLOAD_TOO_LARGE") this.showFailSwal("Arquivo muito grande.");
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
    getPerson() {
      let data = {
        personId: this.$route.params.pessoaId,
        visible: this.person.visible,
        civilName: nullToString(this.person.civilName),
        artistName: nullToString(this.person.artistName),
        gender: nullToString(this.person.gender),
        race: nullToString(this.person.race),
        expertise: nullToString(this.person.expertise),
        nationalityId: this.person.nationalityId,
				deathPlace: nullToString(this.person.deathPlace),
				birthPlace: nullToString(this.person.birthPlace),
        personalPath: nullToString(this.person.personalPath),
        professionalPath: nullToString(this.person.professionalPath),
        notes: nullToString(this.person.notes),
        bibliography: nullToString(this.person.bibliography),
        birthDate: reverseDate(this.person.birthDate),
        deathDate: reverseDate(this.person.deathDate)
      };
      return data;
    },
    getRecord() {
      PersonAPI.getRecord({ personId: this.$route.params.pessoaId })
        .then(response => {
					this.person = response.person;
					this.person.birthDate = formatDate(this.person.birthDate);
					this.person.deathDate = formatDate(this.person.deathDate);
					this.pictures = response.pictures;
					this.hideSpinnerModal();
          this.removeEvent();
          // this.jobs = response.jobs;
          // response.jobs.forEach(job => {
          //   job.firstDate = formatDate(job.firstDate);
          //   job.lastDate = formatDate(job.lastDate);
          // });
          // response.jobs.filter(job => {
          //   if (!(this.conceptionArray.indexOf(job.role) > -1)) {
					// 		this.performanceJob.push(job);
          //   } else {
          //     this.conceptionJob.push(job);
          //   }
          // });
        })
        .catch(error => {
					this.hideSpinnerModal();
          this.removeEvent();
          console.log(error);
          this.showFailSwal("Não foi possível acessar os dados dessa pessoa.");
        });
    },
    getEntries() {
      ListsAPI.getEntries({ listName: "Nationality" })
        .then(response => {
          this.nationalities = (response.entries);
          this.nationalities.sort(function(a, b) {
            return (a.name).localeCompare(b.name);
					});
        })
        .catch(error => {
          console.log(error);
        });

      ListsAPI.getEntries({ listName: "Role" })
        .then(response => {
					this.roles = response.entries;
					this.roles.sort(function(a, b) {
            return (a.name).localeCompare(b.name);
					});
					this.roles.filter(role =>{
						if ((this.conceptionArray.indexOf(role.name) > -1)){

							this.conceptionRoles.push(role);
						}else{
							this.performanceRoles.push(role);
						}
					})
        })
        .catch(error => {
          console.log(error);
        });
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
          this.$router.push("/pessoas");
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

let nullToString = function(data) {
  if (data === null) {
    return "";
  } else return data;
};

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
  if (date === null) return "";
  return date
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("/");
};
</script>

<style>
.tab-pane-1,
.tab-pane-2 {
  width: 100% !important;
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
  outline: 2px dashed grey; /* the dash box */
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
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: rgba(
    198,
    240,
    198,
    0.502
  ); /* when mouse over to the drop zone, change color */
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
