import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import EmptyListMessage from '../../atom/EmptyListMessage';
import GlobalStyles from '../../../shared/GlobalStyles';
import AttendanceCalenderLegend from '../../atom/AttendanceCalenderLegend';

export default function AttendanceCalendarLegendsTemplate(props: { listData: any }) {
    const { listData } = props;

    const renderItem = (item: any, index: number) => {

        return (
            <View style={[GlobalStyles.rowSpaceBetween, style.container]}>
                {
                    item.item.ListLegands.map((legand: any, index: number) => (
                        <AttendanceCalenderLegend key={index} color={legand.ColorCode} name={legand.Label} />
                    ))
                }
                {/* <AttendanceCalenderLegend color={item.item.ListLegands[0].ColorCode} name={item.item.ListLegands[0].Label} /> */}
                {/* <AttendanceCalenderLegend color={item.item.ColorCode} name={item.item.Label} /> */}
                {/* <AttendanceCalenderLegend color={item.item.ColorCode} name={item.item.Label} /> */}
            </View>

        );
    }
    return (
        <View>
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<EmptyListMessage text="" />}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        marginBottom: 10
    }
})