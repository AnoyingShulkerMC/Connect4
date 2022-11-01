(()=>{var e,t,s,i,r,n,o={459:(e,t,s)=>{var i=s(361).EventEmitter,r=e.exports=function(e){if(!function(e){var t=!!e._keypressDecoder;return t||(e.listeners("data").slice(0).forEach((function(t){"onData"==t.name&&/emitKey/.test(t.toString())&&e.removeListener("data",t)})),e.listeners("newListener").slice(0).forEach((function(t){"onNewListener"==t.name&&/keypress/.test(t.toString())&&e.removeListener("newListener",t)}))),t}(e)){var t=s(576).StringDecoder;e._keypressDecoder=new t("utf8"),n(e,"keypress")>0?e.on("data",i):e.on("newListener",r)}function i(t){if(n(e,"keypress")>0){var s=e._keypressDecoder.write(t);s&&c(e,s)}else e.removeListener("data",i),e.on("newListener",r)}function r(t){"keypress"==t&&(e.on("data",i),e.removeListener("newListener",r))}};r.enableMouse=function(e){e.write("[?1000h")},r.disableMouse=function(e){e.write("[?1000l")};var n=i.listenerCount;n||(n=function(e,t){return e.listeners(t).length});var o=/^(?:\x1b)([a-zA-Z0-9])$/,a=/^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/;function c(e,t){var s,i,r={name:void 0,ctrl:!1,meta:!1,shift:!1};if(Buffer.isBuffer(t)&&(t[0]>127&&void 0===t[1]?(t[0]-=128,t=""+t.toString(e.encoding||"utf-8")):t=t.toString(e.encoding||"utf-8")),r.sequence=t,"\r"===t)r.name="return";else if("\n"===t)r.name="enter";else if("\t"===t)r.name="tab";else if("\b"===t||""===t||""===t||"\b"===t)r.name="backspace",r.meta=""===t.charAt(0);else if(""===t||""===t)r.name="escape",r.meta=2===t.length;else if(" "===t||" "===t)r.name="space",r.meta=2===t.length;else if(t<="")r.name=String.fromCharCode(t.charCodeAt(0)+"a".charCodeAt(0)-1),r.ctrl=!0;else if(1===t.length&&t>="a"&&t<="z")r.name=t;else if(1===t.length&&t>="A"&&t<="Z")r.name=t.toLowerCase(),r.shift=!0;else if(i=o.exec(t))r.name=i[1].toLowerCase(),r.meta=!0,r.shift=/^[A-Z]$/.test(i[1]);else if(i=a.exec(t)){var n=(i[1]||"")+(i[2]||"")+(i[4]||"")+(i[6]||""),h=(i[3]||i[5]||1)-1;switch(r.ctrl=!!(4&h),r.meta=!!(10&h),r.shift=!!(1&h),r.code=n,n){case"OP":case"[11~":case"[[A":r.name="f1";break;case"OQ":case"[12~":case"[[B":r.name="f2";break;case"OR":case"[13~":case"[[C":r.name="f3";break;case"OS":case"[14~":case"[[D":r.name="f4";break;case"[[E":case"[15~":r.name="f5";break;case"[17~":r.name="f6";break;case"[18~":r.name="f7";break;case"[19~":r.name="f8";break;case"[20~":r.name="f9";break;case"[21~":r.name="f10";break;case"[23~":r.name="f11";break;case"[24~":r.name="f12";break;case"[A":case"OA":r.name="up";break;case"[B":case"OB":r.name="down";break;case"[C":case"OC":r.name="right";break;case"[D":case"OD":r.name="left";break;case"[E":case"OE":r.name="clear";break;case"[F":case"OF":case"[4~":case"[8~":r.name="end";break;case"[H":case"OH":case"[1~":case"[7~":r.name="home";break;case"[2~":r.name="insert";break;case"[3~":r.name="delete";break;case"[5~":case"[[5~":r.name="pageup";break;case"[6~":case"[[6~":r.name="pagedown";break;case"[a":r.name="up",r.shift=!0;break;case"[b":r.name="down",r.shift=!0;break;case"[c":r.name="right",r.shift=!0;break;case"[d":r.name="left",r.shift=!0;break;case"[e":r.name="clear",r.shift=!0;break;case"[2$":r.name="insert",r.shift=!0;break;case"[3$":r.name="delete",r.shift=!0;break;case"[5$":r.name="pageup",r.shift=!0;break;case"[6$":r.name="pagedown",r.shift=!0;break;case"[7$":r.name="home",r.shift=!0;break;case"[8$":r.name="end",r.shift=!0;break;case"Oa":r.name="up",r.ctrl=!0;break;case"Ob":r.name="down",r.ctrl=!0;break;case"Oc":r.name="right",r.ctrl=!0;break;case"Od":r.name="left",r.ctrl=!0;break;case"Oe":r.name="clear",r.ctrl=!0;break;case"[2^":r.name="insert",r.ctrl=!0;break;case"[3^":r.name="delete",r.ctrl=!0;break;case"[5^":r.name="pageup",r.ctrl=!0;break;case"[6^":r.name="pagedown",r.ctrl=!0;break;case"[7^":r.name="home",r.ctrl=!0;break;case"[8^":r.name="end",r.ctrl=!0;break;case"[Z":r.name="tab",r.shift=!0;break;default:r.name="undefined"}}else if(t.length>1&&""!==t[0])return void Array.prototype.forEach.call(t,(function(t){c(e,t)}));if("[M"==r.code){r.name="mouse";var l=(t=r.sequence).charCodeAt(3);r.x=t.charCodeAt(4)-32,r.y=t.charCodeAt(5)-32,r.scroll=0,r.ctrl=!!(16&l),r.meta=!!(8&l),r.shift=!!(4&l),r.release=3==(3&l),64&l&&(r.scroll=1&l?1:-1),r.release||r.scroll||(r.button=3&l)}void 0===r.name&&(r=void 0),1===t.length&&(s=t),r&&"mouse"==r.name?e.emit("mousepress",r):(r||s)&&e.emit("keypress",s,r)}},38:e=>{"use strict";e.exports=require("uiohook-napi")},361:e=>{"use strict";e.exports=require("events")},673:e=>{"use strict";e.exports=require("node:events")},576:e=>{"use strict";e.exports=require("string_decoder")},364:(e,t,s)=>{"use strict";s.a(e,(async(e,t)=>{try{var i,r,n=s(6),o=s(309),a=s(459),c=s(673),h=!1;try{({uIOhook:i,UiohookKey:r}=await Promise.resolve().then(s.t.bind(s,38,19))),h=!0}catch{(i=new c.EventEmitter).start=()=>{}}var l=!1,p=[],d=0;const m=50,v=10;var u=0;const y={lock:500};var b=[n.ZP.inverse.white,n.ZP.inverse.cyan,n.ZP.inverse.yellow,n.ZP.inverse.magenta,n.ZP.inverse.green,n.ZP.inverse.red,n.ZP.inverse.blue,n.ZP.hex("#FFA500").inverse,n.ZP.inverse.grey],f=[n.ZP.inverse.whiteBright,n.ZP.inverse.cyanBright,n.ZP.inverse.yellowBright,n.ZP.inverse.magentaBright,n.ZP.inverse.greenBright,n.ZP.inverse.redBright,n.ZP.inverse.blueBright,n.ZP.hex("#FFD380").inverse,n.ZP.inverse.grey],g=new o.Z(20,10,y);function k(e,t,s){for(var i="[",r=0;r<e;r++)Math.floor(e*t/s)>=r?i+="=":i+=" ";return i+"]"}async function x(){let e=[];for(let t=0;t<g.next.length;t++)e.push(g.next[t].name);process.stdout.cursorTo(0,0);for(var t=0;t<g.board.length;t++){var s="";if(!(t<g.length-1)){for(var i=0;i<g.board[t].length;i++)if(g.piece&&g.piece.x<=i&&i<g.piece.x+g.piece.tetro.length&&g.board.length-g.piece.y-1<=t&&t<g.board.length-g.piece.y-1+g.piece.tetro.length&&0!==g.piece.tetro[t-(g.board.length-g.piece.y-1)][i-g.piece.x]){if(Math.floor(g.elapsed/100)%2==0&&(g.piece.tSpin||g.piece.miniTSpin)){s+="  ";continue}s+=b[g.piece.tetro[t-(g.board.length-g.piece.y-1)][i-g.piece.x]]("  ")}else g.piece&&g.piece.x<=i&&i<g.piece.x+g.piece.tetro.length&&g.board.length-g.piece.y+g.piece.getDrop(20)-1<=t&&t<g.board.length-g.piece.y+g.piece.getDrop(20)-1+g.piece.tetro.length&&0!==g.piece.tetro[t-(g.board.length-g.piece.y+g.piece.getDrop(20)-1)][i-g.piece.x]&&0!==g.piece.getDrop(20)?s+=f[g.piece.tetro[t-(g.board.length-g.piece.y+g.piece.getDrop(20)-1)][i-g.piece.x]]("  "):t<g.length&&0==g.board[t][i]?s+="  ":s+=b[g.board[t][i]]("  ");process.stdout.clearLine(0),process.stdout.write(s),process.stdout.cursorTo(0),process.stdout.moveCursor(0,1)}}process.stdout.clearScreenDown(),process.stdout.write("Next: "+e.join(",")+"\nHold: "+(null==g.hold?"N/A":g.hold.name)+"\nLevel: "+g.level+` (${g.dropRate} ms/cell)\nLines Cleared: `+g.linesCleared+"\nScore: "+g.score.toString()+"\n "+" *".repeat(g.piece.moves>0?g.piece.moves:0)+`\n${k(31,g.piece.lock,g.lockDelay)} ${g.lockDelay}ms`+`\n${p.reduce(((e,t)=>e+"\n"+t[0]),"")}`)}g.nextPiece(),g.setLevel(v),process.stdin.setRawMode(!0),a(process.stdin),process.stdin.on("keypress",((e,t)=>{if(t){switch(t.name){case"a":case"left":g.piece.shift(-1);break;case"d":case"right":g.piece.shift(1);break;case"s":case"down":g.gameOver&&(u=Math.min(u+1,1)),l=!0;break;case"space":if(g.gameOver){if(0==u)return(g=new o.Z(20,10,y)).nextPiece(),g.setLevel(v);process.exit(0)}g.hardDrop();break;case"z":g.rotCCW();break;case"w":case"up":case"x":g.gameOver&&(u=Math.max(u-1,0)),g.rotCC();break;case"c":g.holdPiece();break;case"r":(g=new o.Z(20,10,y)).nextPiece(),g.setLevel(v)}"c"==t.name&&t.ctrl&&process.exit(0)}})),process.on("exit",(e=>{process.stdout.write("[?25h")})),i.on("keyup",(e=>{if(e)switch(e.keycode){case r.S:case r.ArrowDown:l=!1}})),i.start(),process.stdout.write("[?25l"),setInterval((async()=>{if(process.stdout.cursorTo(0,0),d+=m,p=p.filter((e=>e[1]+1e3>d)),g.gameOver)return console.log(`Game Over \nScore: ${g.score}\nLines Cleared: ${g.linesCleared}\nLevel Reached: ${g.level}\nPress [SPACE] to select\n\n${0==u?n.ZP.inverse.whiteBright("Restart"):"Restart"}\n${1==u?n.ZP.inverse.whiteBright("Quit"):"Quit"}`);g.update(m,l),h||(l=!1);for(var e=0;e<g.lastStates.length;e++){var t=g.lastStates.shift(),s="";1&t.flags?s+="T-spin ":2&t.flags&&(s+="Mini T-Spin "),""!=(s+=["","Single ","Double ","Triple ","Tetris "][t.lines]+(0!==t.scoreIncrease?`(+${4&t.flags&&0!==t.lines?t.scoreIncrease*(2/3):t.scoreIncrease})`:""))&&p.push([s,d]),4&t.flags&&0!==t.lines&&p.push([`Back to Back (+${t.scoreIncrease*(1/3)})`,d])}x()}),m),t()}catch(O){t(O)}}),1)},309:(e,t,s)=>{"use strict";s.d(t,{Z:()=>l});const i=[400,800,1200,1600],r=[0,100,300,500,800],n=[100,200],o=[[[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[1,0],[1,-1],[0,2],[1,2]],[[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]]],a=[{name:"I",x:2,y:22,tetro:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],kick:[[[0,0],[-1,0],[2,0],[-1,0],[2,0]],[[-1,0],[0,0],[0,0],[0,1],[0,-2]],[[-1,1],[1,1],[-2,1],[1,0],[-2,0]],[[0,1],[0,1],[0,1],[0,-1],[0,2]]]},{name:"O",x:3,y:21,tetro:[[0,2,2],[0,2,2],[0,0,0]],kick:[[[0,0]],[[0,-1]],[[-1,-1]],[[-1,0]]]},{name:"T",x:3,y:21,tetro:[[0,3,0],[3,3,3],[0,0,0]],kick:o},{name:"S",x:3,y:21,tetro:[[0,4,4],[4,4,0],[0,0,0]],kick:o},{name:"Z",x:3,y:21,tetro:[[5,5,0],[0,5,5],[0,0,0]],kick:o},{name:"J",x:3,y:21,tetro:[[6,0,0],[6,6,6],[0,0,0]],kick:o},{name:"L",x:3,y:21,tetro:[[0,0,7],[7,7,7],[0,0,0]],kick:o}];class c{constructor({x:e,y:t,tetro:s,kick:i,name:r},n){this.miniTSpin=!1,this.tSpin=!1,this.name=r,this.board=n,this.pos=0,this.x=e,this.y=t,this.origX=e,this.origY=t,this.tetro=s,this.kick=i,this.lock=n.lockDelay,this.moves=15,this.moved=!1,this.lowestLine=t}rotate(e){const t=[[[0,0],[2,0],[0,2],[2,2]],[[0,2],[2,2],[0,0],[2,0]],[[2,2],[0,2],[2,0],[0,0]],[[0,2],[0,0],[2,2],[2,0]]];this.moved=!0,this.moves--;var s=[];if(e)for(var i=0;i<this.tetro.length;i++){s[i]=[];for(var r=0;r<this.tetro[i].length;r++)s[i][r]=this.tetro[r][this.tetro.length-i-1]}else for(i=0;i<this.tetro.length;i++)for(s[i]=[],r=0;r<this.tetro[i].length;r++)s[i][r]=this.tetro[this.tetro.length-r-1][i];for(var n=this.pos,o=(this.pos+(e?3:1))%4,a=0;a<this.kick[0].length;a++)if(this.board.moveValid(this.x+this.kick[n][a][0]-this.kick[o][a][0],this.y+this.kick[n][a][1]-this.kick[o][a][1],s))return this.x+=this.kick[n][a][0]-this.kick[o][a][0],this.y+=this.kick[n][a][1]-this.kick[o][a][1],this.tetro=s,this.pos=o,"T"==this.name&&(this.tSpin=this.board.containsPiece(this.x,this.y,t[this.pos][0][0],t[this.pos][0][1])&&this.board.containsPiece(this.x,this.y,t[this.pos][1][0],t[this.pos][1][1])&&(this.board.containsPiece(this.x,this.y,t[this.pos][2][0],t[this.pos][2][1])||this.board.containsPiece(this.x,this.y,t[this.pos][3][0],t[this.pos][3][1])),this.miniTSpin=this.board.containsPiece(this.x,this.y,t[this.pos][3][0],t[this.pos][3][1])&&this.board.containsPiece(this.x,this.y,t[this.pos][2][0],t[this.pos][2][1])&&(this.board.containsPiece(this.x,this.y,t[this.pos][1][0],t[this.pos][1][1])||this.board.containsPiece(this.x,this.y,t[this.pos][0][0],t[this.pos][0][1]))),!0;return!1}getDrop(e=0){for(var t=1;t<=e&&this.board.moveValid(this.x,this.y-t,this.tetro);t++);return t-1}stepDown(e=1){return this.y-=this.getDrop(e)}hardDrop(){this.y-=this.getDrop(20),this.board.addPiece(this)}shift(e=0){return this.moved=!0,this.moves--,!!this.board.moveValid(this.x+e,this.y,this.tetro)&&(this.x+=e,!0)}}class h{seed=0;constructor(e){this.seed=e}Next(){this.seed++;let e=15485863*this.seed;return e*e*e%2038074743/2038074743}}class l{constructor(e,t,{seed:s=Date.now(),lock:i=500}={}){this.holded=!1,this.gameOver=!1,this.lockDelay=i,this.lastStates=[],this.b2b=!1,this.score=0,this.elapsed=0,this.dropRate=1,this.secsRemaining=1,this.board=Array(2*e).fill().map((()=>Array(t).fill(0))),this.piece=null,this.length=e,this.width=t,this.rng=new h(s),this.hold=null,this.level=1,this.linesCleared=0;var r=a.slice();r.sort((()=>.5-this.rng.Next())),this.bag=r,this.next=[];for(var n=0;n<5;n++)this.next.push(this.bag.shift())}newBag(){var e=a.slice();e.sort((()=>.5-this.rng.Next())),this.bag=e}update(e,t){this.elapsed+=e,this.secsRemaining-=t?20*e:e;var s=0;if(this.secsRemaining<=0)for(;this.secsRemaining<=0;this.secsRemaining+=this.dropRate)s++;if(this.piece.stepDown(s),this.piece.y<this.piece.lowestLine&&(this.piece.moves=15),this.piece.lowestLine=this.piece.y<this.piece.lowestLine?this.piece.y:this.piece.lowestLine,!this.moveValid(this.piece.x,this.piece.y-1,this.piece.tetro)){if(this.piece.lock-=e,this.piece.moves<0)return this.addPiece(this.piece);if(this.piece.moved&&(this.piece.moved=!1,this.piece.lock=this.lockDelay),this.piece.lock<=0)return this.addPiece(this.piece)}return this.lastStates.push({lines:0,flags:0,scoreIncrease:0}),{lines:0,flags:0,scoreIncrease:0}}nextPiece(){for(var e=[],t=0;t<5;t++)e.push(this.next[t].tetro[1][1]);for(e=[],t=0;t<this.bag.length;t++)e.push(this.bag[t].tetro[1][1]);var s=this.next.shift();this.piece=new c(s,this),0==this.bag.length&&this.newBag(),this.next.push(this.bag.shift())}hardDrop(){return this.piece.hardDrop()}rotCCW(){return this.piece.rotate(!0)}rotCC(){return this.piece.rotate()}holdPiece(){if(!this.holded)if(this.holded=!0,null==this.hold){for(this.piece.x=this.piece.origX,this.piece.y=this.piece.origY;0!==this.piece.pos;)this.piece.rotate();this.hold=this.piece,this.nextPiece()}else{for(this.piece.x=this.piece.origX,this.piece.y=this.piece.origY;0!==this.piece.pos;)this.piece.rotate();var e=new c(this.piece,this),t=new c(this.hold,this);this.piece=t,this.hold=e}}setLevel(e=1){return this.level=e,this.secsRemaining=1e3*(.8-.007*(e-1))**(e-1),this.dropRate=1e3*(.8-.007*(e-1))**(e-1)}addPiece(e){this.holded=!1;for(var t=0;t<e.tetro.length;t++)for(var s=0;s<e.tetro[t].length;s++)0!==e.tetro[t][s]&&(this.board[t+(this.board.length-e.y-1)][s+e.x]=e.tetro[t][s]);var o=0;for(t=0;t<this.board.length;t++)this.board[t].every((e=>0!==e))&&(this.board.splice(t,1),this.board.unshift(Array(this.width).fill(0)),o++,this.linesCleared++,Math.floor(this.linesCleared/10)>this.level-1&&this.setLevel(++this.level));var a=0;this.nextPiece(),e.tSpin?a+=i[o]*(this.b2b&&0!==o?1.5:1)*this.level:e.miniTSpin?a+=n[o]*(this.b2b&&0!==o?1.5:1)*this.level:0!==o&&(a+=r[o]*(this.b2b&&4==o?1.5:1)*this.level),this.score+=a;var c=this.b2b;for((e.tSpin||e.miniTSpin||4==o)&&0!==o?this.b2b=!0:0!==o&&(this.b2b=c=!1),this.moveValid(this.piece.x,this.piece.y,this.piece.tetro)||(this.gameOver=!0),t=e.tetro.length-1;t==e.tetro.length-1||e.tetro[t+1].every((e=>0==e));){for(s=0;s<e.tetro.length;s++)t+(this.board.length-e.y-1)<this.length&&0!==e.tetro[t][s]&&(this.gameOver=!0);t--}return this.lastStates.push({lines:o,flags:e.tSpin<<0|e.miniTSpin<<1|c<<2|this.gameOver<<3,scoreIncrease:a}),{lines:o,flags:e.tSpin<<0|e.miniTSpin<<1|c<<2|this.gameOver<<3,scoreIncrease:a}}toString(){for(var e="",t=0;t<this.board.length;t++){for(var s=0;s<this.board[t].length;s++)this.piece&&this.piece.x<=s&&s<this.piece.x+this.piece.tetro.length&&this.board.length-this.piece.y-1<=t&&t<this.board.length-this.piece.y-1+this.piece.tetro.length?e+=this.piece.tetro[t-(this.board.length-this.piece.y-1)][s-this.piece.x]:e+=this.board[t][s];e+=(t==this.length-1?"\n"+"-".repeat(this.width):"")+"\n"}return e}moveValid(e,t,s){for(var i=this.board.length-t-1;i<s.length+this.board.length-t-1;i++)for(var r=e;r<s[0].length+e;r++){if(0!==s[i-this.board.length+t+1][r-e]&&(i>=this.board.length||r>=this.width))return!1;if(!(i>=this.board.length||r>=this.width)&&0!==this.board[i][r]&&0!==s[i-this.board.length+t+1][r-e])return!1}return!0}containsPiece(e,t,s=0,i=0){return i+(this.board.length-t-1)>=this.board.length||i+(this.board.length-t-1)<0||s+e>=this.width||s+this.x<0||0!==this.board[i+(this.board.length-t-1)][s+e]}}},6:(e,t,s)=>{"use strict";s.d(t,{ZP:()=>B});const i=(e=0)=>t=>`[${t+e}m`,r=(e=0)=>t=>`[${38+e};5;${t}m`,n=(e=0)=>(t,s,i)=>`[${38+e};2;${t};${s};${i}m`,o={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};Object.keys(o.modifier),Object.keys(o.color),Object.keys(o.bgColor);const a=function(){const e=new Map;for(const[t,s]of Object.entries(o)){for(const[t,i]of Object.entries(s))o[t]={open:`[${i[0]}m`,close:`[${i[1]}m`},s[t]=o[t],e.set(i[0],i[1]);Object.defineProperty(o,t,{value:s,enumerable:!1})}return Object.defineProperty(o,"codes",{value:e,enumerable:!1}),o.color.close="[39m",o.bgColor.close="[49m",o.color.ansi=i(),o.color.ansi256=r(),o.color.ansi16m=n(),o.bgColor.ansi=i(10),o.bgColor.ansi256=r(10),o.bgColor.ansi16m=n(10),Object.defineProperties(o,{rgbToAnsi256:{value:(e,t,s)=>e===t&&t===s?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(t/255*5)+Math.round(s/255*5),enumerable:!1},hexToRgb:{value(e){const t=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!t)return[0,0,0];let[s]=t;3===s.length&&(s=[...s].map((e=>e+e)).join(""));const i=Number.parseInt(s,16);return[i>>16&255,i>>8&255,255&i]},enumerable:!1},hexToAnsi256:{value:e=>o.rgbToAnsi256(...o.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return e-8+90;let t,s,i;if(e>=232)t=(10*(e-232)+8)/255,s=t,i=t;else{const r=(e-=16)%36;t=Math.floor(e/36)/5,s=Math.floor(r/6)/5,i=r%6/5}const r=2*Math.max(t,s,i);if(0===r)return 30;let n=30+(Math.round(i)<<2|Math.round(s)<<1|Math.round(t));return 2===r&&(n+=60),n},enumerable:!1},rgbToAnsi:{value:(e,t,s)=>o.ansi256ToAnsi(o.rgbToAnsi256(e,t,s)),enumerable:!1},hexToAnsi:{value:e=>o.ansi256ToAnsi(o.hexToAnsi256(e)),enumerable:!1}}),o}(),c=require("node:process"),h=require("node:os"),l=require("node:tty");function p(e,t=c.argv){const s=e.startsWith("-")?"":1===e.length?"-":"--",i=t.indexOf(s+e),r=t.indexOf("--");return-1!==i&&(-1===r||i<r)}const{env:d}=c;let u;function b(e,t={}){return 0!==(s=function(e,{streamIsTTY:t,sniffFlags:s=!0}={}){const i=function(){if("FORCE_COLOR"in d)return"true"===d.FORCE_COLOR?1:"false"===d.FORCE_COLOR?0:0===d.FORCE_COLOR.length?1:Math.min(Number.parseInt(d.FORCE_COLOR,10),3)}();void 0!==i&&(u=i);const r=s?u:i;if(0===r)return 0;if(s){if(p("color=16m")||p("color=full")||p("color=truecolor"))return 3;if(p("color=256"))return 2}if(e&&!t&&void 0===r)return 0;const n=r||0;if("dumb"===d.TERM)return n;if("win32"===c.platform){const e=h.release().split(".");return Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in d)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE","DRONE"].some((e=>e in d))||"codeship"===d.CI_NAME?1:n;if("TEAMCITY_VERSION"in d)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(d.TEAMCITY_VERSION)?1:0;if("TF_BUILD"in d&&"AGENT_NAME"in d)return 1;if("truecolor"===d.COLORTERM)return 3;if("TERM_PROGRAM"in d){const e=Number.parseInt((d.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(d.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(d.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(d.TERM)||"COLORTERM"in d?1:n}(e,{streamIsTTY:e&&e.isTTY,...t}))&&{level:s,hasBasic:!0,has256:s>=2,has16m:s>=3};var s}p("no-color")||p("no-colors")||p("color=false")||p("color=never")?u=0:(p("color")||p("colors")||p("color=true")||p("color=always"))&&(u=1);const f={stdout:b({isTTY:l.isatty(1)}),stderr:b({isTTY:l.isatty(2)})};function g(e,t,s){let i=e.indexOf(t);if(-1===i)return e;const r=t.length;let n=0,o="";do{o+=e.slice(n,i)+t+s,n=i+r,i=e.indexOf(t,n)}while(-1!==i);return o+=e.slice(n),o}const{stdout:m,stderr:v}=f,y=Symbol("GENERATOR"),k=Symbol("STYLER"),x=Symbol("IS_EMPTY"),O=["ansi","ansi","ansi256","ansi16m"],w=Object.create(null);function P(e){return(e=>{const t=(...e)=>e.join(" ");return((e,t={})=>{if(t.level&&!(Number.isInteger(t.level)&&t.level>=0&&t.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");const s=m?m.level:0;e.level=void 0===t.level?s:t.level})(t,e),Object.setPrototypeOf(t,P.prototype),t})(e)}Object.setPrototypeOf(P.prototype,Function.prototype);for(const[e,t]of Object.entries(a))w[e]={get(){const s=A(this,R(t.open,t.close,this[k]),this[x]);return Object.defineProperty(this,e,{value:s}),s}};w.visible={get(){const e=A(this,this[k],!0);return Object.defineProperty(this,"visible",{value:e}),e}};const T=(e,t,s,...i)=>"rgb"===e?"ansi16m"===t?a[s].ansi16m(...i):"ansi256"===t?a[s].ansi256(a.rgbToAnsi256(...i)):a[s].ansi(a.rgbToAnsi(...i)):"hex"===e?T("rgb",t,s,...a.hexToRgb(...i)):a[s][e](...i),C=["rgb","hex","ansi256"];for(const e of C)w[e]={get(){const{level:t}=this;return function(...s){const i=R(T(e,O[t],"color",...s),a.color.close,this[k]);return A(this,i,this[x])}}},w["bg"+e[0].toUpperCase()+e.slice(1)]={get(){const{level:t}=this;return function(...s){const i=R(T(e,O[t],"bgColor",...s),a.bgColor.close,this[k]);return A(this,i,this[x])}}};const S=Object.defineProperties((()=>{}),{...w,level:{enumerable:!0,get(){return this[y].level},set(e){this[y].level=e}}}),R=(e,t,s)=>{let i,r;return void 0===s?(i=e,r=t):(i=s.openAll+e,r=t+s.closeAll),{open:e,close:t,openAll:i,closeAll:r,parent:s}},A=(e,t,s)=>{const i=(...e)=>E(i,1===e.length?""+e[0]:e.join(" "));return Object.setPrototypeOf(i,S),i[y]=e,i[k]=t,i[x]=s,i},E=(e,t)=>{if(e.level<=0||!t)return e[x]?"":t;let s=e[k];if(void 0===s)return t;const{openAll:i,closeAll:r}=s;if(t.includes(""))for(;void 0!==s;)t=g(t,s.close,s.open),s=s.parent;const n=t.indexOf("\n");return-1!==n&&(t=function(e,t,s,i){let r=0,n="";do{const o="\r"===e[i-1];n+=e.slice(r,o?i-1:i)+t+(o?"\r\n":"\n")+s,r=i+1,i=e.indexOf("\n",r)}while(-1!==i);return n+=e.slice(r),n}(t,r,i,n)),i+t+r};Object.defineProperties(P.prototype,w);const _=P(),B=(P({level:v?v.level:0}),_)}},a={};function c(e){var t=a[e];if(void 0!==t)return t.exports;var s=a[e]={exports:{}};return o[e](s,s.exports,c),s.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",s="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",i=e=>{e&&!e.d&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},c.a=(r,n,o)=>{var a;o&&((a=[]).d=1);var c,h,l,p=new Set,d=r.exports,u=new Promise(((e,t)=>{l=t,h=e}));u[t]=d,u[e]=e=>(a&&e(a),p.forEach(e),u.catch((e=>{}))),r.exports=u,n((r=>{var n;c=(r=>r.map((r=>{if(null!==r&&"object"==typeof r){if(r[e])return r;if(r.then){var n=[];n.d=0,r.then((e=>{o[t]=e,i(n)}),(e=>{o[s]=e,i(n)}));var o={};return o[e]=e=>e(n),o}}var a={};return a[e]=e=>{},a[t]=r,a})))(r);var o=()=>c.map((e=>{if(e[s])throw e[s];return e[t]})),h=new Promise((t=>{(n=()=>t(o)).r=0;var s=e=>e!==a&&!p.has(e)&&(p.add(e),e&&!e.d&&(n.r++,e.push(n)));c.map((t=>t[e](s)))}));return n.r?h:o()}),(e=>(e?l(u[s]=e):h(d),i(a)))),a&&(a.d=0)},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,c.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var s=Object.create(null);c.r(s);var i={};r=r||[null,n({}),n([]),n(n)];for(var o=2&t&&e;"object"==typeof o&&!~r.indexOf(o);o=n(o))Object.getOwnPropertyNames(o).forEach((t=>i[t]=()=>e[t]));return i.default=()=>e,c.d(s,i),s},c.d=(e,t)=>{for(var s in t)c.o(t,s)&&!c.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),c.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c(364)})();