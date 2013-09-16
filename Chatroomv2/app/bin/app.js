sumeru.config({httpServerPort:8080,sumeruPath:"/../sumeru"}),sumeru.router.add({pattern:"/login",action:"App.login"}),sumeru.router.setDefault("App.login"),App.login=sumeru.controller.create(function(e,t){e.onload=function(){return[function(){}]},e.onrender=function(e){e("loading",["push","left"])},e.onready=function(){var e="click";t.event("login_page",function(){document.getElementById("loginBaidu").addEventListener(e,n),document.getElementById("loginVisitor").addEventListener(e,a)})};var n=function(){window.localStorage&&window.localStorage.setItem("tag","baiduer"),window.location.href="http://openapi.baidu.com/oauth/2.0/authorize?response_type=token&client_id= &redirect_uri= &scope=basic&display=mobile"},a=function(){var t=new Date;window.localStorage&&(window.localStorage.setItem("tag","visitor"),window.localStorage.setItem("currentUserName",t.getTime())),e.redirect("/chatchannel")}}),sumeru.router.add({pattern:"/chatroom",action:"App.chatroom",server_render:!1}),App.chatroom=sumeru.controller.create(function(e,t){var n=function(){window.localStorage&&("baiduer"==window.localStorage.getItem("tag")?baidu.require("connect",function(n){n.init("ajD7G3MvCAff4hHSd6B7VM6U",{status:!0}),access_token=window.localStorage.getItem("access_token"),n.getLoginStatus(function(a){n.api({url:"passport/users/getLoggedInUser",onsuccess:function(n){user_name=n.uname,user_id=n.uid,window.localStorage&&(window.localStorage.setItem("currentUserName",user_name),window.localStorage.setItem("currentUserId",user_id),channelname=window.localStorage.getItem("currentChannelName")),t.chatMessages=e.subscribe("pub-chatRoom",channelname,function(e){t.bind("chatroom_container",{data:e.find()})})},onnotlogin:function(){window.location.href="http://openapi.baidu.com/oauth/2.0/authorize?response_type=token&client_id= &redirect_uri= &scope=basic&display=mobile"},params:{access_token:access_token}})})}):(window.localStorage&&(channelname=window.localStorage.getItem("currentChannelName")),t.chatMessages=e.subscribe("pub-chatRoom",channelname,function(e){t.bind("chatroom_container",{data:e.find()})})))};e.onload=function(){return[n]},e.onrender=function(e){e("chatRoom",["push","left"])},e.onready=function(){var e="click",n={enter:13};t.event("chatroom_container",function(){document.getElementById("roomBackTochannel").addEventListener(e,r),document.getElementById("logout").addEventListener(e,c),document.getElementById("messages").style.height=document.body.clientHeight-80+"px",document.getElementById("messages").scrollTop=document.getElementById("messages").scrollHeight}),window.onresize=function(){document.getElementById("messages").style.height=document.body.clientHeight-80+"px",document.getElementById("messages").scrollTop=document.getElementById("messages").scrollHeight},t.eventMap("#inputMessage",{keydown:function(e){e.keyCode==n.enter&&a()},focus:function(e){},blur:function(e){""==this.value.trim()}}),document.getElementById("send").addEventListener(e,a)};var a=function(){var e=document.getElementById("inputMessage"),n=e.value.trim();return""==n?!1:(window.localStorage&&(username=window.localStorage.getItem("currentUserName"),tag=window.localStorage.getItem("tag"),channelname=window.localStorage.getItem("currentChannelName")),t.chatMessages.add({username:username,content:n,time:(new Date).valueOf(),tag:tag,channelname:channelname}),t.chatMessages.save(),e.value="",e.focus(),void 0)},o=function(){t.chatMessages.destroy(),t.chatMessages.save()},r=function(){e.redirect("/chatchannel",{},!0)},c=function(){window.localStorage&&("baiduer"==window.localStorage.getItem("tag")?baidu.require("connect",function(t){t.init("ajD7G3MvCAff4hHSd6B7VM6U",{status:!0}),t.getLoginStatus(function(n){t.logout(function(t){window.localStorage&&(window.localStorage.removeItem("currentUserName"),window.localStorage.removeItem("currentUserId")),e.redirect("/login")})})}):(window.localStorage&&(window.localStorage.removeItem("currentUserName"),window.localStorage.removeItem("currentUserId")),e.redirect("/login")))}}),sumeru.router.add({pattern:"/chatchannel",action:"App.chatchannel",server_render:!1}),App.chatchannel=sumeru.controller.create(function(e,t){var n=function(){t.messages=e.subscribe("pub-chatchannel",function(e){t.bind("chatChannel",{data:e.find()})})};e.onload=function(){return[n]},e.onrender=function(e){e("chatchannel",["push","left"])},e.onready=function(){var n="click";t.event("chatChannel",function(){document.getElementById("channel").addEventListener(n,function(t){var t=t||window.event,n=t.target||t.srcElement;if("button"==n.tagName.toLowerCase()&&n.hasAttribute("channelName")){var a=n.getAttribute("channelName");window.localStorage&&window.localStorage.setItem("currentChannelName",a),e.redirect("/chatroom",{channel:a},!0)}}),document.getElementById("back").addEventListener(n,a),document.getElementById("create").addEventListener(n,o)})};var a=function(){e.redirect("/login")},o=function(){e.redirect("/createchannel")},r=function(){t.messages.destroy(),t.messages.save()}}),sumeru.router.add({pattern:"/createchannel",action:"App.createchannel"}),App.createchannel=sumeru.controller.create(function(e,t){var n=function(){t.messages=e.subscribe("pub-chatchannel",function(e){e.addSorters("time","DESC"),t.bind("craeteChannel",{data:e.find()})})};e.onload=function(){return[n]},e.onrender=function(e){e("createchannel",["push","left"])},e.onready=function(){document.getElementById("messages").style.height=document.body.clientHeight-40+"px";var e="click",n={enter:13};t.event("craeteChannel",function(){t.eventMap("#inputChannelName",{keydown:function(e){e.keyCode==n.enter&&o()},focus:function(e){t.messages.hold()},blur:function(e){""==this.value.trim()&&t.messages.releaseHold()}}),document.getElementById("backTochannel").addEventListener(e,a),document.getElementById("ok").addEventListener(e,o)})};var a=function(){e.redirect("/chatchannel")},o=function(){var n=document.getElementById("inputChannelName"),a=n.value.trim();return""==a?!1:(t.messages.add({channelname:a,time:(new Date).valueOf(),describe:""}),t.messages.save(),n.value="",t.messages.releaseHold(),e.redirect("/chatchannel"),void 0)}}),sumeru.router.add({pattern:"/itworks",action:"App.itworks"}),App.itworks=sumeru.controller.create(function(e,t){e.onrender=function(e){e("itworks",["push","left"])}}),Model.chatRoomModel=function(e){e.config={fields:[{name:"username",type:"string"},{name:"content",type:"text"},{name:"time",type:"datatime",defaultValue:"now()"},{name:"tag",type:"string"},{name:"channelname",type:"string"}]}},Model.chatChannelModel=function(e){e.config={fields:[{name:"channelname",type:"string"},{name:"time",type:"datatime",defaultValue:"now()"},{name:"describe",type:"string",defaultValue:""}]}},Library.getChatTime=sumeru.Library.create(function(e){return e.getTime=function(e){var t=new Date(e),n=new Date;return getMinutes=t.getMinutes(),0===getMinutes?getMinutes+="0":getMinutes>0&&10>getMinutes&&(getMinutes="0"+getMinutes),t.getYear()==n.getYear()&&t.getMonth()==n.getMonth()&&t.getDate()==n.getDate()?t.getHours()+":"+getMinutes:t.getMonth()+1+"-"+t.getDate()+"  "+t.getHours()+":"+getMinutes},e}),Library.getUsername=sumeru.Library.create(function(e){return e.getUsername=function(){return window.localStorage.getItem("currentUserName")?window.localStorage.getItem("currentUserName"):void 0},e});