<template>
  <div style="margin-top: -2rem;">
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <h2>{{ isEditing ? 'Editar' : 'Nova' }} página</h2>
      <div style="display:flex;gap:1rem;">
				<md-button v-if="isEditing" class="md-just-icon md-danger md-simple" @click.native="deletePage">
					<md-icon>delete</md-icon>
				</md-button>
        <md-button style="max-height:fit-content;" @click="preview">
          Visualizar
        </md-button>
        <md-button class="md-accent" style="max-height:fit-content;" @click="save">
          Salvar
        </md-button>

      </div>
    </div>
    <md-field class="md-layout-item mx-auto">
      <label>Título</label>
      <md-input v-model="page.title" v-validate="'alpha_spaces|required|min:3'" ></md-input>
    </md-field>

    <md-field class="md-layout-item mx-auto">
      <label>Descrição</label>
      <md-input v-model="page.description" v-validate="'alpha_spaces'"></md-input>
    </md-field>

    <VueEditor v-model="page.content" style="margin-inline: auto; margin-block: 2rem; min-width: calc(100% - 2rem);"
      :custom-modules="customEditorModules" :editor-options="customEditorOptions" :editor-toolbar="customToolbar" :useCustomImageHandler="true" @image-added="handleImage"/>

    <modal v-if="showPreview" @close="hidePreview">
        <template slot="header">
          <h4 class="modal-title">Pré-visualização</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="hidePreview">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="ql-editor" style="overflow-y: scroll; height: 75%; max-height: 28rem;" v-html="page.content"> </div>
        </template>
    </modal>
  </div>
</template>

<script>
import { Modal } from "@/components";
import swal from "sweetalert2";
import PageAPI from "@/api/Page.vue";
import { VueEditor, Quill } from "vue2-editor";
import { ImageDrop } from "quill-image-drop-module";
import { TableCell, TableRow, Table, Contain, TableModule } from "quill-table";

var SizeStyle = Quill.import('attributors/style/size');
Quill.register(TableCell);
Quill.register(TableRow);
Quill.register(Table);
Quill.register(Contain);
Quill.register('modules/table', TableModule);
Quill.register(SizeStyle, true);
Quill.register("modules/imageDrop", ImageDrop);

const tableOptions = [];
for (let r = 1; r <= 10; r++) {
    for (let c = 1; c <= 2; c++) {
        tableOptions.push('newtable_' + r + '_' + c);
    }
}

export default {
  components: {
    VueEditor,
    Modal,
  },
  data() {
    return {
      page: {
        title: "",
        description: "",
        content: "",
      },
      customEditorOptions: {
        modules: {
          imageDrop: true,
          table: true,
        },
      },
      customToolbar:[
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'align': []}],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block', 'image', 'link'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'color': []}, {'background': []}],
        [{'font': []}],
        [{table: tableOptions}, {table: 'append-row'}, {table: 'append-col'}],
      ],
      customEditorModules:[
        { alias: "imageDrop", module: ImageDrop },
        { alias: "table", module: TableModule },
      ],
      pageId: "",
      isEditing: false,
      showPreview: false,
      delete: false,
    };
  },
  computed: {
  },
  methods: {
    hidePreview() {
      this.showPreview = false;
    },
    dataURIToBlob(base64String) {
      //separando o content-type e a string base64
      const splittedDataURI = base64String.split(",")
      // base64 string
      const byteString = splittedDataURI[0].indexOf('base64') >= 0 ? atob(splittedDataURI[1]) : decodeURI(splittedDataURI[1])
      // content-type string
      const mimeString = splittedDataURI[0].split(':')[1].split(';')[0]

      const uint8Array = new Uint8Array(byteString.length)

      for (let index = 0; index < byteString.length; index++) {
        uint8Array[index] = byteString.charCodeAt(1)
      }

      return new Blob([uint8Array], { type: mimeString })
    },
    handleImage: async function(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append("file", file, file.name)

      const { url } = await PageAPI.uploadImage(formData)

      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader()
    },
    async handleImageAdded(images) {
      for (const image of images) {
        const imageSource = String(image.src)
        const isLogoImage = imageSource.includes("img/logo.png")
        const isImageAlreadyUploaded = imageSource.includes("https://")

        if(!isLogoImage && !isImageAlreadyUploaded) {
          const blob = this.dataURIToBlob(imageSource)
          const formData = new FormData()
          formData.append("file", blob)

          const { url } = await PageAPI.uploadImage(formData)

          image.src = url
        }
      }
    },
    async save() {
      try {
        if(this.isEditing){
          const { page } = await PageAPI.update({
            title: this.page.title,//
            description: this.page.description,
            content: this.page.content,
            pageId: this.pageId
          });

          this.page = page;
        } else {
          const { page } = await PageAPI.create({...this.page});
          // eslint-disable-next-line no-console
          this.pageId = page.id;
          this.isEditing = true;
        }

        this.showSuccess().then(()=>{
          this.$forceUpdate();
        })

        this.$router.replace(`/pagina/${this.pageId}`);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("error:",error);
        this.showError();
      }
    },
    preview() {
      this.showPreview = true;
    },
    deletePage() {
      this.showConfirmation().then(() => {
        if(this.delete) {
          this.delete = false;
          PageAPI.delete(this.pageId)
            .then(() => this.$router.back() )
            .catch(() => this.showError("Erro ao deletar página"));
        }
      });
    },
    async loadData(){
      if(this.isEditing){
        try {
          const { page } = await PageAPI.getInfo(this.pageId);
          this.page = page;
        } catch(error) {
          // this.$router.back();
        }
      }
    },
    async showSuccess(message = "Página salva com sucesso", redirect = false) {
      return swal({
        title: "Sucesso",
        text: message,
        type: "success",
        confirmButtonClass: "md-button md-success",
        buttonsStyling: false,
        animation: false
      }).then(result => {
        if (redirect) {
          this.$router.push("/paginas");
        }
      });
    },
    async showError(message = "Houve um erro ao salvar a página") {
      return swal({
        title: "Erro",
        text: message,
        type: "error",
        confirmButtonClass: "md-button md-danger",
        buttonsStyling: false,
        animation: false
      });
    },
    async showConfirmation(
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
  mounted() {
    this.pageId = this.$router.currentRoute.params.pageId;
    this.isEditing = this.pageId !== "new";
    this.loadData();
  },
};
</script>

<style lang="css">
.modal-container {
  max-width: 56rem;
  max-height: 36rem;
  height: 100%;
  margin: auto;
}
</style>
