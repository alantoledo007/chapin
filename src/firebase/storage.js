import firebase from "firebase/app";

export const uploadFile = (file, path) => {
  const storageRef = firebase.storage().ref(path);
  return storageRef.put(file);
};
