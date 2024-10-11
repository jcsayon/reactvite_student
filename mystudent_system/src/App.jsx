import React, { useState, useMemo } from 'react';
import { format, differenceInYears, parseISO } from 'date-fns';
import './App.css';  // Import styles

const initialData = [
  { lastName: 'Sayon', firstName: 'Joshua', course: 'IT', birthdate: '1900-03-09'},
  { lastName: 'Bataga', firstName: 'Vivencio', course: 'CS', birthdate: '1878-04-02'},
  { lastName: 'Litob', firstName: 'Angel Gabriel', course: 'IS', birthdate: '2012-04-22'  },
  { lastName: 'Navarro', firstName: 'Justin John', course: 'DS', birthdate: '2000-10-05' },
];

function App() {
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');

  const calculateAge = (birthdate) => {
    return differenceInYears(new Date(), parseISO(birthdate));
  };

  const filteredData = useMemo(() => {
    return initialData.filter((student) => {
      const isLastNameMatch = student.lastName.toLowerCase().includes(lastNameFilter.toLowerCase());
      const isFirstNameMatch = student.firstName.toLowerCase().includes(firstNameFilter.toLowerCase());
      const isCourseMatch = student.course.toLowerCase().includes(courseFilter.toLowerCase());

      const birthDate = parseISO(student.birthdate);
      const isDateInRange =
        (!minDate || birthDate >= parseISO(minDate)) &&
        (!maxDate || birthDate <= parseISO(maxDate));

      const age = calculateAge(student.birthdate);
      const isAgeInRange =
        (!minAge || age >= minAge) &&
        (!maxAge || age <= maxAge);

      return isLastNameMatch && isFirstNameMatch && isCourseMatch && isDateInRange && isAgeInRange;
    });
  }, [lastNameFilter, firstNameFilter, courseFilter, minDate, maxDate, minAge, maxAge]);

  return (
    <div className="container">
      <h1>Student Data Table</h1>

      <div className="filter-section">
        {/* Filter by Last Name */}
        <div>
          <label>Filter by Last Name:</label>
          <input
            type="text"
            placeholder="Last Name..."
            value={lastNameFilter}
            onChange={(e) => setLastNameFilter(e.target.value)}
          />
        </div>

        {/* Filter by First Name */}
        <div>
          <label>Filter by First Name:</label>
          <input
            type="text"
            placeholder="First Name..."
            value={firstNameFilter}
            onChange={(e) => setFirstNameFilter(e.target.value)}
          />
        </div>

        {/* Filter by Course */}
        <div>
          <label>Filter by Course:</label>
          <input
            type="text"
            placeholder="Course..."
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          />
        </div>

        {/* Date range filters */}
        <div>
          <label>Min Date:</label>
          <input
            type="date"
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
          />
        </div>
        <div>
          <label>Max Date:</label>
          <input
            type="date"
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
          />
        </div>

        {/* Age range filters */}
        <div>
          <label>Min Age:</label>
          <input
            type="number"
            placeholder="Min Age"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
          />
        </div>
        <div>
          <label>Max Age:</label>
          <input
            type="number"
            placeholder="Max Age"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((student, index) => (
            <tr key={index}>
              <td>{student.lastName}</td>
              <td>{student.firstName}</td>
              <td>{student.course}</td>
              <td>{format(parseISO(student.birthdate), 'yyyy-MM-dd')}</td>
              <td>{calculateAge(student.birthdate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;