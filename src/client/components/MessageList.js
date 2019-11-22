import React, { useState, useEffect, useRef } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { List, ListItem, ListItemText, Divider } from '@material-ui/core'
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
    overflow: 'scroll',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    ':nth-child(odd)': {
      backgroundColor: '#F7F7F7',
    },
  },
})

const MessageList = ({ lastMessages = [] }) => {
  const { data } = useSubscription(ADDED_MESSAGE)
  const classes = useStyles()
  const [messages, setMessages] = useState(lastMessages)
  const ref = useRef(null)

  useEffect(() => {
    if (data?.addedMessage)
      setMessages(prevMessages => [...prevMessages, data.addedMessage])
  }, [data])

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight
  }, [messages])

  return (
    <List className={classes.list} ref={ref}>
      {messages.map((message, index) => (
        <div key={message.id}>
          <ListItem>
            <ListItemText primary={message.author} secondary={message.text} />
          </ListItem>
          {index !== messages.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  )
}

export default MessageList
