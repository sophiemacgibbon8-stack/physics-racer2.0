const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');
const path = require('path');
const os   = require('os');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);

app.use(express.static(path.join(__dirname)));
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// ── QUESTION BANK ─────────────────────────────────────────────────────────
const Q = {
  1:[
    {t:"What does the Law of Conservation of Energy state?",o:["Energy can be created but not destroyed","Energy can be destroyed but not created","Energy cannot be created or destroyed, only transferred or transformed","Energy is always lost during transformations"],c:2,s:1},
    {t:"Name two types of stored energy.",o:["Chemical and gravitational potential","Kinetic and sound","Light and heat","Electrical and kinetic"],c:0,s:1},
    {t:"Which of these is an ACTIVE type of energy?",o:["Chemical","Gravitational potential","Elastic potential","Kinetic"],c:3,s:1},
    {t:"Which of these is a STORED (potential) type of energy?",o:["Kinetic","Sound","Chemical potential","Light"],c:2,s:1},
    {t:"Gravitational potential energy depends on an object's...",o:["Colour and shape","Height and mass","Speed and time","Temperature and volume"],c:1,s:1},
    {t:"Kinetic energy depends on an object's...",o:["Height and mass","Colour and speed","Mass and velocity","Temperature and time"],c:2,s:1},
    {t:"A rugby ball held above your head (not moving) has...",o:["Kinetic energy only","Gravitational potential energy","No energy at all","Sound energy"],c:1,s:1},
    {t:"A netball flying through the air after being thrown has...",o:["Only chemical energy","Gravitational potential energy only","Kinetic energy","No energy"],c:2,s:1},
    {t:"A stretched rubber band held back, ready to fire, stores...",o:["Kinetic energy","Elastic potential energy","Heat energy","Sound energy"],c:1,s:1},
    {t:"Chemical energy is stored in...",o:["Only batteries","Food, fuel and batteries","Only moving objects","Light bulbs only"],c:1,s:1},
    {t:"An unlit hangi pit full of hot stones and food has...",o:["Kinetic energy","Chemical potential energy","No energy","Sound energy"],c:1,s:1},
    {t:"Which energy type is measured in the same unit for all types?",o:["All energy is measured in joules (J)","Stored energy is in newtons","Active energy is in metres","Each type has its own unit"],c:0,s:1},
    {t:"Energy that is 'sitting still, waiting to be used' is called...",o:["Active energy","Potential (stored) energy","Kinetic energy","Wasted energy"],c:1,s:1},
    {t:"A car battery sitting in a shed, fully charged, has...",o:["Kinetic energy","Chemical potential energy","No energy","Light energy"],c:1,s:1},
    {t:"According to the conservation of energy, when a bungy jumper falls off the Kawarau Bridge, the total energy...",o:["Increases","Decreases to zero","Stays the same, just changes form","Is destroyed on impact"],c:2,s:1}
  ],
  2:[
    {t:"Which of the following is a method of energy transfer through empty space?",o:["Conduction","Convection","Radiation","Insulation"],c:2,s:2},
    {t:"Which heat transfer process involves heat transfer through direct contact of particles?",o:["Radiation","Conduction","Convection","Evaporation"],c:1,s:2},
    {t:"Which heat transfer method is responsible for warm air rising?",o:["Radiation","Convection","Conduction","Absorption"],c:1,s:2},
    {t:"A metal spoon left in a hot drink becomes warm mainly by...",o:["Radiation","Convection","Conduction","Evaporation"],c:2,s:2},
    {t:"A radiator heats a room mainly by...",o:["Conduction","Convection","Radiation","Insulation"],c:1,s:2},
    {t:"How does the sun's heat reach the Earth?",o:["Conduction","Convection","Radiation","It doesn't, only light reaches us"],c:2,s:2},
    {t:"In an electric kettle, warm water rises and cool water sinks to replace it. This is...",o:["Conduction","Convection","Radiation","Friction"],c:1,s:2},
    {t:"Conduction happens best in...",o:["A vacuum","Solids, through touching particles","Empty space","Only in liquids"],c:1,s:2},
    {t:"Which process needs NO particles at all to transfer heat?",o:["Conduction","Convection","Radiation","All of them need particles"],c:2,s:2},
    {t:"During conduction, particles that gain heat energy...",o:["Stop moving completely","Vibrate more and pass energy to neighbouring particles","Turn into gas","Disappear"],c:1,s:2},
    {t:"Standing near a hāngi and feeling heat on your face without touching anything is an example of...",o:["Conduction","Convection","Radiation","Insulation"],c:2,s:2},
    {t:"In a kettle with the element at the bottom, why does the water at the bottom rise?",o:["It becomes denser and sinks","It heats up, becomes less dense and rises","It freezes and floats","Gravity pulls it up"],c:1,s:2},
    {t:"Which heat transfer method explains why a car park feels hotter than grass on a sunny day?",o:["Conduction","Convection","Radiation","Insulation"],c:2,s:2},
    {t:"A pot of water heating on a stove: heat moves from the element into the pot base by...",o:["Radiation","Conduction","Convection","Evaporation"],c:1,s:2},
    {t:"Convection currents occur because...",o:["Warm fluid becomes denser and sinks","Warm fluid becomes less dense and rises, cool fluid sinks to replace it","Cool fluid always rises","Heat only moves downwards"],c:1,s:2}
  ],
  3:[
    {t:"A light bulb is turned on. What is the useful energy output?",o:["Heat","Sound","Light","Electrical"],c:2,s:3},
    {t:"A light bulb is turned on. What is the main wasted energy?",o:["Light","Heat","Chemical","Gravitational potential"],c:1,s:3},
    {t:"In an electric kettle, the useful energy output is...",o:["Sound","Heat energy in the water","Light","Wasted heat to the air"],c:1,s:3},
    {t:"A kettle uses 150 J of electrical energy. 120 J heats the water usefully. How much is wasted?",o:["150 J","120 J","30 J","270 J"],c:2,s:3},
    {t:"Wasted energy is energy that...",o:["Disappears completely","Is not useful for the intended purpose, often lost as heat or sound","Is always sound energy","Is stored for later use"],c:1,s:3},
    {t:"A phone charging: which is the useful energy transfer?",o:["Electrical energy to chemical energy stored in the battery","Electrical energy to sound","Electrical energy to light only","No useful transfer occurs"],c:0,s:3},
    {t:"A car engine: petrol's chemical energy mostly becomes kinetic energy, but a large amount is wasted as...",o:["Light","Heat and sound","Gravitational potential energy","Elastic potential energy"],c:1,s:3},
    {t:"An old incandescent light bulb wastes far more energy as heat than a modern LED bulb. This means the LED bulb is...",o:["Less efficient","More efficient","Exactly the same efficiency","Not related to efficiency"],c:1,s:3},
    {t:"A speaker playing music: the useful energy output is...",o:["Heat","Sound","Light","Kinetic energy of the speaker moving across the room"],c:1,s:3},
    {t:"Total energy input into a device equals...",o:["Useful energy only","Wasted energy only","Useful energy plus wasted energy","Twice the useful energy"],c:2,s:3},
    {t:"A washing machine motor: useful output is kinetic energy of the drum. A wasted output would be...",o:["Heat from friction in the motor","More kinetic energy","Extra washing power","Nothing is wasted"],c:0,s:3},
    {t:"Why do laptops get warm when you use them?",o:["Wasted heat energy from electrical processes inside","They are designed to produce heat as their main output","Sound energy converting to heat","Gravitational potential energy loss"],c:0,s:3},
    {t:"A solar panel's useful energy transformation is...",o:["Electrical energy to light energy","Light energy to electrical energy","Chemical energy to light energy","Heat energy to light energy"],c:1,s:3},
    {t:"Efficiency is calculated as...",o:["Total energy input ÷ useful energy output","Wasted energy ÷ total energy input × 100%","Useful energy output ÷ total energy input × 100%","Useful energy + wasted energy"],c:2,s:3},
    {t:"A fridge motor's main wasted energy output is...",o:["Light","Sound and heat","Chemical energy","Gravitational potential energy"],c:1,s:3}
  ],
  4:[
    {t:"A skydiver jumps from a plane. At the very start (before falling), their main energy type is...",o:["Kinetic energy","Gravitational potential energy","Sound energy","Elastic potential energy"],c:1,s:4},
    {t:"As the skydiver falls and speeds up, gravitational potential energy is mostly transformed into...",o:["Chemical energy","Kinetic energy","Elastic potential energy","Nuclear energy"],c:1,s:4},
    {t:"Once the skydiver reaches maximum (terminal) speed, kinetic energy stops increasing. The remaining GPE lost is converted into...",o:["More kinetic energy","Thermal energy due to air resistance","Elastic potential energy","Chemical energy"],c:1,s:4},
    {t:"Throughout the skydiver's fall, the total amount of energy...",o:["Increases steadily","Decreases steadily","Remains constant, only changing form","Is destroyed by air resistance"],c:2,s:4},
    {t:"The correct energy transformation chain for a torch is...",o:["Light → chemical → electrical","Chemical → electrical → light","Electrical → chemical → sound","Kinetic → light → chemical"],c:1,s:4},
    {t:"A stretched rubber band launcher fires a pom-pom. The correct chain is...",o:["Kinetic → elastic potential → gravitational potential","Elastic potential → kinetic → gravitational potential (as it rises)","Chemical → kinetic → elastic potential","Gravitational potential → elastic potential → chemical"],c:1,s:4},
    {t:"A balloon squeal (letting go of an untied balloon) has this energy chain:",o:["Chemical → elastic potential → kinetic → thermal + sound","Kinetic → chemical → elastic potential","Light → sound → chemical","Gravitational potential → chemical → light"],c:0,s:4},
    {t:"A paper plane thrown across the room: the correct chain from your arm to landing is...",o:["Gravitational potential → chemical → kinetic","Chemical (in your muscles) → kinetic → gravitational potential energy as it rises, back to kinetic as it falls","Kinetic → chemical → elastic potential","Elastic potential → chemical → kinetic"],c:1,s:4},
    {t:"A boulder balanced on a cliff edge starts to roll downhill. Its energy transformation is...",o:["Kinetic → gravitational potential","Gravitational potential → kinetic","Chemical → gravitational potential","Elastic potential → kinetic"],c:1,s:4},
    {t:"An electric kettle transforms energy in this order:",o:["Heat → electrical → kinetic","Electrical → heat energy (via the element) → kinetic energy of water particles","Kinetic → electrical → heat","Chemical → heat → electrical"],c:1,s:4},
    {t:"A sprinter like Zoe Hobbs at the start of a race (crouched in the blocks, not yet moving) has mostly...",o:["Kinetic energy","Chemical potential energy stored in her muscles","Gravitational potential energy","Sound energy"],c:1,s:4},
    {t:"As a sprinter accelerates out of the blocks, chemical energy in the muscles is transformed into...",o:["Gravitational potential energy only","Kinetic energy (and some wasted heat)","Elastic potential energy","Nuclear energy"],c:1,s:4},
    {t:"A wind turbine's energy transformation chain is...",o:["Electrical → kinetic → chemical","Kinetic (wind) → kinetic (blades) → electrical","Chemical → kinetic → electrical","Gravitational potential → electrical → kinetic"],c:1,s:4},
    {t:"A hydroelectric dam's energy transformation chain is...",o:["Gravitational potential (stored water) → kinetic (flowing water) → electrical","Kinetic → gravitational potential → chemical","Chemical → gravitational potential → kinetic","Electrical → kinetic → gravitational potential"],c:0,s:4},
    {t:"Striking a match, the correct energy transformation chain is...",o:["Chemical → kinetic → gravitational potential","Kinetic (striking) → heat → chemical → light and heat","Light → chemical → kinetic","Heat → light → kinetic"],c:1,s:4}
  ],
  5:[
    {t:"What does the 'h' represent in Ep = mgh?",o:["Heat","Height","Horsepower","Hertz"],c:1,s:5},
    {t:"A 2 kg object is at the top of a 10 m hill. What is its GPE? (g = 10 m/s²)",o:["20 J","100 J","200 J","2000 J"],c:2,s:5},
    {t:"A 5 kg object is 4 m above the ground. Calculate its GPE.",o:["20 J","200 J","9 J","40 J"],c:1,s:5},
    {t:"A 1 kg tramper's pack sits on a shelf 2 m high. What is its GPE?",o:["2 J","20 J","200 J","0.2 J"],c:1,s:5},
    {t:"A 10 kg rock is lifted 3 m up a Canterbury riverbank. Calculate its GPE.",o:["30 J","300 J","3000 J","13 J"],c:1,s:5},
    {t:"A 0.5 kg rugby ball is kicked 8 m into the air. What is its GPE at the top?",o:["4 J","40 J","400 J","0.4 J"],c:1,s:5},
    {t:"A skier at the top of Coronet Peak (mass 60 kg) is 500 m above the base. Calculate their GPE.",o:["3000 J","30000 J","300000 J","5000 J"],c:2,s:5},
    {t:"An object has GPE of 500 J, mass 5 kg. What is its height? (g = 10 m/s²)",o:["5 m","10 m","50 m","100 m"],c:1,s:5},
    {t:"An object has GPE of 800 J at a height of 4 m. What is its mass?",o:["8 kg","20 kg","32 kg","200 kg"],c:1,s:5},
    {t:"A 3 kg object at the top of a 10 m hill has how much GPE, and how much KE at the bottom if no energy is lost?",o:["GPE = 30 J, KE at bottom = 30 J","GPE = 300 J, KE at bottom = 300 J","GPE = 30 J, KE at bottom = 0 J","GPE = 300 J, KE at bottom = 0 J"],c:1,s:5},
    {t:"If no energy is lost to friction or air resistance, GPE at the top of a hill equals...",o:["Half the KE at the bottom","Zero at the bottom","KE at the bottom","Twice the KE at the bottom"],c:2,s:5},
    {t:"A 4 kg object is raised from 2 m to 6 m. What is the INCREASE in GPE?",o:["80 J","160 J","240 J","40 J"],c:1,s:5},
    {t:"An 8 kg suitcase is lifted onto a 1.5 m shelf. Calculate its GPE.",o:["12 J","120 J","1200 J","80 J"],c:1,s:5},
    {t:"A 25 kg dog leaps to a height of 0.4 m. Calculate its GPE.",o:["10 J","100 J","1000 J","64 J"],c:1,s:5},
    {t:"An object has GPE of 1500 J and a mass of 15 kg. What is its height? (g = 10 m/s²)",o:["10 m","15 m","100 m","1.5 m"],c:0,s:5}
  ],
  6:[
    {t:"What does 'v' represent in KE = ½mv²?",o:["Volume","Velocity (speed)","Voltage","Vector"],c:1,s:6},
    {t:"A 750 kg car travels at 9 m/s. What is its kinetic energy?",o:["6750 J","30375 J","3375 J","60750 J"],c:1,s:6},
    {t:"A 2 kg ball moves at 4 m/s. Calculate its KE.",o:["8 J","16 J","32 J","4 J"],c:1,s:6},
    {t:"A 60 kg sprinter, like Zoe Hobbs, running at 10 m/s. Calculate her KE.",o:["600 J","3000 J","6000 J","300 J"],c:1,s:6},
    {t:"An All Blacks player (100 kg) sprinting at 8 m/s. Calculate his KE.",o:["800 J","3200 J","6400 J","400 J"],c:1,s:6},
    {t:"A 1000 kg car moving at 20 m/s. Calculate its KE.",o:["20000 J","200000 J","10000 J","400000 J"],c:1,s:6},
    {t:"A 0.5 kg rugby ball travels at 6 m/s. What is its KE?",o:["3 J","9 J","18 J","1.5 J"],c:1,s:6},
    {t:"If you double an object's speed (mass stays the same), its kinetic energy...",o:["Stays the same","Doubles","Triples","Quadruples (x4)"],c:3,s:6},
    {t:"If you double an object's mass (speed stays the same), its kinetic energy...",o:["Stays the same","Doubles","Quadruples","Halves"],c:1,s:6},
    {t:"A 70 kg cyclist moving at 5 m/s. Calculate their KE.",o:["350 J","875 J","1750 J","175 J"],c:1,s:6},
    {t:"Between a 60 kg sprinter at 10 m/s and an 80 kg cyclist at 8 m/s, who has more kinetic energy?",o:["The sprinter (3000 J vs 2560 J)","The cyclist (2560 J vs 3000 J)","They are equal","Cannot be calculated"],c:0,s:6},
    {t:"A car's KE is 4000 J at a speed of 10 m/s. What is its mass?",o:["40 kg","80 kg","400 kg","800 kg"],c:1,s:6},
    {t:"A 1200 kg car travels at 15 m/s. Calculate its kinetic energy.",o:["18000 J","67500 J","135000 J","270000 J"],c:2,s:6},
    {t:"A 0.2 kg tennis ball travels at 40 m/s. Calculate its kinetic energy.",o:["80 J","160 J","8 J","320 J"],c:1,s:6},
    {t:"An object has a kinetic energy of 2450 J at a speed of 7 m/s. What is its mass?",o:["50 kg","100 kg","200 kg","700 kg"],c:1,s:6}
  ]
};

const SLO_LBL = {
  1:'Topic 1 — Energy types & conservation',
  2:'Topic 2 — Heat transfer (conduction/convection/radiation)',
  3:'Topic 3 — Useful vs wasted energy',
  4:'Topic 4 — Energy transformation chains',
  5:'Topic 5 — Gravitational potential energy (Ep = mgh)',
  6:'Topic 6 — Kinetic energy (KE = ½mv²)'
};

const CARS   = ['🏎️','🚗','🚙','🚕','🏍️','🛵','🚌','🚐','🚑','🚒'];
const COLORS = ['#ff6b35','#4ecdc4','#a29bfe','#ffd700','#fd79a8','#55efc4','#74b9ff','#ff7675','#00b894','#e17055'];

// ── ROOMS ─────────────────────────────────────────────────────────────────
const rooms        = new Map();
const socketToRoom = new Map();

function genCode() {
  const ch = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c;
  do { c = Array.from({length:4}, () => ch[Math.floor(Math.random()*ch.length)]).join(''); }
  while (rooms.has(c));
  return c;
}
function shuffle(a) {
  const b=[...a];
  for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}
  return b;
}
function playersArr(room) {
  return Array.from(room.players.values()).map(p=>({
    id:p.id, name:p.name, car:p.car, color:p.color,
    correct:p.correct, isHost:p.isHost, isObserver:p.isObserver, streak:p.streak
  }));
}
function getLocalIP() {
  for (const ifaces of Object.values(os.networkInterfaces())) {
    for (const i of ifaces) {
      if (i.family==='IPv4' && !i.internal) return i.address;
    }
  }
  return 'localhost';
}

function sendQuestion(player, room) {
  const q = player.qs[player.qi % player.qs.length];
  const order = shuffle([0,1,2,3]);
  player._order = order;
  io.to(player.id).emit('your-question', {
    text: q.t, options: order.map(i=>q.o[i]),
    slo: q.s, sloLabel: SLO_LBL[q.s] || '',
    timeLimit: 20, progress: player.correct, target: room.target
  });
}

// ── SOCKET EVENTS ─────────────────────────────────────────────────────────
io.on('connection', socket => {
  socket.on('create-room', ({ name }) => {
    const code = genCode();
    const p = { id:socket.id, name, car:CARS[0], color:COLORS[0],
      correct:0, qs:[], qi:0, locked:false, streak:0, isHost:true, isObserver:false, _order:[] };
    const room = { code, host:socket.id, players:new Map([[socket.id,p]]),
      level:1, started:false, target:10, hostPlay:true };
    rooms.set(code, room);
    socketToRoom.set(socket.id, code);
    socket.join(code);
    socket.emit('room-ready', { code, isHost:true, players:playersArr(room) });
  });

  socket.on('join-room', ({ name, code }) => {
    const room = rooms.get(code);
    if (!room)              { socket.emit('room-error','Room not found. Check the code and try again!'); return; }
    if (room.started)       { socket.emit('room-error','This game has already started.'); return; }
    if (room.players.size >= 32) { socket.emit('room-error','Room is full (max 32 players).'); return; }
    const idx = room.players.size;
    const p = { id:socket.id, name, car:CARS[idx%CARS.length], color:COLORS[idx%COLORS.length],
      correct:0, qs:[], qi:0, locked:false, streak:0, isHost:false, isObserver:false, _order:[] };
    room.players.set(socket.id, p);
    socketToRoom.set(socket.id, code);
    socket.join(code);
    socket.emit('room-ready', { code, isHost:false, players:playersArr(room) });
    io.to(code).emit('lobby-update', { players:playersArr(room), host:room.host });
  });

  socket.on('start-game', ({ level, target, hostPlay }) => {
    const code = socketToRoom.get(socket.id);
    const room = rooms.get(code);
    if (!room || room.host !== socket.id) return;
    room.level   = level  || 1;
    room.target  = target || 10;
    room.hostPlay = (hostPlay !== false);
    room.started  = true;
    const qs = Q[room.level] || Q[1];
    room.players.forEach(p => {
      p.correct=0; p.qi=0; p.locked=false; p.streak=0;
      p.isObserver = (p.isHost && !room.hostPlay);
      p.qs = shuffle([...qs]);
    });
    io.to(code).emit('game-started', {
      level:room.level, target:room.target, hostPlay:room.hostPlay, players:playersArr(room)
    });
    room.players.forEach(p => {
      if (!p.isObserver) sendQuestion(p, room);
    });
  });

  socket.on('answer', ({ displayIdx }) => {
    const code = socketToRoom.get(socket.id);
    const room  = rooms.get(code);
    if (!room || !room.started) return;
    const p = room.players.get(socket.id);
    if (!p || p.locked || p.isObserver) return;
    p.locked = true;

    const q   = p.qs[p.qi % p.qs.length];
    const ans = p._order[displayIdx];
    const ok  = ans === q.c;
    if (ok) { p.correct++; p.streak++; } else { p.streak=0; }

    const correctDisplayIdx = p._order.indexOf(q.c);
    socket.emit('answer-feedback', { correct:ok, correctIdx:correctDisplayIdx, streak:p.streak });
    io.to(code).emit('scores', { players:playersArr(room) });

    if (p.correct >= room.target) {
      room.started = false;
      io.to(code).emit('game-over', { players:playersArr(room), winnerId:socket.id });
      return;
    }
    p.qi++;
    if (p.qi >= p.qs.length) { p.qs = shuffle([...Q[room.level]]); p.qi=0; }
    setTimeout(() => { if (room.started){ p.locked=false; sendQuestion(p,room); } }, 1400);
  });

  socket.on('play-again', ({ level }) => {
    const code = socketToRoom.get(socket.id);
    const room  = rooms.get(code);
    if (!room || room.host !== socket.id) return;
    room.level   = level || room.level;
    room.started = true;
    const qs = Q[room.level] || Q[1];
    room.players.forEach(p => {
      p.correct=0; p.qi=0; p.locked=false; p.streak=0;
      p.qs = shuffle([...qs]);
    });
    io.to(code).emit('game-started', {
      level:room.level, target:room.target, hostPlay:room.hostPlay, players:playersArr(room)
    });
    room.players.forEach(p => { if(!p.isObserver) sendQuestion(p,room); });
  });

  socket.on('disconnect', () => {
    const code = socketToRoom.get(socket.id);
    if (!code) return;
    socketToRoom.delete(socket.id);
    const room = rooms.get(code);
    if (!room) return;
    room.players.delete(socket.id);
    if (room.players.size === 0) { rooms.delete(code); return; }
    if (room.host === socket.id) {
      room.host = room.players.keys().next().value;
      room.players.get(room.host).isHost = true;
    }
    io.to(code).emit('lobby-update', { players:playersArr(room), host:room.host });
    if (room.started) io.to(code).emit('scores', { players:playersArr(room) });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  const ip = getLocalIP();
  console.log('\n\x1b[32m⚡ Energy Racer — Server Ready!\x1b[0m\n');
  console.log('  \x1b[36mLocal:\x1b[0m    http://localhost:' + PORT);
  console.log('  \x1b[33mNetwork:\x1b[0m  http://' + ip + ':' + PORT);
  console.log('\n\x1b[90mShare the Network URL with students on the same Wi-Fi.\x1b[0m\n');
});
