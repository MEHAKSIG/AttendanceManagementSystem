
import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Colors from '../../../constants/Colors';
import { PageNames } from '../../../constants/Config';
import GlobalStyles from '../../../shared/GlobalStyles';
import { EditIcon } from '../../../shared/Icons';
import { navigateToAddBranches } from '../../../shared/Routes';
import EmptyListMessage from '../../atom/EmptyListMessage';
import MyText from '../../atom/MyText';
import { MonoText, SourceSansText } from '../../StyledText';

export default function BranchesTemplate(props: { listData: any, navigation: any }) {
    const { listData, navigation } = props;
    const renderItem = (item: any, index: number) => {

        return (
            <View style={{ padding: 10, borderColor: '#D2D7D7', borderWidth: 1 }}>
                <View>
                    <View style={GlobalStyles.rowSpaceBetween}>
                        <MyText bold color={Colors.appPrimaryColor} style={GlobalStyles.mb5} text={item.item.BranchName} />

                        <TouchableOpacity onPress={() => {
                            navigateToAddBranches(navigation, PageNames.BRANCH, item.item);
                        }} >
                            <EditIcon />
                        </TouchableOpacity>
                    </View>

                    <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                        <MyText text="Branch Code : " bold />
                        <MyText text={item.item.BranchCode} />
                    </View>

                    <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                        <MyText text="Latitude : " bold />
                        <MyText text={item.item.BranchLatitude} />
                    </View>

                    <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                        <MyText text="Longitude : " bold />
                        <MyText text={item.item.BranchLongitude} />
                    </View>

                    <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                        <MyText text="Location : " bold />
                        <MyText text={item.item.LocationName} />
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
