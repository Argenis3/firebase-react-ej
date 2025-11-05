import { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../config/firebase";

//@param {string} collectionName - Nombre de la colección de Firestore
export const useFirestore = (collectionName) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Escuchar cambios en la colección de Firestore en tiempo real
    useEffect(() => {
        if (!collectionName) {
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, collectionName),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot
            q,
            (snapshot) => {
                const docs = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setDocuments(docs);
                setLoading(false);
                setError(null);
            },
            (error) => {
                console.error("Error al obtener documentos: ", error);
                setError(error.message);
                setLoading(false);
            }
        }
        );

        //cleanup listener on unmount
        return () => unsubscribe();
    }, [collectionName]);
    // Función para agregar un documento a la colección}

    const addDocument = async (data) => {
        try{
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                createdAt: new Date(),
            });
            return{success: true, id: docRef.id};
        } catch (error){
            console.error("Error al agregar documento: ", error);
            return {success: false, error: error.message};
        }
    };
    
    return {
        documents,
        loading,
        error,
        addDocument,
        deleteDocument
    }