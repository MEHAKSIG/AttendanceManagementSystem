
import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { PageNames } from '../../../constants/Config';
import GlobalStyles from '../../../shared/GlobalStyles';
import { EditUserIcon, EyeColorfullImgIcon } from '../../../shared/Icons';
import { navigateToAddUser } from '../../../shared/Routes';
import EmptyListMessage from '../../atom/EmptyListMessage';
import MyText from '../../atom/MyText';
import UserDetailModal from '../../organisms/UserDetailModal';
import { MonoText, SourceSansText } from '../../StyledText';

export default function UserTemplate(props: { listData: any, navigation: any }) {
    const { listData, navigation } = props;

    const [openDetailModal, setOpenDetailModal] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<any>();


    const renderItem = (item: any, index: number) => {
        return (
            <View style={{ padding: 5, borderBottomColor: '#D2D7D7', borderBottomWidth: 1 }}>
                <View style={GlobalStyles.rowSpaceBetween}>
                    <MyText style={GlobalStyles.mb5} text={item.item.Name}/>
                    <MyText style={GlobalStyles.mb5} text={item.item.MobileNo}/>
                    
                </View>
                <View style={GlobalStyles.rowSpaceBetween}>
                    <MyText style={GlobalStyles.mb5} text={item.item.Email}/>
                    
                    <View style={GlobalStyles.rowSpaceAround}>
                        <TouchableOpacity style={GlobalStyles.mr5} onPress={() => {
                            setSelectedUser(item.item);
                            setOpenDetailModal(true);
                        }}>
                            <EyeColorfullImgIcon />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigateToAddUser(navigation, PageNames.USERS, item.item.UserId);
                        }}>
                            <EditUserIcon size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
    return (
        <View>
            <UserDetailModal isOpen={openDetailModal} setIsOpen={setOpenDetailModal} userDetail={selectedUser} />
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<EmptyListMessage text="No Data Found" />}
            />
        </View>
    )
}
