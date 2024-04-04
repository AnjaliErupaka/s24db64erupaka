var dog = require('../models/dogs');
// List of all dogs
exports.dog_list = function(req, res) {
 res.send('NOT IMPLEMENTED: dog list');
};
// for a specific dog.
exports.dog_detail = async function(req, res) {
    try {
        const dog = await dog.findById(req.params.id);
        res.render('dog', { title: 'dog Details', dog: dog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Handle dog create on POST.
exports.dog_create_post = async function(req, res) {
    console.log(req.body)
    let document = new dog();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.Dog_Breed = req.body.Dog_Breed;
    document.Dog_Color = req.body.Dog_Color;
    document.Dog_Name = req.body.Dog_Name;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
   
// Handle dog delete from on DELETE.
exports.dog_delete = async function(req, res) {
    try {
        await dog.findByIdAndDelete(req.params.id);
        res.json({ message: 'dog item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Handle dog update form on PUT.
exports.dog_update_put = async function(req, res) {
    try {
        await dog.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'dog item updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
 
// List of all dogs
exports.dog_list = async function(req, res) {
    try{
    thedogs = await dog.find();
    res.send(thedogs);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
   
    //VIEWS
    // Handle a show all view
    exports.dog_view_all_Page = async function(req, res) {
    try{
    thedogs = await dog.find();

    res.render('dogs', { title: 'dog Search Results', results: thedogs });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };