import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button, ScrollView, Alert } from 'react-native';
import { useState } from 'react';


let esNuevo = true;
let indiceSeleccionado = -1;

export default function App() {

  let productosLista = [
    { nombre: "Doritos", categoria: "Snacks", precioCompra: 0.40, precioVenta: 0.45, id: 100 },
    { nombre: "Manicho", categoria: "Golosinas", precioCompra: 0.20, precioVenta: 0.25, id: 101 },
    { nombre: "Coca Cola", categoria: "Bebidas", precioCompra: 0.50, precioVenta: 0.60, id: 102 },
    { nombre: "Ruffles", categoria: "Snacks", precioCompra: 0.35, precioVenta: 0.45, id: 103 },
    { nombre: "Inca Kola", categoria: "Bebidas", precioCompra: 0.45, precioVenta: 0.55, id: 104 },
    { nombre: "Chocoramo", categoria: "Golosinas", precioCompra: 0.30, precioVenta: 0.40, id: 105 },
    { nombre: "Galletas Oreo", categoria: "Snacks", precioCompra: 0.25, precioVenta: 0.35, id: 106 },
    { nombre: "Agua Mineral", categoria: "Bebidas", precioCompra: 0.20, precioVenta: 0.30, id: 107 },
    { nombre: "Cheetos", categoria: "Snacks", precioCompra: 0.32, precioVenta: 0.42, id: 108 },
    { nombre: "Kinder Bueno", categoria: "Golosinas", precioCompra: 0.60, precioVenta: 0.75, id: 109 },
    { nombre: "Chicles", categoria: "Golosinas", precioCompra: 0.10, precioVenta: 0.15, id: 111 }
  ];

  //VARABLES DE ESTADO
  const [txtCodigo, setCodigo] = useState("");
  const [txtNombre, setNombre] = useState("");
  const [txtCategoria, setCategoria] = useState("");
  const [txtPrecioCompra, setPrecioCompra] = useState("");
  const [txtPrecioVenta, setPrecioVenta] = useState("");
  //const [numElementos,setNumElementos]=useState(productos.length)//para mostrar en la tabla lista
  const [productos, setProductos] = useState(productosLista)

  //MI COMPONENTE PERSONALIZADO PARA LA LISTA
  let ItemProducto = (props) => {
    return (<View style={styles.item}>
      <View style={styles.itemCodigo}><Text>{props.producto.id}</Text></View>
      <View style={styles.itemContenido}>
        <Text style={styles.textoPrincipal}>{props.producto.nombre}</Text>
        <Text style={styles.textoSecundario}>{props.producto.categoria}</Text>
      </View>
      <View style={styles.itemPrecioVenta}><Text style={styles.itemTextoPrecioVenta}>{props.producto.precioVenta}</Text></View>
      <View style={styles.itemBotones}>
        <Button
          title='E'
          color='green'
          onPress={() => {
            setCodigo(props.producto.id.toString());//convertir a tostring
            setNombre(props.producto.nombre);
            setCategoria(props.producto.categoria);
            setPrecioCompra(props.producto.precioCompra.toString());
            setPrecioVenta(props.producto.precioVenta.toString());
            indiceSeleccionado=props.indice;
            esNuevo = false;
          }}
        />
        <Button
          title='X'
          color='red'
          onPress={() => {
            eliminarItem(props.indice);
          }}
        />
      </View>
    </View>
    )
  };
  //convertir int
  let convertirINT = (txt) => {
    return parseInt(txt)
  };
  let convertirFloat = (txt) => {
    return parseFloat(txt)
  }

  //funcion guardar
  let guardarProducto = () => {

    if (esNuevo == true) {
      if (validarCampos()) {
        if (existeCodigo(txtCodigo)) {
          Alert.alert("Aviso", "Este codigo ya existe " + txtCodigo);
        } else {
          let producto = {
            id: convertirINT(txtCodigo),
            nombre: txtNombre,
            categoria: txtCategoria,
            precioCompra: convertirFloat(txtPrecioCompra),
            precioVenta: convertirFloat(txtPrecioVenta).toFixed(2)
          };
          setProductos([...productos, producto]) // para agregar un item al final
          //setNumElementos(productos.length)//para actualizar y mostrar en la tabla
          limpiar();
        }

      } else {
        Alert.alert("Obligatorio", "Llenar todos los campos");
      }
    }else{
      let nuevaLista=[...productos];
      nuevaLista[indiceSeleccionado].nombre=txtNombre;
      nuevaLista[indiceSeleccionado].categoria=txtCategoria;
      nuevaLista[indiceSeleccionado].precioCompra=txtPrecioCompra;
      nuevaLista[indiceSeleccionado].precioVenta=txtPrecioVenta;
      setProductos(nuevaLista);
      esNuevo=true;
      limpiar();
    }
  };
  //FUNCION PARA VALIDAR SI EXISTE PRODUCTO
  let existeCodigo = (codigoProducto) => {
    for (let producto of productos) {
      if (producto.id == codigoProducto) {
        return true;
      }
    }
    return false;
  }
  //validar campos
  let validarCampos = () => {
    if (txtCodigo == "") return false;
    if (txtNombre == "") return false;
    if (txtCategoria == "") return false;
    if (txtPrecioCompra == "") return false;
    if (txtPrecioVenta == "") return false;

    return true;
  };
  //limpiar || nuevo
  let limpiar = () => {
    setCodigo("");
    setNombre("");
    setCategoria("");
    setPrecioCompra("");
    setPrecioVenta("");
    esNuevo = true;
  };
  //eliminar un item
  let eliminarItem = (indice) => {
    productos.splice(indice, 1);
    let nuevaLista = [...productos]; // copio en una nueva lista
    setProductos(nuevaLista); // guardo o actualizo con la nueva lista
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cabecera}>

          <Text style={styles.titulo}>PRODUCTOS</Text>
          <TextInput
            style={styles.cajaTexto}
            value={txtCodigo}
            placeholder='CÓDIGO'
            onChangeText={setCodigo}
            keyboardType='numeric'
            editable={esNuevo}
          />
          <TextInput
            style={styles.cajaTexto}
            value={txtNombre}
            placeholder='NOMBRE'
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.cajaTexto}
            value={txtCategoria}
            placeholder='CATEGORIA'
            onChangeText={setCategoria}
          />
          <TextInput
            style={styles.cajaTexto}
            value={txtPrecioCompra}
            placeholder='PRECIO DE COMPRA'
            onChangeText={(dato) => {
              setPrecioCompra(dato);
              let preciocomp = convertirFloat(txtPrecioCompra);
              if (isNaN(preciocomp)) {
                setPrecioVenta("");
              } else {
                let porcentaje = (preciocomp * 20) / 100;
                let total = (preciocomp + porcentaje).toFixed(2);
                setPrecioVenta(total.toString());
              }

            }}
            keyboardType='numeric'
          />
          <TextInput
            style={styles.cajaTexto}
            value={txtPrecioVenta}
            placeholder='PRECIO DE VENTA'
            onChangeText={setPrecioVenta}
            editable={false}
            keyboardType='numeric'
          />

          <View style={styles.areaBotones}>
            <Button
              title='Nuevo'
              onPress={limpiar}

            />
            <Button
              title='GUARDAR'
              onPress={() => {
                guardarProducto();
              }}
            />
            <Text>Productos: {productos.length} </Text>
          </View>

        </View>
      </ScrollView>
      <View style={styles.contenido}>

        <FlatList
          style={styles.lista}
          data={productos}
          renderItem={(objeto) => {
            return <ItemProducto
              indice={objeto.index}
              producto={objeto.item}
            />
          }}
          keyExtractor={(item) => {
            return item.id
          }}
        />

      </View>
      <View style={styles.areaPie}>
        <Text>Autor: Edwin Cusin</Text>
      </View>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  /*============================
        CONTENEDOR PADRE
  ==============================*/
  container: {
    flex: 1,
    // backgroundColor: '#a36868d3',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10
  },
  /*============================
          CABECERA
==============================*/
  cabecera: {
    // backgroundColor: '#e2ccccd3',
    flex: 1,
  },

  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 1
  },
  /*============================
            CONTENIDO
  ==============================*/
  contenido: {
    // backgroundColor: '#ffffffd3',
    flex: 40
  },
  /*============================
            PIE
  ==============================*/
  areaPie: {
    backgroundColor: '#bbbbbbd3',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10
  },
  /*============================
            listas
  ==============================*/
  lista: {
    //backgroundColor:'blue'

  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#ffe4e1',
    padding: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  textoPrincipal: {
    fontSize: 15,
    fontStyle: 'normal'
  },
  textoSecundario: {
    fontSize: 12,
    fontStyle: 'italic',

  },
  itemTextoPrecioVenta: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold'

  },
  itemBotones: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  itemCodigo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  itemContenido: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  itemPrecioVenta: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  /*============================
          caja texto
==============================*/
  cajaTexto: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginBottom: 4,

  },
  /*============================
        botones area
==============================*/
  areaBotones: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
