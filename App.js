import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import api from "./src/services/api";


export default function App(param) {

  const [cep, setCep] = useState('')
  const inputRef = useRef(null)
  const [CepUser,setCepUser]  = useState(null)




  async function buscar() {
    if (cep === '') {
      Alert.alert(
        "Opa!!!",
        "Voçê não digitou nenhum número",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],

      );

      setCep('')
      return


    }



    try {
      const response = await api.get(`/${cep}/json`)
setCepUser(response.data)




      Keyboard.dismiss()
    } catch (error) {


    }




    Keyboard.dismiss()
  }



  function limpar() {
    setCep('')
    inputRef.current.focus()
    setCepUser(null)
  }


  return (

    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>DIGITE O CEP DESEJADO</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 77999000"
          value={cep}
          onChangeText={(texto) => setCep(texto)} keyboardType="numeric"
          ref={inputRef}
        />
      </View>



      <View style={styles.areaBtn}>

        <TouchableOpacity style={[styles.botao, { backgroundColor: '#10A19D' }]} onPress={buscar}>
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.botao, { backgroundColor: '#FFBF00' }]} onPress={limpar}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>


      {CepUser &&
       <View style={styles.resultado}>

       <Text style={styles.itemText}>CEP: {CepUser.cep}</Text>
       <Text style={styles.itemText}>Logradouro: {CepUser.logradouro}</Text>
       <Text style={styles.itemText}>Bairro: {CepUser.bairro}</Text>
       <Text style={styles.itemText}>Cidade: {CepUser.localidade}</Text>
       <Text style={styles.itemText}>Estado: {CepUser.uf}</Text>
     </View>
      }

          
    </SafeAreaView>



  )

}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#540375'
  },

  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#ddd',
    fontFamily: 'sans-serif'
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18

  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around'
  },
  botao: {
    height: 50,
    width: 157,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  botaoText: {
    fontSize: 20,
    color: '#fff'
  },

  resultado: {
    backgroundColor: '#FF7000',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 8,
    margin: 15

  },
  itemText: {
    fontSize: 18,
    color: '#fff',

  },


})

