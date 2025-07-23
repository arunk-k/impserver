const Roadmap = require('../models/roadmapModel');

// Add a new roadmap step (Admin)
exports.addStep = async (req, res) => {
  try {
    const { careerId, stepTitle, stepDescription, youtubeLink, order } = req.body;

    const newStep = new Roadmap({
      careerId,
      stepTitle,
      stepDescription,
      youtubeLink,
      order: order || 0,
    });

    await newStep.save();

    res.status(201).json({ message: 'Roadmap step added', step: newStep });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add roadmap step', details: err.message });
  }
};

// Update a roadmap step (Admin)
exports.updateStep = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Roadmap.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'Step not found' });
    }

    res.json({ message: 'Roadmap step updated', step: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update step', details: err.message });
  }
};

// Delete a roadmap step (Admin)
exports.deleteStep = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Roadmap.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Step not found' });
    }

    res.json({ message: 'Step deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete step', details: err.message });
  }
};

// Get all roadmap steps for a career
exports.getStepsByCareerId = async (req, res) => {
  try {
    const { careerId } = req.params;

    const steps = await Roadmap.find({ careerId }).sort({ order: 1 }); // ordered by step

    res.json(steps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch steps', details: err.message });
  }
};
