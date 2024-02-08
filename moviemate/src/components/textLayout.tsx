import React from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { useState } from 'react';

interface Props {
    // Define the props for your component here
    color?: string;
}

interface TestObject {
    id: string;
    info: string;
    name: string;
}

const TextLayout: React.FC<Props> = (props) => {
    const [testObjectList, setTestObjectList] = useState<TestObject[]>([]);
    const testCollectionRef = collection(db, "test");

    const getTestObject = async () => {
        console.log("Getting test object");
        try {
            const data = await getDocs(testCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(), 
                id: doc.id,
                info: doc.data().info,
                name: doc.data().name
            }));
            console.log(filteredData);
            setTestObjectList(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <button onClick={getTestObject}>Get test object</button>
            {testObjectList.map((testObject) => (
                <p style={{ color: props.color }}> {testObject?.name} sier {testObject?.info} </p>
            ))}
        </div>
    );
};

export default TextLayout;
