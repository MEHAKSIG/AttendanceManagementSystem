import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BaseProps } from '../../App'
import MyButton from '../../components/atom/MyButton';
import FormGroup from '../../components/molecules/FormGroup';
import { SourceSansText } from '../../components/StyledText';
import { PageNames } from '../../constants/Config';
import { getCurrentLocation } from '../../helpers/LocationHelper';
import { SaveBranchesAfterRegisteration } from '../../services/AccountService';

import { navigateToRegisterSuccess } from '../../shared/Routes';
import { RootStackScreenProps } from '../../types';

export default function AddBranchAfterRegisterScreen(props: BaseProps) {
    const { navigation, route } = props;
    const { userId, accessToken } = route.params;

    const [branchCode, setBranchCode] = React.useState<string | null>()
    const [locationName, setLocationName] = React.useState<string | null>()
    const [branchLatitude, setBranchLatitude] = React.useState<number>()
    const [branchLongitude, setBranchLongitude] = React.useState<number>()

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [loadingLocation, setLoadingLocation] = React.useState<boolean>(false);
    const [isUpdate, setIsUpdate] = React.useState<boolean>(false);

    const [branchName, setBranchName] = React.useState('Head Office')


    const getLocation = async () => {

        setLoadingLocation(true);
        const location = await getCurrentLocation();
        setLoadingLocation(false);

        console.log(location, "loc")
        setLocationName(location?.expoAddress);
        setBranchLatitude(location?.latitude);
        setBranchLongitude(location?.longitude);
    }

    const initiData = async () => {

    }

    React.useEffect(() => {
        initiData();
        getLocation();
    }, [])

    const saveBranch = async () => {
        try {
            if (!branchName?.trim()) {
                alert('Enter Branch Name');
                return;
            }
            if (!branchCode?.trim()) {
                alert('Enter Branch Code');
                return;
            }

            setIsLoading(true);
            const res = await SaveBranchesAfterRegisteration(accessToken, branchCode, 0, userId ?? 0, branchName, locationName ?? '', branchLatitude, branchLongitude);
            const data = res.data;
            console.log(data, "data-save")
            setIsLoading(false);

            if (data.IsSuccess) {
                setBranchName('');
                // alert('Office Location Saved Successfully !');
                navigateToRegisterSuccess(navigation, PageNames.ADD_BRANCH_AFTER_REGISTER);

            } else {
                alert(data.Msg ?? data.Error)
            }


        } catch (e) {
            setIsLoading(false);
        }
    }

    return (
        <View style={{ padding: 15, flex: 1, backgroundColor: '#fff' }}>

            <FormGroup label='Branch Code' val={branchCode ?? ''} setVal={setBranchCode}
                formGroupLabelStyle={{ fontWeight: 'bold' }}
                placeholder="unique Branch code (max 10 character)"
                required />

            <FormGroup label='Office Branch Name' val={branchName} setVal={setBranchName}
                formGroupLabelStyle={{ fontWeight: 'bold' }}
                required />

            <View style={{ paddingTop: 10 }} >
                <Text style={styles.lable}>
                    Office Location
                </Text>
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
            <SourceSansText style={{ marginBottom: 20, color: 'green', textAlign: 'center' }}>You can change this location later</SourceSansText>

            <MyButton text={'Submit'}
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