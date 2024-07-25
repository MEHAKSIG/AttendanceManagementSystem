
import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import GlobalStyles from '../../../../shared/GlobalStyles';
import MyText from '../../../atom/MyText';
import EmptyListMessage from '../../../atom/EmptyListMessage';

export default function AttendanceCountDetailsTemplate(props: { listData: any }) {
    const { listData } = props;

    const renderItem = (item: any, index: number) => {
        return (
            <View style={{ padding: 5, borderBottomColor: '#D2D7D7', borderBottomWidth: 1 }}>
                <View style={GlobalStyles.rowSpaceBetween}>
                    <MyText style={GlobalStyles.mb5} text={item.item.Name} />
                    <MyText style={GlobalStyles.mb5} text={item.item.MobileNo} />

                </View>
                <View style={GlobalStyles.rowSpaceBetween}>
                    <MyText style={GlobalStyles.mb5} text={item.item.Email} />
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
