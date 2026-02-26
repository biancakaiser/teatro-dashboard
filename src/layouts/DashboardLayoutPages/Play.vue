<template>
  <div class="md-layout">
    <div class="md-layout md-layout-item md-size-100">
      <tabs
        :tab-name="['Dados','Concepções', 'Montagem', 'Fotos']"
        :tab-icon="['description','build','extension','photo_library']"
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
                  <h4 class="title">Edição da peça</h4>
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
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Título da peça</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="play.name" name="name" type="text" v-validate="'required'"></md-input>
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
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <!-- <code v-if="errors.has('originalName')">Nome inválido</code> -->
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Primeira exibição mundial</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="play.globalFirstDate" name="globalFirstDate"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('globalFirstDate')">Data inválida</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label
                    class="md-layout-item md-size-20 md-form-label"
                  >Primeira exibição em São Paulo</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="play.spFirstDate" name="spFirstDate" type="text"   ></md-input>
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
                      <md-textarea v-model="play.source" name="source" type="text"></md-textarea>
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

                <!-- <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Autor do texto</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-select v-model="play.authorId" name="person">
                        <md-option v-for="person in people" :value="person.id">{{person.artistName}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div> -->

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Id do Autor do texto</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="play.authorId" name="person"></md-input>
                    </md-field>
                  </div>
                </div>

                <br>
                <br>
              </md-card-content>

              <md-card-actions class="text-center">
                <md-button
                  native-type="submit"
                  @click.native.prevent="validate"
                  class="md-primary"
                >Atualizar</md-button>
                <md-button
                  native-type="submit"
                  @click.native.prevent="deletePlay"
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
                  <h4 class="title">Adicionar concepções</h4>
                </div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Id da Pessoa</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="conception.personId" name="person" v-validate="'required'"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('person')">Requerido</code>
                  </label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Ocupação</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-select v-model="conception.roleId" name="role" v-validate="'required'">
                        <md-option v-for="role in conceptionRoles" :value="role.id">{{role.name}}</md-option>
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
                    @click.native.prevent="addConception"
                    class="md-primary"
                  >Adicionar</md-button>
                </md-card-actions>
              </md-card-content>
            </md-card>

            <md-card v-for="conception in conceptions">
              <md-card-content>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Pessoa</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input disabled :value="conception.person.artistName"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Ocupação</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input disabled :value="conception.role.name"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <md-card-actions class="text-center">
                  <md-button
                    native-type="submit"
                    @click.native.prevent="removeConception(conception)"
                    class="md-danger"
                  >Excluir</md-button>
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
                  <h4 class="title">Adicionar montagem</h4>
                </div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Companhia</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-select v-model="setting.companyId" name="company" v-validate="'required'">
                        <md-option v-for="company in companies" :value="company.id">{{company.name}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right">
                    <code v-if="errors.has('company')">Companhia inválida</code>
                  </label>
                </div>

                <!-- <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Gênero</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-select v-model="setting.genreId" type="text">
                        <md-option v-for="genre in genres" :value="genre.id">{{genre.name}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div> -->

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Ano</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-mask="'####'" v-model="setting.year"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Tipo de espetáculo</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-select type="text" v-model="setting.kind" v-validate="'required'">
                        <md-option
                          v-for="{name, id} in kindsOfPlay" :value="id"
                        >{{name}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Idioma</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-select type="text" v-model="setting.languageId">
                        <md-option
                          v-for="language in languages"
                          :value="language.id"
                        >{{language.name}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <!-- <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Tradutor</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-select v-model="setting.translatorId" name="person">
                        <md-option v-for="person in people" :value="person.id">{{person.artistName}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div> -->

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Id do Tradutor</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="setting.translatorId" name="person"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Id do Adaptador</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input v-model="setting.adapterId" name="person"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <!-- <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Adaptador</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-select v-model="setting.adapterId" name="person">
                        <md-option v-for="person in people" :value="person.id">{{person.artistName}}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </!-->
              </md-card-content>
              <md-card-actions class="text-center">
                <md-button
                  native-type="submit"
                  @click.native.prevent="createSetting"
                  class="md-primary"
                >Adicionar</md-button>
              </md-card-actions>
            </md-card>
            <md-card v-for="setting in settings">
              <md-card-content>
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Companhia</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input disabled :value="setting.company.name"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <!-- <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Gênero</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input disabled :value="setting.genre"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div> -->
                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Tipo de espetáculo</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input disabled :value="setting.kind"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Ano</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input disabled :value="setting.year"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
                </div>

                <div class="md-layout">
                  <label class="md-layout-item md-size-20 md-form-label">Idioma</label>
                  <div class="md-layout-item">
                    <md-field>
                      <md-input disabled :value="setting.language"></md-input>
                    </md-field>
                  </div>
                  <label class="md-layout-item md-size-20 md-label-on-right"></label>
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

                <md-card-actions class="text-center">
                  <md-button
                    native-type="submit"
                    @click.native.prevent="details(setting)"
                    class="md-default"
                  >Detalhes</md-button>
                </md-card-actions>
              </md-card-content>
            </md-card>
          </form>
        </template>

        <template slot="tab-pane-4" class="md-large-size-100">
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
                  <form enctype="multipart/form-data" novalidate >
										<div class="dropbox">
											<input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
											 accept="image/*" class="input-file">
											<span style="padding-top:80px;">
												<p v-if="!isSaving">
													Arraste aqui as fotos<br> ou clique para abrir o pesquisador
												</p>
												<p v-if="isSaving">
													Salvando {{ fileCount }} foto(s)...
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

    <!-- <div v-if="modal" @close="hideModal" class="modal" id="modal-1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" > -->
    <modal v-if="modal" @close="hideModal" >
      <!-- <div class="modal-dialog" role="document">
        <div>
          <div class="modal-body-spinner">
            <circle4 id="spinner-circle"></circle4>
          </div>
        </div>
      </div> -->
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
import swal from "sweetalert2";
import PlayAPI from "@/api/Play.vue";
import ListsAPI from "@/api/Lists.vue";
import PersonAPI from "@/api/Person.vue";
import CompanyAPI from "@/api/Company.vue";
import SettingAPI from "@/api/Setting.vue";
import { Tabs, Modal } from "@/components";
import { Circle4 } from "vue-loading-spinner";
import ResourceAPI from "@/api/Resource.vue";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  components: {
    SlideYDownTransition,
    Tabs,
    Circle4,
    Modal
  },
  data() {
    return {
      play: {
        name: "",
        globalFirstDate: null,
        spFirstDate: null,
        pressReleases: "",
        pressReviews: "",
        bibliography: "",
        source: "",
        nationalityId: null,
        genreId: null,
        authorId: "",
        referencePlay: "",
				visible: 1,
				originalName: ''
      },
      setting: {
        companyId: "",
        playId: this.$route.params.pecaId,
        genreId: null,
        year: "",
        languageId: "",
        kind: "",
        translatorId: null,
        adapterId: null,
        translator: "",
        adapter: "",
      },
      nationalities: [],
      genres: [],
      languages: [],
      delete: false,
      companies: [],
      settings: [],
      conceptions: [],
      people: [],

      //copiado
      conception: {
        playId: this.$route.params.pecaId,
        personId: null,
        roleId: null
      },
      conceptionArray: [
        "Autor do texto",
        "Autor da música",
        // "Tradutor",
        "Arranjador da música",
        // "Adaptador"
      ],
      kindsOfPlay: [
        {name: "Sessões",
         id: 0}, // Sessions
        {name: "Palco e tela",
         id: 1}, // Stage_Screen
        {name: "Completo",
         id: 2} // Complete
      ],
      companies: [],
      nationalities: [],
      conceptionRoles: [],
      roles: [],
      conceptions: [],
      jobs: [],
      // modal: false,

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
    this.showModal();
    this.blockClick();
    this.getEntries();
    this.getRecord();
    CompanyAPI.getAll()
      .then(response => {
        this.companies = response.companys;
        this.companies.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
      })
      .catch(error => {
        console.log(error);
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
    updatePlay() {
      PlayAPI.update(this.getData())
        .then(response => {
          this.showSuccessSwal("Peça atualizada com sucesso.");
        })
        .catch(response => {
          this.showFailSwal("Não foi possível atualizar essa peça.");
          console.log(response.error);
        });
    },
    deletePlay() {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          PlayAPI.delete({ id: this.play.id }).then(response => {
            this.showSuccessSwal("Peça excluída com sucesso.", true);
          });
        }
      });
    },
    createSetting() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          switch (this.setting.kind) {
            case this.kindsOfPlay[0].id:
              this.setting.kind = "SESSIONS";
              break;
            case this.kindsOfPlay[1].id:
              this.setting.kind = "STAGE_SCREEN";
              break;
            case this.kindsOfPlay[2].id:
              this.setting.kind = "COMPLETE";
              break;
          }
          this.setting.translatorId = this.setting.translatorId ? this.setting.translatorId.split(',').map(function(item) {
              return item.trim();
            }).join(',') : null;
          this.setting.adapterId    = this.setting.adapterId ? this.setting.adapterId.split(',').map(function(item) {
              return item.trim();
            }).join(',') : null;

          let setting = this.setting;
          delete setting.translator;
          delete setting.adapter;
          SettingAPI.create(setting)
            .then(response => {
              this.showSuccessSwal("Montagem de peça criada com sucesso.");
              this.getRecord();
            })
            .catch(response => {
              this.showFailSwal(
                "Não foi possível criar essa montagem de peça."
              );
              console.log(response.error);
            });
        } else {
          this.showFailSwal("Preencha os campos obrigatórios.");
        }
      });
    },
    addConception() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          PlayAPI.addConception(this.conception)
            .then(response => {
              this.showSuccessSwal("Concepção adicionada com sucesso.");
              this.getRecord();
            })
            .catch(response => {
              this.showFailSwal("Não foi possível adicionar concepção.");
              console.log(response.error);
            });
        } else {
          this.showFailSwal("Preencha os campos obrigatórios.");
        }
      });
    },
    details(setting) {
      this.$router.push({path: `/montagem/${setting.id}`});
    },
    removePicture(picture) {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          PlayAPI.removePicture({
            playId: this.play.id,
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

      return PlayAPI.uploadPicture(this.$route.params.pecaId, formData)
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
      if(picture) {
        this.modal = true;
        this.picture.origin = picture.origin;
        this.picture.description = picture.description;
        this.picture.UUID = picture.UUID;
      }
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
    addConception() {
      PlayAPI.addConception(this.conception)
        .then(response => {
          this.showSuccessSwal("Concepção adicionada com sucesso.");
          this.getRecord();
        })
        .catch(error => {
          this.showFailSwal("Não foi possível adicionar essa concepção.");
        });
    },
    removeConception(conception) {
      this.showConfirmationSwal().then(result => {
        if (this.delete) {
          this.delete = false;
          PlayAPI.removeConception({
            playId: this.play.id,
            conceptionId: conception.id
          }).then(response => {
            this.showSuccessSwal("Concepção excluída com sucesso.");
            this.getRecord();
          });
        }
      });
    },
    getRecord() {
      PlayAPI.getRecord({ playId: this.$route.params.pecaId })
        .then(async response => {
          this.play = response.play;
          let settings = response.settings;
          this.conceptions = response.conceptions;
					this.pictures = response.pictures;

          for (let i = 0; i < settings.length; i++) {
            let setting = settings[i];

            switch (setting.kind) {
            case "SESSIONS":
              setting.kind = "Sessões";
              break;
            case "STAGE_SCREEN":
              setting.kind = "Palco e tela";
              break;
            case "COMPLETE":
              setting.kind = "Completo";
              break;
            default:
            }

            if (setting.translatorId){

                const translators  = setting.translatorId.split(',');

                const translatorNames = await Promise.all(translators.map(async translator => {
                  const value = await PersonAPI.getInfo({ personId: translator });

                  return value.person.artistName;
                }));
                setting.translator = translatorNames.join(', ');

            }

            if (setting.adapterId){

              const adapters  = setting.adapterId.split(',');

              const adapterNames = await Promise.all(adapters.map(async adapter => {
                const value = await PersonAPI.getInfo({ personId: adapter });

                return value.person.artistName;
              }));

              setting.adapter = adapterNames.join(', ');

            }
          }

          this.settings = settings;
          this.orderConceptions();
          this.hideModal();
          this.removeEvent();
					this.hideSpinnerModal();
        })
        .catch(response => {
          this.hideModal();
					this.hideSpinnerModal();
          this.removeEvent();
          this.showFailSwal("Não foi possível acessar os dados dessa peça.");
        });
    },
    orderConceptions() {
      this.conceptions.sort((a, b) => {
        return a.person.artistName.localeCompare(b.person.artistName);
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
      ListsAPI.getEntries({ listName: "Language" })
        .then(response => {
          this.languages = response.entries;
          this.languages = this.orderString(this.languages);
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
          this.roles.filter(role => {
            if (this.conceptionArray.indexOf(role.name) > -1) {
              this.conceptionRoles.push(role);
            }
          });
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
    getData() {
      let data = {
        playId: this.$route.params.pecaId,
        originalName: this.play.originalName,
        pressReleases: nullToString(this.play.pressReleases),
        pressReviews: nullToString(this.play.pressReviews),
        bibliography: nullToString(this.play.bibliography),
        source: nullToString(this.play.source),
        nationalityId: this.play.nationalityId,
        genreId: this.play.genreId,
        spFirstDate: this.play.spFirstDate,
        globalFirstDate: this.play.globalFirstDate,
        authorId: stringToNull(this.play.authorId),
        referencePlay: nullToString(this.play.referencePlay),
				visible: this.play.visible,
				name : this.play.name
      };
      return data;
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
  if (date !== null && date !== "") {
    return date
      .split("/")
      .reverse()
      .join("-");
  }
  return null;
};

let formatDate = function(date) {
  if (date === null) return null;
  return date
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("/");
};

let nullToString = function(data) {
  if (data === null) {
    return "";
  } else return data;
};

let stringToNull = function(data) {
  if (data === "") {
    return null;
  } else return data;
};
</script>

<style>
.tab-pane-1, .tab-pane-2, .tab-pane-3, .tab-pane-4 {
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



