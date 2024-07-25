import { View, Text, Platform, Alert } from 'react-native'
import React from 'react'
import * as Application from 'expo-application';
import { CheckAppVersionUpdate } from '../../services/VersionUpdateService';
import * as Linking from 'expo-linking';


export default function VersionUpdate() {

    React.useEffect(() => {
        checkVersionUpdate();
    }, []);

    const checkVersionUpdate = async () => {
        try {
            // console.log(Application, "Application");

            // console.log({ packageName: Application.applicationId, version: Application.nativeApplicationVersion, buildVersion: Application.nativeBuildVersion }, "versions-etc")

            const packageName = Application.applicationId;
            const currentInstalledVersion = Application.nativeApplicationVersion;
            // const currentInstalledVersion = "1.0.0";

            const res = await CheckAppVersionUpdate(packageName ?? "", currentInstalledVersion ?? "", Platform.OS)
            const data = await res.data;
            // console.log(data, "data-checkVersionUpdate");

            if (data.IsSuccess) {
                const isLatestAppAvailable = data.Result?.isLatestAppAvailable;
                if (isLatestAppAvailable) {
                    // alert(data.Message);
                    showAppUpdateConfirmation(data.Message, data.Result.appStoreUrl);
                }
            }


        } catch (e) {
            alert('Error : ' + e);
        }
    }

    const showAppUpdateConfirmation = (msg: string, appStoreLink: string) => {
        Alert.alert('Confirmation', msg, [
            {
                text: 'Ask me later',
                onPress: () => console.log('Ask me later pressed'),
            },

            {
                text: 'Update', onPress: () => {
                    Linking.openURL(appStoreLink)
                }
            },
        ]);
    }

    return (
        <View>
            <Text></Text>
        </View>
    )
}