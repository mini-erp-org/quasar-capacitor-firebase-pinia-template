<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

import { useMainStore } from "stores/main";

import { SafeArea } from "capacitor-plugin-safe-area";

export default defineComponent({
  name: "App",
  setup() {
    const mainStore = useMainStore();

    mainStore.watchForAuthStateChange();
    mainStore.setLocale("en-US");

    StatusBar.setOverlaysWebView({ overlay: true });
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      mainStore.setInsets(insets);
    });
  },
});
</script>
