const { getFilteredAppointments,uploadResult } = require('../../models/driver.model');

function getExaminer(req, res) {
  // Your code for handling the /examiner route
  res.render('examiner'); // Example response, replace with your logic
}

async function httpsFilterSelection(req, res) {
  const selectedValue = req.body;
  try {
    const filteredData = await getFilteredAppointments(selectedValue);
    if (!filteredData) {
      return res.status(404).json({
        err: 'no data found'
      });
    }
   
    return res.status(200).json(filteredData);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
}

async function httpUploadResult(req,res){
    console.log('in upload result');
    const uploadObject = req.body;
    try {
        const response = await uploadResult(uploadObject);
        if (!response) {
          return res.status(404).json({
            err: 'no data found'
          });
        }
       
        return res.status(200).json({
            res : 'data uploaded'
        });
      } catch (error) {
        return res.status(500).json({
          error: 'Internal server error'
        });
      }
    }

module.exports = {
  getExaminer,
  httpsFilterSelection,
  httpUploadResult
};
