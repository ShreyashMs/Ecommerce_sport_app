import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {
  Get_reg_details_club,
  Get_reg_details_coach,
  Get_user_prsonal_details,
  Update_user_profile_details,
  add_coach_profile_details,
} from '../../Services/apis';
import {Get_club_details} from '../Login&Registration';
import { Get_user_presonal_details } from '../Common/Home_screen';
const colors = require('../../../colors/default_colors.json');

export const Get_details = async (
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
  setaddress
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_user_prsonal_details(login_parse.u_key);
  if (request) {
    const parse = JSON.parse(request);
    console.log('club details',parse);
    if (parse.error_code == 200) {
      let format = parse.data.sport_list.map(i => i.sport_id);
      let format_2 = parse.data.venue_list.map(i => i.id);
      let format_3 = parse.data.training_photo.map(i => {
        return {
          img_id: i.img_id,
          path: i.photo,
        };
      });
      // id
      // setloading(false);
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
      setcertificate(format_3);
      setaddress(parse.data.address)
      Get_club_details(
        setloading,
        setclub,
        format.toString(),
        format_2,
        setitems_selected,
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
          backgroundColor: colors.coach_color,
        });
        setloading(false);
      }
    }
  }
};

export const Profile_completion = async (
  setloading,
  navigation,
  coach_name,
  mobile_no,
  email,
  DOB,
  pincode,
  about_me,
  sports_array,
  venue_data,
  fee_range,
  expences,
  coach_photos,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  if (coach_name.length == 0) {
    Snackbar.show({
      text: 'please enter coach name',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (mobile_no.length == 0) {
    Snackbar.show({
      text: 'please enter mobile no',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (mobile_no.length != 10) {
    Snackbar.show({
      text: 'please enter 10 digit mobile no',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (email.length == 0) {
    Snackbar.show({
      text: 'please enter email address',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (email != '') {
    const emailstring =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const checkmail = emailstring.test(email);
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
  if (DOB.length == 0) {
    Snackbar.show({
      text: 'please enter date of birth',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (pincode.length == 0) {
    Snackbar.show({
      text: 'please enter pincode',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (about_me.length == 0) {
    Snackbar.show({
      text: 'please enter something about your self',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (sports_array.length == 0) {
    Snackbar.show({
      text: 'please enter sports',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (venue_data.length == 0) {
    Snackbar.show({
      text: 'please enter venue data',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (fee_range.length == 0) {
    Snackbar.show({
      text: 'please enter your fee range',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (expences.length == 0) {
    Snackbar.show({
      text: 'Please enter experience',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (coach_photos.length == 0) {
    Snackbar.show({
      text: 'Please add some photos of your coaching',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  const request = await add_coach_profile_details(
    login_parse.u_key,
    coach_name,
    mobile_no,
    email,
    DOB,
    pincode,
    about_me,
    sports_array.toString(),
    venue_data.toString(),
    fee_range,
    expences,
    coach_photos,
  );
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      setloading(false);
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: colors.coach_color,
      });
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
          backgroundColor: colors.coach_color,
        });
        setloading(false);
      }
    }
  }
};

export const Update_Profile_details = async (
  setloading,
  navigation,
  coach_name,
  mobile_no,
  email,
  DOB,
  pincode,
  about_me,
  sports_array,
  venue_data,
  fee_range,
  expences,
  coach_photos,
  address,
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
  setaddress
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  if (coach_name.length == 0) {
    Snackbar.show({
      text: 'please enter coach name',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (mobile_no.length == 0) {
    Snackbar.show({
      text: 'please enter mobile no',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (mobile_no.length != 10) {
    Snackbar.show({
      text: 'please enter 10 digit mobile no',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (email.length == 0) {
    Snackbar.show({
      text: 'please enter email address',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (email != '') {
    const emailstring =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const checkmail = emailstring.test(email);
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
  if (DOB.length == 0) {
    Snackbar.show({
      text: 'please enter date of birth',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (pincode.length == 0) {
    Snackbar.show({
      text: 'please enter pincode',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (address.length == 0) {
    Snackbar.show({
      text: 'please enter address',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (about_me.length == 0) {
    Snackbar.show({
      text: 'please enter something about your self',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (sports_array.length == 0) {
    Snackbar.show({
      text: 'please enter sports',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (venue_data.length == 0) {
    Snackbar.show({
      text: 'please enter venue data',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  if (fee_range.length == 0) {
    Snackbar.show({
      text: 'please enter your fee range',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }

  if (expences.length == 0) {
    Snackbar.show({
      text: 'Please enter experience',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.coach_color,
    });
    return;
  }
  setloading_2(true)
  const request = await Update_user_profile_details(
    login_parse.u_key,
    coach_name,
    mobile_no,
    email,
    DOB,
    pincode,
    about_me,
    sports_array.toString(),
    venue_data.toString(),
    fee_range,
    expences,
    coach_photos,
    address
  );
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
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
        setaddress
      );
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: colors.coach_color,
      });
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
          backgroundColor: colors.coach_color,
        });
        setloading(false);
      }
    }
  }
};
