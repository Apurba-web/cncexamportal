(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[593],{2564:function(e,t,n){"use strict";n.d(t,{a:function(){return a}});var r=n(7294),s=n(1163),o=n(8100),i=n(8622);function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.redirectTo,n=void 0===t?"":t,a=e.redirectIfFound,c=void 0!==a&&a,u=(0,o.ZP)("auth_user",i._j),d=u.data,l=u.mutate,x=u.isValidating,f=u.error,h=(0,s.useRouter)();return console.log(d),(0,r.useEffect)((function(){(n||d)&&(n&&!c&&!d||c&&d)&&h.push(n)}),[d,c,n,h]),{user:d,mutate:l,isValidating:x,isLoading:!d&&!f}}},3643:function(e,t,n){"use strict";n.d(t,{RF:function(){return p},tg:function(){return m},cx:function(){return v}});n(7294),n(1163);var r=n(8100),s=n(4051),o=n.n(s),i=n(9669),a=n.n(i),c=n(5860),u=n(5341);function d(e,t,n,r,s,o,i){try{var a=e[o](i),c=a.value}catch(u){return void n(u)}a.done?t(c):Promise.resolve(c).then(r,s)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var o=e.apply(t,n);function i(e){d(o,r,s,i,a,"next",e)}function a(e){d(o,r,s,i,a,"throw",e)}i(void 0)}))}}var x=function(){var e=l(o().mark((function e(){var t,n,r,s,i;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=(0,c.Z)(),n=t.token,r=t.user_dept,s=t.user_sec,r&&s&&n){e.next=3;break}throw{error:"no userid or no token"};case 3:return e.prev=3,e.next=6,a().post("".concat(u.c,"/frontends/examupcoming/"),{sec_id:s,dept_id:r},{headers:{token:n}});case 6:if("success"!==(i=e.sent).data.status){e.next=11;break}return e.abrupt("return",i.data.msg);case 11:throw"failed";case 12:e.next=18;break;case 14:throw e.prev=14,e.t0=e.catch(3),console.log(e.t0),e.t0;case 18:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=l(o().mark((function e(){var t,n,r,s,i;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=(0,c.Z)(),n=t.token,r=t.user_dept,s=t.user_sec,r&&s&&n){e.next=3;break}throw{error:"no userid or no token"};case 3:return e.prev=3,e.next=6,a()({url:"".concat(u.c,"/frontends/examcurrent"),method:"POST",data:{sec_id:s,dept_id:r},headers:{token:n}});case 6:if("success"!==(i=e.sent).data.status){e.next=11;break}return e.abrupt("return",i.data.msg);case 11:throw"failed";case 12:e.next=18;break;case 14:throw e.prev=14,e.t0=e.catch(3),console.log(e.t0),e.t0;case 18:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(){return e.apply(this,arguments)}}(),h=function(){var e=l(o().mark((function e(t){var n,r,s,i,d,l;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=(0,c.Z)(),r=n.token,s=n.user_dept,i=n.user_sec,s&&i&&r){e.next=3;break}throw{error:"no userid or no token"};case 3:return e.prev=3,e.next=6,a()({url:"".concat(u.c,"/frontends/examdetail"),method:"POST",data:{exam_id:t},headers:{token:r}});case 6:if("success"!==(d=e.sent).data.status){e.next=12;break}return e.abrupt("return",null===(l=d.data.msg)||void 0===l?void 0:l[0]);case 12:throw"failed";case 13:e.next=19;break;case 15:throw e.prev=15,e.t0=e.catch(3),console.log(e.t0),e.t0;case 19:case"end":return e.stop()}}),e,null,[[3,15]])})));return function(t){return e.apply(this,arguments)}}(),p=(function(){var e=l(o().mark((function e(t,n){var r,s,i,d,l;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=(0,c.Z)(),s=r.token,i=r.user_dept,d=r.user_sec,i&&d&&s){e.next=3;break}throw{error:"no userid or no token"};case 3:return e.prev=3,e.next=6,a()({url:"".concat(u.c,"/frontends/question"),method:"POST",data:{exam_id:t,subject_id:n},headers:{token:s}});case 6:if("success"!==(l=e.sent).data.status){e.next=11;break}return e.abrupt("return",l.data.msg);case 11:throw"failed";case 12:e.next=18;break;case 14:throw e.prev=14,e.t0=e.catch(3),console.log(e.t0),e.t0;case 18:case"end":return e.stop()}}),e,null,[[3,14]])})))}(),function(){var e=(0,r.ZP)("current_exams",f),t=e.data,n=e.mutate;return{currentExams:t,loading:!t&!e.error,mutate:n}}),v=function(){var e=(0,r.ZP)("current_exams",x),t=e.data,n=e.mutate;return{upcomingExams:t,loading:!t&!e.error,mutate:n}},m=function(e){var t=(0,r.ZP)([e,"exam"],h),n=t.data,s=t.mutate;return{exam:n,loading:!n&!t.error,mutate:s}}},5279:function(e,t,n){"use strict";n.d(t,{x:function(){return a}});var r=n(5893),s=n(6886),o=n(9226),i=(n(7294),n(3135)),a=function(e){var t=e.content;return(0,r.jsxs)(s.ZP,{container:!0,paddingX:2,paddingY:1,position:"fixed",boxShadow:" 1px 3px 6px #00000010",zIndex:999,sx:{height:i.h,backgroundColor:"white",zIndex:function(e){return e.zIndex.drawer+1}},children:[(0,r.jsx)(s.ZP,{item:!0,xs:2,children:(0,r.jsx)(o.Z,{children:(0,r.jsx)("img",{src:"/assets/images/cnc_logo.png",alt:"",style:{width:"97px",height:"64px"}})})}),(0,r.jsx)(s.ZP,{item:!0,xs:10,children:t})]})}},9353:function(e,t,n){"use strict";n.d(t,{f:function(){return x}});var r=n(5893),s=n(8046),o=n(3252),i=n(1163),a=n(6886),c=n(3321),u=n(6242),d=n(9226),l=n(5861),x=(n(7294),function(e){var t=e.examData,n=(0,i.useRouter)();return(0,r.jsx)(a.ZP,{item:!0,xs:12,sm:5,md:3,sx:{m:1},children:(0,r.jsx)(c.Z,{fullWidth:!0,sx:{textAlign:"left"},onClick:function(){t&&t.id&&n.push("/exam/".concat(t.id,"/instructions"))},children:(0,r.jsxs)(u.Z,{sx:{height:"100px",width:"100%",backgroundColor:"#80D1FF",p:1,position:"relative"},children:[(0,r.jsx)(s.Z,{fontSize:"large",sx:{position:"absolute",bottom:0,right:0}}),(0,r.jsxs)(d.Z,{display:"flex",alignItems:"center",children:[(0,r.jsx)(o.Z,{sx:{color:"#323232"}}),(0,r.jsx)(l.Z,{size:"small",variant:"caption",sx:{mx:2},children:null===t||void 0===t?void 0:t.start_time})]}),(0,r.jsx)(d.Z,{width:"100%",sx:{px:1,py:.2},children:(0,r.jsx)(l.Z,{size:"small",variant:"subtitle1",children:t.exam_name})}),(0,r.jsxs)(d.Z,{width:"100%",sx:{px:1},children:[(0,r.jsxs)(l.Z,{size:"small",sx:{fontSize:"10px"},children:[t.duration_min," mins"]}),(0,r.jsxs)(l.Z,{size:"small",sx:{fontSize:"10px"},children:[t.total_marks," marks"]})]})]})})})})},6654:function(e,t,n){"use strict";n.d(t,{O:function(){return d}});var r=n(5893),s=n(6242),o=n(5861),i=n(1519),a=n(9226),c=n(9661),u=(n(7294),n(2564));var d=function(e){e=null!==e?e:function(e){throw e}(new TypeError("Cannot destructure undefined"));var t=(0,u.a)().user;return(0,r.jsxs)(s.Z,{sx:{width:"100%",backgroundColor:"#0661B6dd",borderRadius:2},children:[(0,r.jsx)(o.Z,{sx:{display:"flex",flex:1,color:"white",p:1},children:"WELCOME"}),(0,r.jsx)(i.Z,{}),(0,r.jsxs)(a.Z,{sx:{p:5,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[(0,r.jsx)(c.Z,{sx:{width:90,height:90}}),(0,r.jsxs)(a.Z,{width:"100%",display:"flex",justifyContent:"space-between",p:1,marginTop:3,children:[(0,r.jsx)(o.Z,{variant:"body2",sx:{display:"flex",flex:1,color:"#e1e1e1"},children:"Name:"}),(0,r.jsxs)(o.Z,{sx:{display:"flex",flex:1,color:"white",fontWeight:"500"},children:[null===t||void 0===t?void 0:t.firstname," ",null===t||void 0===t?void 0:t.lastname]})]}),(0,r.jsxs)(a.Z,{width:"100%",display:"flex",justifyContent:"space-between",p:1,children:[(0,r.jsx)(o.Z,{variant:"body2",sx:{display:"flex",flex:1,color:"#e1e1e1"},children:"Student Id:"}),(0,r.jsx)(o.Z,{sx:{display:"flex",flex:1,color:"white",fontWeight:"500"},children:null===t||void 0===t?void 0:t.stud_reg_no})]}),(0,r.jsxs)(a.Z,{width:"100%",display:"flex",justifyContent:"space-between",p:1,children:[(0,r.jsx)(o.Z,{variant:"body2",sx:{display:"flex",flex:1,color:"#e1e1e1"},children:"Section:"}),(0,r.jsx)(o.Z,{sx:{display:"flex",flex:1,color:"white",fontWeight:"500"},children:null===t||void 0===t?void 0:t.section_name})]}),(0,r.jsxs)(a.Z,{width:"100%",display:"flex",justifyContent:"space-between",p:1,children:[(0,r.jsx)(o.Z,{variant:"body2",sx:{display:"flex",flex:1,color:"#e1e1e1"},children:"Department:"}),(0,r.jsx)(o.Z,{sx:{display:"flex",flex:1,color:"white",fontWeight:"500"},children:null===t||void 0===t?void 0:t.dept_name})]})]})]})}},2871:function(e,t,n){"use strict";n.d(t,{T:function(){return i}});var r=n(5893),s=(n(7294),n(3643),n(9721)),o=(new Date,new Date,n(9353)),i=function(e){var t=e.data,n=void 0===t?[]:t;return(0,r.jsx)(s.h,{sectionTitle:"Current Exams",children:null===n||void 0===n?void 0:n.map((function(e,t){return(0,r.jsx)(o.f,{examData:e},t)}))})}},9376:function(e,t,n){"use strict";n.d(t,{E:function(){return i}});var r=n(5893),s=(n(7294),n(9721)),o=n(9353),i=function(e){var t=e.data;return(0,r.jsx)(s.h,{sectionTitle:"Examinations",children:null===t||void 0===t?void 0:t.map((function(e,t){return(0,r.jsx)(o.f,{examData:e},t)}))})}},8769:function(e,t,n){"use strict";n.d(t,{s:function(){return o}});var r=n(5893),s=(n(7294),n(9721)),o=function(){return(0,r.jsx)(s.h,{sectionTitle:"Latest Notice"})}},2265:function(e,t,n){"use strict";n.d(t,{A:function(){return o}});var r=n(5893),s=(n(7294),n(9721)),o=function(){return(0,r.jsx)(s.h,{sectionTitle:"Latest Results"})}},3135:function(e,t,n){"use strict";n.d(t,{h:function(){return r}});var r="80px"},3872:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(5893),s=(n(7294),n(8377)),o=n(4073),i=n.n(o),a=function(e){var t=e.children;return(0,r.jsxs)("main",{children:[(0,r.jsx)(s.Z,{className:i().leftBottomBgImageBox,children:(0,r.jsx)("img",{src:"/assets/images/bg_left_bottom.png",alt:"",style:{position:"absolute",objectFit:"fill"}})}),(0,r.jsx)(s.Z,{className:i().rightBgImageBox,children:(0,r.jsx)("img",{src:"/assets/images/strip_bg.png",alt:"",style:{position:"absolute",objectFit:"fill"}})}),(0,r.jsx)(s.Z,{zIndex:2,paddingY:10,children:t})]})}},9721:function(e,t,n){"use strict";n.d(t,{h:function(){return i}});var r=n(5893),s=n(6886),o=n(5861),i=(n(7294),function(e){var t=e.sectionTitle,n=e.children;return(0,r.jsxs)(s.ZP,{container:!0,sx:{width:"100%",minHeight:"200px",backgroundColor:"#0661B620",borderRadius:2,padding:1.5},children:[(0,r.jsx)(s.ZP,{item:!0,xs:12,children:(0,r.jsx)(o.Z,{variant:"h6",color:"#02187E",children:t})}),(0,r.jsx)(s.ZP,{container:!0,children:n})]})})},5860:function(e,t,n){"use strict";var r=n(7041);Date(86400);t.Z=function(){var e=(0,r.getCookie)("cnc_token"),t=(0,r.getCookie)("cnc_user_id");return{token:e,user_sec:(0,r.getCookie)("cnc_user_sec"),user_dept:(0,r.getCookie)("cnc_user_dept"),user_id:t,setUserId:function(e){(0,r.setCookies)("cnc_user_id",e)},setUserDept:function(e){(0,r.setCookies)("cnc_user_dept",e)},setUserSec:function(e){(0,r.setCookies)("cnc_user_sec",e)},setToken:function(e){(0,r.setCookies)("cnc_token",e)},removeToken:function(){(0,r.removeCookies)("cnc_token")},clearAll:function(){(0,r.removeCookies)("cnc_token"),(0,r.removeCookies)("cnc_user_id")}}}},5341:function(e,t,n){"use strict";n.d(t,{c:function(){return r}});var r="https://fvdemosites.online/online/api/web/v1"},8622:function(e,t,n){"use strict";n.d(t,{x4:function(){return l},_j:function(){return x}});var r=n(4051),s=n.n(r),o=n(9669),i=n.n(o),a=n(5860),c=n(5341);function u(e,t,n,r,s,o,i){try{var a=e[o](i),c=a.value}catch(u){return void n(u)}a.done?t(c):Promise.resolve(c).then(r,s)}function d(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var o=e.apply(t,n);function i(e){u(o,r,s,i,a,"next",e)}function a(e){u(o,r,s,i,a,"throw",e)}i(void 0)}))}}!function(){var e=d(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=(0,a.Z)().token)){e.next=5;break}return e.abrupt("return",t);case 5:throw"error";case 6:case"end":return e.stop()}}),e)})))}();var l=function(){var e=d(s().mark((function e(t){var n,r,o,u,d,l,x,f,h,p;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.username,r=t.password,e.next=4,i().post("".concat(c.c,"/studentlogins/login"),{username:n,password:r});case 4:x=e.sent,f=(0,a.Z)(),h=f.setToken,p=f.setUserId,h(null===(o=x.data.msg)||void 0===o||null===(u=o[0])||void 0===u?void 0:u.auth_key),p(null===(d=x.data.msg)||void 0===d||null===(l=d[0])||void 0===l?void 0:l.id);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=d(s().mark((function e(){var t,n,r,o,u,d,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=(0,a.Z)(),n=t.user_id,r=t.token,o=t.setUserDept,u=t.setUserSec,console.log(n,r),n&&r){e.next=4;break}throw{error:"no userid or no token"};case 4:return e.prev=4,e.next=7,i().post("".concat(c.c,"/studentlogins/getstudents"),{id:n},{headers:{token:r}});case 7:if("success"!==(d=e.sent).data.status){e.next=15;break}return u(d.data.msg[0].section_id),o(d.data.msg[0].dept_id),e.abrupt("return",null===(l=d.data.msg)||void 0===l?void 0:l[0]);case 15:throw Error("Failed");case 16:e.next=22;break;case 18:throw e.prev=18,e.t0=e.catch(4),console.log(e.t0),e.t0;case 22:case"end":return e.stop()}}),e,null,[[4,18]])})));return function(){return e.apply(this,arguments)}}()},4073:function(e){e.exports={leftBottomBgImageBox:"MainLayout_leftBottomBgImageBox__5Qz_m",rightBgImageBox:"MainLayout_rightBgImageBox__b4xdH"}}}]);