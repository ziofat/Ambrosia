"use strict";(self.webpackChunkambrosia_kitchen_website=self.webpackChunkambrosia_kitchen_website||[]).push([[5394],{5394:(t,e,a)=>{a.d(e,{diagram:()=>f});var r=a(7146),i=a(4756),n=a(1520),d=a(419),o=a(6530);a(8185),a(6828),a(5083);let s=0;const l=function(t,e,a,r){const{displayText:i,cssStyle:n}=e.getDisplayDetails(),d=t.append("tspan").attr("x",r.padding).text(i);""!==n&&d.attr("style",e.cssStyle),a||d.attr("dy",r.textHeight)},p=function(t,e,a,r){o.l.debug("Rendering class ",e,a);const i=e.id,n={id:i,label:e.id,width:0,height:0},d=t.append("g").attr("id",r.db.lookUpDomId(i)).attr("class","classGroup");let s;s=e.link?d.append("svg:a").attr("xlink:href",e.link).attr("target",e.linkTarget).append("text").attr("y",a.textHeight+a.padding).attr("x",0):d.append("text").attr("y",a.textHeight+a.padding).attr("x",0);let p=!0;e.annotations.forEach((function(t){const e=s.append("tspan").text("«"+t+"»");p||e.attr("dy",a.textHeight),p=!1}));let c=function(t){let e=t.id;return t.type&&(e+="<"+(0,o.x)(t.type)+">"),e}(e);const g=s.append("tspan").text(c).attr("class","title");p||g.attr("dy",a.textHeight);const h=s.node().getBBox().height;let f,x,u;if(e.members.length>0){f=d.append("line").attr("x1",0).attr("y1",a.padding+h+a.dividerMargin/2).attr("y2",a.padding+h+a.dividerMargin/2);const t=d.append("text").attr("x",a.padding).attr("y",h+a.dividerMargin+a.textHeight).attr("fill","white").attr("class","classText");p=!0,e.members.forEach((function(e){l(t,e,p,a),p=!1})),x=t.node().getBBox()}if(e.methods.length>0){u=d.append("line").attr("x1",0).attr("y1",a.padding+h+a.dividerMargin+x.height).attr("y2",a.padding+h+a.dividerMargin+x.height);const t=d.append("text").attr("x",a.padding).attr("y",h+2*a.dividerMargin+x.height+a.textHeight).attr("fill","white").attr("class","classText");p=!0,e.methods.forEach((function(e){l(t,e,p,a),p=!1}))}const y=d.node().getBBox();var b=" ";e.cssClasses.length>0&&(b+=e.cssClasses.join(" "));const m=d.insert("rect",":first-child").attr("x",0).attr("y",0).attr("width",y.width+2*a.padding).attr("height",y.height+a.padding+.5*a.dividerMargin).attr("class",b).node().getBBox().width;return s.node().childNodes.forEach((function(t){t.setAttribute("x",(m-t.getBBox().width)/2)})),e.tooltip&&s.insert("title").text(e.tooltip),f&&f.attr("x2",m),u&&u.attr("x2",m),n.width=m,n.height=y.height+a.padding+.5*a.dividerMargin,n};let c={};const g=function(t){const e=Object.entries(c).find((e=>e[1].label===t));if(e)return e[0]},h={draw:function(t,e,a,r){const l=(0,o.c)().class;c={},o.l.info("Rendering diagram "+t);const h=(0,o.c)().securityLevel;let f;"sandbox"===h&&(f=(0,i.Ltv)("#i"+e));const x="sandbox"===h?(0,i.Ltv)(f.nodes()[0].contentDocument.body):(0,i.Ltv)("body"),u=x.select(`[id='${e}']`);var y;(y=u).append("defs").append("marker").attr("id","extensionStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 1,7 L18,13 V 1 Z"),y.append("defs").append("marker").attr("id","extensionEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 1,1 V 13 L18,7 Z"),y.append("defs").append("marker").attr("id","compositionStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),y.append("defs").append("marker").attr("id","compositionEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),y.append("defs").append("marker").attr("id","aggregationStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),y.append("defs").append("marker").attr("id","aggregationEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),y.append("defs").append("marker").attr("id","dependencyStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 5,7 L9,13 L1,7 L9,1 Z"),y.append("defs").append("marker").attr("id","dependencyEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L14,7 L9,1 Z");const b=new d.T({multigraph:!0});b.setGraph({isMultiGraph:!0}),b.setDefaultEdgeLabel((function(){return{}}));const m=r.db.getClasses(),k=Object.keys(m);for(const t of k){const e=m[t],a=p(u,e,l,r);c[a.id]=a,b.setNode(a.id,a),o.l.info("Org height: "+a.height)}r.db.getRelations().forEach((function(t){o.l.info("tjoho"+g(t.id1)+g(t.id2)+JSON.stringify(t)),b.setEdge(g(t.id1),g(t.id2),{relation:t},t.title||"DEFAULT")})),r.db.getNotes().forEach((function(t){o.l.debug(`Adding note: ${JSON.stringify(t)}`);const e=function(t,e,a,r){o.l.debug("Rendering note ",e,a);const i=e.id,n={id:i,text:e.text,width:0,height:0},d=t.append("g").attr("id",i).attr("class","classGroup");let s=d.append("text").attr("y",a.textHeight+a.padding).attr("x",0);const l=JSON.parse(`"${e.text}"`).split("\n");l.forEach((function(t){o.l.debug(`Adding line: ${t}`),s.append("tspan").text(t).attr("class","title").attr("dy",a.textHeight)}));const p=d.node().getBBox(),c=d.insert("rect",":first-child").attr("x",0).attr("y",0).attr("width",p.width+2*a.padding).attr("height",p.height+l.length*a.textHeight+a.padding+.5*a.dividerMargin).node().getBBox().width;return s.node().childNodes.forEach((function(t){t.setAttribute("x",(c-t.getBBox().width)/2)})),n.width=c,n.height=p.height+l.length*a.textHeight+a.padding+.5*a.dividerMargin,n}(u,t,l);c[e.id]=e,b.setNode(e.id,e),t.class&&t.class in m&&b.setEdge(t.id,g(t.class),{relation:{id1:t.id,id2:t.class,relation:{type1:"none",type2:"none",lineType:10}}},"DEFAULT")})),(0,n.Zp)(b),b.nodes().forEach((function(t){void 0!==t&&void 0!==b.node(t)&&(o.l.debug("Node "+t+": "+JSON.stringify(b.node(t))),x.select("#"+(r.db.lookUpDomId(t)||t)).attr("transform","translate("+(b.node(t).x-b.node(t).width/2)+","+(b.node(t).y-b.node(t).height/2)+" )"))})),b.edges().forEach((function(t){void 0!==t&&void 0!==b.edge(t)&&(o.l.debug("Edge "+t.v+" -> "+t.w+": "+JSON.stringify(b.edge(t))),function(t,e,a,r,n){const d=function(t){switch(t){case n.db.relationType.AGGREGATION:return"aggregation";case n.db.relationType.EXTENSION:return"extension";case n.db.relationType.COMPOSITION:return"composition";case n.db.relationType.DEPENDENCY:return"dependency";case n.db.relationType.LOLLIPOP:return"lollipop"}};e.points=e.points.filter((t=>!Number.isNaN(t.y)));const l=e.points,p=(0,i.n8j)().x((function(t){return t.x})).y((function(t){return t.y})).curve(i.qrM),c=t.append("path").attr("d",p(l)).attr("id","edge"+s).attr("class","relation");let g,h,f="";r.arrowMarkerAbsolute&&(f=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,f=f.replace(/\(/g,"\\("),f=f.replace(/\)/g,"\\)")),1==a.relation.lineType&&c.attr("class","relation dashed-line"),10==a.relation.lineType&&c.attr("class","relation dotted-line"),"none"!==a.relation.type1&&c.attr("marker-start","url("+f+"#"+d(a.relation.type1)+"Start)"),"none"!==a.relation.type2&&c.attr("marker-end","url("+f+"#"+d(a.relation.type2)+"End)");const x=e.points.length;let u,y,b,m,k=o.u.calcLabelPosition(e.points);if(g=k.x,h=k.y,x%2!=0&&x>1){let t=o.u.calcCardinalityPosition("none"!==a.relation.type1,e.points,e.points[0]),r=o.u.calcCardinalityPosition("none"!==a.relation.type2,e.points,e.points[x-1]);o.l.debug("cardinality_1_point "+JSON.stringify(t)),o.l.debug("cardinality_2_point "+JSON.stringify(r)),u=t.x,y=t.y,b=r.x,m=r.y}if(void 0!==a.title){const e=t.append("g").attr("class","classLabel"),i=e.append("text").attr("class","label").attr("x",g).attr("y",h).attr("fill","red").attr("text-anchor","middle").text(a.title);window.label=i;const n=i.node().getBBox();e.insert("rect",":first-child").attr("class","box").attr("x",n.x-r.padding/2).attr("y",n.y-r.padding/2).attr("width",n.width+r.padding).attr("height",n.height+r.padding)}o.l.info("Rendering relation "+JSON.stringify(a)),void 0!==a.relationTitle1&&"none"!==a.relationTitle1&&t.append("g").attr("class","cardinality").append("text").attr("class","type1").attr("x",u).attr("y",y).attr("fill","black").attr("font-size","6").text(a.relationTitle1),void 0!==a.relationTitle2&&"none"!==a.relationTitle2&&t.append("g").attr("class","cardinality").append("text").attr("class","type2").attr("x",b).attr("y",m).attr("fill","black").attr("font-size","6").text(a.relationTitle2),s++}(u,b.edge(t),b.edge(t).relation,l,r))}));const w=u.node().getBBox(),L=w.width+40,v=w.height+40;(0,o.i)(u,v,L,l.useMaxWidth);const E=`${w.x-20} ${w.y-20} ${L} ${v}`;o.l.debug(`viewBox ${E}`),u.attr("viewBox",E)}},f={parser:r.p,db:r.d,renderer:h,styles:r.s,init:t=>{t.class||(t.class={}),t.class.arrowMarkerAbsolute=t.arrowMarkerAbsolute,r.d.clear()}}}}]);