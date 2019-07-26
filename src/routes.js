import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './pages/main';
import Guild from './pages/guild';
import Login from './pages/login';
import Welcome from './pages/welcome';
import Register from './pages/register';

const rootNavigator = createStackNavigator(
  {
    Welcome,
    Main,
    Guild,
    Login,
    Register
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
