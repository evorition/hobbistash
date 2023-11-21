import Table from "react-bootstrap/Table";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const ItemsTable = ({ customFields, items }) => (
    <Table striped bordered hover responsive>
        <TableHeader customFields={customFields} />
        <TableBody items={items} />
    </Table>
);

export default ItemsTable;
