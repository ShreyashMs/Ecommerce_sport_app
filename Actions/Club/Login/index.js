import Snackbar from 'react-native-snackbar';
import {Login_user_with_club} from '../../../Services/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
const colors = require('../../../../colors/default_colors.json');

export const login = async (
  username,
  pass,
  setloading,
  navigation,
  dispatch,
) => {
  if (username.length == 0) {
    Snackbar.show({
      text: 'please enter mobile no',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  } else if (username.length != 10) {
    Snackbar.show({
      text: 'please enter 10 digit mobile number',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  } else if (pass.length == 0) {
    Snackbar.show({
      text: 'please enter password',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  } else {
    setloading(true);
    const request = await Login_user_with_club(username, pass, 4);
    if (request) {
      const parse = JSON.parse(request);
      AsyncStorage.setItem('studentdata', JSON.stringify(parse.data));
      if (parse.error_code == 200) {
        if (parse.data.scr_no == 1) {
          navigation.navigate('Club_Registration');
        } else if (parse.data.scr_no == 2) {
          setloading(false);
          navigation.navigate('SportsDetails');
        } else if (parse.data.scr_no == 3) {
          setloading(false);
          navigation.navigate('Club_Identity_section');
        } else if (parse.data.scr_no == 4) {
          setloading(false);
          navigation.navigate('Club_Add_Bankdetails');
        } else {
          await AsyncStorage.setItem(
            'user_persist_data_for_reg',
            JSON.stringify(parse.data),
          );
          setloading(false);
          if (
            parse.data.club_booking_st == 0 ||
            parse.data.club_profile_st == 0
          ) {
            await AsyncStorage.setItem(
              'login_status',
              JSON.stringify({type: '4', status: true}),
            );
            navigation.navigate('Club_Complete_profile', {data: parse.data});
          } else if (parse.data.ac_status == 0) {
            await AsyncStorage.setItem(
              'login_status',
              JSON.stringify({type: '4', status: true}),
            );
            navigation.navigate('Club_Main');
          } else {
            await AsyncStorage.setItem(
              'login_status',
              JSON.stringify({type: '4', status: true}),
            );
            navigation.navigate('Club_Main');
          }
        }
      } else {
        if (parse.Data != undefined) {
          if (parse.Data.error_code == 555) {
            setloading(false);
          } else {
            setloading(false);
          }
        } else if (parse.error_code == 404) {
          Snackbar.show({
            text: parse.message,
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
            backgroundColor: colors.club_color,
          });
          if (parse.data) {
            if (parse.data.scr_no == 1) {
              // console.log("login------------------------",parse.data);
              AsyncStorage.setItem('logindata',JSON.stringify(parse.data))
              dispatch({
                type: 'set_reg_not_completed_data',
                payload: parse.data,
              });
              setloading(false);
              navigation.navigate('Club_Registration');
            } else if (parse.data.scr_no == 2) {
              setloading(false);
              navigation.navigate('SportsDetails');
            } else if (parse.data.scr_no == 3) {
              setloading(false);
              navigation.navigate('Club_Identity_section');
            } else {
              setloading(false);
              navigation.navigate('Club_Add_Bankdetails');
            }
          } else {
            setloading(false);
          }
        } else {
          Snackbar.show({
            text: parse.message,
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
            backgroundColor: colors.club_color,
          });
          setloading(false);
        }
      }
    }
  }
};
