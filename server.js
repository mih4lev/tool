const express = require(`express`);
const { DB } = require("./db");
const app = express();
const WS = require(`express-ws`)(app);
const sharp = require(`sharp`);
const multer = require(`multer`);
const formParser = multer();
const upload = multer({ dest: `/upload` });

app.use(`/sw-install.js`, express.static(__dirname + `/sw-install.js`));
app.use(`/service-worker.js`, express.static(__dirname + `/service-worker.js`));
app.use(`/upload`, express.static(__dirname + `/upload`));
app.use(`/`, express.static(__dirname + `/dist/`));

app.ws(`/`, () => {});

app.on(`DB_UPDATE`, () => {
    [...WS.getWss().clients].forEach((client) => {
        const data = JSON.stringify({ action: `updateDB` });
        client.send(data);
    });
});

const saveFile = async (data) => {
    const query = `INSERT INTO files SET ?`;
    const response = await DB(query, data);
    return Number(response.affectedRows && response.affectedRows === 1);
};

const deleteFile = async (fileID) => {
    const query = `DELETE FROM files WHERE fileID = ?`;
    const response = await DB(query, [fileID]);
    return Number(response.affectedRows && response.affectedRows === 1);
};

app.get(`/api/files`, async (request, response) => {
    const query = `SELECT * FROM files`;
    response.json(await DB(query));
});

app.post(`/api/files`, upload.single(`file`), async (request,  response) => {
    const { file: { filename, path }} = request;
    const { size } = await sharp(path).toFile(`upload/${ filename }.jpg`);
    const data = { size, filename };
    const status = await saveFile(data);
    if (status === 1) app.emit(`DB_UPDATE`);
    response.json({ status });
});

app.delete(`/api/files`, formParser.none(), async (request,  response) => {
    const { body: { fileID }} = request;
    const status = await deleteFile(fileID);
    if (status === 1) app.emit(`DB_UPDATE`);
    response.json({ status });
});

app.use((request, response, next) => {
    response.sendFile(__dirname + `/dist/index.html`);
});

app.listen(8892);