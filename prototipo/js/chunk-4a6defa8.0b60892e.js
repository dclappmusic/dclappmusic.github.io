(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a6defa8"],{"0418":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"header"},[e("p",{staticClass:"nombre"},[t._v("\n        "+t._s(this.user.email)+"\n    ")]),e("div",{staticClass:"ajustes",on:{click:t.toggle_menu}},[e("svg",{attrs:{width:"8",height:"34",viewBox:"0 0 8 34",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("circle",{attrs:{cx:"4",cy:"4",r:"4",fill:"#0C3847"}}),e("circle",{attrs:{cx:"4",cy:"17",r:"4",fill:"#0C3847"}}),e("circle",{attrs:{cx:"4",cy:"30",r:"4",fill:"#0C3847"}})])]),t.open?e("div",{staticClass:"ajustes_open"},[e("a",{staticClass:"logout",on:{click:t.logout}},[t._v("logout")])]):t._e(),t.open?e("div",{staticClass:"overlay",on:{click:function(a){t.open=!1}}}):t._e()])},n=[],o=e("8aa5"),c=e.n(o),i={name:"Header",props:["user"],data:function(){return{open:!1}},methods:{toggle_menu:function(){this.open=!this.open},logout:function(){var t=this;c.a.auth().signOut().then((function(){t.cerrado=!0})).catch((function(t){window.alert("error: "+t)}))}}},r=i,l=(e("a384"),e("2877")),u=Object(l["a"])(r,s,n,!1,null,"2197757c",null);a["a"]=u.exports},a384:function(t,a,e){"use strict";var s=e("a6ef"),n=e.n(s);n.a},a6ef:function(t,a,e){},bb51:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page home",attrs:{"data-page":"home"}},[e("a",{staticClass:"boton btn_preclapp",on:{click:function(a){return t.overlay("clapp")}}},[e("img",{attrs:{src:"images/icon_clapp.png"}})]),t._m(0),t.show_overlay?e("div",{staticClass:"overlay",on:{click:function(a){t.show_overlay=!1}}},[e("div",{staticClass:"ov_box"},[e("p",[t._v(t._s(t.overlay_msgs.msg))])])]):t._e()])},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"intro_clapp"},[e("a",{attrs:{href:"sign_band.html"}},[e("h3",{staticClass:"display-med"},[t._v("applaud"),e("br"),t._v("the talent")])])])}],o=e("0418"),c={name:"Home",components:{Header:o["a"]},props:["user"],data:function(){return{show_overlay:!1,overlay_msgs:{msg:"",clapp:"Próximamente"}}},created:function(){},mounted:function(){},methods:{overlay:function(t){var a,e=this;clearTimeout(a),this.show_overlay=!0,this.overlay_msgs.msg=this.overlay_msgs[t],a=setTimeout((function(){e.show_overlay=!1}),1700)}}},i=c,r=(e("bd08"),e("2877")),l=Object(r["a"])(i,s,n,!1,null,"66536aeb",null);a["default"]=l.exports},bd08:function(t,a,e){"use strict";var s=e("c25f"),n=e.n(s);n.a},c25f:function(t,a,e){}}]);
//# sourceMappingURL=chunk-4a6defa8.0b60892e.js.map