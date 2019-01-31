<template>
  <div id="single-champ">
    <v-card class="mx-auto" color="green" dark width="400">
      <v-card-title>
        <span class="title font-weight-light">{{champ.name}}</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        <ul>Lane: {{champ.lane}}</ul>
        <ul>Type: {{champ.type}}</ul>
      </v-card-text>

      <v-card-actions>
        <v-list-tile class="grow">
          <v-list-tile-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              src="https://vignette.wikia.nocookie.net/leagueoflegends/images/1/12/League_of_Legends_Icon.png/revision/latest?cb=20150402234343"
            ></v-img>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/">Go back</router-link>
            </v-list-tile-title>
          </v-list-tile-content>

          <v-layout align-center justify-end>
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">Cost</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-share-variant</v-icon>
            <span class="subheading">{{champ.cost}}</span>
          </v-layout>
        </v-list-tile>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      champ: {}
    };
  },
  created() {
    const axios = require("axios");
    axios.get("http://174.138.9.130:8000/champs/" + this.id).then(response => {
      console.log(response.data);
      this.champ = response.data;
    });
  },
  components: {}
};
</script>

<style>
#single-champ {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
