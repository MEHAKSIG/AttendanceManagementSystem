import { ColorSchemeName } from "react-native";

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  appPrimaryColor: "#006290",
  appSecondaryColor: "#76bbde",
  appThirdColor: "#93b2fe",
  orange: "orange",
  grey: "grey",
  borderColor: "#D2D7D7",
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
  attendanceColor: {
    present: "green",
    absent: "red",
    haldDay: "orange",
    missPunch: "orange",
    leave: "blue",
    weeklyOff: "yellow",
  },
};

export const getColorByAttendanceStatus = (attendanceStatus: string) => {
  if (attendanceStatus == "Half Day") return "orange";
  else if (attendanceStatus == "Present") return "green";
  else if (attendanceStatus == "Weekly Off") return "blue";
  else if (attendanceStatus == "Missed Punch") return "#8d2626";
  else if (attendanceStatus == "Leave") return "purple";
  else if (attendanceStatus == "Absent") return "red";
  else return "#000";
};

export const getLeaveStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    Pending: "blue",
    Approved: "green",
    Reject: "red",
  };
  return statusColors[status];
};

export const HeaderIconColorThemeWise = (
  colorSchemeName: ColorSchemeName,
  iconColor: string
) => {
  if (colorSchemeName == "dark") return "#F6F6F4";
  return iconColor;
};
