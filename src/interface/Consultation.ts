export interface Consultation {
  id?: number;
  patientName: string;
  patientEmail: string;
  patientCellphone: string;
  patientCpf: string;
  professionalId?: number;
  professionalName: string;
  availableTimeId: number;
  consultationDate: string;
  consultationTime: string;
  consultationType: string;
  estimatedDuration: number;
  status: string;
  observations?: string;
  consultationValue: number;
  paymentMethod: string;
  paymentStatus: string;
  notificationSent: boolean;
  createdAt?: string;
  updatedAt?: string;
}
