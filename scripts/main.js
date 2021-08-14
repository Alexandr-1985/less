'use strict';
/////////////////////////////////////////

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
//while(isNaN(amount) || amount === '' || question === null)
/////////////////////////////////////////////////////////////////////////
let money;

//question about salary
//проверка вхоящийх данных
let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};
start();

//создаем объект, будет содержать все переменные которые мы создавали, будут св-ми объекта!
let appData = {
    income: {}, //дополнительные доходы
    addIncome: [], //дополнительные доходы
    expenses: {}, //дополнительные расходы
    addExpenses: [], //массив с возможными расходами
    deposite: false,
    mission: 100000,
    period: 3,

    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    //новый метод который расспрашивает пользователя
    asking: function() {
        // возможные расходы
        let addExpenses = prompt(
            'Перечислите возможные расходы за рассчитываемый период через запятую',
            'Internet, Taxy, Communal payment, Credit'
        );
        appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let question = prompt('Введите обязательную статью расходов?', ' '); //appData.expenses[i]
            let cash;
            do {
                cash = prompt('Во сколько это обойдется? ', ' ');
            } while (!isNumber(cash) || cash < 0);
            cash = appData.expenses[question];
        }
    },
    //Объявить ф-ю всех обязательных расходов
    getExpensesMonth: function() {
        for (let elem in appData.expenses) {
            appData.getExpensesMonth += appData.expenses[elem];
            console.log('key: ' + elem + ' value: ' + appData.expenses[elem]);
        }
        console.log('Обязатеьные расходы за месяц:', appData.expensesMonth);
    },

    //Объявить ф-ю которая возвращает накопления за месяцев
    getAccumulatedMonth: function() {
        if (!money) {
            money = 0;
        }
        return money - appData.expensesMonth;
    },

    //Обьявить функцию getTargetMonth. Подсчитать за какой период будет достигнута цель, зная результат месячного накопления accumulatedMonth и возвращает результат.
    getTargetMonth: function() {
        return Math.round(appData.mission / appData.getBudget);
    },

    //Конструктор условий
    getStatusIncome: function(budgetDay) {
        if (appData.budgetDay > 1200) {
            return 'У вас высокий уровень дохода';
        } else if (600 < appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (600 > appData.budgetDay > 0) {
            return 'Уровень дохода ниже среднего';
        } else if (appData.budgetDay < 0) {
            return 'Что то пошло не так';
        } else if (appData.budgetDay === 1200) {
            return 'You are good!';
        } else if (appData.budgetDay === 600) {
            return 'Надо стараться';
        } else if (appData.budgetDay === 0) {
            return 'Меняй работу';
        } else {
            return 'Иди к начальнику проси повышения';
        }
    },
};

/////////////////////////////////////////////////////////////////////////////////
appData.asking();
appData.getExpensesMonth();
appData.getAccumulatedMonth();
appData.getTargetMonth();

//Объявить ф-ю которая возвращает накопления за месяцев
console.log('Накопления за месяц: ', appData.getAccumulatedMonth(money));

//обьявить переменную и присвоить результат вызова ф-ии
appData.getBudget = appData.getAccumulatedMonth();

//Обьявить функцию getTargetMonth. Подсчитать за какой период будет достигнута цель, зная результат месячного накопления accumulatedMonth и возвращает результат.
appData.targetMonth = appData.getTargetMonth(
    appData.mission,
    appData.getBudget
);

appData.targetMonth >= 0 ?
    console.log(`Срок достижения цели за: ${appData.targetMonth} месяцев`) :
    console.log(
        `Срок достижения цели не будет достигнут за: ${appData.targetMonth} месяцев`
    );

//budgetMonth учитывая бюджет на месяц
appData.budgetDay = appData.getBudget / 30;
console.log('Бюджет на день: ' + Math.floor(appData.budgetDay) + ' рублей');

//Конструктор условий
appData.getStatusIncome(appData.budgetDay);
console.log('Status: ', appData.getStatusIncome(appData.budgetDay));

/////////////////////////////////////////////////
console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log('Свойства ' + elem, ' Значение: ' + appData[elem]);
}
////////////////////////////////////////////////////////
/* 
console.log(appData.addExpenses.length);

console.log(
    'Period is equal ' + appData.period + ' month. ',
    `Goal to earn ${appData.mission} euro!`
);
 */
/////////////////////////////////////////