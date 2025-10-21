const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { query } = require('./db');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Friendly root
app.get('/', (_req, res) => {
  res.send(`
    <h1>HHR Team SQL Module</h1>
    <p>Server is running.</p>
    <ul>
      <li><a href="/api/team">GET /api/team</a> – list team</li>
    </ul>
  `);
});

// READ all
app.get('/api/team', async (_req, res, next) => {
  try {
    const { rows } = await query(
      'SELECT * FROM team ORDER BY sort_order ASC, id ASC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// CREATE
app.post('/api/team', async (req, res, next) => {
  try {
    const {
      name,
      title,
      photo_url = null,
      sort_order = 0,
      hired_at = null
    } = req.body;

    const { rows } = await query(
      `INSERT INTO team (name, title, photo_url, sort_order, hired_at)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [name, title, photo_url, sort_order, hired_at]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// UPDATE (partial)
app.put('/api/team/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, title, photo_url, sort_order, hired_at } = req.body;

    const { rows } = await query(
      `UPDATE team
       SET
         name       = COALESCE($1, name),
         title      = COALESCE($2, title),
         photo_url  = COALESCE($3, photo_url),
         sort_order = COALESCE($4, sort_order),
         hired_at   = COALESCE($5, hired_at),
         updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [name, title, photo_url, sort_order, hired_at, id]
    );

    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE
app.delete('/api/team/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM team WHERE id=$1', [id]);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// STRETCH!! Hired_at date range
app.get('/api/team/hired/between', async (req, res, next) => {
  try {
    const { start, end } = req.query; // YYYY-MM-DD
    const { rows } = await query(
      `SELECT * FROM team
       WHERE hired_at IS NOT NULL AND hired_at BETWEEN $1 AND $2
       ORDER BY hired_at ASC`,
      [start, end]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// Team view
app.get('/teamview', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM team ORDER BY sort_order ASC, id ASC');
    res.render('team-view', { title: 'Our Team', team: rows });
  } catch (err) {
    next(err);
  }
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: err.message });
});

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`✅ Server running on http://localhost:${port}`)
);