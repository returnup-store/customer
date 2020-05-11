import React, {ReactElement, useContext} from 'react';
import {View, Image} from 'react-native';
import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import ProfileView from 'src/Containers/Profile/Profile';
import HomeView from 'src/Containers/Home';
import Style from './BottomTabNavStyle';
import RoomList from 'src/Containers/Chat/RoomList';
import PostScreen from 'src/Containers/PostScreen/PostScreen';
import {Colors, Images} from 'src/Theme';

import PostView from 'src/Containers/Category/CategoryList/PostView';
import PostDetail from 'src/Containers/Category/CategoryDetail/PostDetail';

import NotificationView from 'src/Containers/Notification/NotificationList/NotificationList';
import NotificationDetail from 'src/Containers/Notification/NotificationDetail/NotificationDetail';

import NewsView from 'src/Containers/Category/CategoryList/NewsView';
import NewsDetail from 'src/Containers/Category/CategoryDetail/NewsDetail';

import {store} from 'src/Store';

const TabBarComponent = props => <BottomTabBar {...props} />;

const NotificationStackNavigator = createStackNavigator(
  {
    NotificationView: {
      screen: NotificationView,
    },
    NotificationDetail: {
      screen: NotificationDetail,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const HomeStackNavigator = createStackNavigator(
  {
    HomeView: {
      screen: HomeView,
    },
    PostView: {
      screen: PostView,
    },
    PostDetail: {
      screen: PostDetail,
    },
    NewsView: {
      screen: NewsView,
    },
    NewsDetail: {
      screen: NewsDetail,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    AppHome: {
      screen: HomeStackNavigator,
    },
    Chat: {
      screen: RoomList,
    },
    Post: {
      screen: PostScreen,
    },
    Notification: {
      screen: NotificationStackNavigator,
    },
    Profile: {
      screen: ProfileView,
    },
  },
  {
    tabBarComponent: (props: any): ReactElement => {
      return <TabBarComponent {...props} style={Style.BottomNavTabContainer} />;
    },
    initialRouteName: 'AppHome',
  },
);

const MainScreenWithBottomNav = props => {
  return <BottomTabNavigator navigation={props.navigation} />;
};
MainScreenWithBottomNav.router = BottomTabNavigator.router;

export default MainScreenWithBottomNav;
