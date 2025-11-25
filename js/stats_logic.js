// js/stats_logic.js

let currentStatsData = [];
let leagueStats = {}; // リーグ全体の計算用定数
let sortCol = 'wRC_PLUS'; // デフォルトソート
let sortAsc = false;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof NPB_STATS_DATA !== 'undefined') {
        initStatsBoard();
    }
});

function initStatsBoard() {
    calculateLeagueConstants(); // 1. リーグ全体定数の計算
    processData();              // 2. 個人成績の計算 (wRC+含む)
    setupFilters();             // 3. フィルタの準備
    renderStatsTable();         // 4. 表示
}

// ビュー切り替え
function switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
    
    document.getElementById(`view-${viewName}`).style.display = 'block';
    document.getElementById(`tab-${viewName}`).classList.add('active');
}

// 1. リーグ定数の計算 (wRC+用)
function calculateLeagueConstants() {
    // 全選手の数値を合算
    const total = NPB_STATS_DATA.reduce((acc, p) => {
        acc.PA += p.AB + (p.BB||0) + (p.HBP||0) + (p.SF||0) + (p.SH||0); // 簡易PA計算
        acc.AB += p.AB;
        acc.H += p.H;
        acc.BB += (p.BB||0);
        acc.HBP += (p.HBP||0);
        acc.SF += (p.SF||0);
        return acc;
    }, { PA:0, AB:0, H:0, BB:0, HBP:0, SF:0 });

    // wOBA係数 (概算値: 年によって異なるが、一般的な係数を使用)
    // wRC+計算に必要な定数: lg_wOBA, wOBA_Scale, lg_R/PA
    
    // 簡易的なリーグ平均出塁率などを計算
    const lg_obp = (total.H + total.BB + total.HBP) / (total.AB + total.BB + total.HBP + total.SF);
    
    // wOBA Scale (概算 1.24)
    const woba_scale = 1.24;
    
    // リーグwOBA (簡易計算)
    // 正確な係数は年度ごとに異なりますが、ここでは標準的な値を使用
    const woba_num = (0.69 * (total.BB)) + (0.72 * total.HBP) + (0.89 * (total.H - (NPB_STATS_DATA.reduce((s,p)=>s+(p['2B']||0)+(p['3B']||0)+(p['HR']||0),0)))) + (1.27 * NPB_STATS_DATA.reduce((s,p)=>s+(p['2B']||0),0)) + (1.62 * NPB_STATS_DATA.reduce((s,p)=>s+(p['3B']||0),0)) + (2.10 * NPB_STATS_DATA.reduce((s,p)=>s+(p['HR']||0),0));
    const lg_woba = woba_num / (total.AB + total.BB - (NPB_STATS_DATA.reduce((s,p)=>s+(p.IBB||0),0)) + total.SF + total.HBP);

    // リーグ R/PA (およそ 0.11 ~ 0.13)
    // 得点データがない場合、wOBAから推定するか、標準値を使う
    const lg_r_pa = 0.12; 

    leagueStats = { lg_woba, woba_scale, lg_r_pa };
    console.log("League Constants:", leagueStats);
}

// 2. データ加工・指標計算
function processData() {
    const { lg_woba, woba_scale, lg_r_pa } = leagueStats;

    currentStatsData = NPB_STATS_DATA.map(p => {
        // 必要なデータの整理
        const PA = p.AB + (p.BB||0) + (p.HBP||0) + (p.SF||0) + (p.SH||0);
        const S = p.H - (p['2B']||0) - (p['3B']||0) - (p['HR']||0);
        const TB = S + (2*(p['2B']||0)) + (3*(p['3B']||0)) + (4*(p['HR']||0));
        const IBB = p.IBB || 0;

        // wOBA計算
        const woba_demon = p.AB + p.BB - IBB + (p.HBP||0) + (p.SF||0);
        const woba_num = (0.69 * (p.BB - IBB)) + (0.72 * (p.HBP||0)) + (0.89 * S) + (1.27 * (p['2B']||0)) + (1.62 * (p['3B']||0)) + (2.10 * (p['HR']||0));
        const woba = woba_demon > 0 ? woba_num / woba_demon : 0;

        // wRAA計算
        const wraa = ((woba - lg_woba) / woba_scale) * PA;

        // wRC+計算 (パークファクターは今回考慮せず1.0とする)
        // wRC+ = (((wRAA/PA + lg_R/PA) + (lg_R/PA - PF*lg_R/PA)) / lg_R/PA) * 100
        // 簡易版: ((wRAA / PA) + lg_R_PA) / lg_R_PA * 100
        let wrc_plus = 0;
        if (PA > 0) {
            wrc_plus = (((wraa / PA) + lg_r_pa) / lg_r_pa) * 100;
        }

        // その他の指標
        const avg = p.AB > 0 ? p.H / p.AB : 0;
        const obp = (p.AB + p.BB + (p.HBP||0) + (p.SF||0)) > 0 ? (p.H + p.BB + (p.HBP||0)) / (p.AB + p.BB + (p.HBP||0) + (p.SF||0)) : 0;
        const slg = p.AB > 0 ? TB / p.AB : 0;
        const ops = obp + slg;
        const iso = slg - avg;
        const bb_k = (p.SO||0) > 0 ? p.BB / p.SO : 0;

        return {
            ...p,
            PA, TB,
            AVG: avg,
            OBP: obp,
            SLG: slg,
            OPS: ops,
            ISO: iso,
            wOBA: woba,
            wRAA: wraa,
            wRC_PLUS: wrc_plus,
            BB_K: bb_k
        };
    });
}

// 3. フィルタのセットアップ
function setupFilters() {
    const teamSelect = document.getElementById('filter-team');
    // チームリストの作成
    const teams = [...new Set(NPB_STATS_DATA.map(p => p.Team).filter(t => t))];
    teams.forEach(t => {
        const op = document.createElement('option');
        op.value = t;
        op.textContent = t;
        teamSelect.appendChild(op);
    });
}

// 4. テーブル描画
function renderStatsTable() {
    const tbody = document.getElementById('leaderboard');
    const searchVal = document.getElementById('stats-search').value.toLowerCase();
    const teamVal = document.getElementById('filter-team').value;
    const paVal = parseInt(document.getElementById('filter-pa').value) || 0;
    const isReg = document.getElementById('filter-regulation').checked;

    // 規定打席の概算 (例: 143試合 * 3.1 = 443)
    // シーズン途中なら少なく調整する必要があります
    const REGULATION_PA = 443; 

    // フィルタリング
    let data = currentStatsData.filter(p => {
        // 文字列検索
        const matchText = !searchVal || p.Name.toLowerCase().includes(searchVal);
        // チーム
        const matchTeam = !teamVal || p.Team === teamVal;
        // 打席数指定
        const matchPA = p.PA >= paVal;
        // 規定打席チェック
        const matchReg = !isReg || p.PA >= REGULATION_PA;

        return matchText && matchTeam && matchPA && matchReg;
    });

    // ソート
    data.sort((a, b) => {
        let va = a[sortCol];
        let vb = b[sortCol];
        if (va < vb) return sortAsc ? -1 : 1;
        if (va > vb) return sortAsc ? 1 : -1;
        return 0;
    });

    // HTML生成
    const columns = [
        { k: 'Team', label: 'チーム' },
        { k: 'Name', label: '選手名' },
        { k: 'wRC_PLUS', label: 'wRC+', type: 'float0', color: true }, // 整数
        { k: 'wOBA', label: 'wOBA', type: 'float3' },
        { k: 'OPS', label: 'OPS', type: 'float3', color: true },
        { k: 'AVG', label: '打率', type: 'float3' },
        { k: 'HR', label: 'HR' },
        { k: 'PA', label: '打席' },
        { k: 'H', label: '安打' },
        { k: 'ISO', label: 'ISO', type: 'float3' },
        { k: 'BB_K', label: 'BB/K', type: 'float2' },
        { k: 'SB', label: '盗塁' }, // データにあれば
    ];

    let html = '<thead><tr>';
    columns.forEach(c => {
        const mark = sortCol === c.k ? (sortAsc ? '▲' : '▼') : '';
        html += `<th onclick="changeSort('${c.k}')">${c.label} ${mark}</th>`;
    });
    html += '</tr></thead><tbody>';

    data.forEach(row => {
        html += '<tr>';
        columns.forEach(c => {
            let val = row[c.k];
            let displayVal = val;
            let cls = '';

            if (c.type === 'float3') displayVal = val.toFixed(3).replace(/^0/,'');
            if (c.type === 'float2') displayVal = val.toFixed(2);
            if (c.type === 'float0') displayVal = val.toFixed(0);

            // 色付け
            if (c.color) {
                if (c.k === 'wRC_PLUS') {
                    if (val >= 160) cls = 'val-elite';
                    else if (val >= 140) cls = 'val-great';
                    else if (val >= 120) cls = 'val-good';
                    else if (val < 80) cls = 'val-bad';
                }
                if (c.k === 'OPS') {
                    if (val >= 1.0) cls = 'val-elite';
                    else if (val >= 0.9) cls = 'val-great';
                    else if (val >= 0.8) cls = 'val-good';
                }
            }

            html += `<td class="${cls}">${displayVal}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody>';

    tbody.innerHTML = html;
}

function changeSort(key) {
    if (sortCol === key) sortAsc = !sortAsc;
    else {
        sortCol = key;
        sortAsc = false; // 数値は降順が基本
    }
    renderStatsTable();
}
