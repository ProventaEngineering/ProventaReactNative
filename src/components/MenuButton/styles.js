import { Dimensions } from "react-native";
import { BLUE } from "../../styles/common";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default (ComponentStyle = {
  containerA: {
    height: SCREEN_HEIGHT / 8,
    width: SCREEN_WIDTH / 3,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  containerSI: {
    height: SCREEN_HEIGHT / 8,
    width: SCREEN_WIDTH / 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    tintColor: BLUE,
    height: 25,
    width: 25,
    resizeMode: "contain"
  }
});
