const Booking = require('../models/bookingmodel')
const mongoose =  require('mongoose')



// get all bookings
const getallbooking = async (req, res) => {
  const userId = req.user._id;
  try {
      const bookings = await Booking.find({
          $or: [{ vender_id: userId }, { user_id: userId }]
      }).sort({ createdAt: -1 });

      res.status(200).json(bookings);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



// get a single booking

const getbooking = async (req,res)=>{
    const {id} = req.params

    // check weather the id is correct or ont
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such booking'})
    }
    const booking = await Booking.findById(id)

    if (!booking)
    {
        return res.status(404).json({error:'No such booking'})
    }
    res.status(200).json(booking)
} 


// create a new booking
const createbooking = async (req, res) => {
    const { rentalId,vender_id,fromtime,totime,total,status,imgurl,rentaldate } = req.body;
   console.log(rentalId,vender_id, fromtime,totime,total,status,imgurl,rentaldate)

    let emptyFields = [];

    if (!rentalId) {
        
      emptyFields.push('Rental ID');
    }

    if (!vender_id) {

      emptyFields.push('Vender_id');
    }
    if (!fromtime) {

      emptyFields.push('Enter Start Duration');
    }
    
    if (!totime) {

      emptyFields.push('Enter end Duration');
    }
    if (!total) {

      emptyFields.push('Total');
    }
    if (total<0) {

      emptyFields.push('Total cannot be negative');
    }
    if(!imgurl){
      emptyFields.push('Image required')
  }
  if(!rentaldate){
    emptyFields.push('Rent Date required')
}
    if (emptyFields.length > 0) {

      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }
  
    try {
      const user_id = req.user._id
      const booking = await Booking.create({user_id, rentalId,vender_id, fromtime,totime,total,status,imgurl,rentaldate });
      res.status(201).json(booking);
    } 
    
    catch (error) {
      res.status(400).json({ error: error.message });
    }
    
  };



// delete a single booking
const deletebooking = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such booking'})
    }
    const booking = await Booking.findOneAndDelete({_id: id})

    if (!booking)
    {
        return res.status(404).json({error:'No such booking'})
    }
    res.status(200).json(booking)
        
} 

// update a booking
const updatebooking = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such booking'})
    }
    const booking = await Booking.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!booking)
    {
        return res.status(404).json({error:'No such Booking'})
    }
    res.status(200).json(booking)
        
} 


module.exports ={
    createbooking,
    getallbooking,
    getbooking,
    deletebooking,
    updatebooking

}