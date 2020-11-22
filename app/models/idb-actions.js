export const requestDB = (DB, version, tables) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB, version);
        let connection;
        request.addEventListener(`upgradeneeded`, ({ target }) => {
            connection = target.result;
            tables.forEach(({ tableName, tableOptions }) => {
                if (!connection.objectStoreNames.contains(tableName)) {
                    const newStore = connection.createObjectStore(tableName, tableOptions);
                    if (DB === `Server`) newStore.createIndex('fileID_idx', 'fileID');
                }
            });
        });
        request.addEventListener(`success`, ({ target }) => {
            resolve(target.result);
        });
        request.addEventListener(`error`, (event) => reject(event));
    });
};

export const saveTransaction = (connection, tableName, data) => {
    return new Promise((resolve, reject) => {
        const tx = connection.transaction(tableName, `readwrite`);
        const store = tx.objectStore(tableName);
        const request = store.add(data);
        tx.addEventListener(`complete`, () => resolve(request));
        tx.addEventListener(`error`, (event) => reject(event));
    });
};

export const requestTransaction = (connection, tableName, requestID) => {
    return new Promise((resolve, reject) => {
        const tx = connection.transaction(tableName, `readonly`);
        const store = tx.objectStore(tableName);
        const fileIndex = store.index("fileID_idx");
        const request = fileIndex.get(requestID);
        request.addEventListener(`success`, (event) => {
            const { target: { result }} = event;
            resolve(result);
        });
        request.addEventListener(`error`, (event) => reject(event));
    });
};

export const requestAllTransactions = (connection, tableName, callback) => {
    return new Promise((resolve, reject) => {
        const tx = connection.transaction(tableName, `readonly`);
        const store = tx.objectStore(tableName);
        const request = store.openCursor();
        request.addEventListener(`success`, () => {
            if (!request.result) return resolve();
            callback(request.result);
            request.result.continue();
        });
        request.addEventListener(`error`, (event) => reject(event));
    });
};

export const deleteTransaction = (connection, tableName, requestID) => {
    return new Promise((resolve, reject) => {
        const tx = connection.transaction(tableName, `readwrite`);
        const store = tx.objectStore(tableName);
        const request = store.delete(requestID);
        request.addEventListener(`success`, (event) => resolve(event));
        request.addEventListener(`error`, (event) => reject(event));
    });
};