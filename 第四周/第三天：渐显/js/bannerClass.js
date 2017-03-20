/**
 * @param container  轮播图最外层的元素
 * @param url   接口 后台提供
 * @param interval  图片播放的频率
 */
(function () {
    function Banner(container, url, interval) {
        this.container = container;
        this.inner = utils.getElementsByClass('inner', this.container)[0];
        this.focus = utils.getElementsByClass('focus', this.container)[0];
        this.left = utils.getElementsByClass('left', this.container)[0];
        this.right = utils.getElementsByClass('right', this.container)[0];
        this.imgs = this.inner.getElementsByTagName('img');
        this.lis = this.focus.getElementsByTagName('li');
        this.data = null;
        this.url = url;
        this.interval = interval || 2000;
        this.index = 0;
        this.time = null;
        this.init();

    }

    Banner.prototype.getData = function () {
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.url + '?_=' + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                that.data = JSON.parse(xhr.responseText)
            }

        }
        xhr.send()
    }

    Banner.prototype.bindData = function () {
        if (this.data && this.data.length) {
            var strImg = '';
            var strLi = '';
            for (var i = 0; i < this.data.length; i++) {
                strImg += '<img src="" real="' + this.data[i].src + '">';
                strLi += i == 0 ? '<li class="cur"></li>' : '<li></li>';
            }
            this.inner.innerHTML = strImg;
            this.focus.innerHTML = strLi;
        }
    }

    Banner.prototype.checkImg = function () {
        for (var i = 0; i < this.imgs.length; i++) {
            var that = this;
            var tempImg = document.createElement('img');
            tempImg.index = i;
            tempImg.src = that.imgs[i].getAttribute('real');
            tempImg.onload = function () {
                that.imgs[this.index].src = this.src;
                if (this.index == 0) {
                    utils.css(that.imgs[0], 'zIndex', 1);
                    animate({
                        ele: that.imgs[0],
                        target: {
                            opacity: 1
                        },
                        duartion: 300
                    })
                }
            }
        }
    }

    Banner.prototype.autoShow = function () {
        this.index++;
        if (this.index == this.data.length) {
            this.index = 0
        }
        this.setImg()
    }

    Banner.prototype.setImg = function () {
        for (var i = 0; i < this.imgs.length; i++) {
            if (i == this.index) {
                utils.css(this.imgs[i], 'zIndex', 1);
                animate({
                    ele: this.imgs[i],
                    target: {
                        opacity: 1
                    },
                    duration: 300,
                    callback: function () {
                        var otherImgs = utils.siblings(this);
                        for (var i = 0; i < otherImgs.length; i++) {
                            utils.css(otherImgs[i], 'opacity', 0)
                        }
                        canClick = true
                    }
                })
            } else {
                utils.css(this.imgs[i], 'zIndex', 0)
            }
            this.lis[i].className = this.index == i ? 'cur' : '';
        }
    }

    Banner.prototype.bindEvent = function () {
        var that = this
        this.container.onmouseover = function () {
            window.clearInterval(that.timer);
            that.left.style.display = that.right.style.display = 'block';
        }
        this.container.onmouseout = function () {
            that.timer = window.setInterval(function () {
                that.autoShow()
            }, that.interval);
            that.left.style.display = that.right.style.display = 'none';
        }
    }

    Banner.prototype.bindEventForBtn = function () {
        var that = this;
        this.right.onclick = function () {
            that.autoShow()
        }
        this.left.onclick = function () {
            that.index--
            if (that.index == -1) {
                that.index = that.data.length - 1;
            }
            that.setImg()

        }
    }

    Banner.prototype.bindEventForLis = function () {
        var that = this;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = function () {
                that.index = this.index
                that.setImg()
            }
        }
    }

    Banner.prototype.init = function () {
        var that = this;
        this.getData();
        this.bindData();
        this.checkImg();
        this.timer = window.setInterval(function () {
            that.autoShow()
        }, that.interval);
        this.bindEvent();
        this.bindEventForBtn();
        this.bindEventForLis();
    };
    window.Banner = Banner;
})()

var main = utils.getElementsByClass('main')[0]
new Banner(main, 'data.txt', 2000)

var main1 = utils.getElementsByClass('main')[1]
new Banner(main1, 'data1.txt', 1000)
