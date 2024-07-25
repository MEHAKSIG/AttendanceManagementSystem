import { View, Text, Alert } from 'react-native'
import React from 'react'
import FormGroupDate from '../../components/molecules/FormGroupDate';
import FormGroup from '../../components/molecules/FormGroup';
import MyButton from '../../components/atom/MyButton';
import { GetLeaveTypesAsync, SaveLeave } from '../../services/LeaveService';
import { RootStackScreenProps } from '../../types';
import { navigateToLeave } from '../../shared/Routes';
import { PageNames } from '../../constants/Config';
import FormGroupDDL from '../../components/molecules/FormGroupDDL';
import { DropDownModel } from '../../components/atom/DropDownModalSelector';
import GlobalStyles from '../../shared/GlobalStyles';


export default function AddLeaveScreen(props: RootStackScreenProps<"AddLeave">) {
    //get all levae records from LeaveScreen
    const { navigation, route } = props;
    // console.log(props.route, "route-AddLeave");
    const { leaveRequestId, leaveObject, defaultFromDate, defaulToDate, defaultLeaveReason } = route.params;
    console.log(leaveObject, "route.params-AddLeave");

    const [fromDate, setFromDate] = React.useState<string>(new Date(defaultFromDate).toDateString());
    const [toDate, setToDate] = React.useState<string>(new Date(defaulToDate).toDateString());
    const [leaveReason, setLeaveReason] = React.useState<string | undefined>(defaultLeaveReason);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [listLeaveTypes, setListLeaveTypes] = React.useState<any[]>([]);
    const [selectedLeaveTypeVal, setSelectedLeaveTypeVal] = React.useState<string>('');
    const [selectedLeaveTypeLabel, setSelectedLeaveTypeLabel] = React.useState<string>('Select');


    const initiData = async () => {
        if (leaveRequestId) {
            navigation.setOptions({
                headerTitle: "Update Leave Request"
            });

            if (leaveObject) {
                setSelectedLeaveTypeLabel(leaveObject.LeaveTypeName)
                setSelectedLeaveTypeVal(leaveObject.LeaveType)
            }
        }

        getLeaveTypes();
    }

    const getLeaveTypes = async () => {
        try {
            const res = await GetLeaveTypesAsync();
            const data = res.data;
            // console.log(data, "data-leaveTypes");
            if (data.IsSuccess) {
                const list = data.Result.leaveTypes;
                const finalList: DropDownModel[] = list.map((item: any) => {
                    return {
                        key: item.Value,
                        label: item.Text,
                    }
                });
                // console.log(finalList, "finalList");
                setListLeaveTypes(finalList);
            } else {
                console.error(data.Msg);
            }

        } catch (e) {
            console.error("Error : ", e);
        }
    }

    React.useEffect(() => {
        initiData();
        // getLocation();
    }, [])

    const onSubmitClick = async () => {

        try {

            if (!leaveReason?.trim()) {
                alert('Enter Leave Reason');
                return false;
            }
            if (!selectedLeaveTypeVal?.trim()) {
                alert('Select Leave Type');
                return false;
            }
            if (!fromDate?.trim() || !toDate?.trim()) {
                alert('Enter Valid Dates');
                return false;
            }

            setIsLoading(true);
            const res = await SaveLeave(leaveRequestId, fromDate, toDate, leaveReason, selectedLeaveTypeVal);
            const data = res.data;
            setIsLoading(false);
            if (data.IsSuccess) {
                alert(data.Msg);
                navigateToLeave(navigation, PageNames.ADD_LEAVE);
            } else {
                alert(data.Msg);
            }
            console.log(data, "data");

        } catch (e) {
            setIsLoading(false);
        }
    }


    return (
        <View style={GlobalStyles.screenContainer}>
            <FormGroupDDL
                required
                listKeyLable={listLeaveTypes}
                placeholder={selectedLeaveTypeLabel}
                label='Leave Type'
                onChange={(key, label) => {
                    setSelectedLeaveTypeLabel(label);
                    setSelectedLeaveTypeVal(key);
                }}
            />
            <FormGroupDate label='Leave From' required val={fromDate} setVal={setFromDate} />
            <FormGroupDate label='Leave To' required val={toDate} setVal={setToDate} />
            <FormGroup label='Leave Reason' required val={leaveReason} setVal={setLeaveReason} multiline />

            <MyButton text='Submit' loading={isLoading} onPress={onSubmitClick} containerStyle={{ marginTop: 15 }} />


        </View>
    )
}