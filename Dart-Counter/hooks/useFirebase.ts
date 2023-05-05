// TODO: initialize firebase app
import { FirebaseApp, initializeApp } from 'firebase/app';


// TODO: initialize firebase auth
// require('firebase/auth');

import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential, signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';


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

let userInfo = {
    email: '',
    username: '',
    uid: '',
    lastLoginAt: '',
    createdAt: '',
    token: '',
}


export default () => {

    const checkIfLoggedIn = async () => {
        const temp = await getData()
        try {
            getData().then((value) => {
                if(value !== null){
                    console.log("user is logged in (asyncStorage)")
                    userInfo = JSON.parse(value)
                }else{
                    console.log("user is not logged in (asyncStorage)")
                }
            })
        } catch(e) {
            console.log(e)
        }
        return temp

    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userInfo')
            if(value !== null) {
                console.log(value)
                return value
            }
        } catch(e) {
            console.log(e)
        }
        return null
    }

    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem('userInfo', value)
        } catch (e) {
            console.log(e)
        }
    }


    const login = (emailLogin: string, password: string) => {
        return signInWithEmailAndPassword(auth, emailLogin, password)
        .then((userCredential: UserCredential) => {
            // Signed in
            const user = userCredential.user;

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
            if(user.displayName) userInfo.username = user.displayName;
            console.log("userinfo:")
            console.log({userInfo})

            // Save user info in local storage
            storeData(JSON.stringify(userInfo))

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

            updateProfile(user, {
                displayName: nickname,
            }).then(() => {
                console.log("update successful")
            }).catch((error) => {
                console.log(error)
            });

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
            AsyncStorage.removeItem('userInfo');
            // Sign-out successful.
            console.log("logout successful")
            userInfo = {
                email: '',
                username: '',
                uid: '',
                lastLoginAt: '',
                createdAt: '',
                token: '',
            }
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    const resetPassword = (email:string) => {
        return sendPasswordResetEmail(auth, email).then(() => {
            // Password reset email sent!
            // ..
            console.log("email sent")
            return ("success")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({ errorCode, errorMessage })
            return errorCode
        });
    }

    const getUserInfo = () => {
        return userInfo;
    }

    return{
        checkIfLoggedIn,
        login,
        register,
        logout,
        resetPassword,
        getUserInfo
    }
}