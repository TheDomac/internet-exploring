import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { ipcRenderer } from "electron";

const uploadImages = async (imageClueValues, userId) => {
  ipcRenderer.send("upload-images");

  const uploadedImages = [];

  // for (const imageClueValue of imageClueValues) {
  //   const file = await fetch(imageClueValue.value);
  //   const fileBlob = await file.blob();
  //   const imageRef = ref(storage, `imagesSteam/${userId}/${imageClueValue.id}`);
  //   await uploadBytes(imageRef, fileBlob);
  //   const downloadURL = await getDownloadURL(imageRef);
  //   uploadedImages.push({ id: imageClueValue.id, downloadURL });
  // }

  return uploadedImages;
};

export default uploadImages;
