import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import GlobalStyles from '../../../shared/GlobalStyles';
import EmptyListMessage from '../../atom/EmptyListMessage';
import MyText from '../../atom/MyText';
import Colors, { getLeaveStatusColor } from '../../../constants/Colors';
import MyButton from '../../atom/MyButton';
import { LeaveStatus } from '../../../services/LeaveApprovalService';

interface LeaveApprovalTemplateProps {
    listData: any,
    navigation: any,
    onApproveClick: (item: any) => void,
    onRejectClick: (item: any) => void
}

export default function LeaveApprovalTemplate(props: LeaveApprovalTemplateProps) {
    const { listData, navigation, onApproveClick, onRejectClick } = props;

    // const getStatusColor = (status: string) => {
    //     const statusColors = {
    //         "Pending": "blue",
    //         "Approved": "green",
    //         "Reject": "red"
    //     }
    //     return statusColors[status] as string;
    // }
    // type LeaveStatus = "Pending" | "Approved" | "Reject";

   

    const renderItem = (item: any, index: number) => {
        return (
            <View
                style={{
                    padding: 10,
                    borderColor: '#D2D7D7',
                    borderWidth: 1,
                    borderBottomWidth: 0,
                    backgroundColor: '#fff',
                }}
            >
                <View>

                    <View style={GlobalStyles.rowSpaceBetween}>
                        <MyText text={item.item.Name} style={GlobalStyles.mb5} bold color={item.item.IsMyRecord ? '#6aa84f' : Colors.appPrimaryColor} />

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

                    {/* <View style={{ borderWidth: 1 }}></View> */}

                    {
                        item.item.Status == "Pending" &&

                        <View style={[GlobalStyles.rowFlexEnd, GlobalStyles.mt5]}>
                            {/* <View style={GlobalStyles.mr5}>
                                <MyButton text='Approve'
                                    buttonStyle={{ width: 100, padding: 0, margin: 0 }}
                                    containerStyle={{ padding: 0, margin: 0 }}
                                />
                            </View>
                            <View style={GlobalStyles.ml5}>
                                <MyButton text='Reject' />
                            </View> */}
                            <TouchableOpacity style={[GlobalStyles.mr5, style.actionButton, { backgroundColor: 'green' }]}
                                onPress={() => {
                                    onApproveClick(item.item);
                                }}>
                                <MyText text='Approve' color='#fff' fontSize={12} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    onRejectClick(item.item);
                                }}
                                style={[GlobalStyles.ml5, style.actionButton, { backgroundColor: 'red' }]}
                            >
                                <MyText text='Reject' color='#fff' fontSize={12}  />
                            </TouchableOpacity>
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
const style = StyleSheet.create({
    actionButton: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 3
    }

})