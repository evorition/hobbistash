const TableHeader = ({ customFields }) => (
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            {customFields.map(({ name, type }, fieldIndex) =>
                type === "string" || type === "date" ? (
                    <th key={fieldIndex}>{name}</th>
                ) : null
            )}
        </tr>
    </thead>
);

export default TableHeader;
