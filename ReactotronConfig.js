import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
const reactotron = Reactotron.configure({ host: "192.168.254.100" }) // controls connection & communication settings
  .useReactNative({
    networking: {
      ignoreUrls: /\/(logs|symbolicate)$/,
    },
  }) // add all built-in react native plugins
  .use(reactotronRedux())
  .connect(); // let's connect!

console.tronlog = Reactotron.log;

export default reactotron;
