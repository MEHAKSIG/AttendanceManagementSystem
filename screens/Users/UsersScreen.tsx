import React from 'react'
import { View, Text, useColorScheme } from 'react-native'
import { BaseProps } from '../../App';
import Loader from '../../components/atom/Loader';
import ContextMenuIcons, { ContextMenu } from '../../components/organisms/ContextMenuIcons';
import UserTemplate from '../../components/templates/Users/UserTemplate';
import { PageNames } from '../../constants/Config';
import { getTokens, setTokens } from '../../services/DataStorageService';
import { GetAllUsers } from '../../services/UserService';
import { navigateToAddUser } from '../../shared/Routes';
import ContextMenuIconsV2, { ContextMenuIconsPropsV2 } from '../../components/organisms/ContextMenuIconsV2';
import { HeaderIconColorThemeWise } from '../../constants/Colors';

export default function UsersScreen(props: BaseProps) {
    const { navigation, route } = props;

    const [isLoading, setIsLoading] = React.useState(false);
    const [usersList, setUsersList] = React.useState([]);

    let colorScheme = useColorScheme();

    const bindContextMenu = async () => {
        // const tokens = await getTokens();
        // setTokens(tokens.accessToken + '11', tokens.refreshToken);

        const menuClickHandler = (selectedMenuIcon: string) => {
            if (selectedMenuIcon == 'ADD') {
                navigateToAddUser(
                    navigation,
                    PageNames.USERS
                );
            } else if (selectedMenuIcon == 'REFRESH') {
                getUsers();
            }
        }

        const contextMenu: ContextMenuIconsPropsV2 = {
            refresh: {
                show: true,
                iconProp: {
                    key: 1, type: 'REFRESH', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000')
                }
            },
            add: {
                show: true,
                iconProp: {
                    key: 2, type: 'ADD', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000')
                }
            },
            logout: {
                show: true,
                iconProp: {
                    key: 3, type: 'LOGOUT', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000')
                }
            },
            onPress: menuClickHandler
        }
        navigation.setOptions({
            headerTitle: "Users",
            headerRight: () =>
            (<ContextMenuIconsV2
                {...contextMenu}
            />
            )
        });
    };

    React.useEffect(() => {
        bindContextMenu();

    }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getUsers();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const getUsers = async () => {
        try {
            setIsLoading(true);
            const res = await GetAllUsers();
            const data = res.data;
            if (data.IsSuccess) {
                setUsersList(data.Result);
                // console.log(data.Result, 'GetAllUsers-Data')
            }
            setIsLoading(false);

        } catch (e) {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <UserTemplate listData={usersList} navigation={navigation} />
            {/* <Text>
                {JSON.stringify(usersList)}
            </Text> */}
        </View>
    )
}
