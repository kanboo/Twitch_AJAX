let offset = 0;

var getLiveStreams = function () {
    const clientId = '5rdlf3sosdxy8kjprfx9lebgznkncf';
    const myContentType = 'application/vnd.twitchtv.v5+json';
    const twitchApi = 'https://api.twitch.tv/kraken/streams/';
    const game = 'League of Legends';
    const limit = 20;

    $.ajax({
        method: 'GET',
        url: twitchApi,
        data: {
            contentType: myContentType,
            client_id: clientId,
            game: game,
            limit: limit,
            offset: offset
        },
        success: function (result) {
            // console.log(result);

            var listdata = result.streams;

            $.each(listdata, function () {
                // console.log(this)
                var url = 'https://www.twitch.tv/' + this.channel.name;

                //ES6 字串寫法
                $('.row').append(`
                    <div class="col">
                        <a href="${url}" target="_blank">
                            <div class="header">
                                <img src="${this.preview.medium}" alt="header_img" onload="this.style.opacity=1">
                            </div>
                            <div class="footer">
                                <div class="footer_img">
                                    <img src="${this.channel.logo}" alt="footer_img" onload="this.style.opacity=1">
                                </div>
                                <div class="footer_content">
                                    <div class="channel_name">${this.channel.status}</div>
                                    <div class="intro">${this.channel.display_name}</div>
                                </div>
                            </div>
                        </a>
                    </div>
                `)
            });

            // $('.row').append('<div class="col"></div>');
            // $('.row').append('<div class="col"></div>');

            offset += limit;

        }
    });
}



$(document).ready(function () {
    // 第一次載入
    getLiveStreams();

    // Infinite scroll
    let timer;
    const reservedHeight = 200;
    const timeout = 100;


    $(window).scroll(function () {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(function () {
            //目前滾輪的座標 、 瀏覽器的高度 、 網頁的總高度
            //console.log($(window).scrollTop(), $(window).height(), $(document).height())
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - reservedHeight) {
                getLiveStreams();
                // console.log($(".stream-item").length);
            }
        }, timeout);

    });
});