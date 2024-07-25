import React from 'react'
import { View, Text, Image } from 'react-native'
import {
    AntDesign,
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
    FontAwesome,
    FontAwesome5,
    MaterialIcons,
    Octicons,
    Feather,
} from "@expo/vector-icons/";

export interface IconProps {
    size?: number,
    color?: string,
    overrideProps?: any,
    width?: number,
    height?: number

}

export function CalenderImgIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/schedule.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}

export function UsersImgIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/teamwork.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}
export function UsersImgManIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/man1.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}
export function UsersImgGirlIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/girl.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}
export function BranchesImgIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/office.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}



export function MissedPuchImgIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/fingerprint.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}

export function LeaveImgIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/evacuation.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}
export function LeaveImgIcon2(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/leave.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}

export function HolidayImgIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/holiday.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}

export function LeaveApproveImgIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/check-mark.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}

export function ViewMeetingsIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/meeting.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}

export function PolicyImgIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/shield.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}
export function PaySlipImgIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/wallet.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}

export function ExploreIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <AntDesign name="appstore-o" size={size} color={color} {...overrideProps} />;
}

export function MeetingIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <MaterialIcons name="group-work" size={size} color={color} {...overrideProps} />;
}

export function SolidCircleIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <FontAwesome name="circle" size={size} color={color} {...overrideProps} />;
}

export function UserIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <AntDesign name="user" size={size} color={color} {...overrideProps} />;
}

export function HistoryIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <MaterialIcons name="history" size={size} color={color} {...overrideProps} />;
}

export function HomeIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <AntDesign name="home" size={size} color={color} {...overrideProps} />;
}

export function DashboardIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <AntDesign name="dashboard" size={size} color={color} {...overrideProps} />;
}
export function ReportIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Octicons name="graph" size={size} color={color} {...overrideProps} />;
    // <Octicons name="graph" size={24} color="black" />
}

export function UserIcon2(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Feather name="user" size={size} color={color} {...overrideProps} />;
}
export function UsersIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Feather name="users" size={size} color={color} {...overrideProps} />;
}
export function PasswordIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <AntDesign name="lock" size={size} color={color} {...overrideProps} />;
}

export function LogoutIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Ionicons name="power-sharp" size={size} color={color} {...props} />;
}
export function CheckSolidCircleIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return (
        <MaterialIcons name="check-circle" size={size} color={color} {...overrideProps} />
    );
}
export function OTPIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/otp.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}

export function ShareIcon({ size = 24, color = "#000", ...props }) {
    return <AntDesign name="sharealt" size={size} color={color} {...props} />;
}

export function RefreshIcon({ size = 24, color = "#fff", ...props }) {
    return <Feather name="refresh-ccw" size={size} color={color} {...props} />;
}
export function EyeSlashIcon({ size = 24, color = "#fff", ...props }) {
    return <FontAwesome name="eye-slash" size={size} color={color} {...props} />;
}
export function EyeIcon(props: IconProps) {
    const { overrideProps, size = 24, color = '#000' } = props;
    return <AntDesign name="eyeo" size={size} color={color} {...props} />;
}
export function EyeColorfullImgIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../assets/icons/eye_round.png")}
            style={[{ width: width, height: height }]}
            {...props}
        />
    );
}
export function SearchIcon({ size = 24, color = "#000", ...props }) {
    return <Feather name="search" size={size} color={color} {...props} />;
}

export function CheckCircleIcon({ size = 24, color = "#000", ...props }) {
    return (
        <Ionicons
            name="checkmark-circle-outline"
            size={size}
            color={color}
            {...props}
        />
    );
}
export function BuildingIcon({ size = 24, color = "#fff", ...props }) {
    return <FontAwesome5 name="building" size={size} color={color} {...props} />;
}

export function LocationIcon({ size = 24, color = "#fff", ...props }) {
    return <Ionicons name="ios-location-outline" size={size} color={color} {...props} />;
}

export function PlusIcon({ size = 24, color = "#000", ...props }) {
    return <Entypo name="plus" size={size} color={color} {...props} />;
}
export function EditUserIcon({ size = 24, color = "#000", ...props }) {
    return <FontAwesome5 name="user-edit" size={size} color={color} {...props} />;
}
export function EditIcon({ size = 24, color = "#000", ...props }) {
    return <FontAwesome5 name="edit" size={size} color={color} {...props} />;
}

export function DeleteIcon({ size = 24, color = "red", ...props }) {
    return <FontAwesome5 name="trash-alt" size={size} color={color} {...props} />;
}

export function GoogleIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24, } = props;
    return (
        <Image
            source={require("../assets/icons/google.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}

export function ExpoIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24, } = props;
    return (
        <Image
            source={require("../assets/icons/expo1.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}