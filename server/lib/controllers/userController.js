"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = async (req, res) => {
    console.log('Creating User...');
    const { email, password, firstName, lastName } = req.body;
    console.log(req, email, password, firstName, lastName);
    const query = [email, password, firstName, lastName];
    // await db.query(
    //   'INSERT INTO users (email, password, first_name, last_name) VALUES($1, $2, $3, $4)',
    //   query,
    //   (err, result) => {
    //     if (err) console.error('ERROR', err);
    //     console.log('result', result.rows);
    //   }
    // );
    res.status(201).json(true);
};
