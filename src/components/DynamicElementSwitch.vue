<script>
// Importing necessary form-field component files
import inputElement from "./elements/InputElement.vue";
import checkboxElement from "./elements/CheckboxElement.vue";
import selectElement from "./elements/SelectElement.vue";
import radioElement from "./elements/RadioElement.vue";

export default {
  // Props received from the parent component
  props: {
    elementLabels: Array,
    elementTypes: Array,
    formFields: Array,
    preview: Boolean,
  },

  data() {
    return {
      formFieldValues: {}, // Object to store the values of form fields
      selectedOption: [],
    };
  },

  methods: {
    // Function to get the component based on its type
    getComponent(type) {
      switch (type) {
        case "text":
        case "date":
        case "number":
        case "email":
          return inputElement; // Returns inputElement component for text, date, number, and email types
        case "array":
          return selectElement; // Returns selectElement component for array type
        case "checkbox":
          return checkboxElement; // Returns checkboxElement component for checkbox type
        case "radio":
          return radioElement; // Returns radioElement component for radio type
        default:
          return null; // Returns null for unknown types
      }
    },
    // Function to get form fields for a specific label
    getFormFields(label) {
      return this.formFields.filter((field) => field.label == label);
    },
    // handleSelect(label, event) {
    //   this.$emit("select-emitted", label, event); // Emits 'input-emitted' event with label and event data
    // },
    // Function to handle user input and emit an event to the parent component
    handleInput(label, event) {
      this.$emit("input-emitted", label, event); // Emits 'input-emitted' event with label and event data
    },
  },
};
</script>

<template>
  <div>
    <!-- Loop through each element type and create corresponding components dynamically -->
    <component
      v-for="(type, index) in elementTypes"
      :key="index"
      :is="getComponent(type)"
      :label="elementLabels[index]"
      :type="type"
      :preview="preview"
      @input="
        handleInput(
          elementLabels[index],
          type == 'checkbox' ? $event.target.checked : $event.target.value
        )
      "
      @selected="handleInput(elementLabels[index], $event)"
      :formFields="getFormFields(elementLabels[index])"
    ></component>
  </div>
</template>
