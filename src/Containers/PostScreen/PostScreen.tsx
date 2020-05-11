import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from './PostScreenStyle';
import Style from 'src/Style';
import Header from 'src/Components/Header/Header';
import CustomFormSelect from 'src/Components/CustomForm/CustomFormSelect/CustomFormSelect';
import {Colors, Images} from 'src/Theme';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import {store} from 'src/Store';
import axios from 'axios';
import {baseUrl, photoSize} from 'src/config';

import {RESULTS} from 'react-native-permissions';
import {checkCamLibPermission} from 'src/Permissions';

const PostScreen = props => {
  const [state, dispatch] = useContext(store);
  const [tag, setTag] = useState('');
  const [place, setPlace] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [fee, setFee] = useState(0);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState([]);

  const handlePhoto = async () => {
    if (photo.length > 5) {
      Toast.show('select 6 picutre at max');
      return;
    }

    if (Platform.OS === 'android') {
      const ret = await checkCamLibPermission();
      if (!ret) return;
    }

    ImagePicker.showImagePicker(
      {
        title: 'select 1 picture',
        cancelButtonTitle: 'cancel',
        takePhotoButtonTitle: 'take',
        chooseFromLibraryButtonTitle: 'take a picture',
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          ImageResizer.createResizedImage(
            response.uri,
            photoSize,
            photoSize,
            'JPEG',
            100,
            0,
          )
            .then(({uri, path, name, size}) => {
              console.log('uri', uri, 'path', path, 'name', name, 'size', size);
              setPhoto([...photo, {uri, name, type: 'image/jpeg'}]);
              if (photo.length > 4) Toast.show('select 6 images at max');
            })
            .catch(err => {
              console.log('resize error... ... ...', err);
            });
        }
      },
    );
  };

  async function handleSubmit() {
    if (tag === '' || place === '' || address === '' || description === '') {
      Toast.show('input error!');
      return;
    }

    if (photo && photo.length > 0) {
      let formData = new FormData();
      photo.forEach(ph => {
        formData.append('photo', ph);
      });

      console.log('name or phone ???', state.user.name || state.user.phone);

      await axios
        .post(baseUrl + 'upload/photo', formData)
        .then(response => {
          const photos = response.data.photo;
          axios
            .post(baseUrl + 'api/stuffpost', {
              kind: 'lost',
              tag,
              place,
              address,
              fee,
              phone,
              description,
              photos,
              user: state.user._id,
              title: state.user.name,
            })
            .then(function(response2) {
              Toast.show(response2.data.msg);
              if (response2.data.success) {
                props.navigation.navigate('AppHome');
              }
            })
            .catch(function(error) {
              Toast.show('error');
            });
        })
        .catch(error => {
          console.log(JSON.stringify(error));
        });
    } else {
      axios
        .post(baseUrl + 'api/stuffpost', {
          kind: 'lost',
          tag,
          place,
          address,
          fee,
          phone,
          description,
          photos: [],
          user: state.user._id,
          title: state.user.name || state.user.phone,
        })
        .then(function(response2) {
          Toast.show(response2.data.msg);
          if (response2.data.success) {
            props.navigation.navigate('AppHome');
          }
        })
        .catch(function(error) {
          Toast.show('error');
        });
    }
  }

  useEffect(
    () =>
      props.navigation.addListener('focus', () => {
        if (!state.user._id) props.navigation.navigate('Signin');
        dispatch({type: 'setCurrentScreen', payload: 'lost-screen'});
      }),
    [dispatch, props.navigation, state.user._id],
  );

  useEffect(
    () =>
      props.navigation.addListener('blur', () =>
        console.log('Post Screen was unfocused'),
      ),
    [props.navigation],
  );

  return (
    <ScrollView style={Styles.FindStuffScreenContainer}>
      <Header
        back={() => props.navigation.navigate('AppHome')}
        label={'details'}
      />

      <View style={Styles.StuffInfoContainer}>
        <CustomFormSelect
          CustomFormSelectLabel={'category'}
          CustomFormSelectPlaceholder={'select category'}
          procFunc={value => setTag(value)}
        />
        <View style={Styles.FindStuffAreaContainer}>
          <View>
            <Text>address</Text>
          </View>
        </View>

        <View style={Styles.FindStuffDetailAreaContainer}>
          <View>
            <Text>address</Text>
          </View>
          <View style={{flex: 1}}>
            <TextInput
              style={Styles.FindStuffDetailAreaInput}
              onChangeText={value => setAddress(value)}
            />
          </View>
        </View>
        <View style={Styles.FindStuffDetailAreaContainer}>
          <View>
            <Text>phone</Text>
          </View>
          <View style={{flex: 1}}>
            <TextInput
              style={Styles.FindStuffDetailAreaInput}
              onChangeText={value => setPhone(value)}
              keyboardType={'numeric'}
            />
          </View>
        </View>
      </View>
      <View style={Styles.FindStuffPriceBtnContainer}>
        <Text>price</Text>
        <TextInput
          style={Styles.FindStuffPriceInput}
          onChangeText={value => setFee(value)}
          keyboardType={'numeric'}
        />
        <Text>$</Text>
      </View>
      <View style={Styles.FindStuffFooter}>
        <View>
          <Text>description</Text>
          <TextInput
            style={Styles.FindStuffTextArea}
            multiline={true}
            numberOfLines={4}
            onChangeText={value => setDescription(value)}
          />
        </View>
        <View style={Styles.FindStuffImgUploadContainer}>
          <TouchableOpacity
            style={Styles.FindStuffImgUploadWrap}
            onPress={handlePhoto}>
            <Text style={{color: Colors.grey}}>take a picture</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.FindStuffImgGroupContainer}>
          {photo &&
            photo.map((ph, i) => (
              <View style={{}}>
                <FastImage
                  key={i}
                  source={ph}
                  style={{
                    width: 70,
                    height: 70,
                    marginBottom: -15,
                    marginTop: 5,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setPhoto(photo.filter(p => p.uri != ph.uri));
                  }}
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: Colors.warmBlue,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>{'×'}</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </View>
      <View style={Styles.FindStuffSubBtnContainer}>
        <TouchableOpacity style={Styles.FindStuffSubBtn} onPress={handleSubmit}>
          <Text style={Styles.FindStuffSubBtnText}>confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PostScreen;
