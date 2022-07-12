import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

const deleteImages = async (imageClueValues, userId) => {
  for (const imageClueValue of imageClueValues) {
    const imageRef = ref(storage, `images/${userId}/${imageClueValue.id}`);
    await deleteObject(imageRef);
  }
};

export default deleteImages;
