import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import GlobalStyles from '../../../shared/GlobalStyles';
import EmptyListMessage from '../../atom/EmptyListMessage';
import { PageNames } from '../../../constants/Config';
import { DeleteIcon, EditIcon } from '../../../shared/Icons';
import { navigateToAddHoliday } from '../../../shared/Routes';
import { DeleteHolidays } from '../../../services/HolidayService';
import { getUserRoleLocalStorage } from '../../../services/DataStorageService';
import MyText from '../../atom/MyText';

export default function HolidayTemplate(props: { listData: any, navigation: any, onDeleteSuccess: () => void }) {
    const { listData, navigation, onDeleteSuccess } = props;

    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    const [isBranchHead, setIsBranchHead] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {

            const userRole = await getUserRoleLocalStorage();
            setIsAdmin(userRole.IsAdmin);
            setIsBranchHead(userRole.IsBranchHead);
        }
        )();
    }, [])

    const renderItem = (item: any, index: number) => {

        const handleDelete = async () => {
            try {
                Alert.alert(
                    'Delete Holiday',
                    'Are you sure you want to delete this Holiday?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'OK',
                            onPress: async () => {
                                const result = await DeleteHolidays(item.item.HolidayId);
                                const data = result.data;
                                console.log(result, 'DeleteHolidays-result');
                                if (data.IsSuccess) {
                                    Alert.alert('Success', 'Holiday deleted successfully');
                                    onDeleteSuccess();
                                } else {
                                    Alert.alert('Error', data.Msg);
                                }
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } catch (e) { }
        };

        return (
            <View
                style={{
                    padding: 10,
                    borderColor: '#D2D7D7',
                    borderWidth: 1,
                    backgroundColor: '#fff',
                }}
            >
                <View>


                    <View style={GlobalStyles.rowSpaceBetween}>
                        <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                            <MyText text="Branch : " bold />
                            <MyText text={item.item.BranchName} />
                        </View>

                        {
                            (isAdmin || isBranchHead) && (
                                <View style={GlobalStyles.rowSpaceAround}>
                                    {(
                                        item.item.HolidayId && item.item.HolidayId !== undefined
                                    ) && (
                                            <TouchableOpacity style={GlobalStyles.mr5} onPress={handleDelete}>
                                                <DeleteIcon />
                                            </TouchableOpacity>
                                        )}

                                    <TouchableOpacity
                                        onPress={() => {
                                            // if (leaveToDate < today) {
                                            //     Alert.alert(
                                            //         'Error',
                                            //         'You cannot edit a leave request that has already passed.'
                                            //     );
                                            //     return;
                                            // } else {
                                            //     console.log({ item }, 'item-selceted');
                                            navigateToAddHoliday(
                                                navigation,
                                                PageNames.HOLIDAY,
                                                +item.item.HolidayId,
                                                item.item.HolidayDate,
                                                item.item.HolidayName,
                                                item.item?.BranchId
                                            );
                                        }
                                        }
                                    >
                                        <EditIcon size={23} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                    <View style={GlobalStyles.rowFlexStart}>
                        <MyText text="Date : " bold />
                        <MyText text={new Date(item.item.HolidayDate).toDateString()} />

                    </View>
                    <View style={GlobalStyles.rowFlexStart}>
                        <MyText text="Name : " bold />
                        <MyText text={item.item.HolidayName} />

                    </View>


                </View>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<EmptyListMessage text="No Data Found" />}
            />
        </View>
    )
}
