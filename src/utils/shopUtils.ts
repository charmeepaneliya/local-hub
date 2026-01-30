/**
 * Shop utility functions for timing and status management
 */

export interface ShopHours {
  day: string;
  open: string;
  close: string;
}

export interface ShopStatus {
  isOpen: boolean;
  status: "open" | "closed" | "closing-soon" | "opening-soon";
  timeUntilChange: string;
  currentTime: string;
  nextStatusTime: string;
  percentOpenToday: number;
}

// Parse time string (e.g., "09:30" or "9:30 AM")
export const parseTime = (timeStr: string): { hours: number; minutes: number } => {
  let [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period) {
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }
  }

  return { hours, minutes };
};

// Get shop status based on opening hours
export const getShopStatus = (
  hours: string | ShopHours[],
  currentTime?: Date
): ShopStatus => {
  const now = currentTime || new Date();
  const dayIndex = now.getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = daysOfWeek[dayIndex];

  let openTime = "09:00";
  let closeTime = "21:00";

  // Parse hours
  if (typeof hours === "string") {
    const match = hours.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?\s*-\s*(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
    if (match) {
      openTime = `${String(parseInt(match[1])).padStart(2, "0")}:${match[2] || "00"}`;
      closeTime = `${String(parseInt(match[4])).padStart(2, "0")}:${match[5] || "00"}`;
    }
  } else if (Array.isArray(hours)) {
    const daySchedule = hours.find((h) => h.day === currentDay);
    if (daySchedule) {
      openTime = daySchedule.open;
      closeTime = daySchedule.close;
    }
  }

  const [openHours, openMinutes] = openTime.split(":").map(Number);
  const [closeHours, closeMinutes] = closeTime.split(":").map(Number);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutesOfDay = openHours * 60 + openMinutes;
  const closeMinutesOfDay = closeHours * 60 + closeMinutes;

  let isOpen = currentMinutes >= openMinutesOfDay && currentMinutes < closeMinutesOfDay;
  let status: "open" | "closed" | "closing-soon" | "opening-soon" = "closed";
  let timeUntilChange = "";
  let nextStatusTime = "";

  const getTimeString = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  if (isOpen) {
    status = "open";
    const minutesUntilClose = closeMinutesOfDay - currentMinutes;
    timeUntilChange = getTimeString(minutesUntilClose);
    nextStatusTime = `Closes at ${String(closeHours).padStart(2, "0")}:${String(closeMinutes).padStart(2, "0")}`;

    if (minutesUntilClose <= 30) {
      status = "closing-soon";
    }
  } else {
    status = "closed";
    if (currentMinutes < openMinutesOfDay) {
      const minutesUntilOpen = openMinutesOfDay - currentMinutes;
      timeUntilChange = getTimeString(minutesUntilOpen);
      nextStatusTime = `Opens at ${String(openHours).padStart(2, "0")}:${String(openMinutes).padStart(2, "0")}`;
    } else {
      // Closed for the day, calculate tomorrow's opening
      const minutesUntilMidnight = 24 * 60 - currentMinutes;
      const minutesUntilOpen = minutesUntilMidnight + openMinutesOfDay;
      timeUntilChange = getTimeString(minutesUntilOpen);
      nextStatusTime = `Opens tomorrow at ${String(openHours).padStart(2, "0")}:${String(openMinutes).padStart(2, "0")}`;
    }
  }

  const percentOpenToday = ((closeMinutesOfDay - openMinutesOfDay) / (24 * 60)) * 100;

  return {
    isOpen,
    status,
    timeUntilChange,
    currentTime: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
    nextStatusTime,
    percentOpenToday,
  };
};

// Get badge color based on shop status
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "open":
      return "bg-emerald-500/90 text-white";
    case "closing-soon":
      return "bg-amber-500/90 text-white";
    case "opening-soon":
      return "bg-sky-500/90 text-white";
    case "closed":
      return "bg-red-500/90 text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

// Get status icon
export const getStatusIcon = (status: string): string => {
  switch (status) {
    case "open":
      return "🟢";
    case "closing-soon":
      return "🟡";
    case "opening-soon":
      return "🔵";
    case "closed":
      return "🔴";
    default:
      return "⚪";
  }
};

// Format opening hours for display
export const formatOpeningHours = (hours: string): string => {
  const match = hours.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?\s*-\s*(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
  if (match) {
    const startHour = parseInt(match[1]);
    const startMin = match[2] || "00";
    const endHour = parseInt(match[4]);
    const endMin = match[5] || "00";
    const period = match[6] || "PM";

    return `${startHour}:${startMin} - ${endHour}:${endMin} ${period}`;
  }
  return hours;
};
