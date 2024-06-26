const dogs = require('../models/dogs');
var dog = require('../models/dogs');
// List of all dogs
// exports.dog_list = function(req, res) {
//  res.send('NOT IMPLEMENTED: dog list');
// };
exports.dogs_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await dogs.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
    
// for a specific dog.
// exports.dog_detail = async function(req, res) {
//     try {
//         const dog = await dog.findById(req.params.id);
//         res.render('dog', { title: 'dog Details', dog: dog });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
// Handle dog create on POST.
exports.dog_create_post = async function(req, res) {
    console.log(req.body)
    let document = new dog();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"Dog_Breed":"goat", "cost":12, "size":"large"}
    document.Dog_Breed = req.body.Dog_Breed;
    document.Dog_color = req.body.Dog_color;
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
// exports.dog_update_put = async function(req, res) {
//     try {
//         await dog.findByIdAndUpdate(req.params.id, req.body);
//         res.json({ message: 'dog item updated successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

exports.dogs_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await dogs.findById( req.params.id)
    // Do updates of properties
    if(req.body.Dog_Breed)
    toUpdate.Dog_Breed = req.body.Dog_Breed;
    if(req.body.Dog_color) toUpdate.Dog_color = req.body.Dog_color;
    if(req.body.Dog_Name) toUpdate.Dog_Name = req.body.Dog_Name;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
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
   
    // Handle dog delete on DELETE.
exports.dog_delete = async function(req, res) {
console.log("delete " + req.params.id)
try {
result = await dog.findByIdAndDelete( req.params.id)
console.log("Removed " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": Error deleting ${err}}`);
}
};

// Handle a show one view with id specified by query
exports.dog_view_one_Page = async function(req, res) {
console.log("single view for id " + req.query.id)
try{
result = await dog.findById( req.query.id)
res.render('dogsdetail',
{ title: 'dog Detail', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle building the view for creating a dog.
// No body, no in path parameter, no query.
// Does not need to be async
exports.dog_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('dogscreate', { title: 'dog Create'});
    }   
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

    
// Handle building the view for updating a dog.
// query provides the id
exports.dog_update_Page = async function(req, res) {
console.log("update view for item "+req.query.id)
try{
let result = await dog.findById(req.query.id)
res.render('dogsupdate', { title: 'dog Update', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle a delete one view with id from query
exports.dog_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await dog.findById(req.query.id)
    res.render('dogsdelete', { title: 'dog Delete', toShow:
    result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
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