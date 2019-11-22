import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Form } from 'react-final-form'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import TextField from 'client/components/TextField'
import MessageList from 'client/components/MessageList'

const ADD_MESSAGE = gql`
  mutation AddMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      author
      text
    }
  }
`

const NewMessage = styled.div`
  display: flex;
  flex-direction: column;
`
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 20px);
  padding: 8px;
`

const App = () => {
  const [addMessage] = useMutation(ADD_MESSAGE)

  return (
    <PageWrapper>
      <MessageList />
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
              <TextField name="author" label="Nom" />
              <TextField name="text" label="Message" multiline rows={4} />
              <Button variant="contained" type="submit">
                submit
              </Button>
            </NewMessage>
          </form>
        )}
      </Form>
    </PageWrapper>
  )
}

export default App
