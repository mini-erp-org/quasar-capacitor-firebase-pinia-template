<template>
  <q-page padding>
    <div class="row justify-center items-center">
      <q-card flat bordered class="col-md-4 col-12">
        <q-card-section class="text-h6 text-grey-9">
          {{ $t("pages.login.title") }}
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="login">
            <q-input
              v-model="form.email"
              type="email"
              :label="$t('pages.login.email')"
              filled
              class="q-mb-md"
              :rules="[(val) => val.length > 0 || $t('errors.required')]"
            />
            <q-input
              v-model="form.password"
              type="password"
              :label="$t('pages.login.password')"
              filled
              class="q-mb-md"
              :rules="[(val) => val.length > 0 || $t('errors.required')]"
            />
            <q-btn
              unelevated
              :label="$t('pages.login.login')"
              no-caps
              color="primary"
              class="q-mb-md full-width"
              type="submit"
            />
          </q-form>
        </q-card-section>
        <q-card-section> OR </q-card-section>
        <q-card-section>
          <SocialAuth />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

import { useQuasar } from "quasar";

import { useMainStore } from "stores/main";
import { storeToRefs } from "pinia";

import SocialAuth from "components/SocialAuth.vue";

export default defineComponent({
  name: "LoginPage",
  components: { SocialAuth },
  setup() {
    const quasar = useQuasar();

    const mainStore = useMainStore();
    const { insets } = storeToRefs(mainStore);

    const form = ref({
      email: "",
      password: "",
    });

    const login = async () => {
      try {
        quasar.loading.show();
        await mainStore.login({
          email: form.value.email,
          password: form.value.password,
        });
      } catch (error) {
        quasar.notify({
          type: "negative",
          message: error.message,
        });
      } finally {
        quasar.loading.hide();
      }
    };

    return {
      form,
      login,
      insets,
    };
  },
});
</script>
