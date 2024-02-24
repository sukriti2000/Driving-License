const { ValidateDriver,saveDriver,getDriverInfoByUsername,getResultByUsername} = require('../../models/driver.model');

async function getG2Page(req,res){
    try {
        const data = await getDriverInfoByUsername(req.cookies.username);
       
        res.render('G2_page', { data }); // Pass the 'data' object as a property of an object
      } catch (err) {
        // Handle the error appropriately, e.g., send an error page
        res.status(500).send('Error retrieving data');
      }
}
async function httpSaveDriver(req,res){
    const driver = req.body;
    console.log(driver);
    console.log(ValidateDriver(driver));
    if(!ValidateDriver(driver)){
        return res.status(400).json({
            err : "Invalid Driver Entry"
        })
    }
    else{
        await saveDriver(req.cookies.username,driver);
        return res.status(201).send();
    }
}
async function httpGetResult(req,res){
    try {
      const response = await getResultByUsername(req.cookies.username,'G2');
      console.log(response);
      if (response) {
         return res.status(200).json(response);
      } else {
         return res.status(404).json({ message: 'No result found' });
      }
   } catch (error) {
      // Handle any potential errors that might occur during processing
      return res.status(500).json({ error: 'An error occurred' });
   }
  }
module.exports={
    getG2Page,
    httpSaveDriver,
    httpGetResult
};