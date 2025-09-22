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


// UPDATE user profile by email - THIS IS THE CORRECTED ROUTE
router.post('/profile', parser.single('profileImage'), async (req, res) => {
  try {
    // Log the incoming data for debugging
    console.log('Update Profile Request Body:', req.body);
    console.log('Update Profile Request File:', req.file);

    // The user's email is the identifier
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required to update profile.' });
    }

    // Prepare the fields to update
    const updates = { ...req.body };

    // It's good practice to prevent the unique email from being changed in this route
    delete updates.email;

    // Convert DOB string to Date object
    if (updates.dob) {
      updates.dob = new Date(updates.dob);
    }
    // If a new file was uploaded, add its URL to the updates
    if (req.file) {
      updates.profileImage = req.file.path; // URL from Cloudinary
    }

    // Find user by email and update them
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, // Find document by email
      { $set: updates }, // Apply the updates
      { new: true, runValidators: true } // Options: return the updated doc and run schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User with that email not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('ERROR UPDATING PROFILE:', err);
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