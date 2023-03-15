<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      :style="{ 'padding-top': `${insets.top}px` }"
      dir="ltr"
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-toolbar-title> Application Template </q-toolbar-title>
        <q-btn
          :label="$t('layout.logout')"
          no-caps
          color="white"
          flat
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";

import { useMainStore } from "stores/main.js";
import { storeToRefs } from "pinia";

import { StatusBar, Style } from "@capacitor/status-bar";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const mainStore = useMainStore();

    const { insets } = storeToRefs(mainStore);
    const { logout } = mainStore;

    StatusBar.setStyle({ style: Style.Dark });

    return { logout, insets };
  },
});
</script>
