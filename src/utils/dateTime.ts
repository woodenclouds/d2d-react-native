/**
 * Converts time from 24-hour format (HH:MM:SS) to 12-hour format with AM/PM
 * @param time Time string in format "HH:MM:SS"
 * @returns Formatted time string (e.g., "4:00 PM")
 */
export const convertToAMPM = (time: string): string => {
  if (!time) return '';

  // Extract hours and minutes from HH:MM:SS format
  const [hours, minutes] = time.split(':').map(Number);
  
  // Convert to 12-hour format
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert 0 to 12
  
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
};
