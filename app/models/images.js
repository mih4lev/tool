export const convertFileToArray = (file) => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.addEventListener(`load`, () => resolve(reader.result));
            reader.readAsArrayBuffer(file);
        } catch (error) {
            reject(error);
        }
    });
};

export const convertBufferToBlob = (arrayBuffer, fileType) => {
    return new Promise((resolve, reject) => {
        try {
            const blobFile = new Blob([arrayBuffer], { type: fileType });
            resolve(blobFile);
        } catch (error) {
            reject(error);
        }
    });
};

export const convertBlobToURL = (fileBlob) => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.addEventListener(`load`, () => resolve(reader.result));
            reader.readAsDataURL(fileBlob);
        } catch (error) {
            reject(error);
        }
    });
};