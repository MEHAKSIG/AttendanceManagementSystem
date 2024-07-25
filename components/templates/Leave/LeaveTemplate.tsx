import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import GlobalStyles from '../../../shared/GlobalStyles';
import EmptyListMessage from '../../atom/EmptyListMessage';
import { PageNames } from '../../../constants/Config';
import { DeleteIcon, EditIcon } from '../../../shared/Icons';
import { DeleteLeaves } from '../../../services/LeaveService';
import { navigateToAddLeave } from '../../../shared/Routes';
import { navigateToLeave } from '../../../shared/Routes';
import { SourceSansText } from '../../StyledText';
import MyText from '../../atom/MyText';
import Colors, { getLeaveStatusColor } from '../../../constants/Colors';

interface LeaveTemplateProps {
    listData: any,
    navigation: any,
    onDeleteSuccess: () => void,
    onEditClick?: (item: any) => void
}

export default function LeaveTemplate(props: LeaveTemplateProps) {
    const { listData, navigation, onDeleteSuccess, onEditClick } = props;

    const renderItem = (item: any, index: number) => {
        const today = new Date();
        const leaveToDate = new Date(item.item.LeaveToDate);

        const handleDelete = async () => {
            try {
                Alert.alert(
                    'Delete Leave Request',
                    'Are you sure you want to delete this leave request?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'OK',
                            onPress: async () => {
                                const result = await DeleteLeaves(item.item.LeaveRequestId);
                                const data = result.data;
                                console.log(result, 'DeleteLeaves-result');
                                if (data.IsSuccess) {
                                    Alert.alert('Success', 'Leave request deleted successfully');
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

        const handleEditClick = () => {
            if (leaveToDate < today) {
                Alert.alert(
                    'Error',
                    'You cannot edit a leave request that has already passed.'
                );
                return;
            } else {
                console.log({ item }, 'item-selceted');
                navigateToAddLeave(
                    navigation,
                    PageNames.LEAVES,
                    item.item,
                    +item.item.LeaveRequestId,
                    item.item.LeaveFromDate,
                    item.item.LeaveToDate,
                    item.item?.LeaveReason
                );
            }
        }

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
                        <MyText text={item.item.Name} style={GlobalStyles.mb5} bold color={item.item.IsMyRecord ? '#6aa84f' : Colors.appPrimaryColor} />


                        <View style={GlobalStyles.rowSpaceAround}>
                            {(
                                leaveToDate > today && item.item.Status == "Pending"
                            ) && (
                                    <TouchableOpacity style={GlobalStyles.mr5} onPress={handleDelete}>
                                        <DeleteIcon />
                                    </TouchableOpacity>
                                )
                            }
                            {
                                item.item.Status == "Pending" &&
                                <TouchableOpacity
                                    onPress={handleEditClick}
                                >
                                    <EditIcon size={23} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <View style={GlobalStyles.rowFlexStart}>
                        <MyText text="Date : " bold />
                        <MyText text={`${new Date(item.item.LeaveFromDate).toDateString()} - ${new Date(item.item.LeaveToDate).toDateString()}`} />
                    </View>

                    <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                        <MyText text="Reason : " bold />
                        <MyText text={item.item.LeaveReason} />
                    </View>

                    <View style={GlobalStyles.rowSpaceBetween}>
                        {
                            item.item.LeaveTypeName &&
                            <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                                <MyText text="Type : " bold />
                                <MyText text={item.item.LeaveTypeName} />
                            </View>
                        }
                        <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                            <MyText text="Status : " bold />
                            <MyText text={item.item.Status} color={getLeaveStatusColor(item.item.Status)} />
                        </View>
                    </View>


                    {
                        item.item.StrLeaveActionDate &&
                        <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                            <MyText text="Approved Date : " bold />
                            <MyText text={item.item.StrLeaveActionDate} />
                        </View>
                    }
                    {
                        item.item.StrLeaveActionDate &&
                        <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                            <MyText text="Approved By : " bold />
                            <MyText text={item.item.LeaveActionUserName} />
                        </View>
                    }
                    {
                        item.item.StrLeaveActionDate &&
                        <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                            <MyText text="Approved Remarks : " bold />
                            <MyText text={item.item.LeaveActionRemarks} />
                        </View>
                    }
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
