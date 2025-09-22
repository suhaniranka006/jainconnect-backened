// // // routes/UserRoutes.js
// // import express from 'express';
// // import User from '../models/User.js';
// // import parser from '../middlewares/cloudinary.js';


// // const router = express.Router();

// // // ✅ Get all users
// // router.get('/', async (req, res) => {
// //   try {
// //     const users = await User.find(); // fetch all users
// //     res.json(users);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // ✅ Get user by ID
// // router.get('/:id', async (req, res) => {
// //   try {
// //     const user = await User.findById(req.params.id);
// //     if (!user) return res.status(404).json({ message: 'User not found' });
// //     res.json(user);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // ✅ Create new user
// // router.post('/', async (req, res) => {
// //   try {
// //     const newUser = new User(req.body);
// //     const savedUser = await newUser.save();
// //     res.status(201).json(savedUser);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // ✅ Update user (Edit Profile)
// // router.put('/:id', async (req, res) => {
// //   try {
// //     const updates = req.body;
// //     const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
// //     if (!user) return res.status(404).json({ message: 'User not found' });
// //     res.json(user);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // ✅ Delete user
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     const user = await User.findByIdAndDelete(req.params.id);
// //     if (!user) return res.status(404).json({ message: 'User not found' });
// //     res.json({ message: 'User deleted successfully', user });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });



// // // Create user with image
// // router.post('/upload', parser.single('profileImage'), async (req, res) => {
// //   try {
// //     const { name, email, phone, location, dob, gender } = req.body;
// //     const profileImage = req.file ? req.file.path : undefined;

// //     const newUser = new User({
// //       name,
// //       email,
// //       phone,
// //       location,
// //       dob: dob ? new Date(dob) : undefined,
// //       gender,
// //       profileImage
// //     });

// //     const savedUser = await newUser.save();
// //     res.status(201).json(savedUser);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // Update user with image
// // router.put('/upload/:id', parser.single('profileImage'), async (req, res) => {
// //   try {
// //     const updates = { ...req.body };
// //     if (updates.dob) updates.dob = new Date(updates.dob);
// //     if (req.file) updates.profileImage = req.file.path;

// //     const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     res.json(user);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: err.message });
// //   }
// // });


// // export default router;


// import express from 'express';
// import User from '../models/User.js';
// import parser from '../middlewares/cloudinary.js';

// const router = express.Router();

// // GET all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET user by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // CREATE new user with optional profile image
// router.post('/', parser.single('profileImage'), async (req, res) => {
//   try {
//     console.log('req.body:', req.body);
//     console.log('req.file:', req.file);

//     const { name, email, phone, location, dob, gender } = req.body;
//     const profileImage = req.file ? req.file.path : undefined;

//     const newUser = new User({
//       name,
//       email,
//       phone,
//       location,
//       dob: dob ? new Date(dob) : undefined,
//       gender,
//       profileImage,
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // UPDATE user with optional profile image
// router.put('/:id', parser.single('profileImage'), async (req, res) => {
//   try {
//     console.log('req.body:', req.body);
//     console.log('req.file:', req.file);

//     const updates = { ...req.body };
//     if (updates.dob) updates.dob = new Date(updates.dob);
//     if (req.file) updates.profileImage = req.file.path;

//     const user = await User.findByIdAndUpdate(req.params.id, updates, {
//       new: true,
//       runValidators: true,
//     });

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // DELETE user
// router.delete('/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json({ message: 'User deleted successfully', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;



import express from 'express';
import User from '../models/User.js';
import parser from '../middlewares/cloudinary.js';

const router = express.Router();




// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


// GET user by email
router.get('/profile/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});




// CREATE new user with optional profile image
router.post('/', parser.single('profileImage'), async (req, res) => {
  try {
    console.log('Create User req.body:', req.body);
    console.log('Create User req.file:', req.file);

    const { name, email, phone, location, dob, gender } = req.body;
    const profileImage = req.file ? req.file.path : undefined; // URL from Cloudinary

    const newUser = new User({
      name,
      email,
      phone,
      location,
      dob: dob ? new Date(dob) : undefined,
      gender,
      profileImage,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('ERROR CREATING USER:', err);
    res.status(500).json({ message: err.message });
  }
});




// UPDATE user profile by email
router.post('/profile', parser.single('profileImage'), async (req, res) => {
  try {
    console.log("===== Update Profile API Hit =====");
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    const { email } = req.body;

    if (!email) {
      console.log("❌ No email provided in request body");
      return res.status(400).json({ message: 'Email is required to update profile.' });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();
    console.log("Normalized Email:", normalizedEmail);

    // Check if user exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    console.log("Existing User in DB:", existingUser);

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with email ${normalizedEmail} not found in DB` });
    }

    // Prepare updates
    const updates = { ...req.body };
    delete updates.email; // Prevent email change

    // Convert DOB string to Date
    if (updates.dob) {
      updates.dob = new Date(updates.dob);
    }

    // Handle profile image upload
    if (req.file) {
      // Use the correct property that has the Cloudinary URL
      updates.profileImage = req.file.path || req.file.url || req.file.secure_url;
      console.log("✅ Profile image URL to save:", updates.profileImage);
    }

    // Update user in DB
    const updatedUser = await User.findOneAndUpdate(
      { email: normalizedEmail },
      { $set: updates },
      { new: true, runValidators: true }
    );

    console.log("✅ User updated successfully:", updatedUser);
    res.json(updatedUser);

  } catch (err) {
    console.error("🔥 ERROR UPDATING PROFILE:", err);
    res.status(500).json({ message: err.message });
  }
});




// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;