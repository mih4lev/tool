import { saveTransaction, requestAllTransactions } from "./idb-actions.js";
import { convertBlobToURL, convertBufferToBlob, convertFileToArray } from "./images.js";
import { requestClientDB, requestServerDB } from "./idb.js";
import { fromClientToServer } from "./files-sync.js";

const createPreview = (fileURL) => {
    const imageNode = new Image();
    imageNode.src = fileURL;
    imageNode.classList.add(`images__image`);
    return imageNode;
};

const removeFile = async (event) => {
    const { target: button, target: { dataset: { key }}} = event;
    const requestID = Number(key);
    const wrapper = button.closest(`.images__item`);
    const imagesWrapper = document.querySelector(`.images__list`);
    const data = { action: `delete`, payload: { fileID: requestID }};
    const DB = await requestClientDB();
    const status = await saveTransaction(DB, `files`, data);
    if (!status.result) return false;
    imagesWrapper.removeChild(wrapper);
    // sync from client to server
    await fromClientToServer();
};

const createRemoveButton = (key) => {
    const buttonNode = document.createElement(`button`);
    buttonNode.setAttribute(`type`, `button`);
    buttonNode.classList.add(`remove__button`);
    buttonNode.addEventListener(`click`, removeFile);
    buttonNode.dataset.key = key;
    return buttonNode;
};

export const createListWrapper = (fileID, fileURL) => {
    const imagesWrapper = document.querySelector(`.images__list`);
    const wrapperNode = document.createElement(`li`);
    wrapperNode.classList.add(`images__item`);
    const imageNode = createPreview(fileURL);
    const buttonNode = createRemoveButton(fileID);
    wrapperNode.appendChild(imageNode);
    wrapperNode.appendChild(buttonNode);
    imagesWrapper.appendChild(wrapperNode);
};

const filesCallback = async (result) => {
    const { value: { file: fileBuffer, fileID }} = result;
    const fileBlob = await convertBufferToBlob(fileBuffer, `images/jpeg`);
    const fileURL = await convertBlobToURL(fileBlob);
    createListWrapper(fileID, fileURL);
};

export const requestFiles = async () => {
    const serverDB = await requestServerDB();
    await requestAllTransactions(serverDB, `files`, filesCallback);
};

export const fileForm = () => {
    const formNode = document.querySelector(`.images__form`);
    const fileField = document.querySelector(`.file__field`);
    const submitButton = formNode.querySelector(`.submit__button`);
    submitButton.addEventListener(`click`, async (event) => {
        event.preventDefault();
        if (![...fileField.files].length) return false;
        const { files: { 0: uploadFile, 0: { type, size }}} = fileField;
        const fileBuffer = await convertFileToArray(uploadFile);
        const DB = await requestClientDB();
        const payload = { file: fileBuffer, type, size, timestamp: new Date() };
        const transactionData = { action: `create`, payload };
        const response = await saveTransaction(DB, `files`, transactionData);
        if (!response.result) return false;
        // add image wrapper
        const fileBlob = await convertBufferToBlob(fileBuffer, type);
        const fileURL = await convertBlobToURL(fileBlob);
        createListWrapper(response.result, fileURL);
        // sync from client to server
        await fromClientToServer();
    });
};