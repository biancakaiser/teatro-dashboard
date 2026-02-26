<template>
<form class="md-layout md-layout-item md-size-100">
            <md-card>
              <md-card-header class="md-card-header-text md-card-header-accent">
                <div class="card-text">
                  <h4 class="title">Patrocinadores</h4>
                </div>
              </md-card-header>
              <md-card-content class="md-card-content md-layout">
                <div v-for="(item, index) in sponsors" :key="index" class="resource-container md-layout-item md-size-33 md-xsmall-size-100">
                  <div class="image-container product-resource">
                    <span style="display: inline-block;height: 100%;vertical-align: middle;"></span>
                    <img :src="item.url" title="">
                  </div>
                  <md-button class="md-icon-button md-danger resource-button md-raised" @click="removeSponsor(item)">
                    <md-icon>clear</md-icon>
                  </md-button>
                  <div class="picture-info">
                    <md-field>
                      <label>Descrição</label>
                      <md-input :value="item.description" @blur="updateSponsor(item,'description',$event)"></md-input>
                    </md-field>
                    <md-field class="source-input">
                      <label>Fonte</label>
                      <md-input :value="item.origin" @blur="updateSponsor(item,'origin',$event)"></md-input>
                    </md-field>
                  </div>
                </div>
                <div class="md-layout-item md-size-33 md-xsmall-size-100">
                  <form enctype="multipart/form-data" novalidate>
                    <div class="dropbox">
                      <input type="file" multiple name="file" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                        accept="image/png,image/jpg,image/jpeg" class="input-file">
                      <span style="padding-top:80px;">
                        <p>
                          Arraste aqui a logo do patrocinador
                        </p>
                      </span>
                    </div>
                  </form>
                </div>
              </md-card-content>
            </md-card>
    </form>
</template>

<script>
import SponsorsAPI from "@/api/Sponsor.vue";

export default {
  data() {
    return {
      sponsors:[],
      description:"",
      origin:"",
    }
  },
  methods:{
    async removeSponsor(sponsor) {
      try {
        await SponsorsAPI.delete(sponsor.id);
      } catch(err){
        console.error("error",err);
      }
      this.loadSponsors()
    },
    async updateSponsor(sponsor,field,{target:{value}}){
      sponsor[field] = value;
      try {
        await SponsorsAPI.update(sponsor);
      } catch(err){
        // eslint-disable-next-line no-console
        console.log("error",err);
      }

      this.loadSponsors()
    },
    async loadSponsors() {
      try {
        const { sponsors } = await SponsorsAPI.list();
        this.sponsors = sponsors;
      } catch(err){
        // eslint-disable-next-line no-console
        console.log("error",err);
      }
    },
    async save(formData) {
      try {
        await SponsorsAPI.uploadPicture(formData);
      } catch(err) {
        console.log("error",err);
      }

      this.loadSponsors();
    },
    filesChange(fieldName, fileList) {
      if (!fileList.length) return;

      Array.from(Array(fileList.length).keys()).map(index => {
        let formData = new FormData();
        formData.append(fieldName, fileList[index], fileList[index].name);
        this.save(formData);
      });
    },
  },
  mounted() {
    this.loadSponsors();
  }
}
</script>
