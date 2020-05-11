import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreenWithBottomNav from 'src/Components/BottomTabNav/BottomTabNav';
import SigninScreen from 'src/Containers/Authentication/SignInScreen/SignInScreen';
import SignUpScreen from 'src/Containers/Authentication/SignUpScreen/SignUpScreen';
import ForgotPwdScreen from 'src/Containers/Authentication/ForgotPwdScreen/ForgotPwdScreen';
import PostScreen from 'src/Containers/PostScreen/PostScreen';
import ChatRoom from 'src/Containers/Chat/Chat/ChatRoom';
import UserInfo from 'src/Containers/Category/UserInfo/UserInfo';
import {StateProvider} from 'src/Store';

const AppNavigator = createStackNavigator(
  {
    MainScreenWithBottomNav: MainScreenWithBottomNav,
    Signin: SigninScreen,
    SignUp: SignUpScreen,
    ForgotPwdScreen: ForgotPwdScreen,

    PostScreen: PostScreen,

    ChatRoom: ChatRoom,
    UserInfo: UserInfo,
  },
  {
    initialRouteName: 'MainScreenWithBottomNav',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <StateProvider>
      <AppContainer />
    </StateProvider>
  );
}
