<template>
  <div class="row">
    <q-btn
      @click="signInWithGoogle"
      class="col-12"
      :label="$t('auth.register.google')"
      no-caps
      icon="lab la-google"
      unelevated
      color="google"
      text-color="white"
    />
    <q-btn
      disabled
      @click="signInWithFacebook"
      class="col-12 q-mt-md"
      :label="$t('auth.register.facebook')"
      no-caps
      icon="lab la-facebook"
      unelevated
      color="facebook"
      text-color="white"
    />
  </div>
</template>
<script>
import { defineComponent } from "vue";

import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

import { auth } from "boot/firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
} from "@firebase/auth";

import { useMainStore } from "stores/main";

export default defineComponent({
  name: "SocialAuth",
  setup() {
    const mainStore = useMainStore();
    const { createUser } = mainStore;

    const signInWithGoogle = async () => {
      try {
        const result = await FirebaseAuthentication.signInWithGoogle();
        const credential = GoogleAuthProvider.credential(
          result?.credential?.idToken
        );
        const userResult = await signInWithCredential(auth, credential);
        
        await createUser({
          uid: userResult.user.uid,
          email: userResult.user.email,
          name: userResult.user.displayName,
        });
      } catch (error) {
        console.log("ERROR >> ", error);
      }
    };

    const signInWithFacebook = async () => {
      try {
        const result = await FirebaseAuthentication.signInWithFacebook();
        const credential = FacebookAuthProvider.credential(
          result.credential.accessToken
        );
        const userResult = await signInWithCredential(auth, credential);
        await createUser({
          uid: userResult.user.uid,
          email: userResult.user.email,
          name: userResult.user.displayName,
        });
      } catch (error) {
        console.log("ERROR >> ", error);
      }
    };
    return { signInWithGoogle, signInWithFacebook };
  },
});
</script>

