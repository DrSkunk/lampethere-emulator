(this["webpackJsonplampethere-emulator"]=this["webpackJsonplampethere-emulator"]||[]).push([[0],{101:function(e,t){},102:function(e,t){},104:function(e,t){},106:function(e,t){},118:function(e,t,n){"use strict";n.r(t);var c=n(1),o=n(0),r=n.n(o),a=n(57),s=n.n(a),i=(n(67),n(15)),l=n(16),u=n(17),d=n(19),h=n(18),p=n(20),g=n(58),f=n.n(g),b=n(21);function m(){var e=Object(p.a)(["\n  ","\n"]);return m=function(){return e},e}function v(){var e=Object(p.a)(["\n  display: inline-block;\n  width: 100px;\n  height: 20px;\n  ","\n  border: 1px solid #ccc;\n"]);return v=function(){return e},e}function j(){var e=Object(p.a)(["\n  border: 1px solid black;\n  width: 500px;\n"]);return j=function(){return e},e}var O=b.a.div(j()),x=b.a.span(v(),(function(e){var t=e.color;return"background-color: ".concat(t,";")})),S=b.a.div(m(),(function(e){var t=e.connected;return"color: ".concat(t?"green":"red",";")})),C=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var c;return Object(l.a)(this,n),(c=t.call(this,e)).toggleConnect=function(){if(c.state.connected)console.log("Disconnecting..."),c.client&&(c.client.end(),c.setState({connected:!1}));else{console.log("Connecting...");var e=c.state,t=(e.groupId,e.deviceId),n=c.props.serverConfig,o=n.connectionString,r=n.username,a=n.password,s=f.a.connect(o,{username:r,password:a,will:{topic:"/lampethere/device/".concat(t,"/online"),payload:"false"}});s.on("connect",(function(){console.log("Connected"),c.setState({connected:!0}),s.subscribe("/lampethere/device/".concat(t,"/#"),(function(e){e?console.error(e):(s.publish("/lampethere/device/".concat(t,"/online"),"true",{retain:!0}),s.publish("/lampethere/device/".concat(t,"/version"),"1.0.0"))}))})),s.on("error",(function(e){c.setState({connected:!1}),console.error(e),s.end()})),s.on("message",(function(e,n){switch(console.log(t,e,n.toString()),e){case"/lampethere/device/".concat(t,"/message"):c.setState({receivedColor:JSON.parse(n.toString()).color});break;case"/lampethere/device/".concat(t,"/config/color/set"):c.setState({color:n.toString()});break;case"/lampethere/device/".concat(t,"/config/name/set"):c.setState({name:n.toString()});break;case"/lampethere/device/".concat(t,"/config/groups/set"):var o=JSON.parse(n.toString());c.setState({groups:o}),o.forEach((function(e){c.client.subscribe("/lampethere/group/".concat(e,"/message"),(function(e){e&&console.log(e)}))}))}e.endsWith("/message")&&c.setState({receivedColor:JSON.parse(n.toString()).color})})),c.client=s}},c.onChange=function(e){c.setState(Object(i.a)({},e.target.name,e.target.value))},c.pushThzeButton=function(){var e=c.state.color;c.state.groups.forEach((function(t){console.log("group",t,e),c.client.publish("/lampethere/group/".concat(t,"/message"),JSON.stringify({color:e}))}))},c.state={deviceId:c.props.deviceId,color:"#ffffff",receivedColor:"#ffffff",connected:!1,groups:[],name:"unset"},c}return Object(u.a)(n,[{key:"render",value:function(){var e=this.state,t=e.receivedColor,n=e.deviceId,o=e.color,r=e.groups,a=e.name,s=e.connected;return Object(c.jsxs)(O,{children:[Object(c.jsxs)(S,{connected:s,children:["Connected:",s.toString()]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("label",{htmlFor:"deviceId",children:"Device ID:"}),Object(c.jsx)("input",{type:"text",value:n,onChange:this.onChange,name:"deviceId",id:"deviceId"})]}),Object(c.jsxs)("div",{children:["Color:",Object(c.jsx)(x,{color:o})]}),Object(c.jsxs)("div",{children:["name: ",a]}),Object(c.jsxs)("div",{children:["groups: ",JSON.stringify(r)]}),Object(c.jsxs)("div",{children:["Received color:",Object(c.jsx)(x,{color:t})]}),Object(c.jsx)("button",{onClick:this.toggleConnect,children:s?"Disconnect":"Connect"}),Object(c.jsx)("button",{onClick:this.pushThzeButton,disabled:!s,children:"Push thze button"})]})}}]),n}(r.a.Component),w=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(l.a)(this,n);for(var c=arguments.length,o=new Array(c),r=0;r<c;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={numberOfLamps:3,connectionString:"ws://localhost:9001",username:"lampethere",password:"lampethere"},e.addLamp=function(){e.setState((function(e){return{numberOfLamps:e.numberOfLamps+1}}))},e.removeLamp=function(){e.setState((function(e){var t=e.numberOfLamps;return{numberOfLamps:Math.max(t-1,0)}}))},e.onInputChange=function(t){e.setState(Object(i.a)({},t.target.name,t.target.value))},e}return Object(u.a)(n,[{key:"render",value:function(){for(var e=[],t={connectionString:this.state.connectionString,username:this.state.username,password:this.state.password},n=0;n<this.state.numberOfLamps;n++)console.log(n),e.push(Object(c.jsx)(C,{deviceId:"device".concat(n+1),serverConfig:t},n));return console.log("lamps",e),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("div",{children:["connectionString:",Object(c.jsx)("input",{type:"text",name:"connectionString",onChange:this.onInputChange,value:this.state.connectionString})]}),Object(c.jsxs)("div",{children:["Username:",Object(c.jsx)("input",{type:"text",name:"username",onChange:this.onInputChange,value:this.state.username})]}),Object(c.jsxs)("div",{children:["Password:",Object(c.jsx)("input",{type:"password",name:"password",onChange:this.onInputChange,value:this.state.password})]}),Object(c.jsx)("button",{onClick:this.addLamp,children:"Add lamp"}),Object(c.jsx)("button",{onClick:this.removeLamp,children:"Remove lamp"}),e]})}}]),n}(r.a.Component),I=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,119)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),o(e),r(e),a(e)}))};s.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root")),I()},67:function(e,t,n){},71:function(e,t){},73:function(e,t){}},[[118,1,2]]]);
//# sourceMappingURL=main.670301f4.chunk.js.map