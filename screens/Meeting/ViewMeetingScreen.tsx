import React from 'react'
import { View, Text, useColorScheme } from 'react-native'
import { BaseProps } from '../../App';
import Loader from '../../components/atom/Loader';
import MyButton from '../../components/atom/MyButton';
import ContextMenuIcons, { ContextMenu } from '../../components/organisms/ContextMenuIcons';
import ViewMeetingsTemplate from '../../components/templates/ViewMeetings/ViewMeetingsTemplate';
import { PageNames } from '../../constants/Config';
import { GetMeetingShortLeave } from '../../services/MeetingService';
import { getUserDetail } from '../../services/DataStorageService';
import { navigateToMeetingScreen } from '../../shared/Routes';
import FilterPanelWithDates from '../../components/organisms/FilterPanelWithDates';
import DateService from '../../services/DateService';
import ContextMenuIconsV2, { ContextMenuIconsPropsV2 } from '../../components/organisms/ContextMenuIconsV2';
import { HeaderIconColorThemeWise } from '../../constants/Colors';
//import { navigateToAddBranches } from '../../shared/Routes';

export default function ViewMeetingScreen(props: BaseProps) {
    const { navigation, route } = props;
    const defaultToDate = new Date();
    const monthsDay = DateService.getFirstAndLastDateByDate(new Date());
    const [listMeetings, setListMeetings] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isDemoAccount, setIsDemoAccount] = React.useState(false);
    const [fromDate, setFromDate] = React.useState<string>(monthsDay.firstDayStr);
    const [toDate, setToDate] = React.useState<string>(defaultToDate.toDateString());

    let colorScheme = useColorScheme();

    const bindContextMenu = async () => {

        const menuClickHandler = (selectedMenuIcon: string) => {
            if (selectedMenuIcon == 'ADD') {
                navigateToMeetingScreen(
                    navigation, PageNames.VIEWMEETING)
            } else if (selectedMenuIcon == 'REFRESH') {
                getMeetingsDetails();
            }
        }

        const contextMenu: ContextMenuIconsPropsV2 = {
            add: {
                show: true,
                iconProp: { key: 1, type: 'ADD', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            refresh: {
                show: true,
                iconProp: { key: 2, type: 'REFRESH', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            logout: {
                show: true,
                iconProp: { key: 3, type: 'LOGOUT', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            onPress: menuClickHandler
        }
        navigation.setOptions({
            headerTitle: "Meetings",
            headerRight: () =>
            (<ContextMenuIconsV2
                {...contextMenu}
            />
            )
        });

    };


    const getMeetingsDetails = async () => {
        const userDetail = await getUserDetail();
        setIsLoading(true);
        const res = await GetMeetingShortLeave(userDetail.userId ?? 0, fromDate, toDate);
        const data = res.data;
        setIsLoading(false);

        console.log(data.Result.list, 'data-Meetings')
        setListMeetings(data.Result.list);
    }

    const initilizeData = async () => {
        const user = await getUserDetail();
        if (user.isDemoAccount)
            setIsDemoAccount(user.isDemoAccount)
    }

    React.useEffect(() => {
        initilizeData();
        // bindContextMenu();
        getMeetingsDetails();
    }, [])

    React.useEffect(() => {
        bindContextMenu();
    }, [isDemoAccount])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getMeetingsDetails();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 40 }}>
            <FilterPanelWithDates
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                onSubmit={getMeetingsDetails}
                loading={isLoading}
            />
            <ViewMeetingsTemplate listData={listMeetings} navigation={navigation} />
        </View>
    )
}
