import React, { useState } from 'react';
import {
    View, Text,  TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Tags from 'react-native-tags';


interface TagInputProps {
    label?: string;
    tags: string[]; // Array of tags passed as props
    placeholder?: string;
    onUpdateTags: (tags: string[]) => void; // Function to update the tags in parent component
}

const TagInput: React.FC<TagInputProps> = ({
    label = 'Input:',
    tags: initialTags,
    placeholder = 'Add a tag',
    onUpdateTags 
}) => {

    //const [inputHeader, setInputHeader] = useState(label);
    const [tags, setTags] = useState(initialTags);
    const [text, setText] = useState('');

    const [editIndex, setEditIndex] = useState<number | null>(null);

    const addTag = () => {
        if (text.trim() !== '') {
            if (editIndex !== null) {

                // If editing an existing tag 
                const newTags = [...tags];
                newTags[editIndex] = text.trim();
                setTags(newTags);
                setEditIndex(null);
            } else {

                // If adding a new tag 
                setTags([...tags, text.trim()]);
                onUpdateTags([...tags, text.trim()]); // Update tags in parent component
            }
            setText('');
        }
    };

    const removeTag = (index: number) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
        onUpdateTags(newTags); // Update tags in parent component
    };

    const editTag = (index: number) => {
        const tagToEdit = tags[index];
        setText(tagToEdit);
        setEditIndex(index);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{label}</Text>
            <View style={styles.tagContainer}>
                {tags.map((tag, index) => (
                    <View 
                        key={index}
                        style={styles.tagWrapper}>
                        <TouchableOpacity
                            // onPress={() => editTag(index)}
                            onPress={() => removeTag(index)}
                            style={styles.tag}>
                            <Text style={styles.tagText}>
                                {tag}
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={() => removeTag(index)}
                            style={styles.removeButton}>
                            <Text style={styles.removeButtonText}>
                                X
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                ))}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={addTag}
                />
                
            </View>
            <View style={styles.inputContainer}>
            <TouchableOpacity onPress={addTag}
                    style={styles.addButton}>
                    <Text style={styles.buttonText}>
                        {editIndex !== null ? 'Update' : 'Add'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TagInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 0,
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
        textAlign: "left",
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    tagWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginRight: 5,
    },
    tag: {
        backgroundColor: '#FFA8BA',
        padding: 8,
        margin: 4,
        borderRadius: 8,
    },
    tagText: {
        color: "black",
        fontSize: 14,
        marginBottom: 2,
        textAlign: "left",
    },
    removeButton: {
        marginLeft: 5,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#FA5246',
    },
    removeButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        width: "80%",
        borderColor: "#D8DDDB",
        //backgroundColor: "#FFFFFE",
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 5,
    },
    addButton: {
        textAlign: "center",
        backgroundColor: "#FAAE2B",
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 20,
    },
    buttonText: {
        textAlign: "center",
        color: "#00332C",
        backgroundColor: "#FAAE2B",
        fontSize: 16,
    },
});
