import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import GlobalStyles from '../../shared/GlobalStyles';
import { UsersImgGirlIcon } from '../../shared/Icons';

interface AttendanceCountBoxProps {
    label: string,
    count: number,
    onPress?: () => void
}

export default function AttendanceCountBox(props: AttendanceCountBoxProps) {
    const { label, count, onPress } = props;

    return (
        <TouchableOpacity style={[GlobalStyles.rowSpaceBetween, styles.box, shadowStyle]}
            onPress={onPress}
        >
            <View>
                <Text style={styles.number}>{count}</Text>
                <Text style={styles.label}>{label}</Text>
            </View>
            <View>
                {/* <UsersImgGirlIcon height={60} width={50} /> */}
            </View>
        </TouchableOpacity>
    );
}

const shadowStyle = Platform.select({
    ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    android: {
        elevation: 5,
    },
});

const styles = StyleSheet.create({
    box: {
        width: '47%',
        margin: 4,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D2D7D7',
    },
    number: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        textAlign: 'left',
    },
});
