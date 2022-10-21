const express = require('express');
const router = express.Router();
const pool = require('../database/configpg');

router.get('/all', async (req, res) => {
    //console.log("get servidor")
    pool.query('SELECT * FROM placas', function (err, result) {
        if (err) {
            console.log(err)
            res.json(err);
        }
        else {
            res.status(200).json(result);
        }
    });
});

router.post('/store', async (req, res) => {
    const placa=req.body.placa
    const tipo=req.body.tipo
    //console.log("store", placa, tipo)
    pool.query(`INSERT INTO placas (nombre, tipo) VALUES (?,?);`,[placa,tipo], function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

router.delete('/delete', async (req, res) => {
    const id=req.body.id
    //console.log("delete", id)
    pool.query(`DELETE FROM placas WHERE id=?`,[id], function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;