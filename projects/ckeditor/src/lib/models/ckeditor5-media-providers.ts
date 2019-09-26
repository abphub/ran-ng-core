/**
 * extraProviders
 */
export const MEDIA_PROVIDERS = [
    {
        /**
         * 为腾讯视频cover定义的插入视频规则
         * https://v.qq.com/x/cover/mzc0020097hxjhz/w0924uwb61a.html
         */
        name: 'txp-cover',
        url: /^https:\/\/v\.qq\.com\/x\/cover\/(\w+)\/(\w+)\.html/,
        html: match => {
            return `<div class="ck_media__wrapper_txq">
                    <iframe src="https:/v.qq.com/txp/iframe/player.html?vid=${match[2]}" frameborder="0" >
                    </iframe>
                </div>`;
        }
    },
    {
        /**
         * 为腾讯视频Page定义的插入视频规则
         * https://v.qq.com/x/page/p0395vmkypk.html
         */
        name: 'txp-page',
        url: /^https:\/\/v\.qq\.com\/x\/page\/(\w+)\.html/,
        html: match => {
            return `<div class="ck_media__wrapper_txq">
                    <iframe src="https://v.qq.com/txp/iframe/player.html?vid=${match[1]}" frameborder="0" ></iframe>
                </div>`;
        }
    }
];
