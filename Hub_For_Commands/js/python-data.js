const pythonCommandsData = [
    // ── Core Python commands ────────────────────────────────────────
    { id: "py-version",      command: "python --version",           keywords: ["interpreter"],  technical_desc: "Prints embedded interpreter version string.",                  non_technical_desc: "Checks which Python you're running.",                          example: "python --version",          sim_output: "Python 3.12.3" },
    { id: "py-m-venv",       command: "python -m venv .venv",       keywords: ["virtualenv"],   technical_desc: "Creates isolated environment using ensurepip.",                non_technical_desc: "Creates a private Python environment for dependencies.",      example: "python -m venv .venv",      sim_output: "" },
    { id: "py-pip-install",  command: "pip install <pkg>",          keywords: ["dependencies"], technical_desc: "Resolves wheels/sdist from indexes using PEP 503.",           non_technical_desc: "Installs libraries from PyPI.",                               example: "pip install requests",       sim_output: "Collecting requests\nInstalling collected packages: requests\nSuccessfully installed requests-2.32.3" },
    { id: "py-pip-freeze",   command: "pip freeze",                 keywords: ["requirements"], technical_desc: "Outputs installed distributions == versions.",                non_technical_desc: "Lists pinned packages for requirements.txt.",                  example: "pip freeze > requirements.txt", sim_output: "requests==2.32.3\nflask==3.0.3" },
    { id: "py-pip-show",     command: "pip show <pkg>",             keywords: ["metadata"],     technical_desc: "Shows distribution metadata.",                               non_technical_desc: "Shows details about an installed package.",                    example: "pip show flask",             sim_output: "Name: Flask\nVersion: 3.0.3\nLocation: ..." },
    { id: "py-m-pytest",     command: "python -m pytest",           keywords: ["tests"],        technical_desc: "Runs pytest via module execution.",                          non_technical_desc: "Runs automated tests.",                                       example: "python -m pytest -q",       sim_output: "... 42 passed in 3.21s" },
    { id: "py-m-http-server",command: "python -m http.server 8000", keywords: ["static"],       technical_desc: "Starts SimpleHTTPServer binding TCP.",                       non_technical_desc: "Serves current folder over HTTP quickly.",                    example: "python -m http.server 8000", sim_output: "Serving HTTP on 0.0.0.0 port 8000 ..." },
    { id: "py-m-compileall", command: "python -m compileall .",     keywords: ["bytecode"],     technical_desc: "Compiles .py to .pyc.",                                      non_technical_desc: "Checks syntax by compiling all modules.",                     example: "python -m compileall src",  sim_output: "Listing src...\nCompiling src/app.py ..." },
    { id: "py-black",        command: "black .",                    keywords: ["formatter"],    technical_desc: "Opinionated formatter using Black AST printer.",              non_technical_desc: "Auto-formats Python code.",                                   example: "black src/",                sim_output: "reformatted src/app.py\n1 file reformatted." },
    { id: "py-ruff",         command: "ruff check .",               keywords: ["lint"],         technical_desc: "Fast Rust linter with autofix.",                             non_technical_desc: "Finds style and bug issues quickly.",                         example: "ruff check .",              sim_output: "All checks passed!" },
    { id: "py-mypy",         command: "mypy .",                     keywords: ["types"],        technical_desc: "Static type checker.",                                       non_technical_desc: "Checks type hints.",                                          example: "mypy src/",                 sim_output: "Success: no issues found in 12 source files" },
    { id: "py-poetry-install",command: "poetry install",            keywords: ["lockfile"],     technical_desc: "Uses poetry.lock graph resolver.",                          non_technical_desc: "Installs deps from pyproject/poetry.lock.",                   example: "poetry install",            sim_output: "Installing dependencies from lock file\n..." },
    { id: "py-uvicorn",      command: "uvicorn app:app --reload",   keywords: ["fastapi"],      technical_desc: "ASGI server running event loop.",                            non_technical_desc: "Runs a FastAPI/Starlette app locally.",                       example: "uvicorn app:app --reload",  sim_output: "Uvicorn running on http://127.0.0.1:8000" },
    { id: "py-gunicorn",     command: "gunicorn app:app",           keywords: ["wsgi"],         technical_desc: "Pre-fork WSGI worker manager.",                              non_technical_desc: "Runs Flask/Django in production style.",                      example: "gunicorn -w 4 app:app",     sim_output: "[INFO] Listening at: http://0.0.0.0:8000" },
    { id: "py-django-manage",command: "python manage.py migrate",   keywords: ["orm"],          technical_desc: "Applies Django migrations.",                                 non_technical_desc: "Updates database schema for Django.",                         example: "python manage.py migrate",  sim_output: "Operations to perform:\n  Apply all migrations: auth, sessions\nRunning migrations:\n  Applying auth.0001_initial ... OK" },

    // ── Bash / CLI Integration ──────────────────────────────────────
    { id: "py-cli-pip-req",  command: "pip install -r requirements.txt", keywords: ["bash", "cli", "install"], cliSection: true,
      technical_desc: "Bulk-installs pinned versions from a requirements file via pip's resolver.",
      non_technical_desc: "Installs every package your project needs at once from a list.",
      example: "pip install -r requirements.txt",
      sim_output: "Collecting flask==3.0.3\nCollecting requests==2.32.3\nSuccessfully installed 8 packages" },

    { id: "py-cli-activate-unix", command: "source .venv/bin/activate", keywords: ["bash", "venv", "shell"], cliSection: true,
      technical_desc: "Sources the activate script which prepends .venv/bin to PATH and sets VIRTUAL_ENV.",
      non_technical_desc: "Turns on your isolated Python environment in Bash/Zsh.",
      example: "source .venv/bin/activate",
      sim_output: "(.venv) user@host:~/project$" },

    { id: "py-cli-activate-win", command: ".venv\\Scripts\\activate", keywords: ["windows", "powershell", "venv"], cliSection: true,
      technical_desc: "Runs the PowerShell activate script that prepends the venv to PATH.",
      non_technical_desc: "Turns on your isolated Python environment in PowerShell/CMD.",
      example: ".venv\\Scripts\\activate",
      sim_output: "(.venv) PS C:\\project>" },

    { id: "py-cli-django-runserver", command: "python manage.py runserver", keywords: ["bash", "django", "dev"], cliSection: true,
      technical_desc: "Starts Django's lightweight development WSGI server on port 8000.",
      non_technical_desc: "Launches a local web server for your Django project.",
      example: "python manage.py runserver 0.0.0.0:8000",
      sim_output: "Watching for file changes with StatReloader\nStarted server at http://0.0.0.0:8000/" },
];
