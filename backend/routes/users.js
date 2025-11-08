const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Config upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST new user
router.post('/', upload.single('photo'), async (req, res) => {
  const { name, email, phone, bio, countryCode } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, phone, bio, countryCode, photo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [name, email, phone, bio, countryCode, photo]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT /users/:id
router.put('/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, bio, countryCode } = req.body;
  const photo = req.file ? req.file.filename : undefined;

  try {
    const fields = [name, email, phone, bio, countryCode];
    let query = `
      UPDATE users
      SET name=$1, email=$2, phone=$3, bio=$4, countrycode=$5
    `;
    if (photo) query += `, photo=$6 RETURNING *`;
    else query += ` RETURNING *`;

    const values = photo ? [...fields, photo] : fields;

    const result = await pool.query(query, values);
    if (result.rowCount === 0) return res.status(404).json('Utilisateur non trouvé');

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json('Erreur serveur lors de la modification');
  }
});

module.exports = router;
