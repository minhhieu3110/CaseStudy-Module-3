const express = require('express');
const router = express.Router();


const categories = [
    { id: 1, name: 'Thể thao', subdirectory: 'the-thao' },
    { id: 2, name: 'Công nghệ', subdirectory: 'cong-nghe' },
    { id: 3, name: 'Du lịch', subdirectory: 'du-lich' },
    { id: 4, name: 'Giáo dục', subdirectory: 'giao-duc' },
    { id: 5, name: 'Nghệ thuật', subdirectory: 'nghe-thuat' }
];

router.get("/", (req, res) => {
    res.json(categories);
});


router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find(c => c.id === id);
    if (category) {
        res.json(category);
    } else {
        res.status(404).send({ message: 'Category not found' });
    }
});


router.post("/", (req, res) => {
    const newCategory = {
        id: Date.now(),
        name: req.body.name,
        subdirectory: req.body.subdirectory
    };
    categories.push(newCategory);
    res.status(201).send(newCategory);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
        categories[index].name = req.body.name;
        categories[index].subdirectory = req.body.subdirectory;
        res.send(categories[index]);
    } else {
        res.status(404).send({ message: 'Category not found' });
    }
});


router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
        categories.splice(index, 1);
        res.send({ message: 'Category deleted', id: id });
    } else {
        res.status(404).send({ message: 'Category not found' });
    }
});

module.exports = router;
