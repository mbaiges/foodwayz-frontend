import React, { Component, useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Modal,
  ScrollView
} from "react-native";

import { Input } from "react-native-elements";
import CheckBox from "@react-native-community/checkbox";
import { User, AuthApi } from '../../api';
import { UserContext } from '../../context/UserContext';

import { validateSignupFields } from '../../utils';
import { StackActions } from '@react-navigation/native';

class RegisterScreenComponent extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      checked: false,
      emailVerificationModal:false,
      verificationCodeValue: "",
      showWrongVerificationMessage: false,
      wrongVerificationMessage:"",

      termAndCondsModal: false,
    };
  }

  signUp = async function({ state, setAuthState, navigation }) {

    const inputs = {
      username: this.state.username,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,
      checked: this.state.checked
    };

    if (!validateSignupFields(inputs)) {
      // El Mensajito de error lo manda validateSignupFields
      console.log("Something went wrong.");
    }else{
      const user = new User({
        a_name: state.username,
        a_email: state.email,
        a_password: state.password1
      });

      try {
        const ans = await AuthApi.signUp(user);
        if(ans){
          console.log(ans);
          console.log("User successfully registered");
          this.setState({emailVerificationModal: true});
          const auth = {
            state: 'SIGNED_UP',
            token: ''
          };
          await setAuthState(auth);
          //navigation.navigate("Login")
        }
      } catch (err) {
        console.log(err);
      }

    }
  }

  async resendEmail(email){

    await AuthApi.resendEmail(email);
  }

  async verificateAccount(){
    const resp = await AuthApi.verifyEmail(this.state.email,this.state.verificationCodeValue);
    const isVerified = resp.response.result;
    const codeType = resp.response.code;
    if(isVerified){
      this.setState({emailVerificationModal: false});
      const pushAction = StackActions.push("Login");
      this.props.navigation.dispatch(pushAction);
      //this.props.navigation.navigate("EmailVerified", {isVerified});
    }else if(codeType === "expired-code"){
      this.setState({wrongVerificationMessage: "The code expired"});
      this.showWrongVerificationMessage();
    }else if(codeType === "invalid-code"){
      this.setState({wrongVerificationMessage: "Invalid code"});
      this.showWrongVerificationMessage();
    }
  }

  showWrongVerificationMessage(){
    this.setState({showWrongVerificationMessage: true})
  }

  render() {
    const { navigation, context } = this.props;
    const { authState, setAuthState } = context;

    return (
      <SafeAreaView style={styles.backgroundContainer}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Image
                style={styles.logoImage}
                source={require("../../assets/images/logo.png")}
              />

              <Text style={styles.logoText}>FoodWayz</Text>

{/* ---------------------------------------MODAL-----------------------------------------------------------------------*/}

              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.emailVerificationModal}
                  onRequestClose={() => {
                    this.setState({emailVerificationModal: false});
                  }}
                >

                  <View style = {styles.centeredView}>
                    <View style = {styles.modalView}>
                      <Text style={styles.modalText}>Verification mail sent to:</Text>
                      <Text style={styles.modalText}>{this.state.email}</Text>
                      <Text style={styles.modalText}>Please check your mailbox.</Text>


                      <Input
                          placeholder={"Insert Verification Code"}
                          onChangeText={(value) => ( this.setState({ verificationCodeValue:value }))}
                      />
                      {this.state.showWrongVerificationMessage &&
                        <View>
                          <Text style={styles.errorText}>{this.state.wrongVerificationMessage}</Text>
                        </View>
                      }
                      <View flexDirection = 'row'>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                              style={styles.cancelButton}
                              onPress={async () => {
                                this.setState({emailVerificationModal: false});
                                const pushAction = StackActions.push("Login");
                                navigation.dispatch(pushAction);
                                //navigation.navigate("Login");
                              }}
                          >
                              <Text style={styles.blackButtonText}>Return to LogIn</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                              style={styles.cancelButton}
                              onPress={async () => {
                                this.resendEmail(this.state.email);
                              }}
                          >
                              <Text style={styles.blackButtonText}>Resend Email</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                              style={styles.deleteButton}
                              onPress={() => {
                                this.verificateAccount();
                              }}
                          >
                              <Text style={styles.buttonText}>Verify</Text>
                          </TouchableOpacity>
                        </View>

                      </View>

                    </View>
                  </View>

                </Modal>
              </View>


              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.termAndCondsModal}
                  onRequestClose={() => {
                    this.setState({termAndCondsModal: false});
                  }}
                >

                  <View style = {styles.centeredView}>
                    <View style = {styles.modalViewTermsConds}>
                      <Text style={styles.modalText}>Terms and Conditions:</Text>
                      
                      <ScrollView style={styles.scrollViewTermsConds}>
                        <Text>Welcome to FoodWayz{"\n"}
	These terms and conditions outline the rules and regulations for the use of FoodWayz's Website.  
	 FoodWayz is located at: {"\n"}
	CABA - Buenos Aires , Argentina
	{"\n"}
	By accessing this website we assume you accept these terms and conditions in full. Do not continue to use FoodWayz's website 
	if you do not accept all of the terms and conditions stated on this page.{"\n"}
	The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice
	and any or all Agreements: "Client", "You" and "Your" refers to you, the person accessing this website
	and accepting the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers
	to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the Client
	or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake
	the process of our assistance to the Client in the most appropriate manner, whether by formal meetings
	of a fixed duration, or any other means, for the express purpose of meeting the Client's needs in respect
	of provision of the Company's stated services/products, in accordance with and subject to, prevailing law
	of Argentina. Any use of the above terminology or other words in the singular, plural,
	capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.Cookies
	We employ the use of cookies. By using FoodWayz's website you consent to the use of cookies 
	in accordance with FoodWayz's privacy policy.Most of the modern day interactive web sites
	use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site
	to enable the functionality of this area and ease of use for those people visiting. Some of our 
	affiliate / advertising partners may also use cookies.License
	Unless otherwise stated, FoodWayz and/or it's licensors own the intellectual property rights for
	all material on FoodWayz. All intellectual property rights are reserved. You may view and/or print
	pages from http://foodwayz.notExistentPage.xyz for your own personal use subject to restrictions set in these terms and conditions.
	You must not:{"\n"}
	
		Republish material from http://foodwayz.notExistentPage.xyz
		Sell, rent or sub-license material from http://foodwayz.notExistentPage.xyz
		Reproduce, duplicate or copy material from http://foodwayz.notExistentPage.xyz
    {"\n"}
	Redistribute content from FoodWayz (unless content is specifically made for redistribution).
User Comments
{"\n"}
		This Agreement shall begin on the date hereof.{"\n"}
		Certain parts of this website offer the opportunity for users to post and exchange opinions, information,
		material and data ('Comments') in areas of the website. FoodWayz does not screen, edit, publish
		or review Comments prior to their appearance on the website and Comments do not reflect the views or
		opinions ofFoodWayz, its agents or affiliates. Comments reflect the view and opinion of the
		person who posts such view or opinion. To the extent permitted by applicable laws FoodWayzshall
		not be responsible or liable for the Comments or for any loss cost, liability, damages or expenses caused
		and or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this
		website.{"\n"}
		FoodWayzreserves the right to monitor all Comments and to remove any Comments which it considers
		in its absolute discretion to be inappropriate, offensive or otherwise in breach of these Terms and Conditions.
		You warrant and represent that:{"\n"}
			
				You are entitled to post the Comments on our website and have all necessary licenses and consents to
						do so;{"\n"}
				The Comments do not infringe any intellectual property right, including without limitation copyright,
					patent or trademark, or other proprietary right of any third party;{"\n"}
				The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material
					or material which is an invasion of privacy{"\n"}
				The Comments will not be used to solicit or promote business or custom or present commercial activities
					or unlawful activity.{"\n"}
				
          {"\n"}
		You hereby grant to FoodWayz a non-exclusive royalty-free license to use, reproduce,
		edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats
		or media.{"\n"}
	
Hyperlinking to our Content{"\n"}
{"\n"}
		The following organizations may link to our Web site without prior written approval:
    {"\n"}
			Government agencies;{"\n"}
			Search engines;{"\n"}
			News organizations;{"\n"}
			Online directory distributors when they list us in the directory may link to our Web site in the same
				manner as they hyperlink to the Web sites of other listed businesses; and
			Systemwide Accredited Businesses except soliciting non-profit organizations, charity shopping malls,
				and charity fundraising groups which may not hyperlink to our Web site.
			
        {"\n"}
	
	
		These organizations may link to our home page, to publications or to other Web site information so long
			as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or
			approval of the linking party and its products or services; and (c) fits within the context of the linking
			party's site.{"\n"}
      {"\n"}
		We may consider and approve in our sole discretion other link requests from the following types of organizations:
    {"\n"}
				commonly-known consumer and/or business information sources such as Chambers of Commerce, American
					Automobile Association, AARP and Consumers Union;{"\n"}
				dot.com community sites;{"\n"}
				associations or other groups representing charities, including charity giving sites,
				online directory distributors;{"\n"}
				internet portals;{"\n"}
				accounting, law and consulting firms whose primary clients are businesses; and
				educational institutions and trade associations.
			
        {"\n"}
	
	We will approve link requests from these organizations if we determine that: (a) the link would not reflect
	unfavorably on us or our accredited businesses (for example, trade associations or other organizations
	representing inherently suspect types of business, such as work-at-home opportunities, shall not be allowed
	to link); (b)the organization does not have an unsatisfactory record with us; (c) the benefit to us from
	the visibility associated with the hyperlink outweighs the absence of FoodWayz; and (d) where the
	link is in the context of general resource information or is otherwise consistent with editorial content
	in a newsletter or similar product furthering the mission of the organization.
  {"\n"}
	These organizations may link to our home page, to publications or to other Web site information so long as
	the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval
	of the linking party and it products or services; and (c) fits within the context of the linking party's
	site.
  {"\n"}
	If you are among the organizations listed in paragraph 2 above and are interested in linking to our website,
	you must notify us by sending an e-mail to dychromatic.foodwayz@gmail.com.
	Please include your name, your organization name, contact information (such as a phone number and/or e-mail
	address) as well as the URL of your site, a list of any URLs from which you intend to link to our Web site,
	and a list of the URL(s) on our site to which you would like to link. Allow 2-3 weeks for a response.
  {"\n"}
	Approved organizations may hyperlink to our Web site as follows:{"\n"}

	
		By use of our corporate name; or{"\n"}
		By use of the uniform resource locator (Web address) being linked to; or
		By use of any other description of our Web site or material being linked to that makes sense within the
			context and format of content on the linking party's site.
      {"\n"}
	No use of FoodWayz's logo or other artwork will be allowed for linking absent a trademark license
	agreement.{"\n"}
Reservation of Rights{"\n"}
	We reserve the right at any time and in its sole discretion to request that you remove all links or any particular
	link to our Web site. You agree to immediately remove all links to our Web site upon such request. We also
	reserve the right to amend these terms and conditions and its linking policy at any time. By continuing
	to link to our Web site, you agree to be bound to and abide by these linking terms and conditions.
Removal of links from our website{"\n"}
	If you find any link on our Web site or any linked web site objectionable for any reason, you may contact
	us about this. We will consider requests to remove links but will have no obligation to do so or to respond
	directly to you.{"\n"}
	Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its completeness
	or accuracy; nor do we commit to ensuring that the website remains available or that the material on the
	website is kept up to date.
Content Liability{"\n"}
	We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify
	and defend us against all claims arising out of or based upon your Website. No link(s) may appear on any
	page on your Web site or within any context containing content or materials that may be interpreted as
	libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or
	other violation of, any third party rights.
Disclaimer{"\n"}
	To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill). Nothing in this disclaimer will:
	{"\n"}
	limit or exclude our or your liability for death or personal injury resulting from negligence;
	limit or exclude our or your liability for fraud or fraudulent misrepresentation;
	limit any of our or your liabilities in any way that is not permitted under applicable law; or
	exclude any of our or your liabilities that may not be excluded under applicable law.
	{"\n"}
	The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer: (a)
	are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer or
	in relation to the subject matter of this disclaimer, including liabilities arising in contract, in tort
	(including negligence) and for breach of statutory duty.{"\n"}
	To the extent that the website and the information and services on the website are provided free of charge,
	we will not be liable for any loss or damage of any nature.
  {"\n"}
	
Credit and Contact Information{"\n"}
	This Terms and conditions page was created at termsandconditionstemplate.com generator. If you have
	any queries regarding any of our terms, please contact us.</Text>
                      </ScrollView>  
                      
                      <View flexDirection = 'row'>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                              style={styles.cancelButton}
                              onPress={async () => {
                                this.setState({termAndCondsModal: false});
                                
                                //navigation.navigate("Login");
                              }}
                          >
                              <Text style={styles.blackButtonText}>Close</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                    </View>
                  </View>

                </Modal>
              </View>

{/* --------------------------------------------------------------------------------------------------------------------*/}


              <View style={styles.inputBoxes}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Username"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.username = value)}
                  />
                  <Text style={styles.inputTitle}> Username </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder={"E-mail"}
                    placeholderTextColor={"rgba(0,0,0,0.4)"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.email = value)}
                  />
                  <Text style={styles.inputTitle}> E-Mail </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder={"Password"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.password1 = value)}
                  />
                  <Text style={styles.inputTitle}> Password </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder={"Repeat password"}
                    underLineColorAndroid="transparent"
                    onChangeText={(value) => (this.state.password2 = value)}
                  />
                  <Text style={styles.inputTitle}> Repeat password </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        
          <View style = {styles.buttonsContainer} >
            <View style={styles.checkboxLine}>
            <CheckBox
                value={this.state.checked}
                tintColors={{ true: "white", false: "black" }}
                onValueChange={() =>
                  this.setState({ checked: !this.state.checked })
                }
              />
              <View style={styles.checkboxText}>
                <Text>I have read and accepted </Text>
                <Text
                  style={styles.termAndConds}
                  onPress={() => {
                    this.setState({termAndCondsModal: true})
                    console.log("Clicked on terms and conditions");
                  }}
                >
                  terms and conditions.
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  console.log("I want to navigate to Main");
                  this.signUp({state: this.state, navigation, setAuthState});
                }}
              >
                <Text>REGISTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default RegisterScreen = (props) => {
  const { authState, setAuthState } = useContext(UserContext);
  return <RegisterScreenComponent {...props} context={{authState, setAuthState}} />;
};

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#FC987E",
    paddingBottom: 0,
    paddingTop: 20,
  },

  inner: {
    position: "relative",
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  logoImage: {
    position: "relative",
    width: 84,
    height: 84,
  },

  logoText: {
    position: "relative",
    color: "white",
    fontSize: 50,
    paddingTop: 25,
    paddingBottom: 50,
    fontWeight: "500",
    opacity: 1,
  },

  inputView: {
    position: "relative",
    padding: 0,
  },

  inputBoxes: {
    top: -60,
  },

  input: {
    elevation: 10,
    position: "relative",
    width: WIDTH - 100,
    height: 60,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingTop: 25,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "white",
    color: "#000000",
    marginHorizontal: 25,
  },

  inputTitle: {
    elevation: 10,
    top: -50,
    position: "relative",
    color: "#FC987E",
    paddingLeft: 38,
    paddingTop: 0,
    fontSize: 11,
    fontWeight: "500",
    opacity: 1,
  },
  text: {
    fontSize: 10,
    paddingLeft: 20,
    color: "white",
    marginHorizontal: 25,
  },

  button: {
    elevation: 10,
    borderRadius: 25,
    backgroundColor: "white",
    color: "black",
    width: 217,
    alignItems: "center",
    padding: 13,
    height: 48,
  },

  checkboxLine: {
    flexDirection: "row",
    marginBottom: 10,
  },

  checkboxText: {
    top: 5,
    flexDirection: "row",
  },

  termAndConds: {
    textDecorationLine: "underline",
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    marginTop: 22
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 300,
  },

  modalViewTermsConds: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 500,
  },


  buttonContainer:{
    alignItems:"center",
    paddingTop: 20,
    paddingBottom: 22,
    paddingLeft: 8,
  },

  cancelButton: {
    elevation: 10,
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
    width: 100,
    alignItems: "center",
    padding: 8,
    borderColor: 'black',
    borderWidth:0.5,
    height: 48,
  },


  deleteButton: {
    elevation: 10,
    borderRadius: 5,
    backgroundColor: "#FC987E",
    color: "white",
    width: 100,
    alignItems: "center",
    padding: 13,
    height: 48,
    paddingLeft: 0,
  },

  buttonText:{
    color: "white",

  },

  blackButtonText:{
    color: "black",

  },

  verificationInputTitle:{
    fontSize: 25,
    paddingBottom: 10,
  },

  modalText:{
    fontSize: 20,
    paddingBottom: 10,
  },

  errorText:{
    bottom: 15,
    paddingLeft: 25,
    color: 'red'
  },

  scrollViewTermsConds:{
    height: 400,
  },

  buttonsContainer:{
    alignItems: "center",
    top: -60,
  },

});
