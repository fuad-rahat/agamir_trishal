export const COLORS = {
  primary: '#10b981',
  secondary: '#3b82f6',
  danger: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  dark: '#1f2937',
  light: '#f3f4f6',
  border: '#e5e7eb',
};

export const PROBLEM_CATEGORIES = [
  { value: 'Road', label: 'রাস্তা', icon: 'fa-road' },
  { value: 'School', label: 'স্কুল', icon: 'fa-school' },
  { value: 'Health', label: 'স্বাস্থ্য', icon: 'fa-hospital' },
  { value: 'Water/Drainage', label: 'পানি/নালা', icon: 'fa-water' },
  { value: 'Electricity', label: 'বিদ্যুৎ', icon: 'fa-bolt' },
  { value: 'Other', label: 'অন্যান্য', icon: 'fa-star' },
];

export const INFRASTRUCTURE_TYPES = [
  { value: 'Road', label: 'রাস্তা' },
  { value: 'School', label: 'স্কুল' },
  { value: 'Health Center', label: 'স্বাস্থ্য কেন্দ্র' },
  { value: 'Water Supply', label: 'পানি সরবরাহ' },
  { value: 'Drainage', label: 'ড্রেনেজ' },
  { value: 'Electricity', label: 'বিদ্যুৎ' },
];

export const CONDITION_LEVELS = [
  { value: 'Excellent', label: 'চমৎকার', color: '#10b981' },
  { value: 'Good', label: 'ভালো', color: '#3b82f6' },
  { value: 'Fair', label: 'মোটামুটি', color: '#f59e0b' },
  { value: 'Poor', label: 'খারাপ', color: '#ef4444' },
  { value: 'Critical', label: 'সংকট', color: '#7f1d1d' },
];

export const HELPLINE_CATEGORIES = [
  { value: 'Election Commission', label: 'নির্বাচন কমিশন' },
  { value: 'Local Administration', label: 'স্থানীয় প্রশাসন' },
  { value: 'Emergency', label: 'জরুরি সেবা' },
  { value: 'Support', label: 'সহায়তা' },
];

export const TRISHAL_UNIONS = [
  { id: 'trishal-sadar', name: 'Trishal Sadar', bengaliName: 'ত্রিশাল সদর' },
  { id: 'bhangaon', name: 'Bhangaon', bengaliName: 'ভাঙ্গাওন' },
  { id: 'mohalang', name: 'Mohalang', bengaliName: 'মোহালাং' },
  { id: 'amtoli', name: 'Amtoli', bengaliName: 'আমটলী' },
  { id: 'kathail', name: 'Kathail', bengaliName: 'কাঠাইল' },
  { id: 'banipara', name: 'Banipara', bengaliName: 'বানিপাড়া' },
];

export const ELECTION_DAY_ISSUES = [
  { value: 'long-queue', label: 'দীর্ঘ লাইন' },
  { value: 'confusion', label: 'বিভ্রান্তি' },
  { value: 'accessibility', label: 'অ্যাক্সেসিবিলিটি সমস্যা' },
  { value: 'other', label: 'অন্যান্য' },
];
