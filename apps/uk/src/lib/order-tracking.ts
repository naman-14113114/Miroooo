export type TrackingStage = "ORDER_PLACED" | "PROCESSING" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED";

export type TimelineEvent = {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  stage: TrackingStage;
};

export type TrackingItem = {
  title: string;
  quantity: number;
  variant?: string;
  image?: string;
};

export type TrackingData = {
  checkedAt?: string;
  stale?: boolean;
  shipments?: TrackingData[];
  whopCustomerId?: string;
  found: boolean;
  orderRef: string;
  trackingNumber: string;
  carrierName: string;
  carrierTrackingUrl?: string;
  destination: string;
  status: "Processing" | "Dispatched" | "In Transit" | "Out for Delivery" | "Delivered" | "Delivery issue" | "Cancelled";
  statusCode: TrackingStage;
  progressPercentage: number;
  activeStepIndex: number; // 0: Placed, 1: Processing, 2: In Transit, 3: Out for Delivery, 4: Delivered
  orderDate: string;
  estimatedDelivery: string;
  items: TrackingItem[];
  timeline: TimelineEvent[];
};
