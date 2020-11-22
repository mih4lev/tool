import { requestDB } from "./idb-actions.js";

const clientTables = [
    { tableName: `files`, tableOptions: { autoIncrement: true }}
];

const serverTables = [
    { tableName: `files`, tableOptions: { autoIncrement: true }}
];

export const requestClientDB = async () => {
    return await requestDB(`Client`, 1, clientTables);
};

export const requestServerDB = async () => {
    return await requestDB(`Server`, 1, serverTables);
};