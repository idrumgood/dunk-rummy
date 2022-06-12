<script setup>
import { ref } from 'vue';

let allPlayers = ref([]);
const getAllPlayers = async (e) => {
  try {
    let response = await fetch('/.netlify/functions/get-all-players');
    response = await response.json();
    allPlayers = response.data;
    console.log(allPlayers);
  } catch (err) {
     console.error(err);
  }
}
</script>

<template>
  <v-card>
    <v-form>
      <v-card-title>Create a new game</v-card-title>
      <v-card-text>
        <p v-for="player in allPlayers">{{player.data.name}} has ID {{player.ref['@ref'].id}}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="getAllPlayers">Get all players</v-btn> 
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<style scoped>

</style>
