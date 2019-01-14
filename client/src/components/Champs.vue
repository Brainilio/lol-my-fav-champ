<template>
  <v-container>
    <add-champ></add-champ>
    <div id="show-champs">
      <h1>Champs</h1>
      <div v-for="champ in champs" v-bind:key="champ._id" class="single-champ">
        <h2>{{champ.name}}</h2>
        <h3>{{champ.lane}}</h3>
        <h4>{{champ.type}}</h4>
        <h5>{{champ.cost}}</h5>
        <v-icon small @click="deleteChamp(champ, champ._id)">delete</v-icon>
        <v-icon small class="mr-2" @click="editItem(champ)">edit</v-icon>
        <br>
        <br>
      </div>
    </div>
    <v-dialog dark color="white" v-model="dialog" max-width="500px">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.name" label="Champion Name"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.type" label="Champion Type"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.lane" label="Champion Lane"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.cost" label="Champion Cost"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="white" flat @click="close">Cancel</v-btn>
        <v-btn color="white" flat @click="save(editedItem, editedItem._id)">Save</v-btn>
      </v-card-actions>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import addChamp from "./addChamp";

export default {
  data() {
    return {
      dialog: false,
      champs: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        type: "",
        lane: "",
        cost: ""
      }
    };
  },
  components: {
    addChamp
  },
  methods: {
    deleteChamp(champs, _id) {
      const axios = require("axios");
      axios.delete("http://174.138.9.130:8000/champs/" + _id);
      this.champs.splice(this.champs.indexOf(champs), 1);
    },
    editItem(item) {
      this.editedIndex = this.champs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save(item, id) {
      const axios = require("axios");

      axios.put("http://174.138.9.130:8000/champs/" + id, {
        name: this.editedItem.name,
        type: this.editedItem.type,
        lane: this.editedItem.lane,
        cost: this.editedItem.cost
      });

      if (this.editedIndex > -1) {
        Object.assign(this.champs[this.editedIndex], this.editedItem);
      } else {
        this.champs.push(this.editedItem);
      }
      this.close();
    }
  },
  created() {
    const axios = require("axios");
    axios.get("http://174.138.9.130:8000/champs").then(response => {
      console.log(response.data);
      this.champs = response.data.items;
    });
  }
};
</script>

<style>
#show-champs {
  max-width: 800px;
  margin: 0 auto;
}

.single-champ {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}
</style>
