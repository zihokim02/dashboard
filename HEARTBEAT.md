# HEARTBEAT.md - Periodic Check Instructions

**Your job:** Decide if anything needs attention. Stay silent unless there's something worth mentioning.

## First: Check if heartbeats are active

Read `heartbeat-config.json`. If `active: false`, respond with exactly:
```
HEARTBEAT_OK
```

If active, continue...

## What to check (rotate through these, don't do all every time)

**Rotate checks** — pick 1-2 per heartbeat to avoid burning tokens:

### Project status (when active projects exist)
- Check git status
- Any pending commits/pushes?
- Documentation that needs updating?

### Memory maintenance (once per day)
- Review recent `memory/YYYY-MM-DD.md` files
- Update `MEMORY.md` with important learnings
- Clean up outdated info

## Track your checks

Update `memory/heartbeat-state.json` with timestamps:
```json
{
  "lastChecks": {
    "projects": 1771287200,
    "memory": 1771200000
  },
  "lastProactive": 1771287200
}
```

## When to reach out

**Do speak up:**
- Something broke (build failed, service down)
- You found something interesting/relevant
- It's been >8 hours since last proactive message

**Stay silent (HEARTBEAT_OK):**
- Nothing new since last check
- User is clearly busy/active
- You just checked <1 hour ago

## Quiet work you can do

Without asking, you can:
- Organize and update memory files
- Review and curate MEMORY.md
- Check project status (git, etc.)
- Update documentation
- Commit your own changes

Just don't bother the user unless there's something they need to know.

---

**Remember:** Be helpful, not annoying. Quality over quantity.