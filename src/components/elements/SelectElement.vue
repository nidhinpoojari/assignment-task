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
    // Setting up the initial data properties for the component
    const defaultValidation =
      this.formFields && this.formFields.length > 0
        ? this.formFields[0].validation
        : {};

    return {
      options: this.formFields.length > 0 ? this.formFields[0].options : [], // Array of options for the select input
      isRequired: defaultValidation ? defaultValidation.required : false, // Whether the input field is required or not
      multiselect:
        this.formFields.length > 0 ? this.formFields[0].multiple : false, // to check whether it's multiselect or not
      selectedOptions: [], // Array to store selected options
      showErrorMessage: false, // Flag to control displaying error messages
      errorMessage: "",
      showOptions: false,
      inputStyle: "",
      searchInput: "", // The input used to filter options in the multi-select dropdown
    };
  },
  computed: {
    // Computed property to filter options based on searchInput in the multi-select dropdown
    filteredOptions() {
      return this.options.filter((opt) => {
        return opt.toLowerCase().includes(this.searchInput.toLowerCase());
      });
    },
  },

  methods: {
    // Method called when the input value is invalid & show the error message and handle styles.
    onInvalidInput(event) {
      this.showErrorMessage = true;
      this.errorMessage = event.target.validationMessage;
      this.inputStyle = "border: 1px solid red";
    },

    // Method called to clear the error message and reset the input style when the user tries to input after an error
    clearErrorMsg() {
      this.inputStyle = "";
      this.errorMessage = "";
    },

    // Method to toggle the selection of an option in the multi-select dropdown
    toggleOption(option) {
      const index = this.selectedOptions.indexOf(option);
      if (index > -1) {
        // If the option is already selected, remove it from the selectedOptions array
        this.selectedOptions.splice(index, 1);
      } else {
        // If the option is not selected, add it to the selectedOptions array
        this.selectedOptions.push(option);
      }
      // Clear the error message when the user selects an option
      this.clearErrorMsg();
      this.$emit("selected", this.selectedOptions); // Emitting the selected options as an event
    },

    // Method to toggle the visibility of the dropdown options in the multi-select dropdown
    toggleOptions() {
      this.showOptions = !this.showOptions;
      this.searchInput = "";
    },

    // Method to handle the "Select All" functionality for the multi-select dropdown
    selectAllOptions() {
      this.selectedOptions.length === this.filteredOptions.length ||
      this.selectedOptions.length > 0
        ? (this.selectedOptions = [])
        : (this.selectedOptions = this.filteredOptions);
      // Clear the error message when the selection changes
      this.clearErrorMsg();
      this.$emit("selected", this.selectedOptions); // Emitting the selected options as an event
    },
  },
};
</script>

<template>
  <div class="mb-3">
    <label :for="label" class="form-label">{{ label }}</label>
    <!-- Conditionally render the multi-select dropdown or single select dropdown -->
    <div v-if="multiselect">
      <!-- Multi-select dropdown -->
      <div v-if="preview == false" class="multiselect" :style="inputStyle">
        <!-- Button to toggle the visibility of the dropdown options -->
        <button type="button" class="form-select" @click="toggleOptions">
          {{
            selectedOptions.length > 0
              ? selectedOptions.length + " items selected"
              : "Select"
          }}
        </button>
        <!-- Dropdown options list -->
        <ul
          class="select-options form-control"
          :class="{ visible: showOptions }"
        >
          <!-- Input field to search and filter options -->
          <li>
            <input
              type="text"
              v-model="searchInput"
              class="form-control"
              placeholder="Search..."
            />
          </li>
          <!-- "Select All" or "Clear All" link based on the selectedOptions -->
          <li>
            <a class="select-all" type="button" @click="selectAllOptions">
              {{
                selectedOptions.length === filteredOptions.length ||
                selectedOptions.length > 0
                  ? "Clear All"
                  : "Select All"
              }}
            </a>
          </li>
          <!-- Individual options with checkboxes -->
          <li
            v-for="(option, index) in filteredOptions"
            :key="option + index"
            @click="toggleOption(option)"
          >
            <input
              type="checkbox"
              :name="label"
              class="form-check-input"
              :id="label + index"
              :value="option"
              v-model="selectedOptions"
              :required="isRequired && selectedOptions.length === 0"
              :disabled="preview"
              @invalid="onInvalidInput"
              :style="inputStyle"
              @change="clearErrorMsg()"
            />
            <span class="select-option">{{ option }}</span>
          </li>
        </ul>
      </div>
      <!-- Display the selected options in a textarea for preview mode -->
      <div class="multiselect" v-else>
        <textarea
          type="text"
          class="form-control"
          :disabled="preview"
          :value="selectedOptions.join(', ')"
        />
      </div>
    </div>
    <!-- Single select dropdown -->
    <select
      v-else
      class="form-select"
      :aria-label="label"
      v-model="selectedOptions"
      :required="isRequired && selectedOptions.length === 0"
      :disabled="preview"
      @invalid="onInvalidInput"
      :style="inputStyle"
      @change="clearErrorMsg()"
    >
      <!-- Rendering individual options in the select dropdown -->
      <option
        v-for="(option, index) in options"
        :key="option + index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <!-- Display the error message when the input is invalid -->
    <p v-if="showErrorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
