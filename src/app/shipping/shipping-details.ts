export interface ShippingDetails {
  Id: number;
  senderName: string;
  description: string;
  receiptAddress: string;
  expedited: boolean;
  shipmentType: number;
}
