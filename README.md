## Todo

Create script to create Db:
  - Set index on visitorId
  - Set index on coordiates
  - Set TTL for every document

Add `readCount` prop to `MessagePacket`:
  - Delete document after 5 reads

Get all messages within X radius
  - Display on map

Make map prettier

Shift zoom buttons on map to lower right


## Summary

Save text messages along with GPS coords.

People can see them only when nearby.

Only up to 5 people can see each message.

Message is deleted after.

All messages have a TTL of 5 days.