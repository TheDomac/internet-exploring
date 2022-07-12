import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const uploadImages = async (imageClueValues, userId) => {
  const uploadedImages = [];

  for (const imageClueValue of imageClueValues) {
    const file = await fetch(imageClueValue.value);
    const fileBlob = await file.blob();
    const imageRef = ref(storage, `images/${userId}/${imageClueValue.id}`);
    await uploadBytes(imageRef, fileBlob);
    const downloadURL = await getDownloadURL(imageRef);
    uploadedImages.push({ id: imageClueValue.id, downloadURL });
  }

  return uploadedImages;
};

export default uploadImages;
