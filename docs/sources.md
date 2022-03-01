# Sources Notes

## Todo
- [ ] cron job for saving Github repos to our database
  - [ ] traverses Solana Github repos and creates new rows to `sources` table for unseen repos and updates existing ones if necessary
  - [ ] initializes a row in `sources-meta` table for that source
  - [ ] runs every day