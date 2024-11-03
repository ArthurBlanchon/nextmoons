"use client";

import React, { useState, useEffect, useRef } from 'react';

const MonthCalendar = ({ date, selectedDate, onSelect, isCurrentMonth, hasInitialScrolled, locale = 'en-US' }) => {
  const monthRef = useRef(null);
  
  useEffect(() => {
    // Only scroll on initial load, not on subsequent updates
    if (isCurrentMonth && !hasInitialScrolled.current && monthRef.current) {
      monthRef.current.scrollIntoView({ behavior: 'instant' });
      hasInitialScrolled.current = true;
    }
  }, [isCurrentMonth, hasInitialScrolled]);

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const formatMonth = (date) => {
    return date.toLocaleString(locale, { month: 'long', year: 'numeric' });
  };

  const generateCalendarDays = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add weekday headers
    weekdays.forEach(day => {
      days.push(
        <div key={`header-${day}`} className="w-full text-center py-2 text-sm text-gray-500">
          {day}
        </div>
      );
    });

    // Add blank spaces for days before the first of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(
        <div key={`empty-${i}`} className="w-full p-2"></div>
      );
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate?.getDate() === day && 
                        selectedDate?.getMonth() === date.getMonth() &&
                        selectedDate?.getFullYear() === date.getFullYear();
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === date.getMonth() &&
                     new Date().getFullYear() === date.getFullYear();

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => onSelect(new Date(date.getFullYear(), date.getMonth(), day))}
          className={`w-full p-2 text-center rounded-lg text-sm transition-colors
            ${isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : 'hover:bg-gray-100'}
            ${isToday && !isSelected ? 'bg-gray-100' : ''}
            ${!isSelected ? 'text-gray-700' : ''}`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div ref={monthRef} className="w-full p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">
        {formatMonth(date)}
      </h2>
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays()}
      </div>
    </div>
  );
};

const FullWidthMonthPicker = ({ onSelect, initialDate = new Date(), locale = 'en-US' }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const hasInitialScrolled = useRef(false);
  
  // Generate array of 24 months (12 past, current, 11 future)
  const months = Array.from({ length: 24 }, (_, i) => {
    const date = new Date(initialDate);
    // Start from 12 months ago (i - 12)
    date.setMonth(initialDate.getMonth() + (i - 12));
    return date;
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (onSelect) onSelect(date);
  };

  const isCurrentMonth = (date) => {
    const now = new Date();
    return date.getMonth() === now.getMonth() && 
           date.getFullYear() === now.getFullYear();
  };

  return (
    <div className="w-full border rounded-lg shadow-sm">
      <div className="overflow-y-auto">
        {months.map((date, index) => (
          <React.Fragment key={date.toISOString()}>
            <MonthCalendar 
              date={date} 
              selectedDate={selectedDate} 
              onSelect={handleDateSelect}
              isCurrentMonth={isCurrentMonth(date)}
              hasInitialScrolled={hasInitialScrolled}
              locale={locale}
            />
            {index < months.length - 1 && <div className="border-t" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FullWidthMonthPicker;