import { View, Text, RefreshControl, ScrollView, useColorScheme, Platform } from 'react-native'
import React from 'react'
import GlobalStyles from '../../shared/GlobalStyles'
import { SourceSansText } from '../../components/StyledText'
import { BaseProps } from '../../App'
import { stringToTitleCase } from '../../helpers/CommonFunctions'
import { getUserDetail } from '../../services/DataStorageService'
import AttendanceCalenderTemplate from '../../components/templates/AttendanceReport/AttendanceCalenderTemplate'
import ContextMenuIcons, { ContextMenu } from '../../components/organisms/ContextMenuIcons'
import ContextMenuIconsV2, { ContextMenuIconsPropsV2 } from '../../components/organisms/ContextMenuIconsV2'
import { HeaderIconColorThemeWise } from '../../constants/Colors'
import MyText from '../../components/atom/MyText'
import VersionUpdate from '../../components/organisms/VersionUpdate'

export default function HomeScreen(props: BaseProps) {

    const { navigation } = props;
    const [name, setName] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);
    let colorScheme = useColorScheme();

    const bindContextMenu = async () => {
        // const contextMenu: ContextMenu[] = [
        //     { type: 'REFRESH', size: 33, color: '#000' },
        //     { type: 'LOGOUT', size: 28, color: '#000' },
        // ];
        const menuClickHandler = (selectedMenuIcon: string) => {
            if (selectedMenuIcon == 'REFRESH') {
                onRefresh();
            }
        }

        const contextMenu: ContextMenuIconsPropsV2 = {
            refresh: {
                show: true,
                iconProp: { key: 3, type: 'REFRESH', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            logout: {
                show: true,
                iconProp: { key: 2, type: 'LOGOUT', size: 28 }
            },
            onPress: menuClickHandler
        }
        navigation.setOptions({
            // headerTitle: "Users",
            headerRight: () =>
            (
                <ContextMenuIconsV2
                    {...contextMenu}
                />
                // <ContextMenuIcons
                //     menus={contextMenu}
                //     onPress={(val) => {
                //         if (val == 'REFRESH') {
                //             onRefresh();
                //         }
                //     }}
                // />
            )
        });
    };

    React.useEffect(() => {
        bindContextMenu();
        initializeVal();
    }, [])



    const initializeVal = async () => {
        const userDetails = await getUserDetail();
        setName(userDetails.name)
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await initializeVal();
        setRefreshing(false);
    }, []);

    return (
        <ScrollView
            style={GlobalStyles.screenContainer}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            <View>
                {/* <VersionUpdate /> */}
                <View style={[GlobalStyles.rowFlexStart, { padding: 10, marginBottom: 15 }]}>
                    <MyText textFont='source-sans' text={'Hello, '} fontSize={25} color='grey' />

                    <MyText textFont='source-sans' text={stringToTitleCase(name)} fontSize={25} />
                </View>
                <AttendanceCalenderTemplate refresh={refreshing} />
            </View>
        </ScrollView>
    )
}
