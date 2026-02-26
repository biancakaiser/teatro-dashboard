<template>
<div>
  <label class="md-layout-item md-size-20 md-form-label">
    {{ label }}
  </label>
  <div class="md-layout-item">
    <md-field :class="[
      {'md-error': errors.has('required')},
      {'md-valid': !errors.has('required')}]">
      <md-input
        v-model="name"
        type="text"
        v-validate="'required'"
        :name="name"
        :disabled="disabled">
      </md-input>
      <slide-y-down-transition>
        <md-icon class="error" v-show="errors.has('required')">close</md-icon>
      </slide-y-down-transition>
      <slide-y-down-transition>
        <md-icon class="success" v-show="!errors.has('required') && touched.required">done</md-icon>
      </slide-y-down-transition>
      <span class="md-error">{{ errorMessage }}</span>
    </md-field>
  </div>
</div>
</template>


<script>
export default {
  name: "validated-input",
  model: {
    prop: "checked"
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    name: String,
    title: String,
    icon: String,
    disabled: Boolean
  },
  methods: {
    updateValue() {
      this.$emit("input", !this.checked);
    }
  }
};
</script>
<style>
</style>
