'use strict';

let isNumber = function(n) {
    return (!isNaN(parseFloat(n)) && isFinite(n)) || n.trim() === ' ';
};

function isString(s) {
    return !(!isNumber(s) || s === undefined || s === null || s.trim() === ' ');
}

///////////////////////////////////////////////////////////////////
//получить каждый элемент в отдельную переменную через Кнопку "Рассчитать", через id
let start = document.getElementById('start'),
    //получить каждый элемент в отдельную переменную через Кнопки “+” (плюс), через Tag, каждую в своей переменной.
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    //получить каждый элемент в отдельную переменную через Чекбокс по id через querySelector
    depositCheck = document.querySelector('#deposit-check'),
    //получить каждый элемент в отдельную переменную через Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    //получить каждый элемент в отдельную переменную через Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName(
        'expenses_month-value'
    )[0],
    accumulatedMonthValue = document.getElementsByClassName(
        'accumulated_Month-Value'
    )[0],
    additionalIncomeValue = document.getElementsByClassName(
        'additional_income-value'
    )[0],
    additionalExpensesValue = document.getElementsByClassName(
        'additional_expenses-value'
    )[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    //получить каждый элемент в отдельную переменную через Оставшиеся поля через querySelector каждый в отдельную переменную: поля ввода (input) с левой стороны и не забудьте про range.
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount');

//создаем объект, будет содержать все переменные которые мы создавали, будут св-ми объекта!
let appData = {
    income: {}, //дополнительные доходы
    addIncome: [], //дополнительные доходы
    expenses: {}, //дополнительные расходы
    addExpenses: [], //массив с возможными расходами
    deposite: false,
    precentDeposit: 0, //под какой % вложено
    moneyDeposit: 0, //сколько вложено
    //mission: 100000, //желаемая цель - уьираем и записывам метод getTargetMonth
    //period: 3, удаляем
    incomeMonth: 0,

    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    //проверка вхоящийх данных
    start: function() {
        //при вызове input будет присваиваться месячный доход в наш бюджет
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        /*  appData.asking();*/
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        //appData.getTargetMonth();

        appData.showResult();
    },
    //Метод который будет выводить результаты вычисления
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.round(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        //тк это массив мы возвращаем как строку с помощью join(', ')
        additionalIncomeValue.value = appData.addIncome.join(', ');
        //join(', ') - разбиваем снова на строку и сноа запишем.
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        incomePeriodValue.value = appData.calcPeriod();
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    },
    //метод который добавляет новые поля по +
    addExpensesBlock: function() {
        //проверим кто родитель!
        //console.log(expensesItems.parentNode);
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        //с помощью метода appendChild вставляем expensesItem
        //expensesItem.parentNode.appendChild(expensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            //скрытие кнопки после 3рех попыток
            expensesPlus.style.display = 'none';
        }
    },
    //получение всех расходов и запись в обьект
    //получаем псевдо массив
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            console.log(item);
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            } //key = value
        });
    },
    addIncomeBlock: function() {
        //проверим кто родитель!
        // console.log(incomeItems.parentNode);
        let cloneIncomeItem = incomeItems[0].cloneNode('true');
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    //получение доходов
    getIncome: function() {
        incomeItems.forEach(function(item) {
            console.log(item);
            let itemIncomes = item.querySelector('.income-title').value;
            let cashIncomes = item.querySelector('.income-amount').value;

            if (itemIncomes !== '' && cashIncomes !== '') {
                appData.income[itemIncomes] = +cashIncomes;
            }
        });
        //с помощью циклов получаем дополнительный зароботок
        for (let key in appData.income) {
            appData.incomeMonth += appData.income[key];
        }
    },
    //метод расходов
    getAddExpenses: function() {
        //задаем переменную которая получает возможгые расходы
        //создаем массив с помощью метода перебора split(',')
        let addExpenses = additionalExpensesItem.value.split(',');
        //перебираю массив
        addExpenses.forEach(function(item) {
            //убираем пробелы в начале и в конце
            item = item.trim();
            //каждый масив который будет записан будем проверять на пустату
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    //ПОлучаем возможные доходы
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            //item.value -значение полученно в инпуте
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
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
        appData.budgetMonth =
            appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },

    //Обьявить функцию getTargetMonth. Подсчитать за какой период будет достигнута цель, зная результат месячного накопления accumulatedMonth и возвращает результат.
    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
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
            } while (!isNumber(appData.moneyDeposit) ||
                appData.moneyDeposit.trim() === ''
            );
        }
    },

    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    },

    changePeriodSelect: function(event) {
        // let count = periodSelect.value;
        incomePeriodValue.value = appData.calcPeriod();
        document.querySelector('.period-amount').textContent = event.target.value;
    },

    blockSart: function() {
        start.disabled = !salaryAmount.value.trim();
        //start.hidden
        //disabled;
        /* if (start.style.display !== isNumber) {
start.style.display = 'none';
alert('Ошибка, поле "Месячный доход" должен быть заполнен!');
} */
    },
};

start.addEventListener('click', appData.start);
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.changePeriodSelect);
salaryAmount.addEventListener('input', appData.blockSart);

//Обьявить функцию getTargetMonth. Подсчитать за какой период будет достигнута цель, зная результат месячного накопления accumulatedMonth и возвращает результат.
appData.targetMonth = appData.getTargetMonth(
    appData.getTargetMonth,
    appData.getBudget
);

appData.targetMonth >= 0 ?
    console.log(`Срок достижения цели за: ${appData.targetMonth} месяцев`) :
    console.log(
        `Срок достижения цели не будет достигнут за: ${appData.targetMonth} месяцев`
    );
//console.log('Status: ', appData.getStatusIncome());
console.log('Бюджет на день: ' + Math.floor(appData.budgetDay) + ' рублей');

console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log('Свойства ' + elem, ' Значение: ' + appData[elem]);
}