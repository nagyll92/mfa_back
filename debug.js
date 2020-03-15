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
      initialBalanceDate: '2019-12-10T09:02:13.172Z',
    },
    {
      name: 'Cash',
      initialBalance: 115,
      initialBalanceDate: '2019-12-10T09:02:13.172Z',
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


start()
  //.then(() => createAccounts())
  //.then(() => createCategories())
  .then(()=> createSubCategories());

