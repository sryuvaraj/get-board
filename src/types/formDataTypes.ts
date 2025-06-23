export interface RecruitersRegForm {
  id?: string;
  name: string;
  email: string;
  companyName: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}

export interface RecruitersLogForm {
  username: string;
  password: string;
}

export interface SeekersRegForm {
  id?: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface JobData {
  jobTitle: string;
  description: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  skills: string[];
  deadline: string;
}
