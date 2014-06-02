// waterbucket in javaScript

queue=[];
seen={}
g_goal=1


function addState(parentState,newState){
// console.log("parent s",parentState)
// console.log("new s",newState);
// s=toString(newState)
// console.log(typeof newState)
 if (newState in seen){
 // console.log("in seen"); 
  return}
 seen[newState]=parentState;
 queue.push(newState);
// console.log("queue",queue);
// console.log("se",seen)
}
//addState("",[0,0]);

function getState(){
  if(queue.length==0)
    return
  var state=queue[0];
  queue=queue.slice(1,queue.length)
  return state
}

function getSolution(){
 var solution=[];
 state=queue.pop();
 while (state){
  solution.push(state)
  state=getParent(state)
 }
 
 solution.reverse();
 for( var i=0;i<solution.length;i++)
   console.log(solution[i])
}

function getParent(childState){
// a=toString(childState)
 if (typeof seen[childState] == "undefined")
  return false
 else
  return seen[childState]
} 

function test(oldstate,newstate){
// console.log("New in t",newstate);
 var newA=newstate[0];
 var  newB=newstate[1];
// console.log(newA,newB);
 won=(newA==g_goal ||  newB==g_goal)
 addState(oldstate,newstate);
 return won
}

function playGame(aMax,bMax,goal){
 g_goal=goal;
// console.log(aMax,bMax,goal);
 addState("",[0,0]);
 while(1){
  oldstate=getState()
  aHas=oldstate[0]
  bHas=oldstate[1]
 // console.log(oldstate);
 // console.log("aHas=",aHas);
 // console.log("bHas=",bHas);
  if(test(oldstate,[aMax,bHas]))
   break;
  if (test(oldstate,[0,bHas]))
   break;
  if (test(oldstate,[aHas,bMax]))
   break;
  if (test(oldstate,[aHas,0]))
   break;
  howmuch=Math.min(aHas,bMax-bHas)
  if(test(oldstate,[aHas-howmuch,bHas+howmuch]))
   break;
  howmuch=Math.min(aMax-aHas,bHas)
  if(test(oldstate,[aHas+howmuch,bHas-howmuch]))
   break;
 } 
  console.log("Using buckets of",aMax,",",bMax,"l to get",goal,"l ")
  getSolution();
}


playGame(7,11,6);
