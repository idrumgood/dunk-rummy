<script setup>
import { reactive, onMounted, ref } from 'vue';

let allPlayers = reactive([]);
let player1 = ref();
let player1Score = ref(0);
let player1HandWins = ref(0);
let player2 = ref();
let player2Score = ref(0);
let player2HandWins = ref(0);

const getAllPlayers = async () => {
  try {
    let response = await fetch('/.netlify/functions/get-all-players');
    response = await response.json();
    allPlayers.push(...response);
  } catch (err) {
     console.error(err);
  }
}

const submitGame = async (e) => {
  e.preventDefault();
  try {
    let response = await fetch('/.netlify/functions/create-game', {
      body: JSON.stringify({ 
        player1: player1.value,
        player1Score: player1Score.value,
        player1HandWins: player1HandWins.value,
        player2: player2.value,
        player2Score: player2Score.value,
        player2HandWins: player2HandWins.value,
      }),
      method: 'POST',
    });
    response = await response.json();
    console.log(response);
  } catch(err) {
    console.error(err);
  }
}

onMounted(async () => {
  await getAllPlayers();
});
</script>

<template>
  <v-form>
    <h1>Create a new game</h1>
    <v-card>
      <v-card-title>Player 1</v-card-title>
      <v-card-text>
        <v-select
          v-model="player1"
          :items="allPlayers"
          item-title="name"
          item-value="id"
          label="Who was player 1?"
        ></v-select>
        <v-text-field
          v-model="player1Score"
          label="What was player 1's score?"
        ></v-text-field>
        <v-text-field
          v-model="player1HandWins"
          label="How many hand wins did Player 1 have?"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Player 2</v-card-title>
      <v-card-text>
        <v-select
          v-model="player2"
          :items="allPlayers"
          item-title="name"
          item-value="id"
          label="Who was player 2?"
        ></v-select>
        <v-text-field
          v-model="player2Score"
          label="What was player 2's score?"
        ></v-text-field>
        <v-text-field
          v-model="player2HandWins"
          label="How many hand wins did Player 2 have?"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submitGame">Create Game</v-btn> 
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<style scoped>

</style>
