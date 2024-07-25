import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BaseProps } from '../../App'
import Input from '../../components/atom/Input'
import MyButton from '../../components/atom/MyButton'
import OTPVerificationPopup from '../../components/organisms/OTPVerificationPopup'
import { MonoText, SourceSansText } from '../../components/StyledText'
import { PageNames } from '../../constants/Config'
import { AuthenticateUser, RegisterGroup, SendOTPOnMail } from '../../services/AccountService'
import { navigateToAddBranchAfterRegister, navigateToRegisterSuccess } from '../../shared/Routes'

export default function RegisterScreen(props: BaseProps) {

    const { navigation, route } = props;

    const [groupCode, setGroupCode] = React.useState('');
    const [compName, setCompName] = React.useState('');
    const [name, setName] = React.useState('');
    const [mobileNo, setMobileNo] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [gender, setGender] = React.useState('');

    const [sentOTP, setSentOTP] = React.useState('');
    const [OTPVerified, setOTPVerified] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [openOTPPopup, setOpenOTPPopup] = React.useState<boolean>(false);

    const onRegisterClick = async () => {

        if (!groupCode?.trim()) {
            alert('Enter Group/Company Code');
            return;
        }
        if (!compName?.trim()) {
            alert('Enter Company Name');
            return;
        }
        if (!name?.trim()) {
            alert('Enter Contact Name');
            return;
        }
        if (!mobileNo?.trim()) {
            alert('Enter Mobile No');
            return;
        }
        if (!email?.trim()) {
            alert('Enter Mobile Name');
            return;
        }
        if (!pwd?.trim()) {
            alert('Enter Password');
            return;
        }

        if (!sentOTP) {
            sendMailOTP();
        } else if (sentOTP && !OTPVerified) {
            setOpenOTPPopup(true);
        } else if (OTPVerified) {
            registerGroup();
        }
    }

    const registerGroup = async () => {
        try {

            setIsLoading(true);
            const res = await RegisterGroup(groupCode, compName, name, email, mobileNo, pwd);
            const data = res.data;
            if (data.IsSuccess) {
                const userId = data.Result.UserId;
                const accessToken = await getAccessToken(email, pwd);
                if (accessToken) {
                    // navigateToRegisterSuccess(navigation, "Register");
                    navigateToAddBranchAfterRegister(navigation, PageNames.REGISTER, userId, accessToken);
                } else {
                    alert('Something went wrong. Please try again or try to login');
                }
            } else {
                alert(data.Msg);
            }
            setIsLoading(false);

        } catch (e) {
            alert(e);
            setIsLoading(false);

        }
    }

    const getAccessToken = async (username: string, pwd: string): Promise<string | null> => {

        const res = await AuthenticateUser(username, pwd);
        const data = res.data;
        if (data.IsSuccess) {
            return data.Result.accessToken;
        }

        return '';
    }

    const sendMailOTP = async () => {
        try {

            setIsLoading(true);
            const res = await SendOTPOnMail(email);
            const data = res.data;
            setIsLoading(false);
            console.log(data, "data");
            if (data.IsSuccess) {
                setSentOTP(data.Result.OTP);
                setOpenOTPPopup(true);
            } else {
                alert('Error while seding mail OTP. Please contact to admin')
            }

        } catch (e) {
            alert('Error : ' + e);
        }
    }

    const otpSubmitClick = (userOTP: string) => {
        if (sentOTP == userOTP) {
            setOpenOTPPopup(false);
            setOTPVerified(true);
            registerGroup();

        } else {
            setOTPVerified(true);

            alert('OTP mismatched');
        }
    }

    return (
        <View style={styles.container}>
            <OTPVerificationPopup title='Verify OTP sent on your email' isVisible={openOTPPopup} setIsVisible={setOpenOTPPopup}
                onSubmit={otpSubmitClick} />
            {/* <SourceSansText>Register Company</SourceSansText> */}
            <View style={styles.formGroup}>
                <Text>Group/Company Code*</Text>
                <Input value={groupCode} onChangeText={val => setGroupCode(val)}
                    style={styles.input}
                    placeholder='Should be unique (max 10 character)'
                />
            </View>
            <View style={styles.formGroup}>
                <Text>Company Name*</Text>
                <Input value={compName} onChangeText={val => setCompName(val)}
                    style={styles.input}
                />
            </View>
            <View style={styles.formGroup}>
                <Text>Contact Name*</Text>
                <Input value={name} onChangeText={val => setName(val)}
                    style={styles.input}
                />
            </View>
            <View style={styles.formGroup}>
                <Text>Mobile No*</Text>
                <Input value={mobileNo} keyboardType='numeric' onChangeText={val => setMobileNo(val)}
                    style={styles.input}
                />
            </View>
            <View style={styles.formGroup}>
                <Text>Email*</Text>
                <Input placeholder={'we will send OTP on email'} value={email}
                    onChangeText={val => {
                        setEmail(val);
                        setSentOTP('');
                        setOTPVerified(false);
                    }}
                    style={styles.input}
                />
            </View>
            <View style={styles.formGroup}>
                <Text>Choose Password*</Text>
                <Input value={pwd} onChangeText={val => setPwd(val)}
                    style={styles.input}
                    isPasswordField
                />
            </View>

            <View style={[styles.formGroup, { marginTop: 20 }]}>
                <MyButton text='Register' onPress={onRegisterClick} loading={isLoading} />

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        paddingTop: 20,


    },
    formGroup: {
        marginBottom: 10
    },
    input: {
        padding: 5, marginTop: 5
    }
})