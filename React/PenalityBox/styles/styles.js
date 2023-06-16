const styles = {
/*

 - Global class

*/

    background: {
        flex: 1,
        backgroundColor: '#837A7A',
    },

    boxBackground: {
        backgroundColor: '#898989',
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

    mediumBr: {
        marginTop: '2%',
    },

    littleBr: {
        marginTop: '1%',
    },

    brBottom: {
        marginBottom: '1%',
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    title: {
        fontSize: 24,
    },

    verticalAlign: {
        verticalAlign: 'center',
    },

    flexOne: {
        flex: 1,
    },

    row: {
        flexDirection: 'row',
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

    penalityBoxGIF: {
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

*/

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

 ----------------------

 - CSS Versions.js

*/

    /*

     - Container

    */

    versionContainer: {
        width: '60%',
        height: '85%',
        flexDirection: 'row',
        borderRadius: 7,
        borderColor: '#736C6C',
    },

    versionTextContainer: {
        width: '55%',
        height: '100%',
    },

    versionImageContainer: {
        width: '50%',
        height: '100%',
    },

    versionNumberContainer: {
        width: '100%',
        height: '10%',
        marginLeft: '2%',
        marginRight: '1%',
        flexDirection: 'row',
    },

    versionChangelogContainer: {
        width: '100%',
        height: '45%',
        marginLeft: '2%',
        marginRight: '1%',
    },

    versionDeveloperContainer: {
        width: '100%',
        height: '35%',
        marginLeft: '2%',
        marginRight: '1%',
    },

    versionDateContainer: {
        width: '100%',
        height: '10%',
        marginLeft: '2%',
        marginRight: '1%',
    },

    versionPickerPos: {
        marginLeft: '2%',
    },

    /*

     - Container

     ---------------------

     - Image

    */

     versionLogo: {
        width: '60%',
        height: '60%',
     },

     /*

      - Image

     */

/*

 - CSS Versions.js

 -------------------------

 - CSS Admin.js

*/

    /*

     - Container

    */

     adminPanelContainerPos: {
        marginTop: '2%',
        marginLeft: '2%',
     },

    recentUsersContainer: {
        width: '15%',
        alignSelf: 'flex-start',
    },

    handleAdminContainer: {
        width: '20%',
        alignSelf: 'flex-start',
    },

    insertVersionContainer: {
        width: '50%',
        alignSelf: 'flex-start',
    },

    versionEditorContainer: {
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%',
        flex: 1,
    },

    /*

     - Container

     ----------------

     - Dividers

    */

    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginVertical: 10,
        marginLeft: '5%',
        marginRight: '5%',
    },

    verticalDivider: {
        borderRightWidth: 1,
        borderRightColor: 'black',
    },

    /*

     - Dividers

     -----------------

     - Handling user admin color

    */

    adminToggle: {
        color: 'red'
    },

    adminToggleActive: {
        color: 'lightgreen',
    },

    /*

     - Handling user admin color

     -----------------

     - Sub-View

    */

     /*

     - Container

     */

    versionChangelogEditor: {
        width: '55%',
        height: '20em',
    },

    versionImageImport: {
        width: '10%',
        height: '100%',
    },

    editorSubView: {
        width: '100%',
        height: '90%',
    },

     /*

      - Container

      ---------------

      - Editor Box

     */

      versionChangelogBox: {
        width: '100%',
        height: '50%',
        borderWidth: 1,
        borderColor: 'white'
      },
      versionDevBox: {
        width: '100%',
        height: '50%',
        borderWidth: 1,
        borderColor: 'white'
      },

     /*

      - Editor Box

     */

      
      selectPos:{
        height: '20em',
      },

      versionImagePreview: {
        width: '35%',
      },

    /*

    - Sub-View

    */

    imagePreview: {
        width: '50%',
        height: '50%',
        alignSelf: 'center',
    },

/*

 - CSS Admin.js

*/

}

export default styles;