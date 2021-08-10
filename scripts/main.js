'use strict';
<<<<<<< HEAD
=======
/////////////////////////////////////////

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
>>>>>>> lesson05

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//1 value assignment
let money,
    income = 'Full Stack',
    addExpenses,
    deposit,
    mission = 1000000,
    period = 3,
    budgetDay,
    budgetMonth;

/////////////////////////////////////////////////////////////////////////////////
//question about salary
//проверка вхоящийх данных
let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};
start();

deposit = confirm('Есть ли у вас депозит в банке?');

// возможные расходы
addExpenses = prompt(
    'Перечислите возможные расходы за рассчитываемый период через запятую',
    'Internet, Taxy, Communal payment, Credit'
);
//Вывод ввиде массива
console.log(addExpenses.toLocaleLowerCase().split(', '));

//metods and properties
let showTypeOf = (data) => {
    console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

//Объявить ф-ю всех обязательных расходов
let getExpensesMonth = function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', ' ');
        let amount;
        do {
            amount = prompt('Во сколько это обойдется?', ' ');
        } while (!isNumber(amount));
        sum += amount;
    }
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Обязатеьные расходы за месяц:', expensesAmount);

//Объявить ф-ю которая возвращает накопления за месяцев
let getAccumulatedMonth = function() {
    if (!money) {
        money = 0;
    }
    return money - expensesAmount;
};
console.log('Накопления за месяц: ', getAccumulatedMonth(money));

//обьявить переменную и присвоить результат вызова ф-ии
let accumulatedMonth = getAccumulatedMonth();

//Обьявить функцию getTargetMonth. Подсчитать за какой период будет достигнута цель, зная результат месячного накопления accumulatedMonth и возвращает результат.
let getTargetMonth = function() {
    return Math.round(mission / accumulatedMonth);
};
let targetMonth = getTargetMonth(mission, accumulatedMonth);

targetMonth >= 0 ?
    console.log(`Срок достижения цели за: ${targetMonth} месяцев`) :
    console.log(
        `Срок достижения цели не будет достигнут за: ${targetMonth} месяцев`
    );

//budgetMonth учитывая бюджет на месяц
budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay) + ' рублей');

//Конструктор условий
let getStatusIncome = function(budgetDay) {
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
};
getStatusIncome(budgetDay);
//console.log('Status: ', getStatusIncome(budgetDay));

////////////////////////////////////////////////////////

console.log(addExpenses.length);

console.log(
    'Period is equal ' + period + ' month. ',
    `Goal to earn ${mission} euro!`
);

/////////////////////////////////////////