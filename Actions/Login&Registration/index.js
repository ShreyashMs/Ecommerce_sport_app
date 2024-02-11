import Snackbar from 'react-native-snackbar';
import {
  Add_Identity_files_club,
  Add_sports_details_club,
  Add_sports_details_coach,
  Get_club_details_name,
  Get_offererd_sports,
  Login_user_with_club,
  Remove_images_of_coach_club,
  Upload_user_profile_pic,
  Verify_email_otp,
  Verify_mobile_otp,
  add_enquiry_details,
  update_registration_details,
} from '../../Services/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Get_details} from '../Coach/profile_completion';
import {Get_user_presonal_details} from '../Common/Home_screen';
import {Keyboard} from 'react-native';
import messaging from '@react-native-firebase/messaging';
const colors = require('../../../colors/default_colors.json');

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
    const request = await Login_user_with_club(username, password, 5, token);
    if (request) {
      const parse = JSON.parse(request);
      AsyncStorage.setItem('studentdata', JSON.stringify(parse.data));
      if (parse.error_code == 200) {
        if (parse.data.scr_no == 1) {
          navigation.navigate('reg', {prev_data: parse.data});
        } else if (parse.data.scr_no == 2) {
          setloading(false);
          navigation.navigate('Sport_details');
        } else if (parse.data.scr_no == 3) {
          setloading(false);
          navigation.navigate('Identity_section');
        } else if (parse.data.scr_no == 4) {
          setloading(false);
          navigation.navigate('Add_Bankdetails');
        } else {
          await AsyncStorage.setItem(
            'user_persist_data_for_reg',
            JSON.stringify(parse.data),
          );
          setloading(false);
          if (parse.data.coach_profile_st == 0) {
            // club_booking_st": "0", "club_profile_st
            await AsyncStorage.setItem(
              'login_status',
              JSON.stringify({type: '5', status: true}),
            );
            navigation.navigate('Complete_profile', {data: parse.data});
          } else {
            console.log('navigate to home');
            await AsyncStorage.setItem(
              'login_status',
              JSON.stringify({type: '5', status: true}),
            );
            navigation.reset({
              index: 0,
              routes: [{name: 'Main'}],
            });
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
          if (parse.data) {
            await AsyncStorage.setItem(
              'user_persist_data_for_reg',
              JSON.stringify(parse.data),
            );
            if (parse.data.scr_no == 1) {
              setloading(false);
              navigation.navigate('reg', {prev_data: parse.data});
            } else if (parse.data.scr_no == 2) {
              setloading(false);
              navigation.navigate('Sport_details');
            } else if (parse.data.scr_no == 3) {
              setloading(false);
              navigation.navigate('Identity_section');
            } else if (parse.data.scr_no == 4) {
              setloading(false);
              navigation.navigate('Add_Bankdetails');
            } else {
              setloading(false);
              if (parse.data.coach_profile_st == 0) {
                // club_booking_st": "0", "club_profile_st
                await AsyncStorage.setItem(
                  'login_status',
                  JSON.stringify({type: '5', status: true}),
                );
                navigation.navigate('Complete_profile', {data: parse.data});
              } else {
                console.log('navigate to home');
                await AsyncStorage.setItem(
                  'login_status',
                  JSON.stringify({type: '5', status: true}),
                );
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Main'}],
                });
              }
            }
          } else {
            setloading(false);
            Snackbar.show({
              text: parse.message,
              duration: Snackbar.LENGTH_SHORT,
              fontFamily: 'Poppins-Regular',
              backgroundColor: colors.coach_color,
            });
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

export const Register_user = setloading => {};

export const submit_registration_details = async (
  navigation,
  setloading,
  fullname,
  mobile_number,
  email_address,
  pass,
  pass_cnf,
  Date_of_birth,
  pincode,
  gender,
  checked,
  user_type_id,
  club_name,
  u_key,
) => {
  // await messaging().registerDeviceForRemoteMessages();

  // // Get the token
  // const token = await messaging().getToken();
  // const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  // let login_parse = JSON.parse(logged_in);
  console.log(u_key, '----------ukey', gender, '------------gender');
  if (fullname.length == 0) {
    Snackbar.show({
      text: 'please enter your full name',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (mobile_number.length != 10) {
    Snackbar.show({
      text: 'Please enter 10 digit mobile number',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (email_address.length == 0) {
    Snackbar.show({
      text: 'please enter your email address',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (Date_of_birth == '') {
    Snackbar.show({
      text: 'please enter your date of birth',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (pincode == '') {
    Snackbar.show({
      text: 'please enter Pincode',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
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
        backgroundColor: colors.coach_color,
      });
      return;
    }
  }
  if (pass.length == 0) {
    Snackbar.show({
      text: 'Please enter password',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (pass != pass_cnf) {
    Snackbar.show({
      text: "Password dosen't match",
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (gender == '') {
    Snackbar.show({
      text: 'please enter your gender',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (!checked) {
    Snackbar.show({
      text: 'make sure to check terms and condition',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  setloading(true);
  const request = await update_registration_details(
    fullname,
    mobile_number,
    email_address,
    pass,
    pass_cnf,
    Date_of_birth,
    pincode,
    gender,
    checked,
    '5',
    '',
    u_key,
  );
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      navigation.navigate('otp', {data: parse.data[0]});
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
      navigation.replace('email_otp', {data: prev_data});
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
      navigation.replace('Sport_details');
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

export const Get_sports = async (setloading, setdata) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_offererd_sports(
    login_parse != null ? login_parse.u_key : '',
  );
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      setloading(false);
      let format = parse.data.map(i => {
        return {
          label: i.sport_name,
          value: i.sport_id,
          photo: i.sport_img,
        };
      });
      setdata(format);
      // navigation.navigate('Email_OTPVerification', {data: parse.data[0]});
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setloading(false);
        } else {
          setloading(false);
        }
      } else {
        setloading(false);
      }
    }
  }
};

export const Get_club_details = async (
  setloading,
  setdata,
  sports,
  format_2,
  setitems_selected,
) => {
  // const token = await messaging().getToken();
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  console.log(sports);
  const request = await Get_club_details_name(login_parse.u_key, sports);
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    console.log('club data', parse.data);
    if (parse.error_code == 200) {
      setloading(false);
      let format = parse.data.map(i => {
        return {
          label: i.name,
          value: i.id,
          profile: i.profile,
        };
      });
      console.log(format);
      setdata(format);
      setitems_selected(format_2);
      // navigation.navigate('Email_OTPVerification', {data: parse.data[0]});
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setloading(false);
        } else {
          setloading(false);
        }
      } else {
        console.log(parse.message);

        // setloading(false);
      }
    }
  }
};

export const submit_Student_registration_details = async (
  navigation,
  setloading,
  fullname,
  mobile_number,
  email_address,
  pass,
  pass_cnf,
  Date_of_birth,
  pincode,
  gender,
  checked,
) => {
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
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (mobile_number.length != 10) {
    Snackbar.show({
      text: 'Please enter 10 digit mobile number',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (email_address.length == 0) {
    Snackbar.show({
      text: 'please enter your email address',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (Date_of_birth == '') {
    Snackbar.show({
      text: 'please enter your date of birth',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (pincode == '') {
    Snackbar.show({
      text: 'please enter Pincode',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
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
        backgroundColor: colors.coach_color,
      });
      return;
    }
  }
  if (pass.length == 0) {
    Snackbar.show({
      text: 'Please enter password',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (pass != pass_cnf) {
    Snackbar.show({
      text: "Password dosen't match",
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (gender == '') {
    Snackbar.show({
      text: 'please enter your gender',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (!checked) {
    Snackbar.show({
      text: 'make sure to check terms and condition',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  setloading(true);
  const request = await update_registration_details(
    fullname,
    mobile_number,
    email_address,
    pass,
    pass_cnf,
    Date_of_birth,
    pincode,
    gender,
    checked,
    '5',
  );
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      navigation.navigate('otp', {data: parse.data[0]});
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

export const submit_venue_details_for_enquiry = async (
  navigation,
  setloading,
  clubname,
  address,
  ownername,
  mobile_number,
  email_address,
  sports_ids,
  open_avenue,
  setopen_avenue,
  handle_close,
) => {
  // await messaging().registerDeviceForRemoteMessages();

  // // Get the token
  // const token = await messaging().getToken();
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  if (clubname.length == 0) {
    Snackbar.show({
      text: 'please enter your full name',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (address.length == 0) {
    Snackbar.show({
      text: 'Please enter address',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (ownername.length == 0) {
    Snackbar.show({
      text: 'please enter club owner name',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (mobile_number.length != 10) {
    Snackbar.show({
      text: 'Please enter 10 digit mobile number',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (email_address.length == 0) {
    Snackbar.show({
      text: 'please enter your email address',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
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
        backgroundColor: colors.coach_color,
      });
      return;
    }
  }

  if (sports_ids.length == 0) {
    Snackbar.show({
      text: 'please select some sports',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  setloading(true);

  const request = await add_enquiry_details(
    login_parse.u_key,
    clubname,
    address,
    ownername,
    mobile_number,
    email_address,
    sports_ids,
  );
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: colors.coach_color,
      });
      setloading(false);
      setopen_avenue(!open_avenue);
      // navigation.navigate('otp', {data: parse.data[0]});
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

export const submit_venue_details_for_enquiry_club = async (
  navigation,
  setloading,
  clubname,
  address,
  ownername,
  mobile_number,
  email_address,
  sports_ids,
  handle_close,
) => {
  // await messaging().registerDeviceForRemoteMessages();

  // // Get the token
  // const token = await messaging().getToken();
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  if (clubname.length == 0) {
    Snackbar.show({
      text: 'please enter your full name',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  }
  if (sports_ids.length == 0) {
    Snackbar.show({
      text: 'please select some sports',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  }
  if (mobile_number.length != 10) {
    Snackbar.show({
      text: 'Please enter 10 digit mobile number',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  }

  if (email_address.length == 0) {
    Snackbar.show({
      text: 'please enter your email address',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
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
        backgroundColor: colors.club_color,
      });
      return;
    }
  }
  setloading(true);

  const request = await add_enquiry_details(
    login_parse.u_key,
    clubname,
    address,
    ownername,
    mobile_number,
    email_address,
    sports_ids,
  );
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      handle_close();
      // navigation.navigate('otp', {data: parse.data[0]});
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

export const submit_Sports_details = async (
  setloading,
  club_ids,
  sport_ids,
  navigation,
) => {
  if (sport_ids.length == 0) {
    Snackbar.show({
      text: 'please select some sports',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (club_ids.length == 0) {
    Snackbar.show({
      text: 'please select some club',
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
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      await AsyncStorage.setItem(
        'user_persist_data_for_reg',
        JSON.stringify(prev_data.u_id),
      );
      navigation.replace('Sport_details');
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

export const Save_coach_details = async (
  setloading,
  navigation,
  sports,
  clubs,
  certificate,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  if (sports.length == 0) {
    Snackbar.show({
      text: 'please select some sports',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  } else if (clubs.length == 0) {
    Snackbar.show({
      text: 'please select some clubs',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  } else {
    setloading(true);
    //Club_Identity_section
    const request = await Add_sports_details_coach(
      login_parse.u_key,
      sports.toString(),
      clubs.toString(),
      certificate,
    );
    if (request) {
      const parse = JSON.parse(request);
      console.log(parse);
      if (parse.error_code == 200) {
        setloading(false);
        navigation.replace('Identity_section');
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
            backgroundColor: colors.club_color,
          });
          setloading(false);
        }
      }
    }
  }
};

//Club

export const submit_registration_details_for_club = async (
  navigation,
  setloading,
  fullname,
  mobile_number,
  email_address,
  pass,
  pass_cnf,
  Date_of_birth,
  pincode,
  gender,
  checked,
  club_name,
  u_key,
) => {
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
      backgroundColor: colors.club_color,
    });
    return;
  }

  if (mobile_number.length != 10) {
    Snackbar.show({
      text: 'Please enter 10 digit mobile number',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  }

  if (email_address.length == 0) {
    Snackbar.show({
      text: 'please enter your email address',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  }

  if (Date_of_birth == '') {
    Snackbar.show({
      text: 'please enter your date of birth',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  }

  if (pincode == '') {
    Snackbar.show({
      text: 'please enter Pincode',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
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
        backgroundColor: colors.club_color,
      });
      return;
    }
  }
  if (pass.length == 0) {
    Snackbar.show({
      text: 'Please enter password',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  }
  if (pass != pass_cnf) {
    Snackbar.show({
      text: "Password dosen't match",
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  }

  if (gender == '') {
    Snackbar.show({
      text: 'please enter your gender',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  }

  if (!checked) {
    Snackbar.show({
      text: 'make sure to check terms and condition',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  }
  setloading(true);
  const request = await update_registration_details(
    fullname,
    mobile_number,
    email_address,
    pass,
    pass_cnf,
    Date_of_birth,
    pincode,
    gender,
    checked,
    '4',
    club_name,
    u_key,
  );
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      Keyboard.dismiss();
      navigation.navigate('OtpCode', {data: parse.data[0]});
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

export const verify_mob_verfication_club = async (
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
      backgroundColor: colors.club_color,
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
      navigation.replace('email_OtpCode', {data: prev_data});
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

export const verify_email_verfication_club = async (
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
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      await AsyncStorage.setItem(
        'user_persist_data_for_reg',
        JSON.stringify(prev_data),
      );
      navigation.replace('SportsDetails');
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

export const Save_club_details = async (
  setloading,
  navigation,
  sports,
  clubs,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  if (sports.length == 0) {
    Snackbar.show({
      text: 'please select some sports',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  } else if (clubs.length == 0) {
    Snackbar.show({
      text: 'please select some clubs',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  } else {
    setloading(true);
    //Club_Identity_section
    const request = await Add_sports_details_club(
      login_parse.u_key,
      sports.toString(),
      clubs.toString(),
      '',
    );
    if (request) {
      const parse = JSON.parse(request);
      console.log(parse);
      if (parse.error_code == 200) {
        setloading(false);
        navigation.replace('Club_Identity_section');
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
            backgroundColor: colors.club_color,
          });
          setloading(false);
        }
      }
    }
  }
};

export const update_identity_section = async (
  setloading,
  navigation,
  pancard_no,
  gst_no,
  pancard_img,
  gst_img,
  navigate,
  from,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  if (pancard_no.length == 0) {
    Snackbar.show({
      text: 'please enter pancart no',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: from == 2 ? colors.coach_color : colors.club_color,
    });
    return;
  } else if (gst_no.length == 0) {
    Snackbar.show({
      text: 'please enter gst no',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: from == 2 ? colors.coach_color : colors.club_color,
    });
    return;
  } else if (pancard_img == null) {
    Snackbar.show({
      text: 'please upload pan card photo',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: from == 2 ? colors.coach_color : colors.club_color,
    });
    return;
  } else if (gst_img == null) {
    Snackbar.show({
      text: 'please upload GST certificate photo copy',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: from == 2 ? colors.coach_color : colors.club_color,
    });
    return;
  } else {
    setloading(true);
    //Club_Identity_section
    const request = await Add_Identity_files_club(
      login_parse.u_key,
      pancard_no,
      gst_no,
      pancard_img,
      gst_img,
    );
    if (request) {
      const parse = JSON.parse(request);
      console.log(parse);
      if (parse.error_code == 200) {
        setloading(false);
        //Add_Bankdetails
        //Club_Add_Bankdetails
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
            backgroundColor: colors.club_color,
          });
          setloading(false);
        }
      }
    }
  }
};

export const Club_Get_details = async (
  setloading,
  setcoach_name,
  setmobile_no,
  setEmail,
  setDob,
  setpincode,
  setabout_me,
  setSelected,
  setitems_selected,
  setfee_range,
  setexperience,
  setprofile_pic,
  setcertificate,
  setclub,
  setaddress,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_user_prsonal_details(login_parse.u_key);
  if (request) {
    const parse = JSON.parse(request);
    console.log('club details', parse);
    if (parse.error_code == 200) {
      let format = parse.data.sport_list.map(i => i.sport_id);
      // id
      setloading(false);
      setcoach_name(parse.data.coach_name);
      setmobile_no(parse.data.mob);
      setEmail(parse.data.email);
      setDob(parse.data.dob);
      setpincode(parse.data.pincode);
      setabout_me(parse.data.bio);
      setSelected(format);
      // setitems_selected(format_2);
      setfee_range(parse.data.fee_range);
      setexperience(parse.data.experiance);
      setprofile_pic(parse.data.profile_photo);

      setaddress(parse.data.address);
      // Get_club_details(
      //   setloading,
      //   setclub,
      //   format.toString(),
      //   format_2,
      //   setitems_selected,
      // );
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

export const Upload_user_profile = async (
  setloading,
  file,
  dispatch,
  setloading_2,
  setcoach_name,
  setmobile_no,
  setEmail,
  setDob,
  setpincode,
  setabout_me,
  setSelected,
  setitems_selected,
  setfee_range,
  setexperience,
  setprofile_pic,
  setcertificate,
  setclub,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setloading(true);
  //Club_Identity_section
  const request = await Upload_user_profile_pic(login_parse.u_key, file);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      Get_details(
        setloading,
        setcoach_name,
        setmobile_no,
        setEmail,
        setDob,
        setpincode,
        setabout_me,
        setSelected,
        setitems_selected,
        setfee_range,
        setexperience,
        setprofile_pic,
        setcertificate,
        setclub,
      );
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

export const Upload_user_profile_student = async (
  setloading,
  file,
  dispatch,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setloading(true);
  //Club_Identity_section
  const request = await Upload_user_profile_pic(login_parse.u_key, file);
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      Get_user_presonal_details(setloading, dispatch);
      setloading(false);
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

export const Remove_user_coach_images = async (
  setloading,
  id,
  setloading_2,
  setcoach_name,
  setmobile_no,
  setEmail,
  setDob,
  setpincode,
  setabout_me,
  setSelected,
  setitems_selected,
  setfee_range,
  setexperience,
  setprofile_pic,
  setcertificate,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setloading(true);
  //Club_Identity_section
  const request = await Remove_images_of_coach_club(login_parse.u_key, id);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      setloading_2(true);
      Get_details(
        setloading_2,
        setcoach_name,
        setmobile_no,
        setEmail,
        setDob,
        setpincode,
        setabout_me,
        setSelected,
        setitems_selected,
        setfee_range,
        setexperience,
        setprofile_pic,
        setcertificate,
      );
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

//club apis
export const Upload_user_profile_2 = async (
  setloading,
  file,
  dispatch,
  navigation,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setloading(true);
  //Club_Identity_section
  const request = await Upload_user_profile_pic(login_parse.u_key, file);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      navigation.goBack();
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

export const Remove_user_club_images = async (
  setloading,
  id,
  setloading_2,
  navigation,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setloading(true);
  //Club_Identity_section
  const request = await Remove_images_of_coach_club(login_parse.u_key, id);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      setloading_2(true);
      navigation.goBack();
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};
