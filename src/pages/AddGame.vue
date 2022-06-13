<script setup>
import { reactive } from 'vue';

let allPlayers = reactive([]);
const getAllPlayers = async (e) => {
  try {
    let response = await fetch('/.netlify/functions/get-all-players');
    response = await response.json();
    allPlayers.push(...response);
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
        <p v-for="player in allPlayers">{{player.name}} has ID {{player.id}}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="getAllPlayers">Get all players</v-btn> 
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<style scoped>

</style>
