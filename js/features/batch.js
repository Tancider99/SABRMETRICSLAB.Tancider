// --- Batch Calculator Logic ---

let radarChartInstance = null;

function openBatchCalc(mode) {
    const isBat = mode === 'bat';
    const title = isBat ? "野手指標 一括計算" : "投手指標 一括計算";
    const catColor = isBat ? getCatColor('bat') : getCatColor('pit');
    
    let fields = [];
    if (isBat) {
        fields = [
            {id:'pa', label:'打席数'}, {id:'ab', label:'打数'},
            {id:'h', label:'安打'}, {id:'d', label:'二塁打'}, {id:'t', label:'三塁打'}, {id:'hr', label:'本塁打'},
            {id:'bb', label:'四球'}, {id:'hbp', label:'死球'}, {id:'so', label:'三振'},
            {id:'sf', label:'犠飛'}, {id:'sh', label:'犠打'},
            {id:'sb', label:'盗塁'}, {id:'cs', label:'盗塁死'},
            {id:'stadium', label:'本拠地', type:'select', options: Object.keys(PARK_FACTORS).reduce((acc, key) => ({...acc, [key]: PARK_FACTORS[key].name}), {})},
            {id:'pos', label:'守備位置', type:'select', options:{'dh':'DH', '1b':'一塁', 'lf':'左翼', 'rf':'右翼', '3b':'三塁', '2b':'二塁', 'cf':'中堅', 'ss':'遊撃', 'c':'捕手'}},
            {id:'def', label:'守備評価', type:'select', options:{'0':'平均的 (0)', '5':'上手い (+5)', '10':'名手 (+10)', '15':'神 (+15)', '-5':'苦手 (-5)', '-10':'下手 (-10)'}}
        ];
    } else {
        fields = [
            {id:'ip', label:'投球回'}, {id:'r', label:'失点'},
            {id:'h', label:'被安打'}, {id:'hr', label:'被本塁打'}, 
            {id:'bb', label:'与四球'}, {id:'hbp', label:'与死球'},
            {id:'so', label:'奪三振'}, {id:'bf', label:'打者数'},
            {id:'gb_type', label:'打球傾向(GB%)', type:'select', options:{
                '55':'55% (超ゴロP)', 
                '50':'50% (ゴロP)', 
                '45':'45% (平均)', 
                '40':'40% (フライP)', 
                '35':'35% (超フライP)'
            }},
            {id:'stadium', label:'本拠地', type:'select', options: Object.keys(PARK_FACTORS).reduce((acc, key) => ({...acc, [key]: PARK_FACTORS[key].name}), {})},
            {id:'role', label:'役割', type:'select', options:{'sp':'先発', 'rp':'救援'}}
        ];
    }

    const inputsHtml = fields.map(inp => createInputHtml(inp)).join('');
    const advInputsHtml = ADVANCED_LEAGUE_INPUTS.map(inp => createInputHtml(inp)).join('');

    const parserHtml = `
        <div class="parser-area" style="border-color:${catColor}">
            <div style="font-size:0.8rem; font-weight:700; color:var(--c-text-secondary); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <span>${icons.sparkle} AIテキスト解析 (AI ANALYZER)</span>
                <span style="font-size:0.7em; background:#e2e8f0; padding:2px 6px; border-radius:4px;">TEXT MODE</span>
            </div>
            <textarea class="parser-textarea" id="smart-text" placeholder="ここにWebサイトの成績表などをコピー＆ペーストしてください...&#13;&#10;（例：打率.300 試合143 本塁打20...）"></textarea>
            
            <button class="parser-btn" id="parser-btn" onclick="parseSmartContent('${mode}')" style="background:${catColor}">
                <span>${icons.sparkle}</span> AIでテキストを解析して入力
            </button>
            <div id="parser-msg" style="font-size:0.85rem; color:var(--c-text-secondary); margin-top:10px; text-align:center; display:none; line-height:1.5;"></div>
        </div>
    `;

    const saveIcon = icons.save;
    const delIcon = icons.trash;
    const gearIcon = icons.gear;

    const html = `
        <div class="section-label has-hash">INPUT DATA / データ入力</div>
        <div class="calc-container" style="border-color:${catColor}">
            ${parserHtml}
            <div class="preset-bar">
                <div class="preset-label">${saveIcon} 成績プリセット (自動入力)</div>
                <select class="preset-select" id="preset-select">
                    <option value="">保存データを選択...</option>
                </select>
                <button type="button" class="preset-btn btn-load" onclick="loadPreset()">読込</button>
                <button type="button" class="preset-btn btn-del" onclick="removePreset()" title="削除">${delIcon}</button>
                <div style="flex-basis: 100%; height: 0; margin: 0;"></div>
                <input type="text" class="preset-input" id="preset-name" placeholder="新規保存名 (例: 2024山田)">
                <button type="button" class="preset-btn btn-save" onclick="savePreset()">保存</button>
            </div>

            <div class="calc-inputs">
                ${inputsHtml}
                <details class="advanced-details">
                    <summary class="advanced-summary">
                        <span class="icon-gear">${gearIcon}</span>
                        詳細設定 (リーグ平均値など)
                    </summary>
                    <div class="advanced-content">
                        <div class="preset-bar" style="margin-bottom:15px; background:rgba(255,255,255,0.5); border:1px dashed var(--c-border);">
                            <div class="preset-label" style="width:auto; margin-right:auto;">${icons.gear} リーグ設定プリセット</div>
                            <select class="preset-select" id="league-preset-select" style="min-width:100px; font-size:0.85rem; padding:6px;">
                                <option value="">設定を選択...</option>
                            </select>
                            <button type="button" class="preset-btn btn-load" onclick="loadLeaguePreset()" style="padding:6px 10px; font-size:0.75rem;">読込</button>
                            <button type="button" class="preset-btn btn-del" onclick="removeLeaguePreset()" title="削除" style="padding:6px 10px;">${icons.trash}</button>
                            <input type="text" class="preset-input" id="league-preset-name" placeholder="設定名 (例: 2023セ)" style="min-width:100px; font-size:0.85rem; padding:6px;">
                            <button type="button" class="preset-btn btn-save" onclick="saveLeaguePreset()" style="padding:6px 10px; font-size:0.75rem;">保存</button>
                        </div>
                        ${advInputsHtml}
                    </div>
                </details>
            </div>
            <button class="calc-btn" style="background:${catColor}" onclick="runBatchCalc('${mode}')">
                ${icons.barChart} 一括計算実行 (CALCULATE ALL)
            </button>
        </div>
        <div id="batch-results-area" style="margin-top:30px;"></div>
    `;

    modalTitleArea.innerHTML = `
        <div class="m-cat" style="color:${catColor}">BATCH CALCULATOR</div>
        <h2 class="m-title">${title}</h2>
    `;
    modalBodyContent.innerHTML = html;
    
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    updatePresetList();
    updateLeaguePresetList();
}

window.parseSmartContent = function(mode) {
    const textInput = document.getElementById('smart-text');
    const btn = document.getElementById('parser-btn');
    const msg = document.getElementById('parser-msg');
    const text = textInput.value.trim();

    if (!text) {
        msg.style.display = 'block';
        msg.innerHTML = `<div style="color:#ef4444;">❌ テキストを入力してください。</div>`;
        return;
    }

    btn.innerHTML = `${icons.loader} テキスト構造を解析中...`;
    btn.classList.add('analyzing');
    msg.style.display = 'none';

    setTimeout(() => {
        btn.innerHTML = `${icons.sparkle} AIでテキストを解析して入力`;
        btn.classList.remove('analyzing');
        runParser(text, mode);
    }, 800);
};

function runParser(text, mode) {
    const msg = document.getElementById('parser-msg');
    
    const mapBat = {
        '打席': 'pa', '打数': 'ab', '安打': 'h', '二塁打': 'd', '三塁打': 't', '本塁打': 'hr', '本': 'hr', 'HR': 'hr',
        '四球': 'bb', '死球': 'hbp', '三振': 'so', '犠飛': 'sf', '犠打': 'sh', '盗塁': 'sb', '盗塁死': 'cs', '併殺': 'gidp'
    };
    const mapPit = {
        '回': 'ip', '投球回': 'ip', 'IP': 'ip', 
        '失点': 'r', '自責': 'er', '被安打': 'h', '被本塁打': 'hr', '被本': 'hr',
        '与四球': 'bb', '四球': 'bb', 
        '与死球': 'hbp', '死球': 'hbp', '奪三振': 'so', '三振': 'so', '打者': 'bf'
    };

    const map = mode === 'bat' ? mapBat : mapPit;
    let count = 0;
    let extractedInfo = [];

    for (const [key, id] of Object.entries(map)) {
        const regex = new RegExp(`${key}[:\\s　]*([0-9]+(?:\\.[0-9]+)?)`, 'g');
        let match;
        const matches = [...text.matchAll(regex)];
        if(matches.length > 0) {
            match = matches[matches.length - 1];
        }

        if(match) {
            const val = parseFloat(match[1]);
            const el = document.getElementById(`calc-${id}`);
            if(el) {
                el.value = val;
                el.style.backgroundColor = "#dcfce7";
                setTimeout(()=>el.style.backgroundColor="", 2000);
                count++;
                if(extractedInfo.length < 6) extractedInfo.push(key);
            }
        }
    }

    msg.style.display = 'block';
    if (count > 0) {
        msg.innerHTML = `
            <div style="color:var(--cat-tot); font-weight:bold;">
                ${icons.sparkle} 解析完了: ${count} 項目を抽出しました
            </div>
            <div style="font-size:0.8em; color:var(--c-text-secondary);">
                検出: ${extractedInfo.join(', ')}${extractedInfo.length>=6 ? '...' : ''}
            </div>
        `;
    } else {
        msg.innerHTML = `
            <div style="color:#ef4444;">
                ❌ データが見つかりませんでした。<br>
                「打率.300 本塁打20」のように項目名と数字が含まれるテキストを貼り付けてください。
            </div>
        `;
    }
}

function runBatchCalc(mode) {
    const isBat = mode === 'bat';
    const data = {};
    
    const inputs = document.querySelectorAll('.calc-field, .calc-select');
    inputs.forEach(el => {
        const id = el.id.replace('calc-', '');
        if(el.tagName === 'SELECT') {
            data[id] = el.value;
        } else {
            data[id] = parseFloat(el.value) || 0;
        }
    });
    
    ADVANCED_LEAGUE_INPUTS.forEach(inp => {
        const id = inp.id;
        const el = document.getElementById(`calc-${id}`);
        data[id] = parseFloat(el.value) || inp.default || 0;
    });

    let results = [];
    
    const targetIds = isBat ? 
        ['war', 'wrc_plus', 'woba', 'iso', 'babip', 'k_pct', 'bb_pct', 'wsb'] : 
        ['pit_war', 'fip', 'xfip', 'siera', 'k_pct_pit', 'bb_pct_pit'];

    terms.forEach(term => {
        if (targetIds.includes(term.id) && term.calc) {
            try {
                if (isBat) {
                    if (term.id === 'iso') {
                        const tb = (data.h - (data.d+data.t+data.hr) + 2*data.d + 3*data.t + 4*data.hr) || 0;
                        const slg = data.ab > 0 ? tb / data.ab : 0;
                        const avg = data.ab > 0 ? data.h / data.ab : 0;
                        data.slg = slg;
                        data.avg = avg;
                    } else if (term.id === 'k_pct' || term.id === 'bb_pct') {
                        if (data.pa === 0) return;
                    }
                }
                const res = term.calc(data);
                if (res !== "---" && res !== "NaN" && res !== "Infinity") {
                    results.push({
                        title: term.title,
                        full: term.full,
                        value: res,
                        criteria: term.criteria,
                        cat: term.category,
                        id: term.id
                    });
                }
            } catch(e) {
                console.error(`Error calculating ${term.id}:`, e);
            }
        }
    });

    let radarHtml = '';
    if (results.length > 0) {
        radarHtml = `
            <div class="chart-wrapper">
                <canvas id="radarChart"></canvas>
            </div>
            <div style="font-size:0.75rem; color:var(--c-text-secondary); text-align:center; margin-bottom:20px; line-height:1.5;">
                <strong>【レーダーチャート評価項目】</strong><br>
                ${mode === 'bat' 
                    ? '総合攻撃力(wRC+) / パワー(ISO) / 走力(wSB) / 選球眼(BB%) / 守備(UZR)' 
                    : '球威(K%) / 制球(BB%) / 将来性(xFIP) / 真の実力(SIERA) / ゴロ率(GB%)'}
            </div>
        `;
    }

    if (results.length === 0) {
        document.getElementById('batch-results-area').innerHTML = '<div class="no-result">計算可能な指標がありませんでした。</div>';
        return;
    }

    let tableHtml = `
        <div class="section-label has-hash">ANALYSIS RESULTS / 分析結果</div>
        ${radarHtml}
        <table class="criteria-table" style="margin-top:20px;">
            <thead>
                <tr style="background:var(--c-bg);">
                    <th style="padding-left:10px;">指標 (METRIC)</th>
                    <th style="text-align:right; padding-right:20px;">値 (VALUE)</th>
                    <th>基準 (CRITERIA)</th>
                </tr>
            </thead>
            <tbody>
    `;

    results.forEach(r => {
        const catColor = getCatColor(r.cat);
        tableHtml += `
            <tr>
                <td style="padding-left:10px;">
                    <span style="color:${catColor}; font-weight:900;">${r.title}</span>
                    <div style="font-size:0.75rem; color:var(--c-text-secondary);">${r.full}</div>
                </td>
                <td style="text-align:right; padding-right:20px; font-family:var(--font-mono); font-size:1.5rem; font-weight:700; color:var(--c-text-primary);">
                    ${r.value}
                </td>
                <td style="font-size:0.85rem; color:var(--c-text-secondary);">
                    ${r.criteria || '-'}
                </td>
            </tr>
        `;
    });

    tableHtml += `</tbody></table>`;
    tableHtml += `
        <button class="calc-btn" style="margin-top:20px; background:var(--c-text-secondary);" onclick="copyBatchResults()">
            ${icons.clipboard} 結果をコピー (COPY TEXT)
        </button>
    `;

    const resArea = document.getElementById('batch-results-area');
    resArea.innerHTML = tableHtml;
    resArea.scrollIntoView({behavior: 'smooth'});

    if (radarChartInstance) {
        radarChartInstance.destroy();
    }
    
    const ctx = document.getElementById('radarChart');
    if (ctx) {
        let scores = [];
        let labels = [];
        
        const calculateMetricValue = (id, inputData) => {
            const term = terms.find(t => t.id === id);
            if (term && term.calc) {
                try {
                    const val = term.calc(inputData);
                    return parseFloat(val) || 0;
                } catch(e) {
                    return 0;
                }
            }
            return 0;
        };

        if (isBat) {
            const wrc = calculateMetricValue('wrc_plus', data);
            const scoreWrc = Math.min(100, Math.max(0, (wrc - 40) / 140 * 100));
            
            const tb = (data.h - (data.d+data.t+data.hr) + 2*data.d + 3*data.t + 4*data.hr) || 0;
            const slg = data.ab > 0 ? tb / data.ab : 0;
            const avg = data.ab > 0 ? data.h / data.ab : 0;
            const iso = slg - avg;
            const scoreIso = Math.min(100, Math.max(0, (iso - 0.050) / 0.300 * 100));
            
            const wsb = calculateMetricValue('wsb', data);
            const scoreWsb = Math.min(100, Math.max(0, (wsb - (-5)) / 15 * 100));
            
            const bb_pct = data.pa > 0 ? data.bb / data.pa : 0;
            const scoreBb = Math.min(100, Math.max(0, (bb_pct - 0.03) / 0.15 * 100));
            
            const uzr = parseFloat(data.def) || 0;
            const scoreUzr = Math.min(100, Math.max(0, (uzr - (-15)) / 30 * 100));

            labels = ['wRC+', 'ISO', 'wSB', 'BB%', 'UZR'];
            scores = [scoreWrc, scoreIso, scoreWsb, scoreBb, scoreUzr];

        } else {
            const k_pct = data.bf > 0 ? data.so / data.bf : 0;
            const scoreK = Math.min(100, Math.max(0, (k_pct - 0.10) / 0.25 * 100));
            
            const bb_pct = data.bf > 0 ? data.bb / data.bf : 0.10;
            const scoreBb = Math.min(100, Math.max(0, (0.15 - bb_pct) / 0.13 * 100));
            
            const xfip = calculateMetricValue('xfip', data);
            const scoreXfip = Math.min(100, Math.max(0, (6.00 - xfip) / 4.00 * 100));
            
            const siera = calculateMetricValue('siera', data);
            const scoreSiera = Math.min(100, Math.max(0, (6.00 - siera) / 4.00 * 100));
            
            const gb_pct = parseFloat(data.gb_type || 45) / 100;
            const scoreGb = Math.min(100, Math.max(0, (gb_pct - 0.30) / 0.30 * 100));

            labels = ['K%', 'BB%', 'xFIP', 'SIERA', 'GB%'];
            scores = [scoreK, scoreBb, scoreXfip, scoreSiera, scoreGb];
        }

        radarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Score',
                    data: scores,
                    backgroundColor: isBat ? 'rgba(14, 165, 233, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                    borderColor: isBat ? '#0ea5e9' : '#f43f5e',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: isBat ? '#0ea5e9' : '#f43f5e',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: { display: false },
                        pointLabels: {
                            font: { size: 14, weight: '800', family: 'var(--font-mono)' },
                            color: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#475569'
                        },
                        grid: {
                            color: document.body.classList.contains('dark-mode') ? 'rgba(51, 65, 85, 0.5)' : 'rgba(203, 213, 225, 0.5)'
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

function copyBatchResults() {
    const rows = document.querySelectorAll('#batch-results-area tr');
    let text = "【SABR METRICS LAB Calculation Results】\n";
    rows.forEach((row, i) => {
        if(i===0) return; 
        const cols = row.querySelectorAll('td');
        if(cols.length > 0) {
            const metric = cols[0].querySelector('span').innerText;
            const value = cols[1].innerText.trim();
            text += `${metric}: ${value}\n`;
        }
    });

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if(successful) {
            alert("クリップボードにコピーしました！");
        } else {
            alert("コピーに失敗しました。");
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        alert("コピーに失敗しました。");
    }

    document.body.removeChild(textArea);
}
