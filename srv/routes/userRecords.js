const router = require('express').Router();
const signUpSchema = require('../mongodb/schema/signup');
const recordsSchema = require("../mongodb/schema/records");

router.post('/fetch', (req, res) => {
    try {
        const { _id } = req.body;
        signUpSchema.findById({ _id })
        .then(user => {
            if (!user) return res.json({ message: {type: "error", text: "Invalid ID"}});
            recordsSchema.find({userId: _id})
            .then(records => {
                let data = {
                    ...user._doc,
                    records,
                }
                res.json({ data: data });
            })
        })
    } catch (error) {
        console.error(error);
        return res.json({ message: {type: "error", text: "Something went wrong"}});
    }
});

router.post('/add', (req, res) => {
    try {
        let addRecord = new recordsSchema(req.body);
        addRecord.save()
        .then(record => {
            return res.json({
                data: {...record._doc},
                message: { type: "success", text: "Record Add Successfully" }
            });
        })
    } catch (error) {
        console.error(error);
        return res.json({ message: {type: "error", text: "Something went wrong"}});
    }
});

router.post('/update', (req, res) => {
    try {
        const { _id } = req.body;
        recordsSchema.findOneAndUpdate({_id},{$set: {...req.body}},{new: true})
        .then(record => res.json({
            data: {...record._doc},
            message: { type: "success", text: "Record Update Successfully" }
        }));
    } catch (error) {
        console.error(error);
        return res.json({ message: {type: "error", text: "Something went wrong"}});
    }
});

router.post('/delete', (req, res) => {
    try {
        const { _id } = req.body;
        recordsSchema.findByIdAndDelete({_id})
        .then(record => res.json({
            data: {...record._doc},
            message: { type: "success", text: "Record Deleted Successfully" }
        }));
    } catch (error) {
        console.error(error);
        return res.json({ message: {type: "error", text: "Something went wrong"}});
    }
});

router.post('/filter', (req, res) => {
    try {
        const {from, to, userId} = req.body;
        recordsSchema.find({
            userId,
            date: {
                $gte: from,
                $lt: to,
            }
        }).then(records => {
            if (records && records.length === 0){
                return res.json({message: {type: "error", text: "No Record Found Please try with another Date"}});
            }
            return res.json({
                data: records,
                message: { type: "success", text: `${records.length} Records Found` }
            })
        })
    } catch (error) {
        console.error(error);
        return res.json({ message: {type: "error", text: "Something went wrong"}});
    }
})

module.exports = router;
