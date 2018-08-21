import md5 from 'md5';

import wtf from 'wtf_wikipedia';

export default async function (component, entity) {

    let imageAddress;
    let localImage = localStorage.getItem('image_' + entity.id);
    if (localImage !== null) {
        try {
            const urlData = JSON.parse(localImage);
            component.setState({
                image: urlData.url
            })
            const weekInMilliSecs = 1000 * 60 * 60 * 24;
            const now = new Date().getTime();
            if (now - Date.parse(urlData.date) < weekInMilliSecs) {
                return
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (!entity.wiki_link) {
        noImage(component);
        return;
    }
    const lang = entity.wiki_link.split('://')[1].split('.')[0];
    const wiki = entity.wiki_link.split('/');
    const pageTitle = wiki[wiki.length - 1];

    let escapedTitle = pageTitle.indexOf('%') > -1 ? pageTitle : encodeURIComponent(pageTitle);
    escapedTitle = escapedTitle.replace('%25C3%2589', 'E').replace("'", '%27');

    const pageIdRequest = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${escapedTitle}&format=json&origin=*`
    const pageIdResponse = await fetch(pageIdRequest);
    const data = await pageIdResponse.json();

    if (data && data.query && data.query.pages) {
        const page = Object.keys(data.query.pages)[0];
        wtf.fetch(parseInt(page, 10), lang).then(doc => {
            const info = doc.infobox(0).data;
            const images = ["logo", "image"];

            for (const img of images) {
                if (Object.keys(info).indexOf(img) > -1) {
                    const name = replaceAll(info[img].data.text, " ", "_");
                    const mdi = md5(name)
                    imageAddress = `https://upload.wikimedia.org/wikipedia/${lang}/${mdi[0]}/${mdi[0] + mdi[1]}/${name}`;

                    if (UrlExists(imageAddress)) {
                        setImageUrl(imageAddress, component, entity)
                        return
                    } else {
                        imageAddress = `https://upload.wikimedia.org/wikipedia/commons/${mdi[0]}/${mdi[0] + mdi[1]}/${name}`;
                        if (UrlExists(imageAddress)) {
                            setImageUrl(imageAddress, component, entity)
                            return
                        }
                    }
                }
            }
            noImage(component);
        }).catch(noImage)
    }
};

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

function noImage(component) {
    console.log('noImage')
    return
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function setImageUrl(url, component, entity) {
    const d = new Date();
    localStorage[`image_${entity.id}`] = JSON.stringify({
        date: d,
        url
    })
    window.location.href.indexOf('/graph/') === -1 ? component.setState({
        image: url
    }) : console.log('abort');

}