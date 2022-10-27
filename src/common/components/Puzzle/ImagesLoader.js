const ImagesLoader = ({ imagesToLoad, setLoadedImages, loadedImages }) => {
  const markImageAsLoaded = (e) => {
    if (!loadedImages.includes(e.target.name)) {
      setLoadedImages((old) => old.concat(e.target.name));
    }
  };
  return (
    <div style={{ display: "none" }}>
      {imagesToLoad.map((img, i) => {
        const file = img.startsWith("http") || img.startsWith("blob") ? img : require(`../../../images/${img}`);
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
