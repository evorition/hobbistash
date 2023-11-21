const TableBody = ({ items }) => (
    <tbody>
        {items.map(({ name, customFields }, itemIndex) => (
            <tr key={itemIndex}>
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

export default TableBody;
