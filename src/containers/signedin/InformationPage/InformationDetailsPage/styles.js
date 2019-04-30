import { Dimensions } from "react-native";
import { GRAY, DARK_GRAY } from "../../../../styles/common";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default (PageStyle = {
  container: {
    flex: 1
  },
  listContainer: {
    width: "95%",
    backgroundColor: "#ffffff",
    alignSelf: "center"
  },
  list: {
    backgroundColor: "#ffffff",
    marginRight: SCREEN_WIDTH * 0.025,
    marginLeft: SCREEN_WIDTH * 0.025,
    paddingTop: SCREEN_HEIGHT * 0.01,
    paddingBottom: SCREEN_HEIGHT * 0.01,
    justifyContent: "center",
    flexDirection: "row"
  },
  listIcon: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.09,
    resizeMode: "contain",
    alignSelf: "center"
  },
  linkedInButton: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_HEIGHT * 0.04,
    marginTop: SCREEN_HEIGHT * 0.02,
    resizeMode: "contain",
    alignSelf: "center"
  },
  listTitle: {
    fontSize: 15,
    color: DARK_GRAY,
    paddingTop: SCREEN_HEIGHT * 0.02,
    paddingLeft: SCREEN_WIDTH * 0.02,
    backgroundColor: "#ffffff",
    fontWeight: "600"
  },
  listDescription: {
    fontSize: 14,
    color: DARK_GRAY,
    marginTop: SCREEN_HEIGHT * 0.01,
    paddingBottom: SCREEN_HEIGHT * 0.03,
    paddingLeft: SCREEN_WIDTH * 0.02,
    backgroundColor: "#ffffff"
  },
  listBorder: {
    borderColor: GRAY,
    borderWidth: SCREEN_HEIGHT * 0.001,
    width: "85%",
    alignSelf: "center",
    opacity: 0.3
  },
  agendaContainer: {
    marginBottom: SCREEN_HEIGHT * 0.15,
  },
  agendaDetails: {
    fontSize: 14,
    color: DARK_GRAY,
    paddingLeft: SCREEN_WIDTH * 0.02,
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  boxContainer: {
    width: "95%",
    backgroundColor: "#ffffff",
    alignSelf: "center"
  },
  box: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: SCREEN_HEIGHT * 0.04
  },
  boxTitle: {
    fontSize: 15
  },
  boxImage: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT / 5,
    resizeMode: "contain"
  },
  mapImage: {
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.6,
    resizeMode: "contain"
  },
  agendaImage: {
    width: SCREEN_WIDTH * 0.90,
    height: SCREEN_HEIGHT * 0.2,
    resizeMode: "contain"
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeContainer: {
    paddingBottom: SCREEN_HEIGHT * 0.03
  }
});
