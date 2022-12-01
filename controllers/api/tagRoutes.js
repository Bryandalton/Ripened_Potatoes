const router = require('express').Router();
const { Tag } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res) =>{
    try {
        const newTag = await Tag.create({
            ...req.body
        });
        res.status(200).json(newTag)
    }
    catch(err){
    res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const tagData = await Tag.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,  
            }
        })
        if(!tagData) {
            res.status(404).json({message: 'No tag found'});
            return;
        } res.status(200).json(tagData);
    }
    catch(err){
      res.status(500).json(err);
    }
})

module.exports = router;
