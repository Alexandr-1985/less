'use script';

/////////////////////////////////////////////////////////////////////////
//1 value assignment
let money = 190000;
let income = 'frilance';
let addExpenses = 'Internet, Taxy, Communal payment, Credit';
let deposit = true;
let mission = 1000000;
let period = 6;
let budgetDay;
let costs;
let budgetMonth;
let internet = 30000;
let taxy = 15000;
let communalPayment = 40000;
let credit = 21000;

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
money = prompt('Ваш месячный доход?', ' ');
console.log(money);

addExpenses = prompt(
    'Перечислите возможные расходы за рассчитываемый период через запятую',
    'Internet, Taxy, Communal payment, Credit'
);
console.log(addExpenses);
console.log(addExpenses.split(' '));

deposit = console.log(Boolean(prompt('Есть ли у вас депозит в банке')));

costs = prompt('Есть ли у вас депозит в банке', 'expenses1');
console.log(costs);
costs = prompt('Есть ли у вас депозит в банке', 'expenses2');
console.log(costs);

costs = console.log(prompt('Во сколько это обойдется', 'amount1'));
costs = console.log(prompt('Во сколько это обойдется', 'amount2'));

//бюджет на месяц
budgetMonth = money - internet - taxy - communalPayment - credit;
console.log('Бюджет на месяц:', budgetMonth);

//за сколько месяцев можно будет собрать mission
mission = console.log(
    'Цель бцдет достигнута за' + Math.round(mission / budgetMonth) + 'месяцев'
);

//budgetMonth учитывая бюджет на месяц
budgetDay = budgetMonth /= 30;
console.log('Бюджет на день:', Math.round(-budgetDay));

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

//тернарный
console.log(
    isNaN(budgetDay) ?
    'Вероятно ошибка' :
    budgetDay < 0 ?
    'Что то пошло не так' :
    budgetDay < 600 ?
    'Надо стараться лучше!' :
    budgetDay < 1200 ?
    'Уже лучше' :
    budgetDay > 1200 ?
    'У вас высокий уровень дохода' :
    budgetDay === 0 ?
    'Меняй работу' :
    budgetDay === 600 ?
    'Надо стараться' :
    budgetDay === 1200 ?
    'You are good!' :
    'Или просто не везет'
);