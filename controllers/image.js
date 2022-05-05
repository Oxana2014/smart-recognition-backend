const { json } = require('body-parser');
const Clarifai = require('clarifai')

const clarifaiKey = "5055e0f599244272bb3f2c630592fabf";
const clarifaiApp = new Clarifai.App({
  apiKey: clarifaiKey
})

const handleApiCall = async (req, res) => {
  const {input} = req.body;
  clarifaiApp.models.predict( Clarifai.FACE_DETECT_MODEL, input )
  .then(data => {
      res.json(data)
  })
  .catch(err => res.status(400).json("unable to work with api"))
//  console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users')
    .where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
.then(entries => {
    res.json(entries[0].entries)
})
.catch(e =>
    res.status(400).json("unable to get entries")
)}

module.exports = {handleImage, handleApiCall}