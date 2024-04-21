import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datetime/css/react-datetime.css';
import 'moment/locale/ro';

import { diarySelectors, updateDate } from 'redux/app/diaryPerDay';
import { diaryPerDayOperation } from 'redux/app/diaryPerDay';

import { CalendarBtn } from 'components/Buttons';

import { DatePickerWrapper, DatePicker } from './DiaryDateCalendar.styled';

function dateToString(date) {
  let year = String(date.getFullYear());
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  return day + '.' + month + '.' + year;
}

export const DiaryDateCalendar = () => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const currentDate = useSelector(diarySelectors.getCurrentDate);
  const [date, setDate] = useState(currentDate);

  let inputProps = {
    value: date,
    disabled: true,
  };

  function valid(current) {
    let today = new Date();
    return current.isBefore(today);
  }

  function changeDate(evt) {
    const dateString = dateToString(evt._d);
    setIsShow(false);
    dispatch(diaryPerDayOperation.actionGetProducts({ date: dateString }));
    dispatch(updateDate(dateString));
    setDate(dateString);
  }

  function openCalendar() {
    setIsShow(!isShow);
  }
  function leave() {
    setIsShow(false);
  }

  return (
    <DatePickerWrapper onMouseLeave={leave} onClick={openCalendar}>
      <DatePicker
        inputProps={inputProps} // Settings
        timeFormat={false} // To disable the display of time
        dateFormat="DD.MM.YYYY" // The date format
        isValidDate={valid} // block the future
        onChange={changeDate} // track date changes
        open={isShow} // Display calendar !!!
        locale="ro" // Language
        closeOnSelect={true}
        closeOnClickOutside={true}
      />

      <CalendarBtn onHandleClick={openCalendar} isShown={isShow} />
    </DatePickerWrapper>
  );
};
