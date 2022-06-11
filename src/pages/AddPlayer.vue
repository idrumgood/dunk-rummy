<script setup>
import { ref } from 'vue';

let playerName = ref('');
let message = ref('');
const createPlayer = async (e) => {
  e.preventDefault();
  message = '';

  if(!playerName.value) {
    return;
  }

  try {
    const response = await fetch('/.netlify/functions/create-player', {
      body: JSON.stringify({ name: playerName.value }),
      method: 'POST',
    });
    message = await response.json();
  } catch (err) {
     console.error(err);
  }

  playerName.value = '';
}
</script>

<template>
  <v-card>
    <v-form>
      <v-card-title>Create a new player</v-card-title>
      <v-card-text>
        <v-text-field v-model="playerName" label="Add a new player" required />
        <p>{{message}}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="createPlayer">Create</v-btn> 
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<style scoped>

</style>
