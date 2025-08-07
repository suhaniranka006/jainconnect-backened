// import express from 'express';
// import Tithi from '../models/Tithi.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   const data = await Tithi.find();
//   res.json(data);
// });

// export default router;


import express from 'express';
import Tithi from '../models/Tithi.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await Tithi.find({});
    console.log(" /api/tithis data:", data); // Debug log
    res.json(data);
  } catch (error) {
    console.error(" Error in /api/tithis:", error); // Error log
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
