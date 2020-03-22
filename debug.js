const fetch = require('node-fetch');
const baseUrl = 'http://localhost:3001/';


const request = (url, method, payload) => {
  const requestUrl = baseUrl + url;
  const config = {
    headers: { 'Content-Type': 'application/json' },
    method,
  };
  if (payload) {
    config.body = JSON.stringify(payload);
  }
  return fetch(requestUrl, config).then(result => result.json());
};


const createSubCategories = () => {
  const categories = [
    {
      name: 'Fuel',
      icon: null,
      type: 'EXPENSE',
      parent: 'Car',
    },
    {
      name: 'Repair',
      icon: null,
      type: 'EXPENSE',
      parent: 'Car',
    },
    {
      name: 'Clean',
      icon: null,
      type: 'EXPENSE',
      parent: 'Home',
    },
    {
      name: 'Rent',
      icon: null,
      type: 'EXPENSE',
      parent: 'Home',
    },
  ];

  const promises = categories.map(account => {
    return request('categories', 'POST', account);
  });

  return Promise.all(promises).then(results => {
    return results;
  });
};

const createCategories = () => {
  const categories = [
    {
      name: 'Car',
      icon: null,
      type: 'EXPENSE',
      parent: null,
    },
    {
      name: 'Smoke',
      icon: null,
      type: 'EXPENSE',
      parent: null,
    },
    {
      name: 'Home',
      icon: null,
      type: 'EXPENSE',
      parent: null,
    },
    {
      name: 'Salary',
      icon: null,
      type: 'INCOME',
      parent: null,
    },
    {
      name: 'From Credit',
      icon: null,
      type: 'INCOME',
      parent: null,
    },
  ];

  const promises = categories.map(account => {
    return request('categories', 'POST', account);
  });

  return Promise.all(promises).then(results => {
    return results;
  });
};

const createAccounts = () => {
  const accounts = [
    {
      name: 'Revolut',
      initialBalance: 50,
      initialBalanceDate: '2019-12-10',//T09:02:13.172Z',
    },
    {
      name: 'Cash',
      initialBalance: 115,
      initialBalanceDate: '2019-12-10',//T09:02:13.172Z',
    },
  ];

  const promises = accounts.map(account => {
    return request('accounts', 'POST', account);
  });

  return Promise.all(promises).then(results => {
    return results;
  });
};

const start = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};


const createIncomes = () => {
  const incomes = [
    {
      account: 'Cash',
      amount: 1500,
      dateTime: '2020-01-15',//T09:02:13.172Z',
      category: 'Salary',
      description: 'Salary in January',
    },
    {
      account: 'Cash',
      amount: 1700,
      dateTime: '2020-02-16',//T09:02:13.172Z',
      category: 'Salary',
      description: 'Salary in February',
    },
    {
      account: 'Revolut',
      amount: 100,
      dateTime: '2020-02-09',//T09:02:13.172Z',
      category: 'From Credit',
      description: 'Rafi kartyarol',
    },
    {
      account: 'Cash',
      amount: 1100,
      dateTime: '2020-03-13',//T09:02:13.172Z',
      category: 'Salary',
      description: 'Salary in March',
    },
  ];

  const promises = incomes.map(income => {
    return request('transactions/income', 'POST', income);
  });

  return Promise.all(promises).then(results => {
    return results;
  });
};

const createExpenses = () => {
  const expenses = [
    {
      account: 'Cash',
      amount: 250,
      dateTime: '2020-01-18',//T09:02:13.172Z',
      category: 'Fuel',
      description: 'Tankolas januarban',
    },
    {
      account: 'Cash',
      amount: 350,
      dateTime: '2020-02-21',//T09:02:13.172Z',
      category: 'Fuel',
      description: 'Tankolas Februarban',
    },
    {
      account: 'Cash',
      amount: 1350,
      dateTime: '2020-03-11',//T09:02:13.172Z',
      category: 'Repair',
      description: 'Auto javitas',
    },
    {
      account: 'Revolut',
      amount: 19,
      dateTime: '2020-02-15',//T09:02:13.172Z',
      category: 'Smoke',
      description: 'Cigim',
    },
    {
      account: 'Revolut',
      amount: 19,
      dateTime: '2020-03-13',////T09:02:13.172Z',
      category: 'Smoke',
      description: 'Cigim 2',
    },
  ];

  const promises = expenses.map(expense => {
    return request('transactions/expense', 'POST', expense);
  });

  return Promise.all(promises).then(results => {
    return results;
  });
};

const createTransfers = () => {
  const transfers = [
    {
      from: 'Cash',
      to: 'Revolut',
      amount: 500,
      dateTime: '2020-01-22',//T09:02:13.172Z',
      description: 'Topup januarban',
    },
    {
      from: 'Cash',
      to: 'Revolut',
      amount: 200,
      dateTime: '2020-02-25',//T09:02:13.172Z',
      description: 'Topup februarban',
    },
  ];

  const promises = transfers.map(transfer => {
    return request('transactions/transfer', 'POST', transfer);
  });

  return Promise.all(promises).then(results => {
    return results;
  });
};

start()
  .then(() => createAccounts())
  .then(() => createCategories())
  .then(() => createSubCategories())
  .then(() => createIncomes())
  .then(() => createTransfers())
  .then(() => createExpenses());

