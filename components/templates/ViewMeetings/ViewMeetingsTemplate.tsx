
import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Colors from '../../../constants/Colors';
import GlobalStyles from '../../../shared/GlobalStyles';
import EmptyListMessage from '../../atom/EmptyListMessage';
import MyText from '../../atom/MyText';
import { ExpoIcon, GoogleIcon } from '../../../shared/Icons';

export default function ViewMeetingsTemplate(props: { listData: any, navigation: any }) {
    const { listData, navigation } = props;
    const renderItem = (item: any, index: number) => {

        return (
            <View style={{ padding: 10, borderColor: '#D2D7D7', borderWidth: 1 }}>
                <View>
                    <View style={[GlobalStyles.rowSpaceBetween, GlobalStyles.mb5]}>
                        <MyText text={item.item.StrMeetingDate} style={[GlobalStyles.textBold, { color: Colors.appPrimaryColor }]} />
                        <MyText text={item.item.Name} color={item.item.IsMyRecord ? '#6aa84f' : Colors.grey} />
                    </View>
                    <View style={GlobalStyles.rowFlexStart}>
                        <MyText bold text='Time : ' />
                        <MyText text={`${item.item.StrInMeetingTime} - ${item.item.StrOutMeetingTime}`} />
                    </View>
                    <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                        <MyText bold text='Start Location : ' />
                        {item.LocationProviderIn === 'Google' ? <GoogleIcon width={14} height={14} /> :
                        item.LocationProviderIn === 'Expo' ? <ExpoIcon width={14} height={14} /> :null
                            }
                        <MyText text={item.item.InLocationName} />
                    </View>
                    <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                        <MyText bold text='End Location : ' />
                        {item.LocationProviderOut === 'Google' ? <GoogleIcon width={14} height={14} /> :
                        item.LocationProviderOut === 'Expo' ? <ExpoIcon width={14} height={14} /> :
                            null}
                        <MyText text={item.item.OutLocationName} />
                    </View>
                </View>
            </View>
        );
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
