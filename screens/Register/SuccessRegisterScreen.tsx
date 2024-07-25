import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { CheckCircleIcon } from "../../shared/Icons";
import GlobalStyles from "../../shared/GlobalStyles";
import Colors from "../../constants/Colors";
import { BaseProps } from "../../App";
import { navigateToLogin } from "../../shared/Routes";
import MyButton from "../../components/atom/MyButton";

export default function SuccessRegisterScreen(props: BaseProps) {
    const { navigation, route } = props;
    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                justifyContent: "center",
                backgroundColor: Colors.appPrimaryColor,
            }}
        >
            <View style={{ marginBottom: 15 }}>
                <CheckCircleIcon
                    style={{ textAlign: "center" }}
                    size={90}
                    color={"#fff"}
                />
            </View>
            <Text h2 style={{ textAlign: "center", color: "#fff" }}>
                Successfull !!!
            </Text>
            <Text h4 style={{ textAlign: "center", marginTop: 20, color: "#ede9e8" }}>
                Plese go to login page and login with your email/mobile and password
            </Text>

            <View
                style={{
                    marginTop: 30,
                    // textAlign: "center",
                }}
            >
                <MyButton text="Go To Login Page" onPress={() => {
                    navigateToLogin(navigation, "success");
                }} />
                {/* <Button
                    containerStyle={{
                        // flex: 3,
                        justifyContent: "center",
                        textAlign: "center",
                        color: Constants.appPrimaryColor,
                    }}
                    titleStyle={{ color: Constants.appPrimaryColor }}
                    buttonStyle={{
                        textAlign: "center",
                        marginHorizontal: 50,
                        color: Constants.appPrimaryColor,
                        backgroundColor: "#fff",
                    }}
                    iconRight
                    icon={{
                        name: "arrow-right",
                        size: 25,
                        color: Constants.appPrimaryColor,
                    }}
                    title="Go To Login Page"
                    onPress={() => {
                        navigateToLogin(navigation, "Success");
                    }}
                /> */}
            </View>
        </View>
    );
}
