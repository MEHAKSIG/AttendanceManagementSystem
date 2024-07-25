import { View, Text } from 'react-native'
import React from 'react'
import FormGroup from '../components/molecules/FormGroup'
import MyButton from '../components/atom/MyButton';
import { ChangePwd } from '../services/UserService';

export default function ChangePwdScreen() {
  const [currentPwd, setCurrentPwd] = React.useState('');
  const [newPwd, setNewPwd] = React.useState('');
  const [confirmNewPwd, setConfirmNewPwd] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const saveButtonClick = async () => {
    // alert('Save Value');

    if (currentPwd?.trim() == '' || newPwd?.trim() == '') {
      alert('Enter all required fields');
      return false;
    }

    if (newPwd != confirmNewPwd) {
      alert('Confirm passowrd does not match');
      return false;
    }
    if (newPwd.length <= 3) {
      alert('Enter atleast 4 digit password');
      return false;
    }

    setIsLoading(true);
    const res = await ChangePwd(currentPwd, newPwd);
    const data = res.data;
    setIsLoading(false);

    console.log(data, "data");
    if (data.IsSuccess) {
      clearForm();
      alert(data.Msg);
    } else {
      alert(data.Error);
    }

  }

  const clearForm = () => {
    setCurrentPwd('');
    setConfirmNewPwd('');
    setNewPwd('');

  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
      <View>
        <FormGroup val={currentPwd} setVal={setCurrentPwd} label="Current Password" required isPasswordField />
        <FormGroup val={newPwd} setVal={setNewPwd} label="New Password" required isPasswordField />
        <FormGroup val={confirmNewPwd} setVal={setConfirmNewPwd} label="Confirm New Password" required isPasswordField />

        <MyButton text='Save' onPress={saveButtonClick} containerStyle={{ marginTop: 10 }}
          loading={isLoading} />
      </View>
    </View>
  )
}