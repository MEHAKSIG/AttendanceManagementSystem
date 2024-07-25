import React from 'react'
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Image, StatusBar, TouchableWithoutFeedback } from 'react-native'
import { BaseProps } from '../App';
import ErrorMsg from '../components/atom/ErrorMsg';

import Input from '../components/atom/Input';
import MyButton from '../components/atom/MyButton';

import AuthContext from '../context/AuthContext';

import { AuthenticateUser } from '../services/AccountService';
import { setGoogleApiKeyForLocation, setTokens, setUserDetail } from '../services/DataStorageService';
import { PasswordIcon, UserIcon } from '../shared/Icons';
import { navigateToRegistration } from '../shared/Routes';
import * as Updates from 'expo-updates';
import VersionUpdate from '../components/organisms/VersionUpdate';
import MyText from '../components/atom/MyText';

var appJson = require("../app.json");

export default function LoginScreen(props: BaseProps) {

    const { onAuthenticationSuccess } = React.useContext(AuthContext);

    const [username, setUsername] = React.useState<string>('');
    const [pwd, setPwd] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const onLoginClick = async () => {
        setError('');

        try {

            if (!username || !pwd) {
                setError('Enter Username and Password');
                return;
            }

            console.log({ username, pwd }, "param");
            setIsLoading(true);
            const res = await AuthenticateUser(username, pwd);
            const data = res.data;
            setIsLoading(false);
            setError('');
            console.log(data, "res-login");
            if (!data?.IsSuccess) {
                setError(data?.Msg ?? data?.Error);
            } else if (data?.Msg == 'success') {
                setUserDetail(data?.Result?.userDetail);
                setTokens(data?.Result?.accessToken, data?.Result?.refreshToken);
                //console.log("goolgeApiKeyForLocation-testing",data?.Result?.goolgeApiKeyForLocation)
                setGoogleApiKeyForLocation(data?.Result?.goolgeApiKeyForLocation);
                onAuthenticationSuccess && onAuthenticationSuccess(true);
            }

        } catch (e) {
            alert('Error : ' + e);
        }
    }

    return (

        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={[styles.container]} >
                {/* <VersionUpdate /> */}
                {/* <Text>Login Screen - {username}</Text> */}
                <Image source={require("../assets/images/icon.png")} style={{ height: 100, width: 100, marginBottom: 20 }} />

                {/* <Heading style={{ marginBottom: 20 }}>Attendance Management System</Heading> */}
                {/* <MonoText>Attendance Management System</MonoText> */}
                <MyText text='Attendance Management System' textFont='source-sans' fontSize={20} />
                {/* <SourceSansText style={{ fontSize: 20, fontWeight: '400' }}>Attendance Management System</SourceSansText> */}
                <ErrorMsg error={error} />
                <Input placeholder='Email or Mobile No' value={username} onChangeText={val => setUsername(val)}
                    style={[styles.input, { marginTop: 5 }]}
                    iconLeft={<UserIcon size={22} color="black" />}
                />
                <Input placeholder='Password' value={pwd} onChangeText={val => setPwd(val)}
                    style={styles.input}
                    iconLeft={<PasswordIcon size={22} color="black" />}
                    isPasswordField />

                <MyButton text='Login' type='solid' onPress={onLoginClick}
                    containerStyle={styles.loginButtonContainer}
                    loading={isLoading}
                />
                <MyButton text='Register New Company' type='outline'
                    onPress={() => {
                        navigateToRegistration(props.navigation, "Login");
                    }}
                    containerStyle={{ paddingVertical: 30, paddingHorizontal: 50 }}
                />
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                    }}
                >
                    <Text
                        style={{ padding: 3 }}
                    />
                    <Text style={{ textAlign: "center", color: 'grey' }}>

                        {"Version - " + appJson.expo.version}
                    </Text>

                    <Text style={{ marginVertical: 5, textAlign: "center", color: 'grey' }}>
                        {"Last updated on - " + Updates?.createdAt?.toDateString()}
                    </Text>

                    <Text style={{ textAlign: "center", marginBottom: 5, color: 'grey' }}>
                        {" "}
                        ©Copyrights mehaksig@gmail.com
                    </Text>
                </View>


            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 80,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    input: {
        marginVertical: 8,
    },
    loginButtonContainer: {
        marginTop: 10
    }
});

