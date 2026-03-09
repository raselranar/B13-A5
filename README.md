1️⃣ What is the difference between var, let, and const?

var:

- hoisted and initialized with undefined
- it has function scope
- Reassignable and Redeclarable

let:

- hoisted but uninitialized or TDZ
- it has function scope and block scope (eg."{}")
- Re-assignable but no Re-declarable

const:

- hoisted but uninitialized or TDZ
- it has function scope and block scope (eg."{}")
- no Re-assignable and no Re-declarable

---

2️⃣ What is the spread operator (...)?
The spread operator is introduced in es6.
use case:

example of making a copy array or object:

- `const newArray = [...oldArray]`
- `const newObject = {...oldOject}`

example of concat multiple array or object:

- `const concatArray = [...arr, ...arr2]`
- `const concatObject = [...obj, ...obj2]`

...array => expand array items

---

3️⃣ What is the difference between map(), filter(), and forEach()?

- map(): return new array length is same as original array . every item can be modified. does not change the original array

- filter(): return new array based on condition. does not change the original array

- forEach(): return undefined loop on array. use array item each looping iterate

---

4️⃣ What is an arrow function?
array function is a shorter syntax of function

- don't need to use function keyword
- can be written in one line
- can be skip return keyword if not use {} .`(a,b) => a+b;`
- if it has one parameter don't need to use (). `a => a+a`

---

5️⃣ What are template literals?
Template literals is introduced in es6.This is defined using back-tick (`).
use case:

- create multi-line string without "+" and "\n".
- write expression in string `${expression}`
