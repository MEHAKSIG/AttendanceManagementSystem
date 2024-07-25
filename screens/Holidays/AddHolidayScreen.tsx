import { View, Text, Alert } from 'react-native'
import React from 'react'
import FormGroupDate from '../../components/molecules/FormGroupDate';
import FormGroup from '../../components/molecules/FormGroup';
import MyButton from '../../components/atom/MyButton';
import { SaveLeave } from '../../services/LeaveService';
import { RootStackScreenProps } from '../../types';
import { navigateToLeave } from '../../shared/Routes';
import { PageNames } from '../../constants/Config';
import { SaveHoliday } from '../../services/HolidayService';
import { navigateToHolidaysScreen } from '../../shared/Routes';
import FormGroupDDL from '../../components/molecules/FormGroupDDL';
import { DropDownModel } from '../../components/atom/DropDownModalSelector';
import { GetAllBranches } from '../../services/BranchService';
import { getUserDetail } from '../../services/DataStorageService';
import { getUserRoleLocalStorage } from '../../services/DataStorageService';
import GlobalStyles from '../../shared/GlobalStyles';

export default function AddHolidayScreen(props: RootStackScreenProps<"AddHoliday">) {
    //get all levae records from LeaveScreen
    const { navigation, route } = props;
    console.log(props.route, "route-AddHoliday");
    const { defaultHolidayId, defaultHolidayDate, defaultHolidayName, defaultBranchId } = route.params;
    console.log(defaultHolidayId, defaultHolidayDate, defaultHolidayName, defaultBranchId, "route.params-AddHoliday");

    const [holidayDate, setHolidayDate] = React.useState<string>(new Date(defaultHolidayDate).toDateString());
    // const [toDate, setToDate] = React.useState<string>(new Date(defaulToDate).toDateString());
    const [holidayName, setHolidayName] = React.useState<string | undefined>(defaultHolidayName);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [listBranches, setListBranches] = React.useState<DropDownModel[]>([]);
    const [branchId, setBranchId] = React.useState<number | undefined>(defaultBranchId);
    const [branchLabel, setBranchLabel] = React.useState('Select');

    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    const [isBranchHead, setIsBranchHead] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {

            const userRole = await getUserRoleLocalStorage();
            setIsAdmin(userRole.IsAdmin);
            setIsBranchHead(userRole.IsBranchHead);
        }
        )();
    }, [])

    const initilizeData = async () => {

        getBranches();
        //await getReportingToDDL();

        // if (userId && userId > 0) {
        //     navigation.setOptions({
        //         headerTitle: "Update User"
        //     });
        //     getUserByUserId(userId);
        // }

    }

    const getBranches = async () => {
        setIsLoading(true);
        setBranchLabel('Loading...')
        const res = await GetAllBranches();
        const data = res.data;
        setIsLoading(false);

        const list = data.Result.map((x: any) => ({
            key: x.BranchId.toString(),
            label: x.BranchName.trim(),
        }));

        if (defaultBranchId && defaultBranchId > 0) {
            const branch = list.find((x: any) => x.key == defaultBranchId);
            setBranchLabel(branch.label);
            setBranchId(branch.key);
            navigation.setOptions({
                headerTitle: "Update Holiday"
            });
        } else if (list && list.length == 1) {
            setBranchLabel(list[0].label);
            setBranchId(list[0].key);
        } else {
            setBranchLabel('Select Office Branch')
        }

        // console.log(list, "data-branches");

        setListBranches(list);
    }

    React.useEffect(() => {
        initilizeData();
        // if (defaultBranchId) {
        //     setBranchLabel(listBranches.find(branch => branch.key === defaultBranchId)?.label || 'Select Office Branch');
        // } else {
        //     setBranchLabel('Select Office Branch');
        // }
    }, [navigation, route])

    const onSubmitClick = async () => {

        const user = await getUserDetail();
        const userBranchId = user.branchId

        try {
            if (!holidayName?.trim()) {
                alert('Enter Holiday Name');
                return false;
            }

            setIsLoading(true);

            const finalBranchId = isAdmin ? branchId : userBranchId;


            if (!finalBranchId?.toString()?.trim()) {
                alert('Select Branch')
                return;
            }

            const res = await SaveHoliday(defaultHolidayId, holidayDate, holidayName, finalBranchId);


            const data = res.data;
            setIsLoading(false);

            if (data.IsSuccess) {
                alert(data.Msg);
                navigateToHolidaysScreen(navigation, PageNames.ADD_HOLIDAY);
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
            {isAdmin && (
                <FormGroupDDL
                    label='Office Branch'
                    listKeyLable={listBranches}
                    placeholder={branchLabel}
                    onChange={(key, label) => {
                        setBranchLabel(label);
                        setBranchId(parseInt(key));
                    }}
                    required
                />
            )}

            <FormGroupDate label='Holiday Date' required val={holidayDate} setVal={setHolidayDate} />
            {/* <FormGroupDate label='Leave To' required val={toDate} setVal={setToDate} /> */}
            <FormGroup label='Holiday Name' required val={holidayName} setVal={setHolidayName} multiline />

            <MyButton text='Submit' loading={isLoading} onPress={onSubmitClick} containerStyle={{ marginTop: 15 }} />


        </View>
    )
}