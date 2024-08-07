const User = require('../models/registermodel');
const mongoose =  require('mongoose')




// get user
const getuser = async (req, res) => {
    const { id } = req.params;
    const user_id=req.user._id
    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//update user
const updateuser = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such user'})
    }
    const user = await User.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!user)
    {
        return res.status(404).json({error:'No such user'})
    }
    res.status(200).json(user)
        
} 



module.exports = {getuser,updateuser}