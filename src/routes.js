import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './pages/main';
import Guild from './pages/guild';
import Login from './pages/login';
import Welcome from './pages/welcome';

const rootNavigator = createStackNavigator(
  {
    Welcome,
    Main,
    Guild,
    Login
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#20232A'
      },
      headerTintColor: '#5ED8FB',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

export default createAppContainer(rootNavigator);
