const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

// Handle fetching all students
const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents();  // Service call to fetch all students
    res.status(200).json(students);  // Return the list of students as a response
});

// Handle adding a new student
const handleAddStudent = asyncHandler(async (req, res) => {
    const { name, age, grade } = req.body;  // Extract student details from the request body

    // Service call to add the new student
    const newStudent = await addNewStudent({ name, age, grade });

    // Respond with the newly created student
    res.status(201).json({
        message: 'Student added successfully',
        student: newStudent,
    });
});

// Handle updating student details
const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;  // Extract student ID from URL params
    const { name, age, grade } = req.body;  // Extract updated student details from request body

    // Service call to update the student
    const updatedStudent = await updateStudent(id, { name, age, grade });

    if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
    }

    // Respond with the updated student details
    res.status(200).json({
        message: 'Student updated successfully',
        student: updatedStudent,
    });
});

// Handle fetching a single student's details by ID
const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;  // Extract student ID from URL params

    // Service call to get student details by ID
    const student = await getStudentDetail(id);

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    // Respond with the student details
    res.status(200).json(student);
});

// Handle updating a student's status (e.g., active, inactive)
const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;  // Extract student ID from URL params
    const { status } = req.body;  // Extract new status from request body

    // Service call to update the student status
    const updatedStatus = await setStudentStatus(id, status);

    if (!updatedStatus) {
        return res.status(404).json({ message: 'Student not found' });
    }

    // Respond with the updated status
    res.status(200).json({
        message: 'Student status updated successfully',
        status: updatedStatus,
    });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};