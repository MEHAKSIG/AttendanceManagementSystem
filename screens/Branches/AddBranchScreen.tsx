import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Input from '../../components/atom/Input'
import MyButton from '../../components/atom/MyButton'
import FormGroup from '../../components/molecules/FormGroup'
import { PageNames } from '../../constants/Config'
import { getCurrentLocation } from '../../helpers/LocationHelper'
import { SaveBranches } from '../../services/BranchService'
import { getUserDetail } from '../../services/DataStorageService'
import GlobalStyles from '../../shared/GlobalStyles'
import { LocationIcon } from '../../shared/Icons'
import { navigateToAddBranches, navigateToBranchScreen } from '../../shared/Routes'
import { RootStackScreenProps } from '../../types'
import { DropDownModel } from '../../components/atom/DropDownModalSelector'
import FormGroupDDL from '../../components/molecules/FormGroupDDL'

export default function AddBranchScreen(props: RootStackScreenProps<"AddBranch">) {
    const { navigation, route } = props;

    const { branch } = route.params;
    console.log(route.params, "route.params");

    const [branchName, setBranchName] = React.useState('')

    // const [existingBranchCode, setExistingBranchCode] = React.useState<string | null>()
    // const [existingLocationName, setExistingLocationName] = React.useState<string | null>()
    // const [existingBranchLatitude, setExistingBranchLatitude] = React.useState<number>()
    // const [existingBranchLongitude, setExistingBranchLongitude] = React.useState<number>()


    const [branchCode, setBranchCode] = React.useState<string>('');
    const [locationName, setLocationName] = React.useState<string | null>()
    const [branchLatitude, setBranchLatitude] = React.useState<number>()
    const [branchLongitude, setBranchLongitude] = React.useState<number>()

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [loadingLocation, setLoadingLocation] = React.useState<boolean>(false);
    const [isUpdate, setIsUpdate] = React.useState<boolean>(false);

    const [weeklyOffDayLabel1, setWeeklyOffDayLabel1] = React.useState('Select');
    const [weeklyOffDayVal1, setWeeklyOffDayVal1] = React.useState('');

    const [weeklyOffDayLabel2, setWeeklyOffDayLabel2] = React.useState('Select');
    const [weeklyOffDayVal2, setWeeklyOffDayVal2] = React.useState('');

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

    const getAndUpdateCurrentLocation = async () => {

        setLoadingLocation(true);
        const location = await getCurrentLocation();
        setLoadingLocation(false);

        console.log(location, "loc")
        setLocationName(location?.expoAddress);
        setBranchLatitude(location?.latitude);
        setBranchLongitude(location?.longitude);
    }

    const initiData = async () => {
        if (branch) {

            setIsUpdate(true);

            // setExistingBranchCode(branch.BranchCode)
            // setExistingLocationName(branch.LocationName)
            // setExistingBranchLatitude(branch.BranchLatitude)
            // setExistingBranchLongitude(branch.BranchLongitude)

            setBranchName(branch.BranchName);
            setBranchCode(branch.BranchCode);
            setLocationName(branch.LocationName);
            setBranchLatitude(branch.BranchLatitude);
            setBranchLongitude(branch.BranchLongitude);
            setWeeklyOffDayVal1(branch?.WeeklyOffDay1 || '');
            setWeeklyOffDayVal2(branch?.WeeklyOffDay2 || '');
            navigation.setOptions({
                headerTitle: "Update Branch Location"
            });
        }
    }

    React.useEffect(() => {
        initiData();
        // getLocation();
    }, [])

    const saveBranch = async () => {
        try {
            if (!branchCode?.trim()) {
                alert('Enter Branch Code');
                return;
            }
            if (!branchName?.trim()) {
                alert('Enter Branch Name');
                return;
            }

            const user = await getUserDetail();

            setIsLoading(true);
            const res = await SaveBranches(branchCode, branch?.BranchId ?? 0, user.userId ?? 0, branchName, locationName ?? '', branchLatitude, branchLongitude, weeklyOffDayVal1, weeklyOffDayVal2);
            const data = res.data;
            console.log(data, "data-save")
            setIsLoading(false);

            if (data.IsSuccess) {
                setBranchName('');
                setBranchCode('');
                setWeeklyOffDayVal1('');
                setWeeklyOffDayLabel1('Select');

                setWeeklyOffDayVal2('');
                setWeeklyOffDayLabel2('Select');
                alert('Office Location Saved Successfully !');
                navigateToBranchScreen(navigation, PageNames.ADD_BRANCH);

            } else {
                alert(data.Msg ?? data.Error)
            }


        } catch (e) {
            setIsLoading(false);

        }
    }

    return (
        <View style={{ padding: 15, flex: 1, backgroundColor: '#fff' }}>

            <FormGroup label='Branch Code' val={branchCode} setVal={setBranchCode}
                formGroupLabelStyle={{ fontWeight: 'bold' }}
                placeholder="unique Branch code (max 10 character)"
                required />

            <FormGroup label='Office Branch Nane' val={branchName} setVal={setBranchName}
                formGroupLabelStyle={{ fontWeight: 'bold' }}
                required />
            {/* <View style={{ paddingTop: 10 }} >
                <Text style={styles.lable}>Office Branch Name*</Text>
                <Input value={branchName} onChangeText={val => setBranchName(val)}
                    style={{ padding: 5 }}
                />
            </View> */}

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
            <View style={{ paddingTop: 10 }} >
                <View style={GlobalStyles.rowSpaceBetween}>
                    <Text style={styles.lable}>
                        Office Location
                    </Text>
                    <TouchableOpacity onPress={() => {
                        getAndUpdateCurrentLocation();
                    }} >
                        <Text style={[styles.lable, { color: 'green' }]}>Current Location
                            {/* <LocationIcon size={15} color='#000' /> */}
                        </Text>

                    </TouchableOpacity>
                </View>




                <Text>
                    {loadingLocation ? 'loading...' : locationName}
                </Text>
            </View>
            <View style={{ paddingTop: 10 }} >
                <Text style={styles.lable}>Office Latitude</Text>
                <Text>
                    {loadingLocation ? 'loading...' : branchLatitude}

                </Text>
            </View>
            <View style={{ paddingTop: 10, marginBottom: 20 }} >
                <Text style={styles.lable}>Office Longitude</Text>
                <Text>
                    {loadingLocation ? 'loading...' : branchLongitude}
                </Text>
            </View>

            <MyButton text={isUpdate ? 'Update Branch' : 'Add New Branch'}
                onPress={saveBranch} loading={isLoading}
                disabled={loadingLocation || isLoading}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    lable: {
        fontWeight: 'bold'
    }
});