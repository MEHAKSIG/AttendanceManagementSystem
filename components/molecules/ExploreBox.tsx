import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import GlobalStyles from '../../shared/GlobalStyles';
import MyText from '../atom/MyText';

export interface ExploreBoxProps {
    title: string,
    description?: string,
    color?: string,
    icon: React.ReactElement,
    onPress?: () => void
}
export default function ExploreBox(props: ExploreBoxProps) {
    const { title, description, color, icon, onPress } = props;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[GlobalStyles.leftRightParentContainer, { margin: 5, marginBottom: 10, padding: 15, borderWidth: 1, borderColor: color, backgroundColor: color, borderRadius: 10, paddingTop: 20, paddingBottom: 20 }]}>
            <View style={[GlobalStyles.leftContainer, { flex: .7 }]}>
                <MyText textFont='source-sans' text={title} fontSize={25} style={{ marginBottom: 10 }} />
                <MyText textFont='source-sans' text={description ?? ""} fontSize={15} style={{ marginBottom: 10 }} />
            </View>
            <View style={[GlobalStyles.rightContainer, { flex: .3 }]}>
                {icon && icon}
            </View>
        </TouchableOpacity>
    )
}