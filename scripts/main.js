'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
//while(isNaN(amount) || amount === '' || question === null)

const isString = (str, comma = false) => {
    const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
    return pattern.test(str);
};

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
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            } while (!isString(itemIncome));

            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            } while (!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;
        }

        // возможные расходы
        let addExpenses = ' ';
        do {
            addExpenses = prompt(
                'Перечислите возможные расходы за рассчитываемый период через запятую',
                'internet taxy communal payment credit'
            );
        } while (!isString(addExpenses));

        // appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ');
        appData.addExpenses = addExpenses
            .toLowerCase()
            .split(' ')
            .map((x) => x[0].toUpperCase() + x.slice(1))
            .join(' ');
        console.log('appData.addExpenses: ', appData.addExpenses);

        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let cash = 0;
        let question;
        for (let i = 0; i < 2; i++) {
            if (confirm('Есть ли у вас обязательные расходы')) {
                do {
                    question = prompt('Введите обязательную статью расходов?', ' ');
                } while (!isString(question));
            }
            do {
                cash = +prompt('Во сколько это обойдется? ', ' ');
            } while (!isNumber(cash) && cash < 0);
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
            } while (!isNumber(appData.precentDeposit) && appData.precentDeposit < 0);
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(appData.moneyDeposit) && appData.moneyDeposit < 0);
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

/* appData.getInfoDeposit();
console.log(
    appData.precentDeposit,
    appData.moneyDeposit,
    appData.calcSavedMoney
); */