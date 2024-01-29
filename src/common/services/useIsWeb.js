import { build } from "../consts";

const useIsWeb = () => build !== "tauri"
// const useIsWeb = () => false
 
export default useIsWeb;