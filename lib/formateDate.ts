// Utility function to format ISO date to "30 Sep, 2025 2:35 PM" format
const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${day} ${month}, ${year} ${time}`;
    };

  export default formatDate;