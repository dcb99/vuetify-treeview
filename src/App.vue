<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-file-tree-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Classifications</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="locations">
          <v-list-item-action>
            <v-icon>mdi-file-tree-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Locations</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app 
      color="primary"
      dark
      text-color="white"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Treeview Components</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height mx-auto"
        fluid
        align="center"
        justify="center"
      >
        <v-row align="center" justify="center">
          <router-view />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    drawer: null
  })
});
</script>

<style>
.treeview-card {
  margin-top: 20px !important;
}
</style>
