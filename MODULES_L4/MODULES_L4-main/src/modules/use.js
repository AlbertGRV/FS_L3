const ss = require('./sortString');
const dl = require('./dataLoading');
const fs = require('./fileSystem');
const path = require('path');

const url = 'https://jsonplaceholder.typicode.com/users';
const folderPath = path.join(__dirname, 'src/modules/users');

dl.dataLoadingWithCallback(url, (result) => {
    const data = result.data;
    const sortedData = ss.sortString(data, 'name');

    const dataNames = sortedData.map(elem => elem.name).join('\n');
    const dataEmails = sortedData.map(elem => elem.email).join('\n');

    fs.writeFileSync(path.join(folderPath, 'names.txt'), dataNames);
    fs.writeFileSync(path.join(folderPath, 'emails.txt'), dataEmails);

    console.log('Успешно записано.');
});
