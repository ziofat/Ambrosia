import{e as $,u as B,f as l,_ as k,o as t,c as r,a as n,d as C,t as d,g as z,v as D,h as w,n as j,i as T,r as _,b as f,w as m,F as N,j as b,k as g,l as v,m as q,p as U,T as G,q as R}from"./app.21c95187.js";const J=$({name:"HeroBanner",setup(){const e=T(),i=B(),o=l(()=>e.value.title),a=l(()=>e.value.description),p=l(()=>i.value.heroImage),c=l(()=>i.value.heroColor);return{title:o,description:a,image:p,bgColor:c}}}),K={class:"hero-banner__content"},Q={class:"hero-banner__text"},W={class:"hero-banner__description"},X={class:"hero-banner__actions"};function Y(e,i,o,a,p,c){return t(),r("section",{class:"hero-banner",style:j({backgroundImage:`url(${e.image})`,backgroundColor:e.bgColor})},[n("div",K,[n("div",Q,[n("h1",null,[C(d(e.title)+" ",1),z(n("small",null,d(e.version),513),[[D,e.version]])]),n("p",W,d(e.description),1),n("p",X,[w(e.$slots,"default")])])])],4)}var Z=k(J,[["render",Y]]);const I=$({name:"Home",components:{HeroBanner:Z},setup(){return{actions:[]}}}),ee={class:"home"},te={class:"home__actions"};function ne(e,i,o,a,p,c){const u=_("NavLink"),h=_("HeroBanner");return t(),r("div",ee,[f(h,null,{default:m(()=>[n("ul",te,[(t(!0),r(N,null,b(e.actions,s=>(t(),r("li",{key:s.text},[s.text&&s.link?(t(),g(u,{key:0,class:"button",href:s.link},{default:m(()=>[C(d(s.text),1)]),_:2},1032,["href"])):v("",!0)]))),128))])]),_:1})])}var se=k(I,[["render",ne]]);const oe={},re={class:"page"},ie={class:"page-content"},ae={class:"container"};function ce(e,i){const o=_("Content");return t(),r("div",re,[n("div",ie,[n("article",ae,[f(o,{custom:!1})])])])}var le=k(oe,[["render",ce]]);const de=()=>[{key:"v-5ed06da4",path:"/recipes/basic/",title:"\u57FA\u5E95\u98DF\u6750",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"\u9AD8\u6C64 Stock",slug:"\u9AD8\u6C64-stock",children:[]}]},{key:"v-7c81bd84",path:"/recipes/snack/",title:"\u5C0F\u5403",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"\u86CB\u7C7B\u6599\u7406",slug:"\u86CB\u7C7B\u6599\u7406",children:[]}]},{key:"v-4e5784d5",path:"/recipes/soup/",title:"\u6C64\u54C1",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"\u6E05\u6C64",slug:"\u6E05\u6C64",children:[]}]},{key:"v-8f46e306",path:"/recipes/basic/stock/",title:"\u9AD8\u6C64",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[]},{key:"v-642d723c",path:"/recipes/basic/stock/%E7%89%9B%E8%A4%90%E9%AB%98%E6%B1%A4.html",title:"\u725B\u8910\u9AD8\u6C64",lang:"zh-CN",frontmatter:{recipe:!0,course:"basic/stock",time:210,storage:"\u51B7\u85CF\u53EF\u4FDD\u5B58 5 \u5929, \u51B7\u51BB\u53EF\u4FDD\u5B58 6 \u4E2A\u6708.",ingredients:11,description:"\u8FD9\u9053\u725B\u8910\u9AD8\u6C64, \u4E0D\u4F1A\u51FA\u73B0\u4F20\u7EDF\u4E0A\u505A\u725B\u8089\u9AD8\u6C64\u4E71\u6210\u4E00\u56E2\u624B\u7EED\u7E41\u590D\u7684\u573A\u666F. \u4F60\u4E5F\u53EF\u4EE5\u7528\u8FD9\u4E2A\u98DF\u8C31\u6539\u6210\u732A\u8089, \u7F8A\u8089, \u5C0F\u725B\u8089\u6216\u8005\u91CE\u5473\u90FD\u884C, \u53EA\u8981\u66F4\u6362\u7EDE\u8089\u548C\u98CE\u5473\u6D53\u90C1\u7684\u5E26\u8089\u7684\u9AA8\u5934\u5C31\u884C. \u6B64\u5916, \u725B\u5C3E\u4E5F\u53EF\u4EE5\u6362\u6210\u725B\u8171, \u5173\u8282\u6216\u8005\u5176\u4ED6\u5E26\u9AA8\u5934\u7684\u8089.",yield:"1 kg",servings:"undefined"},excerpt:"",headers:[{level:3,title:"Instruction",slug:"instruction",children:[]},{level:3,title:"Storage",slug:"storage",children:[]}]},{key:"v-7d49481a",path:"/recipes/basic/stock/%E9%B8%A1%E7%99%BD%E9%AB%98%E6%B1%A4.html",title:"\u9E21\u767D\u9AD8\u6C64",lang:"zh-CN",frontmatter:{recipe:!0,course:"basic/stock",time:100,storage:"\u51B7\u85CF\u53EF\u4FDD\u5B58 5 \u5929, \u51B7\u51BB\u53EF\u4FDD\u5B58 6 \u4E2A\u6708.",ingredients:9,description:"\u8FD9\u9053\u98DF\u8C31\u5236\u4F5C\u7684\u662F\u9E21\u767D\u9AD8\u6C64, \u4F46\u4E5F\u53EF\u4EE5\u7528\u5176\u4ED6\u79BD\u7C7B\u5236\u4F5C. \u53EA\u8981\u628A\u9E21\u8089\u548C\u9E21\u9AA8\u6362\u6210\u9E2D\u5B50\u6216\u91CE\u79BD\u5373\u53EF. \u9E21\u7FC5\u4E5F\u53EF\u4EE5\u7528\u70E4\u9E21\u5269\u4E0B\u7684\u9AA8\u5934\u6765\u4EE3\u66FF, \u53EA\u8981\u5148\u628A\u9AA8\u5934\u51B7\u51BB\u8D77\u6765, \u79EF\u7D2F\u5230\u4E00\u5B9A\u7684\u91CF\u518D\u6765\u505A\u9AD8\u6C64.",yield:"1.2 kg",servings:"undefined"},excerpt:"",headers:[{level:3,title:"Instruction",slug:"instruction",children:[]},{level:3,title:"Storage",slug:"storage",children:[]}]},{key:"v-7a625764",path:"/recipes/snack/egg/",title:"\u86CB\u7C7B\u6599\u7406",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[]},{key:"v-9789e832",path:"/recipes/snack/egg/%E6%B3%95%E5%BC%8F%E7%82%92%E8%9B%8B.html",title:"\u6CD5\u5F0F\u7092\u86CB",lang:"zh-CN",frontmatter:{recipe:!0,course:"snack/egg",time:45,storage:"\u7ACB\u523B\u4E0A\u83DC",ingredients:5,description:"\u8FD9\u9053\u6CD5\u5F0F\u7092\u86CB\u548C\u4F20\u7EDF\u7684\u4E0D\u4E00\u6837. \u5B83\u4F7F\u7528\u624B\u6301\u5F0F\u6405\u62CC\u68D2\u6765\u5E2E\u52A9\u6211\u4EEC\u628A\u86CB\u6253\u5F97\u975E\u5E38\u987A\u6ED1, \u5B8C\u5168\u6CA1\u6709\u7599\u7629. \u63A5\u7740\u628A\u86CB\u653E\u8FDB\u5976\u6CB9\u67AA\u5145\u6C14, \u4F7F\u86CB\u53D8\u5F97\u8F7B\u76C8\u4E14\u5145\u6EE1\u6CE1\u6CAB. \u5982\u679C\u4E0D\u5145\u6C14, \u505A\u51FA\u6765\u7684\u8D28\u5730\u5C31\u7C7B\u4F3C\u5E03\u4E01, \u4E5F\u5F88\u4E0D\u9519. \u53EF\u4F5C\u4E3A\u65E9\u9910\u4E3B\u83DC, \u86CB\u5377\u9985\u6599\u6216\u8005\u725B\u6392\u7684\u914D\u83DC.",yield:"380 g",servings:"4-6"},excerpt:"",headers:[{level:3,title:"Instruction",slug:"instruction",children:[]},{level:3,title:"Storage",slug:"storage",children:[]}]},{key:"v-58e96ad1",path:"/recipes/soup/broth/",title:"\u6E05\u6C64",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[]},{key:"v-4464a00e",path:"/recipes/soup/broth/%E9%A6%99%E9%83%81%E6%B8%85%E9%B8%A1%E6%B1%A4.html",title:"\u9999\u90C1\u6E05\u9E21\u6C64",lang:"zh-CN",frontmatter:{recipe:!0,course:"soup/broth",time:10,storage:"\u7ACB\u523B\u4E0A\u83DC",ingredients:10,description:"\u8FD9\u9053\u98DF\u8C31\u53EF\u4F7F\u7528\u4F20\u7EDF\u767D\u9AD8\u6C64\u6216\u8005\u70E4\u9999\u7684\u8910\u9AD8\u6C64\u5F53\u4F5C\u4E3B\u98DF\u6750. \u4E3A\u8FBE\u5230\u6700\u4F73\u98CE\u5473, \u9700\u8981\u5148\u5206\u522B\u51C6\u5907\u597D\u6750\u6599, \u7AEF\u4E0A\u684C\u524D\u518D\u88C5\u76DB\u5373\u53EF. \u518D\u4E0A\u684C\u524D\u901A\u8FC7\u6D78\u6E0D\u7684\u65B9\u6CD5\u4ECE\u9999\u6599\u4E2D\u8403\u53D6\u5C11\u91CF\u82B3\u9999\u7269\u8D28, \u521B\u9020\u7F8E\u5999\u7684\u9999\u6C14\u4F53\u9A8C, \u5C31\u50CF\u6CE1\u8336\u6216\u8005\u6CE1\u5496\u5561\u4E00\u6837. \u642D\u914D\u5168\u9EA6\u9762, \u9E21\u86CB\u9762, \u6CB3\u7C89\u90FD\u975E\u5E38\u5408\u9002.",yield:"1 kg",servings:4},excerpt:"",headers:[{level:3,title:"Instruction",slug:"instruction",children:[]},{level:3,title:"Storage",slug:"storage",children:[]}]}];const _e=$({name:"Recipe",setup(){const e=de(),i=q(),o=B(),a=l(()=>i.value.title),p=l(()=>o.value.time),c=l(()=>o.value.yield),u=l(()=>o.value.ingredients),h=l(()=>o.value.servings),s=l(()=>o.value.description),y=l(()=>o.value.course.split("/").map((L,M,F)=>{const H=F.reduce((E,O,V)=>V<=M?`${E}/${O}`:E,"/recipes");return{name:e.find(E=>E.path===`${H}/`).title,link:H}}));return{title:a,description:s,categories:y,time:p,yields:c,ingredients:u,servings:h}}}),ue={class:"recipe"},pe={class:"page-content"},he={class:"container"},ve={class:"recipe-header"},ge={key:0,class:"recipe-categories"},ke={class:"tag"},me={class:"recipe-desc"},fe={class:"recipe-info"},$e={key:0,class:"recipe-info-card"},ye={class:"value"},Le=n("div",{class:"label"},"\u5206\u949F",-1),Ne={key:1,class:"recipe-info-card"},be={class:"value"},Ee=n("div",{class:"label"},"\u4EA7\u51FA",-1),Ce={key:2,class:"recipe-info-card"},we={class:"value"},Be=n("div",{class:"label"},"\u539F\u6599",-1),He={key:3,class:"recipe-info-card"},Re={class:"value"},xe=n("div",{class:"label"},"\u4EBA\u4EFD",-1),ze={class:"recipe-content"},De=n("div",{class:"recipe-settings"},null,-1);function Te(e,i,o,a,p,c){const u=_("RouterLink"),h=_("Content");return t(),r("div",ue,[n("div",pe,[n("article",he,[n("div",ve,[n("h1",null,d(e.title),1),e.categories?(t(),r("div",ge,[(t(!0),r(N,null,b(e.categories,s=>(t(),g(u,{class:"category-link",key:s.link,to:s.link},{default:m(()=>[n("span",ke,d(s.name),1)]),_:2},1032,["to"]))),128))])):v("",!0),n("div",me,d(e.description),1),n("div",fe,[e.time!=="undefined"?(t(),r("div",$e,[n("div",ye,d(e.time),1),Le])):v("",!0),e.yields!=="undefined"?(t(),r("div",Ne,[n("div",be,d(e.yields),1),Ee])):v("",!0),e.ingredients!=="undefined"?(t(),r("div",Ce,[n("div",we,d(e.ingredients),1),Be])):v("",!0),e.servings!=="undefined"?(t(),r("div",He,[n("div",Re,d(e.servings),1),xe])):v("",!0)])]),n("div",ze,[f(h,{custom:!1})])])]),De])}var Ae=k(_e,[["render",Te]]);const Se=()=>U();function x(e){return Object.assign(e,{type:e.children&&e.children.length?"links":"link"})}const A=/#.*$/,Pe=/\.(md|html)$/,Me=/\/$/;function S(e){return/^[a-z]+:/i.test(e)}function Fe(e){return decodeURI(e).replace(A,"").replace(Pe,"")}function Oe(e){if(S(e))return e;const i=e.match(A),o=i?i[0]:"",a=Fe(e);return Me.test(a)?e:`${a}.html${o}`}const Ve=$({name:"NavLink",methods:{isExternal(e){return S(e)}},props:{href:{type:String,default:""},title:{type:String,default:""}},setup(e){const i=l(()=>Oe(e.href)),o=l(()=>i.value==="/");return{link:i,exact:o}}}),je=["href","title"];function qe(e,i,o,a,p,c){const u=_("RouterLink"),h=_("OutboundLink");return e.isExternal(e.link)?(t(),r("a",{key:1,href:e.link,title:e.title,class:"nav-link external",target:"_blank",rel:"noopener noreferrer"},[w(e.$slots,"default"),f(h)],8,je)):(t(),g(u,{key:0,class:"nav-link",to:e.link,title:e.title,exact:e.exact},{default:m(()=>[w(e.$slots,"default")]),_:3},8,["to","title","exact"]))}var P=k(Ve,[["render",qe]]);const Ue={name:"DropdownTransition",methods:{setHeight(e){e.style.height=`${e.scrollHeight}px`},unsetHeight(e){e.style.height=""}}};function Ge(e,i,o,a,p,c){return t(),g(G,{name:"dropdown",onEnter:c.setHeight,onAfterEnter:c.unsetHeight,onBeforeLeave:c.setHeight},{default:m(()=>[w(e.$slots,"default")]),_:3},8,["onEnter","onAfterEnter","onBeforeLeave"])}var Je=k(Ue,[["render",Ge]]);const Ke={name:"DropdownLink",components:{NavLink:P,DropdownTransition:Je},data(){return{open:!1}},props:{item:{required:!0}},methods:{toggle(){this.open=!this.open}}},Qe=["title"],We={class:"title"},Xe={class:"nav-dropdown"},Ye={key:0},Ze={key:1,class:"dropdown-subitem-wrapper"};function Ie(e,i,o,a,p,c){const u=_("NavLink"),h=_("DropdownTransition");return t(),r("div",{class:R(["dropdown-wrapper",{open:p.open}])},[n("a",{class:"dropdown-title",onClick:i[0]||(i[0]=(...s)=>c.toggle&&c.toggle(...s)),title:o.item.title},[n("span",We,d(o.item.text),1),n("span",{class:R(["arrow",p.open?"down":"right"])},null,2)],8,Qe),f(h,null,{default:m(()=>[z(n("ul",Xe,[(t(!0),r(N,null,b(o.item.children,(s,y)=>(t(),r("li",{class:"dropdown-item",key:s.link||y},[s.type==="links"?(t(),r("h4",Ye,d(s.text),1)):v("",!0),s.type==="links"?(t(),r("ul",Ze,[(t(!0),r(N,null,b(s.children,L=>(t(),r("li",{class:"dropdown-subitem",key:L.link},[f(u,{href:L.link,title:L.title},{default:m(()=>[C(d(L.text),1)]),_:2},1032,["href","title"])]))),128))])):(t(),g(u,{key:2,href:s.link,title:s.title},{default:m(()=>[C(d(s.text),1)]),_:2},1032,["href","title"]))]))),128))],512),[[D,p.open]])]),_:1})],2)}var et=k(Ke,[["render",Ie]]);const tt=$({name:"NavLinks",components:{NavLink:P,DropdownLink:et},setup(){const e=Se();return{userLinks:l(()=>{const{navbar:o}=e.value;return(o||[]).map(a=>Object.assign(x(a),{children:(a.children||[]).map(x)}))})}}}),nt={key:0,class:"nav-links"};function st(e,i,o,a,p,c){const u=_("DropdownLink"),h=_("NavLink");return e.userLinks.length?(t(),r("nav",nt,[(t(!0),r(N,null,b(e.userLinks,s=>(t(),r("div",{class:"nav-item",key:s.link},[s.type==="links"?(t(),g(u,{key:0,item:s},null,8,["item"])):(t(),g(h,{key:1,href:s.link,innerHTML:s.text,title:s.title},null,8,["href","innerHTML","title"]))]))),128))])):v("",!0)}var ot=k(tt,[["render",st]]);const rt=$({name:"Navbar",components:{NavLinks:ot},setup(){const e=T();return{title:l(()=>e.value.title.split("."))}}}),it={class:"navbar",ref:"navbar"},at={class:"container"},ct={key:0,ref:"siteName",class:"site-name"},lt={class:"brand-name"},dt={key:0},_t={key:1},ut={class:"links"};function pt(e,i,o,a,p,c){const u=_("RouterLink"),h=_("NavLinks");return t(),r("header",it,[n("div",at,[f(u,{to:"/",class:"home-link"},{default:m(()=>[e.title?(t(),r("div",ct,[n("span",lt,d(e.title[0]),1),e.title[1]?(t(),r("span",dt,".")):v("",!0),e.title[1]?(t(),r("span",_t,d(e.title[1]),1)):v("",!0)],512)):v("",!0)]),_:1}),n("div",ut,[f(h)])])],512)}var ht=k(rt,[["render",pt]]);const vt=$({components:{Home:se,Page:le,Navbar:ht,Recipe:Ae},setup(){const e=B(),i=l(()=>e.value.home),o=l(()=>e.value.recipe);return{isHome:i,isRecipe:o}}}),gt={class:"theme-container"},kt={class:"main-content"};function mt(e,i,o,a,p,c){const u=_("Navbar"),h=_("Home"),s=_("Recipe"),y=_("Page");return t(),r("div",gt,[f(u),n("main",kt,[e.isHome?(t(),g(h,{key:0})):v("",!0),e.isRecipe?(t(),g(s,{key:1})):(t(),g(y,{key:2}))])])}var yt=k(vt,[["render",mt]]);export{yt as default};
