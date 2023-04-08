import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { max } from 'react-native-reanimated';

export const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGrey,
        alignItems: 'center',
        padding: 20,
        color: colors.white,
    },
    container2: {
        flex: 1,
        backgroundColor: colors.orange,
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
    button3:{
        backgroundColor: colors.darkGrey,
        height: 50,
        justifyContent: 'center',
        marginVertical: 3,
        width: '100%',
        padding: 10,
    },
    button3Disabled:{
        backgroundColor: colors.darkGrey,
        height: 50,
        justifyContent: 'center',
        marginVertical: 3,
        width: '100%',
        padding: 10,
        opacity: 0.5,
    },
    button4:{
        backgroundColor: colors.darkGrey,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        width: '120%',
    },
    buttonText:{
        fontSize: 16,
        color: 'white',
    },
    buttonText2:{
        fontSize: 24,
        color: colors.white,
    },
    textInput:{
        backgroundColor: 'transparent',
        color: colors.white,
        width: '100%',
        height: 50,
        padding: 10,
        marginVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
    },
    textInputWrong:{
        backgroundColor: 'transparent',
        color: colors.white,
        width: '100%',
        height: 50,
        padding: 10,
        marginVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: colors.red,
    },
    textInputErrorMessage:{
        textAlign: 'left',
        color: colors.red,
        height: 20,
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
    profileHeader:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: 150,
        padding: 20,
        color: colors.white,
        backgroundColor: colors.darkGrey,
    },
    profileInfoContainer:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '50%',
        height: 150,
        padding: 20,
        color: colors.white,
        backgroundColor: colors.darkGrey,
    },
    profileIcon:{
        width: 100,
        height: 100,
        borderRadius: 999,
        backgroundColor: colors.veryLightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.white,
    },
    profileName:{
        fontSize: 20,
        fontWeight: '600',
        color: colors.white,
    },
    profileText:{
        fontSize: 16,
        fontWeight: '200',
        color: colors.white,
    },
    profileButton:{
        backgroundColor: colors.orange,
        width: '100%',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
    },
    profileButtonText:{
        fontSize: 16,
        color: 'white',
    },
    bigButton:{
        flexDirection: 'row',
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingVertical: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 6,
        marginHorizontal: 6,
    },
    bigButtonTitle:{
        fontSize: 16,
        fontWeight: '400',
        maxWidth: '80%',
        color: colors.lightGrey,
    },
    bigButtonIcon:{
        width: 50,
        height: 50,
    },
    playersContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    player:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerIcon:{
        width: 50,
        height: 50,
        borderRadius: 999,
        backgroundColor: colors.veryLightGrey,
    },
    playerName:{
        fontSize: 16,
        fontWeight: '400',
        color: colors.white,
    },
    gameTitle:{
        fontSize: 20,
        fontWeight: '600',
        color: colors.white,
    },
    gameTitleContainer:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        backgroundColor: colors.darkGrey,
    },
    gameLegsContainer:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        backgroundColor: colors.grey,
    },
    gameLegsText:{
        fontSize: 16,
        fontWeight: '400',
        color: colors.white,
        backgroundColor: colors.blue,
        padding: 4,
        borderRadius: 6,
    },
    gameScoreContainer:{
        width: '100%',
        padding: 4,
        backgroundColor: colors.veryLightGrey,
    },
    gameScoreTitle:{
        fontSize: 56,
        fontWeight: '600',
        textAlign: 'center',
        width: '100%',
    },
    gameScoreText:{
        fontSize: 16,
        fontWeight: '400',
        width: '100%',
        padding: 4,
        borderTopWidth: 1,
        borderTopColor: colors.lightGrey,
    },
    gameButtonsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 2,
        backgroundColor: colors.darkGrey,
    },
    gameBackButton:{
        height: 50,
        width: '20%',
        padding: 12,
        backgroundColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: colors.darkGrey,
    },
    gameBackButtonText:{
        fontSize: 16,
        fontWeight: '400',
        color: colors.white,
    },
    gameScoreInput:{
        height: 50,
        width: '60%',
        padding: 12,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderWidth: 3,
        borderColor: colors.darkGrey,
        fontSize: 24,
    },
    gameScoreInputText:{
        fontSize: 16,
        fontWeight: '400',
        color: colors.black,
    },
    gameNextButton:{
        height: 50,
        width: '20%',
        padding: 12,
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: colors.darkGrey,
    },
    gameNextButtonText:{
        fontSize: 16,
        fontWeight: '400',
        color: colors.white,
    },
    gameNumberInputContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap',
        gap: 0,
    },
    gameNumberInputButton:{
        height: '22%',
        width: '33.333333%',
        padding: 12,
        backgroundColor: colors.grey,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.darkGrey,
    },
    gameNumberInputButtonBlack:{
        height: '22%',
        width: '33.333333%',
        padding: 12,
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.darkGrey,
    },
    gameNumberInputButtonText:{
        fontSize: 20,
        fontWeight: '400',
        color: colors.white,
    },
})