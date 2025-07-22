const Career = require('../models/careerModel');

// @desc Add a new career (Admin only)
exports.addCareer = async (req, res) => {
  try {
    const { title, description, icon, path, category, interests } = req.body;

    // Basic validation
    if (!title || !description || !path || !category) {
      return res.status(400).json({ message: 'Title, Description, Path, and Category are required' });
    }

    // Check for duplicate title or path
    const existingCareer = await Career.findOne({
      $or: [{ title }, { path }]
    });

    if (existingCareer) {
      return res.status(409).json({ message: 'A career with the same title or path already exists' });
    }

    const newCareer = new Career({ title, description, icon, path, category, interests });

    await newCareer.save();
    res.status(201).json(newCareer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while adding career' });
  }
};



// @desc Get all careers (for Explore page)
exports.getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find();
    res.status(200).json(careers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching careers' });
  }
};

// @desc Get suggested careers based on selected interests
exports.getSuggestedCareers = async (req, res) => {
  try {
    const { interests } = req.body;

    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({ message: 'Interests should be an array' });
    }

    const suggested = await Career.find({
      interests: { $in: interests }
    });

    res.status(200).json(suggested);
  } catch (err) {
    res.status(500).json({ message: 'Error suggesting careers' });
  }
};

// @desc Get a single career by ID or path
exports.getCareerById = async (req, res) => {
  try {
    const { id } = req.params;

    const career = await Career.findById(id);
    if (!career) return res.status(404).json({ message: 'Career not found' });

    res.status(200).json(career);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching career' });
  }
};


// @desc Update a career
exports.updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, path, category, interests } = req.body;

    // Basic validation
    if (!title || !description || !path || !category) {
      return res.status(400).json({ message: 'Title, Description, Path, and Category are required' });
    }

    // Check for duplicate title or path (excluding current career)
    const existingCareer = await Career.findOne({
      $or: [{ title }, { path }],
      _id: { $ne: id }  // exclude the current document from duplicate check
    });

    if (existingCareer) {
      return res.status(409).json({ message: 'A career with the same title or path already exists' });
    }

    // Perform update
    const updated = await Career.findByIdAndUpdate(id, { title, description, icon, path, category, interests }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Career not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating career' });
  }
};


// @desc Delete a career
exports.deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Career.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: 'Career not found' });

    res.status(200).json({ message: 'Career deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting career' });
  }
};
