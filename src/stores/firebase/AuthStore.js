import { defineStore } from 'pinia';
import { auth, db } from '@/firebase/firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  updateProfile,
  signInWithPopup,
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null,
  }),

  actions: {
    async register(email, password, firstName, lastName) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const fullName = `${firstName} ${lastName}`;
        await updateProfile(user, {
          displayName: fullName,
        });

        await sendEmailVerification(user); 

        return true
      } catch (error) {
        this.error = error.code
        return false
      }
    },

    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          await signOut(auth);
          this.error = 'email-not-verified';
          return false;
        }

        this.setUser(user);
        return true;
      } catch (error) {
        this.error = error.code
        return false;
      }
    },

    async loginWithGoogle() {
      this.error = null;

      try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        
        this.setUser(user);
        return true;
      } catch (err) {
        this.error = err.code
        return false;
      }
    },

    async logout() {
      await signOut(auth);
      this.clearUser();
    },

    setUser(user) {
      this.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
      };
      localStorage.setItem('user', JSON.stringify(this.user));
    },

    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
    },

    getErrorMessage(code) {
      const messages = {
        'auth/email-already-in-use': 'Email уже используется',
        'auth/invalid-email': 'Неверный формат email',
        'auth/user-not-found': 'Пользователь не найден',
        'auth/wrong-password': 'Неверный пароль',
        'email-not-verified': 'Ваш email не подтвержден. Перейдите по ссылке в письме для подтверждения.',
        'user-not-in-database': 'Пользователь не найден в системе',
      };
      return messages[code] || 'Ошибка, попробуйте еще раз';
    },
  },
});