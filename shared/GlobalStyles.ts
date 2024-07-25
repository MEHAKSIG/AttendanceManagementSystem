import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const GlobalStyles = StyleSheet.create({
  appHeaderStyle: {
    // backgroundColor: "#7ED0D0",
    backgroundColor: Colors.appPrimaryColor,
  },
  tabViewStyle: {
    // backgroundColor: '#E7827A'
    backgroundColor: Colors.appPrimaryColor,
  },
  tabViewIndicatorStyle: {
    backgroundColor: "#e2ed35",
    // backgroundColor: Constants.appThirdColor,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  leftRightParentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowSpaceAround: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rowFlexStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rowFlexEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textBold: {
    fontWeight: "bold",
  },
  formGroupContainer: {
    marginBottom: 2,
    padding: 3,
  },
  formGroupLabel: {
    marginBottom: 3,
  },
  requiredAsterisk: {
    color: "red",
  },
  textInputContainer: {
    flexDirection: "row",
    // backgroundColor: '#e8e8e8',
    borderColor: Colors.appSecondaryColor,
    // height: 60,
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    color: "black",
  },
  textInput: {
    flex: 1,
    marginLeft: 5,
  },
  m5: {
    margin: 5,
  },
  mb5: {
    marginBottom: 5,
  },
  mt5: {
    marginTop: 5,
  },
  mr5: {
    marginRight: 5,
  },
  ml5: {
    marginLeft: 5,
  },
  m10: {
    margin: 10,
  },
  mb10: {
    marginBottom: 10,
  },
  mt10: {
    marginTop: 10,
  },
  mr10: {
    marginRight: 10,
  },
  ml10: {
    marginLeft: 10,
  },
});

export default GlobalStyles;
