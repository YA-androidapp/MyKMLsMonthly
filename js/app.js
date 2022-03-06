// Copyright (c) 2022 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.


var map;

const initMap = () => {
    map = L.map('map');

    var slopemap = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/slopemap/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>", minZoom: 3, maxZoom: 15
    }).addTo(map);

    var pale = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>", minZoom: 2, maxZoom: 18
    });

    var baseMaps = {
        "傾斜量図": slopemap,
        "淡色地図": pale
    };
    L.control.layers(baseMaps).addTo(map);

    map.setView([35.91685961322499, 138.71269226074222], 7);

    // omnivore.kml('https://raw.githubusercontent.com/YA-androidapp/MyKMLsMonthly/gh-pages/kml/202101.kml', null,
    //     L.geoJson(null,
    //         { style: { color: 'red', weight: 1, opacity: 1 }, })).addTo(map);

    map.on('move', function (e) {
        console.log(map.getCenter());
    });
}

const listKmlFiles = async () => {
    GitHubName = "YA-androidapp"
    GitHubRepo = "MyKMLsMonthly"
    GitHubPath = "kml"
    header_auth = { "Accept": "application/vnd.github.v3+json" };

    git_url = `https://api.github.com/repos/${GitHubName}/${GitHubRepo}/contents/${GitHubPath}`;
    files = await fetch(git_url, { method: "GET", headers: header_auth }).then(d => d.json());

    return files;
}

const loadKmls = async () => {
    let files = await listKmlFiles();
    console.log('length', files.length);
    // console.log('files', files);

    files.forEach((file, index) => {
        // console.log('file.download_url', file.download_url);
        console.log((index + 1) + '/' + files.length, file.download_url);

        omnivore.kml(file.download_url, null,
            L.geoJson(null,
                { style: { color: 'red', weight: 1, opacity: 1 }, })).addTo(map);
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    initMap();

    if (map) {
        loadKmls();
    }
});
