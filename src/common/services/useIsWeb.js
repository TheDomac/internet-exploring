import { build } from "../consts";

const useIsWeb = () => build !== "tauri";
// const useIsWeb = () => true

export default useIsWeb;
