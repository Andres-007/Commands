/**
 * VennSolver - Application Core Logic
 * Handles interactive SVG rendering, set theory calculations, and step-by-step solution generation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Application State ---
    const state = {
        setsCount: 2,          // 2 or 3
        inputMode: 'totals',   // 'totals' or 'regions'
        enunciado: '',
        names: {
            u: 'Estudiantes',
            a: 'Física',
            b: 'Matemáticas',
            c: 'Química'
        },
        inputs: {},            // Stores user input values
        results: {},           // Stores calculated disjoint region values
        percentages: {},       // Stores region percentages
        isValid: true,
        autoCalcIntersections: true, // Automatically calculate intersections in totals mode
        autoCalcUniverse: false,     // Automatically calculate universe as the union of sets
        colors: {
            a: '#00f2fe',
            b: '#f35588',
            c: '#f9d423'
        }
    };

    // --- DOM Elements ---
    const elEnunciado = document.getElementById('input-enunciado');
    const elNameU = document.getElementById('input-name-u');
    const elNameA = document.getElementById('input-name-a');
    const elNameB = document.getElementById('input-name-b');
    const elNameC = document.getElementById('input-name-c');
    const elWrapperNameC = document.getElementById('wrapper-name-c');
    const elColorA = document.getElementById('input-color-a');
    const elColorB = document.getElementById('input-color-b');
    const elColorC = document.getElementById('input-color-c');
    const elWrapperColorC = document.getElementById('wrapper-color-c');
    const elDynamicFields = document.getElementById('dynamic-fields-container');
    const elVennForm = document.getElementById('venn-form');
    const elSvgContainer = document.getElementById('svg-canvas-container');
    const elHoverDetails = document.getElementById('hover-details');
    const elValidationAlert = document.getElementById('validation-alert');
    const elValidationErrorMsg = document.getElementById('validation-error-msg');
    const elExplanationSteps = document.getElementById('explanation-steps');
    
    // Toggles and Tabs
    const btnToggles = document.querySelectorAll('.btn-toggle');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const elModeInfoText = document.getElementById('mode-info-text');

    // Export Buttons
    const btnExportSvg = document.getElementById('btn-export-svg');
    const btnExportPng = document.getElementById('btn-export-png');

    // --- Examples Configuration ---
    const examples = {
        1: {
            setsCount: 2,
            inputMode: 'totals',
            enunciado: 'En un grupo de 100 estudiantes, 60 juegan Fútbol, 50 juegan Básquetbol y 20 practican ambos deportes.',
            names: { u: 'Alumnos', a: 'Fútbol', b: 'Básquetbol', c: 'Tenis' },
            inputs: { u: 100, a: 60, b: 50, ab: 20 }
        },
        2: {
            setsCount: 3,
            inputMode: 'totals',
            enunciado: 'Una encuesta a 120 personas indica: 65 beben Café, 55 Té y 40 Jugo. Además, 25 beben Café y Té, 20 Café y Jugo, 15 Té y Jugo, y 10 consumen las tres bebidas.',
            names: { u: 'Encuestados', a: 'Café', b: 'Té', c: 'Jugo' },
            inputs: { u: 120, a: 65, b: 55, c: 40, ab: 25, ac: 20, bc: 15, abc: 10 }
        },
        3: {
            setsCount: 3,
            inputMode: 'totals',
            enunciado: 'En una academia de 150 estudiantes: 70 hablan Inglés, 60 Francés, 50 Alemán. 30 hablan Inglés y Francés, 25 Inglés y Alemán, 20 Francés y Alemán, y 12 dominan los tres idiomas.',
            names: { u: 'Idiomas', a: 'Inglés', b: 'Francés', c: 'Alemán' },
            inputs: { u: 150, a: 70, b: 60, c: 50, ab: 30, ac: 25, bc: 20, abc: 12 }
        }
    };

    // --- Core Functions ---

    /**
     * Initializes the app with default settings
     */
    function init() {
        setupEventListeners();
        loadExample(1); // Load default example to populate visuals on start
    }

    /**
     * Set up global event handlers
     */
    function setupEventListeners() {
        // Toggle Sets Button Click
        btnToggles.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetBtn = e.target.closest('.btn-toggle');
                if (!targetBtn) return;
                
                btnToggles.forEach(b => b.classList.remove('active'));
                targetBtn.classList.add('active');
                
                state.setsCount = parseInt(targetBtn.getAttribute('data-sets'), 10);
                
                // Show/Hide C set names and colors input
                if (state.setsCount === 3) {
                    elWrapperNameC.classList.remove('hidden');
                    elWrapperColorC.classList.remove('hidden');
                } else {
                    elWrapperNameC.classList.add('hidden');
                    elWrapperColorC.classList.add('hidden');
                }
                
                updateInputFieldsUI();
            });
        });

        // Tab Mode Button Click
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                tabBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                state.inputMode = e.target.getAttribute('data-mode');
                
                // Update mode info text
                if (state.inputMode === 'totals') {
                    elModeInfoText.innerHTML = `<strong>Modo Totales:</strong> Ingresa el total de cada conjunto y sus intersecciones globales. Nosotros realizaremos las restas necesarias para calcular cada porción disjunta.`;
                } else {
                    elModeInfoText.innerHTML = `<strong>Modo Regiones:</strong> Ingresa directamente los valores específicos que corresponden exclusivamente a cada sector. No restaremos nada de estos valores.`;
                }
                
                updateInputFieldsUI();
            });
        });

        // Set name changes triggers immediate recalculations and labels update
        [elNameU, elNameA, elNameB, elNameC].forEach(el => {
            el.addEventListener('input', () => {
                state.names.u = elNameU.value.trim() || 'Universo';
                state.names.a = elNameA.value.trim() || 'A';
                state.names.b = elNameB.value.trim() || 'B';
                state.names.c = elNameC.value.trim() || 'C';
                
                // Redraw diagram labels on set name changes
                if (state.isValid) {
                    calculateAndRender();
                }
            });
        });

        // Color customization input changes
        [elColorA, elColorB, elColorC].forEach((el, index) => {
            if (!el) return;
            el.addEventListener('input', (e) => {
                const hexColor = e.target.value.toLowerCase();
                el.nextElementSibling.innerText = hexColor;
                
                if (index === 0) {
                    state.colors.a = hexColor;
                    document.documentElement.style.setProperty('--color-primary', hexColor);
                } else if (index === 1) {
                    state.colors.b = hexColor;
                    document.documentElement.style.setProperty('--color-secondary', hexColor);
                } else {
                    state.colors.c = hexColor;
                    document.documentElement.style.setProperty('--color-accent-c', hexColor);
                }
                
                // Redraw diagram
                if (state.isValid) {
                    calculateAndRender();
                }
            });
        });

        // Problem statement changes
        elEnunciado.addEventListener('input', () => {
            state.enunciado = elEnunciado.value.trim();
        });

        // Form Submission
        elVennForm.addEventListener('submit', (e) => {
            e.preventDefault();
            syncInputValues();
            calculateAndRender();
        });

        // Examples Loader click events
        document.querySelectorAll('.example-card').forEach(card => {
            card.addEventListener('click', () => {
                const exampleId = parseInt(card.getAttribute('data-example'), 10);
                loadExample(exampleId);
                // Scroll to solver section
                document.getElementById('solucionador').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Export Event Handlers
        btnExportSvg.addEventListener('click', exportAsSVG);
        btnExportPng.addEventListener('click', exportAsPNG);
    }

    /**
     * Loads a specific problem example into the UI
     */
    function loadExample(id) {
        const ex = examples[id];
        if (!ex) return;

        // Update state
        state.setsCount = ex.setsCount;
        state.inputMode = ex.inputMode;
        state.enunciado = ex.enunciado;
        state.names = { ...ex.names };
        state.inputs = { ...ex.inputs };
        state.autoCalcIntersections = false; // Custom example data has manual intersections
        state.autoCalcUniverse = false;      // Custom example data defines the Universe manually

        // Update static UI controls
        elEnunciado.value = ex.enunciado;
        elNameU.value = ex.names.u;
        elNameA.value = ex.names.a;
        elNameB.value = ex.names.b;
        elNameC.value = ex.names.c;

        // Set colors (or fallback to defaults)
        const colA = ex.colors?.a || '#00f2fe';
        const colB = ex.colors?.b || '#f35588';
        const colC = ex.colors?.c || '#f9d423';
        
        state.colors = { a: colA, b: colB, c: colC };
        
        if (elColorA) {
            elColorA.value = colA;
            elColorA.nextElementSibling.innerText = colA;
        }
        if (elColorB) {
            elColorB.value = colB;
            elColorB.nextElementSibling.innerText = colB;
        }
        if (elColorC) {
            elColorC.value = colC;
            elColorC.nextElementSibling.innerText = colC;
        }
        
        document.documentElement.style.setProperty('--color-primary', colA);
        document.documentElement.style.setProperty('--color-secondary', colB);
        document.documentElement.style.setProperty('--color-accent-c', colC);

        // Toggle Buttons
        btnToggles.forEach(btn => {
            const num = parseInt(btn.getAttribute('data-sets'), 10);
            if (num === ex.setsCount) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (state.setsCount === 3) {
            elWrapperNameC.classList.remove('hidden');
            elWrapperColorC.classList.remove('hidden');
        } else {
            elWrapperNameC.classList.add('hidden');
            elWrapperColorC.classList.add('hidden');
        }

        // Tabs
        tabBtns.forEach(btn => {
            const mode = btn.getAttribute('data-mode');
            if (mode === ex.inputMode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Build dynamically generated fields
        updateInputFieldsUI(ex.inputs);
        
        // Execute calculation
        calculateAndRender();
    }

    /**
     * Sincroniza todos los valores ingresados en los inputs dinámicos en el estado
     */
    function syncInputValues() {
        const uEl = document.getElementById('val-u');
        const aEl = document.getElementById('val-a');
        const bEl = document.getElementById('val-b');
        const cEl = document.getElementById('val-c');
        const abEl = document.getElementById('val-ab');
        const acEl = document.getElementById('val-ac');
        const bcEl = document.getElementById('val-bc');
        const abcEl = document.getElementById('val-abc');
        
        const aOnlyEl = document.getElementById('val-a_only');
        const bOnlyEl = document.getElementById('val-b_only');
        const cOnlyEl = document.getElementById('val-c_only');
        const abOnlyEl = document.getElementById('val-ab_only');
        const acOnlyEl = document.getElementById('val-ac_only');
        const bcOnlyEl = document.getElementById('val-bc_only');
        const abcOnlyEl = document.getElementById('val-abc_only');
        const noneEl = document.getElementById('val-none');

        if (uEl) state.inputs.u = parseInt(uEl.value, 10) || 0;
        if (aEl) state.inputs.a = parseInt(aEl.value, 10) || 0;
        if (bEl) state.inputs.b = parseInt(bEl.value, 10) || 0;
        if (cEl) state.inputs.c = parseInt(cEl.value, 10) || 0;
        if (abEl) state.inputs.ab = parseInt(abEl.value, 10) || 0;
        if (acEl) state.inputs.ac = parseInt(acEl.value, 10) || 0;
        if (bcEl) state.inputs.bc = parseInt(bcEl.value, 10) || 0;
        if (abcEl) state.inputs.abc = parseInt(abcEl.value, 10) || 0;
        
        if (aOnlyEl) state.inputs.a_only = parseInt(aOnlyEl.value, 10) || 0;
        if (bOnlyEl) state.inputs.b_only = parseInt(bOnlyEl.value, 10) || 0;
        if (cOnlyEl) state.inputs.c_only = parseInt(cOnlyEl.value, 10) || 0;
        if (abOnlyEl) state.inputs.ab_only = parseInt(abOnlyEl.value, 10) || 0;
        if (acOnlyEl) state.inputs.ac_only = parseInt(acOnlyEl.value, 10) || 0;
        if (bcOnlyEl) state.inputs.bc_only = parseInt(bcOnlyEl.value, 10) || 0;
        if (abcOnlyEl) state.inputs.abc_only = parseInt(abcOnlyEl.value, 10) || 0;
        if (noneEl) state.inputs.none = parseInt(noneEl.value, 10) || 0;
    }

    /**
     * Sincroniza la etiqueta informativa del panel según las configuraciones activas
     */
    function updateModeInfo() {
        if (state.autoCalcUniverse) {
            elModeInfoText.innerHTML = `<strong>Modo Unión (Universo Automático):</strong> Solo ingresa el total de cada conjunto y sus intersecciones. El Universo ($U$) se calculará automáticamente sumando todas las regiones internas disjuntas (asumiendo que no hay elementos fuera, es decir, Ninguno = 0).`;
        } else if (state.autoCalcIntersections) {
            elModeInfoText.innerHTML = `<strong>Modo Automático:</strong> Las intersecciones se calculan de forma proporcional y probabilística (modelo independiente) de forma automática.`;
        } else {
            elModeInfoText.innerHTML = `<strong>Modo Totales:</strong> Ingresa el total de cada conjunto y sus intersecciones globales. Nosotros realizaremos las restas necesarias para calcular cada porción disjunta.`;
        }
    }

    /**
     * Renders appropriate input boxes inside `#dynamic-fields-container`
     * depending on the setsCount and inputMode. Prepopulates values if provided.
     */
    function updateInputFieldsUI(predefinedValues = null) {
        elDynamicFields.innerHTML = '';
        
        const vals = predefinedValues || state.inputs;
        const sCount = state.setsCount;
        const mode = state.inputMode;
        
        const fields = [];

        if (sCount === 2) {
            if (mode === 'totals') {
                if (!state.autoCalcUniverse) {
                    fields.push(
                        { id: 'val-u', label: `Total Universo (${state.names.u})`, val: vals.u ?? 100, class: 'form-group-full' }
                    );
                }
                
                fields.push(
                    { id: 'val-a', label: `Total Conjunto A (${state.names.a})`, val: vals.a ?? 60, class: 'label-set-a' },
                    { id: 'val-b', label: `Total Conjunto B (${state.names.b})`, val: vals.b ?? 50, class: 'label-set-b' }
                );
                
                if (!state.autoCalcIntersections) {
                    fields.push(
                        { id: 'val-ab', label: `Intersección común (A ∩ B)`, val: vals.ab ?? 20, class: 'form-group-full' }
                    );
                }
            } else {
                // Regions
                fields.push(
                    { id: 'val-a_only', label: `Solo A (${state.names.a})`, val: vals.a_only ?? 40, class: 'label-set-a' },
                    { id: 'val-b_only', label: `Solo B (${state.names.b})`, val: vals.b_only ?? 30, class: 'label-set-b' },
                    { id: 'val-ab_only', label: `Solo Ambos (A ∩ B)`, val: vals.ab_only ?? 20, class: '' },
                    { id: 'val-none', label: `Ninguno (Fuera de A y B)`, val: vals.none ?? 10, class: '' }
                );
            }
        } else {
            // 3 Sets
            if (mode === 'totals') {
                if (!state.autoCalcUniverse) {
                    fields.push(
                        { id: 'val-u', label: `Total Universo (${state.names.u})`, val: vals.u ?? 120, class: 'form-group-full' }
                    );
                }
                
                fields.push(
                    { id: 'val-a', label: `Total A (${state.names.a})`, val: vals.a ?? 65, class: 'label-set-a' },
                    { id: 'val-b', label: `Total B (${state.names.b})`, val: vals.b ?? 55, class: 'label-set-b' },
                    { id: 'val-c', label: `Total C (${state.names.c})`, val: vals.c ?? 40, class: 'label-set-c' }
                );
                
                if (!state.autoCalcIntersections) {
                    fields.push(
                        { id: 'val-ab', label: `Intersección A y B (A ∩ B)`, val: vals.ab ?? 25, class: '' },
                        { id: 'val-ac', label: `Intersección A y C (A ∩ C)`, val: vals.ac ?? 20, class: '' },
                        { id: 'val-bc', label: `Intersección B y C (B ∩ C)`, val: vals.bc ?? 15, class: '' },
                        { id: 'val-abc', label: `Intersección Triple (A ∩ B ∩ C)`, val: vals.abc ?? 10, class: 'form-group-full' }
                    );
                }
            } else {
                // Regions
                fields.push(
                    { id: 'val-a_only', label: `Solo A (${state.names.a})`, val: vals.a_only ?? 30, class: 'label-set-a' },
                    { id: 'val-b_only', label: `Solo B (${state.names.b})`, val: vals.b_only ?? 25, class: 'label-set-b' },
                    { id: 'val-c_only', label: `Solo C (${state.names.c})`, val: vals.c_only ?? 15, class: 'label-set-c' },
                    { id: 'val-ab_only', label: `Solo A y B`, val: vals.ab_only ?? 15, class: '' },
                    { id: 'val-ac_only', label: `Solo A y C`, val: vals.ac_only ?? 10, class: '' },
                    { id: 'val-bc_only', label: `Solo B y C`, val: vals.bc_only ?? 5, class: '' },
                    { id: 'val-abc_only', label: `Intersección Triple (A ∩ B ∩ C)`, val: vals.abc_only ?? 10, class: '' },
                    { id: 'val-none', label: `Ninguno (Fuera de A, B y C)`, val: vals.none ?? 10, class: '' }
                );
            }
        }

        // Render inputs in container
        fields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = `form-group ${field.class || ''}`;
            
            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.className = field.class || '';
            label.innerText = field.label;
            
            const input = document.createElement('input');
            input.type = 'number';
            input.id = field.id;
            input.value = field.val;
            input.min = '0';
            
            formGroup.appendChild(label);
            formGroup.appendChild(input);
            elDynamicFields.appendChild(formGroup);

            // Add automatic recalculation on input typing
            input.addEventListener('input', () => {
                const numericInputs = elDynamicFields.querySelectorAll('input[type="number"]');
                numericInputs.forEach(inp => {
                    const val = parseInt(inp.value, 10);
                    state.inputs[inp.id.replace('val-', '')] = isNaN(val) ? 0 : val;
                });
                calculateAndRender();
            });
        });

        // Add auto-calculation switches for Totals mode
        if (mode === 'totals') {
            const switchDiv = document.createElement('div');
            switchDiv.className = 'form-group-full checkbox-group';
            switchDiv.style.display = 'flex';
            switchDiv.style.flexDirection = 'column';
            switchDiv.style.gap = '0.75rem';
            
            let intersectionsSwitchHTML = '';
            // Only show intersection calc if universe is manual
            if (!state.autoCalcUniverse) {
                intersectionsSwitchHTML = `
                    <label class="switch-container">
                        <input type="checkbox" id="chk-auto-calc" ${state.autoCalcIntersections ? 'checked' : ''}>
                        <span class="switch-slider"></span>
                        <span class="switch-label">Calcular intersecciones automáticamente</span>
                    </label>
                `;
            } else {
                intersectionsSwitchHTML = `
                    <label class="switch-container" style="opacity: 0.5; cursor: not-allowed;" title="Desactiva 'Calcular Universo automáticamente' para usar esta opción">
                        <input type="checkbox" disabled>
                        <span class="switch-slider"></span>
                        <span class="switch-label" style="font-style: italic;">Calcular intersecciones automáticamente (Desactivado)</span>
                    </label>
                `;
            }

            switchDiv.innerHTML = `
                ${intersectionsSwitchHTML}
                
                <label class="switch-container" style="margin-top: 0.25rem;">
                    <input type="checkbox" id="chk-auto-universe" ${state.autoCalcUniverse ? 'checked' : ''}>
                    <span class="switch-slider"></span>
                    <span class="switch-label">Calcular Universo automáticamente (Universo = Unión, Ninguno = 0)</span>
                </label>
            `;
            
            elDynamicFields.appendChild(switchDiv);
            
            // Toggle Switch Change Event
            const chkAuto = document.getElementById('chk-auto-calc');
            if (chkAuto && !chkAuto.disabled) {
                chkAuto.addEventListener('change', (e) => {
                    state.autoCalcIntersections = e.target.checked;
                    syncInputValues();
                    updateModeInfo();
                    updateInputFieldsUI();
                    calculateAndRender();
                });
            }

            // Toggle Universe Switch Event
            const chkUniverse = document.getElementById('chk-auto-universe');
            if (chkUniverse) {
                chkUniverse.addEventListener('change', (e) => {
                    state.autoCalcUniverse = e.target.checked;
                    
                    if (state.autoCalcUniverse) {
                        state.autoCalcIntersections = false; // Must enter intersections manually to compute Union
                    }
                    
                    syncInputValues();
                    updateModeInfo();
                    updateInputFieldsUI();
                    calculateAndRender();
                });
            }
        }
    }

    /**
     * Solves the math formulas, runs checks, renders SVG diagram and populates explanation card.
     */
    function calculateAndRender() {
        // Reset results and validation
        state.results = {};
        state.percentages = {};
        state.isValid = true;
        
        hideError();

        // 1. Solve Regions
        try {
            if (state.setsCount === 2) {
                solveTwoSets();
            } else {
                solveThreeSets();
            }

            // 2. Validate mathematical constraints (non-negativity of regions)
            validateCalculations();
            
            if (state.isValid) {
                // 3. Render Venn SVG
                renderVennSVG();
                
                // 4. Update Explanation
                generateExplanationSteps();
            }
        } catch (err) {
            showError(`Error inesperado de cálculo: ${err.message}`);
        }
    }

    /**
     * Math Solver for 2 Sets
     */
    function solveTwoSets() {
        const i = state.inputs;
        let r = {}; // Regions
        let universeSize = 0;

        if (state.inputMode === 'totals') {
            const a = i.a ?? 0;
            const b = i.b ?? 0;
            
            let ab = 0;
            if (state.autoCalcUniverse) {
                ab = i.ab ?? 0;
                
                r.ab_only = ab;
                r.a_only = a - ab;
                r.b_only = b - ab;
                r.none = 0;
                
                universeSize = r.a_only + r.b_only + r.ab_only;
                state.inputs.u = universeSize; // Keep in sync for label elements
            } else {
                const u = i.u ?? 100;
                if (state.autoCalcIntersections) {
                    ab = u > 0 ? Math.round((a * b) / u) : 0;
                    state.inputs.ab = ab; // Keep in sync for other components
                } else {
                    ab = i.ab ?? 0;
                }

                r.ab_only = ab;
                r.a_only = a - ab;
                r.b_only = b - ab;
                r.none = u - (r.a_only + r.b_only + r.ab_only);
                
                universeSize = u;
            }
        } else {
            r.a_only = i.a_only ?? 0;
            r.b_only = i.b_only ?? 0;
            r.ab_only = i.ab_only ?? 0;
            r.none = i.none ?? 0;

            universeSize = r.a_only + r.b_only + r.ab_only + r.none;
        }

        state.results = r;
        state.universeSize = universeSize;

        // Calculate Percentages
        for (const key in r) {
            state.percentages[key] = universeSize > 0 
                ? ((r[key] / universeSize) * 100).toFixed(1) 
                : '0.0';
        }
    }

    /**
     * Math Solver for 3 Sets
     */
    function solveThreeSets() {
        const i = state.inputs;
        let r = {}; // Regions
        let universeSize = 0;

        if (state.inputMode === 'totals') {
            const a = i.a ?? 0;
            const b = i.b ?? 0;
            const c = i.c ?? 0;
            
            let ab = 0, ac = 0, bc = 0, abc = 0;
            
            if (state.autoCalcUniverse) {
                ab = i.ab ?? 0;
                ac = i.ac ?? 0;
                bc = i.bc ?? 0;
                abc = i.abc ?? 0;
                
                r.abc_only = abc;
                r.ab_only = ab - abc;
                r.ac_only = ac - abc;
                r.bc_only = bc - abc;
                
                r.a_only = a - r.ab_only - r.ac_only - r.abc_only;
                r.b_only = b - r.ab_only - r.bc_only - r.abc_only;
                r.c_only = c - r.ac_only - r.bc_only - r.abc_only;
                r.none = 0;
                
                universeSize = r.a_only + r.b_only + r.c_only + r.ab_only + r.ac_only + r.bc_only + r.abc_only;
                state.inputs.u = universeSize; // Keep in sync for other components
            } else {
                const u = i.u ?? 120;
                if (state.autoCalcIntersections) {
                    ab = u > 0 ? Math.round((a * b) / u) : 0;
                    ac = u > 0 ? Math.round((a * c) / u) : 0;
                    bc = u > 0 ? Math.round((b * c) / u) : 0;
                    abc = u > 0 ? Math.round((a * b * c) / (u * u)) : 0;
                    
                    // Keep state.inputs in sync
                    state.inputs.ab = ab;
                    state.inputs.ac = ac;
                    state.inputs.bc = bc;
                    state.inputs.abc = abc;
                } else {
                    ab = i.ab ?? 0;
                    ac = i.ac ?? 0;
                    bc = i.bc ?? 0;
                    abc = i.abc ?? 0;
                }

                // Mathematical Formulas
                r.abc_only = abc;
                r.ab_only = ab - abc;
                r.ac_only = ac - abc;
                r.bc_only = bc - abc;
                
                r.a_only = a - r.ab_only - r.ac_only - r.abc_only;
                r.b_only = b - r.ab_only - r.bc_only - r.abc_only;
                r.c_only = c - r.ac_only - r.bc_only - r.abc_only;
                
                r.none = u - (r.a_only + r.b_only + r.c_only + r.ab_only + r.ac_only + r.bc_only + r.abc_only);
                
                universeSize = u;
            }
        } else {
            r.a_only = i.a_only ?? 0;
            r.b_only = i.b_only ?? 0;
            r.c_only = i.c_only ?? 0;
            r.ab_only = i.ab_only ?? 0;
            r.ac_only = i.ac_only ?? 0;
            r.bc_only = i.bc_only ?? 0;
            r.abc_only = i.abc_only ?? 0;
            r.none = i.none ?? 0;

            universeSize = r.a_only + r.b_only + r.c_only + r.ab_only + r.ac_only + r.bc_only + r.abc_only + r.none;
        }

        state.results = r;
        state.universeSize = universeSize;

        // Calculate Percentages
        for (const key in r) {
            state.percentages[key] = universeSize > 0 
                ? ((r[key] / universeSize) * 100).toFixed(1) 
                : '0.0';
        }
    }

    /**
     * Validates sets boundaries and reports inconsistencies in Spanish
     */
    function validateCalculations() {
        const r = state.results;
        
        // Check for any negative region size
        let negativeRegions = [];
        for (const region in r) {
            if (r[region] < 0) {
                negativeRegions.push(region);
            }
        }

        if (negativeRegions.length > 0) {
            state.isValid = false;
            
            let message = '';
            if (state.setsCount === 2) {
                if (r.a_only < 0) {
                    message = `La intersección A ∩ B (${state.inputs.ab}) es mayor que el conjunto A (${state.inputs.a}), lo cual resulta en un valor de Solo A negativo.`;
                } else if (r.b_only < 0) {
                    message = `La intersección A ∩ B (${state.inputs.ab}) es mayor que el conjunto B (${state.inputs.b}), lo cual resulta en un valor de Solo B negativo.`;
                } else if (r.none < 0) {
                    message = `La suma de los conjuntos (Solo A + Solo B + Intersección = ${state.inputs.a + state.inputs.b - state.inputs.ab}) supera al Universo total asignado (${state.inputs.u}).`;
                }
            } else {
                // 3 Sets
                if (r.abc_only < 0) {
                    message = `La intersección triple A ∩ B ∩ C no puede ser negativa.`;
                } else if (r.ab_only < 0 || r.ac_only < 0 || r.bc_only < 0) {
                    message = `Una de las intersecciones dobles es menor que la intersección triple (${state.inputs.abc}), lo cual es imposible.`;
                } else if (r.a_only < 0 || r.b_only < 0 || r.c_only < 0) {
                    message = `El tamaño acumulado de las intersecciones excede el total de uno de los conjuntos (A, B o C).`;
                } else if (r.none < 0) {
                    message = `La suma combinada de todas las regiones internas supera el tamaño establecido del Universo (${state.inputs.u}).`;
                }
            }
            
            showError(message || "Los datos ingresados son matemáticamente inconsistentes.");
        }
    }

    function showError(msg) {
        elValidationErrorMsg.innerText = msg;
        elValidationAlert.classList.remove('hidden');
        elSvgContainer.innerHTML = `<div class="empty-hover-state" style="padding: 2rem; color: var(--color-error);"><svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="1.5" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><p style="margin-top: 0.5rem; font-weight: 500;">Corrige los errores de consistencia en el formulario para generar el diagrama.</p></div>`;
        elExplanationSteps.innerHTML = `<p class="empty-explanation" style="color: #fca5a5;">Explicación no disponible debido a inconsistencias en los datos.</p>`;
    }

    function hideError() {
        elValidationAlert.classList.add('hidden');
    }

    /**
     * Builds and injects the interactive SVG Venn Diagram
     */
    function renderVennSVG() {
        const sCount = state.setsCount;
        const r = state.results;
        
        let svgContent = '';
        
        if (sCount === 2) {
            // --- 2 SETS GEOMETRY ---
            // Canvas: 380 x 280
            // Circle A (Turquoise): Center (145, 140), R=75
            // Circle B (Magenta): Center (235, 140), R=75
            // Universe border
            svgContent = `
            <svg id="venn-diagram-svg" viewBox="0 0 380 280" width="100%" height="100%">
                <defs>
                    <!-- Visual Circle Gradients -->
                    <radialGradient id="grad-set-a" cx="40%" cy="40%" r="60%">
                        <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0.08"/>
                    </radialGradient>
                    <radialGradient id="grad-set-b" cx="60%" cy="40%" r="60%">
                        <stop offset="0%" stop-color="var(--color-secondary)" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="var(--color-secondary)" stop-opacity="0.08"/>
                    </radialGradient>
                    
                    <!-- Drop Shadows -->
                    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
                    </filter>
                </defs>

                <!-- Universe Container Outer Box -->
                <rect x="10" y="10" width="360" height="260" rx="14" fill="rgba(255, 255, 255, 0.01)" stroke="rgba(255, 255, 255, 0.06)" stroke-width="2"/>
                <text x="25" y="32" fill="var(--color-text-muted)" font-family="var(--font-outfit)" font-size="12" font-weight="700" opacity="0.6">U = ${state.names.u}</text>
                
                <!-- Set A Circle Shape -->
                <circle id="circle-a" cx="145" cy="140" r="75" fill="url(#grad-set-a)" stroke="var(--color-primary)" stroke-width="2" class="venn-circle" style="transform-origin: 145px 140px;"/>
                <!-- Set B Circle Shape -->
                <circle id="circle-b" cx="235" cy="140" r="75" fill="url(#grad-set-b)" stroke="var(--color-secondary)" stroke-width="2" class="venn-circle" style="transform-origin: 235px 140px;"/>
                
                <!-- Set Outer Labels (Titles) -->
                <text x="90" y="50" fill="var(--color-primary)" font-family="var(--font-outfit)" font-size="14" font-weight="700" text-anchor="middle" class="venn-set-label">${state.names.a}</text>
                <text x="290" y="50" fill="var(--color-secondary)" font-family="var(--font-outfit)" font-size="14" font-weight="700" text-anchor="middle" class="venn-set-label">${state.names.b}</text>

                <!-- Interactive Region Badge Groups (Centroids) -->
                <!-- Solo A -->
                <g class="venn-label-group" data-region="a_only">
                    <circle cx="100" cy="140" r="18"/>
                    <text x="100" y="141" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="13">${r.a_only}</text>
                </g>
                
                <!-- Solo B -->
                <g class="venn-label-group" data-region="b_only">
                    <circle cx="280" cy="140" r="18"/>
                    <text x="280" y="141" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="13">${r.b_only}</text>
                </g>

                <!-- Ambos (A ∩ B) -->
                <g class="venn-label-group" data-region="ab_only">
                    <circle cx="190" cy="140" r="18"/>
                    <text x="190" y="141" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="13">${r.ab_only}</text>
                </g>

                <!-- Ninguno (Outside) -->
                <g class="venn-label-group" data-region="none">
                    <circle cx="340" cy="235" r="18"/>
                    <text x="340" y="236" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="13">${r.none}</text>
                </g>
            </svg>`;
        } else {
            // --- 3 SETS GEOMETRY ---
            // Canvas: 380 x 280
            // Circle A (Turquoise): Center (150, 120), R=68
            // Circle B (Magenta): Center (230, 120), R=68
            // Circle C (Yellow): Center (190, 185), R=68
            svgContent = `
            <svg id="venn-diagram-svg" viewBox="0 0 380 280" width="100%" height="100%">
                <defs>
                    <!-- Visual Gradients -->
                    <radialGradient id="grad-3-a" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.25"/>
                        <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0.05"/>
                    </radialGradient>
                    <radialGradient id="grad-3-b" cx="65%" cy="35%" r="65%">
                        <stop offset="0%" stop-color="var(--color-secondary)" stop-opacity="0.25"/>
                        <stop offset="100%" stop-color="var(--color-secondary)" stop-opacity="0.05"/>
                    </radialGradient>
                    <radialGradient id="grad-3-c" cx="50%" cy="75%" r="65%">
                        <stop offset="0%" stop-color="var(--color-accent-c)" stop-opacity="0.25"/>
                        <stop offset="100%" stop-color="var(--color-accent-c)" stop-opacity="0.05"/>
                    </radialGradient>
                </defs>

                <!-- Universe Container Outer Box -->
                <rect x="10" y="10" width="360" height="260" rx="14" fill="rgba(255, 255, 255, 0.01)" stroke="rgba(255, 255, 255, 0.06)" stroke-width="2"/>
                <text x="25" y="32" fill="var(--color-text-muted)" font-family="var(--font-outfit)" font-size="12" font-weight="700" opacity="0.6">U = ${state.names.u}</text>
                
                <!-- Set Circles -->
                <circle id="circle-a" cx="145" cy="115" r="68" fill="url(#grad-3-a)" stroke="var(--color-primary)" stroke-width="2" class="venn-circle" style="transform-origin: 145px 115px;"/>
                <circle id="circle-b" cx="235" cy="115" r="68" fill="url(#grad-3-b)" stroke="var(--color-secondary)" stroke-width="2" class="venn-circle" style="transform-origin: 235px 115px;"/>
                <circle id="circle-c" cx="190" cy="178" r="68" fill="url(#grad-3-c)" stroke="var(--color-accent-c)" stroke-width="2" class="venn-circle" style="transform-origin: 190px 178px;"/>
                
                <!-- Set Outer Titles -->
                <text x="90" y="45" fill="var(--color-primary)" font-family="var(--font-outfit)" font-size="14" font-weight="700" text-anchor="middle" class="venn-set-label">${state.names.a}</text>
                <text x="290" y="45" fill="var(--color-secondary)" font-family="var(--font-outfit)" font-size="14" font-weight="700" text-anchor="middle" class="venn-set-label">${state.names.b}</text>
                <text x="190" y="265" fill="var(--color-accent-c)" font-family="var(--font-outfit)" font-size="14" font-weight="700" text-anchor="middle" class="venn-set-label">${state.names.c}</text>

                <!-- Centroid Label Groups -->
                <!-- Solo A -->
                <g class="venn-label-group" data-region="a_only">
                    <circle cx="115" cy="95" r="16"/>
                    <text x="115" y="96" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="12">${r.a_only}</text>
                </g>
                
                <!-- Solo B -->
                <g class="venn-label-group" data-region="b_only">
                    <circle cx="265" cy="95" r="16"/>
                    <text x="265" y="96" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="12">${r.b_only}</text>
                </g>

                <!-- Solo C -->
                <g class="venn-label-group" data-region="c_only">
                    <circle cx="190" cy="222" r="16"/>
                    <text x="190" y="223" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="12">${r.c_only}</text>
                </g>

                <!-- Solo A y B -->
                <g class="venn-label-group" data-region="ab_only">
                    <circle cx="190" cy="85" r="16"/>
                    <text x="190" y="86" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="12">${r.ab_only}</text>
                </g>

                <!-- Solo A y C -->
                <g class="venn-label-group" data-region="ac_only">
                    <circle cx="140" cy="165" r="16"/>
                    <text x="140" y="166" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="12">${r.ac_only}</text>
                </g>

                <!-- Solo B y C -->
                <g class="venn-label-group" data-region="bc_only">
                    <circle cx="240" cy="165" r="16"/>
                    <text x="240" y="166" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="12">${r.bc_only}</text>
                </g>

                <!-- Interseccion Triple A y B y C -->
                <g class="venn-label-group" data-region="abc_only">
                    <circle cx="190" cy="138" r="16"/>
                    <text x="190" y="139" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="12">${r.abc_only}</text>
                </g>

                <!-- Ninguno (Outside) -->
                <g class="venn-label-group" data-region="none">
                    <circle cx="340" cy="235" r="16"/>
                    <text x="340" y="236" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-outfit)" font-weight="700" font-size="12">${r.none}</text>
                </g>
            </svg>`;
        }

        elSvgContainer.innerHTML = svgContent;

        // Activate Hover Interactions
        setupHoverInteractions();
    }

    /**
     * Attaches mouseenter/mouseleave events to label badges,
     * highlighting parent Venn circles and updating details card in Spanish.
     */
    function setupHoverInteractions() {
        const labels = elSvgContainer.querySelectorAll('.venn-label-group');
        const emptyState = elHoverDetails.querySelector('.empty-hover-state');
        const activeState = elHoverDetails.querySelector('.hover-active-state');
        
        // DOM details elements
        const mathTag = document.getElementById('detail-math-notation');
        const percentageTag = document.getElementById('detail-percentage');
        const titleTag = document.getElementById('detail-verbal-title');
        const descTag = document.getElementById('detail-verbal-desc');
        const valueTag = document.getElementById('detail-value');
        const unitTag = document.getElementById('detail-universe-unit');

        labels.forEach(group => {
            group.addEventListener('mouseenter', () => {
                const region = group.getAttribute('data-region');
                const val = state.results[region];
                const pct = state.percentages[region];
                
                // 1. Highlight Circles
                highlightCirclesForRegion(region);

                // 2. Fetch Texts based on State names
                const meta = getRegionMetadata(region);
                
                // 3. Fill Tooltip
                mathTag.innerText = meta.math;
                percentageTag.innerText = `${pct}%`;
                titleTag.innerText = meta.title;
                descTag.innerText = meta.desc;
                valueTag.innerText = val;
                unitTag.innerText = state.names.u;

                emptyState.classList.add('hidden');
                activeState.classList.remove('hidden');
            });

            group.addEventListener('mouseleave', () => {
                // Remove highlights
                const circles = elSvgContainer.querySelectorAll('.venn-circle');
                circles.forEach(c => {
                    c.classList.remove('highlighted');
                    c.classList.remove('dimmed');
                });

                emptyState.classList.remove('hidden');
                activeState.classList.add('hidden');
            });
        });
    }

    /**
     * Controls border width and circle translucent opacity on hover
     */
    function highlightCirclesForRegion(region) {
        const circleA = document.getElementById('circle-a');
        const circleB = document.getElementById('circle-b');
        const circleC = document.getElementById('circle-c'); // may be null in 2-set mode
        
        const all = [circleA, circleB, circleC].filter(Boolean);
        let involved = [];
        
        if (region === 'a_only') involved = [circleA];
        else if (region === 'b_only') involved = [circleB];
        else if (region === 'c_only') involved = [circleC];
        else if (region === 'ab_only') involved = [circleA, circleB];
        else if (region === 'ac_only') involved = [circleA, circleC];
        else if (region === 'bc_only') involved = [circleB, circleC];
        else if (region === 'abc_only') involved = [circleA, circleB, circleC];
        else if (region === 'none') involved = []; // none

        all.forEach(c => {
            if (involved.includes(c)) {
                c.classList.add('highlighted');
                c.classList.remove('dimmed');
            } else {
                c.classList.add('dimmed');
                c.classList.remove('highlighted');
            }
        });
    }

    /**
     * Translates mathematical notation and creates real-world text explanations in Spanish
     * substituting set A, B, and C with customized user values.
     */
    function getRegionMetadata(region) {
        const n = state.names;
        const meta = {};

        switch (region) {
            case 'a_only':
                meta.math = `A ∩ B' ${state.setsCount === 3 ? "∩ C'" : ""}`;
                meta.title = `Solo ${n.a}`;
                meta.desc = `${n.u} que pertenecen exclusivamente a ${n.a}, sin relación con ${n.b}${state.setsCount === 3 ? ` ni ${n.c}` : ''}.`;
                break;
            case 'b_only':
                meta.math = `B ∩ A' ${state.setsCount === 3 ? "∩ C'" : ""}`;
                meta.title = `Solo ${n.b}`;
                meta.desc = `${n.u} que pertenecen exclusivamente a ${n.b}, sin relación con ${n.a}${state.setsCount === 3 ? ` ni ${n.c}` : ''}.`;
                break;
            case 'c_only':
                meta.math = `C ∩ A' ∩ B'`;
                meta.title = `Solo ${n.c}`;
                meta.desc = `${n.u} que pertenecen exclusivamente a ${n.c}, sin relación con ${n.a} ni ${n.b}.`;
                break;
            case 'ab_only':
                meta.math = `A ∩ B ${state.setsCount === 3 ? "∩ C'" : ""}`;
                meta.title = state.setsCount === 3 ? `Solo ${n.a} y ${n.b}` : `${n.a} y ${n.b}`;
                meta.desc = `${n.u} en común entre ${n.a} y ${n.b}${state.setsCount === 3 ? `, excluyendo a ${n.c}` : ''}.`;
                break;
            case 'ac_only':
                meta.math = `A ∩ C ∩ B'`;
                meta.title = `Solo ${n.a} y ${n.c}`;
                meta.desc = `${n.u} en común entre ${n.a} y ${n.c}, excluyendo a ${n.b}.`;
                break;
            case 'bc_only':
                meta.math = `B ∩ C ∩ A'`;
                meta.title = `Solo ${n.b} y ${n.c}`;
                meta.desc = `${n.u} en común entre ${n.b} y ${n.c}, excluyendo a ${n.a}.`;
                break;
            case 'abc_only':
                meta.math = `A ∩ B ∩ C`;
                meta.title = `Intersección Triple`;
                meta.desc = `${n.u} que pertenecen simultáneamente a los tres conjuntos: ${n.a}, ${n.b} y ${n.c}.`;
                break;
            case 'none':
                meta.math = `(A ∪ B ${state.setsCount === 3 ? "∪ C" : ""})'`;
                meta.title = `Ninguno / Exterior`;
                meta.desc = `${n.u} que no pertenecen a ninguno de los conjuntos descritos.`;
                break;
        }

        return meta;
    }

    /**
     * Pedagogical step-by-step arithmetic explanations builder
     */
    function generateExplanationSteps() {
        const sCount = state.setsCount;
        const i = state.inputs;
        const r = state.results;
        const n = state.names;
        
        let html = '';

        if (state.inputMode === 'regions') {
            html = `
            <div class="step-item">
                <div class="step-number">i</div>
                <div class="step-body">
                    <h5>Modo Regiones Directas Activo</h5>
                    <p>En este modo, los valores son ingresados explícitamente para cada sector disjunto del diagrama de Venn. Por lo tanto, no se requiere ningún cálculo de restas aritméticas intermedias para determinar los valores disjuntos.</p>
                    <p><strong>El Universo Total ($U$)</strong> se calcula sumando directamente cada uno de los sectores:</p>
                    <div class="step-math">
                        U = ${Object.values(r).join(' + ')} = ${state.universeSize} ${n.u}
                    </div>
                </div>
            </div>`;
            elExplanationSteps.innerHTML = html;
            return;
        }

        if (sCount === 2) {
            // --- 2 Sets Step-by-Step ---
            html = `
            <!-- Paso 1 -->
            <div class="step-item">
                <div class="step-number">1</div>
                <div class="step-body">
                    <h5>Identificar el Universo y la Intersección</h5>
                    <p>Comenzamos definiendo el tamaño de nuestro Universo ($U$) y el núcleo del diagrama: la intersección común entre los dos conjuntos ($A \\cap B$).</p>
                    <div class="step-math">U = ${i.u} ${n.u}</div>
                    <div class="step-math" style="margin-left: 10px;">${n.a} ∩ ${n.b} = ${r.ab_only}</div>
                </div>
            </div>
            
            <!-- Paso 2 -->
            <div class="step-item">
                <div class="step-number">2</div>
                <div class="step-body">
                    <h5>Calcular elementos exclusivos de A (Solo ${n.a})</h5>
                    <p>Para obtener los elementos que pertenecen exclusivamente a ${n.a}, restamos la intersección común del total del conjunto A.</p>
                    <div class="step-math">Solo ${n.a} = Total ${n.a} - (${n.a} ∩ ${n.b}) = ${i.a} - ${r.ab_only} = ${r.a_only}</div>
                </div>
            </div>
            
            <!-- Paso 3 -->
            <div class="step-item">
                <div class="step-number">3</div>
                <div class="step-body">
                    <h5>Calcular elementos exclusivos de B (Solo ${n.b})</h5>
                    <p>De igual forma, restamos la intersección común del total del conjunto B para obtener la porción única de B.</p>
                    <div class="step-math">Solo ${n.b} = Total ${n.b} - (${n.a} ∩ ${n.b}) = ${i.b} - ${r.ab_only} = ${r.b_only}</div>
                </div>
            </div>
            
            <!-- Paso 4 -->
            <div class="step-item">
                <div class="step-number">4</div>
                <div class="step-body">
                    <h5>Calcular elementos exteriores (Ninguno)</h5>
                    <p>Por último, para encontrar los elementos que no corresponden a ninguno de los dos conjuntos, restamos la suma de las tres regiones internas del total del Universo.</p>
                    <div class="step-math">Ninguno = U - (Solo ${n.a} + Solo ${n.b} + Intersección)</div>
                    <div class="step-math" style="margin-top: 5px;">Ninguno = ${i.u} - (${r.a_only} + ${r.b_only} + ${r.ab_only}) = ${i.u} - ${r.a_only + r.b_only + r.ab_only} = ${r.none}</div>
                </div>
            </div>

            <!-- Paso 5 -->
            <div class="step-item" style="border-color: rgba(16, 185, 129, 0.2); background: rgba(16, 185, 129, 0.025);">
                <div class="step-number" style="background: rgba(16, 185, 129, 0.1); color: var(--color-success); border-color: rgba(16, 185, 129, 0.25);">✓</div>
                <div class="step-body">
                    <h5 style="color: var(--color-success);">Comprobación de consistencia total</h5>
                    <p>La suma de todas las regiones individuales disjuntas calculadas equivale exactamente al tamaño definido del Universo.</p>
                    <div class="step-math" style="color: var(--color-success); border-color: rgba(16, 185, 129, 0.15);">
                        ${r.a_only} (Solo ${n.a}) + ${r.b_only} (Solo ${n.b}) + ${r.ab_only} (Ambos) + ${r.none} (Ninguno) = ${r.a_only + r.b_only + r.ab_only + r.none} (Matches U = ${i.u})
                    </div>
                </div>
            </div>`;
        } else {
            // --- 3 Sets Step-by-Step ---
            html = `
            <!-- Paso 1 -->
            <div class="step-item">
                <div class="step-number">1</div>
                <div class="step-body">
                    <h5>Identificar la Intersección Triple</h5>
                    <p>En problemas de tres conjuntos, comenzamos desde el centro geométrico absoluto: el valor de elementos que pertenecen simultáneamente a los tres conjuntos ($A \\cap B \\cap C$).</p>
                    <div class="step-math">${n.a} ∩ ${n.b} ∩ ${n.c} = ${r.abc_only}</div>
                </div>
            </div>
            
            <!-- Paso 2 -->
            <div class="step-item">
                <div class="step-number">2</div>
                <div class="step-body">
                    <h5>Calcular intersecciones dobles exclusivas (Sin el tercer conjunto)</h5>
                    <p>Las intersecciones proporcionadas en el enunciado suelen ser globales (incluyen la parte triple). Debemos aislar las porciones dobles exclusivas restando la intersección triple:</p>
                    <ul>
                        <li style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 5px;">
                            <strong>Solo ${n.a} y ${n.b}</strong>: ${i.ab} - ${r.abc_only} = <strong>${r.ab_only}</strong>
                        </li>
                        <li style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 5px;">
                            <strong>Solo ${n.a} y ${n.c}</strong>: ${i.ac} - ${r.abc_only} = <strong>${r.ac_only}</strong>
                        </li>
                        <li style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 5px;">
                            <strong>Solo ${n.b} y ${n.c}</strong>: ${i.bc} - ${r.abc_only} = <strong>${r.bc_only}</strong>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Paso 3 -->
            <div class="step-item">
                <div class="step-number">3</div>
                <div class="step-body">
                    <h5>Calcular porciones exclusivas de un solo conjunto</h5>
                    <p>Para hallar los elementos que pertenecen únicamente a un conjunto, tomamos su total y le restamos todas las intersecciones dobles y triples en las que participa:</p>
                    <ul>
                        <li style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 8px;">
                            <strong>Solo ${n.a}</strong> = Total ${n.a} - (Solo A y B) - (Solo A y C) - (Triple) <br>
                            <div class="step-math" style="margin-top: 3px;">${i.a} - ${r.ab_only} - ${r.ac_only} - ${r.abc_only} = <strong>${r.a_only}</strong></div>
                        </li>
                        <li style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 8px;">
                            <strong>Solo ${n.b}</strong> = Total ${n.b} - (Solo A y B) - (Solo B y C) - (Triple) <br>
                            <div class="step-math" style="margin-top: 3px;">${i.b} - ${r.ab_only} - ${r.bc_only} - ${r.abc_only} = <strong>${r.b_only}</strong></div>
                        </li>
                        <li style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 8px;">
                            <strong>Solo ${n.c}</strong> = Total ${n.c} - (Solo A y C) - (Solo B y C) - (Triple) <br>
                            <div class="step-math" style="margin-top: 3px;">${i.c} - ${r.ac_only} - ${r.bc_only} - ${r.abc_only} = <strong>${r.c_only}</strong></div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Paso 4 -->
            <div class="step-item">
                <div class="step-number">4</div>
                <div class="step-body">
                    <h5>Calcular elementos externos (Ninguno)</h5>
                    <p>Restamos el total acumulado de las 7 regiones internas del tamaño del Universo.</p>
                    <div class="step-math" style="font-size: 0.8rem;">
                        Ninguno = U - (Solo A + Solo B + Solo C + Solo AB + Solo AC + Solo BC + Triple)
                    </div>
                    <div class="step-math" style="margin-top: 5px;">
                        Ninguno = ${i.u} - (${r.a_only} + ${r.b_only} + ${r.c_only} + ${r.ab_only} + ${r.ac_only} + ${r.bc_only} + ${r.abc_only}) = ${i.u} - ${r.a_only + r.b_only + r.c_only + r.ab_only + r.ac_only + r.bc_only + r.abc_only} = <strong>${r.none}</strong>
                    </div>
                </div>
            </div>

            <!-- Paso 5 -->
            <div class="step-item" style="border-color: rgba(16, 185, 129, 0.2); background: rgba(16, 185, 129, 0.025);">
                <div class="step-number" style="background: rgba(16, 185, 129, 0.1); color: var(--color-success); border-color: rgba(16, 185, 129, 0.25);">✓</div>
                <div class="step-body">
                    <h5 style="color: var(--color-success);">Comprobación de consistencia total</h5>
                    <p>La suma de las 8 regiones exhaustivas equivale exactamente al tamaño del Universo ($U = ${i.u}$).</p>
                    <div class="step-math" style="color: var(--color-success); border-color: rgba(16, 185, 129, 0.15); font-size: 0.8rem;">
                        ${r.a_only} (A) + ${r.b_only} (B) + ${r.c_only} (C) + ${r.ab_only} (AB) + ${r.ac_only} (AC) + ${r.bc_only} (BC) + ${r.abc_only} (ABC) + ${r.none} (Ext) = ${r.a_only + r.b_only + r.c_only + r.ab_only + r.ac_only + r.bc_only + r.abc_only + r.none}
                    </div>
                </div>
            </div>`;
        }

        elExplanationSteps.innerHTML = html;
    }

    /**
     * Exports the SVG string as a downloadable file
     */
    function exportAsSVG() {
        const svgEl = document.getElementById('venn-diagram-svg');
        if (!svgEl) return;

        // Clone element
        const svgClone = svgEl.cloneNode(true);
        
        // Add styling attributes directly or inject styling variable values to make it stand-alone
        svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        
        // Inline core styling values for offline visualization compatibility
        const styles = `
            :root {
                --color-primary: ${state.colors.a};
                --color-primary-light: ${state.colors.a};
                --color-secondary: ${state.colors.b};
                --color-secondary-light: ${state.colors.b};
                --color-accent-c: ${state.colors.c};
                --color-accent-c-light: ${state.colors.c};
                --color-text-muted: #94a3b8;
                --font-outfit: sans-serif;
            }
            svg { background-color: #0b0f19; }
            text { font-family: sans-serif; }
            .venn-circle { stroke-width: 2px; }
            .venn-label-group circle { fill: rgba(0,0,0,0.6); stroke: rgba(255,255,255,0.2); stroke-width: 1px; }
            .venn-label-group text { fill: #ffffff !important; font-weight: 700; }
            .venn-set-label { font-weight: 700; }
        `;
        
        const styleEl = document.createElement('style');
        styleEl.innerHTML = styles;
        svgClone.insertBefore(styleEl, svgClone.firstChild);

        // Package into file
        const svgData = new XMLSerializer().serializeToString(svgClone);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `diagrama_venn_${state.setsCount}_conjuntos.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Converts the current SVG element into a PNG image using a temporary canvas
     */
    function exportAsPNG() {
        const svgEl = document.getElementById('venn-diagram-svg');
        if (!svgEl) return;

        // Set dimensions
        const width = 800;
        const height = 600;

        // Package SVG XML
        const svgClone = svgEl.cloneNode(true);
        svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgClone.setAttribute('width', width);
        svgClone.setAttribute('height', height);
        
        // Embed static colors for standalone rendering
        const style = document.createElement('style');
        style.innerHTML = `
            :root {
                --color-primary: ${state.colors.a};
                --color-primary-light: ${state.colors.a};
                --color-secondary: ${state.colors.b};
                --color-secondary-light: ${state.colors.b};
                --color-accent-c: ${state.colors.c};
                --color-accent-c-light: ${state.colors.c};
            }
            svg { background-color: #0b0f19; }
            text { font-family: sans-serif; }
            circle { stroke-opacity: 0.85; }
            .venn-label-group circle { fill: rgba(0,0,0,0.7); stroke: rgba(255,255,255,0.25); }
            .venn-label-group text { fill: #ffffff; font-weight: 700; font-size: 14px; }
            .venn-set-label { font-weight: 700; font-size: 16px; }
        `;
        svgClone.insertBefore(style, svgClone.firstChild);

        const svgData = new XMLSerializer().serializeToString(svgClone);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            // Draw to canvas
            ctx.drawImage(img, 0, 0);

            // Trigger download
            const pngUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = `diagrama_venn_${state.setsCount}_conjuntos.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
        img.src = url;
    }

    // --- Run App ---
    init();
});
