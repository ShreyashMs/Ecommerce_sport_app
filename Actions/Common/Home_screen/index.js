import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import {
  Add_address_to_server,
  Add_default_address,
  Add_to_cart_data,
  Add_to_combo_data,
  Add_to_wishlist,
  Edit_address_to_server,
  Get_added_combo_product_data,
  Get_buy_product_data,
  Get_cancellation_order_resons,
  Get_category_product_data,
  Get_coupon_code_list,
  Get_faqs,
  Get_home_screen_data,
  Get_onbehalf_user_orders,
  Get_privacy_details,
  Get_product_brand_colorwise_details,
  Get_product_brand_data,
  Get_product_brand_details,
  Get_product_brands,
  Get_product_brands_modal_color,
  Get_product_brands_modal_name,
  Get_product_brands_modal_weight,
  Get_product_suggested_list_data,
  Get_terms_and_condition,
  Get_user_address_details,
  Get_user_orders,
  Get_user_orders_details_for_single_order,
  Get_user_prsonal_details,
  Get_users_cart_data,
  Get_users_membership_data,
  Get_wishlist_product_data,
  Make_product_filter_wise,
  PLace_on_behalf_order,
  Place_my_order,
  Remove_address_from_database,
  Remove_item_from_cart,
  Remove_item_from_combo,
  change_qty_of_prod_api,
  get_club,
  get_club_details,
  get_coach,
  get_coach_details,
  get_enq_student_details,
} from '../../../Services/apis';
import Snackbar from 'react-native-snackbar';
import BaseUrl from '../../../../Config/BaseURL';
import axios from 'axios';
const colors = require('../../../../colors/default_colors.json');

export const Get_faqs_details = async (setloading, set_data, type) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_faqs(login_parse.u_key, type);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      setloading(false);
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
          backgroundColor: '#000',
        });
        setloading(false);
      }
    }
  }
};

export const Get_TC_details = async (setloading, set_data, type) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_terms_and_condition(login_parse.u_key, type);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data.terms_data);
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

export const Get_privacy_policy_details = async (
  setloading,
  set_data,
  type,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_privacy_details(login_parse.u_key, type);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data.privacy_policy);
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

export const Get_main_home_screen_data = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_home_screen_data(login_parse.u_key);
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

export const Get_user_presonal_details = async (
  setuser_data_load,
  dispatch,
  udata,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const u_key = udata ? udata.u_key : login_parse.u_key;
  const request = await Get_user_prsonal_details(u_key);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      setuser_data_load(false);
      dispatch({type: 'set_setaccountdetails_data', payload: parse.data});
      return parse.data;
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setuser_data_load(false);
        } else {
          setuser_data_load(false);
        }
      } else {
      }
    }
  }
};

export const Get_buy_product = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_buy_product_data(login_parse.u_key);
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

export const Get__added_combo_product = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_added_combo_product_data(login_parse.u_key);
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

export const Get_Wishlist_product = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_wishlist_product_data(login_parse.u_key);
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

export const Add_or_remove_from_wishlist = async (
  setloading,
  set_data,
  p_id,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Add_to_wishlist(login_parse.u_key, p_id);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Get_buy_product(setloading, set_data);
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

export const Add_or_remove_from_wishlist_from_product_details = async (
  p_id,
  setload_color_product_img,
  setloading,
  setproduct_details,
  setprod_img,
  setloading_2,
  setbrands,
  setsuggested_product_list,
  setloading_4,
  setcolor_price,
  setsize_price,
  setselected_color,
  setselected_size,
  setselected_weight,
  setselected_type_default_selected,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Add_to_wishlist(login_parse.u_key, p_id);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Get_brand_product_details(
        setloading,
        setproduct_details,
        p_id,
        setprod_img,
        setloading_2,
        setbrands,
        setsuggested_product_list,
        setloading_4,
        setcolor_price,
        setsize_price,
        setselected_color,
        setselected_size,
        setselected_weight,
        setload_color_product_img,
        setselected_type_default_selected,
      );
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

export const Add_or_remove_from_wishlist_clone = async (
  setloading,
  set_data,
  p_id,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Add_to_wishlist(login_parse.u_key, p_id);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Get_Wishlist_product(setloading, set_data);
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

export const Get_category_product = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_category_product_data(login_parse.u_key);
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

export const Get_brand_product = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_product_brand_data(login_parse.u_key);
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
          backgroundColor: colors.club_color,
        });
        setloading(false);
      }
    }
  }
};

export const Get_brand_product_details = async (
  setloading,
  set_data,
  p_id,
  setprod_img,
  setloading_2,
  setbrands,
  setsuggested_product_list,
  setloading_4,
  setcolor_price,
  setsize_price,
  setselected_color,
  setselected_size,
  setselected_weight,
  setload_color_product_img,
  setselected_type_default_selected,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_product_brand_details(login_parse.u_key, p_id);

  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
      setprod_img(parse.data.prod_imgs);

      if (parse.data.prod_clr.length > 0) {
        setcolor_price(parse.data.prod_clr[0].p_c_price);
        setselected_color(parse.data.prod_clr[0]);
        Get_brand_product_colorwise(
          setload_color_product_img,
          parse.data.prod_clr[0].p_c_id,
          setprod_img,
        );
      }
      if (parse.data.prod_size.length > 0) {
        setselected_size(parse.data.prod_size[0]);
        setsize_price(parse.data.prod_size[0].p_s_price);
      }

      if (parse.data.prod_weight.length > 0) {
        setselected_weight(parse.data.prod_weight[0]);
      }

      if (parse.data.is_string_add == 1) {
        console.log('service provided');

        Get_product_suggested_list(
          setsuggested_product_list,
          parse.data.sub_cat_id,
          setloading_4,
        );
      } else {
        console.log('is not applied');
        Get_product_suggested_list(
          setsuggested_product_list,
          parse.data.sub_cat_id,
          setloading_4,
        );
        setloading_2(false);
      }
      setselected_type_default_selected(parse.data.service_type_data);
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

export const Get_product_suggested_list = async (
  set_data,
  p_id,
  setloading,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_product_suggested_list_data(
    login_parse.u_key,
    p_id,
  );

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

export const Get_user_entered_address = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_user_address_details(login_parse.u_key);
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

export const Get_product_brand_for_string = async (
  setloading,
  set_data,
  p_id,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_product_brands(login_parse.u_key, p_id);
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
        setloading(false);
      }
    }
  }
};

export const Get_product_brands_modal_name_for_string = async (
  set_data,
  p_id,
  setstring_product_details,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_product_brands_modal_name(login_parse.u_key, p_id);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      let format = parse.data.model_data.map(obj => {
        return {
          label: obj.model_name,
          value: obj.model_name,
        };
      });
      set_data(format);
      setstring_product_details(parse.data.product_data);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
        } else {
        }
      } else {
      }
    }
  }
};

export const Get_product_brands_colors_for_string = async (
  set_data,
  p_id,
  setstring_product_details,
  brand_id,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_product_brands_modal_color(
    login_parse.u_key,
    p_id,
    brand_id,
  );
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      console.log(parse.data);
      let format = parse.data.color_data.map(obj => {
        return {
          label: obj.color_name,
          value: obj.p_c_id,
          p_c_price: obj.p_c_price,
          prod_id: obj.prod_id,
        };
      });
      set_data(format);
      setstring_product_details(parse.data.product_data);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
        } else {
        }
      } else {
      }
    }
  }
};

export const Get_product_brands_weight_for_string = async (
  set_data,
  p_id,
  setstring_product_details,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_product_brands_modal_weight(
    login_parse.u_key,
    p_id,
  );

  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      let format = parse.data.weight_data.map(obj => {
        return {
          label: `${obj.total_weight} ${obj.weight_type}`,
          is_recommended: obj.its_recommended,
          value: obj.p_w_id,
        };
      });
      set_data(format);
      setstring_product_details(parse.data.product_data);
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
        } else {
        }
      } else {
      }
    }
  }
};

export const Get_brand_product_colorwise = async (
  setloading,
  c_id,
  setprod_img,
  setcolor_price,
) => {
  console.log('colors calling', request);
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_product_brand_colorwise_details(
    login_parse.u_key,
    c_id,
  );
  setloading(true);
  console.log('color', request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      setprod_img(parse.data);
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

export const Filter_data = async (
  setloading,
  set_data,
  f_type,
  sub_cat_list,
  brand_id,
  sort_m_type,
  sort_s_type,
  weight_type,
  handle_close,
  setselected_category,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Make_product_filter_wise(
    login_parse.u_key,
    f_type,
    sub_cat_list.toString(),
    brand_id,
    sort_m_type,
    sort_s_type,
    weight_type,
  );
  setloading(true);
  if (request) {
    const parse = JSON.parse(request);

    if (parse.error_code == 200) {
      // Get_buy_product(setloading, set_data);
      set_data(parse.data);
      setselected_category(sub_cat_list.toString());
      setloading(false);
      handle_close();
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

export const Add_address_to_api = async (
  setloading,
  add_type,
  full_name,
  pincode,
  address,
  city,
  state,
  mobile_no,
  navigation,
  color,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Add_address_to_server(
    login_parse.u_key,
    add_type,
    full_name,
    pincode,
    address,
    city,
    state,
    mobile_no,
  );
  setloading(true);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: color,
      });
      navigation.goBack();
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
          backgroundColor: color,
        });
        setloading(false);
      }
    }
  }
};

export const Edit_address_to_api = async (
  setloading,
  add_id,
  add_type,
  full_name,
  pincode,
  address,
  city,
  state,
  mobile_no,
  navigation,
  color,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Edit_address_to_server(
    login_parse.u_key,
    add_id,
    add_type,
    full_name,
    pincode,
    address,
    city,
    state,
    mobile_no,
  );
  setloading(true);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: color,
      });
      navigation.goBack();
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
          backgroundColor: color,
        });
        setloading(false);
      }
    }
  }
};

export const Remove_address = async (
  setloading,
  c_id,
  color,
  setloading_two,
  setaddress_array,
) => {
  setloading(true);
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Remove_address_from_database(login_parse.u_key, c_id);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: color,
      });
      setloading(false);
      Get_user_entered_address(setloading_two, setaddress_array);
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

export const Get_coupons_code = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_coupon_code_list(login_parse.u_key);
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
// const Place_my_order = async (
//   uid,
//   ord_type,
//   combo_type,
//   delivery_add_id,
//   total_o_amt,
//   is_apply_disc,
//   discount_type,
//   disc_percent,
//   coup_code,
//   disc_amt,
//   total_prod_amt,
//   ord_data,
//   address_format,
//   client_type,
//   margin,
//   discount,
//   mobile_no,
//   email,
//   pickup_datetime,
//   drop_datetime,
//   is_service_add,
//   service_total_amt,
//   service_data,
// ) => {
//   const formData = new FormData();

//   formData.append('u_key', uid);
//   formData.append('ord_type', ord_type);
//   formData.append('norm_combo', combo_type);
//   formData.append('delivery_add_id', delivery_add_id);
//   formData.append('total_o_amt', total_o_amt);
//   formData.append('is_apply_disc', is_apply_disc);
//   formData.append('discount_type', discount_type);
//   formData.append('disc_percent', disc_percent);
//   formData.append('coup_code', coup_code);
//   formData.append('disc_amt', disc_amt);
//   formData.append('total_prod_amt', total_prod_amt);
//   formData.append('adres_data', JSON.stringify(address_format));
//   formData.append('client_type', client_type);
//   formData.append('stud_margin_amt', margin);
//   formData.append('student_disc', discount);
//   formData.append('c_mobile_no', mobile_no);
//   formData.append('c_email_id', email);
//   formData.append('c_state', '');
//   formData.append('c_GST_no', '');
//   formData.append('ord_data', JSON.stringify({ord_data: [...ord_data]}));
//   formData.append('pickup_datetime', pickup_datetime);
//   formData.append('drop_datetime', drop_datetime);
//   formData.append('is_service_add', is_service_add);
//   formData.append('service_total_amt', service_total_amt);
//   formData.append(
//     'service_data',
//     service_data != null
//       ? JSON.stringify({service_data: [...service_data]})
//       : [],
//   );
//   console.log(formData);
//   // await fetch(BaseUrl + 'place_order', {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //   },
//   //   body: formData,
//   // })
//   //   .then(Response => Response.text())
//   //   .then(async data => {
//   //     if (data) {
//   //       return JSON.stringify(data);
//   //     } else {
//   //       console.log('error');
//   //       return JSON.stringify(data.message);
//   //     }
//   //   })
//   //   .catch(function (error) {
//   //     console.log(
//   //       'There has been a problem with your fetch operation: ' + error.message,
//   //     );
//   //     // ADD THIS THROW error
//   //     return JSON.stringify({
//   //       Data: {error_code: 555, message: 'server side error'},
//   //     });
//   //   });
//   axios({
//     method: 'post',
//     url: `${BaseUrl}place_order`,
//     data: formData,
//     headers: {'Content-Type': 'multipart/form-data'},
//   })
//     .then(function (response) {
//       //handle success
//       console.log(response);
//     })
//     .catch(function (response) {
//       //handle error
//       console.log(response);
//     });
// };
export const Place_order = async (
  setloading,
  ord_type,
  combo_type,
  delivery_add_id,
  total_o_amt,
  is_apply_disc,
  discount_type,
  disc_percent,
  coup_code,
  disc_amt,
  total_prod_amt,
  ord_data,
  color,
  navigation,
  navigate,
  address_format,
  client_type,
  margin,
  discount,
  mobile_no,
  email,
  pickup_datetime,
  drop_datetime,
  is_service_add,
  service_total_amt,
  service_data,
  setorder_success,
) => {
  console.log('odr_data', JSON.stringify(ord_data));
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  // setloading(true);
  const request = await Place_my_order(
    login_parse.u_key,
    ord_type,
    combo_type,
    delivery_add_id,
    total_o_amt,
    is_apply_disc,
    discount_type,
    disc_percent,
    coup_code,
    disc_amt,
    total_prod_amt,
    ord_data,
    address_format[0],
    client_type,
    margin,
    discount,
    mobile_no,
    email,
    pickup_datetime,
    drop_datetime,
    is_service_add,
    service_total_amt,
    service_data,
  );
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: color,
      });
      // Student_my_orders
      setorder_success(true);
      // navigation.replace(navigate);
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
          backgroundColor: color,
        });
        setloading(false);
      }
    }
  }
};

export const set_selected_address_api = async (
  setloading,
  add_id,
  setloading_two,
  setaddress_array,
  color,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Add_default_address(login_parse.u_key, add_id);
  setloading(true);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: color,
      });
      setloading(false);
      Get_user_entered_address(setloading_two, setaddress_array);
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
          backgroundColor: color,
        });
        setloading(false);
      }
    }
  }
};

export const Add_to_cart = async (
  setloading,
  obj,
  color,
  navigation,
  navigate,
  setload_index,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setloading(true);
  const request = await Add_to_cart_data(login_parse.u_key, obj);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: color,
      });
      setloading(false);
      setload_index(0);
      navigation.dispatch(StackActions.replace(navigate));
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setloading(false);
          setload_index(0);
        } else {
          setloading(false);
          setload_index(0);
        }
      } else {
        Snackbar.show({
          text: parse.message,
          duration: Snackbar.LENGTH_SHORT,
          fontFamily: 'Poppins-Regular',
          backgroundColor: color,
        });
        setload_index(0);
        setloading(false);
      }
    }
  }
};

export const Get_club_or_coach_membership_data = async (
  setloading,
  set_data,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_users_membership_data(login_parse.u_key);
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

export const Get_user_added_cart_data = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_users_cart_data(login_parse.u_key);

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
        setloading(false);
      }
    }
  }
};

export const check_cart_before_add_combo = async (
  item,
  setload_index,
  color,
  setloading,
  navigation,
  navigate,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setload_index(item.combo_id);
  setloading(true);
  const request = await Get_users_cart_data(login_parse.u_key);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      if (parse.data.length > 0) {
        if (parse.data[0].norm_comb == '4') {
          Snackbar.show({
            text: 'please clear the cart and then try ',
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
            backgroundColor: color,
          });
          setload_index(0);
          setloading(false);
        } else {
          let obj = item.prod_list.map(it => {
            return {
              cart_p_type: '2',
              combo_name: item.combo_name,
              prod_id: it.prod_id,
              color_id: Array.isArray(it.prod_clr)
                ? it.prod_clr.length == 0
                  ? ''
                  : it.prod_clr.p_c_id
                : it.prod_clr.p_c_id,
              size_id: Array.isArray(it.prod_size)
                ? it.prod_size.length == 0
                  ? ''
                  : it.prod_size.size_id
                : it.prod_size.size_id,
              weight_id: Array.isArray(it.weight_data)
                ? it.weight_data.length == 0
                  ? ''
                  : it.weight_data.p_w_id
                : it.weight_data.p_w_id,
              qty: it.p_qty,
            };
          });
          let format = [...obj];
          Add_to_cart(
            setloading,
            format.filter(y => y !== null),
            colors.coach_color,
            navigation,
            navigate,
            setload_index,
          );
        }
      } else {
        let obj = item.prod_list.map(it => {
          return {
            cart_p_type: '2',
            combo_name: item.combo_name,
            prod_id: it.prod_id,
            color_id: Array.isArray(it.prod_clr)
              ? it.prod_clr.length == 0
                ? ''
                : it.prod_clr.p_c_id
              : it.prod_clr.p_c_id,
            size_id: Array.isArray(it.prod_size)
              ? it.prod_size.length == 0
                ? ''
                : it.prod_size.size_id
              : it.prod_size.size_id,
            weight_id: Array.isArray(it.weight_data)
              ? it.weight_data.length == 0
                ? ''
                : it.weight_data.p_w_id
              : it.weight_data.p_w_id,
            qty: it.p_qty,
          };
        });
        let format = [...obj];
        Add_to_cart(
          setloading,
          format.filter(y => y !== null),
          colors.coach_color,
          navigation,
          navigate,
          setload_index,
        );
      }
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
          setload_index(0);
        } else {
          setload_index(0);
        }
      } else if (parse.error_code == 403) {
        let obj = item.prod_list.map(it => {
          return {
            cart_p_type: '2',
            combo_name: item.combo_name,
            prod_id: it.prod_id,
            color_id: Array.isArray(it.prod_clr)
              ? it.prod_clr.length == 0
                ? ''
                : it.prod_clr.p_c_id
              : it.prod_clr.p_c_id,
            size_id: Array.isArray(it.prod_size)
              ? it.prod_size.length == 0
                ? ''
                : it.prod_size.size_id
              : it.prod_size.size_id,
            weight_id: Array.isArray(it.weight_data)
              ? it.weight_data.length == 0
                ? ''
                : it.weight_data.p_w_id
              : it.weight_data.p_w_id,
            qty: it.p_qty,
          };
        });
        let format = [...obj];
        Add_to_cart(
          setloading,
          format.filter(y => y !== null),
          colors.coach_color,
          navigation,
          'Cart',
          setload_index,
        );
      } else {
        setload_index(0);
      }
    }
  }
};

export const Get_user_order_data = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_user_orders(login_parse.u_key);
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

export const Get_onbehalf_user_order_data = async (setloading, set_data) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_onbehalf_user_orders(login_parse.u_key);
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

export const Get_user_order_single_order_details = async (
  setloading,
  set_data,
  order_id,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_user_orders_details_for_single_order(
    login_parse.u_key,
    order_id,
  );
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data[0]);
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

export const Get_order_cancellation_resons = async (
  setloading,
  set_data,
  r_type,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Get_cancellation_order_resons(
    login_parse.u_key,
    r_type,
  );
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

export const Remove_data_from_cart = async (
  setloading,
  c_id,
  color,
  setloading_2,
  set_data,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Remove_item_from_cart(login_parse.u_key, c_id);
  setloading(true);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      setloading(false);
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: color,
      });
      Get_user_added_cart_data(setloading_2, set_data);
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

export const Remove_data_from_combo = async (
  setloading,
  c_id,
  setloading_2,
  set_data,
  color,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Remove_item_from_combo(login_parse.u_key, c_id);
  setloading(true);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: color,
      });
      Get__added_combo_product(setloading, set_data);
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

export const change_qty_of_prod = async (c_id, p_qty, color) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await change_qty_of_prod_api(login_parse.u_key, c_id, p_qty);

  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
    } else {
      if (parse.Data != undefined) {
        if (parse.Data.error_code == 555) {
        } else {
        }
      } else {
      }
    }
  }
};

export const Pay_for_behalf_payemnt = async (
  setloading,
  ord_id,
  ord_type,
  delivery_add_id,
  adres_data,
  pay_st,
  navigation,
  navigate,
  color,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setloading(true);
  const request = await PLace_on_behalf_order(
    login_parse.u_key,
    ord_id,
    ord_type,
    delivery_add_id,
    adres_data,
    pay_st,
  );

  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      setloading(true);
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: color,
      });
      // Student_my_orders
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
          backgroundColor: color,
        });
        setloading(false);
      }
    }
  }
};

export const Get_coach_list = async (
  setloading,
  set_data,
  sport_id,
  pin_code,
  r_type,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_coach(
    login_parse.u_key,
    sport_id,
    pin_code,
    r_type,
  );
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

export const Get_club_list = async (
  setloading,
  set_data,
  sport_id,
  pin_code,
  r_type,
  openShowModal,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_club(login_parse.u_key, sport_id, pin_code, r_type);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      set_data(parse.data);
      setloading(false);
      openShowModal(false);
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

export const Get_club_details = async (setloading, set_data, u_k) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_club_details(login_parse.u_key, u_k);
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

export const Get_coach_details = async (setloading, set_data, u_k) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_coach_details(login_parse.u_key, u_k);
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

//combo order
// Add combo
export const Add_combo_to_api = async (
  setloading,
  obj,
  color,
  navigation,
  dispatch,
  goback_count,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  setloading(true);
  const request = await Add_to_combo_data(login_parse.u_key, obj);
  setloading(true);
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: color,
      });
      setloading(false);
      dispatch({type: 'RESET_comboproduct_in_array'});
      navigation.pop(goback_count);
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
          backgroundColor: color,
        });
        setloading(false);
      }
    }
  }
};

//add_combo
export const Add_to_combo_to_cart = async (
  setloading,
  obj,
  color,
  navigation,
  navigate,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await Add_to_cart_data(login_parse.u_key, obj);
  setloading(true);
  console.log(request);
  if (request) {
    const parse = JSON.parse(request);
    if (parse.error_code == 200) {
      Snackbar.show({
        text: parse.message,
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: 'Poppins-Regular',
        backgroundColor: color,
      });
      setloading(false);
      navigation.replace(navigate);
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
          backgroundColor: color,
        });
        setloading(false);
      }
    }
  }
};

//student booking details
export const Get_student_app_booking_details = async (
  setloading,
  set_data,
  bok_enq_id,
  bok_for,
) => {
  const logged_in = await AsyncStorage.getItem('user_persist_data_for_reg');
  let login_parse = JSON.parse(logged_in);
  const request = await get_enq_student_details(
    login_parse.u_key,
    bok_enq_id,
    bok_for,
  );
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

//Services
