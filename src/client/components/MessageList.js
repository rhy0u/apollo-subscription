import React, { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'

const ADDED_MESSAGE = gql`
  subscription addedMessage {
    addedMessage {
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
  const { data } = useSubscription(ADDED_MESSAGE)
  const classes = useStyles()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (data && data.addedMessage)
      setMessages(prevMessages => [...prevMessages, data.addedMessage])
  }, [data])

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
