import {
    requestTransaction, requestAllTransactions, saveTransaction, deleteTransaction
} from "./idb-actions.js";
import { convertBufferToBlob, convertFileToArray } from "./images.js";
import { requestClientDB, requestServerDB } from "./idb.js";

const removeLocalData = async (requestID) => {
    const DB = await requestClientDB();
    await deleteTransaction(DB, `files`, requestID);
};

const sendToServer = async (result) => {
    const { key, value: { action, payload: { file: fileBuffer, type, size, fileID }}} = result;
    if (action === `create`) {
        const file = await convertBufferToBlob(fileBuffer);
        const body = new FormData();
        body.append(`file`, file, `file`);
        body.append(`type`, type);
        body.append(`size`, size);
        const response = await fetch(`/api/files`, { method: `POST`, body });
        const data = await response.json();
        if (data.status === 1) await removeLocalData(key);
    }
    if (action === `delete`) {
        const body = new FormData();
        body.append(`fileID`, fileID);
        const response = await fetch(`/api/files`, { method: `DELETE`, body });
        const data = await response.json();
        if (data.status === 1) await removeLocalData(key);
    }
};

export const fromClientToServer = async () => {
    console.log(`Sync to server from client`);
    const DB = await requestClientDB();
    const tx = DB.transaction(`files`, `readonly`);
    const store = tx.objectStore(`files`);
    const request = store.openCursor();
    request.addEventListener(`success`, () => {
        if (!request.result) return false;
        console.log(`Send file data to server`);
        sendToServer(request.result);
        request.result.continue();
    });
};

export const fromServerToClient = async () => {
    console.log(`Sync to client from server`);
    const response = await fetch(`/api/files`);
    const files = await response.json();
    const DB = await requestServerDB();
    // add new files to indexedDB
    for (const file of files) {
        const { fileID, filename, size, timestamp } = file;
        const data = await requestTransaction(DB, `files`, fileID);
        if (!data) {
            console.log(`Save NEW file`, filename);
            const fileSource = await fetch(`/upload/${ filename }.jpg`);
            const fileBlob = await fileSource.blob();
            const arrayBuffer = await convertFileToArray(fileBlob);
            const file = { fileID, file: arrayBuffer, filename, size, timestamp };
            await saveTransaction(DB, `files`, file);
        }
    }
    // remove deleted files from indexedDB
    const checkFile = async (data) => {
        const { key, value: { fileID }} = data;
        const isFileExist = !!files.find(({ fileID: searchID }) => fileID === searchID);
        if (!isFileExist) await deleteTransaction(DB, `files`, key);
    };
    await requestAllTransactions(DB, `files`, checkFile);
};

export const checkUpdate = async () => {
    await checkEmptyDB();
    await fromClientToServer();
    await fromServerToClient();
};

export const checkEmptyDB = async () => {
    const serverDB = await requestServerDB();
    [...serverDB.objectStoreNames].forEach((storeName) => {
        const tx = serverDB.transaction(storeName, `readonly`);
        const store = tx.objectStore(storeName);
        const request = store.getAll();
        request.addEventListener(`success`, () => {
            console.log(request.result.length);
        });
    });
    console.log([...serverDB.objectStoreNames]);
};