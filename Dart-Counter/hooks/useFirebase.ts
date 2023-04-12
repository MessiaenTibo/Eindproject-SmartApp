// TODO: initialize firebase app
import { FirebaseApp, initializeApp } from 'firebase/app';


// TODO: initialize firebase auth
// require('firebase/auth');

import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { useEffect, useState } from 'react';


// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_apiKey,
//     authDomain: import.meta.env.VITE_authDomain,
//     projectId: import.meta.env.VITE_projectId,
//     storageBucket: import.meta.env.VITE_storageBucket,
//     messagingSenderId: import.meta.env.VITE_messagingSenderId,
//     appId: import.meta.env.VITE_appId,
//     measurementId: import.meta.env.VITE_measurementId,
// }

const firebaseConfig = {
    apiKey: "AIzaSyDl3sKJ_ihR30z8eYolA5AzTdprmyiKfrU",
    authDomain: "authentication-dart-counter.firebaseapp.com",
    projectId: "authentication-dart-counter",
    storageBucket: "authentication-dart-counter.appspot.com",
    messagingSenderId: "639746126697",
    appId: "1:639746126697:web:37974771f78ac30b1b43f8",
    measurementId: "G-9F6LR6ZPXN"
  };

const app: FirebaseApp = initializeApp(firebaseConfig, "Authentication-firebase");
const auth: Auth = getAuth(app);


const actionCodeSettings = {
    url: 'https://www.example.com/?email=user@example.com',
    iOS: {
       bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    handleCodeInApp: true
  };

let userInfo = {
    email: '',
    username: '',
    uid: '',
    lastLoginAt: '',
    createdAt: '',
    token: '',
}


export default () => {


    const login = (emailLogin: string, password: string) => {
        return signInWithEmailAndPassword(auth, emailLogin, password)
        .then((userCredential: UserCredential) => {
            // Signed in
            const user = userCredential.user;

            // redirect to profile
            if(user.email) userInfo.email = user.email;
            if(user.uid) userInfo.uid = user.uid;
            if(user.metadata.lastSignInTime) userInfo.lastLoginAt = user.metadata.lastSignInTime;
            if(user.metadata.creationTime) userInfo.createdAt = user.metadata.creationTime;
            user.getIdToken().then((idToken) => {
                let token = idToken.toString();
                userInfo.token = token;
            }).catch((error) => {
                console.log(error)
            });
            if(user.email?.split('@')[0]) userInfo.username = user.email?.split('@')[0].replace('.', '');
            console.log("userinfo:")
            console.log({userInfo})
            return("success")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({ errorCode, errorMessage })
            console.log(errorCode)
            return errorCode
        });
    }

    const register = (nickname: string, email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: UserCredential) => {
            const user = userCredential.user;

            // redirect to profile
            let email = user.email;
            let uid = user.uid;
            let lastLoginAt = user.metadata.lastSignInTime;
            let createdAt = user.metadata.creationTime;
            let token = ''
            user.getIdToken().then((idToken) => {
                token = idToken.toString();
            }).catch((error) => {
                console.log(error)
            });
            return { errorCode: "success", errorMessage: "success"}
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({ errorCode, errorMessage })
            return { errorCode, errorMessage}
        });
    }

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("logout successful")
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    const resetPassword = (email:string) => {
        sendPasswordResetEmail(auth, email).then(() => {
            // Password reset email sent!
            // ..
            console.log("email sent")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({ errorCode, errorMessage })
            return { errorCode, errorMessage}
        });
    }

    const getUserInfo = () => {
        return userInfo;
    }

    return{
        login,
        register,
        logout,
        resetPassword,
        getUserInfo
    }
}