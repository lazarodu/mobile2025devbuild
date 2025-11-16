import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ScreenLocation, ScreenMapLocation } from '../screens'
import { colors } from '../styles/colors'
import { FontAwesome5 } from '@expo/vector-icons'

const Tab = createBottomTabNavigator({
    screens: {
        Location: ScreenLocation
    }
})

export function LocationTabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: colors.primary,
                tabBarActiveTintColor: colors.white,
                headerShown: false,
                tabBarInactiveBackgroundColor: colors.primary,
                tabBarInactiveTintColor: colors.white,
            }}
        >
            <Tab.Screen name='Location' component={ScreenLocation} 
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name="map-marked-alt" size={24} color={colors.white} />
                    ),
                }}
            />
            {/* <Tab.Screen name='LocationSimple' component={ScreenMapLocation} 
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name="map-marked-alt" size={24} color={colors.white} />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    )
}