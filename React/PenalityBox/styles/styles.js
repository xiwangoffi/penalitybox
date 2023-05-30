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

    mazette: {
        backgroundColor: 'red',
    },

    alignItems: {
        alignItems: 'center',
    },

    justifyContent: {
        justifyContent: 'center',
    },

    white: {
        color: 'white',
    },

    verticalBr: {
        marginVertical: '10%',
    },

    br: {
        marginTop: '5%',
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

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

/*

 - CSS Footer.js

 -------------------------------

 - CSS Contributors.js

*/

    roleContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'green',
    },

    jobTitle: {
        marginBottom: '2%',
    },

    svgPos: {
        marginTop: '2.5%',
        marginHorizontal: '3%',
    },

    jobFont: {
        fontSize: 16,
        fontWeight: 'bold',
    },

/*

 - CSS Contributors.js

*/

}

export default styles;