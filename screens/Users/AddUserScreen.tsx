import React from 'react'
import { View, ScrollView } from 'react-native'
import { DropDownModel } from '../../components/atom/DropDownModalSelector';
import Loader from '../../components/atom/Loader';
import MyButton from '../../components/atom/MyButton';
import FormGroup from '../../components/molecules/FormGroup';
import FormGroupCheckBox from '../../components/molecules/FormGroupCheckBox';
import FormGroupDate from '../../components/molecules/FormGroupDate';
import FormGroupDDL from '../../components/molecules/FormGroupDDL';
import { PageNames } from '../../constants/Config';
import { User } from '../../models/User';
import { GetAllBranches } from '../../services/BranchService';
import { GetAllUsers, GetUsersByUserId, GetWorkTypeAsync, SaveUser } from '../../services/UserService';
import GlobalStyles from '../../shared/GlobalStyles';
import { navigateToUsersScreen } from '../../shared/Routes';
import { RootStackScreenProps } from '../../types';
import MyButtonGroup from '../../components/atom/MyButtonGroup';

export default function AddUserScreen(props: RootStackScreenProps<"AddUser">) {
    const { navigation, route } = props;
    const { userId } = route.params;

    // console.log(route, "route")

    const [name, setName] = React.useState('');
    const [ecode, setEcode] = React.useState('');
    const [mobileNo, setMobileNo] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [designation, setDesignation] = React.useState('');
    const [department, setDepartment] = React.useState('');

    const [dob, setDob] = React.useState('');

    const [isWFH, setisWFH] = React.useState<boolean>(false);
    const [active, setActive] = React.useState<boolean>(true);

    const [joiningDT, setJoiningDT] = React.useState('');
    const [leftDT, setLeftDT] = React.useState('');

    const [genderLabel, setGenderLabel] = React.useState('Select');
    const [genderSelectedVal, setGenderSelectedVal] = React.useState('');

    const [weeklyOffDayLabel1, setWeeklyOffDayLabel1] = React.useState('Select');
    const [weeklyOffDayVal1, setWeeklyOffDayVal1] = React.useState('');

    const [weeklyOffDayLabel2, setWeeklyOffDayLabel2] = React.useState('Select');
    const [weeklyOffDayVal2, setWeeklyOffDayVal2] = React.useState('');

    const [listBranches, setListBranches] = React.useState<DropDownModel[]>([]);
    const [branchId, setBranchId] = React.useState('');
    const [branchLabel, setBranchLabel] = React.useState('Select');

    const [reportingToList, setReportingToList] = React.useState<DropDownModel[]>([]);
    const [reportingToLabel, setReportingToLabel] = React.useState<string>('');
    const [reportingToVal, setReportingToVal] = React.useState<number>(0);

    const [isWFHOrFieldSelectedIndex, setIsWFHOrFieldSelectedIndex] = React.useState<number | null>(null);

    const [listWorkType, setListWorkType] = React.useState<any[]>([]);
    const [selectedWorkTypeVal, setSelectedWorkTypeVal] = React.useState('');
    const [selectedWorkTypeLabel, setSelectedWorkTypeLabel] = React.useState('Select');


    const [isLoading, setIsLoading] = React.useState(false);

    const weeklyOffDays: DropDownModel[] = [
        // { key: '', label: 'Select' },
        { key: 'Mon', label: 'Monday' },
        { key: 'Tue', label: 'Tuesday' },
        { key: 'Wed', label: 'Wednesday' },
        { key: 'Thu', label: 'Thursday' },
        { key: 'Fri', label: 'Friday' },
        { key: 'Sat', label: 'Saturday' },
        { key: 'Sun', label: 'Sunday' },
    ];
    const genderDDL: DropDownModel[] = [
        { key: 'M', label: 'Male' },
        { key: 'F', label: 'Female' }
    ]


    const initilizeData = async () => {
        // const ddt = new Date().toDateString();
        // console.log({ dt: new Date(ddt), ddt }, "initilizeData--------")
        getWorkType();

        await getBranches();
        await getReportingToDDL();

        if (userId && userId > 0) {
            navigation.setOptions({
                headerTitle: "Update User"
            });
            getUserByUserId(userId);
        }

    }

    const getUserByUserId = async (uid: number) => {

        setIsLoading(true);
        const res = await GetUsersByUserId(uid);
        const data = res.data;
        console.log(data.Result, "data-getUserByUserId");
        setIsLoading(false);

        if (data.IsSuccess) {
            const user = data.Result;
            setName(user.Name);
            setEcode(user.ECode);
            setEmail(user.Email);
            setMobileNo(user.MobileNo);
            setPwd(user.Pwd);

            if (user.DOB) {
                // const dateStr = DateService.dateObjToYYYYMMDD(new Date(user.DOB));
                // console.log(dateStr, "dateStr-user.DOB");
                setDob(new Date(user.DOB).toDateString());
            }

            if (user.JoiningDate) {
                setJoiningDT(new Date(user.JoiningDate).toDateString());
            }
            if (user.LeftDate) {
                setLeftDT(new Date(user.LeftDate).toDateString());
            }

            setDepartment(user.Department);
            setDesignation(user.Designation);
            setActive(user.Active);

            if (user.IsWorkFromHome) {
                setIsWFHOrFieldSelectedIndex(0);
            } else if (user.IsFieldWork) {
                setIsWFHOrFieldSelectedIndex(1);
            }
            setSelectedWorkTypeVal(user.WorkType);
            setSelectedWorkTypeLabel(user.WorkTypeName ?? user.WorkType);
            // setisWFH(user.IsWorkFromHome);

            setReportingToVal(user.ReportingToId);
            setReportingToLabel(user.ReportingToName);

            setBranchLabel(user.BranchName);
            setBranchId(user.BranchId);
            if (user?.Gender == 'M') {
                setGenderLabel('Male')
                setGenderSelectedVal('M');
            } else if (user?.Gender == 'F') {
                setGenderLabel('Female')
                setGenderSelectedVal('F');
            }
            setWeeklyOffDayVal1(user?.WeeklyOffDay1 || '');
            setWeeklyOffDayVal2(user?.WeeklyOffDay2 || '');
        }

    }

    const getBranches = async () => {
        setIsLoading(true);
        setBranchLabel('Loading...')
        const res = await GetAllBranches();
        const data = res.data;
        setIsLoading(false);

        if (!userId) {
            setBranchLabel('Select Office Branch')
        }

        const list = data.Result.map((x: any) => ({
            key: x.BranchId,
            label: x.BranchName.trim(),
        }));

        if (list && list.length == 1 && !userId) {
            setBranchLabel(list[0].label);
            setBranchId(list[0].key.toString());
        }

        // console.log(list, "data-branches");

        setListBranches(list);
    }

    const getWorkType = async () => {

        try {

            const finalList: DropDownModel[] = [
                {
                    key: "office",
                    label: "Office"
                }
            ]

            setListWorkType(finalList);

            setSelectedWorkTypeLabel('Select');

        } catch (e) {
            console.error("Error : ", e);
        }
    }

    const getReportingToDDL = async () => {

        setReportingToLabel('loading...');
        const res = await GetAllUsers();
        const data = res.data;
        if (data.IsSuccess) {
            const users = data.Result.map((x: any) => (
                {
                    key: x.UserId,
                    label: x.Name
                }
            ));
            setReportingToList(users);
            setReportingToLabel('Select');
            setReportingToVal(0);
        }
    }

    React.useEffect(() => {
        initilizeData();

    }, [navigation, route])

    const submitClick = async () => {
        if (!branchId?.toString()?.trim()) {
            alert('Select Branch')
            return;
        }
        if (!name?.trim()) {
            alert('Enter Name')
            return;
        }
        if (!ecode?.toString()?.trim()) {
            alert('Enter ECode')
            return;
        }
        if (!mobileNo?.trim()) {
            alert('Enter Mobile No')
            return;
        }

        if (!email?.trim()) {
            alert('Enter Email')
            return;
        }
        if (!pwd?.trim()) {
            alert('Enter Password')
            return;
        }

        // const userId = route.params?.userId;

        const user: User = {
            userId: userId,
            name: name,
            branchId: +branchId,
            eCode: ecode,
            mobileNo: mobileNo,
            email: email,
            pwd: pwd,
            gender: genderSelectedVal,
            dob: dob,
            designation: designation,
            department: department,
            active: active,
            isWorkFromHome: isWFHOrFieldSelectedIndex == 0 ? true : false,
            isFieldWork: isWFHOrFieldSelectedIndex == 1 ? true : false,
            joiningDate: joiningDT,
            leftDate: leftDT,
            ReportingToId: reportingToVal,
            WeeklyOffDay1: weeklyOffDayVal1,
            WeeklyOffDay2: weeklyOffDayVal2,
            workType: selectedWorkTypeVal
        }

        setIsLoading(true);
        const res = await SaveUser(user);
        const data = res.data;
        setIsLoading(false);
        console.log(data, "data-save-user");

        if (data.IsSuccess) {
            clearForm();
            alert('User Saved Successfully !!');

            if (userId && userId > 0) {
                navigateToUsersScreen(navigation, PageNames.ADD_USERS);
            }

        } else if (data.Msg?.toLowerCase() == 'mobileexists') {
            alert('Mobile no is already registered');
        } else if (data.Msg?.toLowerCase() == 'emailexists') {
            alert('Email-Id is already registered');
        } else {
            alert(data.Msg ?? data.Error);
        }

    }

    const clearForm = () => {
        setName('');
        setEmail('');
        setEcode('');
        setMobileNo('');
        setPwd('');

        setGenderSelectedVal('');
        setGenderLabel('Select');

        setWeeklyOffDayVal1('');
        setWeeklyOffDayLabel1('Select');

        setWeeklyOffDayVal2('');
        setWeeklyOffDayLabel2('Select');

        setReportingToVal(0);
        setReportingToLabel('Select');

        setDob('');
        setDesignation('');
        setDepartment('');
        setJoiningDT('');
        setLeftDT('');

        setActive(true);
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 5 }}>
            <View>

                <FormGroupDDL label='Office Branch' listKeyLable={listBranches}
                    placeholder={branchLabel}
                    onChange={(key, label) => {
                        setBranchLabel(label);
                        setBranchId(key);
                    }} required />
                <FormGroup val={name} setVal={setName} label='Name' required />
                <FormGroup val={ecode} setVal={setEcode} label='ECode' required />
                <FormGroup val={mobileNo} setVal={setMobileNo} label='Mobile No' keyboardType='numeric' required />
                <FormGroup val={email} setVal={setEmail} label='Email' required />
                <FormGroup val={pwd} setVal={setPwd} label='Password' required isPasswordField />
                <FormGroupDDL label={'Reporting To'} listKeyLable={reportingToList}
                    placeholder={reportingToLabel}
                    onChange={(key, label) => {
                        setReportingToLabel(label);
                        setReportingToVal(+key);
                    }} />

                <View style={GlobalStyles.rowSpaceBetween}>
                    <View style={{ width: '48%' }}>
                        <FormGroupDDL label='Gender' listKeyLable={genderDDL}
                            placeholder={genderLabel}
                            onChange={(key, label) => {
                                setGenderLabel(label);
                                setGenderSelectedVal(key);
                            }} />
                    </View>
                    <View style={{ width: '48%' }}>
                        <FormGroupDate val={dob} setVal={setDob} label='DOB' maxDate={new Date()} />
                    </View>
                </View>

                <View style={GlobalStyles.rowSpaceBetween}>
                    <View style={{ width: '48%' }}>
                        <FormGroup val={designation} setVal={setDesignation} label='Designation' />
                    </View>
                    <View style={{ width: '48%' }}>
                        <FormGroup val={department} setVal={setDepartment} label='Department' />
                    </View>
                </View>
                <View style={GlobalStyles.rowSpaceBetween}>
                    <View style={{ width: '48%' }}>
                        <FormGroupDate val={joiningDT} setVal={setJoiningDT} label={'Joining Date'} />
                    </View>
                    <View style={{ width: '48%' }}>
                        <FormGroupDate val={leftDT} setVal={setLeftDT} label='Left Date' />
                    </View>
                </View>
                <View style={GlobalStyles.rowSpaceBetween}>
                    <View style={{ width: '48%' }}>
                        <FormGroupDDL
                            label="Week Off Day 1"
                            listKeyLable={weeklyOffDays}
                            placeholder={weeklyOffDays.find((day) => day.key === weeklyOffDayVal1)?.label || 'Select'}
                            onChange={(key, label) => setWeeklyOffDayVal1(key)}
                        />
                    </View>
                    <View style={{ width: '48%' }}>
                        <FormGroupDDL
                            label="Week Off Day 2"
                            listKeyLable={weeklyOffDays}
                            placeholder={weeklyOffDays.find((day) => day.key === weeklyOffDayVal2)?.label || 'Select'}
                            onChange={(key, label) => setWeeklyOffDayVal2(key)}
                        />
                    </View>
                </View>

                <View style={GlobalStyles.rowSpaceBetween}>
                    <View style={{ width: '48%' }}>
                        <FormGroupDDL listKeyLable={listWorkType}
                            placeholder={selectedWorkTypeLabel}
                            label='Work Type'
                            onChange={(key, lable) => {
                                setSelectedWorkTypeLabel(lable);
                                setSelectedWorkTypeVal(key);
                                if (key.toUpperCase() == "WFH") {
                                    setIsWFHOrFieldSelectedIndex(0);
                                } else if (key.toUpperCase() == "FIELD") {
                                    setIsWFHOrFieldSelectedIndex(1);
                                } else {
                                    setIsWFHOrFieldSelectedIndex(null);
                                }
                            }}
                        />
                    </View>
                    <View style={{ width: '48%', marginTop: 10 }}>
                        <FormGroupCheckBox val={active} setVal={setActive} label='Active' />
                    </View>
                </View>
                {/* <View >
                    <MyButtonGroup
                        disabled
                        buttons={["WFH", "Field"]}
                        selectedIndex={isWFHOrFieldSelectedIndex}
                        onPress={(selectedIndex) => {
                            setIsWFHOrFieldSelectedIndex(selectedIndex);
                        }} />

                </View> */}

                <MyButton text='Submit' loading={isLoading} onPress={submitClick} containerStyle={{ marginVertical: 5, marginBottom: 15 }} />

            </View>
        </ScrollView>
    )
}
