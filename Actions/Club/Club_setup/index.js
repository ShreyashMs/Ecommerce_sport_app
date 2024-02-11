import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {Add_court_details_club} from '../../../Services/apis';
import { Get_account_activation_status } from '../../Common';
const colors = require('../../../../colors/default_colors.json');

export const dispatch_data_in_court_object = (
  setloading,
  navigation,
  dispatch,
  sport_id,
  id,
  court_photo,
  court_name,
  des,
  slot_for_weekdays,
) => {
  
  if (court_photo == null) {
    Snackbar.show({
      text: 'please add photo for court',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  } else if (court_name.length == 0) {
    Snackbar.show({
      text: 'please enter court name',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  } else {
    dispatch({
      type: 'add_new_item_in_array',
      payload: {
        id: id,
        sport_id: sport_id,
        name: court_name,
        des: des,
        slot_for_weekdays: slot_for_weekdays,
        court_image: court_photo,
      },
    });
    navigation.goBack();
  }
};

export const club_bookings = async (
  setloading,
  navigation,
  sport_id,
  court_array,
  dispatch,
) => {
  if (sport_id.length == 0) {
    Snackbar.show({
      text: 'please select sport and then try',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  } else if (court_array.length == 0) {
    Snackbar.show({
      text: 'please complete your court setup',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: colors.club_color,
    });
    return;
  } else {
    // dispatch({type: 'RESET_clubcourt'});
    const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
    let login_parse = JSON.parse(logged_in);
    setloading(true);
    const request = await Add_court_details_club(
      login_parse.u_key,
      court_array.map(i => {
        return {
          court_name: i.name,
          sport_id: i.sport_id,
          court_img: 'e',
          court_desc: i.des,
          weekdays: i.slot_for_weekdays.map(obj => {
            return {
              day_name:
                obj.week_id == 1
                  ? 'Mon'
                  : obj.week_id == 2
                  ? 'Tus'
                  : obj.week_id == 3
                  ? 'Wed'
                  : obj.week_id == 4
                  ? 'Thu'
                  : obj.week_id == 5
                  ? 'Fri'
                  : obj.week_id == 6
                  ? 'Sat'
                  : 'Sun',
              day_flag: obj.week_id,
              time_slots: i.slot_for_weekdays
                .filter(fi => fi.week_id == obj.week_id)
                .map(week => {
                  return {
                    start: week.start_time,
                    end: week.end_time,
                    price: week.price,
                  };
                }),
            };
          }),
        };
      }),
      court_array.map(i => i.court_image),
    );
    console.log(request)
    if (request) {
      const parse = JSON.parse(request);
      if (parse.error_code == 200) {
        Snackbar.show({
          text: parse.message,
          duration: Snackbar.LENGTH_SHORT,
          fontFamily: 'Poppins-Regular',
          backgroundColor: colors.club_color,
        });
        dispatch({type: 'RESET_clubcourt'});
        Get_account_activation_status(setloading, '4', dispatch, navigation);
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
  }
};
