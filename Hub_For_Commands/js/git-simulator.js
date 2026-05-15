document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('command-search');
    const commandList = document.getElementById('command-list');
    const bashInput = document.getElementById('bash-input');
    const bashOutput = document.getElementById('bash-output');
    
    // Details panel elements
    const detailTitle = document.getElementById('detail-title');
    const detailCommand = document.getElementById('detail-command');
    const detailTech = document.getElementById('detail-tech');
    const detailNonTech = document.getElementById('detail-nontech');
    const placeholderMsg = document.getElementById('detail-placeholder');
    const detailContent = document.getElementById('detail-content');

    // Simulator State
    let isRepoInitialized = false;

    // Initialize list
    function renderList(commands) {
        commandList.innerHTML = '';
        commands.forEach(cmd => {
            const li = document.createElement('li');
            li.className = 'command-item';
            li.innerHTML = `<strong>${cmd.command.split(' ')[0]} ${cmd.command.split(' ')[1] || ''}</strong> - ${cmd.non_technical_desc.substring(0, 50)}...`;
            li.addEventListener('click', () => selectCommand(cmd));
            commandList.appendChild(li);
        });
    }

    function selectCommand(cmd) {
        // Update UI
        placeholderMsg.style.display = 'none';
        detailContent.style.display = 'block';
        
        detailTitle.textContent = cmd.command.split(' ')[0] + ' ' + (cmd.command.split(' ')[1] || '');
        detailCommand.textContent = cmd.example;
        detailTech.textContent = cmd.technical_desc;
        detailNonTech.textContent = cmd.non_technical_desc;

        // Auto-fill bash input to encourage trying it
        bashInput.value = cmd.example;
        bashInput.focus();
        
        // Highlight active list item
        document.querySelectorAll('.command-item').forEach(item => item.classList.remove('active'));
        // We'd need to find the specific li, but simpler to just let user see details
    }

    // Search Logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = gitCommandsData.filter(cmd => {
                return cmd.command.toLowerCase().includes(term) ||
                       cmd.keywords.some(k => k.toLowerCase().includes(term)) ||
                       cmd.non_technical_desc.toLowerCase().includes(term);
            });
            renderList(filtered);
        });
    }

    // Bash Simulator Logic
    if (bashInput) {
        bashInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const inputCmd = bashInput.value.trim();
                if (!inputCmd) return;

                // Echo the command
                appendOutput(`$ ${inputCmd}`);
                bashInput.value = '';

                // Process command
                processBashCommand(inputCmd);
            }
        });
    }

    function processBashCommand(inputStr) {
        const lowerInput = inputStr.toLowerCase();
        
        // Clear command
        if (lowerInput === 'clear') {
            bashOutput.innerHTML = '';
            return;
        }

        // Must start with git
        if (!lowerInput.startsWith('git ')) {
            appendOutput(`bash: ${inputStr.split(' ')[0]}: command not found\nType a git command to test.`);
            return;
        }

        const parts = lowerInput.split(' ');
        const mainAction = parts[1]; // e.g., 'init', 'commit'

        // Basic state checks
        if (mainAction === 'init') {
            isRepoInitialized = true;
        } else if (mainAction === 'clone') {
            isRepoInitialized = true;
        }

        if (!isRepoInitialized && mainAction !== 'init' && mainAction !== 'clone' && mainAction !== 'help') {
            appendOutput("fatal: not a git repository (or any of the parent directories): .git\nHint: Try 'git init' first!");
            return;
        }

        // Find matching mock output
        const matchedData = gitCommandsData.find(cmd => cmd.command.startsWith(`git ${mainAction}`));
        
        if (matchedData) {
            // Add a small delay for realism
            setTimeout(() => {
                appendOutput(matchedData.sim_output || 'Command executed successfully.');
                bashOutput.scrollTop = bashOutput.scrollHeight;
            }, 300);
        } else {
            appendOutput(`git: '${mainAction}' is not a git command. See 'git --help'.`);
        }
    }

    function appendOutput(text) {
        const div = document.createElement('div');
        div.className = 'bash-line';
        // Handle newlines
        div.innerHTML = text.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        bashOutput.appendChild(div);
        bashOutput.scrollTop = bashOutput.scrollHeight;
    }

    // Initial render
    if (typeof gitCommandsData !== 'undefined') {
        renderList(gitCommandsData);
    }
});
