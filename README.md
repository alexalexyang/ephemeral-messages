## Todo

Add `readCount` prop to `MessagePacket`:
  - Delete document after 5 reads

If count === 4, delete message (current user is 5th reader)

If count < 4, update count

Style messages


## Summary

Save text messages along with GPS coords.

People can see them only when nearby.

Only up to 5 people can see each message.

Message is deleted after.

All messages have a TTL of 5 days.