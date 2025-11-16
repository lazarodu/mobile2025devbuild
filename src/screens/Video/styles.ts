import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    video: {
        alignSelf: 'center',
        width: 300,
        height: 280,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
