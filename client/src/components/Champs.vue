<template>
  <v-container>
    <!-- Button for champion form -->
    <v-btn fab small color="blue" @click="addclick">
      <v-icon>add</v-icon>
    </v-btn>

    <!-- Pop-up form for champion  -->
    <v-dialog v-model="form" dark color="white" max-width="500px">
      <v-card>
        <div class="container">
          <v-form if="!submitted" dark color="white" ref="form" lazy-validation>
            <h1>Add a champion:</h1>
            <v-text-field
              v-model="namepost"
              :counter="10"
              :rules="nameRules"
              label="Name"
              color="white"
              required
            ></v-text-field>
            <v-text-field
              v-model="typepost"
              :counter="10"
              :rules="nameRules"
              label="Type"
              color="white"
              required
            ></v-text-field>
            <v-text-field
              v-model="lanepost"
              :counter="10"
              :rules="nameRules"
              label="Lane"
              color="white"
              required
            ></v-text-field>
            <v-text-field
              v-model="costpost"
              :counter="10"
              :rules="nameRules"
              label="Cost"
              color="white"
              required
            ></v-text-field>
            <br>
            <v-btn color="primary" @click="post">Add</v-btn>
            <v-btn color="red" @click="closepost" class="right">Cancel</v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>

    <!-- After a succesful post you will get a thank you for posting dialog  -->
    <v-dialog dark color="white" v-model="submitted" max-width="500px">
      <v-card>
        <v-card-title>Thank you for posting!</v-card-title>
      </v-card>
    </v-dialog>

    <!-- This is the list of champions that are displayed  -->
    <div id="show-champs">
      <h1>League of Legends champions:</h1>

      <div v-for="champ in displayedPosts" v-bind:key="champ._id" class="single-champ">
        <router-link v-bind:to="'/' + champ._id">
          <h1>{{champ.name}}</h1>
        </router-link>
        <v-icon
          class="mr-2"
          v-ripple="{ center: true }"
          @click="viewItem(champ, champ._id)"
        >touch_app</v-icon>
        <!-- Popup for details champion -->
        <v-icon class="mr-2" v-ripple="{ center: true }" @click="editItem(champ)">edit</v-icon>
        <!-- Edit champion -->
        <v-icon
          class="mr-2"
          v-ripple="{ center: true }"
          @click="deleteChamp(champ, champ._id)"
        >delete</v-icon>
        <!-- Delete champion -->
        <br>
        <br>
      </div>
    </div>

    <!-- Pagination  -->
    <div id="pagination" class="text-xs-center">
      <v-pagination v-model="page" :length="Math.ceil(this.champs.length / this.perPage)"></v-pagination>
    </div>

    <!-- Dialog for details champion -->
    <v-dialog dark color="white" v-model="view" max-width="500px">
      <v-card>
        <v-card-title class="headline black lighten-2" primary-title>{{editedItem.name}}</v-card-title>
        <v-card-text>
          {{editedItem.name}} is een champion uit het spel League of Legends. De champion is een {{editedItem.type}} en speelt op de {{editedItem.lane}} lane.
          Deze champion kost {{editedItem.cost}}.
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Edit form for champion -->
    <v-dialog dark color="white" v-model="dialog" max-width="500px">
      <v-card>
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
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      //catching form data for posting
      namepost: "",
      typepost: "",
      lanepost: "",
      costpost: "",

      //validation for post form data
      nameRules: [
        v => !!v || "required!",
        v => (v && v.length <= 10) || "Must be less than 10 characters"
      ],
      submitted: false, // dialog for succesfully submitting the post
      dialog: false, // dialog for edititng the post
      view: false, // dialog for viewing the post
      form: false, // dialog for posting the post
      champs: [], // array for champs that will be pulled from API
      //edit item
      editedIndex: -1,
      editedItem: {
        name: "",
        type: "",
        lane: "",
        cost: ""
      },
      //pagination
      page: 1,
      perPage: 5,
      pages: []
    };
  },
  components: {},
  methods: {
    //posting item
    post: function() {
      var self = this;
      const axios = require("axios");
      axios
        .post("http://174.138.9.130:8000/champs", {
          name: this.namepost,
          type: this.typepost,
          lane: this.lanepost,
          cost: this.costpost
        })
        .then(function(response) {
          console.log(response);
          self.champs.push(response.data);
          self.submitted = true;

          self.namepost = "";
          self.typepost = "";
          self.lanepost = "";
          self.costpost = "";
        })

        .catch(function(error) {
          console.log(error);
        });
    },
    // delete Item
    deleteChamp(champs, _id) {
      const axios = require("axios");
      axios.delete("http://174.138.9.130:8000/champs/" + _id);
      this.champs.splice(this.champs.indexOf(champs), 1);
    },
    // view Item
    viewItem(champs, _id) {
      const axios = require("axios");
      axios.get("http://174.138.9.130:8000/champs/" + _id);
      this.editedIndex = this.champs.indexOf(champs);
      this.editedItem = Object.assign({}, champs);
      this.view = true;
      console.log(this.editedItem);
    },

    //edit item box that opens
    editItem(item) {
      this.editedIndex = this.champs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    //closing the dialog again
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    //when editing item and saving it
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
    },

    //closing the post form
    closepost() {
      this.form = false;
    },
    //adding the post and submitting it
    addclick() {
      this.form = true;
    },

    //pagination
    setPages() {
      let numberOfPages = Math.ceil(this.champs.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(champs) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return champs.slice(from, to);
    },
    totalPages() {
      return Math.ceil(this.champs.length / this.perPage);
    }
  },
  // pulling data from API
  created() {
    const axios = require("axios");
    axios.get("http://174.138.9.130:8000/champs").then(response => {
      console.log(response.data);
      this.champs = response.data.items;
    });
  },

  //pagination
  watch: {
    posts() {
      this.setPages();
    }
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.champs);
    }
  }
};
</script>

<style>
#show-champs {
  max-width: 500px;
  margin: 0 auto;
}

.single-champ {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}

#pagination {
  position: fixed;
  height: 30px;
  bottom: 30px;
  left: 0;
  width: 100%;
}
</style>
