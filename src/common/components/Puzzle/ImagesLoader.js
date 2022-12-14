import { INTERNET_EXPLORING_URL } from "../../consts";

const ImagesLoader = ({ imagesToLoad, setLoadedImages, loadedImages }) => {
  const markImageAsLoaded = (e) => {
    if (!loadedImages.includes(e.target.name)) {
      setLoadedImages((old) => old.concat(e.target.name));
    }
  };
  return (
    <div style={{ display: "none" }}>
      {imagesToLoad.map((img, i) => {
        let file;
        if (img.startsWith("http") || img.startsWith("blob")) {
          file = img
        } else if (img.startsWith("workshop")) {
          const splitted = img.split("/")
          file = `${INTERNET_EXPLORING_URL}/static/media/${splitted[splitted.length - 1]}`
        } else {
          file = `${INTERNET_EXPLORING_URL}/static/media/${img}`
        }

        return (
          <img
            src={file}
            onLoad={markImageAsLoaded}
            alt={`toLoad${i}`}
            key={i}
            name={img}
          />
        );
      })}
    </div>
  );
};

export default ImagesLoader;
