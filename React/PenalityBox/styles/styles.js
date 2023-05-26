const styles = {
/*

 - CSS Contact.js

    /*

    - CSS for Phone

     - Background

    */

     background: {
        flex: 1,
        backgroundColor: '#837A7A',
        alignItems: 'center',
        justifyContent: 'center'
    },

    /*

     - Background

     ----------------

     - Phone Container

    */
    
     phoneInformationContainer: {
        borderWidth: 1,
        marginTop: '5%',
        borderRadius: 7,
        borderColor: 'white',
        color: 'white',
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

     ------------------

     - Text 

    */

    textAlign: {
        textAlign: 'center',
    },

    /*

     - Text

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

    boxShadow: {
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: {width: -2, height: 2},
        shadowOpacity: 0.7,
    },

    informationContainer: {
        borderWidth: 1,
        marginTop: '2%',
        borderRadius: 7,
        borderColor: 'white',
        color: 'white',
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

 - CSS Contact.js

 -------------------

 - CSS Footer.js

*/

    footer: {
        width: '40%',
        height: '10%',
        backgroundColor: '#837A7A',
        position: 'fixed',
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
    footerText: {
        color: 'white',
    },
}

export default styles;