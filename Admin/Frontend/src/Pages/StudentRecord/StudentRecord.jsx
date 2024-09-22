import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

function StudentRecord() {
  const {
    handleAddStudent,
    studentId,
    setStudentId,
    studentRecords,
    selectedStudents,
    setSelectedStudents,
    handleDeleteStudent,
  } = useContext(AppContext);

  function handleSelectStudent(id) {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((studId) => studId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  }
  return (
    <div>
      <h2>Student Records</h2>
      {selectedStudents.length > 0 && (
        <button onClick={() => handleDeleteStudent()}>Delete</button>
      )}
      <div>
        <form onSubmit={(e) => handleAddStudent(e, studentId)}>
          <div>
            <label htmlFor="studentId">Student Id: </label>
            <input
              type="text"
              name="studentId"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
      <div>
        {studentRecords.map((student, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                name="deleteCheckbox"
                id="deleteCheckbox"
                checked={selectedStudents.includes(student.studentId)}
                onChange={() => handleSelectStudent(student.studentId)}
              />
              <h3>Student Id: {student.studentId}</h3>
              <p>Student Name: {student.name}</p>
              <p>Student Department: {student.department}</p>
              <p>Student Block Name: {student.blockName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentRecord;
