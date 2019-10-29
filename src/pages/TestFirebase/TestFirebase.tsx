import React, { useEffect, useRef } from 'react';
import { message } from "antd";
import { FirebaseServices } from '../../services/firebase';
import { collections } from '../../constant/FirebaseEnum';


const  Test: React.FC = () => {
    const selectRef: any = useRef(null)
    const addColecttion = (e: any): void => {
        if (e.keyCode === 13) {
            let id = Date.now()
            let newProduct = {
                id,
                name: e.target.value.toUpperCase(),
                type: '',
                createAt: new Date(),
                map: {
                    map1: 2
                }
            }
            FirebaseServices.db.collection('product').add(newProduct).then((docRef: { id: any; }) => {
                message.success(`success ${docRef.id}`, 2)
            }).catch((err: any) => {
                message.error('error', 2)
            })
        }
    }

    const getCollection = () => {
        const collection = selectRef.current.value
        FirebaseServices.db.doc('types/disscounts').get().then((docs: { data: () => void; }) => {
            message.success('success', 1)
            // debugger
            console.log(docs.data())
        }).catch((err: any) => { })
    }
    var newCityRef = FirebaseServices.db.collection("cities").doc();
    const setDocument = () => {
        class Foo {
            foo: string;
            constructor() {
                this.foo = ' bar';
            }
        }
        FirebaseServices.db.collection(collections.users).doc('admin').update({
            array: FirebaseServices.firestore.FieldValue.arrayUnion('xxx'),
            number: FirebaseServices.firestore.FieldValue.increment(50)
        }).then((res: any) => {
            message.success('V', 1)
        }).catch((err: any) => {
            message.error('e', 1)
        })

        // Add a new document with a generated id.


        // later...
        newCityRef.set({ newCityRef: Math.random() });
    }

    const queryIndex = () => {

        FirebaseServices.db.collection("users")
            .where("a", '>', 1)
            .orderBy("aa", 'asc').get().then((res: { docs: { forEach: (arg0: (e: any) => void) => void; }; }) => {
                console.log(res.docs.forEach((e: { data: () => void; }) => {
                    console.log(e.data())
                }))
                message.success('success', 1)
            }).catch((res: any) => {
                console.log(res)
            })
    }

    const handleTransaction = () => {
        // Get a new write batch
        var batch = FirebaseServices.db.batch();

        // Set the value of 'NYC'
        var nycRef = FirebaseServices.db.collection("cities").doc("NYC");
        batch.set(nycRef, { name: "New York City" });

        // Update the population of 'SF'
        var sfRef = FirebaseServices.db.collection("cities").doc("SF");
        batch.update(sfRef, { "population": 1000000 });

        // Delete the city 'LA'
        var laRef = FirebaseServices.db.collection("cities").doc("LA");
        batch.delete(laRef);

        // Commit the batch
        batch.commit().then(function (res: any) {
            // ...
            console.log(res)
        });
    }

    const handleDelete = () => {
        FirebaseServices.db.collection('users').doc('admin').delete().then((e: any) => {
            console.log(e)
        }).catch((err: any) => {
            console.log(err)
        })
    }

    return (
        <div className="Text" style={{height: '2000px'}}>
            <header className="App-header">
                Hello World!
        </header>
            <input onKeyUp={addColecttion} />
            <select ref={selectRef}>
                {Object.keys(collections).map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
            <button onClick={getCollection}>get</button>
            <button onClick={setDocument}>set</button>
            <button onClick={queryIndex}>query index</button>
            <button onClick={handleTransaction}>Transaction</button>
            <button onClick={handleDelete}>delete</button>
        </div>
    );
}

export default Test