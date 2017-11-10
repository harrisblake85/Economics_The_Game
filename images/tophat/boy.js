//FOR IN LOOP EXAMPLE
const something={
 thing:"something1",
 jhing:"something2",
 hing:"something3"
};
//For In Loop, Loop through the keys of the something object
for (let x in something) {
  console.log(something[x]);
  //log something's keys
  //should log something1,something2,something3
}
