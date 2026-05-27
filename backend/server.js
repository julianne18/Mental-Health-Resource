// ===== IMPORTS =====
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// ===== INITIALIZE APP =====
const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== SAMPLE DATA (We'll replace this with MongoDB later) =====
const resources = [
    {
        id: 1,
        name: "Crisis Text Line",
        type: "crisis support",
        description: "Free, confidential text-based crisis support. Text HOME to 741741 anytime.",
        website: "https://www.crisistextline.org"
    },
    {
        id: 2,
        name: "Headspace",
        type: "meditation & mindfulness",
        description: "Guided meditation and mindfulness exercises. Great for anxiety and sleep.",
        website: "https://www.headspace.com"
    },
    {
        id: 3,
        name: "BetterHelp",
        type: "online therapy",
        description: "Connect with licensed therapists online. Affordable and flexible scheduling.",
        website: "https://www.betterhelp.com"
    },
    {
        id: 4,
        name: "National Suicide Prevention Lifeline",
        type: "crisis support",
        description: "Call 988 to talk to someone who cares. Available 24/7, free and confidential.",
        website: "https://988lifeline.org"
    },
    {
        id: 5,
        name: "Calm",
        type: "meditation & mindfulness",
        description: "Sleep stories, meditations, and relaxation music. Perfect before bed.",
        website: "https://www.calm.com"
    },
    {
        id: 6,
        name: "Philippine Mental Health Association (PMHA) - Cebu Chapter",
        type: "therapy, prevention, and promotion of mental health",
        description: "A non-profit non-sectarian organization, located in Cebu City, dedicated to the promotion of mental health and prevention of mental disorders.",
        website: "https://www.facebook.com/pmhacebu/"
    }
];

// ===== ROUTES =====

// GET all resources
app.get('/api/resources', (req, res) => {
    try {
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resources', error: error.message });
    }
});

// GET a single resource by ID
app.get('/api/resources/:id', (req, res) => {
    try {
        const resource = resources.find(r => r.id === parseInt(req.params.id));
        
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        
        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resource', error: error.message });
    }
});

// POST a new resource
app.post('/api/resources', (req, res) => {
    try {
        const { name, type, description, website } = req.body;
        
        // Validate input
        if (!name || !type || !description || !website) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Create new resource
        const newResource = {
            id: resources.length > 0 ? Math.max(...resources.map(r => r.id)) + 1 : 1,
            name,
            type,
            description,
            website
        };
        
        resources.push(newResource);
        res.status(201).json(newResource);
    } catch (error) {
        res.status(500).json({ message: 'Error creating resource', error: error.message });
    }
});

// PUT (update) a resource
app.put('/api/resources/:id', (req, res) => {
    try {
        const resource = resources.find(r => r.id === parseInt(req.params.id));
        
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        
        // Update fields
        if (req.body.name) resource.name = req.body.name;
        if (req.body.type) resource.type = req.body.type;
        if (req.body.description) resource.description = req.body.description;
        if (req.body.website) resource.website = req.body.website;
        
        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error updating resource', error: error.message });
    }
});

// DELETE a resource
app.delete('/api/resources/:id', (req, res) => {
    try {
        const index = resources.findIndex(r => r.id === parseInt(req.params.id));
        
        if (index === -1) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        
        const deletedResource = resources.splice(index, 1);
        res.json({ message: 'Resource deleted', resource: deletedResource[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting resource', error: error.message });
    }
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}/api/resources`);
});
