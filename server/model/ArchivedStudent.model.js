const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Define the schema for archived students
const archivedStudentSchema = new mongoose.Schema({
    student: { type: ObjectId, ref: 'CreateStudent' },
    removedFromEmployee: { type: ObjectId, ref: 'CreateEmployee' },
    removedAt: { type: Date, default: Date.now },
    // Add other fields as necessary
});

const ArchivedStudent = mongoose.model('ArchivedStudent', archivedStudentSchema);
module.exports = ArchivedStudent;
