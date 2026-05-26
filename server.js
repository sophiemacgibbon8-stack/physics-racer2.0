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
    {t:"What are the standard units for speed?",o:["kilometres per hour (km/h)","metres per second (m/s)","seconds (s)","metres (m)"],c:1,s:1},
    {t:"What are the standard units for distance?",o:["seconds (s)","m/s","metres (m)","km/h"],c:2,s:1},
    {t:"What are the standard units for time?",o:["metres (m)","m/s","km/h","seconds (s)"],c:3,s:1},
    {t:"In the formula v = d/t, what does 'v' represent?",o:["Volume","Distance","Time","Speed (velocity)"],c:3,s:1},
    {t:"In the formula v = d/t, what does 'd' represent?",o:["Direction","Speed","Distance","Density"],c:2,s:1},
    {t:"In the formula v = d/t, what does 't' represent?",o:["Speed","Total distance","Time","Temperature"],c:2,s:1},
    {t:"Speed is calculated by...",o:["Multiplying distance by time","Adding distance and time","Subtracting time from distance","Dividing distance by time"],c:3,s:1},
    {t:"Which of these is a measurement of speed?",o:["15 metres","15 seconds","15 newtons","15 m/s"],c:3,s:1},
    {t:"An object that is NOT moving has a speed of...",o:["Unknown","10 m/s","1 m/s","0 m/s"],c:3,s:1},
    {t:"The formula v = d/t is used to calculate what?",o:["Acceleration","Force","Weight","Speed"],c:3,s:1},
    {t:"Which is the SI unit symbol for seconds?",o:["sec","S","s","ss"],c:2,s:1},
    {t:"How fast something is moving is called its...",o:["Mass","Speed","Force","Length"],c:1,s:1},
    {t:"Which quantity is measured in metres?",o:["Time","Speed","Distance","Force"],c:2,s:1},
    {t:"The 'v' in v = d/t stands for velocity, which means...",o:["Voltage","Volume","Volcano","Speed in a direction"],c:3,s:1},
    {t:"Which unit makes sense for the speed of a car?",o:["m only","s only","m/s","kg"],c:2,s:1},
    {t:"Which is the correct unit for a track distance?",o:["metres","seconds","m/s","newtons"],c:0,s:1},
    {t:"A stopwatch measures...",o:["distance","time","speed","weight"],c:1,s:1},
    {t:"A measuring tape measures...",o:["time","speed","distance","force"],c:2,s:1}
  ],
  2:[
    {t:"A car travels 100 m in 10 s. What is its speed?",o:["1 m/s","110 m/s","10 m/s","1000 m/s"],c:2,s:2},
    {t:"A runner travels 200 m in 40 s. What is their speed?",o:["8 m/s","5 m/s","160 m/s","240 m/s"],c:1,s:2},
    {t:"A cyclist rides at 6 m/s for 30 s. How far do they travel?",o:["5 m","36 m","360 m","180 m"],c:3,s:2},
    {t:"A ball travels 50 m at 10 m/s. How long does it take?",o:["500 s","0.2 s","40 s","5 s"],c:3,s:2},
    {t:"A train travels 500 m in 25 s. What is its speed?",o:["475 m/s","2 m/s","525 m/s","20 m/s"],c:3,s:2},
    {t:"A swimmer moves at 2 m/s for 60 s. How far?",o:["30 m","58 m","62 m","120 m"],c:3,s:2},
    {t:"A drone travels 300 m at 15 m/s. How long does it take?",o:["4500 s","285 s","20 s","315 s"],c:2,s:2},
    {t:"A student walks 80 m in 40 s. What is their speed?",o:["0.5 m/s","120 m/s","3200 m/s","2 m/s"],c:3,s:2},
    {t:"A car travels at 25 m/s for 12 s. How far does it go?",o:["2.08 m","37 m","13 m","300 m"],c:3,s:2},
    {t:"A ball rolls 45 m at 9 m/s. How long does it take?",o:["405 s","36 s","5 s","54 s"],c:2,s:2},
    {t:"To find speed, you do...",o:["d × t","d + t","d / t","d − t"],c:2,s:2},
    {t:"To find distance (rearranging v = d/t), you do...",o:["v / t","v × t","v + t","v − t"],c:1,s:2},
    {t:"To find time (rearranging v = d/t), you do...",o:["d × v","d + v","d / v","d − v"],c:2,s:2},
    {t:"A car covers 60 m in 6 s. Its speed is...",o:["6 m/s","10 m/s","360 m/s","66 m/s"],c:1,s:2},
    {t:"A horse runs at 12 m/s for 5 s. Distance?",o:["2.4 m","17 m","7 m","60 m"],c:3,s:2},
    {t:"At 8 m/s, how long to cover 64 m?",o:["72 s","56 s","8 s","512 s"],c:2,s:2},
    {t:"A car drives 250 m in 10 s. Speed?",o:["2.5 m/s","25 m/s","250 m/s","260 m/s"],c:1,s:2},
    {t:"30 m at 10 m/s — how long?",o:["300 s","20 s","40 s","3 s"],c:3,s:2}
  ],
  3:[
    {t:"A sprinter runs 100 m in 10 s. What is their average speed?",o:["90 m/s","1000 m/s","0.1 m/s","10 m/s"],c:3,s:3},
    {t:"A car travels 2400 m in 2 minutes (120 s). Speed in m/s?",o:["1200 m/s","2 m/s","0.05 m/s","20 m/s"],c:3,s:3},
    {t:"A cheetah runs at 30 m/s for 5 s. How far does it travel?",o:["6 m","35 m","25 m","150 m"],c:3,s:3},
    {t:"A bus takes 3 minutes (180 s) to travel 900 m. Speed in m/s?",o:["3 m/s","300 m/s","0.2 m/s","5 m/s"],c:3,s:3},
    {t:"A cyclist covers 1500 m at 10 m/s. How many seconds?",o:["15000 s","1490 s","1510 s","150 s"],c:3,s:3},
    {t:"A swimmer finishes 200 m in 2 min 30 s (150 s). Avg speed?",o:["75 m/s","4 m/s","0.75 m/s","1.33 m/s"],c:3,s:3},
    {t:"A toy car travels 3 m in 0.5 s. What is its speed?",o:["1.5 m/s","3.5 m/s","0.17 m/s","6 m/s"],c:3,s:3},
    {t:"A bird flies at 20 m/s for 2.5 minutes (150 s). How far?",o:["8 m","172.5 m","300 m","3000 m"],c:3,s:3},
    {t:"Runner A: 500 m in 50 s. Runner B: 400 m in 45 s. Faster?",o:["They are equal","Runner B","Cannot tell","Runner A"],c:3,s:3},
    {t:"A skateboard rolls at 3 m/s. How far in 15 seconds?",o:["5 m","18 m","0.2 m","45 m"],c:3,s:3},
    {t:"A jet flies 4000 m in 20 s. Speed?",o:["200 m/s","2 m/s","20 m/s","80 m/s"],c:0,s:3},
    {t:"A snail moves 0.6 m in 60 s. Speed?",o:["10 m/s","36 m/s","0.01 m/s","0.6 m/s"],c:2,s:3},
    {t:"A walker covers 1.2 km (1200 m) in 600 s. Speed in m/s?",o:["2 m/s","0.5 m/s","720 m/s","720000 m/s"],c:0,s:3},
    {t:"A scooter at 5 m/s rides for 2 minutes (120 s). Distance?",o:["240 m","600 m","60 m","2.4 m"],c:1,s:3},
    {t:"A car at 25 m/s — how long to travel 500 m?",o:["12500 s","525 s","20 s","2 s"],c:2,s:3},
    {t:"A runner does 1500 m in 5 minutes (300 s). Average speed?",o:["3 m/s","5 m/s","0.2 m/s","7500 m/s"],c:1,s:3},
    {t:"A train at 30 m/s — how far in 90 s?",o:["3 m","2700 m","120 m","0.33 m"],c:1,s:3}
  ],
  4:[
    {t:"On a distance-time graph, a horizontal (flat) line means the object is...",o:["accelerating","slowing down","stationary (not moving)","speeding up"],c:2,s:4},
    {t:"On a distance-time graph, a straight diagonal line going up means...",o:["the object is stopped","the object moves at constant speed","the object is accelerating","the object is going backwards"],c:1,s:4},
    {t:"What does the gradient (slope) of a distance-time graph represent?",o:["acceleration","force","time","speed"],c:3,s:4},
    {t:"What is plotted on the y-axis of a distance-time graph?",o:["speed","time","distance","force"],c:2,s:4},
    {t:"What is plotted on the x-axis of a distance-time graph?",o:["distance","time","speed","mass"],c:1,s:4},
    {t:"A curve on a d-t graph that gets steeper shows...",o:["constant speed","deceleration","the object is stationary","acceleration"],c:3,s:4},
    {t:"A curve on a d-t graph that gets less steep shows...",o:["acceleration","constant speed","deceleration","reversing"],c:2,s:4},
    {t:"On a d-t graph, the steeper the line, the...",o:["slower the object","faster the object","heavier the object","further away"],c:1,s:4},
    {t:"Object A's d-t line is steeper than Object B's. Object A is...",o:["heavier","slower","faster","at rest"],c:2,s:4},
    {t:"Why do we draw a line of best fit on a graph?",o:["to make it look pretty","to show the overall trend in the data","to hide bad data","to fill in the page"],c:1,s:4},
    {t:"A flat line at distance = 5 m on a d-t graph means the object is...",o:["5 m away and stationary","moving at 5 m/s","accelerating","at the start"],c:0,s:4},
    {t:"To find the speed from a distance-time graph, calculate the...",o:["area under the line","gradient (slope) of the line","y-intercept","total time"],c:1,s:4},
    {t:"A d-t graph shows distance increasing slowly, then fast. The object is...",o:["decelerating","staying still","accelerating","stopped"],c:2,s:4},
    {t:"A horizontal line at distance = 0 means the object is...",o:["at the start, not moving","moving fast","accelerating","at the finish line"],c:0,s:4},
    {t:"On a d-t graph, a line going DOWN means the object is...",o:["speeding up","stationary","moving back towards the start","not moving"],c:2,s:4},
    {t:"Two cars: line A is steep, line B is shallow. A is _____ than B.",o:["slower","faster","stopped","heavier"],c:1,s:4}
  ],
  5:[
    {t:"What is the formula for acceleration (from rest)?",o:["a = v × t","a = v + t","a = v − t","a = v / t"],c:3,s:6},
    {t:"What are the units for acceleration?",o:["m/s","m","s","m/s²"],c:3,s:6},
    {t:"Acceleration measures how quickly...",o:["mass changes","speed changes","force changes","distance changes"],c:1,s:6},
    {t:"A car speeds up from 0 to 20 m/s in 5 s. Acceleration?",o:["100 m/s²","0.25 m/s²","4 m/s²","25 m/s²"],c:2,s:6},
    {t:"A bike speeds up from 0 to 8 m/s in 4 s. Acceleration?",o:["32 m/s²","0.5 m/s²","2 m/s²","12 m/s²"],c:2,s:6},
    {t:"An object reaches 12 m/s after 3 s from rest. Acceleration?",o:["36 m/s²","0.25 m/s²","9 m/s²","4 m/s²"],c:3,s:6},
    {t:"A car at constant speed has acceleration of...",o:["0 m/s²","1 m/s²","constant","10 m/s²"],c:0,s:6},
    {t:"A rocket accelerates from 0 to 30 m/s in 6 s. Acceleration?",o:["180 m/s²","0.2 m/s²","36 m/s²","5 m/s²"],c:3,s:6},
    {t:"Slowing down is called...",o:["acceleration","constant speed","deceleration","stopping"],c:2,s:6},
    {t:"What is the symbol used for acceleration?",o:["v","d","a","s"],c:2,s:6},
    {t:"A car goes from 0 to 50 m/s in 10 s. Acceleration?",o:["500 m/s²","60 m/s²","5 m/s²","0.2 m/s²"],c:2,s:6},
    {t:"A skateboard speeds up from 0 to 6 m/s in 2 s. Acceleration?",o:["12 m/s²","8 m/s²","3 m/s²","4 m/s²"],c:2,s:6},
    {t:"Acceleration is calculated by dividing...",o:["distance by time","force by mass","velocity by time","mass by time"],c:2,s:6},
    {t:"From rest to 16 m/s in 4 s. Acceleration?",o:["64 m/s²","12 m/s²","4 m/s²","20 m/s²"],c:2,s:6},
    {t:"Which has the biggest acceleration?",o:["0→10 m/s in 5 s","0→20 m/s in 5 s","0→10 m/s in 2 s","0→4 m/s in 4 s"],c:2,s:6},
    {t:"A drone reaches 24 m/s after 6 s. Acceleration?",o:["144 m/s²","18 m/s²","4 m/s²","30 m/s²"],c:2,s:6}
  ],
  6:[
    {t:"On a speed-time graph, a horizontal flat line means...",o:["the object is accelerating","constant speed","the object is stopped","deceleration"],c:1,s:8},
    {t:"On a speed-time graph, a line sloping up means...",o:["constant speed","deceleration","stopped","acceleration"],c:3,s:8},
    {t:"On a speed-time graph, a line sloping down means...",o:["constant speed","acceleration","deceleration","reversing"],c:2,s:8},
    {t:"What does the gradient of a speed-time graph represent?",o:["distance","time","speed","acceleration"],c:3,s:8},
    {t:"A speed-time line flat at y = 0 means the object is...",o:["moving fast","stationary","accelerating","at constant speed"],c:1,s:8},
    {t:"What is plotted on the y-axis of a speed-time graph?",o:["distance","speed","time","force"],c:1,s:8},
    {t:"What is plotted on the x-axis of a speed-time graph?",o:["distance","speed","time","mass"],c:2,s:8},
    {t:"The area under a speed-time graph represents...",o:["acceleration","force","time","distance travelled"],c:3,s:8},
    {t:"A horizontal line at speed = 15 m/s means the object...",o:["accelerates at 15 m/s²","moves 15 m","moves at 15 m/s constantly","stops at 15 s"],c:2,s:8},
    {t:"Object A: 3 m/s². Object B: 5 m/s². Who has a steeper s-t graph line?",o:["A","B","Same","Neither"],c:1,s:8},
    {t:"A steeper upward slope on an s-t graph means...",o:["smaller acceleration","greater acceleration","constant speed","slower speed"],c:1,s:8},
    {t:"A line sloping steeply down on an s-t graph shows...",o:["fast acceleration","fast deceleration","constant speed","stationary"],c:1,s:8},
    {t:"A bus' s-t graph is flat then slopes down to 0. The bus...",o:["speeds up then is stationary","is at constant speed then decelerates to stop","accelerates then stops suddenly","reverses"],c:1,s:8},
    {t:"On a speed-time graph, the line starts at 0 and slopes up. The object...",o:["was already moving","starts at rest and speeds up","slows down","moves back"],c:1,s:8},
    {t:"An object with acceleration = 0 has an s-t graph that is...",o:["sloping up","sloping down","horizontal flat line","V-shaped"],c:2,s:8},
    {t:"Two objects: A's s-t line is shallower than B's. A's acceleration is...",o:["greater than B","equal to B","less than B","zero"],c:2,s:8}
  ],
  7:[
    {t:"A force is a...",o:["mass","push or pull","speed","direction"],c:1,s:9},
    {t:"What is the unit for force?",o:["metres","kilograms","seconds","newtons"],c:3,s:9},
    {t:"What is the symbol for newtons?",o:["n","Nw","N","nm"],c:2,s:9},
    {t:"Weight is the force of ___ pulling on an object.",o:["wind","friction","gravity","magnetism"],c:2,s:10},
    {t:"The upward force on a plane wing is called...",o:["thrust","lift","drag","friction"],c:1,s:10},
    {t:"The forward force from an engine is called...",o:["lift","weight","thrust","support"],c:2,s:10},
    {t:"The force that resists motion between surfaces is...",o:["lift","gravity","thrust","friction"],c:3,s:10},
    {t:"The upward force from a surface on an object is called...",o:["thrust","support (normal force)","lift","drag"],c:1,s:10},
    {t:"When forces on an object are equal and opposite, they are...",o:["unbalanced","balanced","accelerating","resultant"],c:1,s:11},
    {t:"Balanced forces cause an object to...",o:["accelerate","speed up","stay still or move at constant speed","change direction"],c:2,s:11},
    {t:"Unbalanced forces cause an object to...",o:["stay still","accelerate (change speed/direction)","never move","stop instantly"],c:1,s:11},
    {t:"The single force that replaces all forces is called the...",o:["balanced force","push force","resultant force","reaction force"],c:2,s:11},
    {t:"A box: gravity pulls down 50 N, floor pushes up 50 N. Forces are...",o:["balanced","unbalanced","zero","accelerating"],c:0,s:11},
    {t:"Car: 200 N forward, 50 N friction back. Resultant force?",o:["250 N forward","250 N back","150 N forward","150 N back"],c:2,s:11},
    {t:"Forces are drawn on diagrams as...",o:["dots","squares","arrows (vectors)","circles"],c:2,s:10},
    {t:"What happens when an unbalanced force acts on a moving car?",o:["it stays at constant speed","it accelerates","it stops instantly","its mass changes"],c:1,s:11},
    {t:"A book at rest on a table has...",o:["only gravity acting on it","no forces","balanced forces (weight down, support up)","unbalanced forces"],c:2,s:11}
  ],
  8:[
    {t:"In F = ma, what does 'F' stand for?",o:["friction","force","fraction","fall"],c:1,s:12},
    {t:"In F = ma, what does 'm' stand for?",o:["motion","mass","minutes","metres"],c:1,s:12},
    {t:"In F = ma, what does 'a' stand for?",o:["area","amount","acceleration","angle"],c:2,s:12},
    {t:"A 2 kg object accelerates at 5 m/s². Force?",o:["2.5 N","7 N","3 N","10 N"],c:3,s:12},
    {t:"A 10 kg object has a 50 N force on it. Acceleration?",o:["500 m/s²","60 m/s²","0.2 m/s²","5 m/s²"],c:3,s:12},
    {t:"A 100 N force accelerates a mass at 4 m/s². Mass?",o:["400 kg","96 kg","25 kg","104 kg"],c:2,s:12},
    {t:"5 kg mass, 20 m/s² acceleration. Force?",o:["4 N","25 N","15 N","100 N"],c:3,s:12},
    {t:"3 kg mass, 6 N force. Acceleration?",o:["18 m/s²","0.5 m/s²","9 m/s²","2 m/s²"],c:3,s:12},
    {t:"A 40 N force on an 8 kg mass. Acceleration?",o:["320 m/s²","48 m/s²","32 m/s²","5 m/s²"],c:3,s:12},
    {t:"12 N force, 4 m/s² acceleration. Mass?",o:["48 kg","8 kg","3 kg","16 kg"],c:2,s:12},
    {t:"A 4 kg ball pushed with 12 N. Acceleration?",o:["48 m/s²","8 m/s²","16 m/s²","3 m/s²"],c:3,s:12},
    {t:"200 N pushes a 50 kg trolley. Acceleration?",o:["250 m/s²","150 m/s²","4 m/s²","10000 m/s²"],c:2,s:12},
    {t:"2 kg accelerating at 8 m/s². Force?",o:["4 N","10 N","6 N","16 N"],c:3,s:12},
    {t:"75 N force, 15 m/s² acceleration. Mass?",o:["1125 kg","60 kg","90 kg","5 kg"],c:3,s:12},
    {t:"Doubling the force on the same mass means...",o:["acceleration stays the same","acceleration doubles","acceleration halves","mass doubles"],c:1,s:12},
    {t:"A 6 N force acts on a 2 kg object. Acceleration?",o:["12 m/s²","8 m/s²","4 m/s²","3 m/s²"],c:3,s:12},
    {t:"F = ma is also known as...",o:["Newton's 1st law","Newton's 2nd law","Newton's 3rd law","Hooke's law"],c:1,s:12}
  ],
  9:[
    {t:"Mass is measured in...",o:["newtons (N)","metres (m)","kilograms (kg)","seconds (s)"],c:2,s:14},
    {t:"Weight is measured in...",o:["kilograms (kg)","metres (m)","seconds (s)","newtons (N)"],c:3,s:14},
    {t:"Mass measures how much ___ is in an object.",o:["gravity","matter","weight","force"],c:1,s:14},
    {t:"Weight is caused by...",o:["air resistance","friction","gravity pulling down","magnetism"],c:2,s:14},
    {t:"An astronaut on the Moon vs Earth has...",o:["different mass, same weight","same mass, different weight","both the same","both different"],c:1,s:15},
    {t:"Why does an astronaut weigh less on the Moon?",o:["the Moon has no atmosphere","the Moon's gravity is weaker","the astronaut loses mass","it is colder there"],c:1,s:15},
    {t:"Friction is HELPFUL when...",o:["machines wear out","brakes stop a car","engines get hot","tyres get bald"],c:1,s:13},
    {t:"Friction is UNHELPFUL when...",o:["walking on the ground","gripping a pencil","engine parts wear and lose energy","using brakes"],c:2,s:13},
    {t:"An example of helpful friction is...",o:["a car skidding on ice","shoes gripping the ground","an engine getting too hot","a worn-out tyre"],c:1,s:13},
    {t:"Friction can be reduced by...",o:["adding more weight","using rougher surfaces","using oil (lubrication)","increasing speed"],c:2,s:13},
    {t:"On Earth, gravity pulls with about how many newtons per kg?",o:["1 N/kg","100 N/kg","0.1 N/kg","10 N/kg"],c:3,s:15},
    {t:"A 5 kg object on Earth weighs approximately...",o:["5 N","0.5 N","500 N","50 N"],c:3,s:15},
    {t:"A 10 kg backpack on Earth weighs about...",o:["1 N","10 N","100 N","1000 N"],c:2,s:15},
    {t:"Your mass on the Moon compared to Earth is...",o:["smaller","bigger","exactly the same","zero"],c:2,s:15},
    {t:"In space far from any planet, an object's weight is...",o:["the same as on Earth","much greater","zero","cannot be measured"],c:2,s:15},
    {t:"Which is a vector quantity (has direction)?",o:["mass","time","temperature","weight"],c:3,s:14},
    {t:"Which would have helpful friction in everyday life?",o:["a clock spring","bicycle brake pads","a smooth water slide","an oily floor"],c:1,s:13}
  ]
};

const SLO_LBL = {
  1:'SLO #1 — Definitions & Units',2:'SLO #2 — Calculating with v = d/t',
  3:'SLO #3 — Real-World Speed',4:'SLO #4 — Distance-Time Graphs',
  5:'SLO #5 — Interpreting D-T Graphs',6:'SLO #6 — Acceleration (a = v/t)',
  7:'SLO #7 — Speed-Time Graphs',8:'SLO #8 — Interpreting S-T Graphs',
  9:'SLO #9 — Forces (push/pull)',10:'SLO #10 — Force Vectors',
  11:'SLO #11 — Balanced/Unbalanced Forces',12:'SLO #12 — F = ma',
  13:'SLO #13 — Friction',14:'SLO #14 — Mass & Weight',
  15:'SLO #15 — Weight in Different Gravity'
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
  console.log('\n\x1b[32m🏎️  Physics Racer — Server Ready!\x1b[0m\n');
  console.log('  \x1b[36mLocal:\x1b[0m    http://localhost:' + PORT);
  console.log('  \x1b[33mNetwork:\x1b[0m  http://' + ip + ':' + PORT);
  console.log('\n\x1b[90mShare the Network URL with students on the same Wi-Fi.\x1b[0m\n');
});
