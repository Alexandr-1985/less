//1 value assignment
let money = 55000;
let income = 'frilance';
let addExpenses = 'Internet, Taxy, Communal payment';
let deposit = true;
let mission = 1000000;
let period = 6;

//metods and properties

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log(
    'Period is equal ' + period + ' month.',
    'Goal to earn ' + mission + ' euro!'
);
console.log(addExpenses.toLocaleLowerCase().split(' '));

let budgetDay = (money /= 30);
console.log(Math.round(budgetDay));
//console.log(budgetDay.toFixed());