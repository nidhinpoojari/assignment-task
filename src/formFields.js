// Define the form fields with their respective options and selection type
export const formFields = [
  {
    label: "Name",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    label: "Email",
    validation: {
      required: true,
    },
  },
  {
    label: "DOB",
    validation: {
      required: true,
      max:new Date().toISOString().split('T')[0],
    },
  },
  {
    label: "Phone no.",
    validation: {
      required: true,
      pattern: "^[0-9]{10}$",
      maxLength: 10,
      minLength: 10,
    },
  },
  {
    label: "Address",
    textBox: true,
    validation: {
      required: true,
      minLength: 5,
      maxLength: 100,
    },
  },
  {
    label: "Age",
    validation: {
      required: true,
      min: 18,
      max: 100,
    },
  },
  {
    label: "Gender",
    options: ["Male", "Female", "Other"],
    validation: {
      required: true,
    },
  },
  {
    label: "Are you currently working?",
    validation: {
      required: false,
    },
  },
  {
    label: "Job Title",
    validation: {
      required: true,
    },
  },
  {
    label: "Work Schedule",
    options: ["Full Time", "Part Time", "Remote"],
    multiple: false,
    validation: {
      required: true,
    },
  },
  {
    label: "Skills",
    options: [
      "Programming",
      "Web Development",
      "Graphic Design",
      "Data Analysis",
      "Project Management",
      "Communication",
      "Teamwork",
      "Problem Solving",
      "Critical Thinking",
      "Creativity",
      "Adaptability",
      "Leadership",
      "Customer Service",
      "Time Management",
      "Multitasking",
      "Analytical Skills",
      "Presentation",
      "Active Listening",
      "Research",
    ],
    multiple: true,
    validation: {
      required: true,
    },
  },
  {
    label: "Interests",
    textBox: true,
    validation: {
      required: false,
    },
  },
];
