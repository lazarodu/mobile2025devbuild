import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: colors.white,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    name: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.black,
    },
    section: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: colors.primary,
    },
    loanItem: {
        backgroundColor: colors.third,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loanText: {
        fontSize: 16,
        fontWeight: '500',
        maxWidth: '60%',
    },
    emptyText: {
        textAlign: 'center',
        color: colors.black,
        marginTop: 20,
    },
    sociais: {
        backgroundColor: colors.secondary,
        marginBottom: 20,
        flexDirection: "row",
        padding: 10,
        borderRadius: 12
    },
    sociaisText: {
        marginLeft: 5
    }
})