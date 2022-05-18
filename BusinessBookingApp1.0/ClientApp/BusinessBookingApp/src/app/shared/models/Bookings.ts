export interface Booking {
    bookingId: number,
    businessId: number,
    bookingDateTime: string;
}

export interface BookingQuery {
    BusinessId: string,
    BookingDateTime: Date;
}