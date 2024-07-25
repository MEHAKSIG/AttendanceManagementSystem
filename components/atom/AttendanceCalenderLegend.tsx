import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GetLegendsColor } from '../../services/AttendanceService';
import GlobalStyles from '../../shared/GlobalStyles';
import { SolidCircleIcon } from '../../shared/Icons';
import { SourceSansText } from '../StyledText';

interface AttendanceCalenderLegendProps {
    color: string,
    name: string
}
export default function AttendanceCalenderLegend(props: AttendanceCalenderLegendProps) {
    const { color, name } = props;
    return (
        <View style={[GlobalStyles.rowFlexStart, style.legendContainer]}>
            <SolidCircleIcon color={color} />
            <SourceSansText style={[style.legendLabel, { color: '#000' }]}>{name}</SourceSansText>
        </View>
    )
}

const style = StyleSheet.create({
    legendParentContainer: {
        backgroundColor: '#fff'
        , padding: 10
        // , paddingLeft: 15
        // , paddingRight: 15
        , paddingTop: 30,
        // marginTop: 20
    },
    legendContainer: {
        flex: .33
    },
    legendLabel: {
        marginLeft: 15
    }
})