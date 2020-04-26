export interface ICourse {
  id: string;
  name: string;
  description: string;
  rate: number;
  category: string;
}

export interface ICategory {
  name: string;
  url?: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  avatar: string;
  isInstructor: boolean;
  description: string;
}

export interface IError {
  status: number;
  message?: string;
}

// frontend course

// instructor avatar
// instructor name
// course name
// course rating
// course rate
// course id
// instructor id

// user profile - self

// firstname
// lastname
// specialty
// email
// avatar
// description
// isInstructor

// class management

// course name
// course rate
// course category
// course description
// course id
