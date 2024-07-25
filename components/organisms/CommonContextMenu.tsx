import React from 'react'
import { View, Text, TouchableOpacity, Alert, useColorScheme } from 'react-native'
import AuthContext from '../../context/AuthContext';
import { clearAsyncStorage } from '../../services/DataStorageService';
import GlobalStyles from '../../shared/GlobalStyles';
import { LogoutIcon, RefreshIcon } from '../../shared/Icons'
import { HeaderIconColorThemeWise } from '../../constants/Colors';

export interface CommonContextMenuProps {
    showRefresh?: boolean,
    onRefreshPress?: () => void,
    size?: number
}
export default function CommonContextMenu(props: CommonContextMenuProps) {
    const { showRefresh = false, onRefreshPress, size } = props;
    const { onAuthenticationSuccess } = React.useContext(AuthContext);

    let colorScheme = useColorScheme();

    return (

        <TouchableOpacity
            style={{ marginRight: 8 }}
            onPress={() => {
                // navigation.navigate("Help");


                Alert.alert(
                    "Confirmation",
                    "Are you sure want to logout?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                        },
                        {
                            text: "Yes",
                            onPress: () => {
                                // console.log("OK Pressed")
                                clearAsyncStorage();

                                onAuthenticationSuccess && onAuthenticationSuccess(false);
                            },
                        },
                    ],
                    { cancelable: false }
                );
            }}
        >
            <LogoutIcon color={HeaderIconColorThemeWise(colorScheme, '#000')} size={size} />
        </TouchableOpacity>
    )
}
