<script>
// Importing the sample data from a JSON file, and other required components and data.
import sampleJon from "./sampleData.json";
import DynamicElement from "./components/DynamicElementSwitch.vue";
import { formFields } from "./formFields";

export default {
  components: {
    DynamicElement,
  },
  data() {
    // Initializing the component's data with labels, types, and form field data
    const labels = Object.keys(sampleJon);
    const types = Object.values(sampleJon);
    // Filtering the available form fields based on the labels present in the sample data
    const formFieldData = formFields.filter((field) =>
      labels.includes(field.label)
    );
    // Initializing the component's data
    return {
      preview: false,
      labels,
      types,
      formFieldData,
      formFieldValues: {},
    };
  },
  methods: {
    // Method to handle emitted data of form fields from child componenet
    handleInput(label, event) {
      // Check if the event data is an array (multi-select) or a single value (single-select)
      if (Array.isArray(event)) {
        // For multi-select, update the formFieldValues object with the selected options array
        this.formFieldValues[label] = event;
      } else {
        // For single-select/other input values, update the formFieldValues object with the selected single value
        this.formFieldValues[label] = event;
      }
    },
    // Method to submit the form and save the data to localStorage
    submitForm() {
      if (Object.keys(this.formFieldValues).length > 0) {
        // Retrieving any existing form data from localStorage, or initializing an empty array
        let existingFormData =
          JSON.parse(localStorage.getItem("formData")) || [];
        // Adding the current formFieldValues object to the array of existing form data
        existingFormData.push(this.formFieldValues);
        // Saving the updated form data back to localStorage
        localStorage.setItem("formData", JSON.stringify(existingFormData));
        alert("Form data saved successfully!");
        // Reloading the page after form submission to clear data present in form
        window.location.reload();
      } else {
        alert("Please fill out the form before submitting.");
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="image-side">
      <img src="./assets/assignment.png" alt="Image" />
    </div>
    <div class="form-side">
      <div class="form-header">
        <h3>Employee Form</h3>
        <div class="btn-group">
          <!-- Buttons to toggle between Edit and Preview mode -->
          <button
            class="btn"
            :class="preview == false ? 'main-btn' : 'sec-btn'"
            @click="preview = false"
          >
            Edit
          </button>
          <button
            class="btn"
            :class="preview == true ? 'main-btn' : 'sec-btn'"
            @click="preview = true"
          >
            Preview
          </button>
        </div>
      </div>
      <div class="scrollable-content">
        <form @submit.prevent="submitForm">
          <dynamic-element
            :elementLabels="labels"
            :elementTypes="types"
            :formFields="formFieldData"
            :preview="preview"
            @input-emitted="handleInput"
          ></dynamic-element>
          <button type="submit" class="btn submit-btn">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
