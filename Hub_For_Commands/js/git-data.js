const gitCommandsData = [
    {
        id: "git-init",
        command: "git init",
        keywords: ["start", "create", "new", "begin", "repository", "initialize", "setup"],
        technical_desc: "Creates an empty Git repository or reinitializes an existing one. It generates the .git directory structure, including the objects database, the refs directory for heads and tags, and the initial HEAD file.",
        non_technical_desc: "Think of this as creating a new, empty folder and telling Git 'Watch this folder for changes.' It's the very first step to start tracking a project.",
        example: "git init",
        sim_output: "Initialized empty Git repository in /project/.git/"
    },
    {
        id: "git-clone",
        command: "git clone <url>",
        keywords: ["download", "copy", "get", "retrieve", "github", "url", "remote"],
        technical_desc: "The primary tool for obtaining a local copy of a remote repository. It retrieves the entire history, creates remote-tracking branches for every branch in the source, and checks out an initial branch.",
        non_technical_desc: "This is like downloading a complete copy of someone else's project folder from the internet to your computer, so you can work on it.",
        example: "git clone https://github.com/user/repo.git",
        sim_output: "Cloning into 'repo'...\nremote: Enumerating objects: 15, done.\nremote: Counting objects: 100% (15/15), done.\nremote: Compressing objects: 100% (12/12), done.\nReceiving objects: 100% (15/15), done."
    },
    {
        id: "git-status",
        command: "git status",
        keywords: ["check", "state", "what changed", "current", "info", "modified"],
        technical_desc: "The primary interrogation tool for the working tree and index. It categorizes files into three states: staged for commit, modified but not staged, and untracked.",
        non_technical_desc: "This asks Git 'What's the current situation?' It tells you which files you've changed, which ones are ready to be saved, and which ones Git isn't tracking yet.",
        example: "git status",
        sim_output: "On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n\tmodified:   index.html\n\nno changes added to commit (use \"git add\" and/or \"git commit -a\")"
    },
    {
        id: "git-add",
        command: "git add <file>",
        keywords: ["stage", "prepare", "track", "ready", "include"],
        technical_desc: "Moves content from the working tree to the index (staging area). It captures the state of a file at the moment the command is run. Use '.' to add all changes.",
        non_technical_desc: "This is like putting items into a shipping box. You're telling Git 'Get these specific changes ready to be saved in the next snapshot.'",
        example: "git add .",
        sim_output: ""
    },
    {
        id: "git-commit",
        command: "git commit -m \"message\"",
        keywords: ["save", "snapshot", "record", "checkpoint", "history"],
        technical_desc: "Finalizes the staged changes by creating a new commit object in the database. This object points to a tree object, includes metadata, and establishes parent links to preserve history.",
        non_technical_desc: "This seals the shipping box and puts a label on it. It permanently saves the changes you prepared with 'git add' into the project's history.",
        example: "git commit -m \"Update index layout\"",
        sim_output: "[main 3b1a2c4] Update index layout\n 1 file changed, 5 insertions(+), 2 deletions(-)"
    },
    {
        id: "git-push",
        command: "git push",
        keywords: ["upload", "send", "publish", "share", "remote", "online"],
        technical_desc: "Transmits local commits to a remote repository. It uses refspecs to determine which local branches update which remote branches. Standard pushes require a fast-forward.",
        non_technical_desc: "This uploads your saved snapshots from your computer to the internet (like GitHub) so other people can see them and use them.",
        example: "git push origin main",
        sim_output: "Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nWriting objects: 100% (3/3), 320 bytes | 320.00 KiB/s, done.\nTotal 3 (delta 2), reused 0 (delta 0)\nTo https://github.com/user/repo.git\n   a1b2c3d..3b1a2c4  main -> main"
    },
    {
        id: "git-pull",
        command: "git pull",
        keywords: ["download", "update", "sync", "fetch", "merge", "latest"],
        technical_desc: "A composite command that executes git fetch and then immediately merges (or rebases) the fetched commits into the current local branch.",
        non_technical_desc: "This checks the internet (like GitHub) for any new updates that your team members might have made, downloads them, and combines them with your files.",
        example: "git pull",
        sim_output: "Updating a1b2c3d..4d5e6f7\nFast-forward\n style.css | 12 +++++++++---\n 1 file changed, 9 insertions(+), 3 deletions(-)"
    },
    {
        id: "git-branch",
        command: "git branch",
        keywords: ["list", "lines", "paths", "versions", "parallel"],
        technical_desc: "The utility for managing branch pointers. It allows users to list existing branches, create new ones at any commit, or delete merged branches. A branch is a lightweight movable pointer.",
        non_technical_desc: "Shows you the different parallel versions of your project. Imagine it as different timelines where you can try new things without breaking the main version.",
        example: "git branch",
        sim_output: "* main\n  feature-login\n  bugfix-header"
    },
    {
        id: "git-switch",
        command: "git switch <branch>",
        keywords: ["change", "move", "checkout", "switch", "timeline"],
        technical_desc: "A modern, intent-based command introduced to handle branch switching specifically. It updates the working tree and HEAD to match the specified branch.",
        non_technical_desc: "This lets you jump between the different parallel versions (branches) of your project. Like switching from the 'main' timeline to the 'feature-login' timeline.",
        example: "git switch feature-login",
        sim_output: "Switched to branch 'feature-login'"
    },
    {
        id: "git-checkout",
        command: "git checkout <branch>",
        keywords: ["change", "move", "switch", "restore", "legacy"],
        technical_desc: "Historically the most versatile tool for context switching and file restoration. Overloaded to switch branches, check out tags, or restore files.",
        non_technical_desc: "The older way to switch between different timelines. It can also be used to undo changes to a file.",
        example: "git checkout feature-login",
        sim_output: "Switched to branch 'feature-login'"
    },
    {
        id: "git-merge",
        command: "git merge <branch>",
        keywords: ["combine", "join", "integrate", "bring together"],
        technical_desc: "The standard tool for joining two or more lines of development. It identifies the most recent common ancestor and performs a three-way merge.",
        non_technical_desc: "This takes the work you did in one timeline (branch) and combines it into your current timeline. It's how you bring a finished feature back into the main project.",
        example: "git merge feature-login",
        sim_output: "Updating 3b1a2c4..8f9e0d1\nFast-forward\n login.html | 45 +++++++++++++++++++++++++++++++++\n 1 file changed, 45 insertions(+)"
    },
    {
        id: "git-log",
        command: "git log",
        keywords: ["history", "past", "commits", "timeline", "who did what"],
        technical_desc: "The primary lens into the commit history. It traverses the history graph to display commits, which can be filtered by date, author, or commit message content.",
        non_technical_desc: "This shows you the complete history of all the saved snapshots in your project, telling you who made changes, when they did it, and what they changed.",
        example: "git log --oneline",
        sim_output: "8f9e0d1 Add login form layout\n3b1a2c4 Update index layout\na1b2c3d Initial commit"
    },
    {
        id: "git-help",
        command: "git help <command>",
        keywords: ["manual", "docs", "documentation", "how to"],
        technical_desc: "The primary mechanism for accessing documentation. Users can view manuals in man (-m), info (-i), or web (-w) formats.",
        non_technical_desc: "The built-in instruction manual for Git. Use it anytime you need to remember how a specific command works.",
        example: "git help push",
        sim_output: "GIT-PUSH(1)\nNAME\n       git-push - Update remote refs along with associated objects..."
    },
    {
        id: "git-bugreport",
        command: "git bugreport",
        keywords: ["diagnostic", "issue", "report", "error"],
        technical_desc: "A diagnostic tool that compiles a comprehensive environment report, including Git version, OS metadata, and active hooks, to assist in the submission of bugs.",
        non_technical_desc: "Creates a detailed report about your Git setup so you can easily ask for help if something is broken.",
        example: "git bugreport",
        sim_output: "Created new report at 'git-bugreport-2026-05-15.txt'."
    },
    {
        id: "git-rm",
        command: "git rm <file>",
        keywords: ["delete", "remove", "trash"],
        technical_desc: "Manages the removal of files. Removes it from both the disk and the index, staging the deletion for the next commit. --cached removes from tracking only.",
        non_technical_desc: "Deletes a file and tells Git 'I want to save the fact that I deleted this file'.",
        example: "git rm old_file.txt",
        sim_output: "rm 'old_file.txt'"
    },
    {
        id: "git-mv",
        command: "git mv <old> <new>",
        keywords: ["rename", "move", "change name"],
        technical_desc: "A convenience utility that renames or moves a file and automatically stages the change.",
        non_technical_desc: "Renames a file or moves it to a new folder, while automatically telling Git to remember the change.",
        example: "git mv file.txt docs/file.txt",
        sim_output: ""
    },
    {
        id: "git-notes",
        command: "git notes add -m \"msg\"",
        keywords: ["attach", "metadata", "extra info"],
        technical_desc: "Provides a mechanism to attach supplementary information to any Git object (typically commits) without altering the object itself.",
        non_technical_desc: "Lets you stick a post-it note onto a past snapshot without actually changing the snapshot itself.",
        example: "git notes add -m \"Needs review\"",
        sim_output: ""
    },
    {
        id: "git-stash",
        command: "git stash",
        keywords: ["hide", "save for later", "temporary", "pause"],
        technical_desc: "Provides a temporary storage area for local modifications when a developer must switch tasks before their work is ready to commit. Changes are pushed onto a stack.",
        non_technical_desc: "Takes all your messy, unfinished work and sweeps it under the rug so you have a clean slate to work on something else temporarily.",
        example: "git stash",
        sim_output: "Saved working directory and index state WIP on main: 3b1a2c4 Update index layout"
    },
    {
        id: "git-worktree",
        command: "git worktree add <path>",
        keywords: ["multiple", "simultaneous", "checkouts"],
        technical_desc: "Allows a single repository to support multiple simultaneous checkouts. Invaluable for long-running tasks without cloning the whole repo.",
        non_technical_desc: "Lets you work on two different timelines (branches) at the exact same time in two different folders on your computer.",
        example: "git worktree add ../hotfix main",
        sim_output: "Preparing worktree (checking out 'main')"
    },
    {
        id: "git-rebase",
        command: "git rebase <branch>",
        keywords: ["rewrite", "transplant", "linear", "history"],
        technical_desc: "Replays a sequence of commits on top of a new base tip. This 'transplantation' logic effectively rewrites history to create a linear path.",
        non_technical_desc: "Takes your timeline and physically moves it so it starts from the tip of another timeline, making the history look like a straight line.",
        example: "git rebase main",
        sim_output: "Successfully rebased and updated refs/heads/feature-login."
    },
    {
        id: "git-cherry-pick",
        command: "git cherry-pick <commit>",
        keywords: ["copy", "extract", "single", "grab"],
        technical_desc: "Extracts the changes introduced by a specific existing commit and applies them as a new commit on the current branch.",
        non_technical_desc: "Grabs one specific snapshot from another timeline and copies it into your current timeline.",
        example: "git cherry-pick 8f9e0d1",
        sim_output: "[feature-branch 45a6b7c] Add login form layout\n 1 file changed, 45 insertions(+)"
    },
    {
        id: "git-mergetool",
        command: "git mergetool",
        keywords: ["conflict", "visual", "gui", "resolve"],
        technical_desc: "A wrapper that launches external graphical merge utilities to help resolve complex conflicts difficult to manage in text editors.",
        non_technical_desc: "Opens a visual program to help you fix situations where two people changed the exact same line of code.",
        example: "git mergetool",
        sim_output: "Merging:\nlogin.html\n\nNormal merge conflict for 'login.html':\n  {local}: modified file\n  {remote}: modified file\nHit return to start merge resolution tool..."
    },
    {
        id: "git-diff",
        command: "git diff",
        keywords: ["compare", "changes", "what changed", "difference"],
        technical_desc: "A multi-purpose comparison tool showing changes between working tree and index, commits, or files. Uses algorithms like patience or histogram.",
        non_technical_desc: "Shows you the exact lines of code that have been added or removed since your last save.",
        example: "git diff",
        sim_output: "diff --git a/index.html b/index.html\n--- a/index.html\n+++ b/index.html\n@@ -10,3 +10,4 @@\n <body>\n+  <h1>Welcome</h1>\n </body>"
    },
    {
        id: "git-show",
        command: "git show <commit>",
        keywords: ["view", "inspect", "details"],
        technical_desc: "Displays the contents and metadata of any Git object. For a commit, it outputs the log message and the full patch.",
        non_technical_desc: "Shows you all the details of a specific snapshot, including exactly what code was changed.",
        example: "git show HEAD",
        sim_output: "commit 3b1a2c4...\nAuthor: Dev <dev@example.com>\nDate:   Fri May 15 10:00:00 2026\n\n    Update index layout\n\n..."
    },
    {
        id: "git-blame",
        command: "git blame <file>",
        keywords: ["who", "author", "accountability", "line"],
        technical_desc: "Annotates each line of a file with the commit OID and author of the last modification. The ultimate accountability tool.",
        non_technical_desc: "Tells you exactly who wrote every single line in a file and when they did it. Great for finding out who introduced a bug!",
        example: "git blame index.html",
        sim_output: "3b1a2c4 (Dev 2026-05-15 10:00:00 1) <!DOCTYPE html>\n..."
    },
    {
        id: "git-bisect",
        command: "git bisect start",
        keywords: ["search", "find bug", "regression", "binary"],
        technical_desc: "Implements a binary search algorithm to find the specific commit that introduced a regression by checking out intermediate commits.",
        non_technical_desc: "A search wizard that helps you hunt down exactly which past update broke your code by testing older versions automatically.",
        example: "git bisect start",
        sim_output: "status: waiting for both good and bad commits"
    },
    {
        id: "git-reflog",
        command: "git reflog",
        keywords: ["recover", "lost", "undo", "safety net"],
        technical_desc: "A local-only log recording the movement of HEAD and branch pointers. Allows recovery of commits unreferenced by rebases/resets.",
        non_technical_desc: "The ultimate undo history. It remembers every move you've made, letting you recover 'lost' work even if you deleted a branch.",
        example: "git reflog",
        sim_output: "3b1a2c4 HEAD@{0}: commit: Update index layout\na1b2c3d HEAD@{1}: commit (initial): Initial commit"
    },
    {
        id: "git-remote",
        command: "git remote -v",
        keywords: ["servers", "urls", "connections", "network"],
        technical_desc: "The management tool for remote configurations. Tracks URLs, configures default branches, and prunes stale tracking branches.",
        non_technical_desc: "Manages the list of internet servers (like GitHub URLs) that your local project is connected to.",
        example: "git remote -v",
        sim_output: "origin  https://github.com/user/repo.git (fetch)\norigin  https://github.com/user/repo.git (push)"
    },
    {
        id: "git-fetch",
        command: "git fetch",
        keywords: ["download", "get latest", "sync without merge"],
        technical_desc: "Downloads objects and refs from a remote. Non-destructive; updates local remote-tracking branches but does not touch local working branches.",
        non_technical_desc: "Downloads all the latest updates from the internet server, but doesn't actually mix them into your current files yet.",
        example: "git fetch",
        sim_output: "From https://github.com/user/repo\n   3b1a2c4..4d5e6f7  main       -> origin/main"
    },
    {
        id: "git-submodule",
        command: "git submodule add <url>",
        keywords: ["dependency", "nested", "project in project"],
        technical_desc: "Allows a repository to be nested inside another. Fixed to specific commit OIDs to ensure superproject points to compatible dependency versions.",
        non_technical_desc: "Lets you put someone else's complete Git project folder inside your own project folder as a dependency.",
        example: "git submodule add https://github.com/other/lib.git",
        sim_output: "Adding existing repo at 'lib' to the index"
    },
    {
        id: "git-format-patch",
        command: "git format-patch -1",
        keywords: ["email", "export", "file diff"],
        technical_desc: "Transforms a series of commits into a sequence of email-ready text files, including commit message, diff, and metadata.",
        non_technical_desc: "Packages up your saved changes into neat text files so you can email them to other developers.",
        example: "git format-patch HEAD~1",
        sim_output: "0001-Update-index-layout.patch"
    },
    {
        id: "git-send-email",
        command: "git send-email *.patch",
        keywords: ["mail", "smtp", "send"],
        technical_desc: "Transmits generated patches via an SMTP server to avoid whitespace/encoding corruption from GUI mail clients.",
        non_technical_desc: "Sends the patch files you created directly through email without breaking their formatting.",
        example: "git send-email 0001-*.patch",
        sim_output: "Send this email? [y/N] "
    },
    {
        id: "git-am",
        command: "git am < patch.txt",
        keywords: ["apply mail", "import"],
        technical_desc: "Reads patches from an mbox or Maildir, applies the changes, and creates new commits with original metadata intact.",
        non_technical_desc: "Takes an emailed patch file and officially imports it into your project as a new saved snapshot.",
        example: "git am 0001-Update-index-layout.patch",
        sim_output: "Applying: Update index layout"
    },
    {
        id: "git-apply",
        command: "git apply patch.txt",
        keywords: ["patch", "test patch", "diff"],
        technical_desc: "A primitive patch tool applying a diff directly to the working tree. Does not create commits, ideal for testing.",
        non_technical_desc: "Applies the changes from a patch file directly to your files without officially saving a snapshot yet.",
        example: "git apply fix.patch",
        sim_output: ""
    },
    {
        id: "git-request-pull",
        command: "git request-pull <base> <url>",
        keywords: ["notify", "summary", "pr"],
        technical_desc: "Generates a human-readable summary of changes, intended to be emailed to a maintainer to notify them a branch is ready to pull.",
        non_technical_desc: "Generates a nice summary letter you can send to a project leader asking them to download your work.",
        example: "git request-pull v1.0 https://github.com/user/repo",
        sim_output: "The following changes since commit 123...:\n..."
    },
    {
        id: "git-hash-object",
        command: "git hash-object -w <file>",
        keywords: ["plumbing", "sha1", "database", "core"],
        technical_desc: "PLUMBING: Computes the SHA-1 hash of a file. With -w, writes the resulting blob into the Git database.",
        non_technical_desc: "Low-level tool: Takes a file and turns it into a raw data object in Git's hidden database.",
        example: "echo 'test' | git hash-object -w --stdin",
        sim_output: "9daeafb9864cf43055ae93beb0afd6c7d144bfa4"
    },
    {
        id: "git-cat-file",
        command: "git cat-file -p <hash>",
        keywords: ["plumbing", "inspect", "raw data", "core"],
        technical_desc: "PLUMBING: Interrogation primitive. Reports type (-t), size (-s), or pretty-printed content (-p) of any object.",
        non_technical_desc: "Low-level tool: Lets you peek directly into Git's hidden database to see raw data.",
        example: "git cat-file -p HEAD",
        sim_output: "tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904\nauthor Dev <dev@example.com> 1620000000 +0000\n..."
    },
    {
        id: "git-write-tree",
        command: "git write-tree",
        keywords: ["plumbing", "tree", "index", "core"],
        technical_desc: "PLUMBING: Captures current index state and creates a tree object. Prerequisite for creating commit plumbing-style.",
        non_technical_desc: "Low-level tool: Takes whatever is in your staging area and freezes it into a 'tree' object in the database.",
        example: "git write-tree",
        sim_output: "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
    },
    {
        id: "git-commit-tree",
        command: "git commit-tree <tree>",
        keywords: ["plumbing", "commit", "core"],
        technical_desc: "PLUMBING: Creates a commit object requiring a tree OID and parent OIDs.",
        non_technical_desc: "Low-level tool: Manually creates a new snapshot from a frozen tree of files.",
        example: "echo 'msg' | git commit-tree 4b825d...",
        sim_output: "f3a2b1c4..."
    },
    {
        id: "git-update-index",
        command: "git update-index",
        keywords: ["plumbing", "index", "core", "staging"],
        technical_desc: "PLUMBING: Low-level interface to staging area. Allows bit manipulation like --assume-unchanged or --skip-worktree.",
        non_technical_desc: "Low-level tool: Directly manipulates the staging area, used for advanced tasks like ignoring tracked files locally.",
        example: "git update-index --assume-unchanged file.txt",
        sim_output: ""
    },
    {
        id: "git-update-ref",
        command: "git update-ref <ref> <hash>",
        keywords: ["plumbing", "pointers", "core", "branch"],
        technical_desc: "PLUMBING: Safely updates a branch pointer or other reference handling locking to prevent race conditions.",
        non_technical_desc: "Low-level tool: Safely forces a branch pointer to point to a specific snapshot hash.",
        example: "git update-ref refs/heads/main HEAD",
        sim_output: ""
    },
    {
        id: "git-symbolic-ref",
        command: "git symbolic-ref HEAD",
        keywords: ["plumbing", "head", "core"],
        technical_desc: "PLUMBING: Manages references pointing to other references rather than raw OIDs. Commonly manages HEAD.",
        non_technical_desc: "Low-level tool: Changes where special pointers like 'HEAD' are currently pointing.",
        example: "git symbolic-ref HEAD refs/heads/main",
        sim_output: ""
    },
    {
        id: "git-for-each-ref",
        command: "git for-each-ref",
        keywords: ["plumbing", "iterate", "refs", "core"],
        technical_desc: "PLUMBING: Highly flexible iteration tool listing references according to user-defined format.",
        non_technical_desc: "Low-level tool: A powerful way to loop through all your branches and tags to extract specific data.",
        example: "git for-each-ref --format='%(refname)'",
        sim_output: "refs/heads/main\nrefs/tags/v1.0"
    },
    {
        id: "git-rev-parse",
        command: "git rev-parse HEAD",
        keywords: ["plumbing", "swiss army knife", "resolve", "core"],
        technical_desc: "PLUMBING: The 'Git Swiss Army Knife'. Resolves human-readable names into raw hashes or queries repo info.",
        non_technical_desc: "Low-level tool: Translates words like 'HEAD' or branch names into their actual complex hash IDs.",
        example: "git rev-parse HEAD",
        sim_output: "3b1a2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0"
    },
    {
        id: "git-ls-files",
        command: "git ls-files",
        keywords: ["plumbing", "list", "index", "core"],
        technical_desc: "PLUMBING: Lists files in the index and working directory, identifying staged, unstaged, and ignored files.",
        non_technical_desc: "Low-level tool: Shows every single file that Git currently knows about.",
        example: "git ls-files",
        sim_output: "index.html\nstyle.css\nscript.js"
    },
    {
        id: "git-ls-tree",
        command: "git ls-tree HEAD",
        keywords: ["plumbing", "list", "tree", "core"],
        technical_desc: "PLUMBING: Lists contents of a tree object, providing a directory snapshot at a specific point in time.",
        non_technical_desc: "Low-level tool: Shows what files looked like inside a specific folder at a specific point in history.",
        example: "git ls-tree HEAD",
        sim_output: "100644 blob 9dae... index.html\n040000 tree 4b82... css"
    },
    {
        id: "git-diff-index",
        command: "git diff-index HEAD",
        keywords: ["plumbing", "compare", "tree", "core"],
        technical_desc: "PLUMBING: Compares a tree object directly against the index or the working tree.",
        non_technical_desc: "Low-level tool: Compares a specific snapshot directly against what you have staged.",
        example: "git diff-index HEAD",
        sim_output: ":100644 100644 9dae... 0000... M index.html"
    },
    {
        id: "git-read-tree",
        command: "git read-tree <tree>",
        keywords: ["plumbing", "read", "tree", "core"],
        technical_desc: "PLUMBING: Reads contents of a tree object into the index, 'preparing' the staging area with a previous state.",
        non_technical_desc: "Low-level tool: Loads an entire folder's history directly into your staging area.",
        example: "git read-tree HEAD",
        sim_output: ""
    },
    {
        id: "git-checkout-index",
        command: "git checkout-index -a",
        keywords: ["plumbing", "checkout", "index", "core"],
        technical_desc: "PLUMBING: Copies files from the index into the working tree, bypassing standard branch switching logic.",
        non_technical_desc: "Low-level tool: Extracts files straight from the staging area onto your hard drive.",
        example: "git checkout-index -a",
        sim_output: ""
    },
    {
        id: "git-gc",
        command: "git gc",
        keywords: ["garbage", "cleanup", "optimize", "maintenance"],
        technical_desc: "The master maintenance utility. Cleans up unreachable objects, packs loose objects into packfiles, and optimizes refs.",
        non_technical_desc: "Runs maintenance to clean up junk data and make your Git repository run faster and take up less space.",
        example: "git gc",
        sim_output: "Enumerating objects: 125, done.\nCounting objects: 100% (125/125), done.\n..."
    },
    {
        id: "git-repack",
        command: "git repack -a -d",
        keywords: ["pack", "compress", "maintenance"],
        technical_desc: "Sub-utility of gc reorganizing the object database. Creates new packfiles and applies delta compression.",
        non_technical_desc: "Compresses all your project files into highly efficient bundles to save disk space.",
        example: "git repack -d",
        sim_output: "Nothing new to pack."
    },
    {
        id: "git-fsck",
        command: "git fsck",
        keywords: ["check", "integrity", "corrupt", "maintenance"],
        technical_desc: "Performs deep audit of object database to ensure integrity. Identifies dangling blobs and corrupted objects.",
        non_technical_desc: "Scans your entire repository looking for corrupted files or broken history links.",
        example: "git fsck",
        sim_output: "Checking object directories: 100% (256/256), done."
    },
    {
        id: "git-count-objects",
        command: "git count-objects -v",
        keywords: ["stats", "size", "maintenance"],
        technical_desc: "Provides statistical summary of object database, including loose object count and disk space consumed.",
        non_technical_desc: "Tells you exactly how many files Git is tracking internally and how much space they take up.",
        example: "git count-objects -v",
        sim_output: "count: 0\nsize: 0\nin-pack: 125..."
    },
    {
        id: "git-prune",
        command: "git prune",
        keywords: ["delete", "unreachable", "maintenance"],
        technical_desc: "Permanently removes objects not reachable from any reference. Usually managed by gc.",
        non_technical_desc: "Permanently deletes any orphaned data that Git is no longer actively using.",
        example: "git prune",
        sim_output: ""
    },
    {
        id: "git-daemon",
        command: "git daemon",
        keywords: ["server", "hosting", "tcp", "public"],
        technical_desc: "Lightweight TCP server serving repositories over git:// protocol. Efficient read-only access, lacks auth.",
        non_technical_desc: "Starts a very fast, read-only server so people can easily download your code over the network.",
        example: "git daemon --export-all",
        sim_output: "Ready to rumble"
    },
    {
        id: "git-http-backend",
        command: "git http-backend",
        keywords: ["server", "hosting", "http", "cgi"],
        technical_desc: "CGI program providing 'smart' Git-over-HTTP services for fetch/push via Apache/Nginx.",
        non_technical_desc: "The backend engine that lets web servers like Apache serve Git repositories over standard HTTP.",
        example: "git http-backend",
        sim_output: "Status: 500 Internal Server Error"
    },
    {
        id: "git-shell",
        command: "git shell",
        keywords: ["server", "hosting", "ssh", "security"],
        technical_desc: "Restricted login shell for SSH users limiting them to Git commands, preventing full shell access.",
        non_technical_desc: "A security tool for servers that ensures users connecting via SSH can only run Git commands and nothing else.",
        example: "git shell",
        sim_output: "fatal: What do you think I am? A shell?"
    },
    {
        id: "git-receive-pack",
        command: "git receive-pack",
        keywords: ["server", "hosting", "push"],
        technical_desc: "Server-side counterpart to push. Receives stream of objects and updates references.",
        non_technical_desc: "The server process that catches the data when you run 'git push' from your computer.",
        example: "git receive-pack .",
        sim_output: "0000"
    },
    {
        id: "git-upload-pack",
        command: "git upload-pack",
        keywords: ["server", "hosting", "fetch"],
        technical_desc: "Server-side counterpart to fetch. Determines missing client objects and bundles them.",
        non_technical_desc: "The server process that bundles up the data and sends it when you run 'git fetch' or 'git pull'.",
        example: "git upload-pack .",
        sim_output: "0000"
    },
    {
        id: "git-scalar",
        command: "git scalar",
        keywords: ["performance", "large repo", "microsoft", "experimental"],
        technical_desc: "Configures a repo with opinionated, performance-oriented defaults (sparse-checkout, bg maintenance) for massive repos.",
        non_technical_desc: "A super-charger for massive repositories containing millions of files, automatically setting up performance tweaks.",
        example: "git scalar register",
        sim_output: "Successfully registered repository."
    },
    {
        id: "git-maintenance",
        command: "git maintenance start",
        keywords: ["background", "optimize", "experimental"],
        technical_desc: "Framework for background tasks scheduling periodic prefetch and commit-graph jobs to speed up graph traversals.",
        non_technical_desc: "Tells Git to automatically clean and optimize your repository in the background while you work.",
        example: "git maintenance start",
        sim_output: "git maintenance started successfully."
    },
    {
        id: "git-last-modified",
        command: "git last-modified",
        keywords: ["log", "performance", "experimental"],
        technical_desc: "High-performance replacement for certain log workflows identifying recent commits touching specific paths.",
        non_technical_desc: "An experimental, super-fast way to find exactly when a specific file was last changed.",
        example: "git last-modified index.html",
        sim_output: "3b1a2c4"
    },
    {
        id: "git-history",
        command: "git history",
        keywords: ["rebase", "simplify", "experimental"],
        technical_desc: "Simplifies common history editing tasks. Standalone reword/split operations without interactive rebase complexity.",
        non_technical_desc: "An experimental, simpler way to edit past commit messages or split large commits without complex rebase operations.",
        example: "git history reword",
        sim_output: "Rewording commit..."
    },
    {
        id: "git-replay",
        command: "git replay",
        keywords: ["rebase", "performance", "experimental"],
        technical_desc: "Performance-oriented tool for replaying commits onto new base without requiring a checked-out working tree.",
        non_technical_desc: "An experimental, ultra-fast version of rebase designed for server-side automation.",
        example: "git replay --onto main feature-branch",
        sim_output: "Replaying commits..."
    },
    {
        id: "git-backfill",
        command: "git backfill",
        keywords: ["partial clone", "download", "experimental"],
        technical_desc: "Targets partial clones, allowing download of missing objects based on revision/pathspec to fill sparse history.",
        non_technical_desc: "An experimental tool used to fetch the rest of the history if you originally only downloaded part of a repository.",
        example: "git backfill --path docs/",
        sim_output: "Fetching missing objects for docs/..."
    }
];
