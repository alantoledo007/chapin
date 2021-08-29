import firebase from "firebase/app";

const collectionName = "posts";

export const publish = (post) => {
  return firebase
    .firestore()
    .collection(collectionName)
    .add({ ...post, isPublished: false, photos: [] });
};

export const updatePost = (postId, data) => {
  return firebase
    .firestore()
    .collection(collectionName)
    .doc(postId)
    .update(data);
};
