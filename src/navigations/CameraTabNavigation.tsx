import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ScreenImagem, ScreenPhoto, ScreenVideo } from '../screens'
import { colors } from '../styles/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator({
    screens: {
        Camera: ScreenPhoto,
        Video: ScreenVideo,
        Imagem: ScreenImagem
    }
})

export function CameraTabNavigation() {
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
            <Tab.Screen name='Camera' component={ScreenPhoto} 
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="camera" size={24} color={colors.white} />
                    ),
                }}
            />
            <Tab.Screen name='Video' component={ScreenVideo} 
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="video-camera" size={24} color={colors.white} />
                    ),
                }}
            />
            <Tab.Screen name='Imagem' component={ScreenImagem} 
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="picture-o" size={24} color={colors.white} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}