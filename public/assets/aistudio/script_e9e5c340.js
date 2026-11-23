
const THEME_COLOR={casa:"#c87f3b",escuela:"#2b6cb0",parque:"#2e7d32",kaax:"#145c3b"};
const ICONS={
 drop:'<svg viewBox="0 0 44 44"><path d="M22 4C14 16 8 24 8 30a14 14 0 0 0 28 0C36 24 30 16 22 4Z" fill="#2b6cb0"/><circle cx="17" cy="28" r="3" fill="#bfe3ff"/></svg>',
 hole:'<svg viewBox="0 0 44 44"><ellipse cx="22" cy="25" rx="17" ry="9" fill="#5a3a20"/><ellipse cx="22" cy="23" rx="12" ry="5.5" fill="#2a1a0e"/></svg>',
 leaf:'<svg viewBox="0 0 44 44"><path d="M8 36C8 16 20 6 38 6 38 26 26 36 8 36Z" fill="#4caf7d"/><path d="M10 34C18 24 26 16 36 8" stroke="#1d6b4a" stroke-width="2" fill="none"/></svg>',
 bottle:'<svg viewBox="0 0 44 44"><rect x="16" y="5" width="12" height="7" fill="#2b6cb0"/><path d="M14 14h16v20a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4Z" fill="#5fa8e8"/></svg>',
 hazard:'<svg viewBox="0 0 44 44"><rect x="6" y="6" width="32" height="32" rx="8" fill="#555"/><path d="M22 14l8 16H14Z" fill="#e8b84b"/><circle cx="22" cy="27" r="1.6" fill="#333"/></svg>',
 bird:'<svg viewBox="0 0 44 44"><ellipse cx="22" cy="25" rx="12" ry="9" fill="#2b9e6a"/><path d="M22 18l10-6-4 10Z" fill="#e8b84b"/><circle cx="16" cy="21" r="1.6" fill="#1b2b22"/></svg>',
 deer:'<svg viewBox="0 0 44 44"><path d="M13 16l-3-8M29 16l3-8" stroke="#6b4423" stroke-width="2" fill="none"/><rect x="11" y="17" width="22" height="13" rx="6" fill="#a5703a"/><circle cx="12" cy="18" r="5" fill="#a5703a"/></svg>',
 jaguar:'<svg viewBox="0 0 44 44"><rect x="9" y="16" width="26" height="14" rx="7" fill="#e8b84b"/><circle cx="14" cy="19" r="1.6" fill="#333"/><circle cx="21" cy="25" r="1.6" fill="#333"/><circle cx="28" cy="20" r="1.6" fill="#333"/></svg>',
 turtle:'<svg viewBox="0 0 44 44"><ellipse cx="22" cy="24" rx="15" ry="10" fill="#2e7d32"/><path d="M14 24h16M22 16v16" stroke="#123d2b" stroke-width="1.4"/></svg>'
};
const DECOR_ICONS={
 tree:'<svg viewBox="0 0 40 60"><rect x="16" y="34" width="8" height="24" fill="#6b4423"/><circle cx="20" cy="20" r="18" fill="#2e7d32"/></svg>',
 pine:'<svg viewBox="0 0 40 60"><rect x="17" y="42" width="6" height="16" fill="#5a3a20"/><path d="M20 4 32 26H8Z" fill="#1d6b4a"/><path d="M20 16 34 38H6Z" fill="#2e7d32"/></svg>',
 house:'<svg viewBox="0 0 60 50"><rect x="8" y="22" width="44" height="26" fill="#c87f3b"/><path d="M4 24 30 4 56 24Z" fill="#8a5a33"/><rect x="26" y="32" width="10" height="16" fill="#5a3a20"/></svg>',
 hut:'<svg viewBox="0 0 60 50"><path d="M2 24 30 2 58 24Z" fill="#6b4423"/><rect x="14" y="24" width="32" height="22" fill="#caa15a"/></svg>',
 person:'<svg viewBox="0 0 24 50"><circle cx="12" cy="8" r="7" fill="#f0c090"/><rect x="5" y="16" width="14" height="22" rx="5" fill="#3b6ea5"/><rect x="4" y="36" width="6" height="12" fill="#3a2a16"/><rect x="14" y="36" width="6" height="12" fill="#3a2a16"/></svg>',
 cloud:'<svg viewBox="0 0 60 36"><ellipse cx="18" cy="22" rx="16" ry="12" fill="#ffffff"/><ellipse cx="34" cy="16" rx="20" ry="15" fill="#ffffff"/><ellipse cx="48" cy="24" rx="14" ry="10" fill="#ffffff"/></svg>',
 bush:'<svg viewBox="0 0 40 30"><circle cx="12" cy="18" r="12" fill="#2e7d32"/><circle cx="26" cy="16" r="14" fill="#388e3c"/><circle cx="34" cy="20" r="10" fill="#2e7d32"/></svg>',
 flower:'<svg viewBox="0 0 30 30"><circle cx="15" cy="8" r="5" fill="#e8b84b"/><circle cx="8" cy="15" r="5" fill="#e8647a"/><circle cx="22" cy="15" r="5" fill="#e8647a"/><circle cx="15" cy="20" r="5" fill="#e8647a"/><circle cx="15" cy="15" r="4" fill="#fff07a"/></svg>',
 rock:'<svg viewBox="0 0 40 26"><ellipse cx="20" cy="18" rx="19" ry="10" fill="#8a8a7a"/><ellipse cx="14" cy="14" rx="9" ry="7" fill="#9c9c8c"/></svg>',
 sun:'<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="12" fill="#ffd54f"/><g stroke="#ffd54f" stroke-width="3"><line x1="25" y1="2" x2="25" y2="10"/><line x1="25" y1="40" x2="25" y2="48"/><line x1="2" y1="25" x2="10" y2="25"/><line x1="40" y1="25" x2="48" y2="25"/><line x1="8" y1="8" x2="14" y2="14"/><line x1="36" y1="36" x2="42" y2="42"/><line x1="42" y1="8" x2="36" y2="14"/><line x1="14" y1="36" x2="8" y2="42"/></g></svg>',
 pyramid:'<svg viewBox="0 0 60 50"><rect x="4" y="40" width="52" height="8" fill="#8a7a5c"/><rect x="10" y="32" width="40" height="8" fill="#9c8a68"/><rect x="16" y="24" width="28" height="8" fill="#8a7a5c"/><rect x="22" y="16" width="16" height="8" fill="#9c8a68"/><rect x="27" y="8" width="6" height="8" fill="#6b5c42"/></svg>',
 cenote:'<svg viewBox="0 0 50 36"><ellipse cx="25" cy="20" rx="24" ry="14" fill="#5a4530"/><ellipse cx="25" cy="19" rx="18" ry="10" fill="#2b8ab0"/><ellipse cx="20" cy="16" rx="6" ry="3" fill="#bfe3ff" opacity=".6"/></svg>',
 fence:'<svg viewBox="0 0 60 30"><rect x="0" y="10" width="60" height="4" fill="#8a5a33"/><rect x="0" y="18" width="60" height="4" fill="#8a5a33"/><rect x="4" y="2" width="5" height="26" fill="#6b4423"/><rect x="20" y="2" width="5" height="26" fill="#6b4423"/><rect x="36" y="2" width="5" height="26" fill="#6b4423"/><rect x="52" y="2" width="5" height="26" fill="#6b4423"/></svg>',
 window:'<svg viewBox="0 0 50 50"><rect x="2" y="2" width="46" height="46" fill="#bcdff0" stroke="#8a5a33" stroke-width="4"/><line x1="25" y1="2" x2="25" y2="48" stroke="#8a5a33" stroke-width="3"/><line x1="2" y1="25" x2="48" y2="25" stroke="#8a5a33" stroke-width="3"/><circle cx="14" cy="14" r="5" fill="#2e7d32"/><circle cx="36" cy="16" r="6" fill="#2e7d32"/></svg>',
 table:'<svg viewBox="0 0 50 30"><rect x="4" y="14" width="42" height="6" fill="#a5703a"/><rect x="8" y="20" width="4" height="10" fill="#8a5a33"/><rect x="38" y="20" width="4" height="10" fill="#8a5a33"/></svg>'
};
const SCENERY={
 casa:[
  {i:"cloud",l:"9%",t:"5%",w:54},
  {i:"house",l:"4%",t:"26%",w:82},{i:"house",l:"78%",t:"24%",w:88},
  {i:"tree",l:"1%",t:"42%",w:48},{i:"tree",l:"91%",t:"39%",w:48},
  {i:"bush",l:"13%",t:"62%",w:42},{i:"bush",l:"79%",t:"62%",w:42},
  {i:"fence",l:"0%",t:"70%",w:100},{i:"rock",l:"57%",t:"67%",w:30}
 ],
 escuela:[{i:"cloud",l:"12%",t:"4%",w:48},
  {i:"house",l:"28%",t:"12%",w:92},{i:"table",l:"35%",t:"48%",w:58},
  {i:"table",l:"53%",t:"49%",w:58},{i:"person",l:"18%",t:"45%",w:22},
  {i:"person",l:"69%",t:"44%",w:22},{i:"tree",l:"3%",t:"26%",w:48},
  {i:"tree",l:"85%",t:"26%",w:48},{i:"fence",l:"0%",t:"70%",w:100},
  {i:"flower",l:"13%",t:"65%",w:20},{i:"flower",l:"78%",t:"65%",w:20}
 ],
 parque:[{i:"cloud",l:"9%",t:"3%",w:54},
  {i:"pine",l:"4%",t:"20%",w:52},{i:"tree",l:"15%",t:"17%",w:58},
  {i:"tree",l:"78%",t:"17%",w:58},{i:"pine",l:"88%",t:"23%",w:48},
  {i:"bush",l:"1%",t:"58%",w:38},{i:"bush",l:"88%",t:"59%",w:38},
  {i:"flower",l:"19%",t:"65%",w:22},{i:"flower",l:"72%",t:"64%",w:22},
  {i:"rock",l:"61%",t:"67%",w:30},{i:"fence",l:"0%",t:"73%",w:100}
 ],
 kaax:[{i:"cloud",l:"8%",t:"4%",w:48},
  {i:"pine",l:"1%",t:"13%",w:60},{i:"pine",l:"14%",t:"8%",w:52},
  {i:"tree",l:"27%",t:"14%",w:58},{i:"tree",l:"72%",t:"13%",w:60},
  {i:"pine",l:"88%",t:"15%",w:52},{i:"hut",l:"43%",t:"23%",w:62},
  {i:"bush",l:"10%",t:"58%",w:34},{i:"bush",l:"80%",t:"57%",w:36},
  {i:"rock",l:"35%",t:"67%",w:28},{i:"cenote",l:"61%",t:"61%",w:40}
]};
function renderScenery(lvl){
  (SCENERY[lvl.id]||[]).forEach(d=>{
    const el=document.createElement("div"); el.className="decor";
    el.style.left=d.l; el.style.top=d.t; el.style.width=d.w+"px"; el.style.height=(d.w*1.1)+"px";
    el.innerHTML=DECOR_ICONS[d.i];
    $("play-area").appendChild(el);
  });
}
function playerSVG(color){
 return '<svg viewBox="0 0 44 44"><circle cx="22" cy="13" r="8" fill="#ffd9a0"/><rect x="9" y="20" width="26" height="19" rx="9" fill="'+color+'"/><circle cx="18" cy="12" r="1.5" fill="#1b2b22"/><circle cx="26" cy="12" r="1.5" fill="#1b2b22"/><path d="M17 16Q22 19 27 16" stroke="#1b2b22" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>';
}
const LEVELS=[
 {id:"casa", name:"La Na' (Casa)", icon:"🏠", minigame:"Canoa recolectora", type:"rio", resIcon:"🌊",
  vocab:[{maya:"kay",es:"pez",img:"🐟"},{maya:"ja'",es:"agua",img:"💧"},{maya:"otoch",es:"casa",img:"🏠"},{maya:"k'iin",es:"sol / día",img:"☀️"}],
  hint:"Mueve tu canoa entre los carriles con las flechas, W/S o los botones, y atrapa la basura. Si atrapas un pez (kay) pierdes una vida."},
 {id:"escuela", name:"La Escuela", icon:"🏫", minigame:"Clasifica la basura", type:"clasifica", resIcon:"♻️",
  vocab:[{maya:"ja'as",es:"plátano",img:"🍌"},{maya:"janal",es:"comida, alimento",img:"🥬"},{maya:"ju'un",es:"papel",img:"📰"},{maya:"ja'",es:"agua",img:"💧"},{maya:"che'",es:"árbol, madera",img:"🪵"}],
  hint:"Toca un residuo que cae y luego su contenedor: orgánico, reciclable, no reciclable o peligroso."},
 {id:"parque", name:"El Campo", icon:"🌳", minigame:"Siembra en el campo", type:"siembra", resIcon:"🌱",
  vocab:[{maya:"che'",es:"árbol, madera",img:"🌳"},{maya:"ya'ax che'",es:"ceiba (árbol sagrado)",img:"🌳"},{maya:"lu'um",es:"tierra",img:"🟫"},{maya:"iik'",es:"aire / viento",img:"💨"}],
  hint:"Solo puedes sembrar en los cuadros café del campo verde. El pueblo no se siembra."},
 {id:"kaax", name:"El K'áax", icon:"🌴", minigame:"Rescata la fauna de México", type:"rescate", resIcon:"🐆",
  vocab:[{maya:"báalam",es:"jaguar",img:"🐆"},{maya:"áak",es:"tortuga",img:"🐢"},{maya:"kuuts",es:"pavo de monte",img:"🦃"},{maya:"k'áax",es:"monte / selva",img:"🌴"}],
  hint:"Ilumina la selva con tu linterna y rescata 5 especies en riesgo de México en 90 segundos."},
 {id:"memoria", name:"Memoria Maya", icon:"🧠", minigame:"Pares de palabras", type:"memory", resIcon:"🃏",
  vocab:[{maya:"ja'",es:"agua",img:"💧"},{maya:"che'",es:"árbol, madera",img:"🌳"},{maya:"k'iin",es:"sol, día",img:"☀️"},
         {maya:"janal",es:"comida",img:"🍽️"},{maya:"kéej",es:"venado",img:"🦌"},{maya:"miis",es:"gato",img:"🐱"},
         {maya:"kaan",es:"serpiente",img:"🐍"},{maya:"nikte'",es:"flor",img:"🌸"},{maya:"peek'",es:"perro",img:"🐶"},
         {maya:"t'uut'",es:"loro",img:"🦜"},{maya:"chéel",es:"arcoíris",img:"🌈"},{maya:"otoch",es:"casa",img:"🏠"},
         {maya:"kay",es:"pez",img:"🐟"},{maya:"k'áak'",es:"fuego",img:"🔥"}],
  hint:"Voltea dos tarjetas por turno y encuentra la palabra maya junto con su significado en español. Cada vez salen parejas distintas."},
 {id:"construye", name:"Construye la Palabra", icon:"🔤", minigame:"Ordena las letras", type:"spell", resIcon:"✏️",
  vocab:[{maya:"che'",es:"árbol",img:"🌳"},{maya:"ja'",es:"agua",img:"💧"},{maya:"kéej",es:"venado",img:"🦌"},
         {maya:"miis",es:"gato",img:"🐱"},{maya:"kaan",es:"serpiente",img:"🐍"},{maya:"báalam",es:"jaguar",img:"🐆"},
         {maya:"kay",es:"pez",img:"🐟"},{maya:"kuuts",es:"pavo de monte",img:"🦃"},{maya:"áak",es:"tortuga",img:"🐢"},
         {maya:"peek'",es:"perro",img:"🐶"},{maya:"t'uut'",es:"loro",img:"🦜"},{maya:"otoch",es:"casa",img:"🏠"},
         {maya:"nikte'",es:"flor",img:"🌸"},{maya:"chéel",es:"arcoíris",img:"🌈"},{maya:"ixi'im",es:"maíz",img:"🌽"},
         {maya:"ja'as",es:"plátano",img:"🍌"},{maya:"kaab",es:"miel",img:"🍯"},{maya:"k'úum",es:"calabaza",img:"🎃"},
         {maya:"kuum",es:"olla de barro",img:"🏺"},{maya:"iik",es:"chile",img:"🌶️"},{maya:"síinik",es:"hormiga",img:"🐜"},
         {maya:"k'iin",es:"sol",img:"☀️"},{maya:"k'áak'",es:"fuego",img:"🔥"}],
  hint:"Toca las letras en orden para formar la palabra maya que corresponde a la imagen. Cada vez salen palabras distintas."},
 {id:"mercado", name:"El Mercado Maya", icon:"🧺", minigame:"Encuentra lo que piden", type:"market", resIcon:"🧺",
  vocab:[{maya:"ja'as",es:"plátano",img:"🍌"},{maya:"ixi'im",es:"maíz",img:"🌽"},{maya:"k'úum",es:"calabaza",img:"🎃"},
         {maya:"iik",es:"chile",img:"🌶️"},{maya:"kaab",es:"miel",img:"🍯"},{maya:"kay",es:"pescado",img:"🐟"},
         {maya:"kuum",es:"olla de barro",img:"🏺"},{maya:"nikte'",es:"flor",img:"🌸"}],
  hint:"Lee lo que pide cada persona del mercado y toca el objeto correcto en el puesto."},
 {id:"templo", name:"El Templo de las Palabras", icon:"🗿", minigame:"Pruebas finales", type:"temple", resIcon:"⛩️",
  vocab:[],
  hint:"Supera las cuatro puertas del templo repasando todo lo que has aprendido en tu aventura."}
];
const PUZZLE_TYPES=["memory","spell","market","temple","clasifica","siembra","rescate","rio"];
const DICTIONARY=[{"maya":"a","es":"adjetivo posesivo de segunda persona de singular: tu, tuyo, tuya."},{"maya":"a","es":"pronombre de segunda persona del singular: tú"},{"maya":"ajal","es":"despertar"},{"maya":"akkúun","es":"asentar, cimentar"},{"maya":"aktáan","es":"ante, delante, enfrente"},{"maya":"alab óol","es":"confianza; confiar"},{"maya":"alak'","es":"elemento que se antepone para dar a entender que un animal es doméstico"},{"maya":"alux","es":"geniecillo, enano legendario"},{"maya":"am","es":"araña"},{"maya":"anil","es":"postura, posición"},{"maya":"asbe'en","es":"de medio uso"},{"maya":"atan","es":"cónyugue, esposa"},{"maya":"awat","es":"llamar a gritos, gritar lastimeramente"},{"maya":"awat che'ej","es":"carcajada"},{"maya":"ayik'al","es":"rico, rica"},{"maya":"aak'","es":"lengua"},{"maya":"aal","es":"hijo o hija de la mujer o de animal hembra"},{"maya":"aal","es":"pesa, peso; pesado"},{"maya":"aalak'","es":"animal doméstico"},{"maya":"aal k'ab","es":"dedos de la mano"},{"maya":"aal ook","es":"dedos del pie"},{"maya":"aax","es":"verruga"},{"maya":"áak","es":"tortuga"},{"maya":"áakam","es":"lamento, quejido, bramido. Quejarse, bramar, gemir"},{"maya":"áaktun","es":"caverna, cueva"},{"maya":"áak'","es":"verde, fresco, tierno"},{"maya":"áak'","es":"húmedo"},{"maya":"áak'ab","es":"noche"},{"maya":"áak'al","es":"laguna, aguada, ciénega, pantano"},{"maya":"áak'alche'","es":"ciénega o laguna rodeada de árboles"},{"maya":"áak' sa'","es":"atole nuevo"},{"maya":"áalkab","es":"correr"},{"maya":"áant","es":"ayudar, cooperar, contribuir"},{"maya":"áaynak","es":"por poco"},{"maya":"a'al","es":"decir, contar, mandar"},{"maya":"a'al k'eban","es":"confesar"},{"maya":"babal","es":"revolcar"},{"maya":"baj","es":"clavar"},{"maya":"baj","es":"tuza"},{"maya":"bajun","es":"¿Cuánto?"},{"maya":"bajux","es":"¿Cuánto?"},{"maya":"bakal","es":"hueso de la mazorca del maíz"},{"maya":"bak'","es":"carne"},{"maya":"bak'el iit","es":"nalga, glúteo"},{"maya":"balak'","es":"rodar"},{"maya":"bat","es":"granizo"},{"maya":"batab","es":"cacique"},{"maya":"baach","es":"chachalaca"},{"maya":"baak","es":"hueso"},{"maya":"baak'","es":"asir, abrazar"},{"maya":"baak'","es":"enredar, alrededor, en derredor"},{"maya":"baal","es":"esconder, ocultar, encubrir"},{"maya":"baal","es":"cuñado respecto a varón"},{"maya":"baatsil","es":"entre sí, entre ellos mismos"},{"maya":"baax","es":"golpear"},{"maya":"báab","es":"natación"},{"maya":"báab","es":"trasegar, verter de una vasija a otra"},{"maya":"báalam","es":"guardián protector mitológico"},{"maya":"báalam","es":"jaguar"},{"maya":"báalam kaab","es":"abejorro zumbador de cuerpo velludo"},{"maya":"báalche'","es":"licor ceremonial"},{"maya":"báanal","es":"caer, desmoronar, desprender; desparramarse granos, monedas o frutos"},{"maya":"báat","es":"hacha"},{"maya":"báay","es":"alisar; acariciar"},{"maya":"ba'ba'al","es":"ser maligno"},{"maya":"ba'te'el","es":"pelear, batallar"},{"maya":"ba'al","es":"cosa, objeto"},{"maya":"ba'alba","es":"bienes muebles e inmuebles"},{"maya":"ba'alche'","es":"animal, bruto, bestia"},{"maya":"ba'ax","es":"¿Qué?, ¿Qué cosa?"},{"maya":"ba'axten","es":"¿Por qué?"},{"maya":"bej","es":"camino, sendero"},{"maya":"bejla'e'","es":"hoy, ahora"},{"maya":"bek'ech","es":"delgado, flaco"},{"maya":"beech'","es":"codorniz"},{"maya":"beel","es":"camino, sendero"},{"maya":"bees","es":"becerro"},{"maya":"beet","es":"hacer, construir"},{"maya":"beey","es":"así, sí, así es, así como"},{"maya":"bik'ix","es":"¿Cuándo?"},{"maya":"biik'","es":"oscilar, zigzaguear, vibrar, menear, reptar"},{"maya":"biil","es":"dobladillo; enrollar, torcer"},{"maya":"biin","es":"ir"},{"maya":"biirich","es":"lampiño, sin pelo"},{"maya":"biit'","es":"asir con la punta de los dedos"},{"maya":"biix","es":"octavario, ochavario, ochovario"},{"maya":"bi'bi'ki","es":"suave, blando"},{"maya":"bi'ich'","es":"de cuerpo sencillo, flaco; endeble"},{"maya":"bobojki","es":"seco"},{"maya":"bobox","es":"parte de la columna vertebral formada por los huesos sacro y coccix"},{"maya":"boj","es":"sonido producido al golpear una cosa hueca"},{"maya":"bojol","es":"buscar revolviendo las cosas"},{"maya":"bojol","es":"espantapájaros"},{"maya":"bolon","es":"nueve, noveno"},{"maya":"book","es":"olor, hedor, fetidez"},{"maya":"book'","es":"batir, agitar, revolver líquidos"},{"maya":"book'","es":"podrir"},{"maya":"boon","es":"pintura, tintura; teñir, curtir, pintar"},{"maya":"boox","es":"negro"},{"maya":"bóoch'","es":"rebozo, mantilla; prenda que sirve para cubrir la cabeza"},{"maya":"bóoxel chi'","es":"labio"},{"maya":"bo'ol","es":"salario, jornal, remuneración; pagar, liquidar, recompensar."},{"maya":"bo'oy","es":"sombra"},{"maya":"buka'aj","es":"¿De qué tamaño?, ¿Qué cantidad?"},{"maya":"buts' eek'","es":"cometa"},{"maya":"buy bak'","es":"encarnar, sanar una herida, encostrar"},{"maya":"buuj","es":"partir, cascar"},{"maya":"buuk'","es":"revolver, mezclar, arar"},{"maya":"buul","es":"zambullir, ahogar, anegar"},{"maya":"buut'","es":"embutir, rellenar, envasar"},{"maya":"buuts'","es":"humo"},{"maya":"búuj","es":"mitad"},{"maya":"búuk","es":"ropa"},{"maya":"bu'ul","es":"frijol"},{"maya":"chak","es":"rojo"},{"maya":"chakal ja'as","es":"mamey"},{"maya":"chak bola'ay","es":"jaguar"},{"maya":"chak chi'","es":"pez comestible cuya boca es roja"},{"maya":"chak iik'","es":"tempestad, huracán, ciclón"},{"maya":"chakjole'en","es":"candente, color de fuego ígneo"},{"maya":"chak mo'ol","es":"variedad de Jaguar"},{"maya":"chaknúul","es":"desnudo"},{"maya":"chakts'íits'i'","es":"cardenal (ave)"},{"maya":"chamal","es":"cigarrillo, cigarro"},{"maya":"chapat","es":"ciempiés"},{"maya":"chaajal","es":"cosquillas, cosquillear"},{"maya":"chaak'","es":"guiñar"},{"maya":"chaal","es":"enjuagar"},{"maya":"chaambéel","es":"despacio, lento, calmoso"},{"maya":"cháach","es":"agarrar, atrapar, prender"},{"maya":"cháach","es":"puñado, manojo"},{"maya":"cháacháal","es":"tela o cosa rala, poco tupida"},{"maya":"cháak","es":"lluvia"},{"maya":"cháal ja'","es":"enjuagar"},{"maya":"cháaltun","es":"laja, piedar poco plana y lisa de gran extensión"},{"maya":"cháamcham","es":"empanada cocida en comal; tortilla doblada sobre sí misma y rellena de algo"},{"maya":"cha'","es":"chicle; resina del chicozapote"},{"maya":"cha'","es":"aflojar, soltar, desatar, desajustar"},{"maya":"cha'ach","es":"masticar, mascar"},{"maya":"cha'aj","es":"deslumbramiento"},{"maya":"cha'ak'ab","es":"libre, libertad"},{"maya":"cha'am koj","es":"muela de la boca"},{"maya":"cha'an","es":"espectáculo; mirar, ver."},{"maya":"chen konel","es":"en vano, por demás"},{"maya":"cheej","es":"acuñar; amontonar, tupir."},{"maya":"cheem","es":"canoa; batea"},{"maya":"chéech","es":"llorón"},{"maya":"chéel","es":"arcoiris"},{"maya":"chéen","es":"puro, sin mezcla; sólo"},{"maya":"chéen","es":"apenas, sólo"},{"maya":"chéen kunel","es":"en vano, por demás"},{"maya":"chéen túun","es":"súbitamente, repentinamente, de repente"},{"maya":"che'","es":"árbol, madera, palo"},{"maya":"che'chak","es":"cocer de un sólo hervor la carne fresca"},{"maya":"che'ej","es":"carcajada; reir"},{"maya":"chich","es":"duro, macizo, fuerte"},{"maya":"chichan","es":"chico, pequeño"},{"maya":"chichkun","es":"acelerar, apresurar; endurecer"},{"maya":"chika'an","es":"parecer, divisar"},{"maya":"chikil","es":"cosquilla; cosquillear"},{"maya":"chik'in","es":"oeste, poniente, occidente"},{"maya":"chital","es":"acostarse, tenderse, echarse"},{"maya":"chiich","es":"abuela materna o paterna"},{"maya":"chíikpajal","es":"asomar, divisar"},{"maya":"chíikul","es":"seña, señal, signo"},{"maya":"chi'","es":"boca, orilla, brocal"},{"maya":"chi' nook'","es":"dobladillo"},{"maya":"chi'ibal","es":"dolor; Ladrar; Morder"},{"maya":"chi'ibal k'iin","es":"eclipse de sol"},{"maya":"chi'ibal uj","es":"eclipse de luna"},{"maya":"chi'ichnak","es":"melancolía, intranquilidad, molestia, malestar"},{"maya":"chokoj","es":"caliente"},{"maya":"chokoj pool","es":"loco, orate, demente"},{"maya":"chokwil","es":"calentura, fiebre"},{"maya":"cholo'op","es":"flaco, delgado"},{"maya":"chowak","es":"largo, largura, longitud"},{"maya":"chooj","es":"chorrear, manar, correr los líquidos"},{"maya":"chooj k'i'ik'","es":"hemorragia"},{"maya":"chook'","es":"embutir, atestar, meter"},{"maya":"chóol","es":"aflojar, desenredar, desatar"},{"maya":"cho'","es":"asear, limpiar; secar"},{"maya":"cho'oboj ja'","es":"toalla"},{"maya":"cho'on","es":"vellos del pubis"},{"maya":"chuchul","es":"cosa dura y seca; marchitarse, secarse, contraerse"},{"maya":"chuk paach","es":"perseguir, alcanzar"},{"maya":"chukwa'","es":"chocolate"},{"maya":"chuuj","es":"quemar"},{"maya":"chuuk","es":"alcanzar, atrapar, pescar, lazar"},{"maya":"chuuy","es":"costurar"},{"maya":"chúumuk","es":"medio, enmedio"},{"maya":"chu'uch","es":"mamar"},{"maya":"chu'uy","es":"enmarañar, enredar"},{"maya":"ch'aaj","es":"gota, gotera; gotear"},{"maya":"ch'aak","es":"cortar con golpe; cortar con hacha, machete u otro instrumento"},{"maya":"ch'aak","es":"atravesar, vadear, traspasar"},{"maya":"ch'a'","es":"tomar, traer, llevar, apropiar"},{"maya":"ch'a' chi'","es":"mención; mencionar, invocar"},{"maya":"ch'a' iik'","es":"respiración; respirar"},{"maya":"ch'a' k'uux","es":"odio, disgusto, rencor; odiar, disgustar"},{"maya":"ch'a' nu'uk","es":"entender, comprender; poner atención"},{"maya":"ch'a' óol","es":"aliviar, convalecer, recuperar"},{"maya":"ch'a' subtal","es":"vergüenza; avergonzar"},{"maya":"ch'a' cháak","es":"ceremonia del culto agrícola para pedir lluvia a los dioses del cielo"},{"maya":"ch'ech'ejki","es":"cosa muy junta y apretada, tupida"},{"maya":"ch'ech'eki","es":"abundancia"},{"maya":"ch'eeb","es":"ladear, inclinar, cantear"},{"maya":"ch'eem","es":"lagaña"},{"maya":"ch'eeneb","es":"visita rápida"},{"maya":"ch'eeneb","es":"acechar, atisbar, espiar, avisorar"},{"maya":"ch'eet","es":"inclinar, ladear"},{"maya":"ch'éen","es":"suspender alguna acción, calmar, detener"},{"maya":"ch'e'ej","es":"sonido recio, fuerte, que lastima los oídos"},{"maya":"ch'e'en","es":"pozo"},{"maya":"ch'iik","es":"clavar, sembrar, prender o asir con alfileres o cosas puntiagudas"},{"maya":"ch'iin","es":"tirar, lanzar, arrojar, apedrear"},{"maya":"ch'íich'","es":"espulgar"},{"maya":"ch'íijil","es":"crecer en tamaño y edad"},{"maya":"ch'i'ibal","es":"casta, linaje, generación, raza"},{"maya":"ch'oj","es":"añil"},{"maya":"ch'oot","es":"torcer o exprimir, darle vueltas a algo"},{"maya":"ch'óoch'","es":"cosa salada, salobre, que contiene sal"},{"maya":"ch'óoch'","es":"quitar piedras, escombros u otras cosas para dejar despejado el lugar"},{"maya":"ch'oop","es":"tuerto de un ojo o totalmente ciego"},{"maya":"ch'o'","es":"ratón, rata, animal roedor"},{"maya":"ch'ujuk","es":"sabor dulce, dulzura"},{"maya":"ch'upul aal","es":"hija"},{"maya":"ch'uul","es":"cosa húmeda, mojada; mojar"},{"maya":"ch'úuk","es":"espiar, acechar; cazar furtivamente"},{"maya":"ch'úupal","es":"señorita, muchacha, joven doncella"},{"maya":"ch'úuy","es":"alzar, suspender"},{"maya":"elel","es":"ignición, incendio, quemazón; arder, quemar, incendiar"},{"maya":"eek'","es":"estrella, lucero, astro"},{"maya":"eets'","es":"asentar, posar, establecer"},{"maya":"éek'","es":"negro, obscuro, sucio"},{"maya":"éek'joch'e'en","es":"obscuro, de noche"},{"maya":"éemel","es":"descender, bajar, declinar, disminuir"},{"maya":"éetel","es":"con, en compañía de, juntamente con"},{"maya":"éets'","es":"eco; resonar, repercutir el sonido"},{"maya":"éets'","es":"hacer gestos y muecas"},{"maya":"e'el","es":"huevo de ave; testículo"},{"maya":"e'elankil","es":"ovar, aovar, desovar"},{"maya":"e'es","es":"mostrar, exhibir, enseñar"},{"maya":"ich","es":"fruta, fruto"},{"maya":"ich","es":"ojo"},{"maya":"ich","es":"rostro, cara, faz"},{"maya":"ich","es":"en, entre, dentro, de aquí a"},{"maya":"ichil","es":"dentro, entre"},{"maya":"ichkíil","es":"baño, ducha"},{"maya":"icht","es":"mirar, fijar la mirada en alguna cosa"},{"maya":"iknal","es":"en compañía de, junto de o a, con"},{"maya":"iil","es":"ver, mirar, observar, visitar"},{"maya":"ilib","es":"nuera"},{"maya":"in","es":"pronombre posesivo de la primera persona del singular: mí, mío, mía"},{"maya":"istikyaj","es":"difícilmente, apenas, con dificultad"},{"maya":"ixi'im","es":"maíz"},{"maya":"iich","es":"gemelo, mellizo"},{"maya":"iik","es":"chile"},{"maya":"iik'","es":"aire, viento; aliento, respiración, hálito; espíritu"},{"maya":"iim","es":"teta, ubre"},{"maya":"iipíil","es":"traje talar de las mujeres mayas y mestizas de Yucatán"},{"maya":"iis","es":"camote, batata"},{"maya":"iit","es":"culo, ano, fondo de cualquier vasija"},{"maya":"íicham","es":"esposo, marido"},{"maya":"íich'ak","es":"uña"},{"maya":"íits'in","es":"hermano o hermana menor"},{"maya":"i'inaj","es":"semilla de maíz"},{"maya":"jaban","es":"matorral, maleza"},{"maya":"jach","es":"partícula enfatizante: muy"},{"maya":"jajalki","es":"lucio, brilloso, liso, resbaloso"},{"maya":"jajay túul","es":"¿Cuántos?, ¿De cuántos?"},{"maya":"jak'ab","es":"atragantar"},{"maya":"jalach","es":"persona de rango alto"},{"maya":"jalbal","es":"lustrar, lustroso"},{"maya":"jaltun","es":"sarteneja"},{"maya":"janal","es":"alimento, comida, guiso; comer"},{"maya":"janal pixan","es":"alimentos que se ponen en los altares para los fieles difuntos del día de muertos en Yucatán"},{"maya":"jats'a ja'","es":"rocío que penetra al interior de una habitación cuando llueve"},{"maya":"jats'uts","es":"bonito, lindo, hermoso, precioso (No se aplica a seres humanos)"},{"maya":"jaab","es":"separar, dispersar"},{"maya":"jaach'","es":"mascar, masticar"},{"maya":"jaaj","es":"verdad, cierto, verdadero; ciertamente"},{"maya":"jaap","es":"abrir"},{"maya":"jaat","es":"romper, rajar, despedazar, desflorar"},{"maya":"jaats","es":"dividir, separar, repartir"},{"maya":"jaats'","es":"azote, golpe dado con un instrumento; azotar"},{"maya":"jaay","es":"delgado, plano, llano"},{"maya":"jaay","es":"extender"},{"maya":"jaayab","es":"bostezo; bostezar"},{"maya":"jáabal","es":"apagarse el fuego"},{"maya":"jáal","es":"límite, vera, orilla"},{"maya":"jáalk'ab","es":"libre, suelto, sin ataduras"},{"maya":"jáan páay","es":"arrebatar, quitar algo bruscamente"},{"maya":"jáay mool","es":"recoger todo de manera completa"},{"maya":"ja'","es":"agua"},{"maya":"ja'ja'al","es":"temporada de lluvias"},{"maya":"ja'ab","es":"año"},{"maya":"ja'ach'","es":"aguado"},{"maya":"ja'an","es":"yerno"},{"maya":"ja'as","es":"plátano"},{"maya":"ja'atska'","es":"temprano, por la mañana"},{"maya":"ja'ats'","es":"limpiar de escombros alguna cavidad"},{"maya":"jeech","es":"abrir las piernas"},{"maya":"jeech","es":"esquivar, evitar"},{"maya":"jeek'","es":"desgajar, separar"},{"maya":"jeel","es":"diferente, variado"},{"maya":"jeel","es":"mudar, cambiar"},{"maya":"jeel","es":"sucesor, suplente; suplemento"},{"maya":"jeep'","es":"anudar apretadamente; apretar"},{"maya":"jeets'","es":"afirmar; asentar con firmeza"},{"maya":"jéechkab","es":"lo que está abierto"},{"maya":"jéechk'ab","es":"abierto"},{"maya":"jeek'","es":"rama, gajo, racimo"},{"maya":"jéentan","es":"atropellar, empujar"},{"maya":"jéesbal","es":"cansancio, ahogo; acezar, jadear"},{"maya":"jéets méek'","es":"cargar a un niño a horcajadas sobre la cadera"},{"maya":"je'","es":"abrir"},{"maya":"je'","es":"huevo"},{"maya":"jiich'","es":"ceñir, apretar"},{"maya":"jiit'","es":"trenzar, tejer"},{"maya":"jíil","es":"sacar, desenvainar; arrastrar algo"},{"maya":"ji'","es":"planchar, alisar"},{"maya":"jobnel","es":"vientre, entrañas"},{"maya":"joch'ob","es":"hacerse convidar a la hora de comer; comer de mogollón"},{"maya":"jojolkij","es":"engrasado, resbaloso, lubricado"},{"maya":"jom xa'ani","es":"calandria de color amarillo y negro, parecida a la oropéndola"},{"maya":"joroch'","es":"bola de masa en forma de cono hueco que se pone a cocer dentro del caldo de frijol"},{"maya":"jooch","es":"cosecha de maíz, pizca; cosechar"},{"maya":"jooch'ob","es":"persona que se hace convidar a la hora de comer"},{"maya":"jook","es":"arrancar una planta o algo clavado"},{"maya":"jook'","es":"lazo, nudo"},{"maya":"jook'","es":"asir, lazar, atar, enganchar, trabar"},{"maya":"jook'ob","es":"gancho"},{"maya":"jool","es":"agujero, hueco, hoyo; agujerear"},{"maya":"joolok'","es":"glotón, goloso"},{"maya":"joonaj","es":"puerta"},{"maya":"joop","es":"encender"},{"maya":"joots'","es":"desclavar, desencajar, sacar, zafar"},{"maya":"jooykep","es":"hombre perezoso, haragán, holgazán (dicho con grosería)"},{"maya":"jooypel","es":"mujer floja, perezosa (dicho con grosería)"},{"maya":"jóoy","es":"vaciar una cosa que está atestada"},{"maya":"jóoyab","es":"regar"},{"maya":"jo'","es":"así se le denomina a la ciudad de Mérida"},{"maya":"jo'oljeak","es":"ayer"},{"maya":"jun","es":"uno"},{"maya":"juub","es":"desbaratar, desmoronar, deshacer"},{"maya":"juuch'","es":"molido; moler, triturar"},{"maya":"juuj","es":"iguana, iguano"},{"maya":"juuk'","es":"gatear"},{"maya":"juul","es":"enhebrar, ensartar, atravesar"},{"maya":"juul","es":"alumbrar, afocar"},{"maya":"juum","es":"vocerío, gritería, alboroto, bullicio"},{"maya":"juun","es":"solo, único"},{"maya":"júuk","es":"abrigar; llevar algo en los brazos; empollar el ave"},{"maya":"júuy","es":"mover en círculos algún líquido o pasta para revolverla mientras se cuece"},{"maya":"ju'un","es":"papel"},{"maya":"k","es":"indica la primera persona del plural"},{"maya":"ka","es":"luego; en pretérito y futuro le precede otra oración"},{"maya":"kakaw","es":"cacao"},{"maya":"kalan","es":"cuidar"},{"maya":"kala'an","es":"borracho, ebrio, beodo"},{"maya":"kal k'ab","es":"muñeca de la mano"},{"maya":"kama'ach","es":"quijada, mandíbula inferior"},{"maya":"kampach","es":"lumbago; dolor de espalda"},{"maya":"kan","es":"cuatro"},{"maya":"kanan","es":"cuidar, guardar"},{"maya":"kay","es":"pez, pescado"},{"maya":"kayche'","es":"aguja que sirve para urdir hamaca"},{"maya":"kaab","es":"abeja"},{"maya":"kaab","es":"miel"},{"maya":"kaab","es":"el mundo o la tierra"},{"maya":"kaabal","es":"abajo, debajo, bajo, hacia o en un lugar inferior"},{"maya":"kaach","es":"quebrar, fracturar"},{"maya":"kaaj","es":"pueblo, patria, tierra o lugar de origen"},{"maya":"kaal","es":"garganta o cuello del hombre, del animal o de cualquier cosa como la botella o el cántaro"},{"maya":"kaanbal","es":"aprender"},{"maya":"kaan","es":"culebra, víbora, serpiente"},{"maya":"kaax","es":"gallina"},{"maya":"kaax","es":"buscar, hallar, encontrar"},{"maya":"káajal","es":"empezar, comenzar, iniciar"},{"maya":"káakbach","es":"mala mujer; prostituta"},{"maya":"káal","es":"en composición, muy, mucho"},{"maya":"káat","es":"tinaja o depósito de agua hecho de barro, de boca ancha y fondo angosto"},{"maya":"ka'","es":"dos, segundo, segunda vez, otra vez"},{"maya":"ka'ka'ate'","es":"al rato, mas tarde"},{"maya":"ka'nal","es":"cansancio"},{"maya":"ka'ojej","es":"antier, anteayer"},{"maya":"ka'abej","es":"pasado mañana"},{"maya":"ka'ach","es":"antiguamente"},{"maya":"ka'ambes","es":"enseñar educar, instruir"},{"maya":"ka'an","es":"cielo, firmamento, atmósfera"},{"maya":"ka'anal","es":"alto, altura, arriba, elevado, superior"},{"maya":"ka'anal","es":"cansarse, fatigarse, agotarse, agobiarse"},{"maya":"keléembal","es":"hombro"},{"maya":"kex","es":"siquiera, aunque sea"},{"maya":"keeb","es":"eructo; eructar"},{"maya":"keep","es":"verga, pene"},{"maya":"keet","es":"igualar, emparejar, concordar"},{"maya":"kéej","es":"venado"},{"maya":"kéex","es":"acción de excitar o provocar las ganas de realizar alguna necesidad fisiológica"},{"maya":"ke'el","es":"frío; escalofrío producido por fiebre o calentura"},{"maya":"kib","es":"vela"},{"maya":"kimen","es":"difunto o muerto"},{"maya":"kisin","es":"demonio, diablo"},{"maya":"kiik","es":"hermana mayor"},{"maya":"kiirits'","es":"sucio, percudido; mugre de la ropa"},{"maya":"kiis","es":"pedo; ventosear, pear"},{"maya":"kíilbaj","es":"trueno, ruido fuerte"},{"maya":"kíilbal","es":"temblor; temblar"},{"maya":"kíimil","es":"morir; muerte"},{"maya":"ki'","es":"cosa rica, sabrosa, deleitable, gustosa, agradable"},{"maya":"ki' waj","es":"vianda"},{"maya":"ki'ibok","es":"perfumado, Olor agradable al olfato, odorífero"},{"maya":"ki'ichkelem","es":"hermoso, gallardo, lindo, bonito, bello (aplica a hombre)"},{"maya":"ki'ichpam","es":"hermosa, linda, bonita, bella, guapa (aplica a mujer)"},{"maya":"koj","es":"diente"},{"maya":"kolomte'","es":"pájaro carpintero de cabeza roja y cuerpo negro"},{"maya":"kosom","es":"golondrina (Ver también Kusam)"},{"maya":"kool","es":"milpa; tierra labrada o rozada"},{"maya":"kool","es":"tumbar, labrar, desmontar, rozar"},{"maya":"koonol","es":"venta; vender; vendedor"},{"maya":"koop","es":"enrollar, encorvar, enroscar"},{"maya":"koot","es":"albarrada, cerca de piedra; acción y efecto de cercar"},{"maya":"koots'","es":"arrollar, enroscar"},{"maya":"koox","es":"oco-faisán"},{"maya":"kóoch","es":"ancho, espacio amplio"},{"maya":"kóochak'","es":"patada, puntapié"},{"maya":"kóojol","es":"llegada; llegar"},{"maya":"kóok","es":"sordo, insonoro"},{"maya":"kóokay","es":"luciérnaga, cocullo"},{"maya":"kóol","es":"jalar, apartar, despojar, quitar"},{"maya":"kóol keep","es":"masturbación del hombre"},{"maya":"kóom","es":"corto, breve"},{"maya":"ko'","es":"travieso, revoltoso, pícaro, atrevido, terco"},{"maya":"ko'il","es":"rabia"},{"maya":"ko'oj","es":"cosa cara; precio o costo elevado"},{"maya":"ko'olel","es":"señora, mujer casada o con hijos"},{"maya":"kukiins","es":"sentar, asentar"},{"maya":"kukupkij","es":"época o momento en que no hay brisa o viento, produciéndose mucho calor"},{"maya":"kusam","es":"golondrina"},{"maya":"kutal","es":"sentar, sentarse"},{"maya":"kuxtal","es":"vida, existencia"},{"maya":"kuuch","es":"carga que se lleva a cuestas"},{"maya":"kuuch","es":"cargo, obligación, culpa"},{"maya":"kuum","es":"olla"},{"maya":"kuuts","es":"pavo silvestre, pavo montés de esta tierra"},{"maya":"kúuchil","es":"lugar, sitio, asiento, fundación"},{"maya":"kúuk","es":"codo"},{"maya":"ku'uch","es":"difícil, duro, dificultoso, trabajoso"},{"maya":"ku'uk","es":"ardilla"},{"maya":"ku'ul","es":"acción de frotar aplicando pomada o polvo"},{"maya":"k'ab","es":"mano, brazo, antebrazo, pata de animal"},{"maya":"k'ab","es":"manija de cualquier objeto, asa"},{"maya":"k'ab","es":"rama de árbol o arbusto"},{"maya":"k'abax","es":"comida sin condimento; simple salcocho sin sazón"},{"maya":"k'abéet","es":"cosa necesaria, útil"},{"maya":"k'aj","es":"reconocer, recordar, acordar"},{"maya":"k'ak'al","es":"seco, flaco"},{"maya":"k'ampile'en","es":"amarillento en el color ( K'ANPILE'EN)"},{"maya":"k'anbul","es":"oco-Faisán"},{"maya":"k'an ch'uuy","es":"pálido, amarillento"},{"maya":"k'asa'an","es":"cruel, malvado"},{"maya":"k'at","es":"barro o arcilla utilizado para hacer objetos de cerámica"},{"maya":"k'at","es":"vasija de barro"},{"maya":"k'atab che'","es":"cruz"},{"maya":"k'ax nak'","es":"faja, cinturón, cincha"},{"maya":"k'aab","es":"caldo, jugo, zumo"},{"maya":"k'aaba'","es":"nombre genérico y propio de cualquier persona, animal o cosa"},{"maya":"k'aal","es":"abrochar, trabar, cerrar, encerrar, enjaular, clausurar, detener"},{"maya":"k'aam","es":"hospedar"},{"maya":"k'aan","es":"amarillo, cosa amarilla"},{"maya":"k'aan k'uxub","es":"una variedad de mariposa de alas amarillas"},{"maya":"k'aan lool","es":"planta bignoniácea de flores amarillas"},{"maya":"k'aas","es":"feo, ruín, malo, maldito, inservible"},{"maya":"k'aat","es":"pasar atravesando, cruzar."},{"maya":"k'aax","es":"amarrar, atar, liar, fajar, vendar herida"},{"maya":"k'aay","es":"música, canción, pregón; cantar, gorjear; rezar con cantos"},{"maya":"k'áak'","es":"fuego, lumbre, fogón, hoguera"},{"maya":"k'áak'náab","es":"mar, océano"},{"maya":"k'áak't","es":"asar al fuego"},{"maya":"k'áanche'","es":"banquillo hecho de madera"},{"maya":"k'áankaab","es":"suelo humocarbonatado de color rojo"},{"maya":"k'áas","es":"atajo, división, cerco; atajar, impedir, cercar"},{"maya":"k'áat","es":"pregunta, petición; preguntar, pedir"},{"maya":"k'áat","es":"querer, desear, pretender"},{"maya":"k'a'anan","es":"necesario, valioso, importante"},{"maya":"k'a'aw","es":"grajo, o zanate de esta tierra"},{"maya":"k'a'ay","es":"pregonar, vender voceando"},{"maya":"k'eban","es":"pecado, cualquier actividad mala en contra de la moral"},{"maya":"k'eyem","es":"pozole, bebida hecha a base de masa de maíz cocido"},{"maya":"k'eex","es":"trocar, cambiar, permutar, canjear, rescatar"},{"maya":"k'eey","es":"regaño, represión, camorra; regañar, reprender"},{"maya":"k'éek'en","es":"cerdo, puerco, cochino, marrano"},{"maya":"k'éewel","es":"piel, cuero, pellejo"},{"maya":"k'iil","es":"lastimar la llaga restregándola, renovar la llaga"},{"maya":"k'iin","es":"día, sol, tiempo, época"},{"maya":"k'iin","es":"sacerdote, cura, presbítero"},{"maya":"k'íich","es":"calentarse al sol o junto a las brasas"},{"maya":"k'íilkab","es":"trasnpiración, sudor; transpirar, sudar"},{"maya":"k'íint","es":"calentar, entibiar"},{"maya":"k'i'ik'","es":"sangre"},{"maya":"k'i'inam","es":"dolor físico o moral, dolor contínuo"},{"maya":"k'i'ix","es":"espina, árbol o hierba espinosa"},{"maya":"k'oja'an","es":"enfermo"},{"maya":"k'olis","es":"trasquilado"},{"maya":"k'omoj","es":"olor a marisco, olor a huevo fresco; cosa de mal olor"},{"maya":"k'oxol","es":"mosquito"},{"maya":"k'ook'","es":"ruiseñor, ave túrdida de melodioso canto"},{"maya":"k'ool","es":"golpear, lastimar, desollar"},{"maya":"k'oop","es":"coscorrón, golpe dado en la cabeza con los nudillos de los dedos estando la mano cerrada"},{"maya":"k'oos","es":"trasquilar, peluquear, rapar, cortar con tijeras cualquier cosa"},{"maya":"k'oos","es":"criado, mozo, sirviente"},{"maya":"k'óoben","es":"cocina, fogón"},{"maya":"k'óoch","es":"embestir, cornear"},{"maya":"k'ook'ol","es":"sucio, manchado, impuro"},{"maya":"k'o'ox","es":"bravo, arisco, indómito, huraño, montaraz"},{"maya":"k'uben","es":"depósito, encargo, encomienda; encomendar, encargar"},{"maya":"k'uchul","es":"llegar, arribar"},{"maya":"k'uj","es":"dios"},{"maya":"k'uub","es":"entregarse, someterse a alguien, dedicarse por completo a algo"},{"maya":"k'uul","es":"vagina; parte genital de la mujer"},{"maya":"k'uup","es":"rebanada, rebanar"},{"maya":"k'uuruch","es":"hombre afeminado, homosexual masculino"},{"maya":"k'uut","es":"machacar, desmenuzar, dehacer estrujando o pisando con mortero"},{"maya":"k'utub","es":"mortero; mano de mortero; vasija de piedra que sirve para machacar algo"},{"maya":"k'úumk'umi","es":"correcaminos"},{"maya":"k'úuts","es":"tabaco"},{"maya":"k'u'","es":"nido, lecho de los animales"},{"maya":"k'u'um","es":"nixtamal"},{"maya":"k'u'uk'um","es":"pluma de ave en general"},{"maya":"k'u'uk'","es":"renuevo, retoño, cogollo"},{"maya":"k'úum","es":"calabaza"},{"maya":"laj","es":"bofetada"},{"maya":"lak","es":"taza de barro, plato o cazuela de barro"},{"maya":"lak'in","es":"oriente, este"},{"maya":"lay","es":"demostrativo: ésto, éste, aquel, aquello"},{"maya":"laab","es":"viejo, carcomido, desgastado, apolillado"},{"maya":"laaj","es":"golpear con la palma de la mano, abofetear"},{"maya":"laak","es":"desprender, despegar, arrancarse algo, quitar"},{"maya":"laam","es":"sumir, hundir"},{"maya":"laap","es":"abrochar, entremeter una cosa en otra"},{"maya":"laap'","es":"puño o puñado de cosas"},{"maya":"láak","es":"compañero, prójimo, pariente"},{"maya":"laak'","es":"otro"},{"maya":"láal","es":"vaciar, verter"},{"maya":"la'","es":"pronombre y adjetivo; contracción de LELA' : éste, ésta, ésto"},{"maya":"la'ach","es":"rasguñar, arañar, rascar"},{"maya":"le ken","es":"cuando"},{"maya":"lekes","es":"persona gorda"},{"maya":"lela'","es":"pronombre demostrativo: éste, ésta, ésto"},{"maya":"lelem cháak","es":"relámpago"},{"maya":"lelo'","es":"pronombre demostrativo: ése, ésa, éso; el mismo, lo mismo"},{"maya":"lelem ka'an","es":"resplandor del rayo o relámpago"},{"maya":"lep' óol","es":"animarse, esforzarse, apresurar, acelerar, trabajar con más ganas"},{"maya":"leti'","es":"él, ella o ello"},{"maya":"leeb","es":"entreabrir, separar con los dedos"},{"maya":"lee'","es":"tender"},{"maya":"léej","es":"sujetar con lazo, lazar"},{"maya":"léekel","es":"retentar, recaer en alguna enfermedad o estado de ánimo"},{"maya":"léekel","es":"empezar, comenzar"},{"maya":"léek' paakat","es":"mirar con ira"},{"maya":"léemba","es":"brillar, relampaguear"},{"maya":"léench'in","es":"empujar"},{"maya":"léets'","es":"pasar la lengua en algo, lamer"},{"maya":"léets'","es":"lambiscón"},{"maya":"léeyli'e'","es":"el mismo, lo mismo, idéntico"},{"maya":"léeyli'e'","es":"siempre"},{"maya":"le'","es":"hoja de cualquier planta"},{"maya":"líik's","es":"levantar"},{"maya":"líil","es":"rociar"},{"maya":"líil","es":"sacudir"},{"maya":"loj","es":"redimir, rescatar, desagraviar"},{"maya":"lot' kéej","es":"calambre (Sinónimo: LO'OT')"},{"maya":"loob","es":"lleno de maleza, lóbrego, enyerbado"},{"maya":"loob","es":"daño, mal; herir, dañar"},{"maya":"looch","es":"encorvar, doblar"},{"maya":"lool","es":"flor; se le llama así a las flores de corola"},{"maya":"loom","es":"punzar, herir con punta, apuñalar"},{"maya":"loot","es":"juntar, pegar, unir"},{"maya":"loox","es":"trompada, puñetazo"},{"maya":"lóobche'","es":"coa"},{"maya":"lóoch","es":"abrazar por el cuello"},{"maya":"lóoch'","es":"puñado"},{"maya":"lo'bayan","es":"adolescente, doncella, moza"},{"maya":"luuk'","es":"lodo, lodazal"},{"maya":"lúub","es":"legua"},{"maya":"lúubul","es":"caer"},{"maya":"lu'uch","es":"cucharear"},{"maya":"lu'um","es":"tierra, suelo, terreno, planeta en que habitamos; lugar donde nacimos"},{"maya":"majan","es":"tomar y pedir prestado; préstamo"},{"maya":"makan","es":"enramada, ramada"},{"maya":"malix","es":"se le da este nombre a los perros o personas sin linaje"},{"maya":"mamayki","es":"suave, delicado, blando"},{"maya":"manak'","es":"vislumbrar apenas, percibir ligeramente"},{"maya":"mak'ajal","es":"trasponer, perder de vista"},{"maya":"maach","es":"asir, agarrar, sujetar, empuñar"},{"maya":"maak","es":"tapa, tapar"},{"maya":"maak'","es":"comer sin masticar y violentamente; comer rápido y mucho"},{"maya":"maam","es":"expresión de respeto para referirse a mujeres de mayor edad"},{"maya":"maan","es":"compra; comprar"},{"maya":"maanal","es":"demasiado, excesivo, pasado de medida o de cantidad"},{"maya":"maax","es":"chile silvestre de esta región"},{"maya":"maax","es":"majar, magullar, aplastar, machacar"},{"maya":"máak","es":"persona, sujeto, fulano"},{"maya":"máan","es":"andar, pasar o cruzar de un lugar a otro"},{"maya":"máan","es":"calmar o cesar; acabar"},{"maya":"máaskab","es":"machete"},{"maya":"máasewal","es":"nativo, aborigen, plebeyo, inculto"},{"maya":"máat","es":"pedir, mendigar"},{"maya":"máatan","es":"mendigo, pordiosero"},{"maya":"máatsab","es":"pestaña"},{"maya":"máax","es":"¿Quién?"},{"maya":"máay","es":"colar, cernir"},{"maya":"ma'","es":"partícula negativa: no"},{"maya":"ma'k'ool","es":"flojo, holgazán, ocioso, negligente"},{"maya":"ma'alob","es":"está bien, muy bien, bueno"},{"maya":"ma'as kaal","es":"ronco, ronquera"},{"maya":"ma'ats'","es":"chupar, lamer, pasar la lengua por algo"},{"maya":"mejen","es":"pequeño, chico (Plural)"},{"maya":"mejen","es":"hijo de hombre; o engendrado por algún hombre"},{"maya":"ment","es":"hacer, elaborar, crear, formar"},{"maya":"metnal","es":"infierno; lugar de penurias, obscuridad, hambre y frío."},{"maya":"meyaj","es":"trabajo; trabajar"},{"maya":"meek","es":"torcer, doblar, encorvar"},{"maya":"meen","es":"ocupación en general"},{"maya":"meen","es":"hacer, elaborar, crear, formar"},{"maya":"méek'","es":"abrazo; abrazar"},{"maya":"me'ex","es":"barba o bigote del hombre; pelo de algunos animales en la quijada inferior"},{"maya":"mina'an","es":"no hay, falta"},{"maya":"mix","es":"ni, tampoco"},{"maya":"mixba'al","es":"nada, ninguno, ninguna"},{"maya":"mix bik'in","es":"nunca, jamás de tiempo venidero"},{"maya":"mixmáak","es":"nadie, ninguno, ninguna persona"},{"maya":"mix tu'ux","es":"en ninguna parte o lugar"},{"maya":"miis","es":"gato doméstico"},{"maya":"míis","es":"escoba"},{"maya":"míis","es":"barrer"},{"maya":"mooch","es":"encoger, acurrucar, agazapar"},{"maya":"mooch'","es":"los dedos de la mano o de los pies en general; patas de las aves"},{"maya":"mook","es":"nudo, amarre de la soga o hilo"},{"maya":"móoch","es":"manco, tullido, lisiado"},{"maya":"much","es":"término respetuoso para solicitar favores"},{"maya":"much'","es":"marchitar"},{"maya":"mukul","es":"encubierto, escondido"},{"maya":"mukuy","es":"tórtola"},{"maya":"muk'yaj","es":"sufrimiento"},{"maya":"mulix","es":"rizado, rizar"},{"maya":"muuch","es":"sapo, rana"},{"maya":"muuk","es":"enterrar, sepultar"},{"maya":"muuk'","es":"fuerza, vigor"},{"maya":"muul","es":"reunir, amontonar"},{"maya":"muum","es":"cosa tierna y sin sazón; fruta antes de madurar"},{"maya":"muum","es":"tierno, blando, delicado, reciente, dócil, verde"},{"maya":"muuts'","es":"cerrar los ojos"},{"maya":"muuts'","es":"marchitarse las flores"},{"maya":"múuyal","es":"nube"},{"maya":"mu'ujul","es":"presente matrimonial; dote que entrega el padre del varón a la familia de la novia"},{"maya":"nab ka'an","es":"paladar"},{"maya":"nak óol","es":"fastidio, disgusto, hastío"},{"maya":"naktáan","es":"encontrar, topar, golpear, atropellar"},{"maya":"nak'","es":"barriga, estómago, panza, vientre"},{"maya":"nal","es":"elote, mazorca y planta de maíz"},{"maya":"naab","es":"nenúfar, loto, ninfa"},{"maya":"naach","es":"asir fuertemente con los dientes"},{"maya":"naach'","es":"coito, hacer el acto sexual"},{"maya":"naach'","es":"resto de comida que queda para el día siguiente, recocido"},{"maya":"naak","es":"arrimar, arrinconar, pegar"},{"maya":"naak'","es":"juntar, acercar, arrimar"},{"maya":"naat'","es":"montar a horcajadas, montar"},{"maya":"naats'","es":"cercano, poco distante, próximo, cerca"},{"maya":"náach","es":"lejos"},{"maya":"náajal","es":"jornal, ganancia, sueldo, salario"},{"maya":"náay","es":"sueño; soñar"},{"maya":"náay","es":"distraer la atención, entretener"},{"maya":"náays óol","es":"distraer, embabucar, engañar, alucinar"},{"maya":"na'","es":"madre"},{"maya":"na' k'ab","es":"dedo pulgar"},{"maya":"na'aj","es":"satisfecho de comida; estómago lleno, atestado, harto"},{"maya":"na'akal","es":"subir, trepar, ascender"},{"maya":"na'at","es":"entendimiento, juicio, razón, inteligencia,; entender, razonar, inteligir."},{"maya":"nej","es":"cola, rabo"},{"maya":"neek' ich","es":"pupila, niña del ojo"},{"maya":"néen","es":"espejo"},{"maya":"néent","es":"espejar"},{"maya":"nées","es":"roer, comer royendo"},{"maya":"nikib","es":"cabecear dormitando"},{"maya":"nikkun","es":"amontonar, formar montones"},{"maya":"nikte'","es":"flor de pétalo"},{"maya":"nikte' ja'","es":"flor de agua"},{"maya":"niich'","es":"risueño, el que ríe y enseña los dientes"},{"maya":"niik","es":"derruir, derrumbar, tumbar, destruir"},{"maya":"ni'","es":"nariz, hocico, trompa; punta"},{"maya":"ni' k'ab","es":"la punta de los dedos; yema del dedo"},{"maya":"ni'mis","es":"plantita conocida en español como \"Pensamiento\""},{"maya":"noj","es":"grande, gran, principal"},{"maya":"noj kaaj","es":"ciudad, cabecera, capital"},{"maya":"noj k'iin","es":"día principal, día de fiesta"},{"maya":"nojoch","es":"cosa grande, mayor, principal"},{"maya":"nojol","es":"sur"},{"maya":"nokkin","es":"poner boca abajo"},{"maya":"nookoy","es":"noblado, nublazón"}];
// Para cada palabra maya se usa un solo significado: el primero que aparece en el diccionario.
const UNIQUE_DICTIONARY = (()=>{ const seen=new Set(); return DICTIONARY.filter(w=>{ const k=(w.maya||'').trim().toLocaleLowerCase(); if(!k || seen.has(k)) return false; seen.add(k); return true; }); })();
const TRASH_POOL=[{icon:"leaf",bin:"organico"},{icon:"bottle",bin:"reciclable"},{icon:"hazard",bin:"noreciclable"}];
const GOAL=8, TIME_LIMIT=60, MAX_LIVES=3, OBJ_LIFETIME=6000, SPEED=150, TIME_BONUS=15;

let completed={}; let allGlossary=[];
let attemptsUsed={};
try { attemptsUsed = JSON.parse(localStorage.getItem("ukaax-attempts") || "{}") || {}; } catch (_) { attemptsUsed = {}; }
let npcName=localStorage.getItem("ukaax-npc-name")||"Ixchel";
let playerName=localStorage.getItem("ukaax-player-name")||"";
let playerAvatar=localStorage.getItem("ukaax-player-avatar")||"🧑🏽‍🌾";
let selectedAvatar=playerAvatar;
let profileStep="player";
let quizIndex=0, quizCorrect=0, quizCurrent=null;
try { completed = JSON.parse(localStorage.getItem("ukaax-completed") || "{}") || {}; } catch (_) { completed = {}; }
let state, spawnTimer=null, tickTimer=null, rafId=null, lastTs=0, puzzleCleanup=null;
const $=id=>document.getElementById(id);

/* AUDIO */
let actx=null, masterGain=null, musicInt=null, muted=false;
const SCALE=[261.63,293.66,329.63,392.00,440.00,523.25,587.33];
// Música de fondo personalizable: coloca tu archivo en assets/audio/musica.mp3.
const bgMusic = new Audio("assets/audio/musica.mp3");
bgMusic.loop = true;
bgMusic.preload = "auto";
bgMusic.volume = 0.28;
let bgMusicAvailable = true;
bgMusic.addEventListener("error", () => { bgMusicAvailable = false; });
function startBackgroundMusic(){
  if(muted || !bgMusicAvailable) return;
  const promise = bgMusic.play();
  if(promise && typeof promise.catch === "function") promise.catch(()=>{});
}
function syncAudioMute(){
  bgMusic.muted = muted;
  if(masterGain) masterGain.gain.value = muted ? 0 : 0.07;
  $("mute-btn").textContent = muted ? "🔇" : "🔊";
  if(!muted) startBackgroundMusic();
}
function initAudio(){
  if(!actx){
    actx=new (window.AudioContext||window.webkitAudioContext)();
    masterGain=actx.createGain(); masterGain.gain.value=muted?0:0.07; masterGain.connect(actx.destination);
  }
  if(actx.state === "suspended") actx.resume().catch(()=>{});
  startBackgroundMusic();
}
function playNote(freq,dur,type,vol){
  if(!actx) return;
  const o=actx.createOscillator(), g=actx.createGain();
  o.type=type; o.frequency.value=freq;
  g.gain.setValueAtTime(0,actx.currentTime);
  g.gain.linearRampToValueAtTime(vol,actx.currentTime+0.03);
  g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+dur);
  o.connect(g); g.connect(masterGain);
  o.start(); o.stop(actx.currentTime+dur+0.05);
}
function sfx(ok){ playNote(ok?660:180, ok?0.25:0.3, ok?'square':'sawtooth', 0.09); }
$("mute-btn").onclick=()=>{ muted=!muted; syncAudioMute(); };

const LEVEL_ART={"casa": "assets/escenarios/casa.png", "escuela": "assets/escenarios/escuela.png", "parque": "assets/escenarios/parque.png", "kaax": "assets/escenarios/kaax.png",
  "memoria": "assets/escenarios/memoria.png", "construye": "assets/escenarios/construye.png", "mercado": "assets/escenarios/mercado.png", "templo": "assets/escenarios/templo.png"};
/* SCREENS */
function isLevelUnlocked(i){
  if(i===0) return true;
  return LEVELS.slice(0,i).every(l=>!!completed[l.id]);
}
function buildLevelGrid(){
  const profileReady=!!playerName;
  $("level-grid").classList.toggle("hidden",!profileReady);
  $("progress-label").classList.toggle("hidden",!profileReady);
  $("btn-new-player").classList.toggle("hidden",!profileReady);
  $("btn-mayatets").classList.toggle("hidden",!profileReady);
  const grid=$("level-grid"); grid.innerHTML="";
  LEVELS.forEach((lvl,i)=>{
    const unlocked=isLevelUnlocked(i);
    const c=document.createElement("button"); c.type="button"; c.className="level-card"+(unlocked?"":" locked"); c.disabled=!unlocked;
    const tries=Math.max(0,3-(attemptsUsed[lvl.id]||0));
    c.innerHTML=(unlocked?'<img class="level-art" alt="Ilustración de '+lvl.name+'" src="'+LEVEL_ART[lvl.id]+'">':'<div class="ic">🔒</div>')+'<div class="nm">'+lvl.name+'</div><div class="mg">'+lvl.minigame+'</div><div class="mg">'+(completed[lvl.id]?'✅ Completado':(tries===0?'Puedes volver a intentarlo': 'Oportunidades: '+tries+'/3'))+'</div>';
    const art=c.querySelector(".level-art");
    if(art) art.onerror=function(){ this.outerHTML='<div class="ic placeholder-ic">'+lvl.icon+'</div>'; };
    c.onclick=()=>{ if(unlocked) startLevel(i); };
    grid.appendChild(c);
  });
  if($("player-level-label")) updatePlayerLevelLabel();
  $("progress-label").textContent="Progreso: "+LEVELS.filter(l=>completed[l.id]).length+" de "+LEVELS.length+" niveles completados. Cada nivel tiene 3 oportunidades de superación.";
  applyLevelTab();
}
let activeLevelTab=0;
function applyLevelTab(){
  const grid=$("level-grid"); if(!grid)return;
  grid.dataset.tab=String(activeLevelTab);
  document.querySelectorAll(".level-tab").forEach(b=>{const active=Number(b.dataset.tab)===activeLevelTab;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));});
  const quiz=$("btn-mayatets"); if(quiz) quiz.classList.toggle("tab-hidden",activeLevelTab!==1);
}
document.querySelectorAll(".level-tab").forEach(b=>b.addEventListener("click",()=>{activeLevelTab=Number(b.dataset.tab);applyLevelTab();}));
function updatePlayerLevelLabel(){
  const next=LEVELS.findIndex((l,i)=>!completed[l.id]);
  const label=next<0?"Todos los niveles completados":("Nivel actual: "+LEVELS[next].name);
  const el=$("player-level-label"); if(el) el.textContent=label;
}
function showPlayerProfile(){
  $("profile-panel").classList.add("hidden");
  $("player-profile").classList.remove("hidden");
  $("player-name").value=playerName;
  document.querySelectorAll('.avatar-choice').forEach(b=>{b.classList.toggle('selected',b.dataset.avatar===selectedAvatar);});
  updatePlayerLevelLabel();
}
document.querySelectorAll('.avatar-choice').forEach(b=>b.addEventListener('click',()=>{
  selectedAvatar=b.dataset.avatar;
  document.querySelectorAll('.avatar-choice').forEach(x=>x.classList.toggle('selected',x===b));
}));
$("btn-new-player").onclick=()=>{
  if(!confirm("Esto borrará tu nombre, tu NPC y tu progreso guardado en este navegador para que otra persona pueda jugar desde cero. ¿Continuar?")) return;
  try{
    localStorage.removeItem("ukaax-npc-name");
    localStorage.removeItem("ukaax-player-name");
    localStorage.removeItem("ukaax-player-avatar");
    localStorage.removeItem("ukaax-attempts");
    localStorage.removeItem("ukaax-completed");
  }catch(_){}
  location.reload();
};
$("btn-save-player").onclick=()=>{
  playerName=$("player-name").value.trim().slice(0,22);
  if(!playerName){ $("player-name").focus(); $("player-name").placeholder="Escribe tu nombre primero"; return; }
  playerAvatar=selectedAvatar;
  try{localStorage.setItem("ukaax-player-name",playerName);localStorage.setItem("ukaax-player-avatar",playerAvatar)}catch(_){}
  $("player-profile").classList.add("hidden");
  buildLevelGrid();
};
$("start-tap").onclick=(e)=>{e.stopPropagation();goToSelect();};
document.addEventListener("keydown",e=>{ if(e.key==="Enter" && !$("start-screen").classList.contains("hidden")){e.preventDefault();goToSelect();} });
function goToSelect(){
  initAudio();
  $("start-screen").classList.add("hidden");
  $("quiz-screen").classList.add("hidden");
  $("game-screen").classList.add("hidden");
  $("end-screen").classList.add("hidden");
  $("select-screen").classList.remove("hidden");
  npcName = npcName || "Ixchel";
  if(playerName){
    $("player-profile").classList.add("hidden");
  } else {
    $("player-profile").classList.remove("hidden");
    $("player-name").focus();
  }
  buildLevelGrid();
}
$("btn-restart").onclick=()=>{ allGlossary=[]; $("end-screen").classList.add("hidden"); buildLevelGrid(); $("select-screen").classList.remove("hidden"); };
$("btn-back-select").onclick=()=>{ if(state && state.running){ state.running=false; state.ended=true; clearTimers(); } $("game-screen").classList.add("hidden"); $("vocab-overlay").classList.add("hidden"); buildLevelGrid(); $("select-screen").classList.remove("hidden"); };
$("btn-mayatets").onclick=()=>startQuiz();
$("btn-quiz-back").onclick=()=>{ $("quiz-screen").classList.add("hidden"); buildLevelGrid(); $("select-screen").classList.remove("hidden"); };
/* INPUT (teclado, PC) */
const keys={up:false,down:false,left:false,right:false};
const KEYMAP={ArrowUp:'up',KeyW:'up',ArrowDown:'down',KeyS:'down',ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right'};
document.addEventListener("keydown",e=>{ const k=KEYMAP[e.code]; if(k) keys[k]=true; });
document.addEventListener("keyup",e=>{ const k=KEYMAP[e.code]; if(k) keys[k]=false; });
function releaseTouchDirection(btn){
  const dir=btn.dataset.dir; if(dir && Object.prototype.hasOwnProperty.call(keys,dir)) keys[dir]=false;
  btn.classList.remove("pressed");
}
document.querySelectorAll(".touch-btn").forEach(btn=>{
  const dir=btn.dataset.dir;
  const press=e=>{ e.preventDefault(); keys[dir]=true; btn.classList.add("pressed"); if(btn.setPointerCapture && e.pointerId!==undefined){ try{btn.setPointerCapture(e.pointerId);}catch(_){} } };
  const release=e=>{ if(e) e.preventDefault(); releaseTouchDirection(btn); };
  btn.addEventListener("pointerdown",press);
  btn.addEventListener("pointerup",release);
  btn.addEventListener("pointercancel",release);
  btn.addEventListener("lostpointercapture",release);
});
window.addEventListener("blur",()=>{ Object.keys(keys).forEach(k=>keys[k]=false); document.querySelectorAll(".touch-btn").forEach(releaseTouchDirection); });
document.addEventListener("visibilitychange",()=>{ if(document.hidden) Object.keys(keys).forEach(k=>keys[k]=false); });

/* STATE */
function newState(levelIndex){
  return { levelIndex, lives:MAX_LIVES, goalCount:0, time:TIME_LIMIT,
           unlockedThisLevel:[], running:true, ended:false, px:50,py:50, carrying:null, binInside:null, markers:[] };
}
function clearTimers(){
  if(typeof puzzleCleanup==="function"){ puzzleCleanup(); puzzleCleanup=null; }
  if(spawnTimer!==null) clearInterval(spawnTimer);
  if(tickTimer!==null) clearInterval(tickTimer);
  if(rafId!==null) cancelAnimationFrame(rafId);
  spawnTimer=null; tickTimer=null; rafId=null;
}

function startLevel(idx){
  const lvl=LEVELS[idx];
  const old=document.getElementById("level-intro"); if(old) old.remove();
  const overlay=document.createElement("div"); overlay.id="level-intro"; overlay.className="level-intro-overlay";
  overlay.innerHTML=`<div class="level-intro-card theme-${lvl.id}"><div class="intro-emblem">${lvl.icon}</div><p class="intro-kicker">U K’ÁAX · GUARDIANES DE LA TIERRA</p><h2>${lvl.name}</h2><div class="intro-minigame">${lvl.minigame}</div><p class="intro-hint">${lvl.hint}</p><div class="intro-tip">🌿 Cuida la naturaleza y aprende palabras mayas</div><button type="button" class="btn intro-start">Entrar al minijuego ▶</button><button type="button" class="intro-back">Volver a escenarios</button></div>`;
  document.body.appendChild(overlay);
  overlay.querySelector(".intro-start").onclick=()=>{overlay.remove(); startLevelNow(idx);};
  overlay.querySelector(".intro-back").onclick=()=>{ overlay.remove(); $("game-screen").classList.add("hidden"); buildLevelGrid(); $("select-screen").classList.remove("hidden"); };
}
function startLevelNow(idx){
  clearTimers();
  state=newState(idx); state.questionOpen=false;
  const lvl=LEVELS[idx];
  keys.up=keys.down=keys.left=keys.right=false;
  $("select-screen").classList.add("hidden");
  $("game-screen").classList.remove("hidden");
  $("level-title").textContent=lvl.icon+" "+lvl.name+" — "+lvl.minigame+" · "+playerAvatar+" "+playerName+" · Guía: "+npcName;
  $("hint").textContent=lvl.hint;
  $("res-icon").textContent=lvl.resIcon;
  const pa=$("play-area");
  pa.className="theme-"+lvl.id;
  pa.querySelectorAll(".obj,.zone,.decor,.player,.map-marker").forEach(e=>e.remove());
  renderHud(); renderGlossaryStrip();

  const isPuzzle=PUZZLE_TYPES.includes(lvl.type);
  $("game-screen").classList.toggle("mode-puzzle",isPuzzle);
  if(isPuzzle){
    $("timer").textContent="⏱ --";
    pa.innerHTML="";
    startPuzzleLevel(lvl);
    return;
  }

  renderScenery(lvl);
  const player=document.createElement("div"); player.className="player"; player.id="player";
  player.innerHTML='<span class="player-avatar" aria-label="Jugador">'+playerAvatar+'</span>';
  pa.appendChild(player);
  const rect=pa.getBoundingClientRect();
  state.px=rect.width/2-23; state.py=rect.height/2-23;

  if(lvl.type==="sort"){
    ["organico","reciclable","noreciclable"].forEach(b=>{
      const z=document.createElement("div"); z.className="zone "+b; z.dataset.bin=b;
      z.innerHTML = b==="organico"?"<span>🍂</span>Orgánico":b==="reciclable"?"<span>♻️</span>Reciclable":"<span>🚯</span>No reciclable";
      pa.appendChild(z);
    });
  }
  spawnTimer=setInterval(()=>spawnObject(lvl), lvl.type==="sort"?1900:1900);
  tickTimer=setInterval(tick,1000);
  spawnObject(lvl);
  lastTs=performance.now();
  rafId=requestAnimationFrame(loop);
}
function tick(){
  if(!state || !state.running || state.ended) return;
  state.time = Math.max(0, state.time - 1);
  $("timer").textContent="⏱ "+state.time+"s";
  if(state.time===0){
    // Se pausa una sola vez al llegar a cero; la pregunta no se repite en bucle.
    state.running=false;
    if(spawnTimer!==null) clearInterval(spawnTimer);
    if(tickTimer!==null) clearInterval(tickTimer);
    spawnTimer=null; tickTimer=null;
    triggerVocab(LEVELS[state.levelIndex], 'timeup');
  }
}
function renderHud(){
  const lvl=LEVELS[state.levelIndex]; const used=attemptsUsed[lvl.id]||0;
  const remaining=Math.max(0,3-used);
  $("lives").textContent="🌟".repeat(remaining)+"☆".repeat(3-remaining);
  $("attempts-label").textContent="Oportunidades para superar este nivel: "+remaining+"/3";
  $("res-fill").style.width=Math.min(100,(state.goalCount/GOAL)*100)+"%";
  $("goal-count").textContent=state.goalCount+"/"+GOAL;
}
function renderGlossaryStrip(){
  $("glossary-strip").innerHTML="";
  state.unlockedThisLevel.forEach(w=>{ const c=document.createElement("span"); c.className="word-chip"; c.textContent=w.maya+" = "+w.es; $("glossary-strip").appendChild(c); });
}
function positionRandom(el,lvl){
  const pa=$("play-area").getBoundingClientRect();
  const bottomReserve = lvl.type==="sort" ? 76 : 10;
  const x=Math.random()*(Math.max(pa.width-60,60));
  const y=Math.random()*(Math.max(pa.height-70-bottomReserve,60))+6;
  el.style.left=x+"px"; el.style.top=y+"px";
}

/* LOOP */
function loop(ts){
  if(!state || state.ended) return;
  if(!state.running){ rafId=requestAnimationFrame(loop); return; }
  const dt=Math.min(0.05,(ts-lastTs)/1000); lastTs=ts;
  const pa=$("play-area").getBoundingClientRect();
  let dx=0,dy=0;
  if(keys.up) dy-=1; if(keys.down) dy+=1; if(keys.left) dx-=1; if(keys.right) dx+=1;
  if(dx||dy){ const len=Math.hypot(dx,dy); dx/=len; dy/=len; }
  state.px=Math.max(0,Math.min(pa.width-46, state.px+dx*SPEED*dt));
  state.py=Math.max(0,Math.min(pa.height-46, state.py+dy*SPEED*dt));
  const player=$("player");
  if(player) player.style.transform="translate("+state.px+"px,"+state.py+"px)";
  checkCollisions(LEVELS[state.levelIndex]);
  rafId=requestAnimationFrame(loop);
}
function centerOf(el){ return {x:el.offsetLeft+el.offsetWidth/2, y:el.offsetTop+el.offsetHeight/2}; }
function checkCollisions(lvl){
  const pc={x:state.px+23,y:state.py+23};
  if(lvl.type==="sort"){
    if(!state.carrying){
      const items=$("play-area").querySelectorAll(".obj");
      for(const el of items){
        const c=centerOf(el);
        if(Math.hypot(pc.x-c.x,pc.y-c.y)<38){
          state.carrying=el.dataset.bin;
          const tag=document.createElement("div"); tag.className="carry-icon"; tag.id="carry-tag"; tag.innerHTML=ICONS[el.dataset.icon];
          $("player").appendChild(tag);
          el.remove(); break;
        }
      }
    } else {
      const zones=$("play-area").querySelectorAll(".zone");
      let hitBin=null;
      zones.forEach(z=>{
        const r={l:z.offsetLeft,t:z.offsetTop,r:z.offsetLeft+z.offsetWidth,b:z.offsetTop+z.offsetHeight};
        if(pc.x>r.l&&pc.x<r.r&&pc.y>r.t&&pc.y<r.b) hitBin=z.dataset.bin;
      });
      if(hitBin && hitBin!==state.binInside){
        state.binInside=hitBin;
        if(hitBin===state.carrying) registerSuccess(); else { sfx(false); $("hint").textContent="Contenedor incorrecto. ¡Inténtalo con el adecuado!"; setTimeout(()=>{ if(state && state.running) $("hint").textContent=LEVELS[state.levelIndex].hint; },1400); }
        const tag=$("carry-tag"); if(tag) tag.remove();
        state.carrying=null;
      } else if(!hitBin){ state.binInside=null; }
    }
  } else {
    const items=$("play-area").querySelectorAll(".obj");
    for(const el of items){
      const c=centerOf(el);
      if(Math.hypot(pc.x-c.x,pc.y-c.y)<38){
        clearTimeout(el._t);
        const mark=document.createElement("div"); mark.className="map-marker";
        mark.style.left=(el.offsetLeft+el.offsetWidth/2)+"px"; mark.style.top=(el.offsetTop+el.offsetHeight/2)+"px";
        if(lvl.id==="casa"){mark.textContent="💧";mark.setAttribute("aria-label","Fuga reparada");}
        else if(lvl.id==="parque"){mark.textContent="🌳";mark.setAttribute("aria-label","Árbol plantado");}
        else if(lvl.id==="kaax"){mark.textContent="🐾";mark.setAttribute("aria-label","Animal rescatado");}
        else {mark.textContent="✨";}
        $("play-area").appendChild(mark); state.markers.push({x:mark.style.left,y:mark.style.top,icon:mark.textContent});
        el.remove(); registerSuccess(); break;
      }
    }
  }
}

function spawnObject(lvl){
  if(!state || !state.running || state.ended) return;
  if($("play-area").querySelectorAll(".obj").length>=4) return;
  const el=document.createElement("div"); el.className="obj";
  let iconKey;
  if(lvl.type==="sort"){
    const pick=TRASH_POOL[Math.floor(Math.random()*TRASH_POOL.length)];
    iconKey=pick.icon; el.dataset.bin=pick.bin;
  } else {
    iconKey=lvl.objIcons[Math.floor(Math.random()*lvl.objIcons.length)];
    el._t=setTimeout(()=>{ if(el.isConnected){ el.remove(); } },OBJ_LIFETIME);
  }
  el.dataset.icon=iconKey;
  if(lvl.id==="kaax"){
    const animals={bird:"🦜",deer:"🦌",jaguar:"🐆",turtle:"🐢"};
    el.classList.add("animal-target"); el.textContent=animals[iconKey]||"🐾";
  } else {el.innerHTML=ICONS[iconKey];}
  positionRandom(el,lvl); $("play-area").appendChild(el);
}

function registerSuccess(){
  if(!state.running) return;
  sfx(true); state.goalCount++; renderHud();
  if(state.goalCount>=GOAL) endLevelAttempt(true,"¡Escenario liberado!");
}
function registerMiss(lvl){
  // Los errores menores no abren preguntas ni consumen una oportunidad completa.
  // La pregunta de vocabulario aparece únicamente al agotarse el cronómetro.
  sfx(false);
}

function triggerVocab(lvl, context){
  if(!state || state.ended || state.questionOpen) return;
  state.running=false;
  state.questionOpen=true;
  const vocabPool=UNIQUE_DICTIONARY.length ? UNIQUE_DICTIONARY : lvl.vocab;
  const pool=vocabPool.filter(w=>w.maya!==lvl._lastAsked);
  const src=pool.length ? pool : vocabPool;
  const correct=src[Math.floor(Math.random()*src.length)];
  lvl._lastAsked=correct.maya;
  const meanings=[...new Set(vocabPool.map(w=>w.es).filter(es=>es && es!==correct.es))];
  const opts_es=[correct.es];
  while(opts_es.length<4 && meanings.length){ const i=Math.floor(Math.random()*meanings.length); opts_es.push(meanings.splice(i,1)[0]); }
  opts_es.sort(()=>Math.random()-.5);
  $("vocab-title").textContent="¡Se acabó el tiempo! "+(npcName||"Tu guía")+" tiene una pregunta para ti";
  $("vocab-word").textContent=correct.maya;
  $("vocab-word").setAttribute('aria-label','Palabra maya: '+correct.maya);
  const opts=$("vocab-options"); opts.innerHTML=""; $("feedback-msg").textContent="¿Qué significa esta palabra? Responde para ver el resultado y volver a intentar el nivel.";
  opts_es.forEach(es=>{
    const b=document.createElement("button"); b.className="option-btn"; b.textContent=es;
    b.onclick=()=>{
      if(b.disabled || !state || state.ended) return;
      opts.querySelectorAll("button").forEach(x=>x.disabled=true);
      const isCorrect=es===correct.es;
      b.classList.add(isCorrect?"correct":"wrong");
      if(isCorrect && !state.unlockedThisLevel.find(w=>w.maya===correct.maya)){ state.unlockedThisLevel.push(correct); renderGlossaryStrip(); }
      $("feedback-msg").textContent=(isCorrect?"¡Correcto! ":"La respuesta correcta es: ")+correct.es+". Ahora puedes volver a intentar el nivel.";
      const continueBtn=document.createElement('button'); continueBtn.className='btn'; continueBtn.textContent='Volver a intentar nivel'; continueBtn.style.marginTop='12px';
      continueBtn.onclick=()=>{
        $("vocab-overlay").classList.add("hidden");
        state.questionOpen=false;
        endLevelAttempt(false,"Se agotó el tiempo. La pregunta de vocabulario terminó; puedes volver a intentar el nivel.");
      };
      $("feedback-msg").appendChild(document.createElement('br'));
      $("feedback-msg").appendChild(continueBtn);
    };
    opts.appendChild(b);
  });
  $("vocab-overlay").classList.remove("hidden");
}

function endLevelAttempt(won,msg){
  if(!state || state.ended) return;
  state.running=false; state.ended=true; clearTimers();
  const lvl=LEVELS[state.levelIndex];
  if(!won){
    attemptsUsed[lvl.id]=Math.min(3,(attemptsUsed[lvl.id]||0)+1);
    try{localStorage.setItem("ukaax-attempts",JSON.stringify(attemptsUsed));}catch(_){}
  }
  if(won){
    completed[lvl.id]=true;
    try { localStorage.setItem("ukaax-completed", JSON.stringify(completed)); } catch (_) {}
    allGlossary=allGlossary.concat(state.unlockedThisLevel.filter(w=>!allGlossary.find(g=>g.maya===w.maya)));
  }
  $("result-title").textContent=won?"¡Nivel superado! 🌟":"Intento terminado";
  const remaining=Math.max(0,3-(attemptsUsed[lvl.id]||0));
  $("result-msg").textContent=msg+(won?"":"\nOportunidades restantes para superar este nivel: "+remaining+" de 3.");
  const allDone=LEVELS.every(l=>completed[l.id]);
  const btn=$("btn-result-continue");
  let back2=$("btn-result-back");
  if(!back2){ back2=document.createElement("button"); back2.id="btn-result-back"; back2.type="button"; back2.className="btn"; back2.style.marginTop="8px"; btn.parentNode.appendChild(back2); }
  back2.textContent="← Volver a escenarios";
  back2.style.display=won?"none":"";
  back2.onclick=()=>{ $("result-overlay").classList.add("hidden"); $("game-screen").classList.add("hidden"); buildLevelGrid(); $("select-screen").classList.remove("hidden"); };
  if(won) btn.textContent=allDone?"Ver final":"Elegir otro escenario";
  else btn.textContent="Volver a intentar nivel";
  btn.onclick=()=>{
    $("result-overlay").classList.add("hidden"); $("game-screen").classList.add("hidden");
    if(won){ if(allDone) showEnd(); else { buildLevelGrid(); $("select-screen").classList.remove("hidden"); } }
    else { startLevel(state.levelIndex); }
  };
  $("result-overlay").classList.remove("hidden");
}
/* ===================== MINIJUEGOS NUEVOS (tipo "puzzle") ===================== */
function shuffleArr(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function pickRandom(arr,n){ return shuffleArr(arr).slice(0,Math.min(n,arr.length)); }
function startPuzzleTimer(seconds,onTimeout){
  let t=seconds;
  $("timer").textContent="⏱ "+t+"s";
  tickTimer=setInterval(()=>{
    if(!state || !state.running || state.ended){ return; }
    t=Math.max(0,t-1); $("timer").textContent="⏱ "+t+"s";
    if(t<=0){ clearInterval(tickTimer); tickTimer=null; if(state && state.running && !state.ended){ state.running=false; onTimeout(); } }
  },1000);
}
function startPuzzleLevel(lvl){
  const pa=$("play-area");
  if(lvl.type==="memory") buildMemoryGame(lvl,pa);
  else if(lvl.type==="spell") buildSpellGame(lvl,pa);
  else if(lvl.type==="market") buildMarketGame(lvl,pa);
  else if(lvl.type==="temple") buildTempleGame(lvl,pa);
  else if(lvl.type==="clasifica") buildClasificaGame(lvl,pa);
  else if(lvl.type==="siembra") buildSiembraGame(lvl,pa);
  else if(lvl.type==="rescate") buildRescateGame(lvl,pa);
  else if(lvl.type==="rio") buildRioGame(lvl,pa);
}

/* --- Memoria Maya: pares de palabras --- */
function buildMemoryGame(lvl,pa){
  const pairs=pickRandom(lvl.vocab,8);
  let cards=[];
  pairs.forEach((w,i)=>{ cards.push({pid:i,kind:"maya",label:(w.img||"")+" "+w.maya,word:w}); cards.push({pid:i,kind:"es",label:(w.img||"")+" "+w.es,word:w}); });
  cards=shuffleArr(cards);
  pa.innerHTML='<div class="memory-wrap"><p class="puzzle-instructions">Toca dos tarjetas y encuentra la palabra maya junto con su significado.</p><div class="memory-grid" id="memory-grid"></div></div>';
  const grid=$("memory-grid");
  let matches=0, open=[], busy=false;
  cards.forEach((c,idx)=>{
    const b=document.createElement("button"); b.type="button"; b.className="memory-card"; b.dataset.idx=idx;
    b.innerHTML='<span class="mc-inner"><span class="mc-face mc-front">🌿</span><span class="mc-face mc-back">'+c.label+'</span></span>';
    b.onclick=()=>{
      if(busy || !state || !state.running || b.classList.contains("flipped") || b.classList.contains("matched")) return;
      b.classList.add("flipped"); open.push({el:b,card:c});
      if(open.length===2){
        busy=true;
        const a=open[0], z=open[1];
        const ok=a.card.pid===z.card.pid && a.card.kind!==z.card.kind;
        setTimeout(()=>{
          if(ok){
            a.el.classList.add("matched"); z.el.classList.add("matched"); matches++; sfx(true);
            if(!state.unlockedThisLevel.find(w=>w.maya===a.card.word.maya)){ state.unlockedThisLevel.push(a.card.word); renderGlossaryStrip(); }
            $("goal-count").textContent="Pares: "+matches+"/"+pairs.length;
            if(matches>=pairs.length){ endLevelAttempt(true,"¡Encontraste todas las parejas! Gran memoria, Guardián."); return; }
          } else { sfx(false); a.el.classList.remove("flipped"); z.el.classList.remove("flipped"); }
          open=[]; busy=false;
        },700);
      }
    };
    grid.appendChild(b);
  });
  $("goal-count").textContent="Pares: 0/"+pairs.length;
  startPuzzleTimer(100,()=>endLevelAttempt(false,"Se acabó el tiempo. ¡Vuelve a intentarlo!"));
}

/* --- Construye la palabra maya --- */
function runWordTiles(container,word,onSolved,onWrongTry){
  const letters=shuffleArr([...word.maya]);
  if(letters.join("")===word.maya && letters.length>1){ const t0=letters[0]; letters[0]=letters[1]; letters[1]=t0; }
  container.innerHTML='<div class="spell-image">'+(word.img||"🔤")+'</div><div class="spell-slots" id="w-slots"></div><div class="spell-tiles" id="w-tiles"></div><div class="spell-actions"><button type="button" class="btn small" id="w-clear">⌫ Borrar</button></div><p class="spell-feedback" id="w-feedback"></p>';
  const slots=$("w-slots"); [...word.maya].forEach(()=>{ const s=document.createElement("span"); s.className="spell-slot"; slots.appendChild(s); });
  const tiles=$("w-tiles"); let answer=[]; let hintLevel=0;
  letters.forEach(ch=>{
    const t=document.createElement("button"); t.type="button"; t.className="spell-tile"; t.textContent=ch;
    t.onclick=()=>{
      if(t.disabled || !state || !state.running) return;
      t.disabled=true; answer.push({ch,el:t});
      slots.children[answer.length-1].textContent=ch;
      if(answer.length===word.maya.length){
        const built=answer.map(a=>a.ch).join("");
        if(built===word.maya){
          sfx(true); $("w-feedback").className="spell-feedback ok"; $("w-feedback").textContent="¡Correcto! "+word.maya+" = "+word.es;
          tiles.querySelectorAll(".spell-tile").forEach(x=>x.disabled=true);
          setTimeout(onSolved,1100);
        } else {
          sfx(false); hintLevel++;
          const hintTxt=word.maya.slice(0,Math.min(hintLevel,word.maya.length-1))||word.maya[0];
          $("w-feedback").className="spell-feedback bad"; $("w-feedback").textContent="Así no es. Pista: empieza con “"+hintTxt+"…”.";
          const keepGoing=onWrongTry?onWrongTry():true;
          setTimeout(()=>{
            if(!state || !state.running) return;
            answer=[]; slots.querySelectorAll(".spell-slot").forEach(s=>s.textContent="");
            tiles.querySelectorAll(".spell-tile").forEach(x=>x.disabled=false);
          },1200);
          if(keepGoing===false) return;
        }
      }
    };
    tiles.appendChild(t);
  });
  $("w-clear").onclick=()=>{
    if(!answer.length) return;
    const last=answer.pop(); slots.children[answer.length].textContent=""; last.el.disabled=false;
  };
}
function buildSpellGame(lvl,pa){
  const words=pickRandom(lvl.vocab,Math.min(6,lvl.vocab.length));
  let round=0;
  pa.innerHTML='<div class="spell-wrap"><p class="puzzle-instructions">Toca las letras en orden para formar la palabra maya de la imagen.</p><div id="spell-stage"></div></div>';
  function playRound(){
    if(round>=words.length){ endLevelAttempt(true,"¡Construiste todas las palabras! Tu maaya t'aan crece cada día."); return; }
    $("goal-count").textContent="Palabra "+(round+1)+"/"+words.length;
    const w=words[round];
    runWordTiles($("spell-stage"),w,()=>{
      if(!state.unlockedThisLevel.find(x=>x.maya===w.maya)){ state.unlockedThisLevel.push(w); renderGlossaryStrip(); }
      round++; playRound();
    });
  }
  playRound();
  startPuzzleTimer(140,()=>endLevelAttempt(false,"Se acabó el tiempo. ¡Vuelve a intentarlo!"));
}

/* --- El Mercado Maya --- */
/* Nota: este minijuego no tiene condición de derrota. Un jugador puede
   equivocarse todas las veces que necesite; después de 2 errores en el
   mismo puesto se le muestra el significado y se resalta el objeto
   correcto, para que siempre pueda aprender y avanzar. Así se evita que
   el nivel se "bloquee" por quedarse sin oportunidades. */
function buildMarketGame(lvl,pa){
  const missions=pickRandom(lvl.vocab,Math.min(6,lvl.vocab.length));
  let round=0, marketMistakes=0;
  pa.innerHTML='<div class="market-wrap"><div class="market-dialog" id="market-dialog"></div><p class="market-sub" id="market-sub"></p><div class="market-stall" id="market-stall"></div></div>';
  function playRound(){
    if(round>=missions.length){ endLevelAttempt(true,"¡Completaste todas las misiones del mercado! Ahora conoces muchas palabras nuevas."); return; }
    const target=missions[round];
    const options=shuffleArr([target,...pickRandom(lvl.vocab.filter(w=>w.maya!==target.maya),3)]);
    $("goal-count").textContent="Misión "+(round+1)+"/"+missions.length;
    $("market-dialog").innerHTML='🧓🏽 Una persona del mercado te pide: encuentra «<span class="market-target">'+target.maya+'</span>»';
    $("market-sub").textContent="Toca el objeto que creas que es "+target.maya+".";
    const stall=$("market-stall"); stall.innerHTML="";
    let wrongHere=0;
    options.forEach(opt=>{
      const b=document.createElement("button"); b.type="button"; b.className="stall-item";
      b.innerHTML='<span class="stall-icon">'+(opt.img||"🧺")+'</span>';
      b.onclick=()=>{
        if(!state || !state.running || b.disabled) return;
        if(opt.maya===target.maya){
          sfx(true); b.classList.add("correct"); stall.querySelectorAll("button").forEach(x=>x.disabled=true);
          $("market-sub").textContent="¡Correcto! "+target.maya+" = "+target.es;
          if(!state.unlockedThisLevel.find(x=>x.maya===target.maya)){ state.unlockedThisLevel.push(target); renderGlossaryStrip(); }
          setTimeout(()=>{ round++; playRound(); },1100);
        } else {
          sfx(false); b.classList.add("wrong"); b.disabled=true; wrongHere++;
          setTimeout(()=>b.classList.remove("wrong"),500);
          if(wrongHere>=2){
            $("market-sub").textContent="Pista: "+target.maya+" significa «"+target.es+"». Busca ese objeto.";
            const correctBtn=Array.from(stall.children).find(x=>!x.disabled && x.querySelector(".stall-icon").textContent===(target.img||"🧺"));
            if(correctBtn) correctBtn.classList.add("hinted");
          } else {
            $("market-sub").textContent="Ese no era. ¡Inténtalo otra vez!";
          }
        }
      };
      stall.appendChild(b);
    });
  }
  playRound();
  startPuzzleTimer(120,()=>endLevelAttempt(false,"Se acabó el tiempo del mercado. Puedes volver a intentarlo."));
}

/* --- REDISEÑO: Clasifica la basura (La Escuela) --- */
const CL_BINS={
  org:{n:"Orgánico",c:"#2e7d32",ico:"🍂",ex:"Orgánico: restos de comida, cáscaras, hojas y poda. Va en bolsa cerrada para que no huela."},
  rec:{n:"Reciclable",c:"#1565c0",ico:"♻️",ex:"Reciclable: PET, papel y cartón limpios y secos, vidrio y latas de aluminio. Deben estar limpios para reciclarse."},
  nor:{n:"No reciclable",c:"#616161",ico:"🚯",ex:"No reciclable: colillas, papel sanitario, pañales y unicel sucio. Ya no se pueden aprovechar."},
  pel:{n:"Peligroso",c:"#c62828",ico:"☣️",ex:"Peligroso: pilas, aceite usado, medicamentos caducados y pinturas. Contaminan el agua y el suelo; llévalos a un centro de acopio."}
};
const CL_POOL=[
  {e:"🍌",n:"Cáscara de plátano",b:"org",w:{maya:"ja'as",es:"plátano",img:"🍌"}},
  {e:"🥬",n:"Restos de comida",b:"org",w:{maya:"janal",es:"comida, alimento",img:"🥬"}},
  {e:"🍂",n:"Hojas secas",b:"org"},
  {e:"🧴",n:"Botella PET limpia",b:"rec",w:{maya:"ja'",es:"agua",img:"💧"}},
  {e:"📰",n:"Periódico seco",b:"rec",w:{maya:"ju'un",es:"papel",img:"📰"}},
  {e:"🥫",n:"Lata de aluminio",b:"rec"},
  {e:"🫙",n:"Frasco de vidrio",b:"rec"},
  {e:"📦",n:"Caja de cartón limpia",b:"rec",w:{maya:"che'",es:"árbol, madera",img:"🪵"}},
  {e:"🚬",n:"Colilla de cigarro",b:"nor"},
  {e:"🧻",n:"Papel sanitario",b:"nor"},
  {e:"🍼",n:"Pañal usado",b:"nor"},
  {e:"🛍️",n:"Bolsa de unicel sucia",b:"nor"},
  {e:"🔋",n:"Pila gastada",b:"pel"},
  {e:"🛢️",n:"Aceite de motor usado",b:"pel"},
  {e:"💊",n:"Medicamento caducado",b:"pel"}
];
function buildClasificaGame(lvl,pa){
  const myState=state, WIN=10, MAXMIS=5;
  const live=()=>state===myState && !state.ended;
  let good=0, mistakes=0, lives=3, sel=null, items=[];
  pa.innerHTML='<div class="cl-wrap"><div class="cl-field" id="cl-field"></div>'+
    '<div class="cl-bins">'+Object.entries(CL_BINS).map(([k,v])=>'<button type="button" class="cl-bin" data-b="'+k+'" style="background:'+v.c+'"><span>'+v.ico+'</span><br>'+v.n+'</button>').join("")+'</div>'+
    '<p class="cl-tip" id="cl-tip">Toca un residuo que cae y luego el contenedor correcto.</p></div>';
  const field=$("cl-field");
  const tip=(t,cls)=>{ const el=$("cl-tip"); if(!el) return; el.className="cl-tip "+(cls||""); el.textContent=t; };
  const status=()=>{ $("goal-count").textContent="Clasificados "+good+"/"+WIN; $("attempts-label").textContent="Vidas: "+"❤️".repeat(lives)+" · Errores "+mistakes+"/"+MAXMIS; };
  function mistake(){
    mistakes++;
    if(mistakes>=MAXMIS){ mistakes=0; lives--; }
    status();
    if(lives<=0) endLevelAttempt(false,"Te quedaste sin vidas. Repasa los contenedores y vuelve a intentarlo.");
  }
  function spawn(){
    if(!live()) return;
    const p=CL_POOL[Math.floor(Math.random()*CL_POOL.length)];
    const d=document.createElement("button"); d.type="button"; d.className="cl-item";
    d.innerHTML=p.e+" "+p.n;
    d.style.left=(8+Math.random()*Math.max(60,field.clientWidth-190))+"px"; d.style.top="-44px";
    d.onclick=()=>{ if(!live()) return; field.querySelectorAll(".sel").forEach(x=>x.classList.remove("sel")); d.classList.add("sel"); sel=d; tip("Ahora toca el contenedor correcto para: "+p.n+"."); };
    field.appendChild(d);
    items.push({el:d,y:-44,p,v:20+Math.min(good,10)*2});
  }
  function step(){
    if(!live()) return;
    for(const it of [...items]){
      it.y+=it.v*0.05; it.el.style.top=it.y+"px";
      if(it.y>field.clientHeight-46){
        it.el.remove(); items=items.filter(x=>x!==it); if(sel===it.el) sel=null;
        tip("Se cayó un residuo sin clasificar: "+it.p.n+". Ponlo en su contenedor más rápido la próxima vez.","bad");
      }
    }
    if(items.length<3 && Math.random()<0.04) spawn();
  }
  pa.querySelectorAll(".cl-bin").forEach(btn=>btn.onclick=()=>{
    if(!live()) return;
    if(!sel){ tip("Primero toca un residuo que esté cayendo."); return; }
    const it=items.find(x=>x.el===sel); if(!it) return;
    items=items.filter(x=>x!==it); it.el.remove(); sel=null;
    if(it.p.b===btn.dataset.b){
      good++; status();
      tip("✔ "+it.p.n+" va en "+CL_BINS[it.p.b].n+". "+CL_BINS[it.p.b].ex,"ok");
      if(it.p.w && !state.unlockedThisLevel.find(x=>x.maya===it.p.w.maya)){ state.unlockedThisLevel.push(it.p.w); renderGlossaryStrip(); }
      if(good>=WIN){ endLevelAttempt(true,"¡Clasificaste la basura correctamente! El escenario vuelve a estar limpio."); return; }
    } else {
      tip("✘ "+it.p.n+" no va en "+CL_BINS[btn.dataset.b].n+". "+CL_BINS[it.p.b].ex,"bad");
      mistake();
    }
  });
  status();
  spawn(); spawnTimer=setInterval(step,50);
  startPuzzleTimer(100,()=>endLevelAttempt(false,"Se acabó el tiempo. Vuelve a intentarlo."));
}

/* --- REDISEÑO: Clasifica en casa (La Na') --- */
function buildCasaGame(lvl,pa){
  const myState=state, WIN=10, MAXMIS=5;
  const live=()=>state===myState && !state.ended;
  const deck=shuffleArr(CL_POOL).slice(0,WIN);
  let idx=0, good=0, mistakes=0, lives=3;
  pa.innerHTML='<div class="cl-wrap"><div class="casa-card" id="casa-card"></div>'+
    '<div class="cl-bins">'+Object.entries(CL_BINS).map(([k,v])=>'<button type="button" class="cl-bin" data-b="'+k+'" style="background:'+v.c+'"><span>'+v.ico+'</span><br>'+v.n+'</button>').join("")+'</div>'+
    '<p class="cl-tip" id="cl-tip">Lee el residuo y toca el contenedor correcto.</p></div>';
  const tip=(t,cls)=>{ const el=$("cl-tip"); if(!el) return; el.className="cl-tip "+(cls||""); el.textContent=t; };
  const status=()=>{ $("goal-count").textContent="Clasificados "+good+"/"+WIN; $("attempts-label").textContent="Vidas: "+"❤️".repeat(lives)+" · Errores "+mistakes+"/"+MAXMIS; };
  const showCard=()=>{ const p=deck[idx]; $("casa-card").innerHTML='<div class="casa-emoji">'+p.e+'</div><div class="casa-name">'+p.n+'</div>'; };
  function mistake(){
    mistakes++;
    if(mistakes>=MAXMIS){ mistakes=0; lives--; }
    status();
    if(lives<=0) endLevelAttempt(false,"Te quedaste sin vidas. Repasa los contenedores y vuelve a intentarlo.");
  }
  pa.querySelectorAll(".cl-bin").forEach(btn=>btn.onclick=()=>{
    if(!live()) return;
    const p=deck[idx];
    if(p.b===btn.dataset.b){
      good++; status();
      tip("✔ "+p.n+" va en "+CL_BINS[p.b].n+". "+CL_BINS[p.b].ex,"ok");
      if(p.w && !state.unlockedThisLevel.find(x=>x.maya===p.w.maya)){ state.unlockedThisLevel.push(p.w); renderGlossaryStrip(); }
      idx++;
      if(good>=WIN){ endLevelAttempt(true,"¡Organizaste toda la basura de tu casa! Así se cuida el hogar."); return; }
      showCard();
    } else {
      tip("✘ "+p.n+" no va en "+CL_BINS[btn.dataset.b].n+". "+CL_BINS[p.b].ex,"bad");
      mistake();
    }
  });
  status(); showCard();
  startPuzzleTimer(120,()=>endLevelAttempt(false,"Se acabó el tiempo. Vuelve a intentarlo."));
}

/* --- REDISEÑO: Siembra en el campo (El Campo) · escena con cerca, 3x5 cuadros --- */
function buildSiembraGame(lvl,pa){
  const myState=state, ROWS=3, COLS=5;
  const live=()=>state===myState && !state.ended;
  const MISSIONS=[
    {t:"Misión 1 · Planta 3 árboles en los cuadros con ⭐",goal:3,ms:2600,gap:2000,max:1},
    {t:"Misión 2 · Planta 4 árboles",goal:4,ms:2200,gap:1700,max:2},
    {t:"Misión 3 · Planta 5 árboles, ¡ya casi!",goal:5,ms:1800,gap:1400,max:2}
  ];
  let mi=0, missionGot=0, total=0, spawnIv=null;
  pa.innerHTML=
    '<div class="sp-wrap">'+
      '<div class="sp-sky"><span class="sp-sun">☀️</span><span class="sp-cloud c1">☁️</span><span class="sp-cloud c2">☁️</span></div>'+
      '<div class="sp-field">'+
        '<span class="sp-deco" style="left:3%;top:6%">🌳</span><span class="sp-deco" style="left:88%;top:4%">🌳</span>'+
        '<span class="sp-deco" style="left:6%;top:52%">🌲</span><span class="sp-deco" style="left:90%;top:58%">🌳</span>'+
        '<span class="sp-animal" style="left:8%;top:78%">🐄</span><span class="sp-animal" style="left:84%;top:80%">🐑</span>'+
        '<span class="sp-animal" style="left:4%;top:30%">🐔</span><span class="sp-animal" style="left:90%;top:30%">🐴</span>'+
        '<div class="sp-fence"><div class="sp-grid" id="sp-grid"></div></div>'+
      '</div>'+
      '<div class="sp-hud"><p class="sp-mission" id="sp-mission"></p><p class="cl-tip" id="cl-tip">Toca los cuadros con ⭐ antes de que se apaguen.</p></div>'+
    '</div>';
  const gridEl=$("sp-grid");
  const tip=(t,cls)=>{ const el=$("cl-tip"); if(!el) return; el.className="cl-tip "+(cls||""); el.textContent=t; };
  const showMission=()=>{ $("sp-mission").textContent=MISSIONS[mi].t+"  ("+missionGot+"/"+MISSIONS[mi].goal+")"; $("goal-count").textContent="Árboles "+total; };
  const cells=[];
  for(let i=0;i<ROWS*COLS;i++){
    const d=document.createElement("button"); d.type="button"; d.className="sp-cell";
    const cell={el:d,st:"empty",lit:false,timer:null};
    d.onclick=()=>tap(cell);
    cells.push(cell); gridEl.appendChild(d);
  }
  function paint(cell){ cell.el.className="sp-cell"+(cell.lit?" hot":"")+(cell.st==="tree"?" tree":""); cell.el.textContent=cell.st==="tree"?"🌳":(cell.lit?"⭐":""); }
  function lightOne(){
    if(!live()) return;
    const m=MISSIONS[mi];
    if(cells.filter(c=>c.lit).length>=m.max) return;
    const free=cells.filter(c=>!c.lit && c.st==="empty");
    if(!free.length) return;
    const cell=free[Math.floor(Math.random()*free.length)];
    cell.lit=true; paint(cell);
    cell.timer=setTimeout(()=>{ if(!live()||!cell.lit) return; cell.lit=false; paint(cell); },m.ms);
  }
  function startMission(){
    if(spawnIv) clearInterval(spawnIv);
    spawnIv=setInterval(lightOne, MISSIONS[mi].gap);
    spawnTimer=spawnIv;
    showMission();
  }
  function tap(cell){
    if(!live()) return;
    if(!cell.lit){ tip(cell.st==="tree"?"Ahí ya hay un árbol. Busca un cuadro con ⭐.":"Ese cuadro todavía no está listo. Espera la ⭐.","bad"); return; }
    clearTimeout(cell.timer);
    cell.lit=false; cell.st="tree"; paint(cell); total++; missionGot++;
    tip("🌳 ¡Árbol plantado!","ok");
    if(missionGot>=MISSIONS[mi].goal){
      mi++; missionGot=0;
      if(mi>=MISSIONS.length){ endLevelAttempt(true,"¡El campo volvió a tener árboles! Completaste las 3 misiones."); return; }
      tip("🎉 ¡Misión cumplida! "+MISSIONS[mi].t,"ok");
      startMission();
    }
    showMission();
  }
  lightOne();
  startMission();
  startPuzzleTimer(150,()=>endLevelAttempt(false,"Se acabó el tiempo. ¡Vuelve a intentarlo!"));
}

/* --- REDISEÑO: Canoa recolectora (La Na') · movimiento libre en las 4 direcciones --- */
function buildRioGame(lvl,pa){
  const myState=state, WIN=12, SPEED=3;
  const live=()=>state===myState && !state.ended;
  let got=0, lives=3, objs=[], bx=0, by=0, tx=null, ty=null, held={};
  pa.innerHTML='<div class="rio-wrap"><div class="rio-river" id="rio-river"><div class="rio-boat" id="rio-boat">🛶</div></div>'+
    '<div class="rio-pad"><button type="button" data-k="up">▲</button><button type="button" data-k="left">◀</button><button type="button" data-k="down">▼</button><button type="button" data-k="right">▶</button></div>'+
    '<p class="cl-tip" id="cl-tip">Mueve tu canoa por el río y atrapa la basura. ¡No atrapes a los peces!</p></div>';
  const river=$("rio-river"), boat=$("rio-boat");
  const tip=(t,cls)=>{ const el=$("cl-tip"); if(!el) return; el.className="cl-tip "+(cls||""); el.textContent=t; };
  const status=()=>{ $("goal-count").textContent="Recogidos "+got+"/"+WIN; $("attempts-label").textContent="Vidas: "+"❤️".repeat(lives); };
  const keyMap={arrowup:"up",w:"up",arrowdown:"down",s:"down",arrowleft:"left",a:"left",arrowright:"right",d:"right"};
  pa.querySelectorAll(".rio-pad button").forEach(b=>{
    const k=b.dataset.k;
    b.onpointerdown=e=>{ e.preventDefault(); tx=null; held[k]=true; };
    b.onpointerup=b.onpointerleave=b.onpointercancel=()=>{ held[k]=false; };
  });
  const kd=e=>{ const k=keyMap[e.key.toLowerCase()]; if(k){ e.preventDefault(); tx=null; held[k]=true; } };
  const ku=e=>{ const k=keyMap[e.key.toLowerCase()]; if(k) held[k]=false; };
  river.onpointerdown=e=>{ if(!live()) return; const rc=river.getBoundingClientRect(); tx=e.clientX-rc.left-16; ty=e.clientY-rc.top-16; };
  const cleanup=()=>{ document.removeEventListener("keydown",kd); document.removeEventListener("keyup",ku); };
  puzzleCleanup=cleanup;
  document.addEventListener("keydown",kd); document.addEventListener("keyup",ku);
  function spawn(){
    const isFish=Math.random()<0.25;
    const p=isFish?{e:"🐟",n:"Pez",fish:true}:CL_POOL[Math.floor(Math.random()*CL_POOL.length)];
    const d=document.createElement("div"); d.className="rio-obj"; d.textContent=p.e;
    river.appendChild(d);
    objs.push({el:d,x:river.clientWidth+20,y:20+Math.random()*(river.clientHeight-60),p});
  }
  function catchObj(o){
    objs=objs.filter(x=>x!==o); o.el.remove();
    const p=o.p;
    if(p.fish){
      lives--; status();
      tip("¡Ese era un pez! Kay significa pez: no lo atrapes. Pierdes una vida.","bad");
      if(lives<=0){ cleanup(); endLevelAttempt(false,"Te quedaste sin vidas. Recuerda: no atrapar a los peces."); }
      return;
    }
    got++; status();
    tip("✔ "+p.n+" va en "+CL_BINS[p.b].n+". "+CL_BINS[p.b].ex,"ok");
    if(p.w && !state.unlockedThisLevel.find(x=>x.maya===p.w.maya)){ state.unlockedThisLevel.push(p.w); renderGlossaryStrip(); }
    if(got>=WIN){ cleanup(); endLevelAttempt(true,"¡Limpiaste el río! Recogiste toda la basura sin atrapar a los peces."); }
  }
  function step(){
    if(!live()) return;
    const W=river.clientWidth, H=river.clientHeight;
    let dx=(held.right?1:0)-(held.left?1:0), dy=(held.down?1:0)-(held.up?1:0);
    if(dx||dy){ tx=null; }
    else if(tx!==null){ dx=Math.sign(tx-bx); dy=Math.sign(ty-by); if(Math.abs(tx-bx)<SPEED) dx=0; if(Math.abs(ty-by)<SPEED) dy=0; if(!dx&&!dy) tx=null; }
    bx=Math.max(0,Math.min(W-40,bx+dx*SPEED)); by=Math.max(0,Math.min(H-40,by+dy*SPEED));
    boat.style.left=bx+"px"; boat.style.top=by+"px";
    const speed=1.2+got*0.12;
    for(const o of [...objs]){
      o.x-=speed; o.el.style.left=o.x+"px"; o.el.style.top=o.y+"px";
      if(Math.hypot((o.x+12)-(bx+16),(o.y+12)-(by+16))<30){ catchObj(o); continue; }
      if(o.x<-60){ o.el.remove(); objs=objs.filter(x=>x!==o); }
    }
    if(objs.length<6 && Math.random()<0.07) spawn();
  }
  bx=river.clientWidth*0.15; by=river.clientHeight/2;
  status(); spawn(); spawnTimer=setInterval(step,30);
  startPuzzleTimer(120,()=>{ cleanup(); endLevelAttempt(false,"Se acabó el tiempo. ¡Vuelve a intentarlo!"); });
}

/* --- REDISEÑO: Rescate de fauna mexicana (El K'áax) --- */
const JG_ANIMALS=[
  {e:"🐆",n:"Jaguar",d:"Es el felino más grande de América. La tala le quita su selva.",w:{maya:"báalam",es:"jaguar",img:"🐆"}},
  {e:"🦜",n:"Guacamaya roja",d:"Vive en las selvas del sur de México. El tráfico de mascotas la amenaza."},
  {e:"🐢",n:"Tortuga marina",d:"Pone sus huevos en playas. La basura y las luces de la ciudad confunden a sus crías.",w:{maya:"áak",es:"tortuga",img:"🐢"}},
  {e:"🦃",n:"Pavo ocelado",d:"Solo vive en la península de Yucatán y Centroamérica. Su monte se reduce cada año.",w:{maya:"kuuts",es:"pavo de monte",img:"🦃"}},
  {e:"🐋",n:"Manatí",d:"Vive en lagunas y costas de Yucatán. Lo dañan las lanchas y las redes de pesca."},
  {e:"🐬",n:"Vaquita marina",d:"Es el mamífero marino más amenazado del mundo. Vive solo en el norte del Golfo de California."},
  {e:"🐒",n:"Mono araña",d:"Vive en las selvas del sureste de México. La tala y los incendios reducen su hogar."},
  {e:"🦅",n:"Águila harpía",d:"Es una de las aves rapaces más grandes del mundo. Necesita selvas altas y tranquilas."},
  {e:"🐗",n:"Tapir",d:"Es el mamífero terrestre más grande de México. La caza y la pérdida de selva lo amenazan."}
];
function buildRescateGame(lvl,pa){
  const myState=state, WIN=5;
  const live=()=>state===myState && !state.ended;
  pa.innerHTML='<div class="jg" id="jg"><p class="cl-tip jg-tip" id="cl-tip">Mueve tu linterna (flechas, WASD o toca la selva). Al iluminar un animal, rescátalo.</p></div>';
  const J=$("jg");
  const W=J.clientWidth, H=J.clientHeight;
  let px=W/2, py=H/2, tx=px, ty=py, found=0, held={};
  const tip=(t,cls)=>{ const el=$("cl-tip"); if(!el) return; el.className="cl-tip jg-tip "+(cls||""); el.textContent=t; };
  const ranger=document.createElement("div"); ranger.className="jg-ranger"; ranger.textContent="🧑🏽‍🌾"; J.appendChild(ranger);
  for(let i=0;i<12;i++){ const l=document.createElement("div"); l.className="jg-leaf"; l.textContent=Math.random()<.5?"🌿":"🍃"; l.style.left=(Math.random()*90)+"%"; l.style.top=(Math.random()*85)+"%"; J.appendChild(l); }
  const list=shuffleArr(JG_ANIMALS).slice(0,8).map(a=>{
    const el=document.createElement("div"); el.className="jg-animal"; el.textContent=a.e;
    const x=20+Math.random()*(W-80), y=20+Math.random()*(H-120);
    el.style.left=x+"px"; el.style.top=y+"px"; J.appendChild(el);
    return {a,el,x:x+16,y:y+16,done:false};
  });
  const kd=e=>{ const k=e.key.toLowerCase(); held[k]=true; if(k.startsWith("arrow")) e.preventDefault(); };
  const ku=e=>{ held[e.key.toLowerCase()]=false; };
  const cleanup=()=>{ document.removeEventListener("keydown",kd); document.removeEventListener("keyup",ku); };
  puzzleCleanup=cleanup;
  document.addEventListener("keydown",kd); document.addEventListener("keyup",ku);
  J.onpointerdown=J.onpointermove=e=>{ if(e.type==="pointermove" && e.buttons===0) return; const rc=J.getBoundingClientRect(); tx=e.clientX-rc.left; ty=e.clientY-rc.top; };
  const on=k=>!!(held[k]);
  function step(){
    if(!live()) return;
    const dx=(on("arrowright")||on("d")?1:0)-(on("arrowleft")||on("a")?1:0);
    const dy=(on("arrowdown")||on("s")?1:0)-(on("arrowup")||on("w")?1:0);
    if(dx||dy){ tx=px+dx*40; ty=py+dy*40; }
    px+=(tx-px)*0.15; py+=(ty-py)*0.15;
    px=Math.max(15,Math.min(W-15,px)); py=Math.max(15,Math.min(H-15,py));
    ranger.style.left=px+"px"; ranger.style.top=py+"px";
    J.style.setProperty("--lx",px+"px"); J.style.setProperty("--ly",py+"px");
    for(const an of list){
      if(an.done) continue;
      const d=Math.hypot(an.x-px,an.y-py);
      an.el.classList.toggle("saw",d<110);
      if(d<40){
        an.done=true; found++; an.el.classList.add("got"); an.el.textContent="✨";
        let msg="✔ Rescataste al "+an.a.n+". "+an.a.d;
        if(an.a.w){ msg+=" Palabra maya: "+an.a.w.maya+" = "+an.a.w.es+"."; if(!state.unlockedThisLevel.find(x=>x.maya===an.a.w.maya)){ state.unlockedThisLevel.push(an.a.w); renderGlossaryStrip(); } }
        tip(msg,"ok");
        $("goal-count").textContent="Rescatados "+found+"/"+WIN;
        if(found>=WIN){ cleanup(); endLevelAttempt(true,"¡Rescataste a "+found+" especies en riesgo de México!"); return; }
      }
    }
  }
  $("goal-count").textContent="Rescatados 0/"+WIN;
  spawnTimer=setInterval(step,30);
  startPuzzleTimer(90,()=>{ cleanup(); endLevelAttempt(false,"Se acabó el tiempo. Los animales siguen en riesgo, ¡inténtalo otra vez!"); });
}

/* --- El Templo de las Palabras --- */
function buildTempleGame(lvl,pa){
  // El templo repasa SOLO el vocabulario que el jugador ya vio en los demás
  // minijuegos (no el diccionario completo), para que las preguntas sean
  // justas y realmente funcionen como un repaso de lo aprendido.
  const seenMaya=new Set(); const pool=[];
  LEVELS.filter(l=>l.id!=="templo").forEach(l=>l.vocab.forEach(w=>{
    const k=w.maya.toLocaleLowerCase();
    if(!seenMaya.has(k)){ seenMaya.add(k); pool.push(w); }
  }));
  const construyeLvl=LEVELS.find(l=>l.id==="construye"), mercadoLvl=LEVELS.find(l=>l.id==="mercado");
  const imgPool=(construyeLvl?construyeLvl.vocab:[]).concat(mercadoLvl?mercadoLvl.vocab:[]);
  let door=0, lives=3, finalCorrect=0;
  pa.innerHTML='<div class="temple-wrap"><div class="temple-progress"><div class="temple-bar" id="temple-bar"></div></div><div class="temple-doors" id="temple-doors"></div><div class="temple-lives" id="temple-lives"></div><div class="temple-stage" id="temple-stage"></div></div>';
  const DOOR_NAMES=["Puerta del Significado","Puerta de las Letras","Puerta de las Imágenes","Puerta Final"];
  function renderDoors(){
    $("temple-doors").innerHTML=DOOR_NAMES.map((n,i)=>'<span class="temple-dot'+(i<door?" done":i===door?" active":"")+'">'+(i+1)+'</span>').join("");
    $("temple-bar").style.width=(door/4*100)+"%";
    $("goal-count").textContent=door<4?DOOR_NAMES[door]:"¡Templo superado!";
  }
  function renderLives(){ $("temple-lives").textContent="❤️".repeat(lives)+"🖤".repeat(3-lives); }
  function loseLife(){
    sfx(false); lives--; renderLives();
    if(lives<=0){ endLevelAttempt(false,"El templo se cierra por hoy. ¡Vuelve a intentarlo!"); return true; }
    return false;
  }
  function nextDoor(){
    door++; renderDoors();
    if(door>=4){ endLevelAttempt(true,"¡Atravesaste las cuatro puertas del Templo de las Palabras! Eres un verdadero Guardián del maaya t'aan."); return; }
    runDoor();
  }
  function runDoor(){
    renderDoors();
    const stage=$("temple-stage");
    if(door===0) runMeaningChallenge(stage,false);
    else if(door===1) runLetterChallenge(stage);
    else if(door===2) runImageChallenge(stage);
    else runMeaningChallenge(stage,true);
  }
  function runMeaningChallenge(stage,isFinal){
    stage.innerHTML='<p class="puzzle-instructions" id="temple-q"></p><div class="temple-options" id="temple-options"></div><p class="spell-feedback" id="temple-feedback"></p>';
    function ask(){
      if(!state || !state.running) return;
      const w=pool[Math.floor(Math.random()*pool.length)];
      const bag=[...new Set(pool.map(x=>x.es).filter(e=>e&&e!==w.es))];
      const opts=[w.es]; while(opts.length<4 && bag.length){ opts.push(bag.splice(Math.floor(Math.random()*bag.length),1)[0]); }
      $("temple-q").textContent=(isFinal?"Prueba final ("+finalCorrect+"/3) — ":"")+"¿Qué significa “"+w.maya+"”?";
      const box=$("temple-options"); box.innerHTML=""; $("temple-feedback").textContent="";
      shuffleArr(opts).forEach(es=>{
        const b=document.createElement("button"); b.type="button"; b.className="option-btn"; b.textContent=es;
        b.onclick=()=>{
          if(!state || !state.running) return;
          box.querySelectorAll("button").forEach(x=>x.disabled=true);
          if(es===w.es){
            sfx(true); b.classList.add("correct"); $("temple-feedback").textContent="¡Correcto!";
            if(!state.unlockedThisLevel.find(x=>x.maya===w.maya)){ state.unlockedThisLevel.push(w); renderGlossaryStrip(); }
            if(isFinal){
              finalCorrect++;
              if(finalCorrect>=3){ setTimeout(nextDoor,900); return; }
              setTimeout(ask,1000); return;
            }
            setTimeout(nextDoor,900);
          } else {
            b.classList.add("wrong"); $("temple-feedback").textContent="La respuesta correcta era: "+w.es;
            if(loseLife()) return;
            setTimeout(ask,1200);
          }
        };
        box.appendChild(b);
      });
    }
    ask();
  }
  function runLetterChallenge(stage){
    const w=imgPool[Math.floor(Math.random()*imgPool.length)];
    runWordTiles(stage,w,()=>{
      if(!state.unlockedThisLevel.find(x=>x.maya===w.maya)){ state.unlockedThisLevel.push(w); renderGlossaryStrip(); }
      nextDoor();
    },()=>{ return !loseLife(); });
  }
  function runImageChallenge(stage){
    const w=imgPool[Math.floor(Math.random()*imgPool.length)];
    stage.innerHTML='<div class="spell-image">'+(w.img||"❓")+'</div><p class="puzzle-instructions">Elige la palabra maya correcta</p><div class="temple-options" id="temple-options"></div><p class="spell-feedback" id="temple-feedback"></p>';
    const opts=shuffleArr([w.maya,...pickRandom(imgPool.filter(x=>x.maya!==w.maya),3).map(x=>x.maya)]);
    const box=$("temple-options");
    opts.forEach(maya=>{
      const b=document.createElement("button"); b.type="button"; b.className="option-btn"; b.textContent=maya;
      b.onclick=()=>{
        if(!state || !state.running) return;
        box.querySelectorAll("button").forEach(x=>x.disabled=true);
        if(maya===w.maya){
          sfx(true); b.classList.add("correct"); $("temple-feedback").textContent="¡Correcto! Significa: "+w.es;
          if(!state.unlockedThisLevel.find(x=>x.maya===w.maya)){ state.unlockedThisLevel.push(w); renderGlossaryStrip(); }
          setTimeout(nextDoor,900);
        } else {
          b.classList.add("wrong"); $("temple-feedback").textContent="La palabra correcta era “"+w.maya+"”.";
          if(loseLife()) return;
          setTimeout(()=>runImageChallenge(stage),1200);
        }
      };
      box.appendChild(b);
    });
  }
  renderLives(); renderDoors(); runDoor();
}

function startQuiz(){
  $("select-screen").classList.add("hidden"); $("quiz-screen").classList.remove("hidden");
  quizIndex=0; quizCorrect=0; nextQuizQuestion();
}
function nextQuizQuestion(){
  if(quizIndex>=10){
    $("quiz-progress").textContent="¡Quiz terminado!";
    $("quiz-question").textContent="Obtuviste "+quizCorrect+" de 10 respuestas correctas.";
    $("quiz-options").innerHTML=""; $("quiz-feedback").textContent=quizCorrect>=7?"¡Muy bien, guardián de la lengua maya!":"¡Buen intento! Practica y vuelve a jugar.";
    $("btn-quiz-next").textContent="Volver al menú"; $("btn-quiz-next").classList.remove("hidden"); $("btn-quiz-next").onclick=()=>{ $("quiz-screen").classList.add("hidden"); buildLevelGrid(); $("select-screen").classList.remove("hidden"); };
    $("quiz-score").textContent="Puntuación: "+quizCorrect+"/10"; return;
  }
  const source=UNIQUE_DICTIONARY.length?UNIQUE_DICTIONARY:LEVELS.flatMap(l=>l.vocab);
  quizCurrent=source[Math.floor(Math.random()*source.length)];
  const opts=[quizCurrent.es];
  while(opts.length<4){const candidate=source[Math.floor(Math.random()*source.length)].es;if(!opts.includes(candidate))opts.push(candidate);}
  opts.sort(()=>Math.random()-.5);
  $("quiz-progress").textContent="Pregunta "+(quizIndex+1)+" de 10";
  $("quiz-question").textContent="¿Qué significa “"+quizCurrent.maya+"”?";
  $("quiz-options").innerHTML=""; $("quiz-feedback").textContent=""; $("btn-quiz-next").classList.add("hidden");
  opts.forEach(answer=>{const b=document.createElement("button");b.className="option-btn";b.textContent=answer;b.onclick=()=>{ $("quiz-options").querySelectorAll("button").forEach(x=>x.disabled=true); if(answer===quizCurrent.es){quizCorrect++;b.classList.add("correct");$("quiz-feedback").textContent="¡Correcto!";sfx(true);}else{b.classList.add("wrong");$("quiz-feedback").textContent="La respuesta era: "+quizCurrent.es;sfx(false);} quizIndex++;$("btn-quiz-next").textContent="Siguiente pregunta";$("btn-quiz-next").classList.remove("hidden");$("btn-quiz-next").onclick=nextQuizQuestion;$("quiz-score").textContent="Aciertos: "+quizCorrect;};$("quiz-options").appendChild(b);});
}
function showEnd(){
  $("end-msg").textContent="¡"+(playerName || "Guardián")+", completaste los "+LEVELS.length+" niveles y demostraste que eres un gran Guardián de la Tierra! Reparaste fugas, cuidaste tu escuela, ayudaste a crecer árboles, protegiste a los animales y pusiste a prueba tu memoria, tu ortografía y tu conocimiento del maaya t'aan en el mercado y el templo. Reuniste "+allGlossary.length+" palabras. ¡Sigue protegiendo nuestro mundo!";
  const box=$("end-glossary"); box.innerHTML="";
  allGlossary.forEach(w=>{ const c=document.createElement("span"); c.className="word-chip"; c.textContent=w.maya+" = "+w.es; box.appendChild(c); });
  $("end-screen").classList.remove("hidden");
}


/* Panel compacto de contacto con los creadores */
(()=>{
  const toggle=document.getElementById("contact-toggle");
  const card=document.getElementById("contact-card");
  if(!toggle||!card)return;
  toggle.addEventListener("click",()=>{
    const opening=card.classList.contains("hidden");
    card.classList.toggle("hidden",!opening);
    toggle.setAttribute("aria-expanded",String(opening));
  });
})();
