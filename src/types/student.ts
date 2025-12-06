export interface Student {
  id?: string;
  full_name: string;
  email: string;
  phone_number: string;
  gender: string;
  age: string;
  level: string;
  course_of_study: string;
  university: string;
  any_special_needs: string;
  how_did_you_hear_about_the_event: string;
  why_are_you_attending_this_symposium: string;
  payment_status?: string;
  stripe_session_id?: string;
  qr_code_value?: string;
  created_at?: string;
}

export interface RegistrationFormData {
  full_name: string;
  email: string;
  phone_number: string;
  gender: string;
  age: string;
  level: string;
  course_of_study: string;
  university: string;
  any_special_needs: string;
  how_did_you_hear_about_the_event: string;
  why_are_you_attending_this_symposium: string;
}

// export interface Student {
//   id?: string;
//   full_name: string;
//   email: string;
//   phone: string;
//   gender: string;
//   date_of_birth: string;
//   address: string;
//   guardian_name?: string;
//   course: string;
//   photo_url?: string;
//   payment_status?: string;
//   stripe_session_id?: string;
//   qr_code_value?: string;
//   created_at?: string;
// }

// export interface RegistrationFormData {
//   full_name: string;
//   email: string;
//   phone: string;
//   gender: string;
//   date_of_birth: string;
//   address: string;
//   guardian_name: string;
//   course: string;
//   photo?: File | null;
// }
