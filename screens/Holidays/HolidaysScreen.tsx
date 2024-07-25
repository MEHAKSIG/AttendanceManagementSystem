import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { GetHolidays } from '../../services/HolidayService';
import Loader from '../../components/atom/Loader';
import ContextMenuIcons, { ContextMenu } from '../../components/organisms/ContextMenuIcons';
import { BaseProps } from '../../App';
import { navigateToAddHoliday } from '../../shared/Routes';
import { PageNames } from '../../constants/Config';
import HolidayTemplate from '../../components/templates/Holiday/HolidayTemplate';
import { getUserRoleLocalStorage } from '../../services/DataStorageService';
import ContextMenuIconsV2, { ContextMenuIconsPropsV2 } from '../../components/organisms/ContextMenuIconsV2';
import GlobalStyles from '../../shared/GlobalStyles';
import { HeaderIconColorThemeWise } from '../../constants/Colors';

export default function HolidayScreen(props: BaseProps) {
    const { navigation } = props;
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    const [isBranchHead, setIsBranchHead] = React.useState<boolean>(false);

    const [listHolidays, setHolidays] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    let colorScheme = useColorScheme();


    React.useEffect(() => {
        (async function () {

            const userRole = await getUserRoleLocalStorage();
            setIsAdmin(userRole.IsAdmin);
            setIsBranchHead(userRole.IsBranchHead);
        }
        )();

        getHolidays();

    }, [])

    React.useEffect(() => {
        bindContextMenu();
    }, [isAdmin, isBranchHead])

    const bindContextMenu = async () => {

        const menuClickHandler = (selectedMenuIcon: string) => {
            if (selectedMenuIcon == 'ADD') {
                navigateToAddHoliday(
                    navigation, PageNames.HOLIDAY, 0, new Date().toDateString(), '', 0)
            } else if (selectedMenuIcon == 'REFRESH') {
                getHolidays();
            }
        }

        const contextMenu: ContextMenuIconsPropsV2 = {

            refresh: {
                show: true,
                iconProp: { key: 1, type: 'REFRESH', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            add: {
                show: (isAdmin || isBranchHead),
                iconProp: { key: 2, type: 'ADD', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            logout: {
                show: true,
                iconProp: { key: 3, type: 'LOGOUT', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            onPress: menuClickHandler
        }
        navigation.setOptions({
            headerTitle: "Holidays",
            headerRight: () =>
            (<ContextMenuIconsV2
                {...contextMenu}
            />
            )
        });

        // const contextMenu: ContextMenu[] = [
        //     { type: 'REFRESH', size: 28, color: '#000' },
        // ];

        // if (isAdmin || isBranchHead) {
        //     contextMenu.push({ type: 'ADD', size: 33, color: '#000' });
        // }

        // navigation.setOptions({
        //     headerTitle: "Holidays",
        //     headerRight: () =>
        //     (<ContextMenuIcons
        //         menus={contextMenu}
        //         onPress={(val) => {
        //             if (val == 'ADD') {

        //                 navigateToAddHoliday(
        //                     navigation, PageNames.HOLIDAY, 0, new Date().toDateString(), '', 0)
        //             } else if (val == 'REFRESH') {
        //                 getHolidays();
        //             }
        //         }}
        //     />)
        // });
    };



    const getHolidays = async () => {
        try {
            setIsLoading(true);
            const res = await GetHolidays();
            const data = res.data;
            setIsLoading(false);

            setHolidays(data.Result.list);
            console.log(data.Result.list, "data-GetHolidays");

        } catch (e) {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getHolidays();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    if (isLoading)
        return <Loader />

    return (
        <View style={GlobalStyles.screenContainer}>
            {/* <Text>{JSON.stringify(listLeaves)}</Text> */}
            <HolidayTemplate listData={listHolidays} navigation={navigation} onDeleteSuccess={getHolidays} />
        </View>
    )
}