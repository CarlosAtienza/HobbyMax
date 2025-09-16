// UserResponseDTO
export type UserResponseDTO = {
  id: number;
  username: string;
  email: string;
  profilePhoto: string;
  hobbies: HobbyResponseDTO[];
};

// HobbyResponseDTO
export type HobbyResponseDTO = {
  id: number;
  name: string;
  description: string;
  totalXp: number;
  level: number;
  createdAt: Date; // was java.util.Date in backend
  currentStreak: number;
  longestStreak: number;
  logs: HobbyLogResponseDTO[];
};

// HobbyLogResponseDTO
export type HobbyLogResponseDTO = {
  id: number;
  date: Date; // was java.util.Date
  durationMinutes: number;
  description: string;
  effortLevel: number;
  mood: string;
  xpEarned: number;
  hobbyId: number;
  leveledUp: boolean;
};

// ConnectionResponseDTO
export type ConnectionResponseDTO = {
  id: number;
  requesterUsername: string;
  receiverUsername: string;
  status: ConnectionStatus; // enum from backend
  createdAt: Date;
};

// ConnectionStatus enum
export enum ConnectionStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
} 

////////
// Request DTOs
////////

export type ConnectionRequestDTO = {
  requesterId: number;
  receiverId: number;
};

export type HobbyLogRequestDTO = {
  durationMinutes: number;
  description: string;
  effortLevel: number; // 1-5
  mood: string;
  hobbyId: number;
};

export type HobbyRequestDTO = {
  name: string;
  description: string;
  updatedStreak: number;
  updatedLongestStreak: number;
};

export type UserRequestDTO = {
  username: string;
  email: string;
  password: string;
};

