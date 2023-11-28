import React from 'react';
import { useState } from 'react';
import styles from './GoalInput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const GoalInput = ({ onGoalSubmit }) => {
  const options = [
    { value: '기술면접' },
    { value: '인성면접' },
    { value: '포트폴리오' },
    { value: '기타' },
  ];

  const [enteredGoal, setEnteredGoal] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleGoalChange = (e) => {
    setEnteredGoal(e.target.value);
    setIsValid(true);
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (enteredGoal.trim() === '') {
      setIsValid(false);
      setEnteredGoal('');
      return;
    }
    setIsValid(true);
    console.log(selectedOption, enteredGoal);
    onGoalSubmit(selectedOption, enteredGoal);
    setEnteredGoal('');
    setSelectedOption(options[0].value);
  };

  const SelectType = () => {
    const handleChange = (e) => {
      setSelectedOption(e.target.value);
      console.log(e.target.value);
    };

    return (
      <Box sx={{ minWidth: 70, mr: '10px', height: '45px' }}>
        <FormControl
          variant="filled"
          sx={{
            minWidth: 70,
            bgcolor: '#fff',
            borderRadius: '6px',
            marginBottom: '100px',
            color: 'white',
            height: '45px',
          }}
          fullWidth
        >
          <InputLabel id="demo-simple-select-label">면접 분류</InputLabel>
          <Select
            sx={{ height: '50px' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOption}
            label="Age"
            onChange={handleChange}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleGoalSubmit}>
        <SelectType />
        <div>
          <input
            className={
              !isValid ? `${styles.input} ${styles.invalid}` : `${styles.input}`
            }
            type="text"
            value={enteredGoal}
            onChange={handleGoalChange}
            placeholder="상세 종류를 추가해 주세요."
          />
          <button className={styles.button} type="submit">
            <FontAwesomeIcon icon={faPlus} color="#1a202c" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalInput;
