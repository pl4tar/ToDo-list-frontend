import { defineStore } from 'pinia';
import { auth } from '@/firebase/firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null,
  }),

  actions: {
    async login(email, password) {
      this.error = null

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (!userCredential.user.emailVerified) {
          this.error = 'email-not-verified';
          return false;
        }
        this.setUser(userCredential.user);
        return true
      } catch (err) {
        this.error = err.code;
        return false
      }
    },

    async loginWithGoogle() {
      this.error = null;

      try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        this.setUser(userCredential.user);
        return true
      } catch (err) {
        this.handleAuthError(err);
        return false
      }
    },

    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        this.clearUser()
      } catch (err) {
        this.error = err.code;
      }
    },

    async register(email, password, firstName, lastName) {
      this.error = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password, firstName, lastName);

        const fullName = `${firstName} ${lastName}`.trim();

        await updateProfile(userCredential.user, {
          displayName: fullName
        });

        const newUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: fullName,
          emailVerified: false
        };

        await sendEmailVerification(userCredential.user)
        this.setUser(newUser);
        return true
      } catch (err) {
        this.error = err.code;
      }
    },

    async updateUserProfile({ firstName, lastName }) {
      if (!this.user) {
        return
      } 
      
      try {
        const fullName = `${firstName} ${lastName}`.trim();
        await updateProfile(auth.currentUser, {
          displayName: fullName
        });

        this.user = {
          ...this.user,
          firstName,
          lastName
        };
      } catch (err) {
        this.error = err.code
      }
    },

    initializeAuthListener() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.setUser(user);
        }
        else {
          this.clearUser();
        }
      });
    },

    setUser(user) {
      this.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
      };
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    clearUser() {
      this.user = null;
      localStorage.removeItem('user')
    },

    getErrorMessage(code) {
      const messages = {
        'auth/email-already-in-use': 'Email уже используется',
        'auth/invalid-email': 'Неверный формат email',
        'auth/user-not-found': 'Пользователь не найден',
        'auth/weak-password': 'Пароль должен содержать не менее 6 символов',
        'auth/wrong-password': 'Неверный пароль',
        'email-not-verified': 'Ваш email не подтвержден'
      };
      return messages[code] || 'Ошибка, попробуйте еще раз';
    },
  }
});