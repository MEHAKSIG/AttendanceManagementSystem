import { View, Text } from 'react-native'
import React from 'react'
import HeaderWithNameAndTime from '../../components/organisms/HeaderWithNameAndTime';
import { getCurrentLocation, getLocationProviderByIndex } from '../../helpers/LocationHelper';
import MyButton from '../../components/atom/MyButton';
import { CheckIsMeetingShortLeaveStarted, SaveMeeting } from '../../services/MeetingService';
import GlobalStyles from '../../shared/GlobalStyles';

export default function MeetingScreen() {
    const [locationName, setLocationName] = React.useState<string | null>();

    // const [radioButtonValue, setRadioButtonValue] = React.useState<number>(0);
    const [locationRadioButtonSelectedIndex, setLocationRadioButtonSelectedIndex] = React.useState<number>(0);

    const [googleAddress, setGoogleAddress] = React.useState<string | undefined>();
    const [expoAddress, setExpoAddress] = React.useState<string>();

    const [errorMsg, setErrorMsg] = React.useState<string>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [loadingLocation, setLoadingLocation] = React.useState<boolean>(false);

    const [awayMsg, setAwayMsg] = React.useState<string>();
    const [officeDistance, setOfficeDistance] = React.useState<number>(0);

    const meetingStatusButtons = ['Meeting Start', 'Meeting End']
    const [meetingStatusSelectedIndex, setMeetingStatusSelectedIndex] = React.useState<number>(0);

    React.useEffect(() => {
        // bindContextMenu();
        initilizeData();
        checkIsMeetingStarted();
    }, [])


    // const getLocation = async () => {

    //     //setLocationName('waiting...')
    //     setAwayMsg('');
    //     return getCurrentLocation();
    // }

    // const getLocation = async () => {
    //     const MAX_RETRIES = 4; // Maximum number of retries
    //     let retries = 0;
    //     const WAIT_SEC = 6000; // 6 second

    //     const getCurrentLocationWithRetry = async () => {
    //         return new Promise(async (resolve) => {
    //             const timeoutId = setTimeout(() => {
    //                 clearTimeout(timeoutId); // Clear the timeout
    //                 if (retries < MAX_RETRIES) {
    //                     // If a timeout occurred and we haven't reached the maximum retries, retry.
    //                     retries++;
    //                     console.log(`Retrying location retrieval (Attempt ${retries})`);
    //                     resolve(getCurrentLocationWithRetry());
    //                 } else {
    //                     // If we've reached the maximum retries, resolve with an empty result.
    //                     resolve(null);
    //                 }
    //             }, WAIT_SEC); // 5-second timeout

    //             try {
    //                 const location = await getCurrentLocation();
    //                 clearTimeout(timeoutId); // Clear the timeout if location is obtained successfully.
    //                 resolve(location);
    //             } catch (error) {
    //                 // Ignore errors here; they will be caught by the timeout logic.
    //             }
    //         });
    //     };

    //     return getCurrentLocationWithRetry();
    // };
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

    const checkIsMeetingStarted = async () => {

        try {

            const res = await CheckIsMeetingShortLeaveStarted('meeting');
            const data = res.data;
            console.log(data, "data-CheckIsMeetingShortLeaveStarted");

            if (data.IsSuccess) {
                if (data.Result?.isMeetingAleadyStarted) {
                    setMeetingStatusSelectedIndex(1);
                } else {
                    setMeetingStatusSelectedIndex(0);

                }
            }

        } catch (e) {

        }
    }

    const initilizeData = async () => {

        try {

            setIsLoading(false);

            setLoadingLocation(true);
            const location = await getLocation();
            // console.log(location, "location-initilizeData");
            // setLocationName(location?.expoAddress.toString());

            // const distanceFromOffice = await getDistanceFromOffice(location);
            // setOfficeDistance(distanceFromOffice);
            const gAdd = location?.googleAddress.toString();
            setGoogleAddress(gAdd);
            const eAdd = location?.expoAddress.toString();
            setExpoAddress(eAdd);

            setLoadingLocation(false);
            // if (distanceFromOffice == -1) {
            //     setAwayMsg('Please Refresh your location or check your Branch associated to you');
            // } else {
            //     let awayMsg = ` Your are ${Math.round(distanceFromOffice)} meter away from office`;
            //     if (distanceFromOffice > 1000) {
            //         awayMsg = ` Your are ${Math.round(distanceFromOffice) / 1000} km away from office`;
            //     }
            //     setAwayMsg(awayMsg);
            // }

        } catch (e) {
            setLoadingLocation(false);
        }
    }

    const btnGoClick = async () => {

        try {

            setIsLoading(true);
            const currentLocation = await getLocation();
            console.log(currentLocation, "currentLocation")

            const lat = currentLocation?.latitude?.toString();
            const lng = currentLocation?.longitude?.toString();
            //const address = currentLocation?.expoAddress?.toString();
            const otherLocationDetail = JSON.stringify({ completeLocation: currentLocation?.completeLocation, reverseGeoLocation: currentLocation?.reverseGeoCode });

            //setLocationName(address);
            const status = meetingStatusSelectedIndex == 0 ? 'start' : 'end'

            const selectedLocation = locationRadioButtonSelectedIndex == 0 ? googleAddress : expoAddress;
            const locationProvider = getLocationProviderByIndex(locationRadioButtonSelectedIndex);

            const res = await SaveMeeting(status, lat, lng, selectedLocation, otherLocationDetail, 0, locationProvider);
            const data = res.data;
            console.log(data, "data-SaveMeeting");

            checkIsMeetingStarted();

            setIsLoading(false);

            if (data.IsSuccess) {
                let msg = '';
                if (meetingStatusSelectedIndex == 0)
                    msg = 'Meeting Started Successfully !';
                else
                    msg = 'Meeting Ended Successfully !';

                alert(msg);

            } else {
                alert(data.Error);
            }

        } catch (e) {
            setIsLoading(false);

            setErrorMsg('Error : ' + e);
        }

    }

    return (
        <View style={GlobalStyles.screenContainer}>

            <HeaderWithNameAndTime
                googleAddress={loadingLocation == true ? 'fetching location....' : googleAddress}
                expoAddress={loadingLocation == true ? 'fetching location....' : expoAddress}
                //locationName={locationName}
                officeDistance={officeDistance}
                awayMsg={awayMsg}
                buttonGroupNames={meetingStatusButtons}
                selectedRadioButtonGroupIndex={1}
                selectedButtonGroupIndex={meetingStatusSelectedIndex}
                onButtonPress={(selectedIndex) => {
                    setMeetingStatusSelectedIndex(selectedIndex);
                }}
                onRadioButtonPress={(selectedIndex) => {
                    setLocationRadioButtonSelectedIndex(selectedIndex);
                }}
            />

            <MyButton type='outline' text='Refresh Location'
                buttonStyle={{ height: 80 }}
                containerStyle={{ marginBottom: 10 }} onPress={() => {

                    initilizeData();
                }} />

            <MyButton text='Go'
                disabled={loadingLocation}
                loading={isLoading}
                buttonStyle={{ height: 80 }}
                onPress={btnGoClick} />
            {/* <Text>Meeting Screen</Text> */}
        </View >
    )
}