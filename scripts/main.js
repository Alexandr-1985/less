'use script';

/////////////////////////////////////////////////////////////////////////
//1 value assignment
let money = 190000;
let income = 'frilance';
let addExpenses = 'Internet, Taxy, Communal payment, Credit';
let deposit = true;
let mission = 100000;
let period = 6;
let budgetDay;
let expenses1;
let expenses2;
let amount1;
let amount2;
let budgetMonth;
let internet;
let taxy;
let communalPayment;
let credit;

//metods and properties

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log(
    'Period is equal ' + period + ' month.',
    'Goal to earn ' + mission + ' euro!'
);
console.log(addExpenses.toLocaleLowerCase().split(' '));

budgetDay = money /= 30;
console.log(Math.round(budgetDay));
//console.log(budgetDay.toFixed());

/////////////////////////////////////////////////////////////////////////////////
//question about salary
money = +prompt('Ваш месячный доход?', ' ');
console.log(money);

addExpenses = prompt(
    'Перечислите возможные расходы за рассчитываемый период через запятую',
    'Internet, Taxy, Communal payment, Credit'
);
console.log(addExpenses);
console.log(addExpenses.split(' '));

deposit = console.log(confirm('Есть ли у вас депозит в банке?'));

expenses1 = prompt('Введите обязательную статью расходов?', ' ');
amount1 = +prompt('Во сколько это обойдется?');
expenses2 = +prompt('Введите обязательную статью расходов?', ' ');
amount2 = prompt('Во сколько это обойдется?');

//бюджет на месяц
budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ', budgetMonth);

//за сколько месяцев можно будет собрать mission
mission = console.log(
    'Цель будет достигнута за ' + Math.round(mission / budgetMonth) + ' месяцев'
);

//budgetMonth учитывая бюджет на месяц
budgetDay = budgetMonth /= 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay) + ' рублей');

//Конструктор условий
if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (600 < budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (600 > budgetDay > 0) {
    console.log('Уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что то пошло не так');
} else if (budgetDay === 1200) {
    console.log('You are good!');
} else if (budgetDay === 600) {
    console.log('Надо стараться');
} else if (budgetDay === 0) {
    console.log('Меняй работу');
} else {
    console.log('Иди к начальнику проси повышения');
}