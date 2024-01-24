import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";



export default function RegistroRegion() {
  const [rucCi, setRucCi] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [nombres, setNombres] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [totalItem, setTotalItem] = useState("");
  const [pedidos, setPedidos] = useState([]); // Lista de pedidos guardados
  const [pedidosBD, setPedidosBD] = useState([]); // Lista de pedidos guardados
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetch(`http://localhost:5000/pedidos`)
      .then(res => res.json())
      .then(data => {
        setPedidosBD(data)
      })
  }, [])


  const handleCalcularTotalItem = () => {
    // Lógica para calcular el total del ítem
    const cantidadNum = parseFloat(cantidad);
    const precioNum = parseFloat(precio);

    if (!isNaN(cantidadNum) && !isNaN(precioNum)) {
      const total = cantidadNum * precioNum;
      setTotalItem(total.toFixed(2));
    }
  };


  async function guardarPedido(nuevoProducto) {
    const res = await fetch('http://localhost:5000/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoProducto),
    })

    const data = await res.json()

    return data.id
  }

  async function deletePedido(id) {
    const res = await fetch('http://localhost:5000/pedidos/' + id, {
      method: 'DELETE'
    })
    console.log(res)
    return res
  }

  const handleGuardarProducto = async () => {
    // Lógica para guardar el producto ingresado en los casilleros
    const nuevoProducto = {
      id: 0,
      nombre: nombreProducto,
      cantidad: cantidad,
      precio: precio,
      totalItem: totalItem
    };

    nuevoProducto.id = await guardarPedido(nuevoProducto);

    console.log(nuevoProducto)

    // Agregar el nuevo producto a la lista de pedidos
    setPedidos([...pedidos, nuevoProducto]);

    // Limpiar los campos después de guardar
    setNombreProducto("");
    setCantidad("");
    setPrecio("");
    setTotalItem("");


  };


  const handleEliminarPedidoWs = async (itemId) => {
    await deletePedido(itemId);
    const filtredData = pedidos.filter(item => item.id !== itemId);
    setPedidos(filtredData);
  };


  return (
    <DefaultLayout>
      <div className="center">
        <h1 style={{ fontSize: "3em", color: "black", fontWeight: "bold" }}>
          Registra tu Nuevo Pedido
        </h1>

        <div className="cliente-section">
          <h2 style={{ fontWeight: "bold" }}>DATOS DEL CLIENTE</h2>
          <table>
            <tbody>
              <tr>
                <td>RUC/CI:</td>
                <td>
                  <input
                    type="text"
                    value={rucCi}
                    onChange={(e) => setRucCi(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>APELLIDOS:</td>
                <td>
                  <input
                    type="text"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>NOMBRES:</td>
                <td>
                  <input
                    type="text"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="producto-section">
          <h2 style={{ fontWeight: "bold" }}>DATOS DE PRODUCTOS</h2>
          <table>
            <tbody>
              <tr>
                <td>NOMBRE:</td>
                <td>
                  <input
                    type="text"
                    value={nombreProducto}
                    onChange={(e) => setNombreProducto(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>CANTIDAD:</td>
                <td>
                  <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => {
                      setCantidad(e.target.value);
                      handleCalcularTotalItem();
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>PRECIO:</td>
                <td>
                  <input
                    type="number"
                    value={precio}
                    onChange={(e) => {
                      setPrecio(e.target.value);
                      handleCalcularTotalItem();
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>TOTAL ITEM:</td>
                <td>
                  <input type="text" value={totalItem} readOnly />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="boton-gris"
            onClick={handleCalcularTotalItem}
            style={{ marginLeft: "10px" }}
          >
            Calcular Total Item
          </button>
          <button
            className="boton-guardar"
            onClick={handleGuardarProducto}
          >
            Añadir Producto
          </button>
        </div>

        {/* Mostrar la lista de pedidos */}
        {pedidos.length > 0 && (
          <div>
            <Table removeWrapper aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn>Nombre</TableColumn>
                      <TableColumn>Cantidad</TableColumn>
                      <TableColumn>Precio</TableColumn>
                      <TableColumn>Total</TableColumn>
                      <TableColumn>Accion</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {pedidos.map((pedido, index) => (
                          <TableRow key={index}>
                            <TableCell>{pedido.nombre}</TableCell>
                            <TableCell>{pedido.cantidad}</TableCell>
                            <TableCell>{pedido.precio}</TableCell>
                            <TableCell>{pedido.totalItem}</TableCell>
                            <TableCell><button className="boton-eliminar" onClick={() => handleEliminarPedidoWs(pedido.id)}>Eliminar</button></TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
          </div>
        )}

        <Button onPress={onOpen}>Ver Pedidos Previos</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="3xl" >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Pedidos almacenados</ModalHeader>
                <ModalBody>
                  <Table removeWrapper aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn>Nombre</TableColumn>
                      <TableColumn>Cantidad</TableColumn>
                      <TableColumn>Precio</TableColumn>
                      <TableColumn>Total</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {pedidosBD.map((pedido, index) => (
                          <TableRow key={index}>
                            <TableCell>{pedido.nombre}</TableCell>
                            <TableCell>{pedido.cantidad}</TableCell>
                            <TableCell>{pedido.precio}</TableCell>
                            <TableCell>{pedido.totalItem}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      <style jsx>{`
        .center {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .cliente-section,
        .producto-section {
          margin-bottom: 30px;
          border: 5px solid #ddd;
          padding: 15px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        table, th, td {
          border: 3px solid #ddd;
        }

        th, td {
          padding: 8px;
          text-align: left;
        }

        .boton-gris,
        .boton-guardar {
          border: 1px solid #707070;
          border-radius: 5px;
          padding: 10px;
          margin-top: 10px;
          background-color: #f4f4f4;
          color: #333;
          cursor: pointer;
        }
        
        .boton-gris:hover,
        .boton-guardar:hover {
          background-color: #ddd;
        }

        .boton-eliminar {
          border: 1px solid #707070;
          margin-top: 10px;
          background-color: #f4f4f4;
          color: #333;
          cursor: pointer;
        }

      `}</style>
    </DefaultLayout>
  );
}
