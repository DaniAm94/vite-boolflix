<script>

import { store } from './assets/data/store';
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
export default {
  name: 'App Vue',
  components: {
    AppHeader, AppMain
  }
}
</script>

<template>
  <AppHeader />
  <AppMain />
</template>

<style></style>
