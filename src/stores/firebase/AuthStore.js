import { defineStore } from 'pinia';
import { auth, db } from '@/firebase/firebaseConfig';
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
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null,
  }),

  actions: {
    async login(email, password) {
      this.error = null;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (!userCredential.user.emailVerified) {
          this.error = 'email-not-verified';
          return false;
        }
        
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        if (!userDoc.exists()) {
          this.error = 'user-not-in-database';
          return false;
        }
        
        this.setUser(userCredential.user);
        return true;
      } catch (err) {
        this.error = err.code;
        return false;
      }
    },

    async loginWithGoogle() {
      this.error = null;

      try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        
        await this.checkOrCreateUserInFirestore(userCredential.user);
        
        this.setUser(userCredential.user);
        return true;
      } catch (err) {
        this.err = err.code;
        return false;
      }
    },

    async checkOrCreateUserInFirestore(firebaseUser) {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        });
      }
    },

    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        this.clearUser();
      } catch (err) {
        this.error = err.code;
      }
    },

    async register(email, password, firstName, lastName) {
      this.error = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fullName = `${firstName} ${lastName}`.trim();

        await updateProfile(userCredential.user, {
          displayName: fullName
        });

        await sendEmailVerification(userCredential.user);
        
        // ждем подтверждения email
        const newUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: fullName,
          emailVerified: false
        };

        this.setUser(newUser);
        return true;
      } catch (err) {
        this.error = err.code;
        return false;
      }
    },

    async handleEmailVerification() {
      if (!auth.currentUser) {
        return false;
      } 
      
      try {
        // проверка подтвержден ли email
        await auth.currentUser.reload();
        const updatedUser = auth.currentUser;
        
        if (updatedUser.emailVerified) {
          await setDoc(doc(db, 'users', updatedUser.uid), {
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
          });
          
          this.setUser(updatedUser);
          return true;
        }
        return false;
      } catch (err) {
        this.error = err.code;
        return false;
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

        if (auth.currentUser) {
          await setDoc(doc(db, 'users', auth.currentUser.uid), {
            displayName: fullName
          }, { merge: true });
        }

        this.user = {
          ...this.user,
          displayName: fullName
        };
      } catch (err) {
        this.error = err.code;
      }
    },

    initializeAuthListener() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (user.emailVerified) {
            await this.checkOrCreateUserInFirestore(user);
          }
          this.setUser(user);
        } else {
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
      localStorage.setItem('user', JSON.stringify(this.user));
    },

    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
    },

    getErrorMessage(code) {
      const messages = {
        'auth/email-already-in-use': 'Этот Email уже используется',
        'auth/invalid-email': 'Неверный формат Email',
        'auth/user-not-found': 'Пользователь не найден',
        'auth/weak-password': 'Пароль должен содержать не менее 6 символов',
        'auth/wrong-password': 'Неверный пароль',
        'email-not-verified': 'Ваш email не подтвержден. Перейдите по ссылке в письме, для подтверждения',
        'user-not-in-database': 'Пользователь не найден'
      };
      return messages[code] || 'Ошибка, попробуйте еще раз';
    },
  }
});