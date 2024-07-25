import React from "react";
import { View, Text } from "react-native";
import { Button, Overlay } from "react-native-elements";
import Input from "../atom/Input";
import ViewModal from "./ViewModal";

export interface OTPVerificationPopupProps {
    title?: string,
    isVisible: boolean,
    setIsVisible: any,
    onSubmit?: (otp: string) => void,
    onDismiss?: (otp: string) => void,
    isLoading?: boolean
}

export default function OTPVerificationPopup(props: OTPVerificationPopupProps) {

    const { title, isVisible, setIsVisible, onSubmit, onDismiss, isLoading } = props;

    const [otp, setOTP] = React.useState('');

    return (
        <ViewModal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            submitTextOverride={"Verify"}
            onSubmit={() => {
                onSubmit && onSubmit(otp);
            }}
            isLoading={isLoading}

        >
            <View style={{ margin: 10, marginHorizontal: 10 }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                    {title ?? "Verify OTP"}
                </Text>
                <Input
                    value={otp}
                    onChangeText={(val) => {
                        setOTP(val);
                    }}
                    placeholder="Enter OTP"
                    keyboardType="numeric"
                />
            </View>
        </ViewModal>
    );
}
