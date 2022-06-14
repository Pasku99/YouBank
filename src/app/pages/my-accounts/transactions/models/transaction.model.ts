export interface Transaction {
  TIN?: string;
  email?: string;
  amount?: number;
  password?: string;
  destinationTIN?: string;
  destinationEmail?: string;
  reason?: string;
}
