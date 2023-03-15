import { ref } from "vue";

import { useRouter } from "vue-router";
import { defineStore } from "pinia";

import { useQuasar } from "quasar";

import { useI18n } from "vue-i18n";

import { auth, firestore } from "boot/firebase";
import {
  doc,
  setDoc,
  getDoc,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

import en from "quasar/lang/en-US";

export const useMainStore = defineStore("auth", () => {
  const i18n = useI18n();
  const { locale } = i18n;

  const quasar = useQuasar();

  const router = useRouter();

  const insets = ref({ top: 0, right: 0, left: 0, bottom: 0 });
  const setInsets = (_insets) => (insets.value = _insets);

  const user = ref(null);
  const userListener = ref(null);

  const quasarLanguagePacks = {
    en,
  };

  const setLocale = (_locale) => {
    locale.value = _locale;
    quasar.lang.set(
      quasarLanguagePacks[_locale.split("-").slice(0, 1).join("")]
    );
    localStorage.setItem("locale", _locale);
  };

  const clearUser = () => {
    if (userListener.value) {
      userListener.value();
      userListener.value = null;
      user.value = null;
    }
  };

  const getUser = async (_user) => {
    const userReference = doc(firestore, "Users", _user);
    const userDocument = await getDoc(userReference);

    if (!userDocument.exists()) return;

    user.value = userDocument.data();

    listenToUser(userReference);
  };

  const listenToUser = (userReference) => {
    userListener.value = onSnapshot(userReference, (__user) => {
      user.value = __user.data();
    });
  };

  const login = async (_user) => {
    try {
      console.log(_user.email);
      await signInWithEmailAndPassword(auth, _user.email, _user.password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const register = async (_user) => {
    try {
      let userAuth = await createUserWithEmailAndPassword(
        auth,
        _user.email,
        _user.password
      );
      await createUser({
        email: _user.email,
        name: _user.name,
        uid: userAuth.user.uid,
      });
    } catch (error) {
      throw error;
    }
  };

  const createUser = async (_user) => {
    try {
      const userReference = doc(firestore, "Users", _user.uid);
      const userDocument = await getDoc(userReference);

      if (userDocument.exists()) return;

      await setDoc(doc(firestore, "Users", _user.uid), {
        ..._user,
      });
    } catch (error) {
      console.log(_user);
      throw error;
    }
  };

  const watchForAuthStateChange = () => {
    onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        await getUser(_user.uid);
        if (!user.value || user.value.banned) {
          await logout();
          quasar.notify({
            type: "negative",
            message: "You are not allowed to access this page",
          });
        } else router.push("/");
      } else {
        clearUser();
        router.push("/auth");
      }
    });
  };

  return {
    login,
    logout,
    watchForAuthStateChange,
    user,
    setLocale,
    insets,
    setInsets,
    register,
    createUser,
  };
});
