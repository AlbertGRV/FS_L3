const fs = require('fs');
const path = "C:/src/modules/file.txt";
const dest = "copy.txt";
const folderPath = "C:/src/modules"


function writeToFile(filePath, data) {
    fs.writeFileSync(filePath, data);
    console.log(`Данные записаны в файл: ${filePath}`);
}


function readFromFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    console.log(`Данные из файла ${filePath}:`, data);
    return data;
}


function updateFile(filePath, newData) {
    fs.writeFileSync(filePath, newData);
    console.log(`Файл ${filePath} обновлен.`);
}


function clearFile(filePath) {
    fs.writeFileSync(filePath, '');
    console.log(`Файл ${filePath} очищен.`);
}


function removeNoise(filePath) {
    let data = fs.readFileSync(filePath, 'utf-8');
    data = data.replace(/\d+/g, ''); 
    data = data.toLowerCase(); 
    fs.writeFileSync(filePath, data);
    console.log(`Шум удален из файла: ${filePath}`);
}


function copyFile(sourcePath, destinationPath) {
    const data = fs.readFileSync(sourcePath, 'utf-8');
    fs.writeFileSync(destinationPath, data);
    console.log(`Файл скопирован из ${sourcePath} в ${destinationPath}`);
}


function createFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Папка создана: ${folderPath}`);
    } else {
        console.log(`Папка уже существует: ${folderPath}`);
    }
}


function deleteFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, { recursive: true });
        console.log(`Папка удалена: ${folderPath}`);
    } else {
        console.log(`Папка не существует: ${folderPath}`);
    }
}


function listAllFiles(dirPath) {
    const files = [];
    const scanDir = (dir) => {
        const items = fs.readdirSync(dir);
        items.forEach(item => {
            const itemPath = path.join(dir, item);
            if (fs.statSync(itemPath).isDirectory()) {
                scanDir(itemPath);
            } else {
                files.push(itemPath);
            }
        });
    };
    scanDir(dirPath);
    console.log('Все файлы в проекте:', files);
    return files;
}


function cleanProject(dirPath) {
    const items = fs.readdirSync(dirPath);
    items.forEach(item => {
        const itemPath = path.join(dirPath, item);
        if (item !== 'node_modules' && item !== '.git' && item !== '.env') {
            if (fs.statSync(itemPath).isDirectory()) {
                fs.rmdirSync(itemPath, { recursive: true });
            } else {
                fs.unlinkSync(itemPath);
            }
            console.log(`Удалено: ${itemPath}`);
        }
    });
}

module.exports = {
    writeToFile,
    readFromFile,
    updateFile,
    clearFile,
    removeNoise,
    copyFile,
    createFolder,
    deleteFolder,
    listAllFiles,
    cleanProject
};