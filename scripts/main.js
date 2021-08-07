'use script';

/////////////////////////////////////////////////////////////////////////
//1 value assignment
let money,
    income = 'Full Stack',
    addExpenses,
    deposit,
    mission = 1000000,
    period = 3,
    budgetDay,
    expenses1,
    expenses2,
    amount1,
    amount2,
    budgetMonth;

/////////////////////////////////////////////////////////////////////////////////
//question about salary
money = +prompt('Ваш месячный доход?', ' ');
//console.log('Месячный доход: ', money);

// возможные расходы
addExpenses = prompt(
    'Перечислите возможные расходы за рассчитываемый период через запятую',
    'Internet, Taxy, Communal payment, Credit'
);

deposit = confirm('Есть ли у вас депозит в банке?');

expenses1 = prompt('Введите обязательную статью расходов?', ' ');
amount1 = +prompt('Во сколько это обойдется?', ' ');
expenses2 = prompt('Введите обязательную статью расходов?', ' ');
amount2 = +prompt('Во сколько это обойдется?', ' ');

//Объявить ф-ю всех обязательных расходов
const getExpensesMonth = function() {
    if (!amount1) {
        amount1 = 0;
    }
    if (!amount2) {
        amount2 = 0;
    }
    return amount1 + amount2;
};
console.log(
    'Обязатеьные расходы за месяц:',
    getExpensesMonth(amount1, amount2)
);

//Объявить ф-ю которая возвращает накопления за месяцев
const getAccumulatedMonth = function() {
    if (!money) {
        money = 0;
    }
    return money - getExpensesMonth();
};
console.log('Накопления за месяц: ', getAccumulatedMonth(money));

//обьявить переменную и присвоить результат вызова ф-ии
const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth());
console.log(accumulatedMonth);

//Обьявить функцию getTargetMonth. Подсчитать за какой период будет достигнута цель, зная результат месячного накопления accumulatedMonth и возвращает результат.
const getTargetMonth = function() {
    let div = Math.round(mission / accumulatedMonth);
    return div;
};
console.log(`Срок достижения цели за: ${getTargetMonth()} месяцев`);

//budgetMonth учитывая бюджет на месяц
budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay) + ' рублей');

//Конструктор условий
const getStatusIncome = function(budgetDay) {
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

//metods and properties
const showTypeOf = (data) => {
    console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
showTypeOf(expenses2);
showTypeOf(amount1);

console.log(addExpenses.length);

//Вывод ввиде массива
console.log(addExpenses.toLocaleLowerCase().split(' '));

console.log(
    'Period is equal ' + period + ' month.',
    `Goal to earn ${mission} euro!`
);

/////////////////////////////////////////