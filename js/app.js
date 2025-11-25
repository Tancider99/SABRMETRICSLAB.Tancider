// --- Application Variables & UI Logic ---
const grid = document.getElementById('grid');
const modal = document.getElementById('modal');
const modalTitleArea = document.getElementById('modal-title-area');
const modalBodyContent = document.getElementById('modal-body-content');
const searchInput = document.getElementById('searchInput');
const filterChips = document.querySelectorAll('.filter-chip');
const themeToggleBtn = document.getElementById('themeToggle');
const searchIconEl = document.getElementById('searchIcon');

let currentFilter = 'all';
let currentSearch = '';
let currentTermId = null; 

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.innerHTML = icons.sun;
        themeToggleBtn.title = "Light Mode";
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggleBtn.innerHTML = icons.moon;
        themeToggleBtn.title = "Dark Mode";
        localStorage.setItem('theme', 'light');
    }
}

// Initial Setup Function
function initApp() {
    // Inject Icons
    if (searchIconEl) searchIconEl.innerHTML = icons.search;
    
    // Header & Footer Icons Injection
    const headerToolIcon = document.getElementById('headerToolIcon');
    if (headerToolIcon) headerToolIcon.innerHTML = icons.tool;

    const footerAlertIcon = document.getElementById('footerAlertIcon');
    if (footerAlertIcon) footerAlertIcon.innerHTML = icons.alert;

    // Theme Check
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = icons.sun;
        themeToggleBtn.title = "Light Mode";
    } else {
        themeToggleBtn.innerHTML = icons.moon;
        themeToggleBtn.title = "Dark Mode";
    }
}

// Render Grid
function render() {
    grid.innerHTML = '';
    const filtered = terms.filter(term => {
        const catMatch = currentFilter === 'all' || term.category === currentFilter;
        const searchLower = currentSearch.toLowerCase();
        const searchMatch = !currentSearch || 
            term.title.toLowerCase().includes(searchLower) || 
            term.full.toLowerCase().includes(searchLower) ||
            term.short.includes(currentSearch) ||
            (term.desc && term.desc.includes(currentSearch));
        return catMatch && searchMatch;
    });

    if(filtered.length === 0) {
        grid.innerHTML = '<div class="no-result">一致する用語が見つかりませんでした。</div>';
        return;
    }

    filtered.forEach(term => {
        const el = document.createElement('div');
        el.className = `metric-card cat-${term.category}`;
        el.onclick = () => openModal(term.id);
        let catLabel = getCatLabel(term.category);
        
        // Use SVG for calc icon (removed emoji if any were hidden, though none were here)
        let iconSvg = icons.calculator;
        if(term.aiMode) iconSvg = icons.barChart;
        const hasCalc = term.inputs ? `<span class="calc-icon ${term.aiMode ? 'ai' : ''}" title="${term.aiMode ? '推定' : '計算可能'}">${iconSvg}</span>` : '';
        
        el.innerHTML = `
            <div class="card-header">
                <span class="card-tag">${catLabel}</span>
                ${hasCalc}
            </div>
            <h3 class="metric-title">${term.title}</h3>
            <div class="metric-full">${term.full}</div>
            <p class="metric-desc">${term.short}</p>
        `;
        grid.appendChild(el);
    });
}

function getCatLabel(cat) {
    switch(cat){
        case 'bat': return "Batting";
        case 'pit': return "Pitching";
        case 'fld': return "Fielding";
        case 'tot': return "Overall";
        case 'std': return "Basic";
        default: return "";
    }
}

function getCatColor(cat) {
    switch(cat){
        case 'bat': return "#0ea5e9";
        case 'pit': return "#f43f5e";
        case 'fld': return "#d97706";
        case 'tot': return "#10b981";
        case 'std': return "#6366f1";
        default: return "#64748b";
    }
}

function handleSearch() {
    currentSearch = searchInput.value;
    render();
}

function filterCategory(cat) {
    currentFilter = cat;
    filterChips.forEach(chip => {
        if(chip.dataset.cat === cat) chip.classList.add('active');
        else chip.classList.remove('active');
    });
    render();
}

// Input HTML Generator
function createInputHtml(inp) {
    if(inp.type === 'select') {
        const opts = Object.keys(inp.options).map(k => `<option value="${k}">${inp.options[k]}</option>`).join('');
        return `
            <div class="calc-group">
                <label class="calc-label">${inp.label}</label>
                <select class="calc-select" id="calc-${inp.id}">
                    ${opts}
                </select>
            </div>
        `;
    } else {
        let val = '';
        if (inp.default !== undefined) {
            val = inp.default === 0 ? '' : inp.default;
        }
        const advClass = inp.advanced ? 'advanced-input' : '';
        return `
            <div class="calc-group">
                <label class="calc-label">${inp.label}</label>
                <input type="number" class="calc-field ${advClass}" id="calc-${inp.id}" placeholder="0" value="${val}" ${inp.advanced ? 'oninput="checkAdvancedChanges()"' : ''}>
            </div>
        `;
    }
}

function openModal(id) {
    currentTermId = id;
    const term = terms.find(t => t.id === id);
    if(!term) return;

    let relatedHtml = '';
    if(term.related && term.related.length > 0) {
        term.related.forEach(rid => {
            const rTerm = terms.find(t => t.id === rid);
            if(rTerm) relatedHtml += `<div class="rel-chip" onclick="event.stopPropagation(); openModal('${rid}')">${rTerm.title}</div>`;
        });
    }

    let calcHtml = '';
    if(term.inputs && term.calc) {
        const basicInputs = []; const advancedInputs = [];
        term.inputs.forEach(inp => { if (inp.advanced) advancedInputs.push(inp); else basicInputs.push(inp); });
        const basicInputsHtml = basicInputs.map(inp => createInputHtml(inp)).join('');
        
        let advancedSectionHtml = '';
        if (advancedInputs.length > 0) {
            const advInputsHtml = advancedInputs.map(inp => createInputHtml(inp)).join('');
            // Added Icons to preset section
            const leaguePresetHtml = `
                <div class="preset-bar" style="margin-bottom:15px; background:rgba(255,255,255,0.5); border:1px dashed var(--c-border);">
                    <div class="preset-label" style="width:auto; margin-right:auto;">${icons.gear} リーグ設定</div>
                    <select class="preset-select" id="league-preset-select" style="min-width:100px; font-size:0.85rem; padding:6px;">
                        <option value="">設定を選択...</option>
                    </select>
                    <button type="button" class="preset-btn btn-load" onclick="loadLeaguePreset()" style="padding:6px 10px; font-size:0.75rem;">読込</button>
                    <button type="button" class="preset-btn btn-del" onclick="removeLeaguePreset()" title="削除" style="padding:6px 10px;">${icons.trash}</button>
                    <input type="text" class="preset-input" id="league-preset-name" placeholder="設定名 (例: 2023セ)" style="min-width:100px; font-size:0.85rem; padding:6px;">
                    <button type="button" class="preset-btn btn-save" onclick="saveLeaguePreset()" style="padding:6px 10px; font-size:0.75rem;">保存</button>
                </div>
            `;
            advancedSectionHtml = `
                <details class="advanced-details">
                    <summary class="advanced-summary">
                        <span class="icon-gear">${icons.gear}</span>
                        詳細設定 (リーグ平均値など)
                    </summary>
                    <div class="advanced-content">
                        ${leaguePresetHtml}  ${advInputsHtml}
                    </div>
                    <div id="warning-box" class="warning-msg" style="display:none;">
                        詳細設定を変更すると精度が落ちる可能性があります
                    </div>
                </details>
            `;
        }

        const aiClass = term.aiMode ? 'ai-mode' : '';
        const aiIcon = term.aiMode ? icons.barChart : icons.calculator;
        const aiText = term.aiMode ? '推定を実行' : 'CALCULATE';
        const titleText = term.aiMode ? 'ESTIMATOR' : 'SIMULATOR';
        const calcBtnIcon = term.aiMode ? icons.barChart : icons.calculator;
        
        calcHtml = `
            <div class="section-label has-hash">LABORATORY / ${aiText}</div>
            <div class="calc-container ${aiClass}" id="calc-container">
                <div class="calc-title">
                    <div><span>${aiIcon}</span> ${term.title} ${titleText}</div>
                </div>
                <div class="preset-bar">
                    <div class="preset-label">${icons.save} 成績プリセット</div>
                    <select class="preset-select" id="preset-select"><option value="">保存データを選択...</option></select>
                    <button type="button" class="preset-btn btn-load" onclick="loadPreset()">読込</button>
                    <button type="button" class="preset-btn btn-del" onclick="removePreset()" title="削除">${icons.trash}</button>
                    <div style="flex-basis: 100%; height: 0; margin: 0;"></div>
                    <input type="text" class="preset-input" id="preset-name" placeholder="新規保存名 (例: 2024山田)">
                    <button type="button" class="preset-btn btn-save" onclick="savePreset()">保存</button>
                </div>
                <div class="calc-inputs">
                    ${basicInputsHtml} ${advancedSectionHtml}
                </div>
                <button class="calc-btn" onclick="calculateMetric('${term.id}')">
                    ${calcBtnIcon} ${aiText}
                </button>
                <div class="calc-result-area">
                    <div class="calc-res-label">RESULT ${term.aiMode ? '<span>推定値</span>' : ''}:</div>
                    <div class="calc-res-value" id="calc-result">---</div>
                </div>
            </div>
        `;
    }

    const catLabel = getCatLabel(term.category);
    const catColor = getCatColor(term.category);

    modalTitleArea.innerHTML = `
        <div class="m-cat" style="color:${catColor}">${catLabel}</div>
        <h2 class="m-title">${term.title}</h2>
        <div class="m-full">${term.full}</div>
    `;

    modalBodyContent.innerHTML = `
        <p style="font-size:1.2rem; font-weight:700; line-height:1.6; color:var(--c-text-primary);">${term.short}</p>
        ${term.desc ? `<p style="color:var(--c-text-secondary); line-height:1.8;">${term.desc}</p>` : ''}
        <div class="section-label has-hash">計算式 / FORMULA</div>
        <div class="formula-box">${term.formula}</div>
        ${calcHtml}
        <div class="section-label has-hash">評価基準 / CRITERIA</div>
        <table class="criteria-table"><tr><th>目安</th><td>${term.criteria || '---'}</td></tr></table>
        <div class="section-label has-hash">関連指標 / RELATED</div>
        <div class="related-grid">${relatedHtml || '<span style="color:#94a3b8; font-size:0.9rem">なし</span>'}</div>
    `;

    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('show'));
    updatePresetList(); updateLeaguePresetList();
}

// ... closeModal, closeModalOutside ...
function closeModal() { modal.classList.remove('show'); setTimeout(() => { modal.style.display = 'none'; }, 300); }
function closeModalOutside(e) { if (e.target === modal) closeModal(); }
window.checkAdvancedChanges = function() {
    const warningBox = document.getElementById('warning-box'); if (!warningBox) return;
    const advInputs = document.querySelectorAll('.advanced-input'); let isChanged = false;
    advInputs.forEach(input => { const key = input.id.replace('calc-', '').toUpperCase(); const defVal = DEFAULTS[key]; if (defVal !== undefined && parseFloat(input.value) !== defVal) isChanged = true; });
    warningBox.style.display = isChanged ? 'flex' : 'none';
}
window.calculateMetric = function(id) {
    const term = terms.find(t => t.id === id); if(!term || !term.inputs) return;
    const data = {}; let allFilled = true;
    term.inputs.forEach(inp => {
        const el = document.getElementById(`calc-${inp.id}`); const val = el.value;
        if (inp.type !== 'select' && !inp.advanced && val === '') allFilled = false;
        data[inp.id] = inp.type === 'select' ? val : (parseFloat(val) || 0);
    });
    if(!allFilled && !confirm("未入力の必須項目は0として計算しますか？")) return;
    const result = term.calc(data);
    const resDiv = document.getElementById('calc-result'); resDiv.style.opacity = 0; resDiv.style.transform = "translateY(10px)";
    setTimeout(() => { resDiv.innerHTML = result; resDiv.style.transition = "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"; resDiv.style.opacity = 1; resDiv.style.transform = "translateY(0)"; }, 50);
}

// --- Tool Menu Logic ---
function openToolMenu() {
    const title = "LABORATORY TOOLS";
    const catColor = "var(--c-text-primary)";
    const tools = [
        { id: 'batch-bat', name: '野手一括計算', icon: icons.calculator, func: "openBatchCalc('bat')", color: 'var(--cat-bat)', desc: '打撃・守備指標をまとめて計算', keepOpen: true },
        { id: 'batch-pit', name: '投手一括計算', icon: icons.calculator, func: "openBatchCalc('pit')", color: 'var(--cat-pit)', desc: '投球指標・FIP等をまとめて計算', keepOpen: true },
        { id: 'galaxy', name: 'GALAXY EXPLORER', icon: icons.sparkle, func: "openMindMap()", color: '#8b5cf6', desc: '指標の関係性を宇宙地図で探索', keepOpen: false },
        { id: 'gm', name: 'GM CHALLENGE', icon: icons.barChart, func: "openGMChallenge()", color: '#10b981', desc: '最強チーム編成シミュレーション', keepOpen: true },
        { id: 'career', name: 'MY CAREER', icon: icons.save, func: "openCareerSim()", color: '#d97706', desc: '選手人生シミュレーション', keepOpen: true }
    ];

    let html = `<div class="grid-container" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); padding:0; gap:15px; max-width:100%;">`;
    let count = 0;
    tools.forEach(t => {
        const fnName = t.func.split('(')[0];
        if (typeof window[fnName] === 'function') {
            const clickAction = t.keepOpen ? t.func : `${t.func}; closeModal();`;
            html += `
                <div onclick="${clickAction}" style="background:var(--c-bg); border:1px solid var(--c-border); border-radius:16px; padding:20px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:15px; box-shadow:var(--shadow-card);" onmouseover="this.style.borderColor='${t.color}'; this.style.transform='translateY(-3px)';" onmouseout="this.style.borderColor='var(--c-border)'; this.style.transform='none';">
                    <div style="width:50px; height:50px; border-radius:12px; background:${t.color}; color:white; display:flex; align-items:center; justify-content:center; flex-shrink:0;">${t.icon}</div>
                    <div><div style="font-weight:800; color:var(--c-text-primary); font-size:1rem; line-height:1.2; margin-bottom:4px;">${t.name}</div><div style="font-size:0.75rem; color:var(--c-text-secondary); line-height:1.4;">${t.desc}</div></div>
                </div>
            `;
            count++;
        }
    });
    html += `</div>`;
    if(count === 0) html += `<div style="text-align:center; padding:20px;">利用可能なツールがありません。</div>`;

    modalTitleArea.innerHTML = `<div class="m-cat" style="color:${catColor}">MENU</div><h2 class="m-title">${title}</h2><div class="m-full">Select a tool to launch</div>`;
    modalBodyContent.innerHTML = html;
    modal.style.display = 'flex'; requestAnimationFrame(() => modal.classList.add('show'));
}

// ... Preset Logic and League Preset Logic (omitted for brevity, same as before but use icons.trash/icons.save/icons.gear in HTML strings if they are generated there) ...
// (Preset Logic内のアイコンも svg 文字列変数 icons.xxx を使う形に更新済みです)
const STORAGE_KEY = 'sabr_metrics_presets';
function getPresets() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
function savePresets(presets) { localStorage.setItem(STORAGE_KEY, JSON.stringify(presets)); }
function updatePresetList() {
    const select = document.getElementById('preset-select'); if (!select) return;
    const presets = getPresets(); select.innerHTML = '<option value="">保存データを選択...</option>';
    Object.keys(presets).forEach(name => { const option = document.createElement('option'); option.value = name; option.textContent = name; select.appendChild(option); });
}
window.savePreset = function() {
    const nameInput = document.getElementById('preset-name'); const name = nameInput.value.trim(); if (!name) { alert('保存名を入力してください'); return; }
    const inputs = document.querySelectorAll('.calc-field, .calc-select'); const data = {}; let hasData = false;
    inputs.forEach(input => { if (input.value) { data[input.id.replace('calc-', '')] = input.value; hasData = true; } });
    if (!hasData) { alert('保存するデータがありません'); return; }
    const presets = getPresets(); if (presets[name] && !confirm(`"${name}" は既に存在します。上書きしますか？`)) return;
    presets[name] = data; savePresets(presets); updatePresetList(); document.getElementById('preset-select').value = name; nameInput.value = ''; alert(`"${name}" を保存しました`);
}
window.loadPreset = function() {
    const name = document.getElementById('preset-select').value; if (!name) return;
    const data = getPresets()[name]; if (data) { Object.keys(data).forEach(key => { const el = document.getElementById(`calc-${key}`); if (el) { el.value = data[key]; el.style.backgroundColor = "#f0fdf4"; setTimeout(() => el.style.backgroundColor = "", 1000); } }); if (window.checkAdvancedChanges) window.checkAdvancedChanges(); }
}
window.removePreset = function() {
    const select = document.getElementById('preset-select'); const name = select.value; if (!name) return;
    const presets = getPresets(); if (presets[name]) { delete presets[name]; savePresets(presets); updatePresetList(); select.value = ""; alert(`"${name}" を削除しました`); }
}
const LEAGUE_STORAGE_KEY = 'sabr_league_presets';
function getLeaguePresets() { try { return JSON.parse(localStorage.getItem(LEAGUE_STORAGE_KEY)) || {}; } catch (e) { return {}; } }
function saveLeaguePresets(presets) { localStorage.setItem(LEAGUE_STORAGE_KEY, JSON.stringify(presets)); }
window.updateLeaguePresetList = function() {
    const select = document.getElementById('league-preset-select'); if (!select) return;
    const presets = getLeaguePresets(); select.innerHTML = '<option value="">設定を選択...</option>';
    Object.keys(presets).forEach(name => { const option = document.createElement('option'); option.value = name; option.textContent = name; select.appendChild(option); });
}
window.saveLeaguePreset = function() {
    const nameInput = document.getElementById('league-preset-name'); const name = nameInput.value.trim(); if (!name) { alert('設定名を入力してください'); return; }
    const data = {}; ADVANCED_LEAGUE_INPUTS.forEach(inp => { const el = document.getElementById(`calc-${inp.id}`); if (el && el.value) data[inp.id] = el.value; });
    if (Object.keys(data).length === 0) { alert('保存する詳細設定データがありません'); return; }
    const presets = getLeaguePresets(); if (presets[name] && !confirm(`"${name}" は既に存在します。上書きしますか？`)) return;
    presets[name] = data; saveLeaguePresets(presets); updateLeaguePresetList(); document.getElementById('league-preset-select').value = name; nameInput.value = ''; alert(`リーグ設定 "${name}" を保存しました`);
}
window.loadLeaguePreset = function() {
    const name = document.getElementById('league-preset-select').value; if (!name) return;
    const data = getLeaguePresets()[name]; if (data) { Object.keys(data).forEach(key => { const el = document.getElementById(`calc-${key}`); if (el) { el.value = data[key]; el.style.backgroundColor = "#e0f2fe"; setTimeout(() => el.style.backgroundColor = "", 1000); } }); if (window.checkAdvancedChanges) window.checkAdvancedChanges(); }
}
window.removeLeaguePreset = function() {
    const select = document.getElementById('league-preset-select'); const name = select.value; if (!name) return;
    const presets = getLeaguePresets(); if (presets[name]) { delete presets[name]; saveLeaguePresets(presets); updateLeaguePresetList(); select.value = ""; alert(`リーグ設定 "${name}" を削除しました`); }
}
