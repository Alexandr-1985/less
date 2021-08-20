'use strict';

let isNumber = function(n) {
    return (!isNaN(parseFloat(n)) && isFinite(n)) || n.trim() === ' ';
};

function isString(s) {
    return !(!isNumber(s) || s === undefined || s === null || s.trim() === ' ');
}

let money;

//проверка вхоящийх данных
let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money)); //|| money.trim() === ' '
};

start();

//создаем объект, будет содержать все переменные которые мы создавали, будут св-ми объекта!
let appData = {
    income: {}, //дополнительные доходы
    addIncome: [], //дополнительные доходы
    expenses: {}, //дополнительные расходы
    addExpenses: [], //массив с возможными расходами
    deposite: false,
    precentDeposit: 0, //под какой % вложено
    moneyDeposit: 0, //сколько вложено
    mission: 100000, //желаемая цель
    period: 3,

    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    //новый метод который расспрашивает пользователя
    asking: function() {
        //есть ли у пользователя заработок
        if (confirm('Есть ли у вас дополнительный заработок')) {
            let itemIncome = ' ';
            let cashIncome = 0;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?');
            } while (isString(itemIncome) || itemIncome.trim() === ''); //||itemIncome.trim() === ' ' ||itemIncome === null || itemIncome === undefined

            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
            } while (
                (!isNumber(cashIncome) && cashIncome < 0) ||
                cashIncome.trim() === ''
            );
            appData.income[itemIncome] = +cashIncome;
        }

        // возможные расходы
        let addExpenses = '';
        do {
            addExpenses = prompt(
                'Перечислите возможные расходы за рассчитываемый период через запятую'
            );
        } while (isString(addExpenses) || addExpenses.trim() === '');

        appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ');
        console.log(appData.addExpenses);
        //Начало слова с заглавной буквы
        console.log(
            appData.addExpenses.map(
                (item) =>
                item.toLowerCase().trim().slice(0, 1).toUpperCase() + item.slice(1)
            )
        );

        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let cash = 0;
        let question;
        for (let i = 0; i < 2; i++) {
            if (confirm('Есть ли у вас обязательные расходы')) {
                do {
                    question = prompt('Введите обязательную статью расходов?');
                } while (isString(question) || question.trim() === '');

                do {
                    cash = +prompt('Во сколько это обойдется?');
                } while (!isNumber(cash) && cash <= 0); //||cash.trim() === ''
                //   debugger;
                appData.expenses[question] = +cash;
            }
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
        if (!money) {
            money = 0;
        }
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
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

    getInfoDeposit: function() {
        if (appData.deposite) {
            do {
                appData.precentDeposit = prompt('Какой годовой процент?', '10');
            } while (
                isString(appData.precentDeposit) ||
                appData.precentDeposit.trim() === ''
            );
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (
                (!isNumber(appData.moneyDeposit) && appData.moneyDeposit <= 0) ||
                appData.moneyDeposit.trim() === ''
            );
        }
    },

    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

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
console.log('Status: ', appData.getStatusIncome());
console.log('Бюджет на день: ' + Math.floor(appData.budgetDay) + ' рублей');

console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log('Свойства ' + elem, ' Значение: ' + appData[elem]);
}

/*
appData.getInfoDeposit();
console.log(
    appData.precentDeposit,
    appData.moneyDeposit,
    appData.calcSavedMoney
);*/

//while(isNaN(amount) || amount === '' || question === null)
/* 
        const isString = (str, comma = false) => {
            const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
            return pattern.test(str);
        };
         */

/*
        appData.addExpenses = addExpenses
        .toLowerCase()
        .split(' ')
        .map((x) => x[0].toUpperCase() + x.slice(1))
        .join(' ');
        console.log('appData.addExpenses: ', appData.addExpenses);
        */
/*function string() {
        let string = addExpenses;
        var splits = string.split(' ');
        var stringItog = '';
        for (let i = 0; i < splits.length; i++) {
        let Name = splits[i];
        let First = Name.substring(0, 1).toUpperCase();
        let Leftovers = Name.substring(1, Name.length);
        stringItog += First + Leftovers + ' ';
        }
        console.log(stringItog);
        }
        string(); */