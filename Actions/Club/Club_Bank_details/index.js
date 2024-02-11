import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {
  Add_Bank_details_club,
  Add_Identity_files_club,
} from '../../../Services/apis';
const colors = require('../../../../colors/default_colors.json');

export const Add_club_bank_details = async (
  setloading,
  navigation,
  bank_account_number,
  re_enter_bank_account,
  Beneficiary_Name,
  bank_name,
  IFSC_code,
  bank_type,
  from,
  navigate
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  if (bank_account_number.length == 0) {
    Snackbar.show({
      text: 'please enter bank account number',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: from == 2 ? colors.coach_color : colors.club_color,
    });
    return;
  } else if (re_enter_bank_account.length == 0) {
    Snackbar.show({
      text: 'please enter gst no',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: from == 2 ? colors.coach_color : colors.club_color,
    });
    return;
  } else if (bank_account_number != re_enter_bank_account) {
    Snackbar.show({
      text: 'Bank account number not matched',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: from == 2 ? colors.coach_color : colors.club_color,
    });
    return;
  } else if (Beneficiary_Name == null) {
    Snackbar.show({
      text: 'please enter Beneficiary Name',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: from == 2 ? colors.coach_color : colors.club_color,
    });
    return;
  } else if (bank_name == null) {
    Snackbar.show({
      text: 'please enter bank name',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: from == 2 ? colors.coach_color : colors.club_color,
    });
    return;
  } else if (IFSC_code == null) {
    Snackbar.show({
      text: 'please enter IFSC code',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: from == 2 ? colors.coach_color : colors.club_color,
    });
    return;
  } else {
    setloading(true);
    const request = await Add_Bank_details_club(
      login_parse.u_key,
      bank_account_number,
      re_enter_bank_account,
      Beneficiary_Name,
      bank_name,
      IFSC_code,
      bank_type,
    );
    if (request) {
      const parse = JSON.parse(request);
      console.log(parse);
      if (parse.error_code == 200) {
        setloading(false);
        navigation.replace(navigate);
        // navigation.navigate('Email_OTPVerification', {data: parse.data[0]});
      } else {
        if (parse.Data != undefined) {
          if (parse.Data.error_code == 555) {
            setloading(false);
          } else {
            setloading(false);
          }
        } else {
          Snackbar.show({
            text: parse.message,
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
            backgroundColor: from == 2 ? colors.coach_color : colors.club_color,
          });
          setloading(false);
        }
      }
    }
  }
};
