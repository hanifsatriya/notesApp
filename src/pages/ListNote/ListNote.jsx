import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { encryptNote, decryptNote } from '../../utils/encrypt'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ListNotePage = () => {

    const notes = [
        { id: 1, title: 'Note 1' },
        { id: 2, title: 'Note 2' },
        { id: 3, title: 'Note 3' },
        // Add more notes as needed
      ];

    const navigation = useNavigation()
    const [data, setData] = useState(notes)

    useEffect(() => {
        // getData()
    },[])

    const getData = async () => {
        try {
            const dataNote = await AsyncStorage.getItem('notes')
            if (dataNote !== null) {
                const listNote = decryptNote(dataNote)
                setData(listNote)
            } 
        } catch (e) {
            console.log('async storage failed : ', e)
        }
    }

    const renderNote = item => {
        return (
            <TouchableOpacity style={styles.noteItem}>
                <Text style={styles.noteTitle}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    // const decryptMessage = () => {
    //     const bedahMessage = decryptNote(encMessage)
    //     setMessage(bedahMessage)
    // }
    return data && data.length > 0 ? (
        <View style={styles.container}>
           <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => renderNote(item)}
            />
             <TouchableOpacity style={styles.floatingButton}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    ) : (
        <View style={styles.emptyContainer}>
            <Text style={styles.textEmpty}>Notes is empty</Text>
            <TouchableOpacity style={styles.floatingButton}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems:'center',
        width: 110,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#b05ede'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textEmpty: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000'
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Android only, adds a shadow
      },
    buttonText: {
        color: 'white',
        fontSize: 40,
    },
    noteItem: {
        backgroundColor: 'white',
        marginBottom: 8,
        padding: 16,
        borderRadius: 8,
    },
    noteTitle: {
        fontSize: 18,
        color: '#000'
    },
})

export default ListNotePage