<script>
export default {
  // Props received from the parent component
  props: {
    label: String,
    type: String,
    formFields: Array,
    preview: Boolean,
  },

  data() {
    // Setting up the initial data for the radio button form field component
    const defaultValidation =
      this.formFields && this.formFields.length > 0
        ? this.formFields[0].validation
        : {};
    return {
      options: this.formFields.length > 0 ? this.formFields[0].options : [],
      selectedOption: null,
      isRequired: defaultValidation ? defaultValidation.required : false,
      showErrorMessage: false,
      errorMessage: "",
      inputStyle: "",
    };
  },

  methods: {
    // Method called when the input value is invalid to show error msg and handle styles.
    onInvalidInput(event) {
      this.showErrorMessage = true;
      this.errorMessage = event.target.validationMessage;
      this.inputStyle = "border: 1px solid red";
    },

    // Method called to clear the error message and reset the input style when user trying to input after error
    clearErrorMsg() {
      this.inputStyle = "";
      this.errorMessage = "";
    },
  },
};
</script>

<template>
  <div class="mb-2">
    <!-- Label for the radio button form field -->
    <label :for="label" class="form-label col-sm-2 col-md-2">{{ label }}</label>
    <div class="col-sm-9 col-md-10">
      <!-- Loop through each option and create a set of radio buttons dynamically -->
      <div
        class="form-check form-check-inline"
        v-for="(option, index) in options"
        :key="index"
      >
        <!-- Radio button input -->
        <input
          class="form-check-input"
          :type="type"
          :name="label"
          :required="isRequired"
          :id="'inlineRadio' + index"
          :value="option"
          :disabled="preview"
          v-model="selectedOption"
          @invalid="onInvalidInput"
          :style="inputStyle"
          @change="clearErrorMsg()"
        />
        <label :for="'inlineRadio' + index" class="form-check-label">{{
          option
        }}</label>
      </div>
    </div>
    <!-- Display the error message when the input is invalid -->
    <p v-if="showErrorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
