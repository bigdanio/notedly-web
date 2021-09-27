import React, { useState } from 'react'; import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div` 
    height: 100%;
`;

const Form = styled.form` 
    height: 100%;
`;

const TextArea = styled.textarea` 
    width: 100%;
    height: 90%;
`;

const NoteForm = props => {
    // Domyślne informacje o stanie dla formularza.
    const [value, setValue] = useState({ content: props.content || '' });

    // Uaktualnienie informacji o stanie, gdy użytkownik modyfikuje formularz.
    const onChange = event => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Wrapper>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    props.action({
                        variables: {
                            ...value
                        }
                    });
                }} >
                <TextArea
                    required
                    type="text"
                    name="content"
                    placeholder="Treść notatki"
                    value={value.content}
                    onChange={onChange}
                />
                <Button type="submit">Zapisz</Button>
            </Form>
        </Wrapper>
    );
};

export default NoteForm;