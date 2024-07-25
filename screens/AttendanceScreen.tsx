import { StyleSheet, useColorScheme } from 'react-native';
import { View } from '../components/Themed';
import React from 'react';
import MyButton from '../components/atom/MyButton';
import { GetIsInAttendanceMarked, SaveAttendance } from '../services/AttendanceService';
import ErrorMsg from '../components/atom/ErrorMsg';
import { BaseProps } from '../App';
import haversine from 'haversine';
import { getUserDetail } from '../services/DataStorageService';
import { getCurrentLocation, getDistanceBetweenCordinatesGoogleMapAPI, getLocationProviderByIndex } from '../helpers/LocationHelper';
import { GetUsersByUserId } from '../services/UserService';
import { navigateToChangePwdScreen } from '../shared/Routes';
import { PageNames } from '../constants/Config';
import HeaderWithNameAndTime from '../components/organisms/HeaderWithNameAndTime';
import ContextMenuIconsV2, { ContextMenuIconsPropsV2 } from '../components/organisms/ContextMenuIconsV2';
import { HeaderIconColorThemeWise } from '../constants/Colors';
import GlobalStyles from '../shared/GlobalStyles';
import MyText from '../components/atom/MyText';

export default function AttendanceScreen(props: BaseProps) {
    const { navigation, route } = props;

    const [locationName, setLocationName] = React.useState<string | null>();

    // const [radioButtonValue, setRadioButtonValue] = React.useState<number>(0);
    const [locationRadioButtonSelectedIndex, setLocationRadioButtonSelectedIndex] = React.useState<number>(0);
    const [googleAddress, setGoogleAddress] = React.useState<string | undefined>();
    const [expoAddress, setExpoAddress] = React.useState<string | undefined>();

    const [errorMsg, setErrorMsg] = React.useState<string>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [loadingLocation, setLoadingLocation] = React.useState<boolean>(false);

    const [awayMsg, setAwayMsg] = React.useState<string>();
    const [officeDistance, setOfficeDistance] = React.useState<number>(0);
    const [empDetail, setEmpDetail] = React.useState<any>({});

    const [isUserLeftCompany, setIsUserLeftCompany] = React.useState<boolean>(false);

    const attendanceTypeButtons = ['In', 'Out']
    const [attendanceTypeSelectedIndex, setAttendanceTypeSelectedIndex] = React.useState<number>(0);
    const [latitude, setLatitude] = React.useState<string | null | undefined>("");
    const [longitude, setLongitude] = React.useState<string | null | undefined>("");
    const [username, setUsername] = React.useState<string | null>("");

    let colorScheme = useColorScheme();


    const bindContextMenu = async () => {
        const menuClickHandler = (selectedMenuIcon: string) => {
            if (selectedMenuIcon == 'CHANGE_PASSWORD') {
                navigateToChangePwdScreen(
                    navigation,
                    PageNames.ATTENDANCE
                );
            }
        }
        const contextMenu: ContextMenuIconsPropsV2 = {
            changePassword: {
                show: true,
                iconProp: { key: 3, type: 'CHANGE_PASSWORD', size: 28, color: HeaderIconColorThemeWise(colorScheme, '#000') }
            },
            logout: {
                show: true,
                iconProp: { key: 2, type: 'LOGOUT', size: 28 }
            },
            onPress: menuClickHandler
        }
        navigation.setOptions({
            // headerTitle: "Users",
            headerRight: () =>
            (<ContextMenuIconsV2
                {...contextMenu}
            />
            )
        });
    };

    React.useEffect(() => {
        bindContextMenu();
        initilizeData();
        checkIfInMarked();
    }, [])

    const checkIfInMarked = async () => {
        try {

            const res = await GetIsInAttendanceMarked();
            const data = res.data;
            console.log(data, "data-checkIfInMarked");
            if (data.IsSuccess && data.Result?.isInMarked) {
                setAttendanceTypeSelectedIndex(1);
            }

        } catch (e) {

        }

        try {
            const userDetail = await getUserDetail();
            setUsername(userDetail.mobileNo);
        } catch (e) {

        }

    }

    const getLocation = async () => {
        console.log('******attempt 1 to fetch location*****')
        let location = await getCurrentLocation();
        if (!location?.expoAddress) {
            console.log('******attempt 2 to fetch location*****');
            location = await getCurrentLocation();
        }
        if (!location?.expoAddress) {
            console.log('******attempt 3 to fetch location*****');

            location = await getCurrentLocation();
        }
        if (!location?.expoAddress) {
            console.log('******attempt 4 to fetch location*****');
            location = await getCurrentLocation();
        }
        // if (!location?.expoAddress) {
        //     console.log('attempt 4 to fetch location')
        //     location = await getCurrentLocation();
        // }

        return location;
    };


    const getDistanceFromOffice = async (location: any) => {

        const userDetail = await getUserDetail();

        const res = await GetUsersByUserId(userDetail.userId ?? 0);
        const userData = res.data;

        // console.log(userData, "userData-getDistanceFromOffice");
        if (userData.IsSuccess) {
            if (userData.Result.LeftDate && new Date(userData.Result.LeftDate) < new Date(new Date().toDateString())) {
                setIsUserLeftCompany(true);
            } else {
                setIsUserLeftCompany(false);
            }
        }

        if (userData.IsSuccess && userData.Result.BranchLatitude && userData.Result.BranchLongitude) {

            let currentLat = 0;
            let currentLong = 0;
            if (location?.latitude) {
                currentLat = location.latitude;
            }
            if (location?.longitude) {
                currentLong = location.longitude;
            }
            let start = {
                latitude: userData.Result.BranchLatitude,
                longitude: userData.Result.BranchLongitude
            }

            let end = {
                latitude: currentLat,
                longitude: currentLong
            }
            // console.log({ start, end }, "distance-diff");

            const attendanceMinDistanceInMeter = userData.Result?.AttendanceMinDistanceInMeter;

            const distance = await getDistanceBetweenCordinatesGoogleMapAPI(start, end);
            console.log(distance, "res-distance")

            let isUserInDistanceLimit = true;
            if (attendanceMinDistanceInMeter && attendanceMinDistanceInMeter > 0) {
                if (distance.distanceInMeter > attendanceMinDistanceInMeter) {
                    isUserInDistanceLimit = false;
                }
            }

            return {
                text: distance.text,
                distanceInMeter: distance.distanceInMeter,
                error: distance.error,
                isUserInDistanceLimit
            }
            // const distanceFromOffice = haversine(start, end, { unit: 'meter' })
            // return Math.round(distanceFromOffice);
        } else {
            // return -1;
            return {
                text: "",
                distanceInMeter: -1,
                error: "",
                isUserInDistanceLimit: false
            }
        }
    }

    const initilizeData = async () => {

        setIsLoading(false);

        const userData = await getUserDetail();
        setEmpDetail(userData)
        // const deviceId = await getDeviceUniqueId();
        // console.log({ id: deviceId, deviceId: deviceId?.replace('"', '') }, "deviceId")
        try {

            setAwayMsg("");

            setLoadingLocation(true);
            console.log("******8**************start**************************8888");
            console.log("start getLocation() function-initilizeData");
            const location = await getLocation();

            console.log({ googleAddress: location?.googleAddress, expoAddress: location?.expoAddress.toString() }, "location-initilizeData");

            console.log("***********************end********************************");
            if (!location?.googleAddress && !location?.expoAddress) {
                setAwayMsg("Someting went wrong while fetching location !");
                return false;
            }
            const googleAddress = location?.googleAddress.toString();
            setGoogleAddress(googleAddress);

            const expoAddress = location?.expoAddress.toString();
            setExpoAddress(expoAddress);

            const distanceFromOffice = await getDistanceFromOffice(location);
            setOfficeDistance(distanceFromOffice.distanceInMeter);
            console.log(distanceFromOffice, "distanceFromOffice-initilizeData")

            setLoadingLocation(false);

            setLatitude(location.latitude?.toString());
            setLongitude(location.longitude?.toString());

            if (distanceFromOffice.distanceInMeter == -1) {
                setAwayMsg('Please Refresh your location or check your Branch associated to you');
            } else {
                let awayMsg = ` Your are ${distanceFromOffice.text} away from office`;
                // let awayMsg = ` Your are ${Math.round(distanceFromOffice)} meter away from office`;
                // if (distanceFromOffice > 1000) {
                //     awayMsg = ` Your are ${Math.round(distanceFromOffice) / 1000} km away from office`;
                // }
                setAwayMsg(awayMsg);
            }

        } catch (e) {
            setLoadingLocation(false);
        }
    }


    // function computeDistance([prevLat, prevLong]: any, [lat, long]: any) {
    //     const prevLatInRad = toRad(prevLat);
    //     const prevLongInRad = toRad(prevLong);
    //     const latInRad = toRad(lat);
    //     const longInRad = toRad(long);

    //     return (
    //         // In kilometers
    //         6377.830272 *
    //         Math.acos(
    //             Math.sin(prevLatInRad) * Math.sin(latInRad) +
    //             Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad),
    //         )
    //     );
    // }

    // function toRad(angle: any) {
    //     return (angle * Math.PI) / 180;
    // }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            initilizeData();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const markAttendanceClick = async () => {

        try {

            setIsLoading(true);
            setLoadingLocation(true);
            const currentLocation = await getLocation();
            setLoadingLocation(false);

            // console.log(currentLocation, "currentLocation")

            const currentGoogleAddress = currentLocation?.googleAddress.toString();
            // setGoogleAddress(currentGoogleAddress);
            const currentExpoAddress = currentLocation?.expoAddress.toString();
            // setExpoAddress(currentExpoAddress);

            const lat = currentLocation?.latitude?.toString();
            const lng = currentLocation?.longitude?.toString();
            //const address = currentLocation?.address?.toString();
            const otherLocationDetail = JSON.stringify({
                completeLocation: currentLocation?.completeLocation,
                reverseGeoLocation: currentLocation?.reverseGeoCode
            });
            // const otherLocationDetail = JSON.stringify({ completeLocation: currentLocation?.completeLocation, 
            //     });

            const distanceFromOffice = await getDistanceFromOffice(currentLocation);

            if (!distanceFromOffice.isUserInDistanceLimit) {
                setIsLoading(false);
                alert('You are away from office so cannot mark attendance');
                return false;
            }
            //setLocationName(address);
            const locationProvider = getLocationProviderByIndex(locationRadioButtonSelectedIndex);
            const selectedLocationName = locationRadioButtonSelectedIndex == 0 ? currentGoogleAddress : currentExpoAddress;

            const res = await SaveAttendance(lat, lng, selectedLocationName, otherLocationDetail, distanceFromOffice.distanceInMeter, locationProvider);

            const data = res.data;

            setIsLoading(false);

            if (data.IsSuccess) {

                checkIfInMarked();

                alert('Attendance Marked Successfully !');
            } else {
                alert(data.Error);
            }

        } catch (e) {
            setIsLoading(false);
            setLoadingLocation(false);
            setErrorMsg('Error : ' + e);
        }

    }

    return (
        <View style={[GlobalStyles.screenContainer]}>
            {/* <View style={{ paddingLeft: 20 }}>
                <View style={{ marginBottom: 15 }}>
                    <SourceSansText style={[styles.title]}>{empDetail?.email}</SourceSansText>
                    <SourceSansText style={[styles.title]}>{empDetail?.userRole} | {empDetail?.mobileNo}</SourceSansText>
                </View>
                <LiveTime />
            </View>

            <View style={{ marginTop: 15 }}>
                <MyButtonGroup buttons={attendanceTypeButtons}
                    selectedIndex={attendanceTypeSelectedIndex}
                    onPress={(selectedName) => {
                        setAttendanceTypeSelectedIndex(selectedName);
                    }}
                />
            </View> */}

            <HeaderWithNameAndTime
                googleAddress={loadingLocation == true ? 'fetching location....' : googleAddress}
                expoAddress={loadingLocation == true ? 'fetching location....' : expoAddress}
                officeDistance={officeDistance}
                awayMsg={awayMsg}
                buttonGroupNames={attendanceTypeButtons}
                selectedButtonGroupIndex={attendanceTypeSelectedIndex}
                selectedRadioButtonGroupIndex={locationRadioButtonSelectedIndex}
                setLocationName={setLocationName}
                onButtonPress={(selectedIndex) => {
                    setAttendanceTypeSelectedIndex(selectedIndex);
                }}
                onRadioButtonPress={(selectedIndex) => {
                    // setRadioButtonValue(selectedIndex);
                    setLocationRadioButtonSelectedIndex(selectedIndex);
                }}

            />

            <ErrorMsg error={errorMsg} />
            {
                isUserLeftCompany &&
                <View style={{ paddingVertical: 20 }}>
                    <ErrorMsg error={'You cannot use app because yor have left company'} />
                </View>
            }

            {
                (username == "9729393535" || username == "9911327772") &&
                <MyText text={`Latitude : ${latitude} , Longitude : ${longitude} - ${locationRadioButtonSelectedIndex}`} />
            }

            {/* 
            <View>
                <LocationIcon style={{ textAlign: 'center', marginBottom: 5 }} color='#000' size={20} />
                <SourceSansText style={styles.title}>{locationName}</SourceSansText>
            </View> */}
            {/* 
            <View style={[GlobalStyles.rowFlexStart, { backgroundColor: '#000', padding: 10, opacity: .8 }]}>
                <LocationIcon style={{ textAlign: 'center', marginBottom: 5 }} color='#fff' size={20} />
                <SourceSansText style={[styles.title, { color: '#fff' }]}>{locationName}</SourceSansText>
            </View> */}

            {/* <SourceSansText style={{ marginBottom: 15, color: officeDistance > 1000 ? 'red' : 'green' }} >{awayMsg}</SourceSansText> */}

            <MyButton type='outline' text='Refresh Location'
                buttonStyle={{ height: 80 }}
                containerStyle={{ marginBottom: 10 }} onPress={() => {
                    initilizeData();
                }} />
            <MyButton text='Mark Attendance'
                disabled={loadingLocation || isUserLeftCompany}
                loading={isLoading}
                buttonStyle={{ height: 80 }}
                onPress={markAttendanceClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 15,
        // fontWeight: 'bold',
        // marginVertical: 20,
        // marginBottom: 10,
        // minHeight: 60
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
