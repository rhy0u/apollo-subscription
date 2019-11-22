import React, { useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'

const ADDED_MESSAGE = gql`
  subscription AddedMessage {
    addedMessage {
      id
      author
      text
    }
  }
`

const LAST_MESSAGES = gql`
  query LastMessages {
    lastMessages(limit: 2) {
      id
      author
      text
    }
  }
`

const useStyles = makeStyles({
  list: {
    flex: '1',
  },
})

const MessageList = () => {
  const { data: addedMessage } = useSubscription(ADDED_MESSAGE)
  const { data: lastMessages } = useQuery(LAST_MESSAGES)
  const classes = useStyles()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (lastMessages && lastMessages.lastMessages)
      setMessages(lastMessages.lastMessages)
  }, [lastMessages])

  useEffect(() => {
    if (addedMessage && addedMessage.addedMessage)
      setMessages(prevMessages => [...prevMessages, addedMessage.addedMessage])
  }, [addedMessage])

  return (
    <List className={classes.list}>
      {messages.map(message => (
        <ListItem key={message.id}>
          <ListItemText primary={message.author} secondary={message.text} />
        </ListItem>
      ))}
    </List>
  )
}

export default MessageList
