/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AttendanceScreen from '../screens/AttendanceScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { BuildingIcon, DashboardIcon, ExploreIcon, HistoryIcon, HomeIcon, LocationIcon, MeetingIcon, UserIcon } from '../shared/Icons';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import AttendanceReportScreen from '../screens/Reports/AttendanceReportScreen';
import CommonContextMenu from '../components/organisms/CommonContextMenu';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import SuccessRegisterScreen from '../screens/Register/SuccessRegisterScreen';
import { getUserDetail, isUserAdmin } from '../services/DataStorageService';
import UsersScreen from '../screens/Users/UsersScreen';
import BranchesScreen from '../screens/Branches/BranchesScreen';
import AddBranchScreen from '../screens/Branches/AddBranchScreen';
import AddUserScreen from '../screens/Users/AddUserScreen';
import AddBranchAfterRegisterScreen from '../screens/Branches/AddBranchAfterRegisterScreen';
import AdminAttendanceReportScreen from '../screens/Reports/AdminAttendanceReportScreen';
import ChangePwdScreen from '../screens/ChangePwdScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import MeetingScreen from '../screens/Meeting/MeetingScreen';
import LeaveScreen from '../screens/Leave/LeaveScreen';
import AddLeaveScreen from '../screens/Leave/AddLeaveScreen';
import ViewMeetingScreen from '../screens/Meeting/ViewMeetingScreen';
import HolidaysScreen from '../screens/Holidays/HolidaysScreen';
import AddHolidayScreen from '../screens/Holidays/AddHolidayScreen';
import LeaveApprovalScreen from '../screens/LeaveApproval/LeaveApprovalScreen';
import AdminDashboardScreen from '../screens/Dashboard/AdminDashboardScreen';
import AttendanceCountDetailScreen from '../screens/Dashboard/AttendanceCountDetailScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (

    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>

  );
}

export function LoginNavigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (

    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <LoginNavigator />
    </NavigationContainer>

  );
}

const LoginStack = createNativeStackNavigator<any>();

function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <LoginStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
      <LoginStack.Screen name="AddBranchAfterRegister" component={AddBranchAfterRegisterScreen} options={{ headerShown: true, title: 'Add Office Location' }} initialParams={{ navigateFrom: 'init', userId: 0 }} />
      <LoginStack.Screen name="RegisterSuccess" component={SuccessRegisterScreen} options={{ headerShown: false }} />

    </LoginStack.Navigator>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
//AdminAttendanceReportScreen : AttendanceReportScreen
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AddBranch" component={AddBranchScreen} options={{ headerShown: true, title: 'Add Office Branch' }} initialParams={{ navigateFrom: 'init' }} />
      <Stack.Screen name="AddUser" component={AddUserScreen} options={{ headerShown: true, title: 'Add User' }} initialParams={{ userId: 0, navigateFrom: 'init' }} />
      <Stack.Screen name="ChangePwd" component={ChangePwdScreen} options={{ headerShown: true, title: 'Change Password' }} initialParams={{ navigateFrom: 'init' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Users" component={UsersScreen} options={{ title: 'Users' }} />
      <Stack.Screen name="Branches" component={BranchesScreen} options={{ title: 'Branches' }} />
      <Stack.Screen name="AdminAttendanceReport" component={AdminAttendanceReportScreen} options={{ title: 'Attendance Report' }} />
      <Stack.Screen name="AttendanceReport" component={AttendanceReportScreen} options={{ title: 'Attendance Report' }} />
      <Stack.Screen name="Leave" component={LeaveScreen} options={{ title: 'Leave' }} />
      <Stack.Screen name="AddLeave" component={AddLeaveScreen} options={{ title: 'Add Leave Request' }} />
      <Stack.Screen name="ViewMeeting" component={ViewMeetingScreen} options={{ title: 'ViewMeeting' }} />
      <Stack.Screen name="Holiday" component={HolidaysScreen} options={{ title: 'Holidays' }} />
      <Stack.Screen name="AddHoliday" component={AddHolidayScreen} options={{ title: 'Add Holiday' }} />
      <Stack.Screen name="LeaveApproval" component={LeaveApprovalScreen} options={{ title: 'Leave Approval' }} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Dashboard' }} />
      <Stack.Screen name="AttendanceCountDetail" component={AttendanceCountDetailScreen} options={{ title: 'Details' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}



/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();
  // const [userRole, setUserRole] = React.useState<string | undefined>('user');
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async function () {

      // const userDetail = await getUserDetail();
      const adminStatus = await isUserAdmin();
      setIsAdmin(adminStatus);
      // console.log(userDetail, "userDetail-navigation");
      // setUserRole(userDetail.userRole);
    }
    )();

  }, [])

  return (
    <BottomTab.Navigator
      initialRouteName={isAdmin ? "TabOne" : "TabHomeCalander"}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>

      {
        isAdmin &&
        <BottomTab.Screen
          name="TabOne"
          component={AdminDashboardScreen}
          options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <DashboardIcon color={color} />,
            headerRight: () => (
              <CommonContextMenu size={30} />
            ),
          })}
        />
      }
      <BottomTab.Screen
        name="TabHomeCalander"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'TabHomeCalander'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          headerRight: () => (
            <CommonContextMenu size={30} />
          ),
        })}
      />


      <BottomTab.Screen
        name="TabTwo"
        component={AttendanceScreen}
        // component={isAdmin ? AdminAttendanceReportScreen : AttendanceReportScreen}
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
          headerRight: () => (
            <CommonContextMenu size={30} />
          )
        }}
      />

      <BottomTab.Screen
        name="TabMeeting"
        component={MeetingScreen}
        options={{
          title: 'Meeting',
          tabBarIcon: ({ color }) => <MeetingIcon color={color} />,
          headerRight: () => (
            <CommonContextMenu size={30} />
          )
        }}
      />

      {/* {
        isAdmin && (
          <>
            <BottomTab.Screen
              name="TabUsers"
              component={UsersScreen}
              options={{
                title: 'Users',
                tabBarIcon: ({ color }) => <UserIcon color={color} />,
                headerRight: () => (
                  <CommonContextMenu />
                )
              }}
            />
            <BottomTab.Screen
              name="TabBranches"
              component={BranchesScreen}
              options={{
                title: 'Branches',
                tabBarIcon: ({ color }) => <LocationIcon color={color} />,
                headerRight: () => (
                  <CommonContextMenu />
                )
              }}
            />

          </>
        )
      } */}

      <BottomTab.Screen
        name="TabExplore"
        component={ExploreScreen}
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <ExploreIcon color={color} />,
          headerRight: () => (
            <CommonContextMenu size={30} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
