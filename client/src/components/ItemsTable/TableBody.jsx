import { useNavigate } from "react-router-dom";

const TableBody = ({ items }) => {
    const navigate = useNavigate();

    const handleItemClick = (id) => {
        navigate(`/item/${id}`);
    };

    return (
        <tbody>
            {items.map(({ id, name, customFields }, itemIndex) => (
                <tr
                    key={itemIndex}
                    onClick={() => handleItemClick(id)}
                    style={{ cursor: "pointer" }}
                >
                    <th>{itemIndex + 1}</th>
                    <th>{name}</th>
                    {customFields.map(({ type, value }, fieldIndex) =>
                        type === "string" || type === "date" ? (
                            <td key={fieldIndex}>{value}</td>
                        ) : null
                    )}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
