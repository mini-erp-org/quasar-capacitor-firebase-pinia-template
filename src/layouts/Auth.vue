<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";

import { StatusBar, Style } from "@capacitor/status-bar";

export default defineComponent({
  name: "AuthLayout",
  setup() {
    StatusBar.setStyle({ style: Style.Light });
  },
});
</script>
