export type BikeType = "MOTORCYCLE" | "SCOOTER" | "BICYCLE";

export interface Hub {
  id: string;
  branch_name: string;
}

export interface Rider {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  photo: string | null;
  bike_type: BikeType;
  is_active: boolean;
  hub: Hub;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetRidersResponse {
  success: boolean;
  data: {
    riders: Rider[];
    pagination: PaginationMeta;
  };
  message: string;
}
