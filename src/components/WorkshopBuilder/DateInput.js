import { StyledInput, StyledSelect, DeleteButton } from "./index.styled";

const monthsOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let daysOptions = [];
for (let i = 1; i <= 31; i++) {
  daysOptions.push(i);
}

const DateInput = ({ updateFunc, solutionId, value, handleDeleteSolution }) => {
  const handleChange = (e) => {
    updateFunc(solutionId, e.target.name, e.target.value);
  };

  return (
    <div style={{ marginBottom: "5px" }}>
      <div style={{ position: "relative" }}>
        <span>Date/Place:</span>
        <DeleteButton
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            right: "5px",
          }}
          onClick={handleDeleteSolution(solutionId)}
        >
          X
        </DeleteButton>
      </div>
      <StyledInput
        type="text"
        placeholder="Place"
        name="place"
        value={value.place}
        onChange={handleChange}
      />
      <StyledSelect value={value.day} onChange={handleChange} name="day">
        <option value="">Day</option>
        {daysOptions.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </StyledSelect>

      <StyledSelect value={value.month} onChange={handleChange} name="month">
        <option value="">Month</option>
        {monthsOptions.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </StyledSelect>
      <StyledInput
        type="text"
        placeholder="Year"
        name="year"
        value={value.year}
        onChange={handleChange}
      />
      <StyledInput
        type="text"
        placeholder="Hour"
        name="hour"
        value={value.hour}
        onChange={handleChange}
      />
      <StyledInput
        type="text"
        placeholder="Minute"
        name="minute"
        value={value.minute}
        onChange={handleChange}
      />
      <StyledInput
        type="text"
        placeholder="Second"
        name="second"
        value={value.second}
        onChange={handleChange}
      />
    </div>
  );
};

export default DateInput;
