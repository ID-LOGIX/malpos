import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Anchor,
  Heading,
  Box,
  Text,
  Input,
  Image,
  Icon,
  Button,
} from "../elements";
import { Link } from "react-router-dom";

export default function ProductsTable({ thead, tbody }) {
  const [alertModal, setAlertModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(tbody);
  }, [tbody]);

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;

    if (name === "allCheck") {
      const checkData = data?.map((item) => {
        return { ...item, isChecked: checked };
      });
      setData(checkData);
    } else {
      const checkData = data?.map((item) =>
        item.name === name ? { ...item, isChecked: checked } : item
      );
      setData(checkData);
    }
  };

  return (
    <Box className="mc-table-responsive">
      <Table className="mc-table product">
        <Thead className="mc-table-head primary">
          <Tr>
            <Th>
              <Box className="mc-table-check">
                {/* <Input
                  type="checkbox"
                  name="allCheck"
                  checked={
                    data?.filter((item) => item.isChecked !== true).length < 1
                  }
                  onChange={handleCheckbox}
                /> */}
                <Text>Id</Text>
              </Box>
            </Th>
            {thead.map((item, index) => (
              <Th key={index}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody className="mc-table-body even">
          {data?.map((item, index) => (
            <Tr key={index}>
              <Td title={index + 1}>
                <Box className="mc-table-check">
                  {/* <Input
                    type="checkbox"
                    name={item.name}
                    checked={item?.isChecked || false}
                    onChange={handleCheckbox}
                  /> */}
                  <Text>{index + 1}</Text>
                </Box>
              </Td>
              <Td>
                <Box className="mc-table-product md">
                  <Image src={item.src} alt={item.alt} />
                  <Box className="mc-table-group">
                    <Link to="/product-view" state={{ id: `${item.id}` }}>
                      <Heading as="h6">{item.heading}</Heading>
                    </Link>

                    {/* <Text>{item.descrip}</Text> */}
                  </Box>
                </Box>
              </Td>
              <Td>{item.visibility}</Td>
              <Td>{item.gift}</Td>
              <Td>
                <Box className="mc-table-price">
                  {/* <del>{item.price.previous}</del> */}
                  <Text>{item.type}</Text>
                </Box>
              </Td>
              <Td>{item.category}</Td>
              <Td>
                <Box className="mc-table-rating">
                  {/* <Icon>{item.rating.icon}</Icon> */}
                  {/* <Heading>{item.rating.percent}</Heading> */}
                  <Text>{item.station}</Text>
                </Box>
              </Td>
              <Td>{item.costPrice}</Td>
              <Td>{item.costPrice}</Td>
              <Td>{item.markup}</Td>

              <Td>
                <Box className="mc-table-action">
                  <Link
                    to="/product-view"
                    state={{ id: `${item.id}` }}
                    title="View"
                    className="material-icons view"
                  >
                    {item.action.view}
                  </Link>
                  <Link
                    to={`/${item.id}`}
                    // href="/product-upload"
                    title="Edit"
                    className="material-icons edit"
                  >
                    {item.action.edit}
                  </Link>
                  <Button
                    title="Delete"
                    className="material-icons delete"
                    onClick={() => setAlertModal(true)}
                  >
                    {item.action.delete}
                  </Button>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal show={alertModal} onHide={() => setAlertModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to delete this product?</Text>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setAlertModal(false)}
            >
              nop, close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => setAlertModal(false)}
            >
              yes, delete
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
