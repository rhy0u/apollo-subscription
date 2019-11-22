import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Form } from 'react-final-form'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import TextField from 'client/components/TextField'
import MessageList from 'client/components/MessageList'
import { required } from 'client/utils/validators'

const ADD_MESSAGE = gql`
  mutation AddMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      author
      text
    }
  }
`

const GET_MESSAGES = gql`
  query GetMessages {
    messages(limit: 5) {
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
  const { data, loading } = useQuery(GET_MESSAGES)
  const [addMessage] = useMutation(ADD_MESSAGE)

  return (
    <PageWrapper>
      {!loading && <MessageList lastMessages={data.messages} />}
      <Form
        onSubmit={async values => {
          await addMessage({
            variables: {
              message: values,
            },
          })
        }}
      >
        {({ handleSubmit, hasValidationErrors }) => (
          <form onSubmit={handleSubmit}>
            <NewMessage>
              <TextField name="author" label="Nom" validate={required} />
              <TextField
                name="text"
                label="Message"
                multiline
                rows={4}
                validate={required}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={hasValidationErrors}
              >
                Envoyer le message
              </Button>
            </NewMessage>
          </form>
        )}
      </Form>
    </PageWrapper>
  )
}

export default App
