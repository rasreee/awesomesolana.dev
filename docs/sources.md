# Sources Notes

## Todo
- [ ] migrate frontend to pull data from new `sources` model instead of the `github` api directly
  - [ ] get initial payload of Github API repos data and load them into Supabase
  - [ ] test frontend with mock data
- [ ] cron job for saving Github repos to our database
  - [ ] traverses Solana Github repos and creates new rows to `sources` table for unseen repos and updates existing ones if necessary
  - [ ] initializes a row in `sources-meta` table for that source
  - [ ] runs every day