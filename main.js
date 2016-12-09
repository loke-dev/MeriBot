"use strict";

/*
// var ImageVault = require("./imagevault.client"),
// url=require("url"),
// env = process.env
// proxy = {
// 	protocol:"http:",
// 	hostname:"127.0.0.1",
// 	port:"8889"
// },
// proxyRequests = function(){
// 	var proxyUrl = url.format(proxy);
// 	env.http_proxy = proxyUrl;
// 	env.https_proxy = proxyUrl;
// 	env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
// },
//  unproxyRequests = function () {
//         env.http_proxy = "";
//         env.https_proxy = "";
//         env.NODE_TLS_REJECT_UNAUTHORIZED = "";
// };
// //proxyRequests();
*/




const ImageVault = require("./imagevault.client")
const url = require('url')
const env = process.env

var core = new ImageVault.Client({
	core: "http://iv5qa.azurewebsites.net/apiv2",
	username: "hackathon",
	password: "ImageVault2016"
});


core.json("MediaService/Find", {
  MediaUrlBase: "http://iv5qa.azurewebsites.net/",
  Populate: {
	PublishIdentifier: "hackathon",
	MediaFormats: [{
		$type : "ImageVault.Common.Data.ThumbnailFormat,ImageVault.Common",
		Effects : [{
			$type : "ImageVault.Common.Data.Effects.ResizeEffect,ImageVault.Common",
			"Width" : 200,
			"Height" : 200,
			"ResizeMode" : "ScaleToFill"
		  }],
	  }
	],
	Metadata: [{
		Filter: {
			MetadataDefinitionType : "User"
		}
	}]
},
  "Filter" : {
	"SearchString" : "alche"
  }
}, function (d) {
	console.log(d);
	if (d == null || d.length == null) {
	  console.log("Nothing found!");
	} else {
	  console.log("Found " + d.length + " hits.");
	}

	for (var i = 0; i < d.length; i++) {
		var item = d[i];
		console.log("item :"+i+item);
		var thumbnail = item.MediaConversions[0];
		console.log("<div style='float:left;text-align:center;'><img src='" + thumbnail.Url + "'/><br/>"+item.Name+"</div>");
	}

})
