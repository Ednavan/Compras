import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, BackHandler } from 'react-native';

const App = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  const handleAddProduct = () => {
    const newProduct = {
      name: productName,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
    };

    setProducts([...products, newProduct]);
    setProductName('');
    setProductPrice('');
    setProductQuantity('');
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const handleExit = () => {
    Alert.alert(
      'Confirmação',
      'Deseja sair da aplicação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ textAlign: 'center' ,fontSize: 30, fontWeight: 'bold', marginBottom: 16 }}>Lista de Compras</Text>

      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TextInput
          style={{ flex: 1, marginRight: 8, padding: 8, borderWidth: 1 }}
          placeholder="Produto"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={{ flex: 1, marginRight: 8, padding: 8, borderWidth: 1 }}
          placeholder="Valor"
          value={productPrice}
          onChangeText={setProductPrice}
        />
        <TextInput
          style={{ flex: 1, marginRight: 2, padding: 10, borderWidth: 1 }}
          placeholder="Quantidade"
          value={productQuantity}
          onChangeText={setProductQuantity}
        />
        <TouchableOpacity
          style={{ padding: 8, backgroundColor: 'blue', justifyContent: 'center' }}
          onPress={handleAddProduct}
        >
          <Text style={{ color: 'white' }}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Text style={{ flex: 1 }}>{item.name}</Text>
            <Text style={{ flex: 1 }}>{item.price.toFixed(2)}</Text>
            <Text style={{ flex: 1 }}>{item.quantity}</Text>
            <Text style={{ flex: 1 }}>{(item.price * item.quantity).toFixed(2)}</Text>
            <TouchableOpacity
              style={{ padding: 8, backgroundColor: 'red', justifyContent: 'center', marginRight: 8 }}
              onPress={() => handleDeleteProduct(index)}
            >
              <Text style={{ color: 'white' }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
        Total a pagar: R$ {getTotalPrice().toFixed(2)}
      </Text>

      <TouchableOpacity
        style={{ padding: 8, backgroundColor: 'gray', justifyContent: 'center', marginTop: 16 }}
        onPress={handleExit}
      >
        <Text style={{ textAlign: 'center', color: 'white' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
