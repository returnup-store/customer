import 'react-native-gesture-handler';
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SigninScreen from 'src/Containers/Authentication/SignInScreen/SignInScreen';
import SignUpScreen from 'src/Containers/Authentication/SignUpScreen/SignUpScreen';
import ForgotPwdScreen from 'src/Containers/Authentication/ForgotPwdScreen/ForgotPwdScreen';

import PostScreen from 'src/Containers/PostScreen/PostScreen';
import ChatRoom from 'src/Containers/Chat/Chat/ChatRoom';
import UserInfo from 'src/Containers/Category/UserInfo/UserInfo';

import {StateProvider} from 'src/Store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={PostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}
