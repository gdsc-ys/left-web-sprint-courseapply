export interface category {
  degree: string[];
  department: string[];
  major: string[];
  grade: string[];
}

export interface degree {
  학부: string[];
  대학원: string[];
}

export interface department {
  [key: string]: string[];
}

export interface filters {
  degreeDict: degree;
  departmentDict: department;
}



export interface filterToSend {
  degree: string;
  department: string;
  major: string;
  grade: string;
}
