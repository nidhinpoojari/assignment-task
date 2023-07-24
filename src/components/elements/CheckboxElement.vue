<script>
export default {
  props: {
    label: String,
    type: String,
    formFields: Array,
    preview: Boolean,
  },
  data() {
    // Setting up the initial data properties for the component
    const defaultValidation =
      this.formFields && this.formFields.length > 0
        ? this.formFields[0].validation
        : {};

    return {
      isRequired: defaultValidation ? defaultValidation.required : false, // Whether the input field is required or not
      showErrorMessage: false, // Flag to control displaying error messages
      errorMessage: "",
      inputStyle: "",
      selected: false,
    };
  },
  methods: {
    // Method triggered when the input is invalid (e.g., required field not filled)
    onInvalidInput(event) {
      this.showErrorMessage = true;
      this.errorMessage = event.target.validationMessage;
      this.inputStyle = "border: 1px solid red";
    },
    // Method to clear error messages and styles when the input is changed
    clearErrorMsg() {
      this.inputStyle = "";
      this.errorMessage = "";
    },
  },
};
</script>

<template>
  <!-- Form input field using Bootstrap styling -->
  <div class="mb-3 form-check">
    <input
      :type="type"
      class="form-check-input"
      :required="isRequired"
      :id="label"
      v-model="selected"
      :disabled="preview"
      @invalid="onInvalidInput"
      :style="inputStyle"
      @change="clearErrorMsg()"
    />
    <!-- Displaying the label of the input field -->
    <label class="form-check-label" :for="label">{{ label }}</label>
    <!-- Displaying the error message if the showErrorMessage is true -->
    <p v-if="showErrorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
