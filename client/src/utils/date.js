import { format } from "date-fns";

const formatDate = (dateString) => {
    const parsedDate = new Date(dateString);
    const formattedDate = format(parsedDate, "MMMM dd, yyyy HH:mm:ss");
    return formattedDate;
};

export default { formatDate };
