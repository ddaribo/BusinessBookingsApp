export interface Business {
    businessId: number | null,
    name: string;
    address: string;
    imageUrl:string;
    workHoursStart: number;
    workHoursEnd: number;
    timeSlotLength: number;
    createdByUserId: string | null;
  }