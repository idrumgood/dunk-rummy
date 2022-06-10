<script setup>
const createPlayers = async () => {
  const response = await fetch('/.netlify/functions/create-players');
  console.log(response);
}
const createGames = async () => {
  const response = await fetch('/.netlify/functions/create-games');
  console.log(response);
}
</script>

<template>
  <button @click="createPlayers">Create Players</button>
  <button @click="createGames">Create Games</button>
</template>

<style scoped>

</style>
