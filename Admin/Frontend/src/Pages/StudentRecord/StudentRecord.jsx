import React, { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";

function StudentRecord() {
  const {
    handleAddStudent,
    studentRecords,
    selectedStudents,
    setSelectedStudents,
    handleDeleteStudent,
    fetchStudentRecords,
  } = useContext(AppContext);

  function handleSelectStudent(id) {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((studId) => studId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  }

  useEffect(() => {
    fetchStudentRecords();
  }, []);

  return (
    <div>
      <h2>Student Records</h2>
      {selectedStudents.length > 0 && (
        <button onClick={() => handleDeleteStudent()}>Delete</button>
      )}
      <div>
        {studentRecords.map((student) => {
          return (
            <div key={student.studentId}>
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
