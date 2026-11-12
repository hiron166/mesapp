import {
  LiveInfo,
  Performer,
  FellowPerformer,
  Reservation,
} from "@prisma/client";

export type LiveInfoRelations = LiveInfo & {
  performers: Performer[];
  fellowPerformers: FellowPerformer[];
  reservations: Reservation[];
};
