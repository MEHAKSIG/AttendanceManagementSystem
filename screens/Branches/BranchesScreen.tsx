import React from 'react'
import { View, Text, useColorScheme } from 'react-native'
import { BaseProps } from '../../App';
import Loader from '../../components/atom/Loader';
import MyButton from '../../components/atom/MyButton';
import ContextMenuIcons, { ContextMenu } from '../../components/organisms/ContextMenuIcons';
import BranchesTemplate from '../../components/templates/Branches/BranchesTemplate';
import { PageNames } from '../../constants/Config';
import { GetAllBranches } from '../../services/BranchService';
import { getUserDetail } from '../../services/DataStorageService';
import { navigateToAddBranches } from '../../shared/Routes';
import ContextMenuIconsV2, { ContextMenuIconsPropsV2 } from '../../components/organisms/ContextMenuIconsV2';
import { HeaderIconColorThemeWise } from '../../constants/Colors';

export default function BranchesScreen(props: BaseProps) {
    const { navigation, route } = props;

    const [listBranches, setListBranches] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isDemoAccount, setIsDemoAccount] = React.useState(false);

    let colorScheme = useColorScheme();

    const bindContextMenu = async () => {
        const menuClickHandler = (selectedMenuIcon: string) => {
            if (selectedMenuIcon == 'ADD') {
                navigateToAddBranches(
                    navigation,
                    PageNames.BRANCH
                );
            } else if (selectedMenuIcon == 'REFRESH') {
                getBranches();
            }
        }
        const contextMenu: ContextMenuIconsPropsV2 = {
            refresh: {
                show: true,
                iconProp: { key: 1, type: 'REFRESH', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            add: {
                show: !isDemoAccount,
                iconProp: { key: 2, type: 'ADD', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            logout: {
                show: true,
                iconProp: { key: 3, type: 'LOGOUT', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            onPress: menuClickHandler
        }
        navigation.setOptions({
            headerTitle: "Office Branches",
            headerRight: () =>
            (<ContextMenuIconsV2
                {...contextMenu}
            />
            )
        });

        // const contextMenu: ContextMenu[] = [
        //     { type: 'REFRESH', size: 30, color: '#000' },
        //     { type: !isDemoAccount ? 'ADD' : '', size: 33, color: '#000' },
        //     { type: 'LOGOUT', size: 33, color: '#000' },
        // ];

        // navigation.setOptions({
        //     headerTitle: "Office Branches",
        //     headerRight: () =>
        //     (<ContextMenuIcons
        //         menus={contextMenu}
        //         onPress={(val) => {
        //             if (val == 'ADD') {
        //                 navigateToAddBranches(
        //                     navigation,
        //                     PageNames.BRANCH
        //                 );
        //             } else if (val == 'REFRESH') {
        //                 getBranches();
        //             }

        //         }}
        //     />)
        // });
    };

    const getBranches = async () => {

        setIsLoading(true);
        const res = await GetAllBranches();
        const data = res.data;
        setIsLoading(false);

        console.log(data, 'data-branches')
        setListBranches(data.Result);
    }

    const initilizeData = async () => {
        const user = await getUserDetail();
        if (user.isDemoAccount)
            setIsDemoAccount(user.isDemoAccount)
    }

    React.useEffect(() => {
        initilizeData();
        // bindContextMenu();
        getBranches();
    }, [])

    React.useEffect(() => {
        bindContextMenu();
    }, [isDemoAccount])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getBranches();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <View style={{ padding: 5, flex: 1, backgroundColor: '#fff' }}>
            {/* <Text>Branches Screen</Text> */}
            {
                isDemoAccount &&
                <Text style={{ padding: 10, color: 'red' }}>You have domo account. You can add only one office Branch</Text>
            }

            {
                (listBranches && listBranches?.length > 0) ?
                    <BranchesTemplate listData={listBranches} navigation={navigation} />
                    :
                    <View style={{ padding: 20 }}>
                        <MyButton text='Add Office Location' onPress={() => {
                            navigateToAddBranches(navigation, PageNames.BRANCH);
                        }} />
                    </View>
            }

            {/* <Text>
                {
                    JSON.stringify(listBranches)
                }
            </Text> */}
        </View>
    )
}
