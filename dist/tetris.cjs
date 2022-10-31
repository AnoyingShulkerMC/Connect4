(()=>{var e,t,i,s,r,n,o={459:(e,t,i)=>{var s=i(361).EventEmitter,r=e.exports=function(e){if(!function(e){var t=!!e._keypressDecoder;return t||(e.listeners("data").slice(0).forEach((function(t){"onData"==t.name&&/emitKey/.test(t.toString())&&e.removeListener("data",t)})),e.listeners("newListener").slice(0).forEach((function(t){"onNewListener"==t.name&&/keypress/.test(t.toString())&&e.removeListener("newListener",t)}))),t}(e)){var t=i(576).StringDecoder;e._keypressDecoder=new t("utf8"),n(e,"keypress")>0?e.on("data",s):e.on("newListener",r)}function s(t){if(n(e,"keypress")>0){var i=e._keypressDecoder.write(t);i&&h(e,i)}else e.removeListener("data",s),e.on("newListener",r)}function r(t){"keypress"==t&&(e.on("data",s),e.removeListener("newListener",r))}};r.enableMouse=function(e){e.write("[?1000h")},r.disableMouse=function(e){e.write("[?1000l")};var n=s.listenerCount;n||(n=function(e,t){return e.listeners(t).length});var o=/^(?:\x1b)([a-zA-Z0-9])$/,a=/^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/;function h(e,t){var i,s,r={name:void 0,ctrl:!1,meta:!1,shift:!1};if(Buffer.isBuffer(t)&&(t[0]>127&&void 0===t[1]?(t[0]-=128,t=""+t.toString(e.encoding||"utf-8")):t=t.toString(e.encoding||"utf-8")),r.sequence=t,"\r"===t)r.name="return";else if("\n"===t)r.name="enter";else if("\t"===t)r.name="tab";else if("\b"===t||""===t||""===t||"\b"===t)r.name="backspace",r.meta=""===t.charAt(0);else if(""===t||""===t)r.name="escape",r.meta=2===t.length;else if(" "===t||" "===t)r.name="space",r.meta=2===t.length;else if(t<="")r.name=String.fromCharCode(t.charCodeAt(0)+"a".charCodeAt(0)-1),r.ctrl=!0;else if(1===t.length&&t>="a"&&t<="z")r.name=t;else if(1===t.length&&t>="A"&&t<="Z")r.name=t.toLowerCase(),r.shift=!0;else if(s=o.exec(t))r.name=s[1].toLowerCase(),r.meta=!0,r.shift=/^[A-Z]$/.test(s[1]);else if(s=a.exec(t)){var n=(s[1]||"")+(s[2]||"")+(s[4]||"")+(s[6]||""),c=(s[3]||s[5]||1)-1;switch(r.ctrl=!!(4&c),r.meta=!!(10&c),r.shift=!!(1&c),r.code=n,n){case"OP":case"[11~":case"[[A":r.name="f1";break;case"OQ":case"[12~":case"[[B":r.name="f2";break;case"OR":case"[13~":case"[[C":r.name="f3";break;case"OS":case"[14~":case"[[D":r.name="f4";break;case"[[E":case"[15~":r.name="f5";break;case"[17~":r.name="f6";break;case"[18~":r.name="f7";break;case"[19~":r.name="f8";break;case"[20~":r.name="f9";break;case"[21~":r.name="f10";break;case"[23~":r.name="f11";break;case"[24~":r.name="f12";break;case"[A":case"OA":r.name="up";break;case"[B":case"OB":r.name="down";break;case"[C":case"OC":r.name="right";break;case"[D":case"OD":r.name="left";break;case"[E":case"OE":r.name="clear";break;case"[F":case"OF":case"[4~":case"[8~":r.name="end";break;case"[H":case"OH":case"[1~":case"[7~":r.name="home";break;case"[2~":r.name="insert";break;case"[3~":r.name="delete";break;case"[5~":case"[[5~":r.name="pageup";break;case"[6~":case"[[6~":r.name="pagedown";break;case"[a":r.name="up",r.shift=!0;break;case"[b":r.name="down",r.shift=!0;break;case"[c":r.name="right",r.shift=!0;break;case"[d":r.name="left",r.shift=!0;break;case"[e":r.name="clear",r.shift=!0;break;case"[2$":r.name="insert",r.shift=!0;break;case"[3$":r.name="delete",r.shift=!0;break;case"[5$":r.name="pageup",r.shift=!0;break;case"[6$":r.name="pagedown",r.shift=!0;break;case"[7$":r.name="home",r.shift=!0;break;case"[8$":r.name="end",r.shift=!0;break;case"Oa":r.name="up",r.ctrl=!0;break;case"Ob":r.name="down",r.ctrl=!0;break;case"Oc":r.name="right",r.ctrl=!0;break;case"Od":r.name="left",r.ctrl=!0;break;case"Oe":r.name="clear",r.ctrl=!0;break;case"[2^":r.name="insert",r.ctrl=!0;break;case"[3^":r.name="delete",r.ctrl=!0;break;case"[5^":r.name="pageup",r.ctrl=!0;break;case"[6^":r.name="pagedown",r.ctrl=!0;break;case"[7^":r.name="home",r.ctrl=!0;break;case"[8^":r.name="end",r.ctrl=!0;break;case"[Z":r.name="tab",r.shift=!0;break;default:r.name="undefined"}}else if(t.length>1&&""!==t[0])return void Array.prototype.forEach.call(t,(function(t){h(e,t)}));if("[M"==r.code){r.name="mouse";var l=(t=r.sequence).charCodeAt(3);r.x=t.charCodeAt(4)-32,r.y=t.charCodeAt(5)-32,r.scroll=0,r.ctrl=!!(16&l),r.meta=!!(8&l),r.shift=!!(4&l),r.release=3==(3&l),64&l&&(r.scroll=1&l?1:-1),r.release||r.scroll||(r.button=3&l)}void 0===r.name&&(r=void 0),1===t.length&&(i=t),r&&"mouse"==r.name?e.emit("mousepress",r):(r||i)&&e.emit("keypress",i,r)}},38:e=>{"use strict";e.exports=require("uiohook-napi")},361:e=>{"use strict";e.exports=require("events")},673:e=>{"use strict";e.exports=require("node:events")},576:e=>{"use strict";e.exports=require("string_decoder")},364:(e,t,i)=>{"use strict";i.a(e,(async(e,t)=>{try{var s,r,n=i(6),o=i(309),a=i(459),h=i(673);try{({uIOhook:s,UiohookKey:r}=await Promise.resolve().then(i.t.bind(i,38,19)))}catch{s=new h.EventEmitter}var c=!1,l=[],p=0;const u=10,m=10;var d=0;const v={lock:500};var b=[n.ZP.inverse.white,n.ZP.inverse.cyan,n.ZP.inverse.yellow,n.ZP.inverse.magenta,n.ZP.inverse.green,n.ZP.inverse.red,n.ZP.inverse.blue,n.ZP.hex("#FFA500").inverse,n.ZP.inverse.grey],g=[n.ZP.inverse.whiteBright,n.ZP.inverse.cyanBright,n.ZP.inverse.yellowBright,n.ZP.inverse.magentaBright,n.ZP.inverse.greenBright,n.ZP.inverse.redBright,n.ZP.inverse.blueBright,n.ZP.hex("#FFD380").inverse,n.ZP.inverse.grey];o.Z.prototype.toString=function(){for(var e="",t=0;t<this.board.length;t++)if(!(t<f.length-1)){for(var i=0;i<this.board[t].length;i++)if(this.piece&&this.piece.x<=i&&i<this.piece.x+this.piece.tetro.length&&this.board.length-this.piece.y-1<=t&&t<this.board.length-this.piece.y-1+this.piece.tetro.length&&0!==this.piece.tetro[t-(this.board.length-this.piece.y-1)][i-this.piece.x]){if(Math.floor(this.elapsed/100)%2==0&&(this.piece.tSpin||this.piece.miniTSpin)){e+="  ";continue}e+=b[this.piece.tetro[t-(this.board.length-this.piece.y-1)][i-this.piece.x]]("  ")}else this.piece&&this.piece.x<=i&&i<this.piece.x+this.piece.tetro.length&&this.board.length-this.piece.y+this.piece.getDrop(20)-1<=t&&t<this.board.length-this.piece.y+this.piece.getDrop(20)-1+this.piece.tetro.length&&0!==this.piece.tetro[t-(this.board.length-this.piece.y+this.piece.getDrop(20)-1)][i-this.piece.x]&&0!==this.piece.getDrop(20)?e+=g[this.piece.tetro[t-(this.board.length-this.piece.y+this.piece.getDrop(20)-1)][i-this.piece.x]]("  "):e+=b[this.board[t][i]]("  ");e+=(t==this.length-1?"\n"+"-".repeat(this.width):"")+"\n"}return e};var f=new o.Z(20,10,v);function y(e,t,i){for(var s="[",r=0;r<e;r++)Math.floor(e*t/i)>=r?s+="=":s+=" ";return s+"]"}f.nextPiece(),f.setLevel(m),process.stdin.setRawMode(!0),a(process.stdin),process.stdin.on("keypress",((e,t)=>{if(t){switch(t.name){case"a":case"left":f.piece.shift(-1);break;case"d":case"right":f.piece.shift(1);break;case"s":case"down":f.gameOver&&(d=Math.min(d+1,1)),c=!0;break;case"space":f.hardDrop();break;case"z":f.rotCCW();break;case"w":case"up":case"x":f.gameOver&&(d=Math.max(d-1,0)),f.rotCC();break;case"c":f.holdPiece();break;case"r":(f=new o.Z(20,10,v)).nextPiece(),f.setLevel(m);break;case"enter":console.log("enter"),f.gameOver&&(0==d?((f=new o.Z(20,10,v)).nextPiece(),f.setLevel(m)):process.exit(0))}"c"==t.name&&t.ctrl&&process.exit(0),process.stdout.write("\b")}})),s.on("keyup",(e=>{if(e)switch(e.keycode){case r.S:case r.ArrowDown:c=!1}})),s.start(),setInterval((()=>{if(process.stdout.cursorTo(0,0),p+=u,l=l.filter((e=>e[1]+1e3>p)),console.clear(),f.gameOver)return console.log(`Game Over \nScore: ${f.score}\nLines Cleared: ${f.linesCleared}\nLevel Reached: ${f.level}\n\n${0==d?n.ZP.inverse.whiteBright("Restart"):"Restart"}\n${1==d?n.ZP.inverse.whiteBright("Quit"):"Quit"}`);f.update(u,c);for(var e=0;e<f.lastStates.length;e++){var t=f.lastStates.shift(),i="";1&t.flags?i+="T-spin ":2&t.flags&&(i+="Mini T-Spin "),""!=(i+=["","Single ","Double ","Triple ","Tetris "][t.lines]+(0!==t.scoreIncrease?`(+${4&t.flags?t.scoreIncrease*(2/3):t.scoreIncrease})`:""))&&l.push([i,p]),4&t.flags&&0!==t.lines&&l.push([`Back to Back (+${t.scoreIncrease*(1/3)})`,p])}let s=[];for(let e=0;e<f.next.length;e++)s.push(f.next[e].name);console.log(f.toString()+"Next: "+s.join(",")+"\nHold: "+(null==f.hold?"N/A":f.hold.name)+"\nLevel: "+f.level+` (${f.dropRate} ms/cell)\nLines Cleared: `+f.linesCleared+"\nScore: "+f.score.toString()+"\n "+" *".repeat(f.piece.moves>0?f.piece.moves:0)+`\n${y(31,f.piece.lock,f.lockDelay)} ${f.lockDelay}ms`+`\n${l.reduce(((e,t)=>e+"\n"+t[0]),"")}`)}),u),t()}catch(k){t(k)}}),1)},309:(e,t,i)=>{"use strict";i.d(t,{Z:()=>l});const s=[400,800,1200,1600],r=[0,100,300,500,800],n=[100,200],o=[[[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[1,0],[1,-1],[0,2],[1,2]],[[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]]],a=[{name:"I",x:2,y:22,tetro:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],kick:[[[0,0],[-1,0],[2,0],[-1,0],[2,0]],[[-1,0],[0,0],[0,0],[0,1],[0,-2]],[[-1,1],[1,1],[-2,1],[1,0],[-2,0]],[[0,1],[0,1],[0,1],[0,-1],[0,2]]]},{name:"O",x:3,y:21,tetro:[[0,2,2],[0,2,2],[0,0,0]],kick:[[[0,0]],[[0,-1]],[[-1,-1]],[[-1,0]]]},{name:"T",x:3,y:21,tetro:[[0,3,0],[3,3,3],[0,0,0]],kick:o},{name:"S",x:3,y:21,tetro:[[0,4,4],[4,4,0],[0,0,0]],kick:o},{name:"Z",x:3,y:21,tetro:[[5,5,0],[0,5,5],[0,0,0]],kick:o},{name:"J",x:3,y:21,tetro:[[6,0,0],[6,6,6],[0,0,0]],kick:o},{name:"L",x:3,y:21,tetro:[[0,0,7],[7,7,7],[0,0,0]],kick:o}];class h{constructor({x:e,y:t,tetro:i,kick:s,name:r},n){this.miniTSpin=!1,this.tSpin=!1,this.name=r,this.board=n,this.pos=0,this.x=e,this.y=t,this.origX=e,this.origY=t,this.tetro=i,this.kick=s,this.lock=n.lockDelay,this.moves=15,this.moved=!1,this.lowestLine=t}rotate(e){const t=[[[0,0],[2,0],[0,2],[2,2]],[[0,2],[2,2],[0,0],[2,0]],[[2,2],[0,2],[2,0],[0,0]],[[0,2],[0,0],[2,2],[2,0]]];this.moved=!0,this.moves--;var i=[];if(e)for(var s=0;s<this.tetro.length;s++){i[s]=[];for(var r=0;r<this.tetro[s].length;r++)i[s][r]=this.tetro[r][this.tetro.length-s-1]}else for(s=0;s<this.tetro.length;s++)for(i[s]=[],r=0;r<this.tetro[s].length;r++)i[s][r]=this.tetro[this.tetro.length-r-1][s];for(var n=this.pos,o=(this.pos+(e?3:1))%4,a=0;a<this.kick[0].length;a++)if(this.board.moveValid(this.x+this.kick[n][a][0]-this.kick[o][a][0],this.y+this.kick[n][a][1]-this.kick[o][a][1],i))return this.x+=this.kick[n][a][0]-this.kick[o][a][0],this.y+=this.kick[n][a][1]-this.kick[o][a][1],this.tetro=i,this.pos=o,"T"==this.name&&(this.tSpin=0!==this.board.board[t[this.pos][0][1]+(this.board.board.length-this.y-1)][t[this.pos][0][0]+this.x]&&0!==this.board.board[t[this.pos][1][1]+(this.board.board.length-this.y-1)][t[this.pos][1][0]+this.x]&&(0!==this.board.board[t[this.pos][2][1]+(this.board.board.length-this.y-1)][t[this.pos][2][0]+this.x]||0!==this.board.board[t[this.pos][3][1]+(this.board.board.length-this.y-1)][t[this.pos][3][0]+this.x]),this.miniTSpin=0!==this.board.board[t[this.pos][3][1]+(this.board.board.length-this.y-1)][t[this.pos][3][0]+this.x]&&0!==this.board.board[t[this.pos][2][1]+(this.board.board.length-this.y-1)][t[this.pos][2][0]+this.x]&&(0!==this.board.board[t[this.pos][1][1]+(this.board.board.length-this.y-1)][t[this.pos][1][0]+this.x]||0!==this.board.board[t[this.pos][0][1]+(this.board.board.length-this.y-1)][t[this.pos][0][0]+this.x])),!0;return!1}getDrop(e=0){for(var t=1;t<=e&&this.board.moveValid(this.x,this.y-t,this.tetro);t++);return t-1}stepDown(e=1){return this.y-=this.getDrop(e)}hardDrop(){this.y-=this.getDrop(20),this.board.addPiece(this)}shift(e=0){return this.moved=!0,this.moves--,!!this.board.moveValid(this.x+e,this.y,this.tetro)&&(this.x+=e,!0)}}class c{seed=0;constructor(e){this.seed=e}Next(){this.seed++;let e=15485863*this.seed;return e*e*e%2038074743/2038074743}}class l{constructor(e,t,{seed:i=Date.now(),lock:s=500}={}){this.holded=!1,this.gameOver=!1,this.lockDelay=s,this.lastStates=[],this.b2b=!1,this.score=0,this.elapsed=0,this.dropRate=1,this.secsRemaining=1,this.board=Array(2*e).fill().map((()=>Array(t).fill(0))),this.piece=null,this.length=e,this.width=t,this.rng=new c(i),this.hold=null,this.level=1,this.linesCleared=0;var r=a.slice();r.sort((()=>.5-this.rng.Next())),this.bag=r,this.next=[];for(var n=0;n<5;n++)this.next.push(this.bag.shift())}newBag(){var e=a.slice();e.sort((()=>.5-this.rng.Next())),this.bag=e}update(e,t){this.elapsed+=e,this.secsRemaining-=t?20*e:e;var i=0;if(this.secsRemaining<=0)for(;this.secsRemaining<=0;this.secsRemaining+=this.dropRate)i++;if(this.piece.stepDown(i),this.piece.y<this.piece.lowestLine&&(this.piece.moves=15),this.piece.lowestLine=this.piece.y<this.piece.lowestLine?this.piece.y:this.piece.lowestLine,!this.moveValid(this.piece.x,this.piece.y-1,this.piece.tetro)){if(this.piece.lock-=e,this.piece.moves<0)return this.addPiece(this.piece);if(this.piece.moved&&(this.piece.moved=!1,this.piece.lock=this.lockDelay),this.piece.lock<=0)return this.addPiece(this.piece)}return this.lastStates.push({lines:0,flags:0,scoreIncrease:0}),{lines:0,flags:0,scoreIncrease:0}}nextPiece(){for(var e=[],t=0;t<5;t++)e.push(this.next[t].tetro[1][1]);for(e=[],t=0;t<this.bag.length;t++)e.push(this.bag[t].tetro[1][1]);var i=this.next.shift();this.piece=new h(i,this),0==this.bag.length&&this.newBag(),this.next.push(this.bag.shift())}hardDrop(){return this.piece.hardDrop()}rotCCW(){return this.piece.rotate(!0)}rotCC(){return this.piece.rotate()}holdPiece(){if(!this.holded)if(null==this.hold){for(this.piece.x=this.piece.origX,this.piece.y=this.piece.origY;0!==this.piece.pos;)this.piece.rotate();this.hold=this.piece,this.nextPiece()}else{for(this.piece.x=this.piece.origX,this.piece.y=this.piece.origY;0!==this.piece.pos;)this.piece.rotate();var e=new h(this.piece,this),t=new h(this.hold,this);this.piece=t,this.hold=e}}setLevel(e=1){return this.level=e,this.secsRemaining=1e3*(.8-.007*(e-1))**(e-1),this.dropRate=1e3*(.8-.007*(e-1))**(e-1)}addPiece(e){this.holded=!1;for(var t=0;t<e.tetro.length;t++)for(var i=0;i<e.tetro[t].length;i++)0!==e.tetro[t][i]&&(this.board[t+(this.board.length-e.y-1)][i+e.x]=e.tetro[t][i]);var o=0;for(t=0;t<this.board.length;t++)this.board[t].every((e=>0!==e))&&(this.board.splice(t,1),this.board.unshift(Array(this.width).fill(0)),o++,this.linesCleared++,Math.floor(this.linesCleared/10)>this.level-1&&this.setLevel(++this.level));var a=0;this.nextPiece(),e.tSpin?a+=s[o]*(this.b2b&&0!==o?1.5:1)*this.level:e.miniTSpin?a+=n[o]*(this.b2b&&0!==o?1.5:1)*this.level:0!==o&&(a+=r[o]*(this.b2b&&4==o?1.5:1)*this.level),this.score+=a;var h=this.b2b;for((e.tSpin||e.miniTSpin||4==o)&&0!==o?this.b2b=!0:0!==o&&(this.b2b=h=!1),this.moveValid(this.piece.x,this.piece.y,this.piece.tetro)||(this.gameOver=!0),t=e.tetro.length-1;t==e.tetro.length-1||e.tetro[t+1].every((e=>0==e));){for(i=0;i<e.tetro.length;i++)console.log(t+(this.board.length-e.y-1),e.y),t+(this.board.length-e.y-1)<this.length&&0!==e.tetro[t][i]&&(this.gameOver=!0);t--}return this.lastStates.push({lines:o,flags:e.tSpin<<0|e.miniTSpin<<1|h<<2|this.gameOver<<3,scoreIncrease:a}),{lines:o,flags:e.tSpin<<0|e.miniTSpin<<1|h<<2|this.gameOver<<3,scoreIncrease:a}}toString(){for(var e="",t=0;t<this.board.length;t++){for(var i=0;i<this.board[t].length;i++)this.piece&&this.piece.x<=i&&i<this.piece.x+this.piece.tetro.length&&this.board.length-this.piece.y-1<=t&&t<this.board.length-this.piece.y-1+this.piece.tetro.length?e+=this.piece.tetro[t-(this.board.length-this.piece.y-1)][i-this.piece.x]:e+=this.board[t][i];e+=(t==this.length-1?"\n"+"-".repeat(this.width):"")+"\n"}return e}moveValid(e,t,i){for(var s=this.board.length-t-1;s<i.length+this.board.length-t-1;s++)for(var r=e;r<i[0].length+e;r++){if(0!==i[s-this.board.length+t+1][r-e]&&(s>=this.board.length||r>=this.width))return!1;if(!(s>=this.board.length||r>=this.width)&&0!==this.board[s][r]&&0!==i[s-this.board.length+t+1][r-e])return!1}return!0}}},6:(e,t,i)=>{"use strict";i.d(t,{ZP:()=>B});const s=(e=0)=>t=>`[${t+e}m`,r=(e=0)=>t=>`[${38+e};5;${t}m`,n=(e=0)=>(t,i,s)=>`[${38+e};2;${t};${i};${s}m`,o={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};Object.keys(o.modifier),Object.keys(o.color),Object.keys(o.bgColor);const a=function(){const e=new Map;for(const[t,i]of Object.entries(o)){for(const[t,s]of Object.entries(i))o[t]={open:`[${s[0]}m`,close:`[${s[1]}m`},i[t]=o[t],e.set(s[0],s[1]);Object.defineProperty(o,t,{value:i,enumerable:!1})}return Object.defineProperty(o,"codes",{value:e,enumerable:!1}),o.color.close="[39m",o.bgColor.close="[49m",o.color.ansi=s(),o.color.ansi256=r(),o.color.ansi16m=n(),o.bgColor.ansi=s(10),o.bgColor.ansi256=r(10),o.bgColor.ansi16m=n(10),Object.defineProperties(o,{rgbToAnsi256:{value:(e,t,i)=>e===t&&t===i?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(t/255*5)+Math.round(i/255*5),enumerable:!1},hexToRgb:{value(e){const t=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!t)return[0,0,0];let[i]=t;3===i.length&&(i=[...i].map((e=>e+e)).join(""));const s=Number.parseInt(i,16);return[s>>16&255,s>>8&255,255&s]},enumerable:!1},hexToAnsi256:{value:e=>o.rgbToAnsi256(...o.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return e-8+90;let t,i,s;if(e>=232)t=(10*(e-232)+8)/255,i=t,s=t;else{const r=(e-=16)%36;t=Math.floor(e/36)/5,i=Math.floor(r/6)/5,s=r%6/5}const r=2*Math.max(t,i,s);if(0===r)return 30;let n=30+(Math.round(s)<<2|Math.round(i)<<1|Math.round(t));return 2===r&&(n+=60),n},enumerable:!1},rgbToAnsi:{value:(e,t,i)=>o.ansi256ToAnsi(o.rgbToAnsi256(e,t,i)),enumerable:!1},hexToAnsi:{value:e=>o.ansi256ToAnsi(o.hexToAnsi256(e)),enumerable:!1}}),o}(),h=require("node:process"),c=require("node:os"),l=require("node:tty");function p(e,t=h.argv){const i=e.startsWith("-")?"":1===e.length?"-":"--",s=t.indexOf(i+e),r=t.indexOf("--");return-1!==s&&(-1===r||s<r)}const{env:d}=h;let b;function g(e,t={}){return 0!==(i=function(e,{streamIsTTY:t,sniffFlags:i=!0}={}){const s=function(){if("FORCE_COLOR"in d)return"true"===d.FORCE_COLOR?1:"false"===d.FORCE_COLOR?0:0===d.FORCE_COLOR.length?1:Math.min(Number.parseInt(d.FORCE_COLOR,10),3)}();void 0!==s&&(b=s);const r=i?b:s;if(0===r)return 0;if(i){if(p("color=16m")||p("color=full")||p("color=truecolor"))return 3;if(p("color=256"))return 2}if(e&&!t&&void 0===r)return 0;const n=r||0;if("dumb"===d.TERM)return n;if("win32"===h.platform){const e=c.release().split(".");return Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in d)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE","DRONE"].some((e=>e in d))||"codeship"===d.CI_NAME?1:n;if("TEAMCITY_VERSION"in d)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(d.TEAMCITY_VERSION)?1:0;if("TF_BUILD"in d&&"AGENT_NAME"in d)return 1;if("truecolor"===d.COLORTERM)return 3;if("TERM_PROGRAM"in d){const e=Number.parseInt((d.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(d.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(d.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(d.TERM)||"COLORTERM"in d?1:n}(e,{streamIsTTY:e&&e.isTTY,...t}))&&{level:i,hasBasic:!0,has256:i>=2,has16m:i>=3};var i}p("no-color")||p("no-colors")||p("color=false")||p("color=never")?b=0:(p("color")||p("colors")||p("color=true")||p("color=always"))&&(b=1);const f={stdout:g({isTTY:l.isatty(1)}),stderr:g({isTTY:l.isatty(2)})};function u(e,t,i){let s=e.indexOf(t);if(-1===s)return e;const r=t.length;let n=0,o="";do{o+=e.slice(n,s)+t+i,n=s+r,s=e.indexOf(t,n)}while(-1!==s);return o+=e.slice(n),o}const{stdout:m,stderr:v}=f,y=Symbol("GENERATOR"),k=Symbol("STYLER"),x=Symbol("IS_EMPTY"),O=["ansi","ansi","ansi256","ansi16m"],w=Object.create(null);function T(e){return(e=>{const t=(...e)=>e.join(" ");return((e,t={})=>{if(t.level&&!(Number.isInteger(t.level)&&t.level>=0&&t.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");const i=m?m.level:0;e.level=void 0===t.level?i:t.level})(t,e),Object.setPrototypeOf(t,T.prototype),t})(e)}Object.setPrototypeOf(T.prototype,Function.prototype);for(const[e,t]of Object.entries(a))w[e]={get(){const i=A(this,R(t.open,t.close,this[k]),this[x]);return Object.defineProperty(this,e,{value:i}),i}};w.visible={get(){const e=A(this,this[k],!0);return Object.defineProperty(this,"visible",{value:e}),e}};const C=(e,t,i,...s)=>"rgb"===e?"ansi16m"===t?a[i].ansi16m(...s):"ansi256"===t?a[i].ansi256(a.rgbToAnsi256(...s)):a[i].ansi(a.rgbToAnsi(...s)):"hex"===e?C("rgb",t,i,...a.hexToRgb(...s)):a[i][e](...s),P=["rgb","hex","ansi256"];for(const e of P)w[e]={get(){const{level:t}=this;return function(...i){const s=R(C(e,O[t],"color",...i),a.color.close,this[k]);return A(this,s,this[x])}}},w["bg"+e[0].toUpperCase()+e.slice(1)]={get(){const{level:t}=this;return function(...i){const s=R(C(e,O[t],"bgColor",...i),a.bgColor.close,this[k]);return A(this,s,this[x])}}};const S=Object.defineProperties((()=>{}),{...w,level:{enumerable:!0,get(){return this[y].level},set(e){this[y].level=e}}}),R=(e,t,i)=>{let s,r;return void 0===i?(s=e,r=t):(s=i.openAll+e,r=t+i.closeAll),{open:e,close:t,openAll:s,closeAll:r,parent:i}},A=(e,t,i)=>{const s=(...e)=>_(s,1===e.length?""+e[0]:e.join(" "));return Object.setPrototypeOf(s,S),s[y]=e,s[k]=t,s[x]=i,s},_=(e,t)=>{if(e.level<=0||!t)return e[x]?"":t;let i=e[k];if(void 0===i)return t;const{openAll:s,closeAll:r}=i;if(t.includes(""))for(;void 0!==i;)t=u(t,i.close,i.open),i=i.parent;const n=t.indexOf("\n");return-1!==n&&(t=function(e,t,i,s){let r=0,n="";do{const o="\r"===e[s-1];n+=e.slice(r,o?s-1:s)+t+(o?"\r\n":"\n")+i,r=s+1,s=e.indexOf("\n",r)}while(-1!==s);return n+=e.slice(r),n}(t,r,s,n)),s+t+r};Object.defineProperties(T.prototype,w);const E=T(),B=(T({level:v?v.level:0}),E)}},a={};function h(e){var t=a[e];if(void 0!==t)return t.exports;var i=a[e]={exports:{}};return o[e](i,i.exports,h),i.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",i="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",s=e=>{e&&!e.d&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},h.a=(r,n,o)=>{var a;o&&((a=[]).d=1);var h,c,l,p=new Set,d=r.exports,b=new Promise(((e,t)=>{l=t,c=e}));b[t]=d,b[e]=e=>(a&&e(a),p.forEach(e),b.catch((e=>{}))),r.exports=b,n((r=>{var n;h=(r=>r.map((r=>{if(null!==r&&"object"==typeof r){if(r[e])return r;if(r.then){var n=[];n.d=0,r.then((e=>{o[t]=e,s(n)}),(e=>{o[i]=e,s(n)}));var o={};return o[e]=e=>e(n),o}}var a={};return a[e]=e=>{},a[t]=r,a})))(r);var o=()=>h.map((e=>{if(e[i])throw e[i];return e[t]})),c=new Promise((t=>{(n=()=>t(o)).r=0;var i=e=>e!==a&&!p.has(e)&&(p.add(e),e&&!e.d&&(n.r++,e.push(n)));h.map((t=>t[e](i)))}));return n.r?c:o()}),(e=>(e?l(b[i]=e):c(d),s(a)))),a&&(a.d=0)},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,h.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var i=Object.create(null);h.r(i);var s={};r=r||[null,n({}),n([]),n(n)];for(var o=2&t&&e;"object"==typeof o&&!~r.indexOf(o);o=n(o))Object.getOwnPropertyNames(o).forEach((t=>s[t]=()=>e[t]));return s.default=()=>e,h.d(i,s),i},h.d=(e,t)=>{for(var i in t)h.o(t,i)&&!h.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},h.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),h.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},h(364)})();