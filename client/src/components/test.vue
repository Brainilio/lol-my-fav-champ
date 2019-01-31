<template>
  <v-container>
    <h1 v-for="(item, index) in champs" :key="index">{{item.name}}</h1>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Test",
  mounted() {
    this.$store.dispatch("loadPosts");
  },
  computed: {
    ...mapState(["champs"])
  }
};
</script>


<style>
</style>
