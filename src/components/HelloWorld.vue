<script setup>
import { ref, onMounted } from 'vue'

const players = ref();

function getPlayers() {
  return fetch('../functions/get-all-players', {
    method: 'GET'
  }).then(response => {
    return response.json()
  })
}

onMounted(() => {
  players = getPlayers();
});
</script>

<template>
  Player data {{ players}}
</template>

<style scoped>

</style>
