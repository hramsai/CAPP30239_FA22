let num = 100; //integer
let num1 = 200;

// integer

/* 
this is a block comment 
it can be mutiple lines long
*/ 

function foo() { // creating a funciton
    console.log(num);
};
foo();

let foo2 = () => console.log(num) // this is invoking the funtion without the parenthesis
foo2(); // calling a function

// if we create a variable in the funciton, then we cannnot console log the variable becasue it is in the function

// anonymous funcitons 

let anonFun = function(){
    console.log("hello");
} // this is anonymous 

// (() => console.log(100))(); // this is used to invoke an anonymous function

// (function() {
//     console.log("Hello");
// })(); // you have to call this to run it

// arrays:

let arr = ["foo", 123, "bar", ["zar", "car"]];
console.log(arr[1]);

// to set an item in the array 
arr[1] = "barbar"; // this will replace (overwrite) the original
arr.push("par") // and it to the end of the array
arr.splice(1, 2) // take one out two items after the 1 item
// arr.slice // look this up after class

let newArr = ["cow", "turle", "goat"];

for (let item of newArr) {
    console.log(item);
}

for (let i in newArr) {
    console.log(i + " " + newArr[i]);
}

// newArr.forEach((item, i)) => console.log(i + " " + item));

// objects

let obj1 = {
    name: "Harish",
    age: 25,
    job: "Cactus Hunter",
};

console.log(obj1.name);
console.log(obj1["name"]);

obj1.job = "Data Scientist"

console.log(obj1.job);

for (let key in obj1) {
    let value = obj1[key];
    console.log(`This pair is ${key}: ${value}`);
}

// let str = "Hello" + key + "more text here" + foo;
// let str2 = `Hello ${key} more text here" ${foo}`;

for (let i = 0; i < 10; i++) {
    console.log(i);
}

// conditionals


let val = 80
if (val > 80){
    console.log("good")
} else if (val > 50) {
    console.log("okay")
} else {
    console.log("terrible")
}

let newVar = document.getElementById("example")
newVar.innerHTML += "Hello World!" 
newVar.innerHTML += "Hello World!" 