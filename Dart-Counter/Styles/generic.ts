import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGrey,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 60,
        fontWeight: '600',
        marginBottom: 40,
        color: colors.orange,
        marginTop: 100,
    },
    text:{
        fontSize: 20,
        fontWeight: '400',
        color: colors.white,
    },
    button1:{
        backgroundColor: colors.orange,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
    },
    button2:{
        backgroundColor: 'transparent',
        borderColor: colors.white,
        borderWidth: 2,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
        width: '100%',
    },
    buttonText:{
        fontSize: 16,
        color: 'white',
    },
    textInput:{
        backgroundColor: colors.white,
        width: '100%',
        height: 50,
        padding: 10,
        marginVertical: 4,
    },
    line1:{
        width: '100%',
        height: 2,
        backgroundColor: colors.lightGrey,
        marginTop: 20,
        marginBottom: 20,
    },
    line2:{
        width: '100%',
        height: 2,
        backgroundColor: colors.lightGrey,
        marginTop: 8,
        marginBottom: 8,
    },
    settingsRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 4,
        color: colors.white,
    },
    settingsText:{
        fontSize: 16,
        color: colors.white,
    },
})