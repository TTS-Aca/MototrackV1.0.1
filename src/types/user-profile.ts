export type UserProfile = {
  firstName: string;
  lastName: string;
  lastNameMaternal?: string;
  birthYear: string;
  email: string;
  countryCode: string;
  phone: string;
};

export function userFullName(profile: UserProfile): string {
  const parts = [profile.firstName, profile.lastName, profile.lastNameMaternal].filter(Boolean);
  return parts.join(' ') || 'Usuario';
}

export function profileFromEmail(email: string): UserProfile {
  const local = email.split('@')[0] ?? 'usuario';
  const namePart = local.split(/[._-]/)[0] ?? 'Usuario';
  const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase();

  return {
    firstName: capitalized,
    lastName: '',
    birthYear: '',
    email,
    countryCode: '+52',
    phone: '',
  };
}
