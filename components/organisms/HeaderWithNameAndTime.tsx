import { View, StyleSheet } from 'react-native'
import React from 'react'
import { SourceSansText } from '../StyledText';
import LiveTime from './LiveTime';
import MyButtonGroup from '../atom/MyButtonGroup';
import { getSettingsLocalStorage, getUserDetail } from '../../services/DataStorageService';
import GlobalStyles from '../../shared/GlobalStyles';
import { ExpoIcon, GoogleIcon, LocationIcon } from '../../shared/Icons';
import FormGroupRadioButton from '../molecules/FormGroupRadioButton';
import MyText from '../atom/MyText';

interface HeaderWithNameAndTimeProps {
    buttonGroupNames: string[],
    selectedButtonGroupIndex: number,
    selectedRadioButtonGroupIndex?: number,
    onButtonPress?: (selectedIndex: number) => void,
    onRadioButtonPress?: (selectedIndex: number) => void,
    googleAddress?: string | undefined,
    expoAddress?: string | undefined,
    awayMsg?: string | null,
    officeDistance?: number,
    //locationName?: string | null,
    setLocationName?: (locationName: string | null | undefined) => void;
    getLocation?: () => Promise<void>;

}
export default function HeaderWithNameAndTime(props: HeaderWithNameAndTimeProps) {

    const { buttonGroupNames, googleAddress, expoAddress, selectedButtonGroupIndex, selectedRadioButtonGroupIndex, awayMsg, onButtonPress, onRadioButtonPress, officeDistance = 0,
        setLocationName,
        getLocation } = props;

    const [empDetail, setEmpDetail] = React.useState<any>({});
    const [locationProviderToUse, setLocationProviderToUse] = React.useState<string>('Google');

    React.useEffect(() => {
        (async function () {

            const userDetail = await getUserDetail();
            setEmpDetail(userDetail);

            // const settings = await getSettingsLocalStorage();
            // // console.log(settings, "settings-local-storage");
            // setLocationProviderToUse(settings.LocationProvider ?? 'Google');
        }
        )();
    }, [])


    return (
        <View>
            <View style={{ paddingLeft: 20 }}>
                <View style={{ marginBottom: 15 }}>
                    <MyText textFont='source-sans' text={empDetail?.email} fontSize={15} />
                    <MyText textFont='source-sans' text={`${empDetail?.userRole} | ${empDetail?.mobileNo}`} fontSize={15} />
                    {/* <SourceSansText style={[styles.title]}>{empDetail?.email}</SourceSansText> */}
                    {/* <SourceSansText style={[styles.title]}>{empDetail?.userRole} | {empDetail?.mobileNo}</SourceSansText> */}
                </View>
                <LiveTime />
            </View>

            <View style={{ marginTop: 15 }}>
                <MyButtonGroup buttons={buttonGroupNames}
                    selectedIndex={selectedButtonGroupIndex}
                    onPress={(selectedIndex) => {
                        onButtonPress && onButtonPress(selectedIndex);
                    }}
                />
            </View>

            <View style={[{ padding: 10, paddingLeft: 0, opacity: .8, marginTop: 15 }]}>
                {/* Display radio buttons for googleAddress and expoAddress */}

                <View>
                    {
                        (locationProviderToUse == 'Google' || locationProviderToUse == 'Both') &&
                        <View style={GlobalStyles.rowFlexStart}>
                            <GoogleIcon overrideProps={{ style: { width: 18, height: 18, marginTop: 25 } }} />
                            <FormGroupRadioButton
                                formGroupContainerStyle={{ margin: 0, padding: 0 }}
                                radioButtonContainerStyle={{ backgroundColor: '#fff' }}
                                label={googleAddress}
                                val={selectedRadioButtonGroupIndex === 0}
                                onPress={() => {
                                    onRadioButtonPress && onRadioButtonPress(0);

                                }}
                            />
                        </View>
                    }
                    {
                        (locationProviderToUse == 'Expo' || locationProviderToUse == 'Both') &&
                        <View style={GlobalStyles.rowFlexStart}>
                            {/* <LocationIcon style={{ textAlign: 'center', marginTop: 25 }}color='#fff' size={20} /> */}
                            {/* <ExpoIcon overrideProps={{ style: { width: 24, height: 24, marginTop: 25 } }} /> */}
                            <FormGroupRadioButton
                                formGroupContainerStyle={{ margin: 0, padding: 0 }}
                                radioButtonContainerStyle={{ backgroundColor: '#fff' }}
                                label={expoAddress}
                                val={selectedRadioButtonGroupIndex === 1}
                                onPress={() => {
                                    onRadioButtonPress && onRadioButtonPress(1);
                                    //setLocationName && setLocationName(expoAddress);
                                }}
                            />
                        </View>
                    }
                </View>

            </View>
            <SourceSansText style={{ marginBottom: 15, color: officeDistance > 1000 ? 'red' : 'green' }} >  {awayMsg}
            </SourceSansText>
        </View>
    )
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
