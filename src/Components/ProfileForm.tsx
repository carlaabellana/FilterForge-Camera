import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { style } from "./styles";
import { useState } from "react";

{/* Para definir los tipos de las props que recibe el componente y para que el TypeScript sepa qué datos se esperan,
    he decidido poner una interficie */}
interface ProfileFormProps {
  setName: (text: string) => void;
  setNickname: (text: string) => void;
  setDescription: (text: string) => void;
  setAvatar: (emoji: string) => void;
  Tname: string;
  setTName: (text: string) => void;
  Tnickname: string;
  setTNickname: (text: string) => void;
  Tdescription: string;
  setTDescription: (text: string) => void;
  Tavatar: string;
}

export default function ProfileForm(props : ProfileFormProps) {
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const separated = props.Tdescription.split('\n');
    //console.log(separated);
    setLines(separated.length);

    if (separated.length > 5) {
      separated.pop();
      props.setTDescription(separated.join('\n'));
    }
    for (let i = 0; i < separated.length; i++) {
      //console.log(separated[i].length);
      if (separated[i] === '') {
        setLines((prev) => prev - 1);
      }
      
      if ((separated[i] === '' && separated[i-1] === '' && i > 0)) {
        separated.pop();
        props.setTDescription(separated.join('\n'));
      }
    }

  }, [props.Tdescription]);

  // Para comprobar que todos los requisitos pedidos en el enunciado se cumplen, o no, se realiza lo siguiente:
  const validar = () => {

    // Validación del nombre no esté vacío.
    if (props.Tname.length == 0) {
      return Alert.alert("Tienes que poner un nombre de usuario 👺");
    }

    // Validación del nombre máximo 50 caracteres.
    if (props.Tname.length > 50) {
      return Alert.alert("El nombre no puede superar 50 caracteres 👺");
    }

    //Validación del nickname no esté vacío.
    if (props.Tnickname.length == 0) {
      return Alert.alert("Tienes que poner un apodo! 👺");
    }

    // Se separa la descripción por líneas, porque se nos pide que sean máximo 5.
    const lineas = props.Tdescription.split("\n");

    // Validación de que se cumplan máximo 5 líneas.
    if (lineas.length > 5) {
      return Alert.alert("La descripción no puede tener más de 5 líneas 👺");
    }

    // Validación de que ninguna línea de la descripción puede estar vacía.
    if (lineas.some(l => l.trim() === "")) {
      return Alert.alert("No puede haber líneas vacías en la descripción 👺");
    }

    // Mensaje de que todo está correcto.
    Alert.alert("✨ Todo correcto ✨");
    //console.log("Perfil validado correctamente");
    props.setName(props.Tname);
    props.setNickname(props.Tnickname);
    props.setDescription(props.Tdescription);
    props.setAvatar(props.Tavatar);

  };

  
  return (
    <View style={style.formContainer}>
      {/* View del título para que el usuario introduzca los credenciales necesarios*/}
      <View style={style.formTitleContainer}>
        <Text style={style.formTitleText}>Información del Perfil</Text>
      </View>

      {/* Padding para encajar el contenido del contenedor de la mejor manera
      y para que quede bien el título anterior.*/}
      <View style={style.formInner}>
        <View style={style.labelRow}>
          <Text style={style.label}>Nombre*:</Text>
          <Text style={[style.charCount, {color: props.Tname.length < 37 ? '#DE9E84' : props.Tname.length < 50 ? '#FF9F68' : '#EC6A6A'}]}>{props.Tname.length}/50 </Text>
        </View>
        <TextInput 
          style={style.input} 
          placeholder="Mi nombre es..." 
          value={props.Tname} 
          onChangeText={props.setTName} 
          maxLength={50}/>
        
        {/* Fila con el título "Apodo" a la izquierda y contador de caracteres a la derecha */}
        <View style={style.labelRow}>
          <Text style={style.label}>Apodo:</Text>
          {/* El color de las letras introducidas van cambiando según llegan al límite de 20.*/}
          <Text style={[style.charCount, { color: props.Tnickname.length < 15 ? '#DE9E84' : props.Tnickname.length < 20 ? '#FF9F68' : '#EC6A6A'}]}>{props.Tnickname.length}/20 </Text>
        </View>

        {/* Como aquí se valida que el input máximo es de 20 (maxLength), no lo añado en la función anterior.*/}
        <TextInput 
          style={style.input} 
          placeholder="Mi apodo es..." 
          value={props.Tnickname} 
          onChangeText={props.setTNickname} 
          maxLength={20}/>

        <View style={style.labelRow}>
          <Text style={style.label}>Descripción:</Text>
          <Text style={[style.charCount, {color: lines < 4 ? '#DE9E84' : lines < 5 ? '#FF9F68' : '#EC6A6A'}]}>{lines}/5 </Text>
        </View>

        <TextInput 
          style={[style.input, style.textarea]}
          placeholder="Así soy yo!"
          value={props.Tdescription}
          onChangeText={props.setTDescription}
          multiline
        />

        {/* Botón para la validación del perfil introducido por el usuario*/}
        <TouchableOpacity style={style.button} onPress={validar}>
          <Text style={style.buttonText}>Validar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}