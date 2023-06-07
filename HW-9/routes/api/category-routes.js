const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categoryData = Category.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const categoryData = Category.findByPk(req.params.id, { include: [{ model: Product }], });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const newCategory = Category.create(req.body);
    res.status(200).json(newCategory);

  } catch (err) {
    res.status(400).json(err);
  }});

router.put('/:id', (req, res) => {
  try {
    const updateCategory = Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updateCategory[0]) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json('Category Updated');

  } catch (err) {
    res.status(500).json(err)
  }});

router.delete('/:id', (req, res) => {
  try {
    const deleteCategory = Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json('Category Deleted');

  } catch (err) {
    res.status(500).json(err);
  }});

module.exports = router;
