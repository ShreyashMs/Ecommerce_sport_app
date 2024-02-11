import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Get_facility_details_club,
  Get_reg_details_club,
  Get_user_prsonal_details,
  add_club_details,
} from '../../../Services/apis';
import Snackbar from 'react-native-snackbar';
import {Get_account_activation_status} from '../../Common';
const colors = require('../../../../colors/default_colors.json');

export const Get_details = async (
  setloading,
  setclub_name,
  setaddress,
  setselected_sports,
  setdescription,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_reg_details_club(login_parse.u_key);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      let format = parse.data.sport_list.map(i => i.sport_id);
      setloading(false);
      console.log(parse);
      setclub_name(parse.data.club_name);
      setaddress(parse.data.address);
      setdescription(parse.data.description);
      setselected_sports(format);

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

export const Get_profile_details = async (
  setloading,
  setclub_name,
  setaddress,
  setselected_sports,
  setdescription,
  setfacility_data,
  setfee_range,
  setparking_photo,
  setoutside_photo,
  setinside_facility,
  setcourt_photo,
  setprofile_pic
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_user_prsonal_details(login_parse.u_key);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      let format = parse.data.sport_list.map(i => i.sport_id);
      setloading(false);
      console.log(parse);
      setclub_name(parse.data.club_name);
      setaddress(parse.data.address);
      setdescription(parse.data.description);
      setselected_sports(format);
      setfacility_data(parse.data.facility_list);
      setfee_range(parse.data.fee_range);
      setparking_photo(parse.data.parking_photo);
      setinside_facility(parse.data.inside_facility);
      setoutside_photo(parse.data.outside_photo)
      setcourt_photo(parse.data.court_photo)
      // setoutside_photo(parse.data.outside_photo)
      // setcourt_photo(parse.data.court_photox)
      //parking_photo
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

export const Get_facility_details = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_facility_details_club(login_parse.u_key);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      setloading(false);
      console.log(parse);
      set_data(parse.data);
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

export const Add_club_details = async (
  setsend_req,
  navigation,
  club_name,
  description,
  address,
  selected_sports,
  facility_data,
  fee_range,
  parking_photo,
  inside_facility,
  outside_photo,
  court_photo,
  dispatch,
) => {
  if (club_name.length == 0) {
    Snackbar.show({
      text: 'please enter club name',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
  } else if (description.length == 0) {
    Snackbar.show({
      text: 'please enter desciption',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
  } else if (address.length == 0) {
    Snackbar.show({
      text: 'please enter address',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
  } else if (selected_sports.length == 0) {
    Snackbar.show({
      text: 'please enter sports',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
  } else if (facility_data.length == 0) {
    Snackbar.show({
      text: 'please enter facility',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
  } else if (fee_range.length == 0) {
    Snackbar.show({
      text: 'please enter fee range',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
  } else if (parking_photo.length == 0) {
    Snackbar.show({
      text: 'please enter facility',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
  } else if (inside_facility.length == 0) {
    Snackbar.show({
      text: 'please enter facility',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
  } else if (outside_photo.length == 0) {
    Snackbar.show({
      text: 'please enter facility',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
  } else if (court_photo.length == 0) {
    Snackbar.show({
      text: 'please enter facility',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
  } else {
    const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
    let login_parse = JSON.parse(logged_in);
    setsend_req(true);
    const request = await add_club_details(
      login_parse.u_key,
      club_name,
      description,
      address,
      selected_sports.toString(),
      facility_data.map(i => i.fc_id).toString(),
      fee_range,
      parking_photo,
      inside_facility,
      outside_photo,
      court_photo,
    );
    console.log(request);
    if (request) {
      const parse = JSON.parse(request);
      if (parse.error_code == 200) {
        Snackbar.show({
          text: parse.message,
          duration: Snackbar.LENGTH_SHORT,
          fontFamily: 'Poppins-Regular',
          backgroundColor: colors.club_color,
        });
        Get_account_activation_status(setsend_req, '4', dispatch, navigation);
        navigation.goBack();
      } else {
        if (parse.Data != undefined) {
          if (parse.Data.error_code == 555) {
            setsend_req(false);
          } else {
            setsend_req(false);
          }
        } else {
          Snackbar.show({
            text: parse.message,
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
            backgroundColor: colors.club_color,
          });
          setsend_req(false);
        }
      }
    }
  }
};
