<template>
  <v-container>
    <v-form if="!submitted" ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

      <v-text-field v-model="type" :rules="nameRules" label="Type" required></v-text-field>

      <v-text-field v-model="lane" :rules="nameRules" label="Lane" required></v-text-field>

      <v-text-field v-model="cost" :rules="nameRules" label="Cost" required></v-text-field>

      <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
      <v-btn :disabled="!valid" color="primary" v-on:click.prevent="post">Add</v-btn>

      <v-btn color="error" @click="reset">Reset Form</v-btn>
      <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
    </v-form>
    <div v-if="submitted">Thanks for posting a champion!</div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    type: "",
    lane: "",
    cost: "",
    nameRules: [
      v => !!v || "required!",
      v => (v && v.length <= 10) || "Must be less than 10 characters"
    ],
    submitted: false
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    post: function() {
      const axios = require("axios");
      axios
        .post("http://174.138.9.130:8000/champs", {
          name: this.name,
          type: this.type,
          lane: this.lane,
          cost: this.cost
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>
