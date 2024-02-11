import Snackbar from 'react-native-snackbar';
import {
  Login_user_with_club,
  Verify_email_otp,
  Verify_mobile_otp,
  update_student_registration_details,
} from '../../../Services/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
const colors = require('../../../../colors/default_colors.json');
import messaging from '@react-native-firebase/messaging';
import {log} from 'react-native-reanimated';

export const submit_stucent_registration_details = async (
  navigation,
  setloading,
  fullname,
  mobile_number,
  email_address,
  pass,
  pass_cnf,
  Date_of_birth,
  gender,
  sport_list,
  checked,
) => {
  const regex = /^[6789]\d{9}$/;

  // await messaging().registerDeviceForRemoteMessages();

  // // Get the token
  // const token = await messaging().getToken();
  // const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  // let login_parse = JSON.parse(logged_in);
  if (fullname.length == 0) {
    Snackbar.show({
      text: 'please enter your full name',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.student_color,
    });
    return;
  }

  if (mobile_number.length != 10) {
    Snackbar.show({
      text: 'Please enter 10 digit valid mobile number',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.student_color,
    });
    return;
  }
  if (pass.length == 0) {
    Snackbar.show({
      text: 'Please enter password',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.student_color,
    });
    return;
  }
  if (pass != pass_cnf) {
    Snackbar.show({
      text: "Password dosen't match",
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.student_color,
    });
    return;
  }
  if (email_address.length == 0) {
    Snackbar.show({
      text: 'please enter your email address',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.student_color,
    });
    return;
  }

  if (email_address != '') {
    const emailstring =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const checkmail = emailstring.test(email_address);
    if (!checkmail) {
      Snackbar.show({
        text: 'please enter valid email address',
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Medium',
        backgroundColor: colors.student_color,
      });
      return;
    }
  }
  if (Date_of_birth == '') {
    Snackbar.show({
      text: 'please enter your date of birth',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.student_color,
    });
    return;
  }

  if (gender == '') {
    Snackbar.show({
      text: 'please enter your gender',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.student_color,
    });
    return;
  }

  if (sport_list.length == 0) {
    Snackbar.show({
      text: 'please select sports',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.student_color,
    });
    return;
  }
  if (!checked) {
    Snackbar.show({
      text: 'please accept our terms and conditon for registration',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.student_color,
    });
    return;
  }

  setloading(true);
  const request = await update_student_registration_details(
    fullname,
    mobile_number,
    email_address,
    pass,
    pass_cnf,
    Date_of_birth,
    gender,
    '3',
    '',
    sport_list.toString(),
    checked,
  );
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      navigation.navigate('OtpVerification', {data: parse.data[0]});
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
          backgroundColor: colors.student_color,
        });
        setloading(false);
      }
    }
  }
};

export const verify_mob_verfication = async (
  setloading,
  otp,
  u_id,
  prev_data,
  navigation,
) => {
  if (otp.length == 0) {
    Snackbar.show({
      text: 'please enter otp and then try',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  setloading(true);
  const request = await Verify_mobile_otp(otp, u_id);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      navigation.replace('Student_email_OTP_verification', {data: prev_data});
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
          backgroundColor: colors.coach_color,
        });
        setloading(false);
      }
    }
  }
};

// navigation.navigate('Sport_details')
//navigation.navigate('Sport_details')

export const verify_email_verfication = async (
  setloading,
  otp,
  u_id,
  prev_data,
  navigation,
) => {
  if (otp.length == 0) {
    Snackbar.show({
      text: 'please enter otp and then try',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  setloading(true);
  const request = await Verify_email_otp(otp, u_id);
  if (request) {
    const parse = JSON.parse(request);

    if (parse.error_code == 200) {
      setloading(false);
      await AsyncStorage.setItem(
        'user_persist_data_for_reg',
        JSON.stringify(prev_data, {
          u_key: prev_data.u_key,
          user_type: prev_data.user_type,
        }),
      );
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginStudent'}],
      });
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
        });
        setloading(false);
      }
    }
  }
};

export const do_login = async (
  username,
  password,
  setloading,
  type,
  navigation,
) => {
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();
  if (username.length == 0) {
    Snackbar.show({
      text: 'please enter mobile no',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  } else if (username.length != 10) {
    Snackbar.show({
      text: 'please enter 10 digit mobile number',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  } else if (password.length == 0) {
    Snackbar.show({
      text: 'please enter password',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  } else {
    setloading(true);
    const request = await Login_user_with_club(username, password, 3, token);
    if (request) {
      const parse = JSON.parse(request);
      AsyncStorage.setItem('studentdata', JSON.stringify(parse.data));
      console.log(parse.data,'login detailsssssssssssssssssssss')
      if (parse.error_code == 200) {
        await AsyncStorage.setItem(
          'user_persist_data_for_reg',
          JSON.stringify(parse.data),
        );
        await AsyncStorage.setItem(
          'login_status',
          JSON.stringify({type: '3', status: true}),
        );
        setloading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'StudentDrawerNavigation'}],
        });
      } else if (parse.error_code == 404) {
        AsyncStorage.setItem('studentudata',JSON.stringify(parse.data))
        if (parse.data.scr_no == 1) navigation.navigate('Student_Registration');
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
            backgroundColor: colors.student_color,
          });
          setloading(false);
        } else {
          Snackbar.show({
            text: parse.message,
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
            backgroundColor: colors.student_color,
          });
          setloading(false);
        }
      }
    }
  }
};
