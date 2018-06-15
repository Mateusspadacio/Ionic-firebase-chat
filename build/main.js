webpackJsonp([6],{102:function(n,t,e){"use strict";e.d(t,"a",function(){return o});var a=e(2),r=e(0),u=e(130),l=(e.n(u),e(122)),i=e(48),o=function(n){function t(t,e,a,r){var u=n.call(this)||this;return u.auth=t,u.firebaseApp=e,u.http=a,u.db=r,u.path="/users",u.listenAuthState(),u}return Object(a.__extends)(t,n),t.prototype.create=function(n){return this.db.object(this.path+"/"+n.key).set(this.deleteUid(n)).catch(this.handlePromiseError)},t.prototype.userExists=function(n){return this.db.list(this.path,function(t){return t.orderByChild("username").equalTo(n)}).valueChanges().map(function(n){return n.length>0})},t.prototype.update=function(n){return this.currentUser.update(n).catch(this.handlePromiseError)},t.prototype.get=function(n){return this.mapObjectKey(this.db.object(this.path+"/"+n)).catch(this.handleObservableError)},t.prototype.uploadPhoto=function(n,t){return this.firebaseApp.storage().ref().child(this.path+"/"+t).put(n)},t.prototype.deleteUid=function(n){return delete n.key,n},t.prototype.setUsers=function(n){this.users=this.mapListKeys(this.db.list(this.path,function(n){return n.orderByChild("name")})).map(function(t){return t.filter(function(t){return t.key!==n})})},t.prototype.listenAuthState=function(){var n=this;this.auth.authState.subscribe(function(t){t&&(n.currentUser=n.db.object(n.path+"/"+t.uid),n.setUsers(t.uid))})},t=Object(a.__decorate)([Object(a.__param)(1,Object(r.m)(i.b))],t)}(l.a)},122:function(n,t,e){"use strict";e.d(t,"a",function(){return i});var a=e(178),r=e(409),u=(e.n(r),this&&this.__assign||Object.assign||function(n){for(var t,e=1,a=arguments.length;e<a;e++){t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}),l=function(n){var t;if(n instanceof a.g){var e=n.json()||"",r=e.error||JSON.stringify(e);t=n.status+" - "+(n.statusText||"")+" "+r}else t=n.message?n.message:n.toString();return console.error(t),t},i=function(){function n(){}return n.prototype.handlePromiseError=function(n){return Promise.reject(l(n))},n.prototype.handleObservableError=function(n){return r.Observable.throw(l(n))},n.prototype.mapListKeys=function(n){return n.snapshotChanges().map(function(n){return n.map(function(n){return u({key:n.key},n.payload.val())})}).catch(this.handleObservableError)},n.prototype.mapObjectKey=function(n){return n.snapshotChanges().map(function(n){return u({key:n.key},n.payload.val())}).catch(this.handleObservableError)},n}()},138:function(n,t,e){"use strict";e.d(t,"a",function(){return a});var a=function(){return function(n,t,e,a){this.name=n,this.username=t,this.email=e,this.photo=a}}()},141:function(n,t,e){"use strict";e.d(t,"a",function(){return a});e(2),e(138);var a=function(){return function(){this.isMenu=!1}}()},206:function(n,t,e){"use strict";e.d(t,"a",function(){return u});var a=e(2),r=(e(65),e(335)),u=(e(138),function(n){function t(t,e,a,r){var u=n.call(this,t,e,a,r)||this;return u.alertCtrl=t,u.authService=e,u.app=a,u.menuCtrl=r,u}return Object(a.__extends)(t,n),t.prototype.onProfile=function(){this.navCtrl.push("UserProfilePage")},t}(r.a))},208:function(n,t,e){"use strict";e.d(t,"a",function(){return a});e(2),e(65);var a=function(){function n(n,t){this.loadingCtrl=n,this.alertCtrl=t}return n.prototype.showLoading=function(){var n=this.loadingCtrl.create({content:"Please wait..."});return n.present(),n},n.prototype.showAlert=function(n){this.alertCtrl.create({title:"System message!",message:n,buttons:["Ok"],enableBackdropDismiss:!1}).present()},n}()},210:function(n,t,e){"use strict";e.d(t,"a",function(){return a});e(2),e(65),e(365),e(371),e(206),e(373),e(372);var a=function(){return function(){}}()},213:function(n,t,e){"use strict";e.d(t,"a",function(){return a});e(2),e(368),e(374),e(370),e(375);var a=function(){return function(){}}()},215:function(n,t,e){"use strict";e.d(t,"a",function(){return u});var a=e(2),r=e(122),u=function(n){function t(t,e,a){var r=n.call(this)||this;return r.auth=t,r.db=e,r.http=a,r.path="/chats",r.setChats(),r}return Object(a.__extends)(t,n),t.prototype.setChats=function(){var n=this;this.auth.authState.subscribe(function(t){t&&(n.chats=n.db.list(n.path+"/"+t.uid,function(n){return n.orderByChild("timestamp")}))})},t.prototype.create=function(n,t,e){return this.db.object(this.path+"/"+t+"/"+e).set(n).catch(this.handlePromiseError)},t.prototype.getDeepChat=function(n,t){return this.db.object(this.path+"/"+n+"/"+t)},t.prototype.updatePhoto=function(n,t,e){return t!=e?n.update({photo:e}).catch(this.handlePromiseError):Promise.resolve()},t}(r.a)},222:function(n,t,e){"use strict";e.d(t,"a",function(){return i});var a=e(2),r=e(0),u=e(122),l=e(48),i=function(n){function t(t,e,a){var r=n.call(this)||this;return r.db=t,r.firebaseApp=e,r.http=a,r.path="/messages",r}return Object(a.__extends)(t,n),t.prototype.getMessages=function(n,t,e){return this.db.list(this.path+"/"+n+"-"+t,function(n){return n.orderByChild("timestamp").limitToLast(e)})},t.prototype.create=function(n,t){return t.push(n)},t.prototype.uploadAttachment=function(n){return this.firebaseApp.storage().ref().child("/attachments/"+Math.random()+"*Name:"+n.name+":EndName*").put(n)},t=Object(a.__decorate)([Object(a.__param)(1,Object(r.m)(l.b))],t)}(u.a)},254:function(n,t){function e(n){return Promise.resolve().then(function(){throw new Error("Cannot find module '"+n+"'.")})}e.keys=function(){return[]},e.resolve=e,n.exports=e,e.id=254},281:function(n,t,e){function a(n){var t=r[n];return t?e.e(t[1]).then(function(){return e(t[0])}):Promise.reject(new Error("Cannot find module '"+n+"'."))}var r={"../pages/chat/chat.module.ngfactory":[666,0],"../pages/home/home.module.ngfactory":[669,1],"../pages/signin/signin.module.ngfactory":[668,3],"../pages/signup/signup.module.ngfactory":[667,2],"../pages/smiles-table/smiles-table.module.ngfactory":[671,5],"../pages/user-profile/user-profile.module.ngfactory":[670,4]};a.keys=function(){return Object.keys(r)},a.id=281,n.exports=a},335:function(n,t,e){"use strict";e.d(t,"a",function(){return a});var a=function(){function n(n,t,e,a){this.alertCtrl=n,this.authService=t,this.app=e,this.menuCtrl=a}return n.prototype.ngOnInit=function(){this.navCtrl=this.app.getActiveNavs()[0]},n.prototype.onLogout=function(){var n=this;this.alertCtrl.create({message:"Do you want to quit?",buttons:[{text:"Yes",handler:function(){n.authService.logout().then(function(){n.menuCtrl.enable(!1,"menu1"),n.navCtrl.setRoot("SigninPage")}).catch(function(n){})}},{text:"Cancel",role:"cancel"}],enableBackdropDismiss:!1}).present()},n}()},365:function(n,t,e){"use strict";e.d(t,"a",function(){return u});var a=e(2),r=(e(65),e(335)),u=(e(138),function(n){function t(t,e,a,r){var u=n.call(this,t,e,a,r)||this;return u.alertCtrl=t,u.authService=e,u.app=a,u.menuCtrl=r,u.title="",u}return Object(a.__extends)(t,n),t}(r.a))},368:function(n,t,e){"use strict";e.d(t,"a",function(){return a});e(2);var a=function(){function n(){}return n.prototype.transform=function(n,t){var e=this;if(void 0===t&&(t=!1),t)return this.firstWordUpperCase(n);var a="";return n.split(" ").forEach(function(n){a+=e.firstWordUpperCase(n)+" "}),a},n.prototype.firstWordUpperCase=function(n){return n.charAt(0).toLocaleUpperCase()+n.substring(1).toLocaleLowerCase()},n}()},370:function(n,t,e){"use strict";e.d(t,"a",function(){return a});e(2);var a=function(){function n(){}return n.prototype.transform=function(n,t,e){if(void 0===t&&(t=20),!n)throw new Error("Undefined description");return n.length<t?n:e?n.substring(0,n.indexOf(e)):n.substring(0,t)+"..."},n}()},371:function(n,t,e){"use strict";e.d(t,"a",function(){return a});e(2),e(376);var a=function(){return function(){this.width=window.innerWidth-20+"px"}}()},372:function(n,t,e){"use strict";e.d(t,"a",function(){return a});e(2),e(378);var a=function(){function n(){}return n.prototype.ngOnChanges=function(){this.smile&&(document.getElementById("inner").innerHTML+="<img src='"+this.smile.image+"' />")},Object.defineProperty(n.prototype,"text",{get:function(){return document.getElementById("inner").innerHTML},enumerable:!0,configurable:!0}),n.prototype.clear=function(){document.getElementById("inner").innerHTML=""},n}()},373:function(n,t,e){"use strict";e.d(t,"a",function(){return a});e(2);var a=function(){return function(){}}()},374:function(n,t,e){"use strict";e.d(t,"a",function(){return a});e(2);var a=function(){function n(){}return n.prototype.transform=function(n){return n?decodeURIComponent(n.substring(n.indexOf("*Name%3A")+8,n.lastIndexOf("%3AEndName*"))):""},n}()},375:function(n,t,e){"use strict";e.d(t,"a",function(){return a});e(2);var a=function(){function n(){this.imagesExtensions=["png","jpg","jpeg","gif"]}return n.prototype.transform=function(n,t){if(void 0===t&&(t=!1),!n)throw new Error("URL undefined");var e=n.substring(n.lastIndexOf(".")+1,n.length).trim().toLocaleLowerCase();if(this.imagesExtensions.indexOf(e)>-1)return t?"orange":"image";if(t)switch(e){case"docx":return"primary";case"pdf":return"danger";default:return"black"}return"document"},n}()},376:function(n,t,e){"use strict";e.d(t,"a",function(){return a});var a=function(){return function(n,t,e,a){this.userId=n,this.text=t,this.timestamp=e,this.attachment=a}}()},378:function(n,t,e){"use strict";e.d(t,"a",function(){return a});var a=[{code:"&S1#",image:"assets/imgs/smiles/glad.png"},{code:"&S2#",image:"assets/imgs/smiles/confused.png"},{code:"&S3#",image:"assets/imgs/smiles/smile.png"},{code:"&S4#",image:"assets/imgs/smiles/smiling.png"}]},379:function(n,t,e){"use strict";function a(n){return u._22(0,[(n()(),u.Z(0,0,null,null,18,"div",[],null,null,null,null,null)),(n()(),u._20(-1,null,["\n  "])),(n()(),u.Z(2,0,null,null,9,"ion-avatar",[],null,null,null,null,null)),u.Y(3,278528,null,0,l.i,[u.p,u.q,u.j,u.A],{ngClass:[0,"ngClass"]},null),u._14(4,{"custom-background":0}),u.Y(5,16384,null,0,i.a,[],null,null),(n()(),u._20(-1,null,["\n    "])),(n()(),u.Z(7,0,null,null,3,"div",[["class","round"]],null,null,null,null,null)),(n()(),u._20(-1,null,["\n      "])),(n()(),u.Z(9,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(n()(),u._20(-1,null,["\n    "])),(n()(),u._20(-1,null,["\n  "])),(n()(),u._20(-1,null,["\n  "])),(n()(),u.Z(13,0,null,null,1,"h2",[["text-center",""]],null,null,null,null,null)),(n()(),u._20(14,null,["",""])),(n()(),u._20(-1,null,["\n  "])),(n()(),u.Z(16,0,null,null,1,"p",[["text-center",""]],null,null,null,null,null)),(n()(),u._20(17,null,["@",""])),(n()(),u._20(-1,null,["\n"]))],function(n,t){n(t,3,0,n(t,4,0,t.component.isMenu))},function(n,t){var e=t.component;n(t,9,0,e.user.photo||"assets/imgs/no-photo.jpg");n(t,14,0,null==e.user?null:e.user.name);n(t,17,0,null==e.user?null:e.user.username)})}function r(n){return u._22(0,[(n()(),u.U(16777216,null,null,1,null,a)),u.Y(1,16384,null,0,l.k,[u.I,u.F],{ngIf:[0,"ngIf"]},null),(n()(),u._20(-1,null,["\n"]))],function(n,t){n(t,1,0,t.component.user)},null)}e.d(t,"a",function(){return o}),t.b=r;var u=e(0),l=e(23),i=e(137),o=u.X({encapsulation:2,styles:[],data:{}})},380:function(n,t,e){"use strict";function a(n){return l._22(0,[(n()(),l.Z(0,0,null,null,33,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],null,null,z.b,z.a)),l.Y(1,4374528,null,0,D.a,[I.a,B.a,T.a,l.j,l.z,F.a,N.a,l.u,[2,K.a],[2,W.a]],null,null),(n()(),l._20(-1,1,["\n  "])),(n()(),l.Z(3,0,null,1,1,"user-info",[],null,null,null,R.b,R.a)),l.Y(4,49152,null,0,X.a,[],{user:[0,"user"],isMenu:[1,"isMenu"]},null),(n()(),l._20(-1,1,["\n  "])),(n()(),l.Z(6,0,null,1,26,"ion-list",[["no-lines",""]],null,null,null,null,null)),l.Y(7,16384,null,0,q.a,[I.a,l.j,l.z,B.a,H.l,T.a],null,null),(n()(),l._20(-1,null,["\n    "])),(n()(),l.Z(9,0,null,null,10,"button",[["class","item item-block"],["detail-none",""],["icon-right",""],["ion-item",""],["menuClose","menu1"]],null,[[null,"click"]],function(n,t,e){var a=!0,r=n.component;if("click"===t){a=!1!==l._11(n,15).close()&&a}if("click"===t){a=!1!==r.onProfile()&&a}return a},G.b,G.a)),l.Y(10,1097728,null,3,J.a,[V.a,I.a,l.j,l.z,[2,Q.a]],null,null),l._18(335544320,1,{contentLabel:0}),l._18(603979776,2,{_buttons:1}),l._18(603979776,3,{_icons:1}),l.Y(14,16384,null,0,$.a,[],null,null),l.Y(15,16384,null,0,nn.a,[Z.a],{menuClose:[0,"menuClose"]},null),(n()(),l._20(-1,2,["\n      Profile\n      "])),(n()(),l.Z(17,0,null,4,1,"ion-icon",[["item-end",""],["name","person"],["role","img"]],[[2,"hide",null]],null,null,null,null)),l.Y(18,147456,[[3,4]],0,tn.a,[I.a,l.j,l.z],{name:[0,"name"]},null),(n()(),l._20(-1,2,["\n    "])),(n()(),l._20(-1,null,["\n    "])),(n()(),l.Z(21,0,null,null,10,"button",[["class","item item-block"],["detail-none",""],["icon-right",""],["ion-item",""],["menuClose","menu1"]],null,[[null,"click"]],function(n,t,e){var a=!0,r=n.component;if("click"===t){a=!1!==l._11(n,27).close()&&a}if("click"===t){a=!1!==r.onLogout()&&a}return a},G.b,G.a)),l.Y(22,1097728,null,3,J.a,[V.a,I.a,l.j,l.z,[2,Q.a]],null,null),l._18(335544320,4,{contentLabel:0}),l._18(603979776,5,{_buttons:1}),l._18(603979776,6,{_icons:1}),l.Y(26,16384,null,0,$.a,[],null,null),l.Y(27,16384,null,0,nn.a,[Z.a],{menuClose:[0,"menuClose"]},null),(n()(),l._20(-1,2,["\n      Logout\n      "])),(n()(),l.Z(29,0,null,4,1,"ion-icon",[["item-end",""],["name","log-out"],["role","img"]],[[2,"hide",null]],null,null,null,null)),l.Y(30,147456,[[6,4]],0,tn.a,[I.a,l.j,l.z],{name:[0,"name"]},null),(n()(),l._20(-1,2,["\n    "])),(n()(),l._20(-1,null,["\n  "])),(n()(),l._20(-1,1,["\n"])),(n()(),l._20(-1,null,["\n"]))],function(n,t){n(t,4,0,t.component.currentUser,!0);n(t,15,0,"menu1");n(t,18,0,"person");n(t,27,0,"menu1");n(t,30,0,"log-out")},function(n,t){n(t,0,0,l._11(t,1).statusbarPadding,l._11(t,1)._hasRefresher);n(t,17,0,l._11(t,18)._hidden);n(t,29,0,l._11(t,30)._hidden)})}function r(n){return l._22(0,[l._18(402653184,1,{nav:0}),(n()(),l.Z(1,0,null,null,8,"ion-menu",[["id","menu1"],["role","navigation"]],null,null,null,L.b,L.a)),l._16(6144,null,Y.a,null,[A.a]),l.Y(3,245760,null,2,A.a,[Z.a,l.j,I.a,B.a,l.z,N.a,H.l,T.a,F.a],{content:[0,"content"],id:[1,"id"]},null),l._18(335544320,2,{menuContent:0}),l._18(335544320,3,{menuNav:0}),(n()(),l._20(-1,0,["\n  "])),(n()(),l.Z(7,0,null,0,1,"user-menu",[],null,null,null,a,rn)),l.Y(8,114688,null,0,en.a,[an.a,m.a,F.a,Z.a],{currentUser:[0,"currentUser"]},null),(n()(),l._20(-1,0,["\n"])),(n()(),l._20(-1,null,["\n\n"])),(n()(),l.Z(11,0,null,null,2,"ion-nav",[["swipeBackEnabled","false"]],null,null,null,un.b,un.a)),l._16(6144,null,Y.a,null,[ln.a]),l.Y(13,4374528,[[1,4],["content",4]],0,ln.a,[[2,K.a],[2,W.a],F.a,I.a,B.a,l.j,l.u,l.z,l.i,H.l,on.a,[2,sn.a],T.a,l.k],{swipeBackEnabled:[0,"swipeBackEnabled"],root:[1,"root"]},null),(n()(),l._20(-1,null,["\n"]))],function(n,t){var e=t.component;n(t,3,0,l._11(t,13),"menu1");n(t,8,0,e.currentUser);n(t,13,0,"false",e.rootPage)},null)}Object.defineProperty(t,"__esModule",{value:!0});var u=e(50),l=e(0),i=(e(2),e(210)),o=e(75),s=e(178),c=(e(65),e(76)),f=e(96),h=e(48),d=e(135),p=e(136),m=e(58),_=e(102),g=function(){return function(n,t,e,a,r){var u=this;this.rootPage="SigninPage",r.auth.authState.subscribe(function(n){n&&a.get(n.uid).subscribe(function(n){u.currentUser=n})}),n.ready().then(function(){t.styleDefault(),e.hide()})}}(),b=e(208),y=e(215),v=e(222),C=function(){return function(){}}(),j=e(90),P=e(356),O=e(357),k=e(358),w=e(359),S=e(360),E=e(361),U=e(362),x=e(363),M=e(364),L=e(664),Y=e(57),A=e(120),Z=e(42),I=e(5),B=e(8),N=e(43),H=e(11),T=e(17),F=e(16),z=e(366),D=e(41),K=e(9),W=e(38),R=e(379),X=e(141),q=e(82),G=e(209),J=e(28),V=e(24),Q=e(66),$=e(101),nn=e(176),tn=e(64),en=e(206),an=e(81),rn=l.X({encapsulation:2,styles:[],data:{}}),un=e(665),ln=e(95),on=e(54),sn=e(27),cn=l.X({encapsulation:2,styles:[],data:{}}),fn=l.V("ng-component",g,function(n){return l._22(0,[(n()(),l.Z(0,0,null,null,1,"ng-component",[],null,null,null,r,cn)),l.Y(1,49152,null,0,g,[B.a,p.a,d.a,_.a,m.a],null,null)],null,null)},{},{},[]),hn=e(23),dn=e(189),pn=e(34),mn=e(169),_n=e(188),gn=e(56),bn=e(175),yn=e(212),vn=e(92),Cn=e(67),jn=e(193),Pn=e(116),On=e(140),kn=e(191),wn=e(202),Sn=e(354),En=e(190),Un=e(177),xn=e(192),Mn=e(213),Ln=l.W(C,[j.b],function(n){return l._7([l._8(512,l.i,l.S,[[8,[P.a,O.a,k.a,w.a,S.a,E.a,U.a,x.a,M.a,fn]],[3,l.i],l.s]),l._8(5120,l.r,l._17,[[3,l.r]]),l._8(4608,hn.m,hn.l,[l.r,[2,hn.u]]),l._8(5120,l.b,l._1,[]),l._8(5120,l.p,l._9,[]),l._8(5120,l.q,l._12,[]),l._8(4608,u.c,u.q,[hn.d]),l._8(6144,l.D,null,[u.c]),l._8(4608,u.f,dn.a,[]),l._8(5120,u.d,function(n,t,e,a,r){return[new u.k(n,t),new u.o(e),new u.n(a,r)]},[hn.d,l.u,hn.d,hn.d,u.f]),l._8(4608,u.e,u.e,[u.d,l.u]),l._8(135680,u.m,u.m,[hn.d]),l._8(4608,u.l,u.l,[u.e,u.m]),l._8(6144,l.B,null,[u.l]),l._8(6144,u.p,null,[u.m]),l._8(4608,l.G,l.G,[l.u]),l._8(4608,u.h,u.h,[hn.d]),l._8(4608,u.i,u.i,[hn.d]),l._8(4608,pn.u,pn.u,[]),l._8(4608,pn.d,pn.d,[]),l._8(4608,o.h,o.n,[hn.d,l.w,o.l]),l._8(4608,o.o,o.o,[o.h,o.m]),l._8(5120,o.a,function(n){return[n]},[o.o]),l._8(4608,o.k,o.k,[]),l._8(6144,o.i,null,[o.k]),l._8(4608,o.g,o.g,[o.i]),l._8(6144,o.b,null,[o.g]),l._8(4608,o.f,o.j,[o.b,l.o]),l._8(4608,o.c,o.c,[o.f]),l._8(4608,s.c,s.c,[]),l._8(4608,s.h,s.b,[]),l._8(5120,s.j,s.k,[]),l._8(4608,s.i,s.i,[s.c,s.h,s.j]),l._8(4608,s.f,s.a,[]),l._8(5120,s.d,s.l,[s.i,s.f]),l._8(5120,h.b,h.f,[h.c,h.d]),l._8(5120,c.a,c.c,[h.b]),l._8(5120,f.a,f.c,[h.b]),l._8(4608,mn.a,mn.a,[F.a,I.a]),l._8(4608,an.a,an.a,[F.a,I.a]),l._8(4608,_n.a,_n.a,[]),l._8(4608,V.a,V.a,[]),l._8(4608,gn.a,gn.a,[B.a]),l._8(4608,N.a,N.a,[I.a,B.a,l.u,T.a]),l._8(4608,bn.a,bn.a,[F.a,I.a]),l._8(5120,hn.h,yn.c,[hn.s,[2,hn.a],I.a]),l._8(4608,hn.g,hn.g,[hn.h]),l._8(5120,vn.b,vn.d,[F.a,vn.a]),l._8(5120,sn.a,sn.b,[F.a,vn.b,hn.g,Cn.b,l.i]),l._8(4608,jn.a,jn.a,[F.a,I.a,sn.a]),l._8(4608,Pn.a,Pn.a,[F.a,I.a]),l._8(4608,On.a,On.a,[F.a,I.a,sn.a]),l._8(4608,kn.a,kn.a,[I.a,B.a,T.a,F.a,H.l]),l._8(4608,wn.a,wn.a,[F.a,I.a]),l._8(4608,on.a,on.a,[B.a,I.a]),l._8(4608,p.a,p.a,[]),l._8(4608,d.a,d.a,[]),l._8(4608,_.a,_.a,[f.a,h.b,o.c,c.a]),l._8(4608,m.a,m.a,[f.a,c.a,o.c]),l._8(4608,b.a,b.a,[bn.a,an.a]),l._8(4608,y.a,y.a,[f.a,c.a,o.c]),l._8(4608,v.a,v.a,[c.a,h.b,o.c]),l._8(512,hn.c,hn.c,[]),l._8(512,l.k,Sn.a,[]),l._8(256,I.b,{},[]),l._8(1024,En.a,En.b,[]),l._8(1024,B.a,B.b,[u.b,En.a,l.u]),l._8(1024,I.a,I.c,[I.b,B.a]),l._8(512,T.a,T.a,[B.a]),l._8(512,Z.a,Z.a,[]),l._8(512,F.a,F.a,[I.a,B.a,[2,Z.a]]),l._8(512,H.l,H.l,[F.a]),l._8(256,vn.a,{links:[{loadChildren:"../pages/chat/chat.module.ngfactory#ChatPageModuleNgFactory",name:"ChatPage",segment:"chat",priority:"low",defaultHistory:[]},{loadChildren:"../pages/signup/signup.module.ngfactory#SignupPageModuleNgFactory",name:"SignupPage",segment:"signup",priority:"low",defaultHistory:["SigninPage"]},{loadChildren:"../pages/signin/signin.module.ngfactory#SigninPageModuleNgFactory",name:"SigninPage",segment:"signin",priority:"low",defaultHistory:[]},{loadChildren:"../pages/home/home.module.ngfactory#HomeModuleNgFactory",name:"HomePage",segment:"home",priority:"low",defaultHistory:[]},{loadChildren:"../pages/user-profile/user-profile.module.ngfactory#UserProfilePageModuleNgFactory",name:"UserProfilePage",segment:"user-profile",priority:"low",defaultHistory:["HomePage"]},{loadChildren:"../pages/smiles-table/smiles-table.module.ngfactory#SmilesTablePageModuleNgFactory",name:"SmilesTablePage",segment:"smiles-table",priority:"low",defaultHistory:[]}]},[]),l._8(512,l.h,l.h,[]),l._8(512,Un.a,Un.a,[l.h]),l._8(1024,Cn.b,Cn.c,[Un.a,l.o]),l._8(1024,l.c,function(n,t,e,a,r,l,i,o,s,c,f,h,d){return[u.s(n),xn.a(t),_n.b(e,a),kn.b(r,l,i,o,s),Cn.d(c,f,h,d)]},[[2,l.t],I.a,B.a,T.a,I.a,B.a,T.a,F.a,H.l,I.a,vn.a,Cn.b,l.u]),l._8(512,l.d,l.d,[[2,l.c]]),l._8(131584,l.f,l.f,[l.u,l.T,l.o,l.k,l.i,l.d]),l._8(512,l.e,l.e,[l.f]),l._8(512,u.a,u.a,[[3,u.a]]),l._8(512,pn.s,pn.s,[]),l._8(512,pn.g,pn.g,[]),l._8(512,pn.p,pn.p,[]),l._8(512,yn.a,yn.a,[]),l._8(512,Mn.a,Mn.a,[]),l._8(512,i.a,i.a,[]),l._8(512,o.e,o.e,[]),l._8(512,o.d,o.d,[]),l._8(512,s.e,s.e,[]),l._8(512,h.a,h.a,[]),l._8(512,c.b,c.b,[]),l._8(512,f.b,f.b,[]),l._8(512,C,C,[]),l._8(256,o.l,"XSRF-TOKEN",[]),l._8(256,o.m,"X-XSRF-TOKEN",[]),l._8(256,h.c,{apiKey:"AIzaSyB5cgZFIWh2qanMSYdmUuTfMMLDKvmXAk4",authDomain:"ionic3-firebase-chat-90ad3.firebaseapp.com",databaseURL:"https://ionic3-firebase-chat-90ad3.firebaseio.com",storageBucket:"ionic3-firebase-chat-90ad3.appspot.com",messagingSenderId:"942062891729"},[]),l._8(256,h.d,void 0,[]),l._8(256,j.a,g,[]),l._8(256,hn.a,"/",[])])});Object(l.M)(),Object(u.j)().bootstrapModuleFactory(Ln)},58:function(n,t,e){"use strict";e.d(t,"a",function(){return r});var a=e(2),r=function(n){function t(t,e,a){var r=n.call(this)||this;return r.auth=t,r.db=e,r.http=a,r}return Object(a.__extends)(t,n),t.prototype.createAuthUser=function(n){return this.auth.auth.createUserWithEmailAndPassword(n.email,n.password).catch(this.handlePromiseError)},t.prototype.signIn=function(n){return this.auth.auth.signInWithEmailAndPassword(n.email,n.password).catch(this.handlePromiseError)},t.prototype.logout=function(){return this.auth.auth.signOut()},Object.defineProperty(t.prototype,"authenticated",{get:function(){var n=this;return new Promise(function(t,e){n.auth.authState.subscribe(function(n){n?t(!0):e(!1)})})},enumerable:!0,configurable:!0}),t}(e(122).a)}},[380]);