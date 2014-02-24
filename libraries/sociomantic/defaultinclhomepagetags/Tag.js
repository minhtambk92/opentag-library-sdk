//:include tagsdk-0.0.1.js

qubit.qtag.LibraryTag.define("sociomantic.defaultinclhomepagetags.Tag", {
    config: {/*DATA*/
	id: 38169,
	name: "Default (incl homepage tags)",
	async: true,
	description: "Homepage tracking code as Default for all pages that can't be assigned to a specific page type. Now includes optional user ID support. MUST be set as dependent on CryptoJS SHA1 (Web Utilities in the tag library)",
	html: "",
	imageUrl: "https://s3-eu-west-1.amazonaws.com/opentag-images/sociomantic.jpg",
	locationDetail: "",
	priv: false,
	url: "eu-sonar.sociomantic.com/js/2010-07-01/adpan/${advertiserid}",
	usesDocWrite: false,
	parameters: [
	{
		id: 37194,
		name: "Advertiser ID",
		description: "An identifier for the client",
		token: "advertiserid",
		uv: ""
	},
	{
		id: 37195,
		name: "User ID",
		description: "User's identifier - return false to safely exclude it",
		token: "user_id",
		uv: "universal_variable.user.user_id"
	},
	{
		id: 37203,
		name: "User Email",
		description: "User's email - return false to safely exclude it - will be hashed before sending (no PII is sent)",
		token: "user_email",
		uv: "universal_variable.user.email"
	}
	]
    },/*~DATA*/
    script: function () {/*SCRIPT*/
    },/*~SCRIPT*/
    pre: function () {/*PRE*/
window.customer = window.customer || {};

//Allows for custom scripts altering the customer object. Skipped over if user_id or user_email is false-like
var email = '' + this.getValueForToken("user_email") + '';
if (email && email.toLowerCase() !== "false"){
  email = email;
  email = CryptoJS.SHA1(email).toString();
  var date = new Date();
  date.setTime(date.getTime()+(90*24*60*60*1000));
  var expires = "; expires="+date.toGMTString();
  document.cookie = "qb_sm_mhash=" + email + expires + ";";
  window.customer.mhash = email;
}else{
  var parts = document.cookie.split("qb_sm_mhash=");
  if (parts.length == 2) window.customer.mhash = parts.pop().split(";").shift();
}

var user_id = '' + this.getValueForToken("user_id") + '';
if (user_id && user_id.toLowerCase() !== "false"){
  user_id = user_id;
  var date = new Date();
  date.setTime(date.getTime()+(90*24*60*60*1000));
  var expires = "; expires="+date.toGMTString();
  document.cookie = "qb_sm_uid=" + email + expires + ";";
  window.customer.identifier = user_id;
}else{
  var parts = document.cookie.split("qb_sm_uid=");
  if (parts.length == 2) window.customer.identifier = parts.pop().split(";").shift();
}
    },/*~PRE*/
    post: function () {/*POST*/
    }/*~POST*/
});
