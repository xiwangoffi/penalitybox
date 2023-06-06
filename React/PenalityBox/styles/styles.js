const styles = {
/*

 - Global class

*/

    background: {
        flex: 1,
        backgroundColor: '#837A7A',
    },

    boxShadow: {
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: {width: -2, height: 2},
        shadowOpacity: 0.7,
    },

    formBoxShadow: {
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
    },

    textAlign: {
        textAlign: 'center',
    },

    alignItems: {
        alignItems: 'center',
    },

    justifyContent: {
        justifyContent: 'center',
    },

    underline: {
       textDecoration: 'underline',
    },

    verticalBr: {
        marginVertical: '10%',
    },

    textShadow: {
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },

    bold: {
        fontWeight: 'bold',
    },

    br: {
        marginTop: '3%',
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    /*

     - Colors

    */

     white: {
        color: 'white',
    },

    blue: {
        color: 'blue',
    },

    green: {
        color: 'lightgreen',
    },

    red: {
        color: 'red',
    },

    /*

     - Colors

    */

/*

 - Global class

 --------------------------------


 - CSS Home.js

*/

    /*

     - Container

    */

    presentationContainer: {
        borderWidth: 1,
        backgroundColor: '#736C6C',
        borderRadius: 7,
        borderColor: '#736C6C',
        width: '60%',
        height: '70%',
        flexDirection: 'row',
    },

    contentContainer: {
        width: '68%',
        height: '100%',
        marginRight: '1%',
        marginLeft: '1%',
    },

    imageContainer: {
        verticalAlign: 'center',
        width: '30%',
        height: '100%',
        borderLeftWidth: 2,
        borderLeftColor: 'black',
    },

    gifContainer: {
        width: '100%',
        height: '81%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    /*

     - Container

     --------------------

     - Image

    */

    penalityLogo: {
        position: 'static',
        width: '487',
        height: '528',
    },

    ownerNamesImage: {
        height: '70%',
        width: '70%',
    },

    /*

     - Image

     ---------------

     - Text

    */

     contentTitleText: {
        fontSize: 32,
        fontWeight: 'bold',
        textDecoration: 'underline',
     },

     contentText: {
        marginTop: 16,
        fontSize: 16,
        textAlign: 'justify',
     },

     /*

     - Text

     */

/*

 - CSS Home.js

 ------------------------

 - CSS Contact.js

    /*

    - CSS for Phone


     - Phone Container

    */
    
     phoneInformationContainer: {
        borderWidth: 1,
        marginTop: '5%',
        borderRadius: 7,
        borderColor: 'white',
    },
    phoneInformationBox: {
        width: 250,
        height: 40,
    },
    phoneMessageBox: {
        flex: 0.3,
        width: 250,
        verticalAlign: 'top',
        padding: 10,
    },

    /*

     - Phone Container

     --------------

     - Button

    */

    phoneValidateButton: {
        width: 150,
        marginTop: '3%',
    },

    /*

     - Button

    ----------------------

    - CSS for Computer

     - PC Container

    */

    informationContainer: {
        borderBottomWidth: 1,
        borderRadius: 2,
        marginLeft: '2%',
        borderColor: 'white',
    },
    informationBox: {
        width: 350,
        height: 40,
    },
    messageBox: {
        flex: 0.3,
        width: 450,
        verticalAlign: 'top',
        padding: 10,
    },

    validateButton: {
        marginTop: '1.5%',
        width: 250,
    },

    /*

     - PC Container

    */

/*

 - CSS Contact.js

 -------------------

 - CSS Footer.js

*/

    footer: {
        width: '40%',
        height: '10%',
        backgroundColor: '#837A7A',
        position: 'absolute',
        bottom: 0,
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 5,
        borderColor: 'black',
        borderRadius: 3,
    },
    logo: {
        width: 190,
        height: 53,
        marginHorizontal: 150,
    },

/*

 - CSS Footer.js

 -------------------------------

 - CSS Phone/CreditsList.js

*/

    /*

     - Credits Container

    */

    phoneRoleContainer: {
        flexDirection: 'column',
        backgroundColor: 'green',
        width: '100%',
        height: '100%',
        marginBottom: '2%',
    },

    mainJobContainer: {
        width: '38%',
        height: '65%',
        flexDirection: 'row',
    },

    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    centeredTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },


    jobTextContainer: {
        flex: 1,
        marginTop: '2.5%',
    },
    
    jobIconsContainer: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    jobTitleContainer: {
        width: '80%',
        height: '100%',
        justifyContent: 'space-between',
    },

    /*

     - Credits Container

     ----------------------

     - Icons pos

    */

    jobFirstIcon: {
        marginTop: '10%',
    },

    jobLastIcon: {
        marginBottom: '17%',
    },

    jobTitle: {
        marginBottom: '2%',
    },

    /*

     - Icons pos

     ------------------------

     - Image

    */

    phoneCreditsImage: {
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    jobIconsSize: {
        width: 52,
        height: 52,
    },

    phoneJobIconsSize: {
        width: 42,
        height: 42,
    },

    /*

     - Image

     ---------------------

     - Font

    */

    jobFont: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    /*

     - Font

    */

/*

 - CSS Phone/CreditsList.js

 ---------------------

 - CSS Login.js

*/

    loginOptionContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: '2%',
    },

/*

 - CSS Login.js

*/

}

export default styles;