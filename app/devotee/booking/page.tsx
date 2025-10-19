'use client';

/**
 * Devotee Booking Page
 * Step-by-step darshan booking flow
 */

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useTempleStore } from '@/lib/stores/temple-store';
import { useBookingStore } from '@/lib/stores/booking-store';
import { MapPin, Users, Clock, Calendar as CalendarIcon, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Temple, TimeSlot } from '@/types';

type BookingStep = 'temple' | 'date' | 'slot' | 'confirm';

export default function BookingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { temples, fetchTemples } = useTempleStore();
  const { createBooking, fetchAvailableSlots, availableSlots } = useBookingStore();

  const [currentStep, setCurrentStep] = useState<BookingStep>('temple');
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTemples();
  }, [fetchTemples]);

  useEffect(() => {
    if (selectedTemple && selectedDate) {
      fetchAvailableSlots(selectedTemple.id, selectedDate);
    }
  }, [selectedTemple, selectedDate, fetchAvailableSlots]);

  const handleTempleSelect = (temple: Temple) => {
    setSelectedTemple(temple);
    setCurrentStep('date');
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setCurrentStep('slot');
    }
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCurrentStep('confirm');
  };

  const handleConfirmBooking = async () => {
    if (!selectedTemple || !selectedDate || !selectedSlot || !session?.user) {
      toast.error('Please complete all booking details');
      return;
    }

    setIsSubmitting(true);

    try {
      const booking = await createBooking({
        templeId: selectedTemple.id,
        date: selectedDate,
        slotId: selectedSlot.id,
        numberOfDevotees: 1,
        category: 'general',
        contactName: session.user.name || '',
        contactEmail: session.user.email || '',
        contactPhone: '',
        // Pass session user data
        userId: session.user.id,
        userName: session.user.name || '',
        userEmail: session.user.email || '',
        // Pass temple and slot data
        temple: selectedTemple,
        slot: selectedSlot,
      });

      toast.success('Booking confirmed! Redirecting to your bookings...');
      
      setTimeout(() => {
        router.push('/devotee/bookings');
      }, 2000);
    } catch (error) {
      toast.error('Failed to create booking. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    const steps: BookingStep[] = ['temple', 'date', 'slot', 'confirm'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'temple', label: 'Select Temple', icon: MapPin },
      { key: 'date', label: 'Choose Date', icon: CalendarIcon },
      { key: 'slot', label: 'Time Slot', icon: Clock },
      { key: 'confirm', label: 'Confirm', icon: CheckCircle },
    ];

    const currentIndex = steps.findIndex(s => s.key === currentStep);

    return (
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isActive = step.key === currentStep;
          const isCompleted = index < currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isCompleted
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/30'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="mt-2 text-xs font-medium">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <Separator
                  className={`mx-4 flex-1 ${
                    isCompleted ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Book Darshan</h1>
          <p className="text-muted-foreground mt-1">
            Reserve your spot for a peaceful darshan experience
          </p>
        </div>

        {renderStepIndicator()}

        {/* Step 1: Temple Selection */}
        {currentStep === 'temple' && (
          <div className="grid gap-4 md:grid-cols-2">
            {temples.map((temple) => (
              <Card
                key={temple.id}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleTempleSelect(temple)}
              >
                <CardHeader>
                  <CardTitle>{temple.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {temple.location.city}, {temple.location.state}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily Capacity:</span>
                      <span className="font-medium">{temple.capacity.max.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Occupancy:</span>
                      <Badge variant={temple.capacity.current > temple.capacity.max * 0.8 ? 'destructive' : 'default'}>
                        {temple.capacity.current} / {temple.capacity.max}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Date Selection */}
        {currentStep === 'date' && (
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>
                Choose your preferred date for darshan at {selectedTemple?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        )}

        {/* Step 3: Time Slot Selection */}
        {currentStep === 'slot' && selectedTemple && (
          <Card>
            <CardHeader>
              <CardTitle>Select Time Slot</CardTitle>
              <CardDescription>
                Available slots for {selectedDate?.toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedSlot?.id}
                onValueChange={(value: string) => {
                  const slot = availableSlots.find((s: TimeSlot) => s.id === value);
                  if (slot) handleSlotSelect(slot);
                }}
              >
                <div className="grid gap-4">
                  {availableSlots.map((slot: TimeSlot) => {
                    const isAvailable = slot.available > 0;
                    
                    return (
                      <div key={slot.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={slot.id} disabled={!isAvailable} />
                        <Label
                          htmlFor={slot.id}
                          className="flex flex-1 cursor-pointer items-center justify-between rounded-lg border p-4"
                        >
                          <div>
                            <div className="font-medium">
                              {slot.startTime} - {slot.endTime}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {slot.available} spots available
                            </div>
                          </div>
                          <Badge variant={isAvailable ? 'default' : 'secondary'}>
                            {isAvailable ? 'Available' : 'Full'}
                          </Badge>
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 'confirm' && (
          <Card>
            <CardHeader>
              <CardTitle>Confirm Booking</CardTitle>
              <CardDescription>
                Please review your booking details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Temple:</span>
                  <span className="font-medium">{selectedTemple?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">
                    {selectedSlot?.startTime} - {selectedSlot?.endTime}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Devotee:</span>
                  <span className="font-medium">{session?.user?.name}</span>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  ✓ You will receive a QR code via email
                  <br />
                  ✓ Show the QR code at the temple entrance
                  <br />
                  ✓ Arrive 15 minutes before your slot time
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={currentStep === 'temple'}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {currentStep === 'confirm' && (
            <Button onClick={handleConfirmBooking} disabled={isSubmitting}>
              {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
