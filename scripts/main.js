'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
//while(isNaN(amount) || amount === '' || question === null)

let money;

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

    budget: +money,
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
        let cash;
        let question;
        for (let i = 0; i < 2; i++) {
            question = prompt('Введите обязательную статью расходов?', ' '); //appData.expenses[i]
            do {
                cash = +prompt('Во сколько это обойдется? ', ' ');
            } while (!isNumber(cash) || cash < 0);
            //   debugger;
            appData.expenses[question] = cash;
        }
    },
    //Объявить ф-ю всех обязательных расходов
    getExpensesMonth: function() {
        for (let elem in appData.expenses) {
            appData.expensesMonth += appData.expenses[elem];
            console.log('key: ' + elem + ' value: ' + appData.expenses[elem]);
        }
    },

    //Объявить ф-ю которая возвращает накопления за месяцев
    getBudget: function() {
        if (!appData.money) {
            appData.money = 0;
        }
        appData.budgetMonth = appData.money - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },

    //Обьявить функцию getTargetMonth. Подсчитать за какой период будет достигнута цель, зная результат месячного накопления accumulatedMonth и возвращает результат.
    getTargetMonth: function() {
        return Math.round(appData.mission / appData.budgetMonth);
    },

    //Конструктор условий
    getStatusIncome: function(budgetDay) {
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return 'Уровень дохода ниже среднего';
        } else if (appData.budgetDay < 0) {
            return 'Что то пошло не так';
        } else {
            return 'Иди к начальнику проси повышения';
        }
    },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

//Объявить ф-ю которая возвращает накопления за месяцев
console.log('Накопления за месяц: ', appData.budgetMonth);

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

console.log('Обязательные расходы за месяц:', appData.expensesMonth);
console.log('Бюджет на день: ' + Math.floor(appData.budgetDay) + ' рублей');

//Конструктор условий
//appData.getStatusIncome(appData.budgetDay);
console.log('Status: ', appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log('Свойства ' + elem, ' Значение: ' + appData[elem]);
}