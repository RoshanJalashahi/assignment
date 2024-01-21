const router = require('express').Router();

// import todo models
const todoItemModel = require('../models/todoitem');

// lets create our first route -- we will add todo item to our database 
router.post('/api/item', async (req,res)=>{
    try{
        const newItem = new todoItemModel({
            item: req.body.item

        })

        //save this item into database
        const saveitem = await newItem.save()
        res.status(200).json('Item Added successfully')


    }catch(err){
        res.json(err)
    }
})


// lets crate second -- get data from database 
router.get('/api/items', async (req, res) => {
    try{
        const allTodoItems = await todoItemModel.find({});
        res.status(200).json(allTodoItems)


    }catch(err){
        res.json(err)
    }
})

// let's update item
router.put('/api/item/:id', async(req,res)=> {
    try{

        // find the item by its id and update  it

        const updateItem = await todoItemModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json('Item updated')

    }catch(err){
        res.json(err)
    }
})

//Let's Delete item from database
router.delete('/api/item/:id', async(req, res) =>{
    try{
        const deleteItem = await todoItemModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item deleted successfully')

    }catch (err){
        res.json(err)
    }

})

// export router
module.exports = router;