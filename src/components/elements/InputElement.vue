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
    // Setting up the initial data for the form field component
    const defaultValidation =
      this.formFields && this.formFields.length > 0
        ? this.formFields[0].validation
        : {}; // Get the default validation object from the first form field (if available)
    return {
      value: "",
      elementTag:
        this.formFields.length > 0
          ? this.formFields[0].textBox
            ? "textarea" // Determine the element type based on the 'textBox' property of the first form field
            : "input"
          : "input", // Default to 'input' if there are no form fields
      validations: defaultValidation, // Object containing validation rules for the form field
      isRequired: defaultValidation ? defaultValidation.required : false,
      maxLength: defaultValidation ? defaultValidation.maxLength : undefined,
      minLength: defaultValidation ? defaultValidation.minLength : undefined,
      max: defaultValidation ? defaultValidation.max : undefined,
      min: defaultValidation ? defaultValidation.min : undefined,
      pattern: defaultValidation ? defaultValidation.pattern : undefined,
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
  <div class="mb-3">
    <!-- Label for the form element -->
    <label :for="label" class="form-label">{{ label }}</label>
    <!-- Dynamic rendering of the form element based on the 'elementTag' data -->
    <component
      :is="elementTag"
      class="form-control"
      :id="label"
      :name="label"
      :type="type"
      :required="isRequired"
      v-model="value"
      :pattern="pattern"
      :maxlength="maxLength"
      :minlength="minLength"
      :max="max"
      :min="min"
      :disabled="preview"
      @invalid="onInvalidInput"
      :style="inputStyle"
      @input="clearErrorMsg()"
    />
    <!-- Display the error message when the input is invalid -->
    <p v-if="showErrorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
