<script setup>
import { ref } from 'vue';

const playerName = ref(null);
const createPlayer = async (e) => {
  e.preventDefault();
  const response = await fetch('/.netlify/functions/create-player', {
    body: JSON.stringify({ name: playerName.value }),
    method: 'POST',
  });
  console.log(response);
}
</script>

<template>
  <form>
    <h1>Create a new player</h1>
    <label for="player-name">Player Name</label>
    <input id="player-name" ref="playerName" type="text" />
    <button @click="createPlayer">Create</button>
  </form>
</template>

<style scoped>

</style>
