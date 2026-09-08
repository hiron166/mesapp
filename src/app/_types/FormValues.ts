export type FormValues = {
  day: string;
  openTime: string;
  liveName: string;
  chargePrice: number;
  ticketQuota: number;
  fellowPerformers: { role: string; name: string }[];
  performers: { role: string; name: string }[];
};
