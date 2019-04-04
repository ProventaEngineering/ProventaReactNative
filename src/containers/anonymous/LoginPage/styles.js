import { Dimensions } from "react-native";
import { GRAY, DARK_GRAY, BLUE } from "../../../styles/common";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default (PageStyle = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  sectionLine: {
    borderColor: GRAY,
    marginTop: SCREEN_HEIGHT * 0.025,
    marginBottom: SCREEN_HEIGHT * 0.025,
    borderWidth: SCREEN_HEIGHT * 0.001,
    width: "95%",
    alignSelf: "center",
    opacity: 0.3
  },
  socialContainer: {
    paddingBottom: SCREEN_HEIGHT * 0.05
  },
  socialButton: {
    width: "65%",
    height: SCREEN_HEIGHT * 0.08,
    marginLeft: SCREEN_WIDTH * 0.02,
    marginRight: SCREEN_WIDTH * 0.02,
    backgroundColor: "#0077B5",
    flexDirection: "row",
    alignSelf: "center"
  },
  socialButtonIcon: {
    alignSelf: "center",
    marginTop: SCREEN_HEIGHT * 0.015
  },
  socialButtonLabel: {
    fontSize: 15,
    color: "#ffffff",
    alignSelf: "center",
    marginTop: SCREEN_HEIGHT * 0.025
  },
  signUpLabel: {
    alignSelf: "center",
    fontSize: 15,
    color: DARK_GRAY,
    opacity: 0.5
  },
  signUpLink: {
    alignSelf: "center",
    fontSize: 15,
    color: BLUE
  },
  card: {
    flex: 1,
    width: "93%",
    marginTop: SCREEN_HEIGHT * 0.02,
    marginLeft: SCREEN_WIDTH * 0.03,
    marginRight: SCREEN_WIDTH * 0.03,
    paddingTop: SCREEN_HEIGHT * 0.03,
    paddingBottom: SCREEN_HEIGHT * 0.0225,
    // paddingLeft: SCREEN_WIDTH * 0.03,
    // paddingRight: SCREEN_WIDTH * 0.03,
    backgroundColor: "#ffffff"
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    fontSize: 15,
    fontWeight: "400",
    color: BLUE
  }
});
