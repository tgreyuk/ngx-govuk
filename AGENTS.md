# Agent instructions

Guidance for AI coding agents working in this repository.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/)
(`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`). Release tooling
reads them to decide version bumps and changelog entries.

### AI attribution

Mark work done with an AI coding agent with a single trailer at the end of the
commit message:

```
Assisted-by: Claude Code
```

The trailer names the tool, with no email address.

Do not use `Co-Authored-By` for an AI tool. Git and GitHub treat that trailer
as a second author and list it as a contributor, but a tool can't take
responsibility for a change. The person who reviews and pushes the change is
its only author.

Pull request descriptions carry no AI attribution: no "Generated with …"
footer and no `Assisted-by:` trailer. The trailer goes in commit messages only;
this file is the project's disclosure that AI agents work here.
