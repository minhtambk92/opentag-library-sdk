//:include tagsdk-current.js

qubit.opentag.LibraryTag.define("marinsoftware.clicktrackingtag.Tag", {
	config: {
		/*DATA*/
		name: "Click Tracking Tag",
		async: true,
		description: "The Marin Click Tracking Tag helps Marin to capture all sources of website traffic, and set a 1st party cookie enabling it to apply deeper insights to measure their return on investment for media managed in the Marin Enterprise platform. The Marin Click Tracking Tag is to be exposed on all landing pages of the website, ideally by being placed in a global template such as a footer template.",
		html: "",
		imageUrl: ".",
		locationDetail: "",
		priv: false,
		url: "",
		usesDocWrite: false,
		parameters: [
		{
			name: "Anonymize IP",
			description: "Set to \"yes\" and Marin Tracker will anonymize the user's IP address. Otherwise set to \"no\".",
			token: "anonymize_ip",
			uv: ""
		},
		{
			name: "Marin Tracking ID",
			description: "Client Specific Marin Tracking ID",
			token: "marin_tracking_id",
			uv: ""
		}
	]
		/*~DATA*/
	},
	script: function() {
		/*SCRIPT*/


var _mTrack = window._mTrack || [];

var shouldAnonymizeIP = "" + this.valueForToken("anonymize_ip") + "";

if (shouldAnonymizeIP.toLowerCase() === "yes")
{
  _mTrack.push(['activateAnonymizeIp']);
}

_mTrack.push(['trackPage']);

(function() 
{
   var mClientId ="" + this.valueForToken("marin_tracking_id") + "";
   var mProto = ('https:' == document.location.protocol ? 'https://' : 'http://');
   var mHost = 'tracker.marinsm.com';
   var mt = document.createElement('script'); mt.type = 'text/javascript'; 
   mt.async = true; 
   mt.src = mProto + mHost + '/tracker/async/' + mClientId + '.js';
   var fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr);
})();

		/*~SCRIPT*/
	},
	pre: function() {
		/*PRE*/
		/*~PRE*/
	},
	post: function() {
		/*POST*/
		/*~POST*/
	}
});