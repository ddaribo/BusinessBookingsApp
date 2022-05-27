import * as moment from "moment";

export interface TimeSlot {
  isInPast: boolean;
  slot: moment.Moment;
  isAvailable: boolean;
}
