import React from 'react'
import { View, Text, FlatList } from 'react-native'
import GlobalStyles from '../../../shared/GlobalStyles';
import EmptyListMessage from '../../atom/EmptyListMessage';
import MyText from '../../atom/MyText';
import { MonoText, SourceSansText } from '../../StyledText';
import Colors from '../../../constants/Colors';
import { ExpoIcon, GoogleIcon, LocationIcon } from '../../../shared/Icons';

export default function AttendanceReportTemplate(props: { listData: any }) {
    const { listData } = props;
    const renderItem = ({ item, index }: { item: any, index: number }) => {
        // console.log(item, "item AttendanceReportTemplate");
        const { DeviceInfo } = item;
        let deviceDetail: any;
        if (DeviceInfo) {
            try {
                deviceDetail = JSON.parse(DeviceInfo);
                console.log(deviceDetail, "DeviceInfo-deviceDetail");

            } catch {
            }
        }

        return (

            <View>
                {
                    item &&
                    (
                        <View style={{ padding: 3 }}>
                            <View style={[GlobalStyles.rowSpaceBetween, { paddingHorizontal: 5 }]}>
                                {/* <SourceSansText style={{ fontWeight: 'bold', color: Colors.orange }}>
                                    {item?.StrAttendanceDate}</SourceSansText> */}
                                <MyText textFont='source-sans' bold color={Colors.orange} text={item?.StrAttendanceDate} />
                                {
                                    item.IsWFH &&
                                    <MyText textFont='source-sans' bold text={'WFH'} />
                                    // <SourceSansText style={{ fontWeight: 'bold' }}>WFH</SourceSansText>
                                }
                            </View>
                            <View style={{ paddingHorizontal: 5 }}>
                                <UserAttendance item={item} />
                                {/* <Text> {JSON.stringify(item)}</Text> */}
                            </View>
                        </View>
                    )
                }

            </View>
        );
    }

    const UserAttendance = ({ item }: { item: any }) => {
        if (!item) {
            return <></>
        }
        // console.log(listAttendance, "listAttendance");
        return (
            // listAttendance?.map((item: any, index: number) => {
            // return (
            <View style={{ padding: 2, borderColor: '#D2D7D7', borderBottomWidth: 1, paddingBottom: 5 }}>
                <View style={[GlobalStyles.rowSpaceBetween, { marginBottom: 3 }]}>
                    <MyText text={`${item.Name} (${item.BranchName})`} bold color={item.IsMyRecord ? '#6aa84f' : undefined} />
                    {/* <Text style={{ fontWeight: 'bold' }}>{item.Name} ({item.BranchName})</Text> */}
                    <MyText
                        text={`${item.StrInAttendanceTime}${item.StrOutAttendanceTime ? ` - ${item.StrOutAttendanceTime}` : ""}`}
                    />

                </View>

                <Text style={{ color: 'gray', paddingBottom: 3 }}>
                    In :{' '}
                    {item.LocationProviderIn === 'Google' ? <GoogleIcon width={14} height={14} /> :
                        item.LocationProviderIn === 'Expo' ? <ExpoIcon width={14} height={14} /> :
                            <LocationIcon color="gray" size={15} />}
                    {' '}{item.InLocationName}
                </Text>
                <Text style={{ color: 'gray' }}>
                    Out :{' '}
                    {item.LocationProviderOut === 'Google' ? <GoogleIcon width={14} height={14} /> :
                        item.LocationProviderOut === 'Expo' ? <ExpoIcon width={14} height={14} /> :
                            <LocationIcon color="gray" size={15} />}
                    {/* <LocationIcon color='gray' size={15} /> */}
                    {' '}{item.OutLocationName}
                </Text>
                {
                    item?.InOutTimeDiff &&
                    <MyText color='grey' text={`Total Time : ${item?.InOutTimeDiff}`} />
                }
                {/* <MyText text={'Leave Type'} />
                <MyText text={item.LeaveType} /> */}
            </View>
            //     )
            // })
        )
    }


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
