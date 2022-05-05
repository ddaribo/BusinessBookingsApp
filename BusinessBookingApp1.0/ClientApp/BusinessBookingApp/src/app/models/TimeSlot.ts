import * as moment from "moment";

export interface TimeSlot {
  slot: moment.Moment;
  isAvailable: boolean;
}
