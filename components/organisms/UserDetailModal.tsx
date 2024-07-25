import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import GlobalStyles from '../../shared/GlobalStyles';
import ViewModal from './ViewModal'

export default function UserDetailModal(props: { userDetail: any, isOpen: boolean, setIsOpen: any }) {
    const { isOpen, setIsOpen, userDetail } = props;
    console.log(userDetail, "userDetail");
    return (
        <View>
            <ViewModal isVisible={isOpen} setIsVisible={setIsOpen} title={`${userDetail?.Name} - ${userDetail?.ECode}`} titleStyle={{ textAlign: 'center' }} hideSubmitButtons>
                {/* <View style={GlobalStyles.rowSpaceBetween}>
                    <Text>Name </Text>
                    <Text>{userDetail?.Name} </Text>
                </View> */}
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.label}>Office Branch : {userDetail?.BranchName} </Text>
                    {/* <Text style={styles.label}>ECode : {userDetail?.ECode} </Text> */}
                    {/* <Text style={styles.label}>Name : {userDetail?.Name} </Text> */}
                    <Text style={styles.label}>Mobile : {userDetail?.MobileNo} </Text>
                    <Text style={styles.label}>Email : {userDetail?.Email} </Text>
                    <Text style={styles.label}>Password : {userDetail?.Pwd} </Text>
                    <Text style={styles.label}>DOB : {userDetail?.DOBStr} </Text>
                    <Text style={styles.label}>Sex : {userDetail?.Gender} </Text>
                    <Text style={styles.label}>Designation : {userDetail?.Designation} </Text>
                    <Text style={styles.label}>Department : {userDetail?.Department} </Text>
                    <Text style={styles.label}>Active : {userDetail?.Active ? 'Yes' : 'No'} </Text>
                    <Text style={styles.label}>Work From Home : {userDetail?.IsWorkFromHome ? 'Yes' : 'No'} </Text>
                    <Text style={styles.label}>Joining Date : {userDetail?.JoiningDateStr} </Text>
                    <Text style={styles.label}>Left Date : {userDetail?.LeftDateStr} </Text>
                </View>
            </ViewModal>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        padding: 3
    }
})