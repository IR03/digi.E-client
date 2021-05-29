import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}
//        -----------------------------------------
//                     GOOGLE SIGN IN
//        -----------------------------------------
export const handleGoogleSignIn = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then(res => handleResponse(res))
        .catch(error => console.log(error.message));
}
//        -----------------------------------------
//             EMAIL SIGN IN BY CREATE ACCOUNT
//        -----------------------------------------
export const createUserWithEmailAndPassword = (name, email, password) => {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            updateUserName(name);
            return handleResponse(res);
        })
        .catch(error => console.log(error.message));
}
//        -----------------------------------------
//            EMAIL SIGN IN BY EXISTING ACCOUNT
//        -----------------------------------------
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => handleResponse(res))
        .catch(error => console.log(error));
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    })
    .then(() => console.log('User Name Updated'))
    .catch(error => console.log(error.message));
}

const handleResponse = (res) => {
    const { displayName, photoURL, email } = res.user;
    const signInUser = {
        isSignedInUSer: true,
        userName: displayName,
        email: email,
        userPhoto: photoURL
    }
    return signInUser;
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signOutUser = {
                isSignedInUSer: false,
                userName: '',
                email: '',
                userPhoto: ''
            }
            return signOutUser;
        })
        .catch(error => console.log(error.message));
}
