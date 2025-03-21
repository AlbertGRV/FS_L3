const fs = require('fs');
const path = require('path');

function readFile(path, callback) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) throw error;
        console.log("Данные с файла: ", data);
        if (callback) callback(data);
    });
}

function writeFile(path, str, callback) {
    fs.writeFile(path, str, 'utf8', (error) => {
        if (error) throw error;
        console.log('Запись файла завершена');
        if (callback) callback();
    });
}

function appendFile(path, str, callback) {
    fs.appendFile(path, str, 'utf8', (error) => {
        if (error) throw error;
        console.log('Файл дописан');
        if (callback) callback();
    });
}

function clearFile(path, callback) {
    fs.writeFile(path, '', 'utf8', (error) => {
        if (error) throw error;
        console.log('Содержимое файла успешно удалено');
        if (callback) callback();
    });
}

function removeNoise(path, callback) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) throw error;
        const cleanedData = data.replace(/[0-9]/g, '').replace(/[A-Z]/g, match => match.toLowerCase());
        fs.writeFile(path, cleanedData, 'utf8', (error) => {
            if (error) throw error;
            console.log('Шум успешно удалён', cleanedData);
            if (callback) callback();
        });
    });
}

function copyFile(src, dest, callback) {
    fs.copyFile(src, dest, (error) => {
        if (error) throw error;
        console.log('Файл успешно скопирован');
        if (callback) callback();
    });
}

function createFolder(folderPath, callback) {
    fs.mkdir(folderPath, { recursive: true }, (error) => {
        if (error) throw error;
        console.log('Папка успешно создана');
        if (callback) callback();
    });
}

function deleteFolder(folderPath, callback) {
    fs.rmdir(folderPath, { recursive: true }, (error) => {
        if (error) throw error;
        console.log('Папка успешно удалена');
        if (callback) callback();
    });
}

function listFiles(directory, callback) {
    fs.readdir(directory, (error, files) => {
        if (error) throw error;
        files.forEach((file) => {
            const filePath = path.join(directory, file);
            fs.lstat(filePath, (error, stats) => {
                if (error) throw error;
                if (stats.isFile() && !file.startsWith('.')) {
                    console.log(file);
                }
            });
        });
        if (callback) callback();
    });
}

function deleteAllFiles(directory, callback) {
    fs.readdir(directory, (error, files) => {
        if (error) throw error;
        files.forEach((file) => {
            if (!file.startsWith('.')) {
                const filePath = path.join(directory, file);
                fs.lstat(filePath, (error, stats) => {
                    if (error) throw error;
                    if (stats.isDirectory()) {
                        fs.rmdir(filePath, { recursive: true }, (error) => {
                            if (error) throw error;
                        });
                    } else {
                        fs.unlink(filePath, (error) => {
                            if (error) throw error;
                        });
                    }
                });
            }
        });
        console.log('Все файлы и папки, за исключением служебных, успешно удалены');
        if (callback) callback();
    });
}

module.exports = {
    readFileSync: (path) => readFile(path),
    readFileAsync: readFile,
    writeFileSync: (path, str) => writeFile(path, str),
    writeFileAsync: writeFile,
    appendFileSync: (path, str) => appendFile(path, str),
    appendFileAsync: appendFile,
    clearFileSync: (path) => clearFile(path),
    clearFileAsync: clearFile,
    removeNoiseSync: (path) => removeNoise(path),
    removeNoiseAsync: removeNoise,
    copyFileSync: (src, dest) => copyFile(src, dest),
    copyFileAsync: copyFile,
    createFolderSync: (folderPath) => createFolder(folderPath),
    createFolderAsync: createFolder,
    deleteFolderSync: (folderPath) => deleteFolder(folderPath),
    deleteFolderAsync: deleteFolder,
    listFilesSync: (directory) => listFiles(directory),
    listFilesAsync: listFiles,
    deleteAllFilesSync: (directory) => deleteAllFiles(directory),
    deleteAllFilesAsync: deleteAllFiles
};
