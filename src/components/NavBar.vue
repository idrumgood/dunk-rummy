<script setup>
import { ref } from 'vue';

const drawer = ref(false);
const items = ref([
  { title: 'Home', to: '/landing' },
  { title: 'Add Player', to: '/add-player'}
])

</script>

<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Dunk Rummy</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      bottom
      temporary
    >
      <v-list>
        <v-list-item v-for="item in items" :to="item.to">{{item.title}}</v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>

</style>