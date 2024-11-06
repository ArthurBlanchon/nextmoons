"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MonthCalendar = ({ date, selectedDate, onSelect, isCurrentMonth, hasInitialScrolled, locale = 'en-US' }) => {
  const monthRef = useRef(null);
  const [savedData, setSavedData] = useState({ lastPeriodDate: '', cycleLength: 28 });
  
  useEffect(() => {
    // Load localStorage data after component mounts
    try {
      const data = JSON.parse(localStorage.getItem('cycleData')) || {
        lastPeriodDate: '',
        cycleLength: 28,
      };
      setSavedData(data);
    } catch (e) {
      console.error('Error loading data:', e);
    }
  }, []);

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

    const periodStartDate = savedData?.lastPeriodDate ? new Date(savedData.lastPeriodDate) : null;
    const cycleLength = savedData?.cycleLength || 28;

    const getDayStatus = (dayDate) => {
      if (!periodStartDate) return 'normal';
      
      // Calculate the difference in days
      const diffTime = dayDate.getTime() - periodStartDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) return 'normal';
      
      // Calculate which cycle this date falls in
      const cycleNumber = Math.floor(diffDays / cycleLength);
      const daysIntoCycle = diffDays % cycleLength;
      
      // Period days (first 4 days of cycle)
      if (daysIntoCycle >= 0 && daysIntoCycle <= 3) {
        return 'period';
      }
      
      // Fertile days (5 days before next period)
      if (daysIntoCycle >= cycleLength - 5 && daysIntoCycle < cycleLength) {
        return 'fertile';
      }
      
      return 'normal';
    };

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
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      const isSelected = selectedDate?.getDate() === day && 
                        selectedDate?.getMonth() === date.getMonth() &&
                        selectedDate?.getFullYear() === date.getFullYear();
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === date.getMonth() &&
                     new Date().getFullYear() === date.getFullYear();
      const isPeriod = getDayStatus(currentDate) === 'period';
      const isFertile = getDayStatus(currentDate) === 'fertile';

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => onSelect(new Date(date.getFullYear(), date.getMonth(), day))}
          className={`w-full p-2 text-center rounded-lg text-sm transition-colors
            ${isSelected ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 
              isPeriod ? 'bg-red-500 text-white hover:bg-red-600' : 
              isFertile ? 'bg-orange-500 text-white hover:bg-orange-600' : 'hover:bg-gray-100'}
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const hasInitialScrolled = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [savedData, setSavedData] = useState({ lastPeriodDate: '', cycleLength: 28 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const getSavedData = () => {
    if (typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('cycleData')) || {
          lastPeriodDate: '',
          cycleLength: 28,
        };
      } catch (e) {
        return { lastPeriodDate: '', cycleLength: 28 };
      }
    }
    return { lastPeriodDate: '', cycleLength: 28 };
  };

  const form = useForm({
    defaultValues: {
      lastPeriodDate: '',
      cycleLength: 28,
    },
  });

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('cycleData'));
      if (data) {
        setSavedData(data);
        form.reset({
          lastPeriodDate: data.lastPeriodDate || '',
          cycleLength: parseInt(data.cycleLength) || 28,
        });
      }
    } catch (e) {
      console.error('Error loading data:', e);
    }
  }, []);

  // Generate array of 24 months (12 past, current, 11 future)
  const months = Array.from({ length: 24 }, (_, i) => {
    const date = new Date(initialDate);
    // Start from 12 months ago (i - 12)
    date.setMonth(initialDate.getMonth() + (i - 12));
    return date;
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDrawerOpen(true);
    form.setValue('lastPeriodDate', date.toLocaleDateString(locale));
    if (onSelect) onSelect(date);
  };

  const isCurrentMonth = (date) => {
    const now = new Date();
    return date.getMonth() === now.getMonth() && 
           date.getFullYear() === now.getFullYear();
  };

  const onSubmit = (data) => {
    localStorage.setItem('cycleData', JSON.stringify(data));
    setIsDrawerOpen(false);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <div className="max-w-xl w-full p-4 mx-auto">
            <DrawerHeader className="text-center">
                <DrawerTitle>Update my cycle</DrawerTitle>
            </DrawerHeader>
            
            <div className="p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="lastPeriodDate"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last periods started</FormLabel>
                                <FormControl>
                                <Input 
                                    {...field} 
                                    value={field.value ? new Date(field.value).toLocaleDateString() : ''}
                                    disabled 
                                />
                                </FormControl>
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cycleLength"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cycle length</FormLabel>
                                <FormControl>
                                    <div className="flex items-center">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="px-4"
                                            onClick={() => field.onChange(Math.max(1, field.value - 1))}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Input 
                                            type="number" 
                                            {...field} 
                                            className="text-center"
                                            readOnly
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="px-4"
                                            onClick={() => field.onChange(field.value + 1)}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </FormControl>
                            </FormItem>
                            )}
                        />

                        <DrawerFooter className="px-0">
                            <div className="flex justify-between w-full gap-4">
                                <DrawerClose asChild>
                                    <Button 
                                        className="flex-1" 
                                        variant="outline" 
                                        onClick={() => {
                                            const savedData = JSON.parse(localStorage.getItem('cycleData')) || {
                                                lastPeriodDate: '',
                                                cycleLength: 28,
                                            };
                                            form.reset(savedData);
                                            setIsDrawerOpen(false);
                                        }}
                                    >
                                        Close
                                    </Button>
                                </DrawerClose>
                                <Button className="flex-1" type="submit">Save</Button>
                            </div>
                        </DrawerFooter>
                    </form>
                </Form>
            </div>
        </div>
      </DrawerContent>

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
    </Drawer>
  );
};

export default FullWidthMonthPicker;