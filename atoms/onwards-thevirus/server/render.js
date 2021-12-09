import mainTemplate from "./atoms/onwards-thevirus/server/templates/main.html!text"
import Mustache from 'mustache'
import rp from 'request-promise'

export function render() {
    return rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/1eYqZNAQzjXLDsw2VuL_povGH4zuEWrw8IBQ-Xb_utPw.json',
        json: true
    }).then((data) => {
        var sheets = data.sheets;
        console.log(sheets);
        var html = Mustache.render(mainTemplate, sheets);
        return html;
    });
}