import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {
  Cancel_user_order,
  Get_ac_status,
  Get_cat_brand,
  Get_cat_brand_sub_category,
  Get_product_brands,
  Get_sport_cat,
  get_booking_enq,
  get_booking_enq_details,
  get_booking_enq_student,
  get_club_courtswise_slots,
  get_enq_student,
  get_job_enq,
  get_sportwise_court,
  get_student_eq,
  send_booking_enquiry,
} from '../../Services/apis';
import {Platform, Linking} from 'react-native';

// import RNFetchBlob from 'rn-fetch-blob';
export const Get_account_activation_status = async (
  setloading,
  type,
  dispatch,
  navigation,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_ac_status(login_parse.u_key, type);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      if (parse.data.club_booking_st == 0 || parse.data.club_profile_st == 0) {
        navigation.replace('Club_Complete_profile', {data: parse.data});
      } else if (parse.data.ac_status == 0) {
        setloading(false);
        dispatch({type: 'set_setaccountstatus_data', payload: parse.data});
      } else {
        setloading(false);
        dispatch({type: 'set_setaccountstatus_data', payload: parse.data});
      }
      setloading(false);
      dispatch({type: 'set_setaccountstatus_data', payload: parse.data});
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
          backgroundColor: '#000',
        });
        setloading(false);
      }
    }
  }
};

export const Get_account_activation_status_complete_profile = async (
  setloading,
  type,
  dispatch,
  navigation,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_ac_status(login_parse.u_key, type);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      if (parse.data.club_booking_st == 0 || parse.data.club_profile_st == 0) {
        setloading(false);
        dispatch({type: 'set_setaccountstatus_data', payload: parse.data});
      } else if (parse.data.ac_status == 0) {
        setloading(false);
        dispatch({type: 'set_setaccountstatus_data', payload: parse.data});
      } else {
        setloading(false);
        dispatch({type: 'set_setaccountstatus_data', payload: parse.data});
      }
      setloading(false);
      dispatch({type: 'set_setaccountstatus_data', payload: parse.data});
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
          backgroundColor: '#000',
        });
        setloading(false);
      }
    }
  }
};

export const Get_account_activation_status_coach = async (
  setloading,
  type,
  dispatch,
  navigation,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_ac_status(login_parse.u_key, type);
  if (request) {
    const parse = JSON.parse(request);
    console.log(parse);
    if (parse.error_code == 200) {
      if (parse.data.coach_prof_st == 0) {
        navigation.push('Complete_profile', {data: parse.data});
      } else if (parse.data.ac_status == 0) {
        setloading(false);
        dispatch({type: 'set_setaccountstatus_data', payload: parse.data});
      } else {
        setloading(false);
        dispatch({type: 'set_setaccountstatus_data', payload: parse.data});
      }
      setloading(false);
      dispatch({type: 'set_setaccountstatus_data', payload: parse.data});
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
          backgroundColor: '#000',
        });
        setloading(false);
      }
    }
  }
};

export const get_sport_cat_for_service = async (
  setuser_data_load,
  set_data,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_sport_cat(login_parse.u_key);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      let format = parse.data.map(i => {
        return {
          label: i.sport_name,
          value: i.sport_id,
          service_type: i.service_type,
          service_prices_list: i.service_prices_list,
        };
      });
      setuser_data_load(false);
      set_data(format);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setuser_data_load(false);
        } else {
          setuser_data_load(false);
        }
      } else {
        setuser_data_load(false);
      }
    }
  }
};

export const get_sport_subcat_for_service = async (
  setuser_data_load,
  set_data,
  sp_id
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_cat_brand_sub_category(login_parse.u_key,sp_id);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      let format = parse.data.map(i => {
        return {
          label: i.sub_category_name,
          value: i.sub_cat_id,
        };
      });
      setuser_data_load(false);
      set_data(format);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setuser_data_load(false);
        } else {
          setuser_data_load(false);
        }
      } else {
        setuser_data_load(false);
      }
    }
  }
};

export const get_sport_cat_for_service_2 = async (
  setuser_data_load,
  set_data,
  set_default_value,
  setloading_2,
  seteq_array,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_sport_cat(login_parse.u_key);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      let format = parse.data.map(i => {
        return {
          label: i.sport_name,
          value: i.sport_id,
          service_type: i.service_type,
          service_prices_list: i.service_prices_list,
        };
      });
      set_data(format);
      set_default_value(format[0]);
      get_eq(setuser_data_load, seteq_array, format[0].value);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setuser_data_load(false);
        } else {
          setuser_data_load(false);
        }
      } else {
        setuser_data_load(false);
      }
    }
  }
};

export const get_eq = async (setloadings, set_data, sp_id) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_student_eq(login_parse.u_key, sp_id);
  console.log('colors response', request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
      setloadings(false);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setloadings(false);
        } else {
          setloadings(false);
        }
      } else {
        set_data([]);
        setloadings(false);
      }
    }
  }
};

export const Get_product_brand_for_services = async (
  setloading,
  set_data,
  p_id,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_product_brands(login_parse.u_key, p_id);
  console.log(request)
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      let format = parse.data.map(obj => {
        return {
          label: obj.brand_name,
          value: obj.brand_id,
        };
      });
      set_data(format);
      setloading(false);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setloading(false);
        } else {
          setloading(false);
        }
      } else {
        set_data([]);
        setloading(false);
      }
    }
  }
};

export const Get_product_sub_category_for_services = async (
  setloading,
  set_data,
  p_id,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_cat_brand_sub_category(login_parse.u_key, p_id);
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      let format = parse.data.map(obj => {
        return {
          label: obj.sub_category_name,
          value: obj.sub_cat_id,
        };
      });
      set_data(format);
      setloading(false);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setloading(false);
        } else {
          setloading(false);
        }
      } else {
        set_data([]);
        setloading(false);
      }
    }
  }
};

export const Cancel_order = async (
  setuser_data_load,
  ord_id,
  can_type,
  reason_id,
  reason_text,
  additional_note,
  navigation,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Cancel_user_order(
    login_parse.u_key,
    ord_id,
    can_type,
    reason_id,
    reason_text,
    additional_note,
  );
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: '#000',
      });
      setuser_data_load(false);
      navigation.pop(2);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setuser_data_load(false);
        } else {
          setuser_data_load(false);
        }
      } else {
        Snackbar.show({
          text: parse.message,
          duration: Snackbar.LENGTH_SHORT,
          fontFamily: 'Poppins-Regular',
          backgroundColor: '#000',
        });
        setuser_data_load(false);
      }
    }
  }
};

export const download_file = item => {
  setloading(true);
  const {config, fs} = RNFetchBlob;
  const date = new Date();

  const {DownloadDir} = fs.dirs; // You can check the available directories in the wiki.
  const options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true, // true will use native manager and be shown on notification bar.
      notification: true,
      path: `${DownloadDir}/me_${Math.floor(
        date.getTime() + date.getSeconds() / 2,
      )}.pdf`,
      description: 'Downloading.',
    },
  };

  config(options)
    .fetch('GET', item)
    .then(res => {
      console.log('downloaded file', item);
      setloading(false);
      console.log('do some magic in here', res);
    })
    .catch(e => console.log(e));
};

//job enquire
export const Send_job_enquire = async (
  setuser_data_load,
  booking_type,
  booking_to_u_key,
  sport_id,
  venue_id,
  c_time,
  additional_note,
  colors,
  navigation,
  navigate,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  console.log(login_parse);
  const request = await send_booking_enquiry(
    login_parse.u_key,
    booking_type,
    booking_to_u_key,
    sport_id,
    venue_id,
    c_time,
    additional_note,
  );
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: colors.club_color,
      });
      setuser_data_load(false);
      navigation.replace(navigate);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setuser_data_load(false);
        } else {
          setuser_data_load(false);
        }
      } else {
        Snackbar.show({
          text: parse.message,
          duration: Snackbar.LENGTH_SHORT,
          fontFamily: 'Poppins-Regular',
          backgroundColor: colors.club_color,
        });
        setuser_data_load(false);
      }
    }
  }
};

//booking enq
export const Get_court_by_sport = async (
  setloading,
  set_data,
  club_key,
  sport_id,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_sportwise_court(
    login_parse.u_key,
    club_key,
    sport_id,
  );
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
      setloading(false);
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

export const Get_court_slot_data = async (
  setloading,
  set_data,
  club_key,
  court_id,
  sel_date,
  setslots_selected,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setloading(true);
  const request = await get_club_courtswise_slots(
    login_parse.u_key,
    club_key,
    court_id,
    sel_date,
  );
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
      setloading(false);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setloading(false);
        } else {
          setloading(false);
        }
      } else {
        set_data([]);
        setslots_selected([]);
        setloading(false);
      }
    }
  }
};

//get_job_enq
export const Get_job_enquiry = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_job_enq(login_parse.u_key, '0');
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
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
          backgroundColor: '#000',
        });
        setloading(false);
        set_data([]);
      }
    }
  }
};

//coach booking details
export const Get_club_booking_enquiry = async (
  setloading,
  set_data,
  date,
  flag,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setloading(true);
  const request = await get_booking_enq(login_parse.u_key, date, flag);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
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
          backgroundColor: '#000',
        });
        setloading(false);
        set_data([]);
      }
    }
  }
};

export const Get_club_booking_enquiry_details = async (
  setloading,
  set_data,
  bok_enq_id,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_booking_enq_details(login_parse.u_key, bok_enq_id);
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
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
          backgroundColor: '#000',
        });
        setloading(false);
      }
    }
  }
};

//student
export const Get_student_booking_enquiry = async (
  setloading,
  set_data,
  date,
  flag,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setloading(true);
  const request = await get_booking_enq_student(login_parse.u_key, date, flag);
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
      setloading(false);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setloading(false);
        } else {
          setloading(false);
        }
      } else {
        setloading(false);
        set_data([]);
      }
    }
  }
};

export const Get_student_booking_enquiry_details = async (
  setloading,
  set_data,
  bok_enq_id,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_booking_enq_details(login_parse.u_key, bok_enq_id);
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
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
          backgroundColor: '#000',
        });
        setloading(false);
      }
    }
  }
};

export const Get_student_enquiry = async (setloading, set_data, flag) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_enq_student(login_parse.u_key, flag);
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
      setloading(false);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setloading(false);
        } else {
          setloading(false);
        }
      } else {
        setloading(false);
        set_data([]);
      }
    }
  }
};

export const Get_student_enquiry_details = async (
  setloading,
  set_data,
  bok_enq_id,
  bok_for,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_booking_enq_details(
    login_parse.u_key,
    bok_enq_id,
    bok_for,
  );
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
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
          backgroundColor: '#000',
        });
        setloading(false);
      }
    }
  }
};

export const callNumber = phone => {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phone}`;
  } else {
    phoneNumber = `telprompt:${phone}`;
  }
  return Linking.openURL(phoneNumber);
};

export const sendWhatsApp = phone_no => {
  let phoneWithCountryCode = phone_no;

  let mobile =
    Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
  if (mobile) {
    let url = 'whatsapp://send?phone=' + mobile;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Snackbar.show({
          text: 'Make sure WhatsApp installed on your device',
          duration: Snackbar.LENGTH_LONG,
          fontFamily: 'Poppins-Regular',
          backgroundColor: '#000',
        });
      });
  } else {
    Snackbar.show({
      text: 'Please insert mobile no',
      duration: Snackbar.LENGTH_LONG,
      fontFamily: 'Poppins-Regular',
      backgroundColor: '#000',
    });
  }
};
// get_student_app_booking_details
