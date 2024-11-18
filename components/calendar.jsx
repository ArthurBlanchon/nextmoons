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
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const MonthCalendar = ({
  date,
  selectedDate,
  onSelect,
  isCurrentMonth,
  hasInitialScrolled,
  cycleData,
  locale = 'en-US'
}) => {
  // Ref for scrolling to current month
  const monthRef = useRef(null);
  
  // Effect to automatically scroll to current month on initial load
  useEffect(() => {
    if (isCurrentMonth && !hasInitialScrolled.current && monthRef.current) {
      monthRef.current.scrollIntoView({ behavior: 'smooth' });
      hasInitialScrolled.current = true;
    }
  }, [isCurrentMonth, hasInitialScrolled]);

  // Calculate calendar grid parameters
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

    // Parse cycle start date and length for calculations
    const startDate = cycleData?.lastPeriodDate ?
      new Date(cycleData.lastPeriodDate + 'T00:00:00.000Z') :
      null;
    const cycleLength = parseInt(cycleData?.cycleLength) || 28;

    // Helper function to determine the status of each day
    // (normal, period, or fertile)
    const getDayStatus = (dayDate) => {
      if (!startDate) return 'normal';

      // Convert to UTC to ensure consistent calculations
      const currentDay = new Date(Date.UTC(
        dayDate.getFullYear(),
        dayDate.getMonth(),
        dayDate.getDate()
      ));

      // Calculate days since cycle start
      const timeDiff = currentDay.getTime() - startDate.getTime();
      const daysSinceStart = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (daysSinceStart < 0) return 'normal';

      // Calculate position within the cycle
      const cyclePosition = daysSinceStart % cycleLength;

      // First 4 days are period days
      if (cyclePosition >= 0 && cyclePosition <= 3) {
        return 'period';
      }

      // Last 5 days before next cycle are fertile days
      if (cyclePosition >= cycleLength - 5 && cyclePosition < cycleLength) {
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
      const currentDate = new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        day
      ));

      const status = getDayStatus(currentDate);
      const isPeriod = status === 'period';
      const isFertile = status === 'fertile';

      const isSelected = selectedDate?.getDate() === day &&
                        selectedDate?.getMonth() === date.getMonth() &&
                        selectedDate?.getFullYear() === date.getFullYear();

      const isToday = new Date().getDate() === day &&
                     new Date().getMonth() === date.getMonth() &&
                     new Date().getFullYear() === date.getFullYear();

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => onSelect(currentDate)}
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

const FullWidthMonthPicker = ({
  onSelect,        // Callback when date is selected
  onCycleUpdate,   // Callback when cycle data is updated
  initialData,     // Initial cycle data
  initialDate = new Date(),     // Starting date for calendar
  locale = 'en-US'           // Localization setting
}) => {
  // Initialize cycle data state with initial values
  const [cycleData, setCycleData] = useState({
    lastPeriodDate: initialData?.lastPeriodDate ? initialData?.lastPeriodDate : null,
    cycleLength: initialData?.cycleLength ? initialData?.cycleLength : 28
  });

  console.log("Inital Data:", initialData);
  console.log("Cycle Data:", cycleData);

  // Initialize form with same initial values
  const form = useForm({
    defaultValues: {
      lastPeriodDate: cycleData.lastPeriodDate,
      cycleLength: cycleData.cycleLength
    }
  });

  // State for UI management
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const hasInitialScrolled = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (onCycleUpdate) {
        await onCycleUpdate(data);
      }
      setCycleData(data); // Update cycle data the same way as initialization
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDrawerOpen(true);
    const formattedDate = date.toISOString().split('T')[0];
    form.setValue('lastPeriodDate', formattedDate);
    if (onSelect) onSelect(date);
  };

  // Generate array of 24 months
  const months = Array.from({ length: 24 }, (_, i) => {
    const date = new Date(initialDate);
    date.setMonth(initialDate.getMonth() + (i - 12));
    return date;
  });

  const isCurrentMonth = (date) => {
    const now = new Date();
    return date.getMonth() === now.getMonth() &&
           date.getFullYear() === now.getFullYear();
  };

  return (
    <>
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
                cycleData={cycleData}  // Pass the state directly
              />
              {index < months.length - 1 && <div className="border-t" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={(open) => {
        if (!open) {
          setSelectedDate(null);
        }
        setIsDrawerOpen(open);
      }}>
        <DrawerContent>
          <div className="max-w-xl w-full p-4 mx-auto">
            <DrawerHeader className="text-center">
              <DrawerTitle>Predict My Menstrual Cycle</DrawerTitle>
            </DrawerHeader>

            <div className="p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                      control={form.control}
                      name="lastPeriodDate"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Most Recent Period Start Date</FormLabel>
                          <FormControl>
                              <Input
                                  {...field}
                                  value={field.value ?
                                    new Date(field.value + 'T00:00:00Z').toLocaleDateString(locale, {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                      weekday: 'long'
                                    }) :
                                    ''
                                  }
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
                          <FormLabel>Average Cycle Length (Days)</FormLabel>
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
                                      form.reset(cycleData); // Reset to current cycle data
                                  }}
                                  disabled={isSubmitting}
                              >
                                  Cancel
                              </Button>
                          </DrawerClose>
                          <Button className="flex-1" type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update
                          </Button>
                      </div>
                  </DrawerFooter>
                </form>
              </Form>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FullWidthMonthPicker;

