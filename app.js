// Content Industry Dashboard JavaScript

// データの定義
const dashboardData = {
    japan_content_trends: [
        {"year": 2020, "total_market_japan": 121498, "digital_content": 77000, "network_content": 45000, "game_industry": 195000, "anime_industry": 274000, "music_industry": 30600, "movie_industry": 21500},
        {"year": 2021, "total_market_japan": 129454, "digital_content": 85000, "network_content": 48000, "game_industry": 200000, "anime_industry": 276000, "music_industry": 31500, "movie_industry": 19800},
        {"year": 2022, "total_market_japan": 129377, "digital_content": 95000, "network_content": 52000, "game_industry": 203160, "anime_industry": 292770, "music_industry": 33720, "movie_industry": 22140},
        {"year": 2023, "total_market_japan": 133597, "digital_content": 103270, "network_content": 55583, "game_industry": 210000, "anime_industry": 334650, "music_industry": 34000, "movie_industry": 20698},
        {"year": 2024, "total_market_japan": 149003, "digital_content": 115000, "network_content": 62000, "game_industry": 220000, "anime_industry": 350000, "music_industry": 35000, "movie_industry": 21000}
    ],
    global_market: [
        {"country": "United States", "market_size_2023": 755, "growth_rate": 4.3},
        {"country": "China", "market_size_2023": 332, "growth_rate": 7.1},
        {"country": "Japan", "market_size_2023": 131, "growth_rate": 1.8},
        {"country": "United Kingdom", "market_size_2023": 102, "growth_rate": 3.2},
        {"country": "Germany", "market_size_2023": 98, "growth_rate": 2.9},
        {"country": "France", "market_size_2023": 59, "growth_rate": 3.1},
        {"country": "South Korea", "market_size_2023": 47, "growth_rate": 6.8},
        {"country": "Italy", "market_size_2023": 38, "growth_rate": 2.4},
        {"country": "Brazil", "market_size_2023": 23, "growth_rate": 5.2}
    ],
    sector_breakdown: [
        {"sector": "動画コンテンツ", "market_size_2023": 423180, "growth_rate": 99.0, "market_share": 31.7},
        {"sector": "ゲーム", "market_size_2023": 219690, "growth_rate": 100.8, "market_share": 16.4},
        {"sector": "音楽・音声", "market_size_2023": 138110, "growth_rate": 113.2, "market_share": 10.3},
        {"sector": "静止画・テキスト", "market_size_2023": 286280, "growth_rate": 98.5, "market_share": 21.4},
        {"sector": "複合型", "market_size_2023": 268700, "growth_rate": 108.3, "market_share": 20.1}
    ],
    platform_distribution: [
        {"platform": "ネットワーク", "market_size_2023": 555830, "market_share": 41.6, "growth_rate": 105.8},
        {"platform": "パッケージメディア", "market_size_2023": 178940, "market_share": 13.4, "growth_rate": 95.2},
        {"platform": "放送", "market_size_2023": 268390, "market_share": 20.1, "growth_rate": 101.2},
        {"platform": "映画館", "market_size_2023": 220700, "market_share": 16.5, "growth_rate": 88.4},
        {"platform": "ライブ・イベント", "market_size_2023": 109740, "market_share": 8.2, "growth_rate": 115.6}
    ],
    streaming_global: [
        {"region": "North America", "market_size_2024": 31500, "growth_rate_cagr": 12.5, "projected_2030": 62400},
        {"region": "Asia Pacific", "market_size_2024": 24800, "growth_rate_cagr": 21.3, "projected_2030": 72100},
        {"region": "Europe", "market_size_2024": 18900, "growth_rate_cagr": 15.2, "projected_2030": 36800},
        {"region": "Latin America", "market_size_2024": 4200, "growth_rate_cagr": 18.7, "projected_2030": 11200},
        {"region": "Middle East & Africa", "market_size_2024": 3600, "growth_rate_cagr": 16.9, "projected_2030": 8500}
    ]
};

// チャートインスタンス
let trendsChart, globalChart, sectorChart, platformChart;

// カラーパレット
const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];
const luxuryColors = {
    gold: '#FFD700',
    silver: '#C0C0C0',
    white: '#FFFFFF',
    darkBlue: '#0a0e27',
    accent: 'rgba(255, 215, 0, 0.8)'
};

// 現在のフィルター状態
let currentFilters = {
    region: 'japan',
    sector: 'all',
    yearStart: 2020,
    yearEnd: 2024,
    chartType: 'bar'
};

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    updateDashboard();
});

// チャート初期化
function initializeCharts() {
    // 日本市場推移チャート
    const trendsCtx = document.getElementById('trendsChart').getContext('2d');
    trendsChart = new Chart(trendsCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: getChartOptions('line')
    });

    // 世界市場比較チャート
    const globalCtx = document.getElementById('globalChart').getContext('2d');
    globalChart = new Chart(globalCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: []
        },
        options: getChartOptions('bar')
    });

    // セクター別チャート
    const sectorCtx = document.getElementById('sectorChart').getContext('2d');
    sectorChart = new Chart(sectorCtx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: []
        },
        options: getChartOptions('pie')
    });

    // プラットフォーム別チャート
    const platformCtx = document.getElementById('platformChart').getContext('2d');
    platformChart = new Chart(platformCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: []
        },
        options: getChartOptions('bar')
    });
}

// チャートオプション設定
function getChartOptions(type) {
    const baseOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: luxuryColors.silver,
                    font: {
                        family: 'Noto Sans JP',
                        size: 12
                    }
                }
            }
        },
        scales: {}
    };

    if (type !== 'pie') {
        baseOptions.scales = {
            x: {
                ticks: {
                    color: luxuryColors.silver
                },
                grid: {
                    color: 'rgba(192, 192, 192, 0.1)'
                }
            },
            y: {
                ticks: {
                    color: luxuryColors.silver
                },
                grid: {
                    color: 'rgba(192, 192, 192, 0.1)'
                }
            }
        };
    }

    return baseOptions;
}

// イベントリスナー設定
function setupEventListeners() {
    // 地域フィルター
    document.querySelectorAll('input[name="region"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentFilters.region = e.target.value;
            updateDashboard();
        });
    });

    // セクターフィルター
    document.getElementById('sectorFilter').addEventListener('change', (e) => {
        currentFilters.sector = e.target.value;
        updateDashboard();
    });

    // 年度フィルター
    const yearStart = document.getElementById('yearStart');
    const yearEnd = document.getElementById('yearEnd');
    
    yearStart.addEventListener('input', (e) => {
        currentFilters.yearStart = parseInt(e.target.value);
        document.getElementById('yearStartDisplay').textContent = e.target.value;
        updateDashboard();
    });

    yearEnd.addEventListener('input', (e) => {
        currentFilters.yearEnd = parseInt(e.target.value);
        document.getElementById('yearEndDisplay').textContent = e.target.value;
        updateDashboard();
    });

    // チャートタイプ
    document.getElementById('chartType').addEventListener('change', (e) => {
        currentFilters.chartType = e.target.value;
        updateDashboard();
    });
}

// ダッシュボード更新
function updateDashboard() {
    updateStatistics();
    updateTrendsChart();
    updateGlobalChart();
    updateSectorChart();
    updatePlatformChart();
    updateDataTable();
}

// 統計カード更新
function updateStatistics() {
    const latestData = dashboardData.japan_content_trends[dashboardData.japan_content_trends.length - 1];
    const previousData = dashboardData.japan_content_trends[dashboardData.japan_content_trends.length - 2];
    
    const totalMarket = (latestData.total_market_japan / 10000).toFixed(1);
    const growthRate = (((latestData.total_market_japan - previousData.total_market_japan) / previousData.total_market_japan) * 100).toFixed(1);
    const digitalRate = ((latestData.digital_content / latestData.total_market_japan) * 100).toFixed(1);
    
    document.getElementById('totalMarket').textContent = `${totalMarket}兆円`;
    document.getElementById('growthRate').textContent = `+${growthRate}%`;
    document.getElementById('digitalRate').textContent = `${digitalRate}%`;
    document.getElementById('globalExpansion').textContent = '35.8%';
}

// 日本市場推移チャート更新
function updateTrendsChart() {
    const filteredData = dashboardData.japan_content_trends.filter(
        item => item.year >= currentFilters.yearStart && item.year <= currentFilters.yearEnd
    );

    const labels = filteredData.map(item => item.year + '年');
    const datasets = [
        {
            label: '総市場',
            data: filteredData.map(item => item.total_market_japan),
            borderColor: luxuryColors.gold,
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            tension: 0.4
        },
        {
            label: 'デジタルコンテンツ',
            data: filteredData.map(item => item.digital_content),
            borderColor: luxuryColors.silver,
            backgroundColor: 'rgba(192, 192, 192, 0.1)',
            tension: 0.4
        },
        {
            label: 'ネットワークコンテンツ',
            data: filteredData.map(item => item.network_content),
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            tension: 0.4
        }
    ];

    trendsChart.data.labels = labels;
    trendsChart.data.datasets = datasets;
    trendsChart.update();
}

// 世界市場比較チャート更新
function updateGlobalChart() {
    if (currentFilters.region === 'global') {
        const labels = dashboardData.global_market.map(item => 
            item.country === 'United States' ? 'アメリカ' :
            item.country === 'China' ? '中国' :
            item.country === 'Japan' ? '日本' :
            item.country === 'United Kingdom' ? 'イギリス' :
            item.country === 'Germany' ? 'ドイツ' :
            item.country === 'France' ? 'フランス' :
            item.country === 'South Korea' ? '韓国' :
            item.country === 'Italy' ? 'イタリア' :
            item.country === 'Brazil' ? 'ブラジル' : item.country
        );
        
        const dataset = {
            label: '市場規模（十億ドル）',
            data: dashboardData.global_market.map(item => item.market_size_2023),
            backgroundColor: colors.slice(0, dashboardData.global_market.length)
        };

        globalChart.data.labels = labels;
        globalChart.data.datasets = [dataset];
    } else if (currentFilters.region === 'streaming') {
        const labels = dashboardData.streaming_global.map(item => 
            item.region === 'North America' ? '北米' :
            item.region === 'Asia Pacific' ? 'アジア太平洋' :
            item.region === 'Europe' ? 'ヨーロッパ' :
            item.region === 'Latin America' ? '南米' :
            item.region === 'Middle East & Africa' ? '中東・アフリカ' : item.region
        );
        
        const dataset = {
            label: 'ストリーミング市場規模（百万ドル）',
            data: dashboardData.streaming_global.map(item => item.market_size_2024),
            backgroundColor: colors.slice(0, dashboardData.streaming_global.length)
        };

        globalChart.data.labels = labels;
        globalChart.data.datasets = [dataset];
    }
    
    globalChart.update();
}

// セクター別チャート更新
function updateSectorChart() {
    const labels = dashboardData.sector_breakdown.map(item => item.sector);
    const data = dashboardData.sector_breakdown.map(item => item.market_share);
    
    const dataset = {
        data: data,
        backgroundColor: colors.slice(0, data.length),
        borderColor: luxuryColors.gold,
        borderWidth: 2
    };

    sectorChart.data.labels = labels;
    sectorChart.data.datasets = [dataset];
    sectorChart.update();
}

// プラットフォーム別チャート更新
function updatePlatformChart() {
    const labels = dashboardData.platform_distribution.map(item => item.platform);
    const data = dashboardData.platform_distribution.map(item => item.market_share);
    
    const dataset = {
        label: 'マーケットシェア（%）',
        data: data,
        backgroundColor: colors.slice(0, data.length)
    };

    platformChart.data.labels = labels;
    platformChart.data.datasets = [dataset];
    platformChart.update();
}

// データテーブル更新
function updateDataTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    let tableData = [];

    if (currentFilters.region === 'japan') {
        tableData = dashboardData.sector_breakdown.map(item => ({
            name: item.sector,
            size: (item.market_size_2023 / 100).toFixed(0),
            growth: item.growth_rate.toFixed(1),
            share: item.market_share.toFixed(1)
        }));
    } else if (currentFilters.region === 'global') {
        tableData = dashboardData.global_market.map(item => ({
            name: item.country === 'United States' ? 'アメリカ' :
                  item.country === 'China' ? '中国' :
                  item.country === 'Japan' ? '日本' :
                  item.country === 'United Kingdom' ? 'イギリス' :
                  item.country === 'Germany' ? 'ドイツ' :
                  item.country === 'France' ? 'フランス' :
                  item.country === 'South Korea' ? '韓国' :
                  item.country === 'Italy' ? 'イタリア' :
                  item.country === 'Brazil' ? 'ブラジル' : item.country,
            size: (item.market_size_2023 * 100).toFixed(0),
            growth: item.growth_rate.toFixed(1),
            share: ((item.market_size_2023 / dashboardData.global_market.reduce((sum, curr) => sum + curr.market_size_2023, 0)) * 100).toFixed(1)
        }));
    } else if (currentFilters.region === 'streaming') {
        tableData = dashboardData.streaming_global.map(item => ({
            name: item.region === 'North America' ? '北米' :
                  item.region === 'Asia Pacific' ? 'アジア太平洋' :
                  item.region === 'Europe' ? 'ヨーロッパ' :
                  item.region === 'Latin America' ? '南米' :
                  item.region === 'Middle East & Africa' ? '中東・アフリカ' : item.region,
            size: (item.market_size_2024 / 10).toFixed(0),
            growth: item.growth_rate_cagr.toFixed(1),
            share: ((item.market_size_2024 / dashboardData.streaming_global.reduce((sum, curr) => sum + curr.market_size_2024, 0)) * 100).toFixed(1)
        }));
    }

    tableData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.size}</td>
            <td>${row.growth}</td>
            <td>${row.share}</td>
        `;
        tbody.appendChild(tr);
    });
}

// チャートタイプ変更時の処理
function updateChartTypes() {
    const chartType = currentFilters.chartType;
    
    // メインチャートタイプを変更（適用可能な場合）
    if (chartType !== 'pie' && globalChart.config.type !== chartType) {
        globalChart.config.type = chartType;
        globalChart.update();
    }
    
    if (chartType !== 'pie' && platformChart.config.type !== chartType) {
        platformChart.config.type = chartType;
        platformChart.update();
    }
}