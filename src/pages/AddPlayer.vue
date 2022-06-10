<script setup>
import { ref } from 'vue';

let playerName = ref(null);
const createPlayer = async (e) => {
  e.preventDefault();
  try {
    await fetch('/.netlify/functions/create-player', {
      body: JSON.stringify({ name: playerName.value.value }),
      method: 'POST',
    });
  } catch (err) {
     console.error(err);
  }

  playerName.value.value = '';
}
</script>

<template>
  <v-card>
    <v-form>
      <v-card-title>Create a new player</v-card-title>
      <v-card-text>
        <v-text-field ref="playerName" label="Add a new player" required />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="createPlayer">Create</v-btn> 
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<style scoped>

</style>
