<template>
  <f7-app v-bind="appParams">
    <f7-view main url="/" class="safe-areas" :browser-history="true" browser-history-separator="" />
  </f7-app>
</template>

<script setup>
import routes from './routes.js';

const appParams = {
  name: 'TaskFlow',
  id: 'com.taskflow.app',
  theme: 'auto',
  darkMode: false,
  routes,
};
</script>
