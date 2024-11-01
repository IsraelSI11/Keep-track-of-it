import { auth } from './firebase';

import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from 'firebase/auth';

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
}

export const doSignOut = async () => {
    return auth.signOut();
}

export const doPasswordReset = async (email: string) => {
    return sendPasswordResetEmail(auth, email);
}

export const doPasswordUpdate = async (password: string) => {
    if (!auth.currentUser) {
        return Promise.reject(new Error('No authenticated user'));
    }
    return updatePassword(auth.currentUser, password);
}
