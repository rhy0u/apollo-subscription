import React, { useState, useEffect } from 'react'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'

const ADDED_MESSAGE = gql`
  subscription addedMessage {
    addedMessage {
      id
      author
      text
    }
  }
`

const ADD_MESSAGE = gql`
  mutation AddMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      author
      text
    }
  }
`

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  overflow: scroll;
`
const NewMessage = styled.div`
  display: flex;
  flex-direction: column;
`

const Message = styled.div`
  border: 1px solid black;
  border-radius: 5px;
`

const App = () => {
  const { data } = useSubscription(ADDED_MESSAGE)

  const [addMessage] = useMutation(ADD_MESSAGE)

  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (data && data.addedMessage)
      setMessages(prevMessages => [...prevMessages, data.addedMessage])
  }, [data])
  return (
    <div>
      <MessagesList>
        {messages.map(message => (
          <Message key={message.id}>
            <span>{message.author}</span>
            <p>{message.text}</p>
          </Message>
        ))}
      </MessagesList>
      <Form
        onSubmit={async values => {
          await addMessage({
            variables: {
              message: values,
            },
          })
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <NewMessage>
              <Field name="author" component="input" />
              <Field name="text" component="textarea" />
              <button type="submit">submit</button>
            </NewMessage>
          </form>
        )}
      </Form>
    </div>
  )
}

export default App
