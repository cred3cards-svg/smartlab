/**
 * SMARTLAB247 Booking Helpers & Types
 * Provides typed utilities for cart management and checkout integration.
 */

export interface CartItem {
  id: string;
  type: "TEST" | "PACKAGE";
  name: string;
  price: number;
}

export interface BookingState {
  items: CartItem[];
  patient: any;
  address: any;
  slotId: string | null;
  couponCode: string | null;
}

export const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return {
    subtotal,
    itemCount: items.length,
  };
};

/**
 * Helper to interact with the Booking APIs
 */
export const bookingAPI = {
  getSlots: async (date: string) => {
    const res = await fetch(`/api/slots?date=${date}`);
    if (!res.ok) throw new Error("Failed to fetch slots");
    return res.json();
  },

  applyCoupon: async (code: string, subtotal: number) => {
    const res = await fetch("/api/coupons/apply", {
      method: "POST",
      body: JSON.stringify({ code, subtotal }),
    });
    return res.json();
  },

  createBooking: async (bookingData: any) => {
    const res = await fetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
    return res.json();
  },

  getBookingDetails: async (id: string) => {
    const res = await fetch(`/api/bookings/${id}`);
    if (!res.ok) throw new Error("Booking not found");
    return res.json();
  }
};
