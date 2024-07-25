import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { GetLeaves } from '../../services/LeaveService'
import Loader from '../../components/atom/Loader';
import ContextMenuIcons, { ContextMenu } from '../../components/organisms/ContextMenuIcons';
import { BaseProps } from '../../App';
import { navigateToAddLeave } from '../../shared/Routes';
import { PageNames } from '../../constants/Config';
import LeaveTemplate from '../../components/templates/Leave/LeaveTemplate';
import DateService from '../../services/DateService';
import { getUserDetail } from '../../services/DataStorageService';
import FilterPanelWithDates from '../../components/organisms/FilterPanelWithDates';
import ContextMenuIconsV2, { ContextMenuIconsPropsV2 } from '../../components/organisms/ContextMenuIconsV2';
import { HeaderIconColorThemeWise } from '../../constants/Colors';

export default function LeaveScreen(props: BaseProps) {
    const { navigation } = props;
    const defaultToDate = new Date();
    const monthsDay = DateService.getFirstAndLastDateByDate(new Date());
    const [listLeaves, setListLeaves] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [fromDate, setFromDate] = React.useState<string>(monthsDay.firstDayStr);
    const [toDate, setToDate] = React.useState<string>(defaultToDate.toDateString());

    let colorScheme = useColorScheme();


    const bindContextMenu = async () => {
        // const tokens = await getTokens();
        // setTokens(tokens.accessToken + '11', tokens.refreshToken);

        const menuClickHandler = (selectedMenuIcon: string) => {
            if (selectedMenuIcon == 'ADD') {
                navigateToAddLeave(
                    navigation, PageNames.LEAVES, {}, 0, new Date().toDateString(), new Date().toDateString(), '')
            } else if (selectedMenuIcon == 'REFRESH') {
                getLeaves();
            }
        }
        const contextMenu: ContextMenuIconsPropsV2 = {
            add: {
                show: true,
                iconProp: { key: 3, type: 'ADD', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            refresh: {
                show: true,
                iconProp: { key: 2, type: 'REFRESH', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            onPress: menuClickHandler
        }
        navigation.setOptions({
            headerTitle: "Leaves",
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
        getLeaves();
    }, [])

    const getLeaves = async () => {
        try {
            const userDetail = await getUserDetail();
            setIsLoading(true);
            const res = await GetLeaves(userDetail.userId ?? 0, fromDate, toDate);
            const data = res.data;
            setIsLoading(false);

            setListLeaves(data.Result.list);
            console.log(data.Result.list, "data-GetLeaves");

        } catch (e) {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getLeaves();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    if (isLoading)
        return <Loader />

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 40 }}>
            <FilterPanelWithDates
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                onSubmit={getLeaves}
                loading={isLoading}
            />
            <LeaveTemplate listData={listLeaves} navigation={navigation} onDeleteSuccess={getLeaves} />
        </View>
    )
}