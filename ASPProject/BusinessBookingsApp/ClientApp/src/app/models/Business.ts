export interface Business {
    businessId: number,
    name: string;
    address: string;
    imageUrl:string;
    workHoursStart: number;
    workHoursEnd: number;
    timeSlotLength: number;
    createdByUserId: string;
  }