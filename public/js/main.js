function FullscreenVideo(t) {
    var e = $.extend({
        playerId: "",
        mp4: "",
        webm: "",
        ogv: "",
        modal: $(".hero-modal"),
        body: $(document.body),
        fullscreenBackground: !0,
        openVideoCallback: null,
        closeVideoCallback: null
    }, t || {});
    e.fullscreenBackground ? this.backgroundVideo = new $.BigVideo({
        useFlashForFirefox: !1
    }) : this.backgroundVideo = null, this.modalVideoOpen = !1, this.pauseBackgroundVideo = function() {
        this.backgroundVideo.getPlayer().pause()
    }, this.playBackgroundVideo = function() {
        this.backgroundVideo.getPlayer().play()
    }, this.playModalVideo = function() {
        this.player.api("play")
    }, this.pauseModalVideo = function() {
        this.player.api("pause")
    }, this.resetModalVideo = function() {
        this.player.api("seekTo", 0)
    }, this.initialize = function() {
        var t = this;
        if (e.fullscreenBackground)
            if (t.backgroundVideo.init(), window.location.search.indexOf("autoplay=true") > -1 && t.openVideoModal(), Modernizr.touch) t.backgroundVideo.show(e.fallback);
            else {
                var n = document.getElementById("big-video-wrap");
                TweenLite.set(n, {
                    autoAlpha: 0
                }), t.backgroundVideo.show([{
                    type: "video/mp4",
                    src: e.mp4
                }, {
                    type: "video/webm",
                    src: e.webm
                }, {
                    type: "video/ogg",
                    src: e.ogv
                }], {
                    controls: !1,
                    ambient: !0,
                    doLoop: !0
                }), _V_("big-video-vid_html5_api").ready(function() {
                    this.on("loadeddata", function() {
                        $(".heros").addClass("video-loaded"), TweenLite.to(n, .5, {
                            autoAlpha: 1
                        })
                    }).on("ended", function() {
                        t.backgroundVideo.getPlayer().currentTime(0)
                    })
                }), $(window).on("keyup", function(e) {
                    t.modalVideoOpen && 27 == e.keyCode && t.closeVideoModal()
                })
            }
    }, this.openVideoModal = function() {
        var t = this;
        t.player = $f($("#" + e.playerId)[0]), e.body.addClass("no-overflow"), t.modalVideoOpen = !0, TweenLite.to(e.modal, .5, {
            force3D: !0,
            autoAlpha: 1,
            zIndex: 100,
            display: "block",
            onComplete: function() {
                e.modal.addClass("is-open"), "function" == typeof e.openVideoCallback && e.openVideoCallback(), Modernizr.touch || t.playModalVideo(), e.fullscreenBackground && t.pauseBackgroundVideo()
            }
        }), t.player.addEvent("ready", function() {
            t.player.addEvent("finish", function() {
                t.closeVideoModal()
            })
        })
    }, this.closeVideoModal = function() {
        var t = this;
        e.body.removeClass("no-overflow"), e.modal.removeClass("is-open"), t.pauseModalVideo(), TweenLite.to(e.modal, .5, {
            force3D: !0,
            autoAlpha: 0,
            zIndex: -1,
            onComplete: function() {
                t.modalVideoOpen = !1, "function" == typeof e.closeVideoCallback && e.closeVideoCallback(), t.resetModalVideo(), e.fullscreenBackground && t.playBackgroundVideo(), TweenLite.set(e.modal, {
                    display: "none"
                })
            }
        })
    }
}

function QuoteSlider(t) {
    "use strict";
    var e = $.extend({
        quoteSlider: $(".quotes"),
        quoteVideos: $(".quote-video"),
        avatars: $(".avatars"),
        defaultSlide: $(".quote-1"),
        defaultLink: $(".quote-link-1"),
        play: $(".play"),
        closeTargets: $(".avatars a, .slide .inside, .slide-close"),
        win: $(window)
    }, t || {});
    this.quoteSliderAnimating = !1, this.quoteSliderVideoActive = !1, this.quoteContainerHeight = e.quoteSlider.outerHeight(), this.initialize = function() {
        var t = this;
        TweenLite.set(e.quoteSlider.find(".slide"), {
            css: {
                transform: "translateY(" + t.quoteContainerHeight + "px)",
                zIndex: 2
            }
        }), TweenLite.set(e.quoteVideos, {
            autoAlpha: 0
        }), t.swapQuote(e.defaultSlide, e.defaultLink), e.avatars.on("click", "a", function(e) {
            e.preventDefault();
            var n = $(this);
            t.swapQuote($("." + n.data("rel")), n)
        }), e.play.on("click", function(e) {
            e.preventDefault(), t.playVideo($(this))
        })
    };
    var n = function(t, e) {
            var n = t.split(/[\?&]+/);
            for (i = 0; i < n.length; i++) {
                var o = n[i].split("=");
                if (o[0] == e) return o[1]
            }
        },
        o = function(t) {
            var e = t.getAttribute("data-src");
            null !== e && (t.src = e, t.id = n(e, "player_id"), t.removeAttribute("data-src"))
        },
        r = function(t, n, i) {
            t.animateInAvatars(), n.vimeo("pause"), e.closeTargets.unbind("click touchend"), TweenLite.to(n, .5, {
                force3D: !0,
                autoAlpha: 0,
                zIndex: -1,
                onComplete: function() {
                    t.quoteSliderVideoActive = !1, n.vimeo("unload"), i.removeClass("video-active")
                }
            })
        };
    this.playVideo = function(t) {
        var n = this,
            i = t.parents(".slide").first(),
            s = i.find(e.quoteVideos);
        o(s[0]), s.on("play", function() {
            i.removeClass("paused").addClass("playing")
        }).on("pause", function() {
            i.removeClass("playing").addClass("paused")
        }).on("finish", function() {
            r(n, s, i)
        }), n.animateOutAvatars(), i.addClass("video-active"), n.quoteSliderVideoActive = !0, TweenLite.to(s, .5, {
            force3D: !0,
            autoAlpha: 1,
            zIndex: 10,
            overwrite: !0,
            onComplete: function() {
                s.vimeo("play"), e.closeTargets.on("click touchend", function(t) {
                    t.preventDefault(), r(n, s, i)
                }), e.win.on("keyup", function(t) {
                    27 == t.keyCode && n.quoteSliderVideoActive && r(n, s, i)
                })
            }
        })
    }, this.swapQuote = function(t, n) {
        var i = this;
        n.hasClass("active") || i.quoteSliderAnimating || (i.quoteSliderAnimating = !0, e.avatars.find("a").removeClass("active"), n.addClass("active"), e.quoteSlider.find("> div").addClass("inactive"), t.removeClass("inactive"), TweenLite.to($(".inactive"), .1, {
            force3D: !0,
            zIndex: 3,
            onComplete: function() {
                TweenLite.to(t, 0, {
                    zIndex: 5
                }), TweenLite.to(t, .5, {
                    force3D: !0,
                    ease: Power2.easeOut,
                    css: {
                        transform: "translateY(0)"
                    },
                    onComplete: function() {
                        TweenLite.to($(".inactive"), .1, {
                            force3D: !0,
                            css: {
                                transform: "translateY(" + i.quoteContainerHeight + "px)",
                                zIndex: -1
                            },
                            onComplete: function() {
                                i.quoteSliderAnimating = !1
                            }
                        })
                    }
                })
            }
        }))
    }, this.animateOutAvatars = function() {
        for (var t = 0, n = 60, i = e.avatars.find("li"), o = 0, r = i.length; o < r; o++) TweenLite.to(i[o], .3, {
            force3D: !0,
            overwrite: !0,
            ease: Power2.easeInOut,
            delay: t,
            css: {
                transform: "translate(" + n + "px, 45px) scale(0.75)"
            }
        }), n -= 30, t += .05
    }, this.animateInAvatars = function() {
        for (var t = .25, n = e.avatars.find("li"), i = 0, o = n.length; i < o; i++) TweenLite.to(n[i], .3, {
            force3D: !0,
            overwrite: !0,
            ease: Power2.easeInOut,
            delay: t,
            css: {
                transform: "translate(0, 0) scale(1)"
            }
        }), t -= .05
    }
}

function setupShirtModal() {
    if (shouldShowModal()) {
        window.setTimeout(function() {
            openShirtModal()
        }, modalDelay);
        trackPages()
    }
}

function openShirtModal() {
    return clearTimeout(shirtTimer), !Modernizr.touch && void(!isShirtModalOpen && shouldShowModal() && ($.tinybox({
        padding: 0,
        autoDimensions: !0,
        href: "#tshirt_modal",
        wrapCSS: "tshirtmodal",
        afterShow: function() {
            $tshirtModal.find("input[type=text]").focus(), $tshirtSticky.fadeOut()
        }
    }), isShirtModalOpen = !0))
}


function shouldShowModal() {
    var t = 1 != $.cookie("dont-show-tshirt-modal") && 1 != $.cookie("modal-showing") && !$body.hasClass("tshirt") && !$body.hasClass("ent_boxes") && !$body.hasClass("enterprise");
    return t
}

function trackPages() {
    var t = $.cookie("pages-viewed") ? parseInt($.cookie("pages-viewed")) + 1 : 1;
    3 !== t || $("body").hasClass("ent_boxes") || openShirtModal(), $.cookie("pages-viewed", t, {
        path: "/"
    })
}

function tshirtFormSubmission() {
    var t = $("#tshirt_email");
    $tshirtModal.find("div.subscribe");
    $(".tshirt_form").validate({
        rules: {
            tshirt_email: {
                required: !0,
                email: !0
            }
        },
        submitHandler: function(e) {
            $.post("/api/tshirtSubmission", {
                email: t.val(),
                listSource: "biscuit-tshirt",
                hs_context: JSON.stringify({
                    hutk: $.cookie("hubspotutk"),
                    pageUrl: window.location.href,
                    pageName: document.title
                })
            }, function() {
                var e = new Track;
                e.lead(t.val()), $.tinybox({
                    content: $tshirtTweet,
                    padding: 0,
                    wrapCSS: "tshirtmodal-post",
                    afterShow: function() {
                        $(".tshirt_tweet_link, .opt-out a").on("click", function(t) {
                            t.preventDefault(), $.tinybox({
                                content: $tshirtFollow,
                                padding: 0,
                                wrapCSS: "tshirtmodal-post",
                                afterShow: function() {
                                    $(".global-share a, .global-share").on("click touchend", function(t) {
                                        t.preventDefault();
                                        var e = $(this);
                                        closeShirtModal(), popupCenter(e.attr("href"), "Follow about critico", e.data("width"), e.data("height"))
                                    })
                                }
                            }), $(this).hasClass("tshirt_tweet_link") && popupCenter($(".tshirt_tweet_link").attr("href"), "Tweet about critico", 800, 400)
                        })
                    }
                })
            })
        }
    })
}

function popupCenter(t, e, n, i) {
    var o, r, s, a, l, u = void 0 !== window.screenLeft ? window.screenLeft : screen.left,
        c = void 0 !== window.screenTop ? window.screenTop : screen.top;
    a = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width, l = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height, o = a / 2 - n / 2 + u, r = l / 2 - i / 2 + c, s = window.open(t, e, "scrollbars=yes, width=" + n + ", height=" + i + ", top=" + r + ", left=" + o), window.focus && s.focus()
}


function loadBufferSM() {
    $(".dd-buffer-3223").remove(), $.getScript("https://d389zggrogs7qo.cloudfront.net/js/button.js")
}

function loadRedditSM() {
    $(".dd-reddit-3223").remove(), $(".DD_REDDIT_AJAX_3223").attr("width", "51"), $(".DD_REDDIT_AJAX_3223").attr("height", "69"), $(".DD_REDDIT_AJAX_3223").attr("src", "http://www.reddit.com/static/button/button2.html?width=51&url=" + window.encodedFeatureURL + "&title=" + window.encodedFeatureTitle + "&newwindow=1")
}

function loadFBLikeSM() {
    $(".dd-fblike-3223").remove(), $(".DD_FBLIKE_AJAX_3223").attr("width", "500"), $(".DD_FBLIKE_AJAX_3223").attr("height", "24"), $(".DD_FBLIKE_AJAX_3223").attr("src", "http://www.facebook.com/plugins/like.php?href=" + window.encodedFeatureURL + "&locale=en_US&layout=standard&action=recommend&width=400&height=24&colorscheme=light")
}

function loadLinkedinSM() {
    $(".dd-linkedin-3223").remove(), $.getScript("//platform.linkedin.com/in.js")
}

function loadDeliciousSM() {
    $(".dd-delicious-3223").remove(), $.getJSON("//feeds.delicious.com/v2/json/urlinfo/data?url=" + window.featureURL + "&amp;callback=?", function(t) {
        var e = "",
            n = 0;
        t.length > 0 ? (n = t[0].total_posts, e = 0 === n ? "0" : 1 == n ? "1" : n) : e = "0", $("#DD_DELICIOUS_AJAX_3223").text(e)
    })
}! function(t, e) {
    function n(t) {
        var e = t.length,
            n = rt.type(t);
        return !rt.isWindow(t) && (!(1 !== t.nodeType || !e) || ("array" === n || "function" !== n && (0 === e || "number" == typeof e && e > 0 && e - 1 in t)))
    }

    function i(t) {
        var e = ft[t] = {};
        return rt.each(t.match(at) || [], function(t, n) {
            e[n] = !0
        }), e
    }

    function o() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = rt.expando + Math.random()
    }

    function r(t, n, i) {
        var o;
        if (i === e && 1 === t.nodeType)
            if (o = "data-" + n.replace(yt, "-$1").toLowerCase(), i = t.getAttribute(o), "string" == typeof i) {
                try {
                    i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : vt.test(i) ? JSON.parse(i) : i)
                }
                catch (r) {}
                mt.set(t, n, i)
            }
            else i = e;
        return i
    }

    function s() {
        return !0
    }

    function a() {
        return !1
    }

    function l() {
        try {
            return W.activeElement
        }
        catch (t) {}
    }

    function u(t, e) {
        for (;
            (t = t[e]) && 1 !== t.nodeType;);
        return t
    }

    function c(t, e, n) {
        if (rt.isFunction(e)) return rt.grep(t, function(t, i) {
            return !!e.call(t, i, t) !== n
        });
        if (e.nodeType) return rt.grep(t, function(t) {
            return t === e !== n
        });
        if ("string" == typeof e) {
            if (Ft.test(e)) return rt.filter(e, t, n);
            e = rt.filter(e, t)
        }
        return rt.grep(t, function(t) {
            return et.call(e, t) >= 0 !== n
        })
    }

    function h(t, e) {
        return rt.nodeName(t, "table") && rt.nodeName(1 === e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function d(t) {
        return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
    }

    function p(t) {
        var e = It.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function f(t, e) {
        for (var n = t.length, i = 0; i < n; i++) gt.set(t[i], "globalEval", !e || gt.get(e[i], "globalEval"))
    }

    function m(t, e) {
        var n, i, o, r, s, a, l, u;
        if (1 === e.nodeType) {
            if (gt.hasData(t) && (r = gt.access(t), s = gt.set(e, r), u = r.events)) {
                delete s.handle, s.events = {};
                for (o in u)
                    for (n = 0, i = u[o].length; n < i; n++) rt.event.add(e, o, u[o][n])
            }
            mt.hasData(t) && (a = mt.access(t), l = rt.extend({}, a), mt.set(e, l))
        }
    }

    function g(t, n) {
        var i = t.getElementsByTagName ? t.getElementsByTagName(n || "*") : t.querySelectorAll ? t.querySelectorAll(n || "*") : [];
        return n === e || n && rt.nodeName(t, n) ? rt.merge([t], i) : i
    }

    function v(t, e) {
        var n = e.nodeName.toLowerCase();
        "input" === n && Nt.test(t.type) ? e.checked = t.checked : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
    }

    function y(t, e) {
        if (e in t) return e;
        for (var n = e.charAt(0).toUpperCase() + e.slice(1), i = e, o = Zt.length; o--;)
            if (e = Zt[o] + n, e in t) return e;
        return i
    }

    function b(t, e) {
        return t = e || t, "none" === rt.css(t, "display") || !rt.contains(t.ownerDocument, t)
    }

    function w(e) {
        return t.getComputedStyle(e, null)
    }

    function x(t, e) {
        for (var n, i, o, r = [], s = 0, a = t.length; s < a; s++) i = t[s], i.style && (r[s] = gt.get(i, "olddisplay"), n = i.style.display, e ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && b(i) && (r[s] = gt.access(i, "olddisplay", C(i.nodeName)))) : r[s] || (o = b(i), (n && "none" !== n || !o) && gt.set(i, "olddisplay", o ? n : rt.css(i, "display"))));
        for (s = 0; s < a; s++) i = t[s], i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? r[s] || "" : "none"));
        return t
    }

    function _(t, e, n) {
        var i = Xt.exec(e);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
    }

    function k(t, e, n, i, o) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; r < 4; r += 2) "margin" === n && (s += rt.css(t, n + Kt[r], !0, o)), i ? ("content" === n && (s -= rt.css(t, "padding" + Kt[r], !0, o)), "margin" !== n && (s -= rt.css(t, "border" + Kt[r] + "Width", !0, o))) : (s += rt.css(t, "padding" + Kt[r], !0, o), "padding" !== n && (s += rt.css(t, "border" + Kt[r] + "Width", !0, o)));
        return s
    }

    function T(t, e, n) {
        var i = !0,
            o = "width" === e ? t.offsetWidth : t.offsetHeight,
            r = w(t),
            s = rt.support.boxSizing && "border-box" === rt.css(t, "boxSizing", !1, r);
        if (o <= 0 || null == o) {
            if (o = Ht(t, e, r), (o < 0 || null == o) && (o = t.style[e]), Ut.test(o)) return o;
            i = s && (rt.support.boxSizingReliable || o === t.style[e]), o = parseFloat(o) || 0
        }
        return o + k(t, e, n || (s ? "border" : "content"), i, r) + "px"
    }

    function C(t) {
        var e = W,
            n = Qt[t];
        return n || (n = $(t, e), "none" !== n && n || (Vt = (Vt || rt("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(e.documentElement), e = (Vt[0].contentWindow || Vt[0].contentDocument).document, e.write("<!doctype html><html><body>"), e.close(), n = $(t, e), Vt.detach()), Qt[t] = n), n
    }

    function $(t, e) {
        var n = rt(e.createElement(t)).appendTo(e.body),
            i = rt.css(n[0], "display");
        return n.remove(), i
    }

    function S(t, e, n, i) {
        var o;
        if (rt.isArray(e)) rt.each(e, function(e, o) {
            n || ee.test(t) ? i(t, o) : S(t + "[" + ("object" == typeof o ? e : "") + "]", o, n, i)
        });
        else if (n || "object" !== rt.type(e)) i(t, e);
        else
            for (o in e) S(t + "[" + o + "]", e[o], n, i)
    }

    function F(t) {
        return function(e, n) {
            "string" != typeof e && (n = e, e = "*");
            var i, o = 0,
                r = e.toLowerCase().match(at) || [];
            if (rt.isFunction(n))
                for (; i = r[o++];) "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
        }
    }

    function j(t, e, n, i) {
        function o(a) {
            var l;
            return r[a] = !0, rt.each(t[a] || [], function(t, a) {
                var u = a(e, n, i);
                return "string" != typeof u || s || r[u] ? s ? !(l = u) : void 0 : (e.dataTypes.unshift(u), o(u), !1)
            }), l
        }
        var r = {},
            s = t === ye;
        return o(e.dataTypes[0]) || !r["*"] && o("*")
    }

    function E(t, n) {
        var i, o, r = rt.ajaxSettings.flatOptions || {};
        for (i in n) n[i] !== e && ((r[i] ? t : o || (o = {}))[i] = n[i]);
        return o && rt.extend(!0, t, o), t
    }

    function P(t, n, i) {
        for (var o, r, s, a, l = t.contents, u = t.dataTypes;
            "*" === u[0];) u.shift(), o === e && (o = t.mimeType || n.getResponseHeader("Content-Type"));
        if (o)
            for (r in l)
                if (l[r] && l[r].test(o)) {
                    u.unshift(r);
                    break
                }
        if (u[0] in i) s = u[0];
        else {
            for (r in i) {
                if (!u[0] || t.converters[r + " " + u[0]]) {
                    s = r;
                    break
                }
                a || (a = r)
            }
            s = s || a
        }
        if (s) return s !== u[0] && u.unshift(s), i[s]
    }

    function M(t, e, n, i) {
        var o, r, s, a, l, u = {},
            c = t.dataTypes.slice();
        if (c[1])
            for (s in t.converters) u[s.toLowerCase()] = t.converters[s];
        for (r = c.shift(); r;)
            if (t.responseFields[r] && (n[t.responseFields[r]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = r, r = c.shift())
                if ("*" === r) r = l;
                else if ("*" !== l && l !== r) {
            if (s = u[l + " " + r] || u["* " + r], !s)
                for (o in u)
                    if (a = o.split(" "), a[1] === r && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
                        s === !0 ? s = u[o] : u[o] !== !0 && (r = a[0], c.unshift(a[1]));
                        break
                    }
            if (s !== !0)
                if (s && t["throws"]) e = s(e);
                else try {
                    e = s(e)
                }
                catch (h) {
                    return {
                        state: "parsererror",
                        error: s ? h : "No conversion from " + l + " to " + r
                    }
                }
        }
        return {
            state: "success",
            data: e
        }
    }

    function A() {
        return setTimeout(function() {
            Se = e
        }), Se = rt.now()
    }

    function O(t, e, n) {
        for (var i, o = (Ae[e] || []).concat(Ae["*"]), r = 0, s = o.length; r < s; r++)
            if (i = o[r].call(n, e, t)) return i
    }

    function D(t, e, n) {
        var i, o, r = 0,
            s = Me.length,
            a = rt.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (o) return !1;
                for (var e = Se || A(), n = Math.max(0, u.startTime + u.duration - e), i = n / u.duration || 0, r = 1 - i, s = 0, l = u.tweens.length; s < l; s++) u.tweens[s].run(r);
                return a.notifyWith(t, [u, r, n]), r < 1 && l ? n : (a.resolveWith(t, [u]), !1)
            },
            u = a.promise({
                elem: t,
                props: rt.extend({}, e),
                opts: rt.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: e,
                originalOptions: n,
                startTime: Se || A(),
                duration: n.duration,
                tweens: [],
                createTween: function(e, n) {
                    var i = rt.Tween(t, u.opts, e, n, u.opts.specialEasing[e] || u.opts.easing);
                    return u.tweens.push(i), i
                },
                stop: function(e) {
                    var n = 0,
                        i = e ? u.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; n < i; n++) u.tweens[n].run(1);
                    return e ? a.resolveWith(t, [u, e]) : a.rejectWith(t, [u, e]), this
                }
            }),
            c = u.props;
        for (N(c, u.opts.specialEasing); r < s; r++)
            if (i = Me[r].call(u, t, c, u.opts)) return i;
        return rt.map(c, O, u), rt.isFunction(u.opts.start) && u.opts.start.call(t, u), rt.fx.timer(rt.extend(l, {
            elem: t,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function N(t, e) {
        var n, i, o, r, s;
        for (n in t)
            if (i = rt.camelCase(n), o = e[i], r = t[n], rt.isArray(r) && (o = r[1], r = t[n] = r[0]), n !== i && (t[i] = r, delete t[n]), s = rt.cssHooks[i], s && "expand" in s) {
                r = s.expand(r), delete t[i];
                for (n in r) n in t || (t[n] = r[n], e[n] = o)
            }
            else e[i] = o
    }

    function L(t, n, i) {
        var o, r, s, a, l, u, c = this,
            h = {},
            d = t.style,
            p = t.nodeType && b(t),
            f = gt.get(t, "fxshow");
        i.queue || (l = rt._queueHooks(t, "fx"), null == l.unqueued && (l.unqueued = 0, u = l.empty.fire, l.empty.fire = function() {
            l.unqueued || u()
        }), l.unqueued++, c.always(function() {
            c.always(function() {
                l.unqueued--, rt.queue(t, "fx").length || l.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in n || "width" in n) && (i.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === rt.css(t, "display") && "none" === rt.css(t, "float") && (d.display = "inline-block")), i.overflow && (d.overflow = "hidden", c.always(function() {
            d.overflow = i.overflow[0], d.overflowX = i.overflow[1], d.overflowY = i.overflow[2]
        }));
        for (o in n)
            if (r = n[o], je.exec(r)) {
                if (delete n[o], s = s || "toggle" === r, r === (p ? "hide" : "show")) {
                    if ("show" !== r || !f || f[o] === e) continue;
                    p = !0
                }
                h[o] = f && f[o] || rt.style(t, o)
            }
        if (!rt.isEmptyObject(h)) {
            f ? "hidden" in f && (p = f.hidden) : f = gt.access(t, "fxshow", {}), s && (f.hidden = !p), p ? rt(t).show() : c.done(function() {
                rt(t).hide()
            }), c.done(function() {
                var e;
                gt.remove(t, "fxshow");
                for (e in h) rt.style(t, e, h[e])
            });
            for (o in h) a = O(p ? f[o] : 0, o, c), o in f || (f[o] = a.start, p && (a.end = a.start, a.start = "width" === o || "height" === o ? 1 : 0))
        }
    }

    function R(t, e, n, i, o) {
        return new R.prototype.init(t, e, n, i, o)
    }

    function I(t, e) {
        var n, i = {
                height: t
            },
            o = 0;
        for (e = e ? 1 : 0; o < 4; o += 2 - e) n = Kt[o], i["margin" + n] = i["padding" + n] = t;
        return e && (i.opacity = i.width = t), i
    }

    function q(t) {
        return rt.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
    }
    var z, H, V = typeof e,
        B = t.location,
        W = t.document,
        X = W.documentElement,
        U = t.jQuery,
        Y = t.$,
        Q = {},
        J = [],
        G = "2.0.3",
        K = J.concat,
        Z = J.push,
        tt = J.slice,
        et = J.indexOf,
        nt = Q.toString,
        it = Q.hasOwnProperty,
        ot = G.trim,
        rt = function(t, e) {
            return new rt.fn.init(t, e, z)
        },
        st = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        at = /\S+/g,
        lt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        ut = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ct = /^-ms-/,
        ht = /-([\da-z])/gi,
        dt = function(t, e) {
            return e.toUpperCase()
        },
        pt = function() {
            W.removeEventListener("DOMContentLoaded", pt, !1), t.removeEventListener("load", pt, !1), rt.ready()
        };
    rt.fn = rt.prototype = {
            jquery: G,
            constructor: rt,
            init: function(t, n, i) {
                var o, r;
                if (!t) return this;
                if ("string" == typeof t) {
                    if (o = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : lt.exec(t), !o || !o[1] && n) return !n || n.jquery ? (n || i).find(t) : this.constructor(n).find(t);
                    if (o[1]) {
                        if (n = n instanceof rt ? n[0] : n, rt.merge(this, rt.parseHTML(o[1], n && n.nodeType ? n.ownerDocument || n : W, !0)), ut.test(o[1]) && rt.isPlainObject(n))
                            for (o in n) rt.isFunction(this[o]) ? this[o](n[o]) : this.attr(o, n[o]);
                        return this
                    }
                    return r = W.getElementById(o[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = W, this.selector = t, this
                }
                return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : rt.isFunction(t) ? i.ready(t) : (t.selector !== e && (this.selector = t.selector, this.context = t.context), rt.makeArray(t, this))
            },
            selector: "",
            length: 0,
            toArray: function() {
                return tt.call(this)
            },
            get: function(t) {
                return null == t ? this.toArray() : t < 0 ? this[this.length + t] : this[t]
            },
            pushStack: function(t) {
                var e = rt.merge(this.constructor(), t);
                return e.prevObject = this, e.context = this.context, e
            },
            each: function(t, e) {
                return rt.each(this, t, e)
            },
            ready: function(t) {
                return rt.ready.promise().done(t), this
            },
            slice: function() {
                return this.pushStack(tt.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(t) {
                var e = this.length,
                    n = +t + (t < 0 ? e : 0);
                return this.pushStack(n >= 0 && n < e ? [this[n]] : [])
            },
            map: function(t) {
                return this.pushStack(rt.map(this, function(e, n) {
                    return t.call(e, n, e)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: Z,
            sort: [].sort,
            splice: [].splice
        }, rt.fn.init.prototype = rt.fn, rt.extend = rt.fn.extend = function() {
            var t, n, i, o, r, s, a = arguments[0] || {},
                l = 1,
                u = arguments.length,
                c = !1;
            for ("boolean" == typeof a && (c = a, a = arguments[1] || {}, l = 2), "object" == typeof a || rt.isFunction(a) || (a = {}), u === l && (a = this, --l); l < u; l++)
                if (null != (t = arguments[l]))
                    for (n in t) i = a[n], o = t[n], a !== o && (c && o && (rt.isPlainObject(o) || (r = rt.isArray(o))) ? (r ? (r = !1, s = i && rt.isArray(i) ? i : []) : s = i && rt.isPlainObject(i) ? i : {}, a[n] = rt.extend(c, s, o)) : o !== e && (a[n] = o));
            return a
        }, rt.extend({
            expando: "jQuery" + (G + Math.random()).replace(/\D/g, ""),
            noConflict: function(e) {
                return t.$ === rt && (t.$ = Y), e && t.jQuery === rt && (t.jQuery = U), rt
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(t) {
                t ? rt.readyWait++ : rt.ready(!0)
            },
            ready: function(t) {
                (t === !0 ? --rt.readyWait : rt.isReady) || (rt.isReady = !0, t !== !0 && --rt.readyWait > 0 || (H.resolveWith(W, [rt]), rt.fn.trigger && rt(W).trigger("ready").off("ready")))
            },
            isFunction: function(t) {
                return "function" === rt.type(t)
            },
            isArray: Array.isArray,
            isWindow: function(t) {
                return null != t && t === t.window
            },
            isNumeric: function(t) {
                return !isNaN(parseFloat(t)) && isFinite(t)
            },
            type: function(t) {
                return null == t ? String(t) : "object" == typeof t || "function" == typeof t ? Q[nt.call(t)] || "object" : typeof t
            },
            isPlainObject: function(t) {
                if ("object" !== rt.type(t) || t.nodeType || rt.isWindow(t)) return !1;
                try {
                    if (t.constructor && !it.call(t.constructor.prototype, "isPrototypeOf")) return !1
                }
                catch (e) {
                    return !1
                }
                return !0
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            error: function(t) {
                throw new Error(t)
            },
            parseHTML: function(t, e, n) {
                if (!t || "string" != typeof t) return null;
                "boolean" == typeof e && (n = e, e = !1), e = e || W;
                var i = ut.exec(t),
                    o = !n && [];
                return i ? [e.createElement(i[1])] : (i = rt.buildFragment([t], e, o), o && rt(o).remove(), rt.merge([], i.childNodes))
            },
            parseJSON: JSON.parse,
            parseXML: function(t) {
                var n, i;
                if (!t || "string" != typeof t) return null;
                try {
                    i = new DOMParser, n = i.parseFromString(t, "text/xml")
                }
                catch (o) {
                    n = e
                }
                return n && !n.getElementsByTagName("parsererror").length || rt.error("Invalid XML: " + t), n
            },
            noop: function() {},
            globalEval: function(t) {
                var e, n = eval;
                t = rt.trim(t), t && (1 === t.indexOf("use strict") ? (e = W.createElement("script"), e.text = t, W.head.appendChild(e).parentNode.removeChild(e)) : n(t))
            },
            camelCase: function(t) {
                return t.replace(ct, "ms-").replace(ht, dt)
            },
            nodeName: function(t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            },
            each: function(t, e, i) {
                var o, r = 0,
                    s = t.length,
                    a = n(t);
                if (i) {
                    if (a)
                        for (; r < s && (o = e.apply(t[r], i), o !== !1); r++);
                    else
                        for (r in t)
                            if (o = e.apply(t[r], i), o === !1) break
                }
                else if (a)
                    for (; r < s && (o = e.call(t[r], r, t[r]), o !== !1); r++);
                else
                    for (r in t)
                        if (o = e.call(t[r], r, t[r]), o === !1) break; return t
            },
            trim: function(t) {
                return null == t ? "" : ot.call(t)
            },
            makeArray: function(t, e) {
                var i = e || [];
                return null != t && (n(Object(t)) ? rt.merge(i, "string" == typeof t ? [t] : t) : Z.call(i, t)), i
            },
            inArray: function(t, e, n) {
                return null == e ? -1 : et.call(e, t, n)
            },
            merge: function(t, n) {
                var i = n.length,
                    o = t.length,
                    r = 0;
                if ("number" == typeof i)
                    for (; r < i; r++) t[o++] = n[r];
                else
                    for (; n[r] !== e;) t[o++] = n[r++];
                return t.length = o, t
            },
            grep: function(t, e, n) {
                var i, o = [],
                    r = 0,
                    s = t.length;
                for (n = !!n; r < s; r++) i = !!e(t[r], r), n !== i && o.push(t[r]);
                return o
            },
            map: function(t, e, i) {
                var o, r = 0,
                    s = t.length,
                    a = n(t),
                    l = [];
                if (a)
                    for (; r < s; r++) o = e(t[r], r, i), null != o && (l[l.length] = o);
                else
                    for (r in t) o = e(t[r], r, i), null != o && (l[l.length] = o);
                return K.apply([], l)
            },
            guid: 1,
            proxy: function(t, n) {
                var i, o, r;
                return "string" == typeof n && (i = t[n], n = t, t = i), rt.isFunction(t) ? (o = tt.call(arguments, 2), r = function() {
                    return t.apply(n || this, o.concat(tt.call(arguments)))
                }, r.guid = t.guid = t.guid || rt.guid++, r) : e
            },
            access: function(t, n, i, o, r, s, a) {
                var l = 0,
                    u = t.length,
                    c = null == i;
                if ("object" === rt.type(i)) {
                    r = !0;
                    for (l in i) rt.access(t, n, l, i[l], !0, s, a)
                }
                else if (o !== e && (r = !0, rt.isFunction(o) || (a = !0), c && (a ? (n.call(t, o), n = null) : (c = n, n = function(t, e, n) {
                        return c.call(rt(t), n)
                    })), n))
                    for (; l < u; l++) n(t[l], i, a ? o : o.call(t[l], l, n(t[l], i)));
                return r ? t : c ? n.call(t) : u ? n(t[0], i) : s
            },
            now: Date.now,
            swap: function(t, e, n, i) {
                var o, r, s = {};
                for (r in e) s[r] = t.style[r], t.style[r] = e[r];
                o = n.apply(t, i || []);
                for (r in e) t.style[r] = s[r];
                return o
            }
        }), rt.ready.promise = function(e) {
            return H || (H = rt.Deferred(), "complete" === W.readyState ? setTimeout(rt.ready) : (W.addEventListener("DOMContentLoaded", pt, !1), t.addEventListener("load", pt, !1))), H.promise(e)
        }, rt.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
            Q["[object " + e + "]"] = e.toLowerCase()
        }), z = rt(W),
        function(t, e) {
            function n(t, e, n, i) {
                var o, r, s, a, l, u, c, h, f, m;
                if ((e ? e.ownerDocument || e : q) !== M && P(e), e = e || M, n = n || [], !t || "string" != typeof t) return n;
                if (1 !== (a = e.nodeType) && 9 !== a) return [];
                if (O && !i) {
                    if (o = bt.exec(t))
                        if (s = o[1]) {
                            if (9 === a) {
                                if (r = e.getElementById(s), !r || !r.parentNode) return n;
                                if (r.id === s) return n.push(r), n
                            }
                            else if (e.ownerDocument && (r = e.ownerDocument.getElementById(s)) && R(e, r) && r.id === s) return n.push(r), n
                        }
                        else {
                            if (o[2]) return tt.apply(n, e.getElementsByTagName(t)), n;
                            if ((s = o[3]) && k.getElementsByClassName && e.getElementsByClassName) return tt.apply(n, e.getElementsByClassName(s)), n
                        }
                    if (k.qsa && (!D || !D.test(t))) {
                        if (h = c = I, f = e, m = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                            for (u = d(t), (c = e.getAttribute("id")) ? h = c.replace(_t, "\\$&") : e.setAttribute("id", h), h = "[id='" + h + "'] ", l = u.length; l--;) u[l] = h + p(u[l]);
                            f = pt.test(t) && e.parentNode || e, m = u.join(",")
                        }
                        if (m) try {
                            return tt.apply(n, f.querySelectorAll(m)), n
                        }
                        catch (g) {}
                        finally {
                            c || e.removeAttribute("id")
                        }
                    }
                }
                return x(t.replace(ct, "$1"), e, n, i)
            }

            function i() {
                function t(n, i) {
                    return e.push(n += " ") > C.cacheLength && delete t[e.shift()], t[n] = i
                }
                var e = [];
                return t
            }

            function o(t) {
                return t[I] = !0, t
            }

            function r(t) {
                var e = M.createElement("div");
                try {
                    return !!t(e)
                }
                catch (n) {
                    return !1
                }
                finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function s(t, e) {
                for (var n = t.split("|"), i = t.length; i--;) C.attrHandle[n[i]] = e
            }

            function a(t, e) {
                var n = e && t,
                    i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || Q) - (~t.sourceIndex || Q);
                if (i) return i;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === e) return -1;
                return t ? 1 : -1
            }

            function l(t) {
                return function(e) {
                    var n = e.nodeName.toLowerCase();
                    return "input" === n && e.type === t
                }
            }

            function u(t) {
                return function(e) {
                    var n = e.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && e.type === t
                }
            }

            function c(t) {
                return o(function(e) {
                    return e = +e, o(function(n, i) {
                        for (var o, r = t([], n.length, e), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
                    })
                })
            }

            function h() {}

            function d(t, e) {
                var i, o, r, s, a, l, u, c = B[t + " "];
                if (c) return e ? 0 : c.slice(0);
                for (a = t, l = [], u = C.preFilter; a;) {
                    i && !(o = ht.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(r = [])), i = !1, (o = dt.exec(a)) && (i = o.shift(), r.push({
                        value: i,
                        type: o[0].replace(ct, " ")
                    }), a = a.slice(i.length));
                    for (s in C.filter) !(o = vt[s].exec(a)) || u[s] && !(o = u[s](o)) || (i = o.shift(), r.push({
                        value: i,
                        type: s,
                        matches: o
                    }), a = a.slice(i.length));
                    if (!i) break
                }
                return e ? a.length : a ? n.error(t) : B(t, l).slice(0)
            }

            function p(t) {
                for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
                return i
            }

            function f(t, e, n) {
                var i = e.dir,
                    o = n && "parentNode" === i,
                    r = H++;
                return e.first ? function(e, n, r) {
                    for (; e = e[i];)
                        if (1 === e.nodeType || o) return t(e, n, r)
                } : function(e, n, s) {
                    var a, l, u, c = z + " " + r;
                    if (s) {
                        for (; e = e[i];)
                            if ((1 === e.nodeType || o) && t(e, n, s)) return !0
                    }
                    else
                        for (; e = e[i];)
                            if (1 === e.nodeType || o)
                                if (u = e[I] || (e[I] = {}), (l = u[i]) && l[0] === c) {
                                    if ((a = l[1]) === !0 || a === T) return a === !0
                                }
                                else if (l = u[i] = [c], l[1] = t(e, n, s) || T, l[1] === !0) return !0
                }
            }

            function m(t) {
                return t.length > 1 ? function(e, n, i) {
                    for (var o = t.length; o--;)
                        if (!t[o](e, n, i)) return !1;
                    return !0
                } : t[0]
            }

            function g(t, e, n, i, o) {
                for (var r, s = [], a = 0, l = t.length, u = null != e; a < l; a++)(r = t[a]) && (n && !n(r, i, o) || (s.push(r), u && e.push(a)));
                return s
            }

            function v(t, e, n, i, r, s) {
                return i && !i[I] && (i = v(i)), r && !r[I] && (r = v(r, s)), o(function(o, s, a, l) {
                    var u, c, h, d = [],
                        p = [],
                        f = s.length,
                        m = o || w(e || "*", a.nodeType ? [a] : a, []),
                        v = !t || !o && e ? m : g(m, d, t, a, l),
                        y = n ? r || (o ? t : f || i) ? [] : s : v;
                    if (n && n(v, y, a, l), i)
                        for (u = g(y, p), i(u, [], a, l), c = u.length; c--;)(h = u[c]) && (y[p[c]] = !(v[p[c]] = h));
                    if (o) {
                        if (r || t) {
                            if (r) {
                                for (u = [], c = y.length; c--;)(h = y[c]) && u.push(v[c] = h);
                                r(null, y = [], u, l)
                            }
                            for (c = y.length; c--;)(h = y[c]) && (u = r ? nt.call(o, h) : d[c]) > -1 && (o[u] = !(s[u] = h))
                        }
                    }
                    else y = g(y === s ? y.splice(f, y.length) : y), r ? r(null, s, y, l) : tt.apply(s, y)
                })
            }

            function y(t) {
                for (var e, n, i, o = t.length, r = C.relative[t[0].type], s = r || C.relative[" "], a = r ? 1 : 0, l = f(function(t) {
                        return t === e
                    }, s, !0), u = f(function(t) {
                        return nt.call(e, t) > -1
                    }, s, !0), c = [function(t, n, i) {
                        return !r && (i || n !== j) || ((e = n).nodeType ? l(t, n, i) : u(t, n, i))
                    }]; a < o; a++)
                    if (n = C.relative[t[a].type]) c = [f(m(c), n)];
                    else {
                        if (n = C.filter[t[a].type].apply(null, t[a].matches), n[I]) {
                            for (i = ++a; i < o && !C.relative[t[i].type]; i++);
                            return v(a > 1 && m(c), a > 1 && p(t.slice(0, a - 1).concat({
                                value: " " === t[a - 2].type ? "*" : ""
                            })).replace(ct, "$1"), n, a < i && y(t.slice(a, i)), i < o && y(t = t.slice(i)), i < o && p(t))
                        }
                        c.push(n)
                    }
                return m(c)
            }

            function b(t, e) {
                var i = 0,
                    r = e.length > 0,
                    s = t.length > 0,
                    a = function(o, a, l, u, c) {
                        var h, d, p, f = [],
                            m = 0,
                            v = "0",
                            y = o && [],
                            b = null != c,
                            w = j,
                            x = o || s && C.find.TAG("*", c && a.parentNode || a),
                            _ = z += null == w ? 1 : Math.random() || .1;
                        for (b && (j = a !== M && a, T = i); null != (h = x[v]); v++) {
                            if (s && h) {
                                for (d = 0; p = t[d++];)
                                    if (p(h, a, l)) {
                                        u.push(h);
                                        break
                                    }
                                b && (z = _, T = ++i)
                            }
                            r && ((h = !p && h) && m--, o && y.push(h))
                        }
                        if (m += v, r && v !== m) {
                            for (d = 0; p = e[d++];) p(y, f, a, l);
                            if (o) {
                                if (m > 0)
                                    for (; v--;) y[v] || f[v] || (f[v] = K.call(u));
                                f = g(f)
                            }
                            tt.apply(u, f), b && !o && f.length > 0 && m + e.length > 1 && n.uniqueSort(u)
                        }
                        return b && (z = _, j = w), y
                    };
                return r ? o(a) : a
            }

            function w(t, e, i) {
                for (var o = 0, r = e.length; o < r; o++) n(t, e[o], i);
                return i
            }

            function x(t, e, n, i) {
                var o, r, s, a, l, u = d(t);
                if (!i && 1 === u.length) {
                    if (r = u[0] = u[0].slice(0), r.length > 2 && "ID" === (s = r[0]).type && k.getById && 9 === e.nodeType && O && C.relative[r[1].type]) {
                        if (e = (C.find.ID(s.matches[0].replace(kt, Tt), e) || [])[0], !e) return n;
                        t = t.slice(r.shift().value.length)
                    }
                    for (o = vt.needsContext.test(t) ? 0 : r.length; o-- && (s = r[o], !C.relative[a = s.type]);)
                        if ((l = C.find[a]) && (i = l(s.matches[0].replace(kt, Tt), pt.test(r[0].type) && e.parentNode || e))) {
                            if (r.splice(o, 1), t = i.length && p(r), !t) return tt.apply(n, i), n;
                            break
                        }
                }
                return F(t, u)(i, e, !O, n, pt.test(t)), n
            }
            var _, k, T, C, $, S, F, j, E, P, M, A, O, D, N, L, R, I = "sizzle" + -new Date,
                q = t.document,
                z = 0,
                H = 0,
                V = i(),
                B = i(),
                W = i(),
                X = !1,
                U = function(t, e) {
                    return t === e ? (X = !0, 0) : 0
                },
                Y = typeof e,
                Q = 1 << 31,
                J = {}.hasOwnProperty,
                G = [],
                K = G.pop,
                Z = G.push,
                tt = G.push,
                et = G.slice,
                nt = G.indexOf || function(t) {
                    for (var e = 0, n = this.length; e < n; e++)
                        if (this[e] === t) return e;
                    return -1
                },
                it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ot = "[\\x20\\t\\r\\n\\f]",
                st = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                at = st.replace("w", "w#"),
                lt = "\\[" + ot + "*(" + st + ")" + ot + "*(?:([*^$|!~]?=)" + ot + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + at + ")|)|)" + ot + "*\\]",
                ut = ":(" + st + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + lt.replace(3, 8) + ")*)|.*)\\)|)",
                ct = new RegExp("^" + ot + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ot + "+$", "g"),
                ht = new RegExp("^" + ot + "*," + ot + "*"),
                dt = new RegExp("^" + ot + "*([>+~]|" + ot + ")" + ot + "*"),
                pt = new RegExp(ot + "*[+~]"),
                ft = new RegExp("=" + ot + "*([^\\]'\"]*)" + ot + "*\\]", "g"),
                mt = new RegExp(ut),
                gt = new RegExp("^" + at + "$"),
                vt = {
                    ID: new RegExp("^#(" + st + ")"),
                    CLASS: new RegExp("^\\.(" + st + ")"),
                    TAG: new RegExp("^(" + st.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + lt),
                    PSEUDO: new RegExp("^" + ut),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ot + "*(even|odd|(([+-]|)(\\d*)n|)" + ot + "*(?:([+-]|)" + ot + "*(\\d+)|))" + ot + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + it + ")$", "i"),
                    needsContext: new RegExp("^" + ot + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ot + "*((?:-\\d)?\\d*)" + ot + "*\\)|)(?=[^-]|$)", "i")
                },
                yt = /^[^{]+\{\s*\[native \w/,
                bt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                wt = /^(?:input|select|textarea|button)$/i,
                xt = /^h\d$/i,
                _t = /'|\\/g,
                kt = new RegExp("\\\\([\\da-f]{1,6}" + ot + "?|(" + ot + ")|.)", "ig"),
                Tt = function(t, e, n) {
                    var i = "0x" + e - 65536;
                    return i !== i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
                };
            try {
                tt.apply(G = et.call(q.childNodes), q.childNodes), G[q.childNodes.length].nodeType
            }
            catch (Ct) {
                tt = {
                    apply: G.length ? function(t, e) {
                        Z.apply(t, et.call(e))
                    } : function(t, e) {
                        for (var n = t.length, i = 0; t[n++] = e[i++];);
                        t.length = n - 1
                    }
                }
            }
            S = n.isXML = function(t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, k = n.support = {}, P = n.setDocument = function(t) {
                var e = t ? t.ownerDocument || t : q,
                    n = e.defaultView;
                return e !== M && 9 === e.nodeType && e.documentElement ? (M = e, A = e.documentElement, O = !S(e), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function() {
                    P()
                }), k.attributes = r(function(t) {
                    return t.className = "i", !t.getAttribute("className")
                }), k.getElementsByTagName = r(function(t) {
                    return t.appendChild(e.createComment("")), !t.getElementsByTagName("*").length
                }), k.getElementsByClassName = r(function(t) {
                    return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
                }), k.getById = r(function(t) {
                    return A.appendChild(t).id = I, !e.getElementsByName || !e.getElementsByName(I).length
                }), k.getById ? (C.find.ID = function(t, e) {
                    if (typeof e.getElementById !== Y && O) {
                        var n = e.getElementById(t);
                        return n && n.parentNode ? [n] : []
                    }
                }, C.filter.ID = function(t) {
                    var e = t.replace(kt, Tt);
                    return function(t) {
                        return t.getAttribute("id") === e
                    }
                }) : (delete C.find.ID, C.filter.ID = function(t) {
                    var e = t.replace(kt, Tt);
                    return function(t) {
                        var n = typeof t.getAttributeNode !== Y && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                }), C.find.TAG = k.getElementsByTagName ? function(t, e) {
                    if (typeof e.getElementsByTagName !== Y) return e.getElementsByTagName(t)
                } : function(t, e) {
                    var n, i = [],
                        o = 0,
                        r = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return r
                }, C.find.CLASS = k.getElementsByClassName && function(t, e) {
                    if (typeof e.getElementsByClassName !== Y && O) return e.getElementsByClassName(t)
                }, N = [], D = [], (k.qsa = yt.test(e.querySelectorAll)) && (r(function(t) {
                    t.innerHTML = "<select><option selected=''></option></select>", t.querySelectorAll("[selected]").length || D.push("\\[" + ot + "*(?:value|" + it + ")"), t.querySelectorAll(":checked").length || D.push(":checked")
                }), r(function(t) {
                    var n = e.createElement("input");
                    n.setAttribute("type", "hidden"), t.appendChild(n).setAttribute("t", ""), t.querySelectorAll("[t^='']").length && D.push("[*^$]=" + ot + "*(?:''|\"\")"), t.querySelectorAll(":enabled").length || D.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), D.push(",.*:")
                })), (k.matchesSelector = yt.test(L = A.webkitMatchesSelector || A.mozMatchesSelector || A.oMatchesSelector || A.msMatchesSelector)) && r(function(t) {
                    k.disconnectedMatch = L.call(t, "div"), L.call(t, "[s!='']:x"), N.push("!=", ut)
                }), D = D.length && new RegExp(D.join("|")), N = N.length && new RegExp(N.join("|")), R = yt.test(A.contains) || A.compareDocumentPosition ? function(t, e) {
                    var n = 9 === t.nodeType ? t.documentElement : t,
                        i = e && e.parentNode;
                    return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                } : function(t, e) {
                    if (e)
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                    return !1
                }, U = A.compareDocumentPosition ? function(t, n) {
                    if (t === n) return X = !0, 0;
                    var i = n.compareDocumentPosition && t.compareDocumentPosition && t.compareDocumentPosition(n);
                    return i ? 1 & i || !k.sortDetached && n.compareDocumentPosition(t) === i ? t === e || R(q, t) ? -1 : n === e || R(q, n) ? 1 : E ? nt.call(E, t) - nt.call(E, n) : 0 : 4 & i ? -1 : 1 : t.compareDocumentPosition ? -1 : 1
                } : function(t, n) {
                    var i, o = 0,
                        r = t.parentNode,
                        s = n.parentNode,
                        l = [t],
                        u = [n];
                    if (t === n) return X = !0, 0;
                    if (!r || !s) return t === e ? -1 : n === e ? 1 : r ? -1 : s ? 1 : E ? nt.call(E, t) - nt.call(E, n) : 0;
                    if (r === s) return a(t, n);
                    for (i = t; i = i.parentNode;) l.unshift(i);
                    for (i = n; i = i.parentNode;) u.unshift(i);
                    for (; l[o] === u[o];) o++;
                    return o ? a(l[o], u[o]) : l[o] === q ? -1 : u[o] === q ? 1 : 0
                }, e) : M
            }, n.matches = function(t, e) {
                return n(t, null, null, e)
            }, n.matchesSelector = function(t, e) {
                if ((t.ownerDocument || t) !== M && P(t), e = e.replace(ft, "='$1']"), k.matchesSelector && O && (!N || !N.test(e)) && (!D || !D.test(e))) try {
                    var i = L.call(t, e);
                    if (i || k.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
                }
                catch (o) {}
                return n(e, M, null, [t]).length > 0
            }, n.contains = function(t, e) {
                return (t.ownerDocument || t) !== M && P(t), R(t, e)
            }, n.attr = function(t, n) {
                (t.ownerDocument || t) !== M && P(t);
                var i = C.attrHandle[n.toLowerCase()],
                    o = i && J.call(C.attrHandle, n.toLowerCase()) ? i(t, n, !O) : e;
                return o === e ? k.attributes || !O ? t.getAttribute(n) : (o = t.getAttributeNode(n)) && o.specified ? o.value : null : o
            }, n.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, n.uniqueSort = function(t) {
                var e, n = [],
                    i = 0,
                    o = 0;
                if (X = !k.detectDuplicates, E = !k.sortStable && t.slice(0), t.sort(U), X) {
                    for (; e = t[o++];) e === t[o] && (i = n.push(o));
                    for (; i--;) t.splice(n[i], 1)
                }
                return t
            }, $ = n.getText = function(t) {
                var e, n = "",
                    i = 0,
                    o = t.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) n += $(t)
                    }
                    else if (3 === o || 4 === o) return t.nodeValue
                }
                else
                    for (; e = t[i]; i++) n += $(e);
                return n
            }, C = n.selectors = {
                cacheLength: 50,
                createPseudo: o,
                match: vt,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(kt, Tt), t[3] = (t[4] || t[5] || "").replace(kt, Tt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || n.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && n.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var n, i = !t[5] && t[2];
                        return vt.CHILD.test(t[0]) ? null : (t[3] && t[4] !== e ? t[2] = t[4] : i && mt.test(i) && (n = d(i, !0)) && (n = i.indexOf(")", i.length - n) - i.length) && (t[0] = t[0].slice(0, n), t[2] = i.slice(0, n)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(kt, Tt).toLowerCase();
                        return "*" === t ? function() {
                            return !0
                        } : function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    },
                    CLASS: function(t) {
                        var e = V[t + " "];
                        return e || (e = new RegExp("(^|" + ot + ")" + t + "(" + ot + "|$)")) && V(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== Y && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, e, i) {
                        return function(o) {
                            var r = n.attr(o, t);
                            return null == r ? "!=" === e : !e || (r += "", "=" === e ? r === i : "!=" === e ? r !== i : "^=" === e ? i && 0 === r.indexOf(i) : "*=" === e ? i && r.indexOf(i) > -1 : "$=" === e ? i && r.slice(-i.length) === i : "~=" === e ? (" " + r + " ").indexOf(i) > -1 : "|=" === e && (r === i || r.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function(t, e, n, i, o) {
                        var r = "nth" !== t.slice(0, 3),
                            s = "last" !== t.slice(-4),
                            a = "of-type" === e;
                        return 1 === i && 0 === o ? function(t) {
                            return !!t.parentNode
                        } : function(e, n, l) {
                            var u, c, h, d, p, f, m = r !== s ? "nextSibling" : "previousSibling",
                                g = e.parentNode,
                                v = a && e.nodeName.toLowerCase(),
                                y = !l && !a;
                            if (g) {
                                if (r) {
                                    for (; m;) {
                                        for (h = e; h = h[m];)
                                            if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                                        f = m = "only" === t && !f && "nextSibling"
                                    }
                                    return !0
                                }
                                if (f = [s ? g.firstChild : g.lastChild], s && y) {
                                    for (c = g[I] || (g[I] = {}), u = c[t] || [], p = u[0] === z && u[1], d = u[0] === z && u[2], h = p && g.childNodes[p]; h = ++p && h && h[m] || (d = p = 0) || f.pop();)
                                        if (1 === h.nodeType && ++d && h === e) {
                                            c[t] = [z, p, d];
                                            break
                                        }
                                }
                                else if (y && (u = (e[I] || (e[I] = {}))[t]) && u[0] === z) d = u[1];
                                else
                                    for (;
                                        (h = ++p && h && h[m] || (d = p = 0) || f.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++d || (y && ((h[I] || (h[I] = {}))[t] = [z, d]), h !== e)););
                                return d -= o, d === i || d % i === 0 && d / i >= 0
                            }
                        }
                    },
                    PSEUDO: function(t, e) {
                        var i, r = C.pseudos[t] || C.setFilters[t.toLowerCase()] || n.error("unsupported pseudo: " + t);
                        return r[I] ? r(e) : r.length > 1 ? (i = [t, t, "", e], C.setFilters.hasOwnProperty(t.toLowerCase()) ? o(function(t, n) {
                            for (var i, o = r(t, e), s = o.length; s--;) i = nt.call(t, o[s]), t[i] = !(n[i] = o[s])
                        }) : function(t) {
                            return r(t, 0, i)
                        }) : r
                    }
                },
                pseudos: {
                    not: o(function(t) {
                        var e = [],
                            n = [],
                            i = F(t.replace(ct, "$1"));
                        return i[I] ? o(function(t, e, n, o) {
                            for (var r, s = i(t, null, o, []), a = t.length; a--;)(r = s[a]) && (t[a] = !(e[a] = r))
                        }) : function(t, o, r) {
                            return e[0] = t, i(e, null, r, n), !n.pop()
                        }
                    }),
                    has: o(function(t) {
                        return function(e) {
                            return n(t, e).length > 0
                        }
                    }),
                    contains: o(function(t) {
                        return function(e) {
                            return (e.textContent || e.innerText || $(e)).indexOf(t) > -1
                        }
                    }),
                    lang: o(function(t) {
                        return gt.test(t || "") || n.error("unsupported lang: " + t), t = t.replace(kt, Tt).toLowerCase(),
                            function(e) {
                                var n;
                                do
                                    if (n = O ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-");
                                while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var n = t.location && t.location.hash;
                        return n && n.slice(1) === e.id
                    },
                    root: function(t) {
                        return t === A
                    },
                    focus: function(t) {
                        return t === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: function(t) {
                        return t.disabled === !1
                    },
                    disabled: function(t) {
                        return t.disabled === !0
                    },
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeName > "@" || 3 === t.nodeType || 4 === t.nodeType) return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !C.pseudos.empty(t)
                    },
                    header: function(t) {
                        return xt.test(t.nodeName)
                    },
                    input: function(t) {
                        return wt.test(t.nodeName)
                    },
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function(t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || e.toLowerCase() === t.type)
                    },
                    first: c(function() {
                        return [0]
                    }),
                    last: c(function(t, e) {
                        return [e - 1]
                    }),
                    eq: c(function(t, e, n) {
                        return [n < 0 ? n + e : n]
                    }),
                    even: c(function(t, e) {
                        for (var n = 0; n < e; n += 2) t.push(n);
                        return t
                    }),
                    odd: c(function(t, e) {
                        for (var n = 1; n < e; n += 2) t.push(n);
                        return t
                    }),
                    lt: c(function(t, e, n) {
                        for (var i = n < 0 ? n + e : n; --i >= 0;) t.push(i);
                        return t
                    }),
                    gt: c(function(t, e, n) {
                        for (var i = n < 0 ? n + e : n; ++i < e;) t.push(i);
                        return t
                    })
                }
            }, C.pseudos.nth = C.pseudos.eq;
            for (_ in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) C.pseudos[_] = l(_);
            for (_ in {
                    submit: !0,
                    reset: !0
                }) C.pseudos[_] = u(_);
            h.prototype = C.filters = C.pseudos, C.setFilters = new h, F = n.compile = function(t, e) {
                var n, i = [],
                    o = [],
                    r = W[t + " "];
                if (!r) {
                    for (e || (e = d(t)), n = e.length; n--;) r = y(e[n]), r[I] ? i.push(r) : o.push(r);
                    r = W(t, b(o, i))
                }
                return r
            }, k.sortStable = I.split("").sort(U).join("") === I, k.detectDuplicates = X, P(), k.sortDetached = r(function(t) {
                return 1 & t.compareDocumentPosition(M.createElement("div"))
            }), r(function(t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || s("type|href|height|width", function(t, e, n) {
                if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), k.attributes && r(function(t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || s("value", function(t, e, n) {
                if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue
            }), r(function(t) {
                return null == t.getAttribute("disabled")
            }) || s(it, function(t, e, n) {
                var i;
                if (!n) return (i = t.getAttributeNode(e)) && i.specified ? i.value : t[e] === !0 ? e.toLowerCase() : null
            }), rt.find = n, rt.expr = n.selectors, rt.expr[":"] = rt.expr.pseudos, rt.unique = n.uniqueSort, rt.text = n.getText, rt.isXMLDoc = n.isXML, rt.contains = n.contains
        }(t);
    var ft = {};
    rt.Callbacks = function(t) {
        t = "string" == typeof t ? ft[t] || i(t) : rt.extend({}, t);
        var n, o, r, s, a, l, u = [],
            c = !t.once && [],
            h = function(e) {
                for (n = t.memory && e, o = !0, l = s || 0, s = 0, a = u.length, r = !0; u && l < a; l++)
                    if (u[l].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
                        n = !1;
                        break
                    }
                r = !1, u && (c ? c.length && h(c.shift()) : n ? u = [] : d.disable())
            },
            d = {
                add: function() {
                    if (u) {
                        var e = u.length;
                        ! function i(e) {
                            rt.each(e, function(e, n) {
                                var o = rt.type(n);
                                "function" === o ? t.unique && d.has(n) || u.push(n) : n && n.length && "string" !== o && i(n)
                            })
                        }(arguments), r ? a = u.length : n && (s = e, h(n))
                    }
                    return this
                },
                remove: function() {
                    return u && rt.each(arguments, function(t, e) {
                        for (var n;
                            (n = rt.inArray(e, u, n)) > -1;) u.splice(n, 1), r && (n <= a && a--, n <= l && l--)
                    }), this
                },
                has: function(t) {
                    return t ? rt.inArray(t, u) > -1 : !(!u || !u.length)
                },
                empty: function() {
                    return u = [], a = 0, this
                },
                disable: function() {
                    return u = c = n = e, this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return c = e, n || d.disable(), this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(t, e) {
                    return !u || o && !c || (e = e || [], e = [t, e.slice ? e.slice() : e], r ? c.push(e) : h(e)), this
                },
                fire: function() {
                    return d.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return d
    }, rt.extend({
        Deferred: function(t) {
            var e = [
                    ["resolve", "done", rt.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", rt.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", rt.Callbacks("memory")]
                ],
                n = "pending",
                i = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var t = arguments;
                        return rt.Deferred(function(n) {
                            rt.each(e, function(e, r) {
                                var s = r[0],
                                    a = rt.isFunction(t[e]) && t[e];
                                o[r[1]](function() {
                                    var t = a && a.apply(this, arguments);
                                    t && rt.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n.promise() : this, a ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? rt.extend(t, i) : i
                    }
                },
                o = {};
            return i.pipe = i.then, rt.each(e, function(t, r) {
                var s = r[2],
                    a = r[3];
                i[r[1]] = s.add, a && s.add(function() {
                    n = a
                }, e[1 ^ t][2].disable, e[2][2].lock), o[r[0]] = function() {
                    return o[r[0] + "With"](this === o ? i : this, arguments), this
                }, o[r[0] + "With"] = s.fireWith
            }), i.promise(o), t && t.call(o, o), o
        },
        when: function(t) {
            var e, n, i, o = 0,
                r = tt.call(arguments),
                s = r.length,
                a = 1 !== s || t && rt.isFunction(t.promise) ? s : 0,
                l = 1 === a ? t : rt.Deferred(),
                u = function(t, n, i) {
                    return function(o) {
                        n[t] = this, i[t] = arguments.length > 1 ? tt.call(arguments) : o, i === e ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                    }
                };
            if (s > 1)
                for (e = new Array(s), n = new Array(s), i = new Array(s); o < s; o++) r[o] && rt.isFunction(r[o].promise) ? r[o].promise().done(u(o, i, r)).fail(l.reject).progress(u(o, n, e)) : --a;
            return a || l.resolveWith(i, r), l.promise()
        }
    }), rt.support = function(e) {
        var n = W.createElement("input"),
            i = W.createDocumentFragment(),
            o = W.createElement("div"),
            r = W.createElement("select"),
            s = r.appendChild(W.createElement("option"));
        return n.type ? (n.type = "checkbox", e.checkOn = "" !== n.value, e.optSelected = s.selected, e.reliableMarginRight = !0, e.boxSizingReliable = !0, e.pixelPosition = !1, n.checked = !0, e.noCloneChecked = n.cloneNode(!0).checked, r.disabled = !0, e.optDisabled = !s.disabled, n = W.createElement("input"), n.value = "t", n.type = "radio", e.radioValue = "t" === n.value, n.setAttribute("checked", "t"), n.setAttribute("name", "t"), i.appendChild(n), e.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, e.focusinBubbles = "onfocusin" in t, o.style.backgroundClip = "content-box", o.cloneNode(!0).style.backgroundClip = "", e.clearCloneStyle = "content-box" === o.style.backgroundClip, rt(function() {
            var n, i, r = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                s = W.getElementsByTagName("body")[0];
            s && (n = W.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(n).appendChild(o), o.innerHTML = "", o.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", rt.swap(s, null != s.style.zoom ? {
                zoom: 1
            } : {}, function() {
                e.boxSizing = 4 === o.offsetWidth
            }), t.getComputedStyle && (e.pixelPosition = "1%" !== (t.getComputedStyle(o, null) || {}).top, e.boxSizingReliable = "4px" === (t.getComputedStyle(o, null) || {
                width: "4px"
            }).width, i = o.appendChild(W.createElement("div")), i.style.cssText = o.style.cssText = r, i.style.marginRight = i.style.width = "0", o.style.width = "1px", e.reliableMarginRight = !parseFloat((t.getComputedStyle(i, null) || {}).marginRight)), s.removeChild(n))
        }), e) : e
    }({});
    var mt, gt, vt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        yt = /([A-Z])/g;
    o.uid = 1, o.accepts = function(t) {
        return !t.nodeType || (1 === t.nodeType || 9 === t.nodeType)
    }, o.prototype = {
        key: function(t) {
            if (!o.accepts(t)) return 0;
            var e = {},
                n = t[this.expando];
            if (!n) {
                n = o.uid++;
                try {
                    e[this.expando] = {
                        value: n
                    }, Object.defineProperties(t, e)
                }
                catch (i) {
                    e[this.expando] = n, rt.extend(t, e)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        },
        set: function(t, e, n) {
            var i, o = this.key(t),
                r = this.cache[o];
            if ("string" == typeof e) r[e] = n;
            else if (rt.isEmptyObject(r)) rt.extend(this.cache[o], e);
            else
                for (i in e) r[i] = e[i];
            return r
        },
        get: function(t, n) {
            var i = this.cache[this.key(t)];
            return n === e ? i : i[n]
        },
        access: function(t, n, i) {
            var o;
            return n === e || n && "string" == typeof n && i === e ? (o = this.get(t, n), o !== e ? o : this.get(t, rt.camelCase(n))) : (this.set(t, n, i), i !== e ? i : n)
        },
        remove: function(t, n) {
            var i, o, r, s = this.key(t),
                a = this.cache[s];
            if (n === e) this.cache[s] = {};
            else {
                rt.isArray(n) ? o = n.concat(n.map(rt.camelCase)) : (r = rt.camelCase(n), n in a ? o = [n, r] : (o = r, o = o in a ? [o] : o.match(at) || [])), i = o.length;
                for (; i--;) delete a[o[i]]
            }
        },
        hasData: function(t) {
            return !rt.isEmptyObject(this.cache[t[this.expando]] || {})
        },
        discard: function(t) {
            t[this.expando] && delete this.cache[t[this.expando]]
        }
    }, mt = new o, gt = new o, rt.extend({
        acceptData: o.accepts,
        hasData: function(t) {
            return mt.hasData(t) || gt.hasData(t)
        },
        data: function(t, e, n) {
            return mt.access(t, e, n)
        },
        removeData: function(t, e) {
            mt.remove(t, e)
        },
        _data: function(t, e, n) {
            return gt.access(t, e, n)
        },
        _removeData: function(t, e) {
            gt.remove(t, e)
        }
    }), rt.fn.extend({
        data: function(t, n) {
            var i, o, s = this[0],
                a = 0,
                l = null;
            if (t === e) {
                if (this.length && (l = mt.get(s), 1 === s.nodeType && !gt.get(s, "hasDataAttrs"))) {
                    for (i = s.attributes; a < i.length; a++) o = i[a].name, 0 === o.indexOf("data-") && (o = rt.camelCase(o.slice(5)), r(s, o, l[o]));
                    gt.set(s, "hasDataAttrs", !0)
                }
                return l
            }
            return "object" == typeof t ? this.each(function() {
                mt.set(this, t)
            }) : rt.access(this, function(n) {
                var i, o = rt.camelCase(t);
                if (s && n === e) {
                    if (i = mt.get(s, t), i !== e) return i;
                    if (i = mt.get(s, o), i !== e) return i;
                    if (i = r(s, o, e), i !== e) return i
                }
                else this.each(function() {
                    var i = mt.get(this, o);
                    mt.set(this, o, n), t.indexOf("-") !== -1 && i !== e && mt.set(this, t, n)
                })
            }, null, n, arguments.length > 1, null, !0)
        },
        removeData: function(t) {
            return this.each(function() {
                mt.remove(this, t)
            })
        }
    }), rt.extend({
        queue: function(t, e, n) {
            var i;
            if (t) return e = (e || "fx") + "queue", i = gt.get(t, e), n && (!i || rt.isArray(n) ? i = gt.access(t, e, rt.makeArray(n)) : i.push(n)), i || []
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var n = rt.queue(t, e),
                i = n.length,
                o = n.shift(),
                r = rt._queueHooks(t, e),
                s = function() {
                    rt.dequeue(t, e)
                };
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === e && n.unshift("inprogress"), delete r.stop, o.call(t, s, r)), !i && r && r.empty.fire()
        },
        _queueHooks: function(t, e) {
            var n = e + "queueHooks";
            return gt.get(t, n) || gt.access(t, n, {
                empty: rt.Callbacks("once memory").add(function() {
                    gt.remove(t, [e + "queue", n])
                })
            })
        }
    }), rt.fn.extend({
        queue: function(t, n) {
            var i = 2;
            return "string" != typeof t && (n = t, t = "fx", i--), arguments.length < i ? rt.queue(this[0], t) : n === e ? this : this.each(function() {
                var e = rt.queue(this, t, n);
                rt._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && rt.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                rt.dequeue(this, t)
            })
        },
        delay: function(t, e) {
            return t = rt.fx ? rt.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, n) {
                var i = setTimeout(e, t);
                n.stop = function() {
                    clearTimeout(i)
                }
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, n) {
            var i, o = 1,
                r = rt.Deferred(),
                s = this,
                a = this.length,
                l = function() {
                    --o || r.resolveWith(s, [s])
                };
            for ("string" != typeof t && (n = t, t = e), t = t || "fx"; a--;) i = gt.get(s[a], t + "queueHooks"), i && i.empty && (o++, i.empty.add(l));
            return l(), r.promise(n)
        }
    });
    var bt, wt, xt = /[\t\r\n\f]/g,
        _t = /\r/g,
        kt = /^(?:input|select|textarea|button)$/i;
    rt.fn.extend({
        attr: function(t, e) {
            return rt.access(this, rt.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                rt.removeAttr(this, t)
            })
        },
        prop: function(t, e) {
            return rt.access(this, rt.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return this.each(function() {
                delete this[rt.propFix[t] || t]
            })
        },
        addClass: function(t) {
            var e, n, i, o, r, s = 0,
                a = this.length,
                l = "string" == typeof t && t;
            if (rt.isFunction(t)) return this.each(function(e) {
                rt(this).addClass(t.call(this, e, this.className))
            });
            if (l)
                for (e = (t || "").match(at) || []; s < a; s++)
                    if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(xt, " ") : " ")) {
                        for (r = 0; o = e[r++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                        n.className = rt.trim(i)
                    }
            return this
        },
        removeClass: function(t) {
            var e, n, i, o, r, s = 0,
                a = this.length,
                l = 0 === arguments.length || "string" == typeof t && t;
            if (rt.isFunction(t)) return this.each(function(e) {
                rt(this).removeClass(t.call(this, e, this.className))
            });
            if (l)
                for (e = (t || "").match(at) || []; s < a; s++)
                    if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(xt, " ") : "")) {
                        for (r = 0; o = e[r++];)
                            for (; i.indexOf(" " + o + " ") >= 0;) i = i.replace(" " + o + " ", " ");
                        n.className = t ? rt.trim(i) : ""
                    }
            return this
        },
        toggleClass: function(t, e) {
            var n = typeof t;
            return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : rt.isFunction(t) ? this.each(function(n) {
                rt(this).toggleClass(t.call(this, n, this.className, e), e)
            }) : this.each(function() {
                if ("string" === n)
                    for (var e, i = 0, o = rt(this), r = t.match(at) || []; e = r[i++];) o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                else n !== V && "boolean" !== n || (this.className && gt.set(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : gt.get(this, "__className__") || "")
            })
        },
        hasClass: function(t) {
            for (var e = " " + t + " ", n = 0, i = this.length; n < i; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(xt, " ").indexOf(e) >= 0) return !0;
            return !1
        },
        val: function(t) {
            var n, i, o, r = this[0]; {
                if (arguments.length) return o = rt.isFunction(t), this.each(function(i) {
                    var r;
                    1 === this.nodeType && (r = o ? t.call(this, i, rt(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : rt.isArray(r) && (r = rt.map(r, function(t) {
                        return null == t ? "" : t + ""
                    })), n = rt.valHooks[this.type] || rt.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, r, "value") !== e || (this.value = r))
                });
                if (r) return n = rt.valHooks[r.type] || rt.valHooks[r.nodeName.toLowerCase()], n && "get" in n && (i = n.get(r, "value")) !== e ? i : (i = r.value, "string" == typeof i ? i.replace(_t, "") : null == i ? "" : i)
            }
        }
    }), rt.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = t.attributes.value;
                    return !e || e.specified ? t.value : t.text
                }
            },
            select: {
                get: function(t) {
                    for (var e, n, i = t.options, o = t.selectedIndex, r = "select-one" === t.type || o < 0, s = r ? null : [], a = r ? o + 1 : i.length, l = o < 0 ? a : r ? o : 0; l < a; l++)
                        if (n = i[l], (n.selected || l === o) && (rt.support.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !rt.nodeName(n.parentNode, "optgroup"))) {
                            if (e = rt(n).val(), r) return e;
                            s.push(e)
                        }
                    return s
                },
                set: function(t, e) {
                    for (var n, i, o = t.options, r = rt.makeArray(e), s = o.length; s--;) i = o[s], (i.selected = rt.inArray(rt(i).val(), r) >= 0) && (n = !0);
                    return n || (t.selectedIndex = -1), r
                }
            }
        },
        attr: function(t, n, i) {
            var o, r, s = t.nodeType;
            if (t && 3 !== s && 8 !== s && 2 !== s) return typeof t.getAttribute === V ? rt.prop(t, n, i) : (1 === s && rt.isXMLDoc(t) || (n = n.toLowerCase(), o = rt.attrHooks[n] || (rt.expr.match.bool.test(n) ? wt : bt)), i === e ? o && "get" in o && null !== (r = o.get(t, n)) ? r : (r = rt.find.attr(t, n), null == r ? e : r) : null !== i ? o && "set" in o && (r = o.set(t, i, n)) !== e ? r : (t.setAttribute(n, i + ""), i) : void rt.removeAttr(t, n))
        },
        removeAttr: function(t, e) {
            var n, i, o = 0,
                r = e && e.match(at);
            if (r && 1 === t.nodeType)
                for (; n = r[o++];) i = rt.propFix[n] || n, rt.expr.match.bool.test(n) && (t[i] = !1), t.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!rt.support.radioValue && "radio" === e && rt.nodeName(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e), n && (t.value = n), e
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(t, n, i) {
            var o, r, s, a = t.nodeType;
            if (t && 3 !== a && 8 !== a && 2 !== a) return s = 1 !== a || !rt.isXMLDoc(t), s && (n = rt.propFix[n] || n, r = rt.propHooks[n]), i !== e ? r && "set" in r && (o = r.set(t, i, n)) !== e ? o : t[n] = i : r && "get" in r && null !== (o = r.get(t, n)) ? o : t[n]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    return t.hasAttribute("tabindex") || kt.test(t.nodeName) || t.href ? t.tabIndex : -1
                }
            }
        }
    }), wt = {
        set: function(t, e, n) {
            return e === !1 ? rt.removeAttr(t, n) : t.setAttribute(n, n), n
        }
    }, rt.each(rt.expr.match.bool.source.match(/\w+/g), function(t, n) {
        var i = rt.expr.attrHandle[n] || rt.find.attr;
        rt.expr.attrHandle[n] = function(t, n, o) {
            var r = rt.expr.attrHandle[n],
                s = o ? e : (rt.expr.attrHandle[n] = e) != i(t, n, o) ? n.toLowerCase() : null;
            return rt.expr.attrHandle[n] = r, s
        }
    }), rt.support.optSelected || (rt.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex, null
        }
    }), rt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        rt.propFix[this.toLowerCase()] = this
    }), rt.each(["radio", "checkbox"], function() {
        rt.valHooks[this] = {
            set: function(t, e) {
                if (rt.isArray(e)) return t.checked = rt.inArray(rt(t).val(), e) >= 0
            }
        }, rt.support.checkOn || (rt.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var Tt = /^key/,
        Ct = /^(?:mouse|contextmenu)|click/,
        $t = /^(?:focusinfocus|focusoutblur)$/,
        St = /^([^.]*)(?:\.(.+)|)$/;
    rt.event = {
        global: {},
        add: function(t, n, i, o, r) {
            var s, a, l, u, c, h, d, p, f, m, g, v = gt.get(t);
            if (v) {
                for (i.handler && (s = i, i = s.handler, r = s.selector), i.guid || (i.guid = rt.guid++), (u = v.events) || (u = v.events = {}), (a = v.handle) || (a = v.handle = function(t) {
                        return typeof rt === V || t && rt.event.triggered === t.type ? e : rt.event.dispatch.apply(a.elem, arguments)
                    }, a.elem = t), n = (n || "").match(at) || [""], c = n.length; c--;) l = St.exec(n[c]) || [], f = g = l[1], m = (l[2] || "").split(".").sort(), f && (d = rt.event.special[f] || {}, f = (r ? d.delegateType : d.bindType) || f, d = rt.event.special[f] || {}, h = rt.extend({
                    type: f,
                    origType: g,
                    data: o,
                    handler: i,
                    guid: i.guid,
                    selector: r,
                    needsContext: r && rt.expr.match.needsContext.test(r),
                    namespace: m.join(".")
                }, s), (p = u[f]) || (p = u[f] = [], p.delegateCount = 0, d.setup && d.setup.call(t, o, m, a) !== !1 || t.addEventListener && t.addEventListener(f, a, !1)), d.add && (d.add.call(t, h), h.handler.guid || (h.handler.guid = i.guid)), r ? p.splice(p.delegateCount++, 0, h) : p.push(h), rt.event.global[f] = !0);
                t = null
            }
        },
        remove: function(t, e, n, i, o) {
            var r, s, a, l, u, c, h, d, p, f, m, g = gt.hasData(t) && gt.get(t);
            if (g && (l = g.events)) {
                for (e = (e || "").match(at) || [""], u = e.length; u--;)
                    if (a = St.exec(e[u]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
                        for (h = rt.event.special[p] || {}, p = (i ? h.delegateType : h.bindType) || p, d = l[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = d.length; r--;) c = d[r], !o && m !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (d.splice(r, 1), c.selector && d.delegateCount--, h.remove && h.remove.call(t, c));
                        s && !d.length && (h.teardown && h.teardown.call(t, f, g.handle) !== !1 || rt.removeEvent(t, p, g.handle), delete l[p])
                    }
                    else
                        for (p in l) rt.event.remove(t, p + e[u], n, i, !0);
                rt.isEmptyObject(l) && (delete g.handle, gt.remove(t, "events"))
            }
        },
        trigger: function(n, i, o, r) {
            var s, a, l, u, c, h, d, p = [o || W],
                f = it.call(n, "type") ? n.type : n,
                m = it.call(n, "namespace") ? n.namespace.split(".") : [];
            if (a = l = o = o || W, 3 !== o.nodeType && 8 !== o.nodeType && !$t.test(f + rt.event.triggered) && (f.indexOf(".") >= 0 && (m = f.split("."), f = m.shift(), m.sort()), c = f.indexOf(":") < 0 && "on" + f, n = n[rt.expando] ? n : new rt.Event(f, "object" == typeof n && n), n.isTrigger = r ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = e, n.target || (n.target = o), i = null == i ? [n] : rt.makeArray(i, [n]), d = rt.event.special[f] || {}, r || !d.trigger || d.trigger.apply(o, i) !== !1)) {
                if (!r && !d.noBubble && !rt.isWindow(o)) {
                    for (u = d.delegateType || f, $t.test(u + f) || (a = a.parentNode); a; a = a.parentNode) p.push(a), l = a;
                    l === (o.ownerDocument || W) && p.push(l.defaultView || l.parentWindow || t)
                }
                for (s = 0;
                    (a = p[s++]) && !n.isPropagationStopped();) n.type = s > 1 ? u : d.bindType || f, h = (gt.get(a, "events") || {})[n.type] && gt.get(a, "handle"), h && h.apply(a, i), h = c && a[c], h && rt.acceptData(a) && h.apply && h.apply(a, i) === !1 && n.preventDefault();
                return n.type = f, r || n.isDefaultPrevented() || d._default && d._default.apply(p.pop(), i) !== !1 || !rt.acceptData(o) || c && rt.isFunction(o[f]) && !rt.isWindow(o) && (l = o[c], l && (o[c] = null), rt.event.triggered = f, o[f](), rt.event.triggered = e, l && (o[c] = l)), n.result
            }
        },
        dispatch: function(t) {
            t = rt.event.fix(t);
            var n, i, o, r, s, a = [],
                l = tt.call(arguments),
                u = (gt.get(this, "events") || {})[t.type] || [],
                c = rt.event.special[t.type] || {};
            if (l[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
                for (a = rt.event.handlers.call(this, t, u), n = 0;
                    (r = a[n++]) && !t.isPropagationStopped();)
                    for (t.currentTarget = r.elem, i = 0;
                        (s = r.handlers[i++]) && !t.isImmediatePropagationStopped();) t.namespace_re && !t.namespace_re.test(s.namespace) || (t.handleObj = s, t.data = s.data, o = ((rt.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, l), o !== e && (t.result = o) === !1 && (t.preventDefault(), t.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, t), t.result
            }
        },
        handlers: function(t, n) {
            var i, o, r, s, a = [],
                l = n.delegateCount,
                u = t.target;
            if (l && u.nodeType && (!t.button || "click" !== t.type))
                for (; u !== this; u = u.parentNode || this)
                    if (u.disabled !== !0 || "click" !== t.type) {
                        for (o = [], i = 0; i < l; i++) s = n[i], r = s.selector + " ", o[r] === e && (o[r] = s.needsContext ? rt(r, this).index(u) >= 0 : rt.find(r, this, null, [u]).length), o[r] && o.push(s);
                        o.length && a.push({
                            elem: u,
                            handlers: o
                        })
                    }
            return l < n.length && a.push({
                elem: this,
                handlers: n.slice(l)
            }), a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(t, n) {
                var i, o, r, s = n.button;
                return null == t.pageX && null != n.clientX && (i = t.target.ownerDocument || W, o = i.documentElement, r = i.body, t.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), t.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), t.which || s === e || (t.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), t
            }
        },
        fix: function(t) {
            if (t[rt.expando]) return t;
            var e, n, i, o = t.type,
                r = t,
                s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = Ct.test(o) ? this.mouseHooks : Tt.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, t = new rt.Event(r), e = i.length; e--;) n = i[e], t[n] = r[n];
            return t.target || (t.target = W), 3 === t.target.nodeType && (t.target = t.target.parentNode), s.filter ? s.filter(t, r) : t
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== l() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === l() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && rt.nodeName(this, "input")) return this.click(), !1
                },
                _default: function(t) {
                    return rt.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    t.result !== e && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function(t, e, n, i) {
            var o = rt.extend(new rt.Event, n, {
                type: t,
                isSimulated: !0,
                originalEvent: {}
            });
            i ? rt.event.trigger(o, null, e) : rt.event.dispatch.call(e, o), o.isDefaultPrevented() && n.preventDefault()
        }
    }, rt.removeEvent = function(t, e, n) {
        t.removeEventListener && t.removeEventListener(e, n, !1)
    }, rt.Event = function(t, e) {
        return this instanceof rt.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.getPreventDefault && t.getPreventDefault() ? s : a) : this.type = t, e && rt.extend(this, e), this.timeStamp = t && t.timeStamp || rt.now(), void(this[rt.expando] = !0)) : new rt.Event(t, e)
    }, rt.Event.prototype = {
        isDefaultPrevented: a,
        isPropagationStopped: a,
        isImmediatePropagationStopped: a,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = s, t && t.preventDefault && t.preventDefault()
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = s, t && t.stopPropagation && t.stopPropagation()
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = s, this.stopPropagation()
        }
    }, rt.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(t, e) {
        rt.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var n, i = this,
                    o = t.relatedTarget,
                    r = t.handleObj;
                return o && (o === i || rt.contains(i, o)) || (t.type = r.origType, n = r.handler.apply(this, arguments), t.type = e), n
            }
        }
    }), rt.support.focusinBubbles || rt.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var n = 0,
            i = function(t) {
                rt.event.simulate(e, t.target, rt.event.fix(t), !0)
            };
        rt.event.special[e] = {
            setup: function() {
                0 === n++ && W.addEventListener(t, i, !0)
            },
            teardown: function() {
                0 === --n && W.removeEventListener(t, i, !0)
            }
        }
    }), rt.fn.extend({
        on: function(t, n, i, o, r) {
            var s, l;
            if ("object" == typeof t) {
                "string" != typeof n && (i = i || n, n = e);
                for (l in t) this.on(l, n, i, t[l], r);
                return this
            }
            if (null == i && null == o ? (o = n, i = n = e) : null == o && ("string" == typeof n ? (o = i, i = e) : (o = i, i = n, n = e)), o === !1) o = a;
            else if (!o) return this;
            return 1 === r && (s = o, o = function(t) {
                return rt().off(t), s.apply(this, arguments)
            }, o.guid = s.guid || (s.guid = rt.guid++)), this.each(function() {
                rt.event.add(this, t, o, i, n)
            })
        },
        one: function(t, e, n, i) {
            return this.on(t, e, n, i, 1)
        },
        off: function(t, n, i) {
            var o, r;
            if (t && t.preventDefault && t.handleObj) return o = t.handleObj,
                rt(t.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), this;
            if ("object" == typeof t) {
                for (r in t) this.off(r, n, t[r]);
                return this
            }
            return n !== !1 && "function" != typeof n || (i = n, n = e), i === !1 && (i = a), this.each(function() {
                rt.event.remove(this, t, i, n)
            })
        },
        trigger: function(t, e) {
            return this.each(function() {
                rt.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var n = this[0];
            if (n) return rt.event.trigger(t, e, n, !0)
        }
    });
    var Ft = /^.[^:#\[\.,]*$/,
        jt = /^(?:parents|prev(?:Until|All))/,
        Et = rt.expr.match.needsContext,
        Pt = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    rt.fn.extend({
        find: function(t) {
            var e, n = [],
                i = this,
                o = i.length;
            if ("string" != typeof t) return this.pushStack(rt(t).filter(function() {
                for (e = 0; e < o; e++)
                    if (rt.contains(i[e], this)) return !0
            }));
            for (e = 0; e < o; e++) rt.find(t, i[e], n);
            return n = this.pushStack(o > 1 ? rt.unique(n) : n), n.selector = this.selector ? this.selector + " " + t : t, n
        },
        has: function(t) {
            var e = rt(t, this),
                n = e.length;
            return this.filter(function() {
                for (var t = 0; t < n; t++)
                    if (rt.contains(this, e[t])) return !0
            })
        },
        not: function(t) {
            return this.pushStack(c(this, t || [], !0))
        },
        filter: function(t) {
            return this.pushStack(c(this, t || [], !1))
        },
        is: function(t) {
            return !!c(this, "string" == typeof t && Et.test(t) ? rt(t) : t || [], !1).length
        },
        closest: function(t, e) {
            for (var n, i = 0, o = this.length, r = [], s = Et.test(t) || "string" != typeof t ? rt(t, e || this.context) : 0; i < o; i++)
                for (n = this[i]; n && n !== e; n = n.parentNode)
                    if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && rt.find.matchesSelector(n, t))) {
                        n = r.push(n);
                        break
                    }
            return this.pushStack(r.length > 1 ? rt.unique(r) : r)
        },
        index: function(t) {
            return t ? "string" == typeof t ? et.call(rt(t), this[0]) : et.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            var n = "string" == typeof t ? rt(t, e) : rt.makeArray(t && t.nodeType ? [t] : t),
                i = rt.merge(this.get(), n);
            return this.pushStack(rt.unique(i))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), rt.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return rt.dir(t, "parentNode")
        },
        parentsUntil: function(t, e, n) {
            return rt.dir(t, "parentNode", n)
        },
        next: function(t) {
            return u(t, "nextSibling")
        },
        prev: function(t) {
            return u(t, "previousSibling")
        },
        nextAll: function(t) {
            return rt.dir(t, "nextSibling")
        },
        prevAll: function(t) {
            return rt.dir(t, "previousSibling")
        },
        nextUntil: function(t, e, n) {
            return rt.dir(t, "nextSibling", n)
        },
        prevUntil: function(t, e, n) {
            return rt.dir(t, "previousSibling", n)
        },
        siblings: function(t) {
            return rt.sibling((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return rt.sibling(t.firstChild)
        },
        contents: function(t) {
            return t.contentDocument || rt.merge([], t.childNodes)
        }
    }, function(t, e) {
        rt.fn[t] = function(n, i) {
            var o = rt.map(this, e, n);
            return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (o = rt.filter(i, o)), this.length > 1 && (Pt[t] || rt.unique(o), jt.test(t) && o.reverse()), this.pushStack(o)
        }
    }), rt.extend({
        filter: function(t, e, n) {
            var i = e[0];
            return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? rt.find.matchesSelector(i, t) ? [i] : [] : rt.find.matches(t, rt.grep(e, function(t) {
                return 1 === t.nodeType
            }))
        },
        dir: function(t, n, i) {
            for (var o = [], r = i !== e;
                (t = t[n]) && 9 !== t.nodeType;)
                if (1 === t.nodeType) {
                    if (r && rt(t).is(i)) break;
                    o.push(t)
                }
            return o
        },
        sibling: function(t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n
        }
    });
    var Mt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        At = /<([\w:]+)/,
        Ot = /<|&#?\w+;/,
        Dt = /<(?:script|style|link)/i,
        Nt = /^(?:checkbox|radio)$/i,
        Lt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Rt = /^$|\/(?:java|ecma)script/i,
        It = /^true\/(.*)/,
        qt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        zt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    zt.optgroup = zt.option, zt.tbody = zt.tfoot = zt.colgroup = zt.caption = zt.thead, zt.th = zt.td, rt.fn.extend({
        text: function(t) {
            return rt.access(this, function(t) {
                return t === e ? rt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || W).createTextNode(t))
            }, null, t, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = h(this, t);
                    e.appendChild(t)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = h(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        remove: function(t, e) {
            for (var n, i = t ? rt.filter(t, this) : this, o = 0; null != (n = i[o]); o++) e || 1 !== n.nodeType || rt.cleanData(g(n)), n.parentNode && (e && rt.contains(n.ownerDocument, n) && f(g(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (rt.cleanData(g(t, !1)), t.textContent = "");
            return this
        },
        clone: function(t, e) {
            return t = null != t && t, e = null == e ? t : e, this.map(function() {
                return rt.clone(this, t, e)
            })
        },
        html: function(t) {
            return rt.access(this, function(t) {
                var n = this[0] || {},
                    i = 0,
                    o = this.length;
                if (t === e && 1 === n.nodeType) return n.innerHTML;
                if ("string" == typeof t && !Dt.test(t) && !zt[(At.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = t.replace(Mt, "<$1></$2>");
                    try {
                        for (; i < o; i++) n = this[i] || {}, 1 === n.nodeType && (rt.cleanData(g(n, !1)), n.innerHTML = t);
                        n = 0
                    }
                    catch (r) {}
                }
                n && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = rt.map(this, function(t) {
                    return [t.nextSibling, t.parentNode]
                }),
                e = 0;
            return this.domManip(arguments, function(n) {
                var i = t[e++],
                    o = t[e++];
                o && (i && i.parentNode !== o && (i = this.nextSibling), rt(this).remove(), o.insertBefore(n, i))
            }, !0), e ? this : this.remove()
        },
        detach: function(t) {
            return this.remove(t, !0)
        },
        domManip: function(t, e, n) {
            t = K.apply([], t);
            var i, o, r, s, a, l, u = 0,
                c = this.length,
                h = this,
                f = c - 1,
                m = t[0],
                v = rt.isFunction(m);
            if (v || !(c <= 1 || "string" != typeof m || rt.support.checkClone) && Lt.test(m)) return this.each(function(i) {
                var o = h.eq(i);
                v && (t[0] = m.call(this, i, o.html())), o.domManip(t, e, n)
            });
            if (c && (i = rt.buildFragment(t, this[0].ownerDocument, !1, !n && this), o = i.firstChild, 1 === i.childNodes.length && (i = o), o)) {
                for (r = rt.map(g(i, "script"), d), s = r.length; u < c; u++) a = i, u !== f && (a = rt.clone(a, !0, !0), s && rt.merge(r, g(a, "script"))), e.call(this[u], a, u);
                if (s)
                    for (l = r[r.length - 1].ownerDocument, rt.map(r, p), u = 0; u < s; u++) a = r[u], Rt.test(a.type || "") && !gt.access(a, "globalEval") && rt.contains(l, a) && (a.src ? rt._evalUrl(a.src) : rt.globalEval(a.textContent.replace(qt, "")))
            }
            return this
        }
    }), rt.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        rt.fn[t] = function(t) {
            for (var n, i = [], o = rt(t), r = o.length - 1, s = 0; s <= r; s++) n = s === r ? this : this.clone(!0), rt(o[s])[e](n), Z.apply(i, n.get());
            return this.pushStack(i)
        }
    }), rt.extend({
        clone: function(t, e, n) {
            var i, o, r, s, a = t.cloneNode(!0),
                l = rt.contains(t.ownerDocument, t);
            if (!(rt.support.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || rt.isXMLDoc(t)))
                for (s = g(a), r = g(t), i = 0, o = r.length; i < o; i++) v(r[i], s[i]);
            if (e)
                if (n)
                    for (r = r || g(t), s = s || g(a), i = 0, o = r.length; i < o; i++) m(r[i], s[i]);
                else m(t, a);
            return s = g(a, "script"), s.length > 0 && f(s, !l && g(t, "script")), a
        },
        buildFragment: function(t, e, n, i) {
            for (var o, r, s, a, l, u, c = 0, h = t.length, d = e.createDocumentFragment(), p = []; c < h; c++)
                if (o = t[c], o || 0 === o)
                    if ("object" === rt.type(o)) rt.merge(p, o.nodeType ? [o] : o);
                    else if (Ot.test(o)) {
                for (r = r || d.appendChild(e.createElement("div")), s = (At.exec(o) || ["", ""])[1].toLowerCase(), a = zt[s] || zt._default, r.innerHTML = a[1] + o.replace(Mt, "<$1></$2>") + a[2], u = a[0]; u--;) r = r.lastChild;
                rt.merge(p, r.childNodes), r = d.firstChild, r.textContent = ""
            }
            else p.push(e.createTextNode(o));
            for (d.textContent = "", c = 0; o = p[c++];)
                if ((!i || rt.inArray(o, i) === -1) && (l = rt.contains(o.ownerDocument, o), r = g(d.appendChild(o), "script"), l && f(r), n))
                    for (u = 0; o = r[u++];) Rt.test(o.type || "") && n.push(o);
            return d
        },
        cleanData: function(t) {
            for (var n, i, r, s, a, l, u = rt.event.special, c = 0;
                (i = t[c]) !== e; c++) {
                if (o.accepts(i) && (a = i[gt.expando], a && (n = gt.cache[a]))) {
                    if (r = Object.keys(n.events || {}), r.length)
                        for (l = 0;
                            (s = r[l]) !== e; l++) u[s] ? rt.event.remove(i, s) : rt.removeEvent(i, s, n.handle);
                    gt.cache[a] && delete gt.cache[a]
                }
                delete mt.cache[i[mt.expando]]
            }
        },
        _evalUrl: function(t) {
            return rt.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    }), rt.fn.extend({
        wrapAll: function(t) {
            var e;
            return rt.isFunction(t) ? this.each(function(e) {
                rt(this).wrapAll(t.call(this, e))
            }) : (this[0] && (e = rt(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                return t
            }).append(this)), this)
        },
        wrapInner: function(t) {
            return rt.isFunction(t) ? this.each(function(e) {
                rt(this).wrapInner(t.call(this, e))
            }) : this.each(function() {
                var e = rt(this),
                    n = e.contents();
                n.length ? n.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = rt.isFunction(t);
            return this.each(function(n) {
                rt(this).wrapAll(e ? t.call(this, n) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                rt.nodeName(this, "body") || rt(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var Ht, Vt, Bt = /^(none|table(?!-c[ea]).+)/,
        Wt = /^margin/,
        Xt = new RegExp("^(" + st + ")(.*)$", "i"),
        Ut = new RegExp("^(" + st + ")(?!px)[a-z%]+$", "i"),
        Yt = new RegExp("^([+-])=(" + st + ")", "i"),
        Qt = {
            BODY: "block"
        },
        Jt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Gt = {
            letterSpacing: 0,
            fontWeight: 400
        },
        Kt = ["Top", "Right", "Bottom", "Left"],
        Zt = ["Webkit", "O", "Moz", "ms"];
    rt.fn.extend({
        css: function(t, n) {
            return rt.access(this, function(t, n, i) {
                var o, r, s = {},
                    a = 0;
                if (rt.isArray(n)) {
                    for (o = w(t), r = n.length; a < r; a++) s[n[a]] = rt.css(t, n[a], !1, o);
                    return s
                }
                return i !== e ? rt.style(t, n, i) : rt.css(t, n)
            }, t, n, arguments.length > 1)
        },
        show: function() {
            return x(this, !0)
        },
        hide: function() {
            return x(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                b(this) ? rt(this).show() : rt(this).hide()
            })
        }
    }), rt.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var n = Ht(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(t, n, i, o) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var r, s, a, l = rt.camelCase(n),
                    u = t.style;
                return n = rt.cssProps[l] || (rt.cssProps[l] = y(u, l)), a = rt.cssHooks[n] || rt.cssHooks[l], i === e ? a && "get" in a && (r = a.get(t, !1, o)) !== e ? r : u[n] : (s = typeof i, "string" === s && (r = Yt.exec(i)) && (i = (r[1] + 1) * r[2] + parseFloat(rt.css(t, n)), s = "number"), null == i || "number" === s && isNaN(i) || ("number" !== s || rt.cssNumber[l] || (i += "px"), rt.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (u[n] = "inherit"), a && "set" in a && (i = a.set(t, i, o)) === e || (u[n] = i)), void 0)
            }
        },
        css: function(t, n, i, o) {
            var r, s, a, l = rt.camelCase(n);
            return n = rt.cssProps[l] || (rt.cssProps[l] = y(t.style, l)), a = rt.cssHooks[n] || rt.cssHooks[l], a && "get" in a && (r = a.get(t, !0, i)), r === e && (r = Ht(t, n, o)), "normal" === r && n in Gt && (r = Gt[n]), "" === i || i ? (s = parseFloat(r), i === !0 || rt.isNumeric(s) ? s || 0 : r) : r
        }
    }), Ht = function(t, n, i) {
        var o, r, s, a = i || w(t),
            l = a ? a.getPropertyValue(n) || a[n] : e,
            u = t.style;
        return a && ("" !== l || rt.contains(t.ownerDocument, t) || (l = rt.style(t, n)), Ut.test(l) && Wt.test(n) && (o = u.width, r = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = a.width, u.width = o, u.minWidth = r, u.maxWidth = s)), l
    }, rt.each(["height", "width"], function(t, e) {
        rt.cssHooks[e] = {
            get: function(t, n, i) {
                if (n) return 0 === t.offsetWidth && Bt.test(rt.css(t, "display")) ? rt.swap(t, Jt, function() {
                    return T(t, e, i)
                }) : T(t, e, i)
            },
            set: function(t, n, i) {
                var o = i && w(t);
                return _(t, n, i ? k(t, e, i, rt.support.boxSizing && "border-box" === rt.css(t, "boxSizing", !1, o), o) : 0)
            }
        }
    }), rt(function() {
        rt.support.reliableMarginRight || (rt.cssHooks.marginRight = {
            get: function(t, e) {
                if (e) return rt.swap(t, {
                    display: "inline-block"
                }, Ht, [t, "marginRight"])
            }
        }), !rt.support.pixelPosition && rt.fn.position && rt.each(["top", "left"], function(t, e) {
            rt.cssHooks[e] = {
                get: function(t, n) {
                    if (n) return n = Ht(t, e), Ut.test(n) ? rt(t).position()[e] + "px" : n
                }
            }
        })
    }), rt.expr && rt.expr.filters && (rt.expr.filters.hidden = function(t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0
    }, rt.expr.filters.visible = function(t) {
        return !rt.expr.filters.hidden(t)
    }), rt.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        rt.cssHooks[t + e] = {
            expand: function(n) {
                for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) o[t + Kt[i] + e] = r[i] || r[i - 2] || r[0];
                return o
            }
        }, Wt.test(t) || (rt.cssHooks[t + e].set = _)
    });
    var te = /%20/g,
        ee = /\[\]$/,
        ne = /\r?\n/g,
        ie = /^(?:submit|button|image|reset|file)$/i,
        oe = /^(?:input|select|textarea|keygen)/i;
    rt.fn.extend({
        serialize: function() {
            return rt.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = rt.prop(this, "elements");
                return t ? rt.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !rt(this).is(":disabled") && oe.test(this.nodeName) && !ie.test(t) && (this.checked || !Nt.test(t))
            }).map(function(t, e) {
                var n = rt(this).val();
                return null == n ? null : rt.isArray(n) ? rt.map(n, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(ne, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: n.replace(ne, "\r\n")
                }
            }).get()
        }
    }), rt.param = function(t, n) {
        var i, o = [],
            r = function(t, e) {
                e = rt.isFunction(e) ? e() : null == e ? "" : e, o[o.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
        if (n === e && (n = rt.ajaxSettings && rt.ajaxSettings.traditional), rt.isArray(t) || t.jquery && !rt.isPlainObject(t)) rt.each(t, function() {
            r(this.name, this.value)
        });
        else
            for (i in t) S(i, t[i], n, r);
        return o.join("&").replace(te, "+")
    }, rt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
        rt.fn[e] = function(t, n) {
            return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
        }
    }), rt.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        },
        bind: function(t, e, n) {
            return this.on(t, null, e, n)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, n, i) {
            return this.on(e, t, n, i)
        },
        undelegate: function(t, e, n) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
        }
    });
    var re, se, ae = rt.now(),
        le = /\?/,
        ue = /#.*$/,
        ce = /([?&])_=[^&]*/,
        he = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        de = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        pe = /^(?:GET|HEAD)$/,
        fe = /^\/\//,
        me = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        ge = rt.fn.load,
        ve = {},
        ye = {},
        be = "*/".concat("*");
    try {
        se = B.href
    }
    catch (we) {
        se = W.createElement("a"), se.href = "", se = se.href
    }
    re = me.exec(se.toLowerCase()) || [], rt.fn.load = function(t, n, i) {
        if ("string" != typeof t && ge) return ge.apply(this, arguments);
        var o, r, s, a = this,
            l = t.indexOf(" ");
        return l >= 0 && (o = t.slice(l), t = t.slice(0, l)), rt.isFunction(n) ? (i = n, n = e) : n && "object" == typeof n && (r = "POST"), a.length > 0 && rt.ajax({
            url: t,
            type: r,
            dataType: "html",
            data: n
        }).done(function(t) {
            s = arguments, a.html(o ? rt("<div>").append(rt.parseHTML(t)).find(o) : t)
        }).complete(i && function(t, e) {
            a.each(i, s || [t.responseText, e, t])
        }), this
    }, rt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        rt.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), rt.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: se,
            type: "GET",
            isLocal: de.test(re[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": be,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": rt.parseJSON,
                "text xml": rt.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? E(E(t, rt.ajaxSettings), e) : E(rt.ajaxSettings, t)
        },
        ajaxPrefilter: F(ve),
        ajaxTransport: F(ye),
        ajax: function(t, n) {
            function i(t, n, i, a) {
                var u, h, y, b, x, k = n;
                2 !== w && (w = 2, l && clearTimeout(l), o = e, s = a || "", _.readyState = t > 0 ? 4 : 0, u = t >= 200 && t < 300 || 304 === t, i && (b = P(d, _, i)), b = M(d, b, _, u), u ? (d.ifModified && (x = _.getResponseHeader("Last-Modified"), x && (rt.lastModified[r] = x), x = _.getResponseHeader("etag"), x && (rt.etag[r] = x)), 204 === t || "HEAD" === d.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = b.state, h = b.data, y = b.error, u = !y)) : (y = k, !t && k || (k = "error", t < 0 && (t = 0))), _.status = t, _.statusText = (n || k) + "", u ? m.resolveWith(p, [h, k, _]) : m.rejectWith(p, [_, k, y]), _.statusCode(v), v = e, c && f.trigger(u ? "ajaxSuccess" : "ajaxError", [_, d, u ? h : y]), g.fireWith(p, [_, k]), c && (f.trigger("ajaxComplete", [_, d]), --rt.active || rt.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t, t = e), n = n || {};
            var o, r, s, a, l, u, c, h, d = rt.ajaxSetup({}, n),
                p = d.context || d,
                f = d.context && (p.nodeType || p.jquery) ? rt(p) : rt.event,
                m = rt.Deferred(),
                g = rt.Callbacks("once memory"),
                v = d.statusCode || {},
                y = {},
                b = {},
                w = 0,
                x = "canceled",
                _ = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (2 === w) {
                            if (!a)
                                for (a = {}; e = he.exec(s);) a[e[1].toLowerCase()] = e[2];
                            e = a[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? s : null
                    },
                    setRequestHeader: function(t, e) {
                        var n = t.toLowerCase();
                        return w || (t = b[n] = b[n] || t, y[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return w || (d.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (w < 2)
                                for (e in t) v[e] = [v[e], t[e]];
                            else _.always(t[_.status]);
                        return this
                    },
                    abort: function(t) {
                        var e = t || x;
                        return o && o.abort(e), i(0, e), this
                    }
                };
            if (m.promise(_).complete = g.add, _.success = _.done, _.error = _.fail, d.url = ((t || d.url || se) + "").replace(ue, "").replace(fe, re[1] + "//"), d.type = n.method || n.type || d.method || d.type, d.dataTypes = rt.trim(d.dataType || "*").toLowerCase().match(at) || [""], null == d.crossDomain && (u = me.exec(d.url.toLowerCase()), d.crossDomain = !(!u || u[1] === re[1] && u[2] === re[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (re[3] || ("http:" === re[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = rt.param(d.data, d.traditional)), j(ve, d, n, _), 2 === w) return _;
            c = d.global, c && 0 === rt.active++ && rt.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !pe.test(d.type), r = d.url, d.hasContent || (d.data && (r = d.url += (le.test(r) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = ce.test(r) ? r.replace(ce, "$1_=" + ae++) : r + (le.test(r) ? "&" : "?") + "_=" + ae++)), d.ifModified && (rt.lastModified[r] && _.setRequestHeader("If-Modified-Since", rt.lastModified[r]), rt.etag[r] && _.setRequestHeader("If-None-Match", rt.etag[r])), (d.data && d.hasContent && d.contentType !== !1 || n.contentType) && _.setRequestHeader("Content-Type", d.contentType), _.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + be + "; q=0.01" : "") : d.accepts["*"]);
            for (h in d.headers) _.setRequestHeader(h, d.headers[h]);
            if (d.beforeSend && (d.beforeSend.call(p, _, d) === !1 || 2 === w)) return _.abort();
            x = "abort";
            for (h in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) _[h](d[h]);
            if (o = j(ye, d, n, _)) {
                _.readyState = 1, c && f.trigger("ajaxSend", [_, d]), d.async && d.timeout > 0 && (l = setTimeout(function() {
                    _.abort("timeout")
                }, d.timeout));
                try {
                    w = 1, o.send(y, i)
                }
                catch (k) {
                    if (!(w < 2)) throw k;
                    i(-1, k)
                }
            }
            else i(-1, "No Transport");
            return _
        },
        getJSON: function(t, e, n) {
            return rt.get(t, e, n, "json")
        },
        getScript: function(t, n) {
            return rt.get(t, e, n, "script")
        }
    }), rt.each(["get", "post"], function(t, n) {
        rt[n] = function(t, i, o, r) {
            return rt.isFunction(i) && (r = r || o, o = i, i = e), rt.ajax({
                url: t,
                type: n,
                dataType: r,
                data: i,
                success: o
            })
        }
    }), rt.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(t) {
                return rt.globalEval(t), t
            }
        }
    }), rt.ajaxPrefilter("script", function(t) {
        t.cache === e && (t.cache = !1), t.crossDomain && (t.type = "GET")
    }), rt.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var e, n;
            return {
                send: function(i, o) {
                    e = rt("<script>").prop({
                        async: !0,
                        charset: t.scriptCharset,
                        src: t.url
                    }).on("load error", n = function(t) {
                        e.remove(), n = null, t && o("error" === t.type ? 404 : 200, t.type)
                    }), W.head.appendChild(e[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var xe = [],
        _e = /(=)\?(?=&|$)|\?\?/;
    rt.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = xe.pop() || rt.expando + "_" + ae++;
            return this[t] = !0, t
        }
    }), rt.ajaxPrefilter("json jsonp", function(n, i, o) {
        var r, s, a, l = n.jsonp !== !1 && (_e.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && _e.test(n.data) && "data");
        if (l || "jsonp" === n.dataTypes[0]) return r = n.jsonpCallback = rt.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(_e, "$1" + r) : n.jsonp !== !1 && (n.url += (le.test(n.url) ? "&" : "?") + n.jsonp + "=" + r), n.converters["script json"] = function() {
            return a || rt.error(r + " was not called"), a[0]
        }, n.dataTypes[0] = "json", s = t[r], t[r] = function() {
            a = arguments
        }, o.always(function() {
            t[r] = s, n[r] && (n.jsonpCallback = i.jsonpCallback, xe.push(r)), a && rt.isFunction(s) && s(a[0]), a = s = e
        }), "script"
    }), rt.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        }
        catch (t) {}
    };
    var ke = rt.ajaxSettings.xhr(),
        Te = {
            0: 200,
            1223: 204
        },
        Ce = 0,
        $e = {};
    t.ActiveXObject && rt(t).on("unload", function() {
        for (var t in $e) $e[t]();
        $e = e
    }), rt.support.cors = !!ke && "withCredentials" in ke, rt.support.ajax = ke = !!ke, rt.ajaxTransport(function(t) {
        var n;
        if (rt.support.cors || ke && !t.crossDomain) return {
            send: function(i, o) {
                var r, s, a = t.xhr();
                if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (r in t.xhrFields) a[r] = t.xhrFields[r];
                t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (r in i) a.setRequestHeader(r, i[r]);
                n = function(t) {
                    return function() {
                        n && (delete $e[s], n = a.onload = a.onerror = null, "abort" === t ? a.abort() : "error" === t ? o(a.status || 404, a.statusText) : o(Te[a.status] || a.status, a.statusText, "string" == typeof a.responseText ? {
                            text: a.responseText
                        } : e, a.getAllResponseHeaders()))
                    }
                }, a.onload = n(), a.onerror = n("error"), n = $e[s = Ce++] = n("abort"), a.send(t.hasContent && t.data || null)
            },
            abort: function() {
                n && n()
            }
        }
    });
    var Se, Fe, je = /^(?:toggle|show|hide)$/,
        Ee = new RegExp("^(?:([+-])=|)(" + st + ")([a-z%]*)$", "i"),
        Pe = /queueHooks$/,
        Me = [L],
        Ae = {
            "*": [function(t, e) {
                var n = this.createTween(t, e),
                    i = n.cur(),
                    o = Ee.exec(e),
                    r = o && o[3] || (rt.cssNumber[t] ? "" : "px"),
                    s = (rt.cssNumber[t] || "px" !== r && +i) && Ee.exec(rt.css(n.elem, t)),
                    a = 1,
                    l = 20;
                if (s && s[3] !== r) {
                    r = r || s[3], o = o || [], s = +i || 1;
                    do a = a || ".5", s /= a, rt.style(n.elem, t, s + r); while (a !== (a = n.cur() / i) && 1 !== a && --l)
                }
                return o && (s = n.start = +s || +i || 0, n.unit = r, n.end = o[1] ? s + (o[1] + 1) * o[2] : +o[2]), n
            }]
        };
    rt.Animation = rt.extend(D, {
        tweener: function(t, e) {
            rt.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
            for (var n, i = 0, o = t.length; i < o; i++) n = t[i], Ae[n] = Ae[n] || [], Ae[n].unshift(e)
        },
        prefilter: function(t, e) {
            e ? Me.unshift(t) : Me.push(t)
        }
    }), rt.Tween = R, R.prototype = {
        constructor: R,
        init: function(t, e, n, i, o, r) {
            this.elem = t, this.prop = n, this.easing = o || "swing", this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = r || (rt.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var t = R.propHooks[this.prop];
            return t && t.get ? t.get(this) : R.propHooks._default.get(this)
        },
        run: function(t) {
            var e, n = R.propHooks[this.prop];
            return this.options.duration ? this.pos = e = rt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : R.propHooks._default.set(this), this
        }
    }, R.prototype.init.prototype = R.prototype, R.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = rt.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            },
            set: function(t) {
                rt.fx.step[t.prop] ? rt.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[rt.cssProps[t.prop]] || rt.cssHooks[t.prop]) ? rt.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, R.propHooks.scrollTop = R.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, rt.each(["toggle", "show", "hide"], function(t, e) {
        var n = rt.fn[e];
        rt.fn[e] = function(t, i, o) {
            return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(I(e, !0), t, i, o)
        }
    }), rt.fn.extend({
        fadeTo: function(t, e, n, i) {
            return this.filter(b).css("opacity", 0).show().end().animate({
                opacity: e
            }, t, n, i)
        },
        animate: function(t, e, n, i) {
            var o = rt.isEmptyObject(t),
                r = rt.speed(e, n, i),
                s = function() {
                    var e = D(this, rt.extend({}, t), r);
                    (o || gt.get(this, "finish")) && e.stop(!0)
                };
            return s.finish = s, o || r.queue === !1 ? this.each(s) : this.queue(r.queue, s)
        },
        stop: function(t, n, i) {
            var o = function(t) {
                var e = t.stop;
                delete t.stop, e(i)
            };
            return "string" != typeof t && (i = n, n = t, t = e), n && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                var e = !0,
                    n = null != t && t + "queueHooks",
                    r = rt.timers,
                    s = gt.get(this);
                if (n) s[n] && s[n].stop && o(s[n]);
                else
                    for (n in s) s[n] && s[n].stop && Pe.test(n) && o(s[n]);
                for (n = r.length; n--;) r[n].elem !== this || null != t && r[n].queue !== t || (r[n].anim.stop(i), e = !1, r.splice(n, 1));
                !e && i || rt.dequeue(this, t)
            })
        },
        finish: function(t) {
            return t !== !1 && (t = t || "fx"), this.each(function() {
                var e, n = gt.get(this),
                    i = n[t + "queue"],
                    o = n[t + "queueHooks"],
                    r = rt.timers,
                    s = i ? i.length : 0;
                for (n.finish = !0, rt.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = r.length; e--;) r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0), r.splice(e, 1));
                for (e = 0; e < s; e++) i[e] && i[e].finish && i[e].finish.call(this);
                delete n.finish
            })
        }
    }), rt.each({
        slideDown: I("show"),
        slideUp: I("hide"),
        slideToggle: I("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(t, e) {
        rt.fn[t] = function(t, n, i) {
            return this.animate(e, t, n, i)
        }
    }), rt.speed = function(t, e, n) {
        var i = t && "object" == typeof t ? rt.extend({}, t) : {
            complete: n || !n && e || rt.isFunction(t) && t,
            duration: t,
            easing: n && e || e && !rt.isFunction(e) && e
        };
        return i.duration = rt.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in rt.fx.speeds ? rt.fx.speeds[i.duration] : rt.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
            rt.isFunction(i.old) && i.old.call(this), i.queue && rt.dequeue(this, i.queue)
        }, i
    }, rt.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, rt.timers = [], rt.fx = R.prototype.init, rt.fx.tick = function() {
        var t, n = rt.timers,
            i = 0;
        for (Se = rt.now(); i < n.length; i++) t = n[i], t() || n[i] !== t || n.splice(i--, 1);
        n.length || rt.fx.stop(), Se = e
    }, rt.fx.timer = function(t) {
        t() && rt.timers.push(t) && rt.fx.start()
    }, rt.fx.interval = 13, rt.fx.start = function() {
        Fe || (Fe = setInterval(rt.fx.tick, rt.fx.interval))
    }, rt.fx.stop = function() {
        clearInterval(Fe), Fe = null
    }, rt.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, rt.fx.step = {}, rt.expr && rt.expr.filters && (rt.expr.filters.animated = function(t) {
        return rt.grep(rt.timers, function(e) {
            return t === e.elem
        }).length
    }), rt.fn.offset = function(t) {
        if (arguments.length) return t === e ? this : this.each(function(e) {
            rt.offset.setOffset(this, t, e)
        });
        var n, i, o = this[0],
            r = {
                top: 0,
                left: 0
            },
            s = o && o.ownerDocument;
        if (s) return n = s.documentElement, rt.contains(n, o) ? (typeof o.getBoundingClientRect !== V && (r = o.getBoundingClientRect()), i = q(s), {
            top: r.top + i.pageYOffset - n.clientTop,
            left: r.left + i.pageXOffset - n.clientLeft
        }) : r
    }, rt.offset = {
        setOffset: function(t, e, n) {
            var i, o, r, s, a, l, u, c = rt.css(t, "position"),
                h = rt(t),
                d = {};
            "static" === c && (t.style.position = "relative"), a = h.offset(), r = rt.css(t, "top"), l = rt.css(t, "left"), u = ("absolute" === c || "fixed" === c) && (r + l).indexOf("auto") > -1, u ? (i = h.position(), s = i.top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), rt.isFunction(e) && (e = e.call(t, n, a)), null != e.top && (d.top = e.top - a.top + s), null != e.left && (d.left = e.left - a.left + o), "using" in e ? e.using.call(t, d) : h.css(d)
        }
    }, rt.fn.extend({
        position: function() {
            if (this[0]) {
                var t, e, n = this[0],
                    i = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === rt.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), rt.nodeName(t[0], "html") || (i = t.offset()), i.top += rt.css(t[0], "borderTopWidth", !0), i.left += rt.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - i.top - rt.css(n, "marginTop", !0),
                    left: e.left - i.left - rt.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || X; t && !rt.nodeName(t, "html") && "static" === rt.css(t, "position");) t = t.offsetParent;
                return t || X
            })
        }
    }), rt.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(n, i) {
        var o = "pageYOffset" === i;
        rt.fn[n] = function(r) {
            return rt.access(this, function(n, r, s) {
                var a = q(n);
                return s === e ? a ? a[i] : n[r] : void(a ? a.scrollTo(o ? t.pageXOffset : s, o ? s : t.pageYOffset) : n[r] = s)
            }, n, r, arguments.length, null)
        }
    }), rt.each({
        Height: "height",
        Width: "width"
    }, function(t, n) {
        rt.each({
            padding: "inner" + t,
            content: n,
            "": "outer" + t
        }, function(i, o) {
            rt.fn[o] = function(o, r) {
                var s = arguments.length && (i || "boolean" != typeof o),
                    a = i || (o === !0 || r === !0 ? "margin" : "border");
                return rt.access(this, function(n, i, o) {
                    var r;
                    return rt.isWindow(n) ? n.document.documentElement["client" + t] : 9 === n.nodeType ? (r = n.documentElement, Math.max(n.body["scroll" + t], r["scroll" + t], n.body["offset" + t], r["offset" + t], r["client" + t])) : o === e ? rt.css(n, i, a) : rt.style(n, i, o, a)
                }, n, s ? o : e, s, null)
            }
        })
    }), rt.fn.size = function() {
        return this.length
    }, rt.fn.andSelf = rt.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = rt : "function" == typeof define && define.amd && define("jquery", [], function() {
        return rt
    }), "object" == typeof t && "object" == typeof t.document && (t.jQuery = t.$ = rt)
}(window),
function() {
    function m() {
        return function() {}
    }

    function q(t) {
        return function() {
            return this[t]
        }
    }

    function r(t) {
        return function() {
            return t
        }
    }

    function u(t, e, n) {
        if ("string" == typeof t) {
            if (0 === t.indexOf("#") && (t = t.slice(1)), u.Aa[t]) return u.Aa[t];
            t = u.w(t)
        }
        if (!t || !t.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
        return t.player || new u.Player(t, e, n)
    }

    function D() {}

    function F(t, e) {
        var n = Array.prototype.slice.call(e);
    }

    function G(t) {
        t.r("vjs-lock-showing")
    }

    function H(t, e, n, i) {
        return n !== b ? (t.b.style[e] = -1 !== ("" + n).indexOf("%") || -1 !== ("" + n).indexOf("px") ? n : "auto" === n ? "" : n + "px", i || t.k("resize"), t) : t.b ? (n = t.b.style[e], i = n.indexOf("px"), -1 !== i ? parseInt(n.slice(0, i), 10) : parseInt(t.b["offset" + u.$(e)], 10)) : 0
    }

    function I(t) {
        var e, n, i, o, r, s, a, u;
        e = 0, n = j, t.d("touchstart", function(t) {
            1 === t.touches.length && (n = t.touches[0], e = (new Date).getTime(), o = f)
        }), t.d("touchmove", function(t) {
            1 < t.touches.length ? o = l : n && (s = t.touches[0].pageX - n.pageX, a = t.touches[0].pageY - n.pageY, u = Math.sqrt(s * s + a * a), 22 < u && (o = l))
        }), r = function() {
            o = l
        }, t.d("touchleave", r), t.d("touchcancel", r), t.d("touchend", function(t) {
            n = j, o === f && (i = (new Date).getTime() - e, 250 > i && (t.preventDefault(), this.k("tap")))
        })
    }

    function J(t, e) {
        var n, i, o, r;
        return n = t.b, i = u.od(n), r = o = n.offsetWidth, n = t.handle, t.j.Vd ? (r = i.top, i = e.changedTouches ? e.changedTouches[0].pageY : e.pageY, n && (n = n.w().offsetHeight, r += n / 2, o -= n), Math.max(0, Math.min(1, (r - i + o) / o))) : (o = i.left, i = e.changedTouches ? e.changedTouches[0].pageX : e.pageX, n && (n = n.w().offsetWidth, o += n / 2, r -= n), Math.max(0, Math.min(1, (i - o) / r)))
    }

    function ca(t, e) {
        t.V(e), e.d("click", u.bind(t, function() {
            G(this)
        }))
    }

    function L(t) {
        t.ra = f, t.za.o("vjs-lock-showing"), t.b.setAttribute("aria-pressed", f), t.O && 0 < t.O.length && t.O[0].w().focus()
    }

    function K(t) {
        t.ra = l, G(t.za), t.b.setAttribute("aria-pressed", l)
    }

    function da(t) {
        var e = {
            sources: [],
            tracks: []
        };
        if (u.l.B(e, u.Bb(t)), t.hasChildNodes()) {
            var n, i, o, r;
            for (t = t.childNodes, o = 0, r = t.length; o < r; o++) n = t[o], i = n.nodeName.toLowerCase(), "source" === i ? e.sources.push(u.Bb(n)) : "track" === i && e.tracks.push(u.Bb(n))
        }
        return e
    }

    function R(t, e, n) {
        t.g && (t.ca = l, t.g.dispose(), t.Hb && (t.Hb = l, clearInterval(t.Ya)), t.Ib && S(t), t.g = l), "Html5" !== e && t.P && (u.f.mc(t.P), t.P = j), t.Ca = e, t.ca = l;
        var i = u.l.B({
            source: n,
            parentEl: t.b
        }, t.j[e.toLowerCase()]);
        n && (n.src == t.z.src && 0 < t.z.currentTime && (i.startTime = t.z.currentTime), t.z.src = n.src), t.g = new window.videojs[e](t, i), t.g.J(function() {
            if (this.c.Ea(), !this.n.progressEvents) {
                var t = this.c;
                t.Hb = f, t.Ya = setInterval(u.bind(t, function() {
                    this.z.sb < this.buffered().end(0) ? this.k("progress") : 1 == this.bufferedPercent() && (clearInterval(this.Ya), this.k("progress"))
                }), 500), t.g && t.g.W("progress", function() {
                    this.n.progressEvents = f;
                    var t = this.c;
                    t.Hb = l, clearInterval(t.Ya)
                })
            }
            this.n.timeupdateEvents || (t = this.c, t.Ib = f, t.d("play", t.Kc), t.d("pause", t.Ba), t.g && t.g.W("timeupdate", function() {
                this.n.timeupdateEvents = f, S(this.c)
            }))
        })
    }

    function S(t) {
        t.Ib = l, t.Ba(), t.p("play", t.Kc), t.p("pause", t.Ba)
    }

    function T(t, e) {
        e !== b && t.tc !== e && ((t.tc = e) ? (t.o("vjs-has-started"), t.k("firstplay")) : t.r("vjs-has-started"))
    }

    function V(t, e, n) {
        if (t.g && !t.g.ca) t.g.J(function() {
            this[e](n)
        });
        else try {
            t.g[e](n)
        }
        catch (i) {
            throw u.log(i), i
        }
    }

    function U(t, e) {
        if (t.g && t.g.ca) try {
            return t.g[e]()
        }
        catch (n) {
            throw t.g[e] === b ? u.log("Video.js: " + e + " method not defined for " + t.Ca + " playback technology.", n) : "TypeError" == n.name ? (u.log("Video.js: " + e + " unavailable on " + t.Ca + " playback technology element.", n), t.g.ca = l) : u.log(n), n
        }
    }

    function ea(t) {
        t.sd = l, u.p(document, "keydown", t.pc), document.documentElement.style.overflow = t.kd, u.r(document.body, "vjs-full-window"), t.k("exitFullWindow")
    }

    function fa(t) {
        return t.m().g && t.m().g.n.playbackRate && t.m().options().playbackRates && 0 < t.m().options().playbackRates.length
    }

    function la() {
        var t = X[Y],
            e = t.charAt(0).toUpperCase() + t.slice(1);
        ja["set" + e] = function(e) {
            return this.b.vjs_setProperty(t, e)
        }
    }

    function ma(t) {
        ja[t] = function() {
            return this.b.vjs_getProperty(t)
        }
    }

    function na(t, e, n, i, o) {
        var r = t.Da = t.Da || [];
        o = o || {}, o.kind = e, o.label = n, o.language = i, e = u.$(e || "subtitles");
        var s = new window.videojs[e + "Track"](t, o);
        r.push(s), s.Qa() && t.J(function() {
            setTimeout(function() {
                s.show()
            }, 0)
        })
    }

    function oa(t, e, n) {
        for (var i, o, r = t.Da, s = 0, a = r.length; s < a; s++) i = r[s], i.id() === e ? (i.show(), o = i) : n && i.K() == n && 0 < i.mode() && i.disable();
        (e = o ? o.K() : n ? n : l) && t.k(e + "trackchange")
    }

    function pa(t) {
        0 === t.la && t.load(), 0 === t.ka && (t.c.d("timeupdate", u.bind(t, t.update, t.T)), t.c.d("ended", u.bind(t, t.reset, t.T)), ("captions" === t.H || "subtitles" === t.H) && t.c.ja("textTrackDisplay").V(t))
    }

    function qa(t) {
        var e = t.split(":");
        t = 0;
        var n, i, o;
        return 3 == e.length ? (n = e[0], i = e[1], e = e[2]) : (n = 0, i = e[0], e = e[1]), e = e.split(/\s+/), e = e.splice(0, 1)[0], e = e.split(/\.|,/), o = parseFloat(e[1]), e = e[0], t += 3600 * parseFloat(n), t += 60 * parseFloat(i), t += parseFloat(e), o && (t += o / 1e3), t
    }

    function $(t, e) {
        var n = t.split("."),
            i = ra;
        !(n[0] in i) && i.execScript && i.execScript("var " + n[0]);
        for (var o; n.length && (o = n.shift());) n.length || e === b ? i = i[o] ? i[o] : i[o] = {} : i[o] = e
    }
    var b = void 0,
        f = !0,
        j = null,
        l = !1,
        t;
    document.createElement("video"), document.createElement("audio"), document.createElement("track");
    var videojs = u;
    window.je = window.ke = u, u.Ub = "4.6", u.Pc = "https:" == document.location.protocol ? "https://" : "http://", u.options = {
        techOrder: ["html5", "flash"],
        html5: {},
        flash: {},
        width: 300,
        height: 150,
        defaultVolume: 0,
        playbackRates: [],
        children: {
            mediaLoader: {},
            posterImage: {},
            textTrackDisplay: {},
            loadingSpinner: {},
            bigPlayButton: {},
            controlBar: {},
            errorDisplay: {}
        },
        notSupportedMessage: "No compatible source was found for this video."
    }, "GENERATED_CDN_VSN" !== u.Ub && (videojs.options.flash.swf = u.Pc + "vjs.zencdn.net/" + u.Ub + "/video-js.swf"), u.Aa = {}, "function" == typeof define && define.amd ? define([], function() {
        return videojs
    }) : "object" == typeof exports && "object" == typeof module && (module.exports = videojs), u.pa = u.CoreObject = m(), u.pa.extend = function(t) {
        var e, n;
        t = t || {}, e = t.init || t.h || this.prototype.init || this.prototype.h || m(), n = function() {
            e.apply(this, arguments)
        }, n.prototype = u.l.create(this.prototype), n.prototype.constructor = n, n.extend = u.pa.extend, n.create = u.pa.create;
        for (var i in t) t.hasOwnProperty(i) && (n.prototype[i] = t[i]);
        return n
    }, u.pa.create = function() {
        var t = u.l.create(this.prototype);
        return this.apply(t, arguments), t
    }, u.d = function(t, e, n) {
        var i = u.getData(t);
        i.D || (i.D = {}), i.D[e] || (i.D[e] = []), n.v || (n.v = u.v++), i.D[e].push(n), i.X || (i.disabled = l, i.X = function(e) {
            if (!i.disabled) {
                e = u.oc(e);
                var n = i.D[e.type];
                if (n)
                    for (var n = n.slice(0), o = 0, r = n.length; o < r && !e.wc(); o++) n[o].call(t, e)
            }
        }), 1 == i.D[e].length && (document.addEventListener ? t.addEventListener(e, i.X, l) : document.attachEvent && t.attachEvent("on" + e, i.X))
    }, u.p = function(t, e, n) {
        if (u.sc(t)) {
            var i = u.getData(t);
            if (i.D)
                if (e) {
                    var o = i.D[e];
                    if (o) {
                        if (n) {
                            if (n.v)
                                for (i = 0; i < o.length; i++) o[i].v === n.v && o.splice(i--, 1)
                        }
                        else i.D[e] = [];
                        u.jc(t, e)
                    }
                }
                else
                    for (o in i.D) e = o, i.D[e] = [], u.jc(t, e)
        }
    }, u.jc = function(t, e) {
        var n = u.getData(t);
        0 === n.D[e].length && (delete n.D[e], document.removeEventListener ? t.removeEventListener(e, n.X, l) : document.detachEvent && t.detachEvent("on" + e, n.X)), u.Eb(n.D) && (delete n.D, delete n.X, delete n.disabled), u.Eb(n) && u.Dc(t)
    }, u.oc = function(t) {
        function e() {
            return f
        }

        function n() {
            return l
        }
        if (!t || !t.Fb) {
            var i = t || window.event;
            t = {};
            for (var o in i) "layerX" !== o && "layerY" !== o && "keyboardEvent.keyLocation" !== o && ("returnValue" == o && i.preventDefault || (t[o] = i[o]));
            if (t.target || (t.target = t.srcElement || document), t.relatedTarget = t.fromElement === t.target ? t.toElement : t.fromElement, t.preventDefault = function() {
                    i.preventDefault && i.preventDefault(), t.returnValue = l, t.rd = e, t.defaultPrevented = f
                }, t.rd = n, t.defaultPrevented = l, t.stopPropagation = function() {
                    i.stopPropagation && i.stopPropagation(), t.cancelBubble = f, t.Fb = e
                }, t.Fb = n, t.stopImmediatePropagation = function() {
                    i.stopImmediatePropagation && i.stopImmediatePropagation(), t.wc = e, t.stopPropagation()
                }, t.wc = n, t.clientX != j) {
                o = document.documentElement;
                var r = document.body;
                t.pageX = t.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), t.pageY = t.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)
            }
            t.which = t.charCode || t.keyCode, t.button != j && (t.button = 1 & t.button ? 0 : 4 & t.button ? 1 : 2 & t.button ? 2 : 0)
        }
        return t
    }, u.k = function(t, e) {
        var n = u.sc(t) ? u.getData(t) : {},
            i = t.parentNode || t.ownerDocument;
        return "string" == typeof e && (e = {
            type: e,
            target: t
        }), e = u.oc(e), n.X && n.X.call(t, e), i && !e.Fb() && e.bubbles !== l ? u.k(i, e) : i || e.defaultPrevented || (n = u.getData(e.target), !e.target[e.type]) || (n.disabled = f, "function" == typeof e.target[e.type] && e.target[e.type](), n.disabled = l), !e.defaultPrevented
    }, u.W = function(t, e, n) {
        function i() {
            u.p(t, e, i), n.apply(this, arguments)
        }
        i.v = n.v = n.v || u.v++, u.d(t, e, i)
    };
    var v = Object.prototype.hasOwnProperty;
    u.e = function(t, e) {
        var n, i;
        n = document.createElement(t || "div");
        for (i in e) v.call(e, i) && (-1 !== i.indexOf("aria-") || "role" == i ? n.setAttribute(i, e[i]) : n[i] = e[i]);
        return n
    }, u.$ = function(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }, u.l = {}, u.l.create = Object.create || function(t) {
        function e() {}
        return e.prototype = t, new e
    }, u.l.wa = function(t, e, n) {
        for (var i in t) v.call(t, i) && e.call(n || this, i, t[i])
    }, u.l.B = function(t, e) {
        if (!e) return t;
        for (var n in e) v.call(e, n) && (t[n] = e[n]);
        return t
    }, u.l.fd = function(t, e) {
        var n, i, o;
        t = u.l.copy(t);
        for (n in e) v.call(e, n) && (i = t[n], o = e[n], t[n] = u.l.Sa(i) && u.l.Sa(o) ? u.l.fd(i, o) : e[n]);
        return t
    }, u.l.copy = function(t) {
        return u.l.B({}, t)
    }, u.l.Sa = function(t) {
        return !!t && "object" == typeof t && "[object Object]" === t.toString() && t.constructor === Object
    }, u.bind = function(t, e, n) {
        function i() {
            return e.apply(t, arguments)
        }
        return e.v || (e.v = u.v++), i.v = n ? n + "_" + e.v : e.v, i
    }, u.ta = {}, u.v = 1, u.expando = "vdata" + (new Date).getTime(), u.getData = function(t) {
        var e = t[u.expando];
        return e || (e = t[u.expando] = u.v++, u.ta[e] = {}), u.ta[e]
    }, u.sc = function(t) {
        return t = t[u.expando], !(!t || u.Eb(u.ta[t]))
    }, u.Dc = function(t) {
        var e = t[u.expando];
        if (e) {
            delete u.ta[e];
            try {
                delete t[u.expando]
            }
            catch (n) {
                t.removeAttribute ? t.removeAttribute(u.expando) : t[u.expando] = j
            }
        }
    }, u.Eb = function(t) {
        for (var e in t)
            if (t[e] !== j) return l;
        return f
    }, u.o = function(t, e) {
        -1 == (" " + t.className + " ").indexOf(" " + e + " ") && (t.className = "" === t.className ? e : t.className + " " + e)
    }, u.r = function(t, e) {
        var n, i;
        if (-1 != t.className.indexOf(e)) {
            for (n = t.className.split(" "), i = n.length - 1; 0 <= i; i--) n[i] === e && n.splice(i, 1);
            t.className = n.join(" ")
        }
    }, u.A = u.e("video"), u.M = navigator.userAgent, u.Uc = /iPhone/i.test(u.M), u.Tc = /iPad/i.test(u.M), u.Vc = /iPod/i.test(u.M), u.Sc = u.Uc || u.Tc || u.Vc;
    var aa = u,
        w, x = u.M.match(/OS (\d+)_/i);
    w = x && x[1] ? x[1] : b, aa.Zd = w, u.Rc = /Android/i.test(u.M);
    var ba = u,
        y, z = u.M.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
        A, B;
    z ? (A = z[1] && parseFloat(z[1]), B = z[2] && parseFloat(z[2]), y = A && B ? parseFloat(z[1] + "." + z[2]) : A ? A : j) : y = j, ba.Tb = y, u.Wc = u.Rc && /webkit/i.test(u.M) && 2.3 > u.Tb, u.Xb = /Firefox/i.test(u.M), u.$d = /Chrome/i.test(u.M), u.ec = !!("ontouchstart" in window || window.Qc && document instanceof window.Qc), u.Bb = function(t) {
        var e, n, i, o;
        if (e = {}, t && t.attributes && 0 < t.attributes.length) {
            n = t.attributes;
            for (var r = n.length - 1; 0 <= r; r--) i = n[r].name, o = n[r].value, "boolean" != typeof t[i] && -1 === ",autoplay,controls,loop,muted,default,".indexOf("," + i + ",") || (o = o !== j ? f : l), e[i] = o
        }
        return e
    }, u.ce = function(t, e) {
        var n = "";
        return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "").getPropertyValue(e) : t.currentStyle && (n = t["client" + e.substr(0, 1).toUpperCase() + e.substr(1)] + "px"), n
    }, u.Db = function(t, e) {
        e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t)
    }, u.Na = {}, u.w = function(t) {
        return 0 === t.indexOf("#") && (t = t.slice(1)), document.getElementById(t)
    }, u.ya = function(t, e) {
        e = e || t;
        var n = Math.floor(t % 60),
            i = Math.floor(t / 60 % 60),
            o = Math.floor(t / 3600),
            r = Math.floor(e / 60 % 60),
            s = Math.floor(e / 3600);
        return (isNaN(t) || 1 / 0 === t) && (o = i = n = "-"), o = 0 < o || 0 < s ? o + ":" : "", o + (((o || 10 <= r) && 10 > i ? "0" + i : i) + ":") + (10 > n ? "0" + n : n)
    }, u.bd = function() {
        document.body.focus(), document.onselectstart = r(l)
    }, u.Td = function() {
        document.onselectstart = r(f)
    }, u.trim = function(t) {
        return (t + "").replace(/^\s+|\s+$/g, "")
    }, u.round = function(t, e) {
        return e || (e = 0), Math.round(t * Math.pow(10, e)) / Math.pow(10, e)
    }, u.yb = function(t, e) {
        return {
            length: 1,
            start: function() {
                return t
            },
            end: function() {
                return e
            }
        }
    }, u.get = function(t, e, n, i) {
        var o, r, s, a;
        n = n || m(), "undefined" == typeof XMLHttpRequest && (window.XMLHttpRequest = function() {
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
            }
            catch (t) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
            }
            catch (e) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP")
            }
            catch (n) {}
            throw Error("This browser does not support XMLHttpRequest.")
        }), r = new XMLHttpRequest, s = u.Fd(t), a = window.location, s.protocol + s.host === a.protocol + a.host || !window.XDomainRequest || "withCredentials" in r ? (o = "file:" == s.protocol || "file:" == a.protocol, r.onreadystatechange = function() {
            4 === r.readyState && (200 === r.status || o && 0 === r.status ? e(r.responseText) : n(r.responseText))
        }) : (r = new window.XDomainRequest, r.onload = function() {
            e(r.responseText)
        }, r.onerror = n, r.onprogress = m(), r.ontimeout = n);
        try {
            r.open("GET", t, f), i && (r.withCredentials = f)
        }
        catch (l) {
            return void n(l)
        }
        try {
            r.send()
        }
        catch (c) {
            n(c)
        }
    }, u.Kd = function(t) {
        try {
            var e = window.localStorage || l;
            e && (e.volume = t)
        }
        catch (n) {
            22 == n.code || 1014 == n.code ? u.log("LocalStorage Full (VideoJS)", n) : 18 == n.code ? u.log("LocalStorage not allowed (VideoJS)", n) : u.log("LocalStorage Error (VideoJS)", n)
        }
    }, u.qc = function(t) {
        return t.match(/^https?:\/\//) || (t = u.e("div", {
            innerHTML: '<a href="' + t + '">x</a>'
        }).firstChild.href), t
    }, u.Fd = function(t) {
        var e, n, i, o;
        o = "protocol hostname port pathname search hash host".split(" "), n = u.e("a", {
            href: t
        }), (i = "" === n.host && "file:" !== n.protocol) && (e = u.e("div"), e.innerHTML = '<a href="' + t + '"></a>', n = e.firstChild, e.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(e)), t = {};
        for (var r = 0; r < o.length; r++) t[o[r]] = n[o[r]];
        return i && document.body.removeChild(e), t
    };
    var E = window.console || {
        log: D,
        warn: D,
        error: D
    };
    u.log = function() {
        F(j, arguments)
    }, u.log.history = [], u.log.error = function() {
        F("error", arguments)
    }, u.log.warn = function() {
        F("warn", arguments)
    }, u.od = function(t) {
        var e, n;
        return t.getBoundingClientRect && t.parentNode && (e = t.getBoundingClientRect()), e ? (t = document.documentElement, n = document.body, {
            left: u.round(e.left + (window.pageXOffset || n.scrollLeft) - (t.clientLeft || n.clientLeft || 0)),
            top: u.round(e.top + (window.pageYOffset || n.scrollTop) - (t.clientTop || n.clientTop || 0))
        }) : {
            left: 0,
            top: 0
        }
    }, u.oa = {}, u.oa.Jb = function(t, e) {
        var n, i, o;
        t = u.l.copy(t);
        for (n in e) e.hasOwnProperty(n) && (i = t[n], o = e[n], t[n] = u.l.Sa(i) && u.l.Sa(o) ? u.oa.Jb(i, o) : e[n]);
        return t
    }, u.a = u.pa.extend({
        h: function(t, e, n) {
            if (this.c = t, this.j = u.l.copy(this.j), e = this.options(e), this.T = e.id || (e.el && e.el.id ? e.el.id : t.id() + "_component_" + u.v++), this.wd = e.name || j, this.b = e.el || this.e(), this.N = [], this.Oa = {}, this.Pa = {}, this.uc(), this.J(n), e.Ec !== l) {
                var i, o;
                i = u.bind(this.m(), this.m().reportUserActivity), this.d("touchstart", function() {
                    i(), clearInterval(o), o = setInterval(i, 250)
                }), t = function() {
                    i(), clearInterval(o)
                }, this.d("touchmove", i), this.d("touchend", t), this.d("touchcancel", t)
            }
        }
    }), t = u.a.prototype, t.dispose = function() {
        if (this.k({
                type: "dispose",
                bubbles: l
            }), this.N)
            for (var t = this.N.length - 1; 0 <= t; t--) this.N[t].dispose && this.N[t].dispose();
        this.Pa = this.Oa = this.N = j, this.p(), this.b.parentNode && this.b.parentNode.removeChild(this.b), u.Dc(this.b), this.b = j
    }, t.c = f, t.m = q("c"), t.options = function(t) {
        return t === b ? this.j : this.j = u.oa.Jb(this.j, t)
    }, t.e = function(t, e) {
        return u.e(t, e)
    }, t.w = q("b"), t.ia = function() {
        return this.u || this.b
    }, t.id = q("T"), t.name = q("wd"), t.children = q("N"), t.qd = function(t) {
        return this.Oa[t]
    }, t.ja = function(t) {
        return this.Pa[t]
    }, t.V = function(t, e) {
        var n, i;
        return "string" == typeof t ? (i = t, e = e || {}, n = e.componentClass || u.$(i), e.name = i, n = new window.videojs[n](this.c || this, e)) : n = t, this.N.push(n), "function" == typeof n.id && (this.Oa[n.id()] = n), (i = i || n.name && n.name()) && (this.Pa[i] = n), "function" == typeof n.el && n.el() && this.ia().appendChild(n.el()), n
    }, t.removeChild = function(t) {
        if ("string" == typeof t && (t = this.ja(t)), t && this.N) {
            for (var e = l, n = this.N.length - 1; 0 <= n; n--)
                if (this.N[n] === t) {
                    e = f, this.N.splice(n, 1);
                    break
                }
            e && (this.Oa[t.id] = j, this.Pa[t.name] = j, (e = t.w()) && e.parentNode === this.ia() && this.ia().removeChild(t.w()))
        }
    }, t.uc = function() {
        var t, e, n, i;
        if (t = this, e = this.options().children)
            if (e instanceof Array)
                for (var o = 0; o < e.length; o++) n = e[o], "string" == typeof n ? (i = n, n = {}) : i = n.name, t[i] = t.V(i, n);
            else u.l.wa(e, function(e, n) {
                n !== l && (t[e] = t.V(e, n))
            })
    }, t.S = r(""), t.d = function(t, e) {
        return u.d(this.b, t, u.bind(this, e)), this
    }, t.p = function(t, e) {
        return u.p(this.b, t, e), this
    }, t.W = function(t, e) {
        return u.W(this.b, t, u.bind(this, e)), this
    }, t.k = function(t, e) {
        return u.k(this.b, t, e), this
    }, t.J = function(t) {
        return t && (this.ca ? t.call(this) : (this.Za === b && (this.Za = []), this.Za.push(t))), this
    }, t.Ea = function() {
        this.ca = f;
        var t = this.Za;
        if (t && 0 < t.length) {
            for (var e = 0, n = t.length; e < n; e++) t[e].call(this);
            this.Za = [], this.k("ready")
        }
    }, t.o = function(t) {
        return u.o(this.b, t), this
    }, t.r = function(t) {
        return u.r(this.b, t), this
    }, t.show = function() {
        return this.b.style.display = "block", this
    }, t.G = function() {
        return this.b.style.display = "none", this
    }, t.disable = function() {
        this.G(), this.show = m()
    }, t.width = function(t, e) {
        return H(this, "width", t, e)
    }, t.height = function(t, e) {
        return H(this, "height", t, e)
    }, t.jd = function(t, e) {
        return this.width(t, f).height(e)
    }, u.s = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e), I(this), this.d("tap", this.q), this.d("click", this.q), this.d("focus", this.Va), this.d("blur", this.Ua)
        }
    }), t = u.s.prototype, t.e = function(t, e) {
        var n;
        return e = u.l.B({
            className: this.S(),
            role: "button",
            "aria-live": "polite",
            tabIndex: 0
        }, e), n = u.a.prototype.e.call(this, t, e), e.innerHTML || (this.u = u.e("div", {
            className: "vjs-control-content"
        }), this.wb = u.e("span", {
            className: "vjs-control-text",
            innerHTML: this.sa || "Need Text"
        }), this.u.appendChild(this.wb), n.appendChild(this.u)), n
    }, t.S = function() {
        return "vjs-control " + u.a.prototype.S.call(this)
    }, t.q = m(), t.Va = function() {
        u.d(document, "keyup", u.bind(this, this.da))
    }, t.da = function(t) {
        32 != t.which && 13 != t.which || (t.preventDefault(), this.q())
    }, t.Ua = function() {
        u.p(document, "keyup", u.bind(this, this.da))
    }, u.Q = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e), this.ad = this.ja(this.j.barName), this.handle = this.ja(this.j.handleName), this.d("mousedown", this.Wa), this.d("touchstart", this.Wa), this.d("focus", this.Va), this.d("blur", this.Ua), this.d("click", this.q), this.c.d("controlsvisible", u.bind(this, this.update)), t.d(this.Ac, u.bind(this, this.update)), this.R = {}
        }
    }), t = u.Q.prototype, t.e = function(t, e) {
        return e = e || {}, e.className += " vjs-slider", e = u.l.B({
            role: "slider",
            "aria-valuenow": 0,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            tabIndex: 0
        }, e), u.a.prototype.e.call(this, t, e)
    }, t.Wa = function(t) {
        t.preventDefault(), u.bd(), this.R.move = u.bind(this, this.Kb), this.R.end = u.bind(this, this.Lb), u.d(document, "mousemove", this.R.move), u.d(document, "mouseup", this.R.end), u.d(document, "touchmove", this.R.move), u.d(document, "touchend", this.R.end), this.Kb(t)
    }, t.Lb = function() {
        u.Td(), u.p(document, "mousemove", this.R.move, l), u.p(document, "mouseup", this.R.end, l), u.p(document, "touchmove", this.R.move, l), u.p(document, "touchend", this.R.end, l), this.update()
    }, t.update = function() {
        if (this.b) {
            var t, e = this.Cb(),
                n = this.handle,
                i = this.ad;
            if (isNaN(e) && (e = 0), t = e, n) {
                t = this.b.offsetWidth;
                var o = n.w().offsetWidth;
                t = o ? o / t : 0, e *= 1 - t, t = e + t / 2, n.w().style.left = u.round(100 * e, 2) + "%"
            }
            i.w().style.width = u.round(100 * t, 2) + "%"
        }
    }, t.Va = function() {
        u.d(document, "keyup", u.bind(this, this.da))
    }, t.da = function(t) {
        37 == t.which ? (t.preventDefault(), this.Gc()) : 39 == t.which && (t.preventDefault(), this.Hc())
    }, t.Ua = function() {
        u.p(document, "keyup", u.bind(this, this.da))
    }, t.q = function(t) {
        t.stopImmediatePropagation(), t.preventDefault()
    }, u.Y = u.a.extend(), u.Y.prototype.defaultValue = 0, u.Y.prototype.e = function(t, e) {
        return e = e || {}, e.className += " vjs-slider-handle", e = u.l.B({
            innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
        }, e), u.a.prototype.e.call(this, "div", e)
    }, u.ga = u.a.extend(), u.ga.prototype.e = function() {
        var t = this.options().kc || "ul";
        return this.u = u.e(t, {
            className: "vjs-menu-content"
        }), t = u.a.prototype.e.call(this, "div", {
            append: this.u,
            className: "vjs-menu"
        }), t.appendChild(this.u), u.d(t, "click", function(t) {
            t.preventDefault(), t.stopImmediatePropagation()
        }), t
    }, u.I = u.s.extend({
        h: function(t, e) {
            u.s.call(this, t, e), this.selected(e.selected)
        }
    }), u.I.prototype.e = function(t, e) {
        return u.s.prototype.e.call(this, "li", u.l.B({
            className: "vjs-menu-item",
            innerHTML: this.j.label
        }, e))
    }, u.I.prototype.q = function() {
        this.selected(f)
    }, u.I.prototype.selected = function(t) {
        t ? (this.o("vjs-selected"), this.b.setAttribute("aria-selected", f)) : (this.r("vjs-selected"), this.b.setAttribute("aria-selected", l))
    }, u.L = u.s.extend({
        h: function(t, e) {
            u.s.call(this, t, e), this.za = this.va(), this.V(this.za), this.O && 0 === this.O.length && this.G(), this.d("keyup", this.da), this.b.setAttribute("aria-haspopup", f), this.b.setAttribute("role", "button")
        }
    }), t = u.L.prototype, t.ra = l, t.va = function() {
        var t = new u.ga(this.c);
        if (this.options().title && t.ia().appendChild(u.e("li", {
                className: "vjs-menu-title",
                innerHTML: u.$(this.options().title),
                Rd: -1
            })), this.O = this.createItems())
            for (var e = 0; e < this.O.length; e++) ca(t, this.O[e]);
        return t
    }, t.ua = m(), t.S = function() {
        return this.className + " vjs-menu-button " + u.s.prototype.S.call(this)
    }, t.Va = m(), t.Ua = m(), t.q = function() {
        this.W("mouseout", u.bind(this, function() {
            G(this.za), this.b.blur()
        })), this.ra ? K(this) : L(this)
    }, t.da = function(t) {
        t.preventDefault(), 32 == t.which || 13 == t.which ? this.ra ? K(this) : L(this) : 27 == t.which && this.ra && K(this)
    }, u.F = function(t) {
        "number" == typeof t ? this.code = t : "string" == typeof t ? this.message = t : "object" == typeof t && u.l.B(this, t), this.message || (this.message = u.F.gd[this.code] || "")
    }, u.F.prototype.code = 0, u.F.prototype.message = "", u.F.prototype.status = j, u.F.Ra = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" "), u.F.gd = {
        1: "You aborted the video playback",
        2: "A network error caused the video download to fail part-way.",
        3: "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",
        4: "The video could not be loaded, either because the server or network failed or because the format is not supported.",
        5: "The video is encrypted and we do not have the keys to decrypt it."
    };
    for (var M = 0; M < u.F.Ra.length; M++) u.F[u.F.Ra[M]] = M, u.F.prototype[u.F.Ra[M]] = M;
    var N, O, P, Q;
    for (N = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], O = N[0], Q = 0; Q < N.length; Q++)
        if (N[Q][1] in document) {
            P = N[Q];
            break
        }
    if (P)
        for (u.Na.Ab = {}, Q = 0; Q < P.length; Q++) u.Na.Ab[O[Q]] = P[Q];
    u.Player = u.a.extend({
        h: function(t, e, n) {
            this.P = t, t.id = t.id || "vjs_video_" + u.v++, e = u.l.B(da(t), e), this.z = {}, this.Bc = e.poster, this.xb = e.controls, t.controls = l, e.Ec = l, u.a.call(this, this, e, n), this.controls() ? this.o("vjs-controls-enabled") : this.o("vjs-controls-disabled"), u.Aa[this.T] = this, e.plugins && u.l.wa(e.plugins, function(t, e) {
                this[t](e)
            }, this);
            var i, o, r, s, a, c;
            i = u.bind(this, this.reportUserActivity), this.d("mousedown", function() {
                i(), clearInterval(o), o = setInterval(i, 250)
            }), this.d("mousemove", function(t) {
                t.screenX == a && t.screenY == c || (a = t.screenX, c = t.screenY, i())
            }), this.d("mouseup", function() {
                i(), clearInterval(o)
            }), this.d("keydown", i), this.d("keyup", i), r = setInterval(u.bind(this, function() {
                this.na && (this.na = l, this.userActive(f), clearTimeout(s), s = setTimeout(u.bind(this, function() {
                    this.na || this.userActive(l)
                }), 2e3))
            }), 250), this.d("dispose", function() {
                clearInterval(r), clearTimeout(s)
            })
        }
    }), t = u.Player.prototype, t.j = u.options, t.dispose = function() {
        this.k("dispose"), this.p("dispose"), u.Aa[this.T] = j, this.P && this.P.player && (this.P.player = j), this.b && this.b.player && (this.b.player = j), clearInterval(this.Ya), this.Ba(), this.g && this.g.dispose(), u.a.prototype.dispose.call(this)
    }, t.e = function() {
        var t = this.b = u.a.prototype.e.call(this, "div"),
            e = this.P;
        if (e.removeAttribute("width"), e.removeAttribute("height"), e.hasChildNodes()) {
            var n, i, o, r, s;
            for (n = e.childNodes, i = n.length, s = []; i--;) o = n[i], r = o.nodeName.toLowerCase(), "track" === r && s.push(o);
            for (n = 0; n < s.length; n++) e.removeChild(s[n])
        }
        return t.id = e.id, t.className = e.className, e.id += "_html5_api", e.className = "vjs-tech", e.player = t.player = this, this.o("vjs-paused"), this.width(this.j.width, f), this.height(this.j.height, f), e.parentNode && e.parentNode.insertBefore(t, e), u.Db(e, t), this.b = t, this.d("loadstart", this.Bd), this.d("ended", this.xd), this.d("play", this.Nb), this.d("firstplay", this.zd), this.d("pause", this.Mb), this.d("progress", this.Cd), this.d("durationchange", this.yc), this.d("fullscreenchange", this.Ad), t
    }, t.Kc = function() {
        this.lc && this.Ba(), this.lc = setInterval(u.bind(this, function() {
            this.k("timeupdate")
        }), 250)
    }, t.Ba = function() {
        clearInterval(this.lc), this.k("timeupdate")
    }, t.Bd = function() {
        this.error(j), this.paused() ? (T(this, l), this.W("play", function() {
            T(this, f)
        })) : this.k("firstplay")
    }, t.tc = l, t.Nb = function() {
        u.r(this.b, "vjs-paused"), u.o(this.b, "vjs-playing")
    }, t.zd = function() {
        this.j.starttime && this.currentTime(this.j.starttime), this.o("vjs-has-started")
    }, t.Mb = function() {
        u.r(this.b, "vjs-playing"), u.o(this.b, "vjs-paused")
    }, t.Cd = function() {
        1 == this.bufferedPercent() && this.k("loadedalldata")
    }, t.xd = function() {
        this.j.loop && (this.currentTime(0), this.play())
    }, t.yc = function() {
        var t = U(this, "duration");
        t && (0 > t && (t = 1 / 0), this.duration(t), 1 / 0 === t ? this.o("vjs-live") : this.r("vjs-live"))
    }, t.Ad = function() {
        this.isFullscreen() ? this.o("vjs-fullscreen") : this.r("vjs-fullscreen")
    }, t.play = function() {
        return V(this, "play"), this
    }, t.pause = function() {
        return V(this, "pause"), this
    }, t.paused = function() {
        return U(this, "paused") === l ? l : f
    }, t.currentTime = function(t) {
        return t !== b ? (V(this, "setCurrentTime", t), this.Ib && this.k("timeupdate"), this) : this.z.currentTime = U(this, "currentTime") || 0
    }, t.duration = function(t) {
        return t !== b ? (this.z.duration = parseFloat(t), this) : (this.z.duration === b && this.yc(), this.z.duration || 0)
    }, t.buffered = function() {
        var t = U(this, "buffered"),
            e = t.length - 1,
            n = this.z.sb = this.z.sb || 0;
        return t && 0 <= e && t.end(e) !== n && (n = t.end(e), this.z.sb = n), u.yb(0, n)
    }, t.bufferedPercent = function() {
        return this.duration() ? this.buffered().end(0) / this.duration() : 0
    }, t.volume = function(t) {
        return t !== b ? (t = Math.max(0, Math.min(1, parseFloat(t))), this.z.volume = t, V(this, "setVolume", t), u.Kd(t), this) : (t = parseFloat(U(this, "volume")), isNaN(t) ? 1 : t)
    }, t.muted = function(t) {
        return t !== b ? (V(this, "setMuted", t), this) : U(this, "muted") || l
    }, t.ab = function() {
        return U(this, "supportsFullScreen") || l
    }, t.vc = l, t.isFullscreen = function(t) {
        return t !== b ? (this.vc = !!t, this) : this.vc
    }, t.isFullScreen = function(t) {
        return u.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")'), this.isFullscreen(t)
    }, t.requestFullscreen = function() {
        var t = u.Na.Ab;
        return this.isFullscreen(f), t ? (u.d(document, t.fullscreenchange, u.bind(this, function(e) {
            this.isFullscreen(document[t.fullscreenElement]), this.isFullscreen() === l && u.p(document, t.fullscreenchange, arguments.callee), this.k("fullscreenchange")
        })), this.b[t.requestFullscreen]()) : this.g.ab() ? V(this, "enterFullScreen") : (this.sd = f, this.kd = document.documentElement.style.overflow, u.d(document, "keydown", u.bind(this, this.pc)), document.documentElement.style.overflow = "hidden", u.o(document.body, "vjs-full-window"), this.k("enterFullWindow"), this.k("fullscreenchange")), this
    }, t.exitFullscreen = function() {
        var t = u.Na.Ab;
        return this.isFullscreen(l), t ? document[t.exitFullscreen]() : this.g.ab() ? V(this, "exitFullScreen") : (ea(this), this.k("fullscreenchange")), this
    }, t.pc = function(t) {
        27 === t.keyCode && (this.isFullscreen() === f ? this.exitFullscreen() : ea(this))
    }, t.src = function(t) {
        if (t === b) return U(this, "src");
        if (t instanceof Array) {
            var e;
            t: {
                e = t;
                for (var n = 0, i = this.j.techOrder; n < i.length; n++) {
                    var o = u.$(i[n]),
                        r = window.videojs[o];
                    if (r) {
                        if (r.isSupported())
                            for (var s = 0, a = e; s < a.length; s++) {
                                var c = a[s];
                                if (r.canPlaySource(c)) {
                                    e = {
                                        source: c,
                                        g: o
                                    };
                                    break t
                                }
                            }
                    }
                    else u.log.error('The "' + o + '" tech is undefined. Skipped browser support check for that tech.')
                }
                e = l
            }
            e ? (t = e.source, e = e.g, e == this.Ca ? this.src(t) : R(this, e, t)) : (this.error({
                code: 4,
                message: this.options().notSupportedMessage
            }), this.Ea())
        }
        else t instanceof Object ? window.videojs[this.Ca].canPlaySource(t) ? this.src(t.src) : this.src([t]) : (this.z.src = t, this.ca ? (V(this, "src", t), "auto" == this.j.preload && this.load(), this.j.autoplay && this.play()) : this.J(function() {
            this.src(t)
        }));
        return this
    }, t.load = function() {
        return V(this, "load"), this
    }, t.currentSrc = function() {
        return U(this, "currentSrc") || this.z.src || ""
    }, t.Xa = function(t) {
        return t !== b ? (V(this, "setPreload", t), this.j.preload = t, this) : U(this, "preload")
    }, t.autoplay = function(t) {
        return t !== b ? (V(this, "setAutoplay", t), this.j.autoplay = t, this) : U(this, "autoplay")
    }, t.loop = function(t) {
        return t !== b ? (V(this, "setLoop", t), this.j.loop = t, this) : U(this, "loop")
    }, t.poster = function(t) {
        return t === b ? this.Bc : (this.Bc = t, V(this, "setPoster", t), void this.k("posterchange"))
    }, t.controls = function(t) {
        return t !== b ? (t = !!t, this.xb !== t && ((this.xb = t) ? (this.r("vjs-controls-disabled"), this.o("vjs-controls-enabled"), this.k("controlsenabled")) : (this.r("vjs-controls-enabled"), this.o("vjs-controls-disabled"), this.k("controlsdisabled"))), this) : this.xb
    }, u.Player.prototype.Sb, t = u.Player.prototype, t.usingNativeControls = function(t) {
        return t !== b ? (t = !!t, this.Sb !== t && ((this.Sb = t) ? (this.o("vjs-using-native-controls"), this.k("usingnativecontrols")) : (this.r("vjs-using-native-controls"), this.k("usingcustomcontrols"))), this) : this.Sb
    }, t.ba = j, t.error = function(t) {
        return t === b ? this.ba : t === j ? (this.ba = t, this.r("vjs-error"), this) : (this.ba = t instanceof u.F ? t : new u.F(t), this.k("error"), this.o("vjs-error"), u.log.error("(CODE:" + this.ba.code + " " + u.F.Ra[this.ba.code] + ")", this.ba.message, this.ba), this)
    }, t.ended = function() {
        return U(this, "ended")
    }, t.seeking = function() {
        return U(this, "seeking")
    }, t.na = f, t.reportUserActivity = function() {
        this.na = f
    }, t.Rb = f, t.userActive = function(t) {
        return t !== b ? (t = !!t, t !== this.Rb && ((this.Rb = t) ? (this.na = f, this.r("vjs-user-inactive"), this.o("vjs-user-active"), this.k("useractive")) : (this.na = l, this.g && this.g.W("mousemove", function(t) {
            t.stopPropagation(), t.preventDefault()
        }), this.r("vjs-user-active"), this.o("vjs-user-inactive"), this.k("userinactive"))), this) : this.Rb
    }, t.playbackRate = function(t) {
        return t !== b ? (V(this, "setPlaybackRate", t), this) : this.g && this.g.n && this.g.n.playbackRate ? U(this, "playbackRate") : 1
    }, u.Ha = u.a.extend(), u.Ha.prototype.j = {
        ee: "play",
        children: {
            playToggle: {},
            currentTimeDisplay: {},
            timeDivider: {},
            durationDisplay: {},
            remainingTimeDisplay: {},
            liveDisplay: {},
            progressControl: {},
            fullscreenToggle: {},
            volumeControl: {},
            muteToggle: {},
            playbackRateMenuButton: {}
        }
    }, u.Ha.prototype.e = function() {
        return u.e("div", {
            className: "vjs-control-bar"
        })
    }, u.Yb = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e)
        }
    }), u.Yb.prototype.e = function() {
        var t = u.a.prototype.e.call(this, "div", {
            className: "vjs-live-controls vjs-control"
        });
        return this.u = u.e("div", {
            className: "vjs-live-display",
            innerHTML: '<span class="vjs-control-text">Stream Type </span>LIVE',
            "aria-live": "off"
        }), t.appendChild(this.u), t
    }, u.ac = u.s.extend({
        h: function(t, e) {
            u.s.call(this, t, e), t.d("play", u.bind(this, this.Nb)), t.d("pause", u.bind(this, this.Mb))
        }
    }), t = u.ac.prototype, t.sa = "Play", t.S = function() {
        return "vjs-play-control " + u.s.prototype.S.call(this)
    }, t.q = function() {
        this.c.paused() ? this.c.play() : this.c.pause()
    }, t.Nb = function() {
        u.r(this.b, "vjs-paused"), u.o(this.b, "vjs-playing"), this.b.children[0].children[0].innerHTML = "Pause"
    }, t.Mb = function() {
        u.r(this.b, "vjs-playing"), u.o(this.b, "vjs-paused"), this.b.children[0].children[0].innerHTML = "Play"
    }, u.eb = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e), t.d("timeupdate", u.bind(this, this.fa))
        }
    }), u.eb.prototype.e = function() {
        var t = u.a.prototype.e.call(this, "div", {
            className: "vjs-current-time vjs-time-controls vjs-control"
        });
        return this.u = u.e("div", {
            className: "vjs-current-time-display",
            innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
            "aria-live": "off"
        }), t.appendChild(this.u), t
    }, u.eb.prototype.fa = function() {
        var t = this.c.$a ? this.c.z.currentTime : this.c.currentTime();
        this.u.innerHTML = '<span class="vjs-control-text">Current Time </span>' + u.ya(t, this.c.duration())
    }, u.fb = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e), t.d("timeupdate", u.bind(this, this.fa))
        }
    }), u.fb.prototype.e = function() {
        var t = u.a.prototype.e.call(this, "div", {
            className: "vjs-duration vjs-time-controls vjs-control"
        });
        return this.u = u.e("div", {
            className: "vjs-duration-display",
            innerHTML: '<span class="vjs-control-text">Duration Time </span>0:00',
            "aria-live": "off"
        }), t.appendChild(this.u), t
    }, u.fb.prototype.fa = function() {
        var t = this.c.duration();
        t && (this.u.innerHTML = '<span class="vjs-control-text">Duration Time </span>' + u.ya(t))
    }, u.gc = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e)
        }
    }), u.gc.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-time-divider",
            innerHTML: "<div><span>/</span></div>"
        })
    }, u.mb = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e), t.d("timeupdate", u.bind(this, this.fa))
        }
    }), u.mb.prototype.e = function() {
        var t = u.a.prototype.e.call(this, "div", {
            className: "vjs-remaining-time vjs-time-controls vjs-control"
        });
        return this.u = u.e("div", {
            className: "vjs-remaining-time-display",
            innerHTML: '<span class="vjs-control-text">Remaining Time </span>-0:00',
            "aria-live": "off"
        }), t.appendChild(this.u), t
    }, u.mb.prototype.fa = function() {
        this.c.duration() && (this.u.innerHTML = '<span class="vjs-control-text">Remaining Time </span>-' + u.ya(this.c.duration() - this.c.currentTime()))
    }, u.Ia = u.s.extend({
        h: function(t, e) {
            u.s.call(this, t, e)
        }
    }), u.Ia.prototype.sa = "Fullscreen", u.Ia.prototype.S = function() {
        return "vjs-fullscreen-control " + u.s.prototype.S.call(this)
    }, u.Ia.prototype.q = function() {
        this.c.isFullscreen() ? (this.c.exitFullscreen(), this.wb.innerHTML = "Fullscreen") : (this.c.requestFullscreen(), this.wb.innerHTML = "Non-Fullscreen")
    }, u.lb = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e)
        }
    }), u.lb.prototype.j = {
        children: {
            seekBar: {}
        }
    }, u.lb.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-progress-control vjs-control"
        })
    }, u.cc = u.Q.extend({
        h: function(t, e) {
            u.Q.call(this, t, e), t.d("timeupdate", u.bind(this, this.ma)), t.J(u.bind(this, this.ma))
        }
    }), t = u.cc.prototype, t.j = {
        children: {
            loadProgressBar: {},
            playProgressBar: {},
            seekHandle: {}
        },
        barName: "playProgressBar",
        handleName: "seekHandle"
    }, t.Ac = "timeupdate", t.e = function() {
        return u.Q.prototype.e.call(this, "div", {
            className: "vjs-progress-holder",
            "aria-label": "video progress bar"
        })
    }, t.ma = function() {
        var t = this.c.$a ? this.c.z.currentTime : this.c.currentTime();
        this.b.setAttribute("aria-valuenow", u.round(100 * this.Cb(), 2)), this.b.setAttribute("aria-valuetext", u.ya(t, this.c.duration()))
    }, t.Cb = function() {
        return this.c.currentTime() / this.c.duration()
    }, t.Wa = function(t) {
        u.Q.prototype.Wa.call(this, t), this.c.$a = f, this.Wd = !this.c.paused(), this.c.pause()
    }, t.Kb = function(t) {
        t = J(this, t) * this.c.duration(), t == this.c.duration() && (t -= .1), this.c.currentTime(t)
    }, t.Lb = function(t) {
        u.Q.prototype.Lb.call(this, t), this.c.$a = l, this.Wd && this.c.play()
    }, t.Hc = function() {
        this.c.currentTime(this.c.currentTime() + 5);
    }, t.Gc = function() {
        this.c.currentTime(this.c.currentTime() - 5)
    }, u.ib = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e), t.d("progress", u.bind(this, this.update))
        }
    }), u.ib.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-load-progress",
            innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
        })
    }, u.ib.prototype.update = function() {
        this.b.style && (this.b.style.width = u.round(100 * this.c.bufferedPercent(), 2) + "%")
    }, u.$b = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e)
        }
    }), u.$b.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-play-progress",
            innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
        })
    }, u.Ka = u.Y.extend({
        h: function(t, e) {
            u.Y.call(this, t, e), t.d("timeupdate", u.bind(this, this.fa))
        }
    }), u.Ka.prototype.defaultValue = "00:00", u.Ka.prototype.e = function() {
        return u.Y.prototype.e.call(this, "div", {
            className: "vjs-seek-handle",
            "aria-live": "off"
        })
    }, u.Ka.prototype.fa = function() {
        var t = this.c.$a ? this.c.z.currentTime : this.c.currentTime();
        this.b.innerHTML = '<span class="vjs-control-text">' + u.ya(t, this.c.duration()) + "</span>"
    }, u.ob = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e), t.g && t.g.n && t.g.n.volumeControl === l && this.o("vjs-hidden"), t.d("loadstart", u.bind(this, function() {
                t.g.n && t.g.n.volumeControl === l ? this.o("vjs-hidden") : this.r("vjs-hidden")
            }))
        }
    }), u.ob.prototype.j = {
        children: {
            volumeBar: {}
        }
    }, u.ob.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-volume-control vjs-control"
        })
    }, u.nb = u.Q.extend({
        h: function(t, e) {
            u.Q.call(this, t, e), t.d("volumechange", u.bind(this, this.ma)), t.J(u.bind(this, this.ma))
        }
    }), t = u.nb.prototype, t.ma = function() {
        this.b.setAttribute("aria-valuenow", u.round(100 * this.c.volume(), 2)), this.b.setAttribute("aria-valuetext", u.round(100 * this.c.volume(), 2) + "%")
    }, t.j = {
        children: {
            volumeLevel: {},
            volumeHandle: {}
        },
        barName: "volumeLevel",
        handleName: "volumeHandle"
    }, t.Ac = "volumechange", t.e = function() {
        return u.Q.prototype.e.call(this, "div", {
            className: "vjs-volume-bar",
            "aria-label": "volume level"
        })
    }, t.Kb = function(t) {
        this.c.muted() && this.c.muted(l), this.c.volume(J(this, t))
    }, t.Cb = function() {
        return this.c.muted() ? 0 : this.c.volume()
    }, t.Hc = function() {
        this.c.volume(this.c.volume() + .1)
    }, t.Gc = function() {
        this.c.volume(this.c.volume() - .1)
    }, u.hc = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e)
        }
    }), u.hc.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-volume-level",
            innerHTML: '<span class="vjs-control-text"></span>'
        })
    }, u.pb = u.Y.extend(), u.pb.prototype.defaultValue = "00:00", u.pb.prototype.e = function() {
        return u.Y.prototype.e.call(this, "div", {
            className: "vjs-volume-handle"
        })
    }, u.ha = u.s.extend({
        h: function(t, e) {
            u.s.call(this, t, e), t.d("volumechange", u.bind(this, this.update)), t.g && t.g.n && t.g.n.volumeControl === l && this.o("vjs-hidden"), t.d("loadstart", u.bind(this, function() {
                t.g.n && t.g.n.volumeControl === l ? this.o("vjs-hidden") : this.r("vjs-hidden")
            }))
        }
    }), u.ha.prototype.e = function() {
        return u.s.prototype.e.call(this, "div", {
            className: "vjs-mute-control vjs-control",
            innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
        })
    }, u.ha.prototype.q = function() {
        this.c.muted(this.c.muted() ? l : f)
    }, u.ha.prototype.update = function() {
        var t = this.c.volume(),
            e = 3;
        for (0 === t || this.c.muted() ? e = 0 : .33 > t ? e = 1 : .67 > t && (e = 2), this.c.muted() ? "Unmute" != this.b.children[0].children[0].innerHTML && (this.b.children[0].children[0].innerHTML = "Unmute") : "Mute" != this.b.children[0].children[0].innerHTML && (this.b.children[0].children[0].innerHTML = "Mute"), t = 0; 4 > t; t++) u.r(this.b, "vjs-vol-" + t);
        u.o(this.b, "vjs-vol-" + e)
    }, u.qa = u.L.extend({
        h: function(t, e) {
            u.L.call(this, t, e), t.d("volumechange", u.bind(this, this.update)), t.g && t.g.n && t.g.n.Nc === l && this.o("vjs-hidden"), t.d("loadstart", u.bind(this, function() {
                t.g.n && t.g.n.Nc === l ? this.o("vjs-hidden") : this.r("vjs-hidden")
            })), this.o("vjs-menu-button")
        }
    }), u.qa.prototype.va = function() {
        var t = new u.ga(this.c, {
                kc: "div"
            }),
            e = new u.nb(this.c, u.l.B({
                Vd: f
            }, this.j.le));
        return t.V(e), t
    }, u.qa.prototype.q = function() {
        u.ha.prototype.q.call(this), u.L.prototype.q.call(this)
    }, u.qa.prototype.e = function() {
        return u.s.prototype.e.call(this, "div", {
            className: "vjs-volume-menu-button vjs-menu-button vjs-control",
            innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
        })
    }, u.qa.prototype.update = u.ha.prototype.update, u.bc = u.L.extend({
        h: function(t, e) {
            u.L.call(this, t, e), this.Mc(), this.Lc(), t.d("loadstart", u.bind(this, this.Mc)), t.d("ratechange", u.bind(this, this.Lc))
        }
    }), t = u.bc.prototype, t.e = function() {
        var t = u.a.prototype.e.call(this, "div", {
            className: "vjs-playback-rate vjs-menu-button vjs-control",
            innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">Playback Rate</span></div>'
        });
        return this.xc = u.e("div", {
            className: "vjs-playback-rate-value",
            innerHTML: 1
        }), t.appendChild(this.xc), t
    }, t.va = function() {
        var t = new u.ga(this.m()),
            e = this.m().options().playbackRates;
        if (e)
            for (var n = e.length - 1; 0 <= n; n--) t.V(new u.kb(this.m(), {
                rate: e[n] + "x"
            }));
        return t
    }, t.ma = function() {
        this.w().setAttribute("aria-valuenow", this.m().playbackRate())
    }, t.q = function() {
        for (var t = this.m().playbackRate(), e = this.m().options().playbackRates, n = e[0], i = 0; i < e.length; i++)
            if (e[i] > t) {
                n = e[i];
                break
            }
        this.m().playbackRate(n)
    }, t.Mc = function() {
        fa(this) ? this.r("vjs-hidden") : this.o("vjs-hidden")
    }, t.Lc = function() {
        fa(this) && (this.xc.innerHTML = this.m().playbackRate() + "x")
    }, u.kb = u.I.extend({
        kc: "button",
        h: function(t, e) {
            var n = this.label = e.rate,
                i = this.Cc = parseFloat(n, 10);
            e.label = n, e.selected = 1 === i, u.I.call(this, t, e), this.m().d("ratechange", u.bind(this, this.update))
        }
    }), u.kb.prototype.q = function() {
        u.I.prototype.q.call(this), this.m().playbackRate(this.Cc)
    }, u.kb.prototype.update = function() {
        this.selected(this.m().playbackRate() == this.Cc)
    }, u.Ja = u.s.extend({
        h: function(t, e) {
            u.s.call(this, t, e), t.poster() && this.src(t.poster()), (!t.poster() || !t.controls()) && this.G(), t.d("posterchange", u.bind(this, function() {
                this.src(t.poster())
            })), t.d("play", u.bind(this, this.G))
        }
    });
    var ga = "backgroundSize" in u.A.style;
    u.Ja.prototype.e = function() {
        var t = u.e("div", {
            className: "vjs-poster",
            tabIndex: -1
        });
        return ga || t.appendChild(u.e("img")), t
    }, u.Ja.prototype.src = function(t) {
        var e = this.w();
        t !== b && (ga ? e.style.backgroundImage = 'url("' + t + '")' : e.firstChild.src = t)
    }, u.Ja.prototype.q = function() {
        this.m().controls() && this.c.play()
    }, u.Zb = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e), t.d("canplay", u.bind(this, this.G)), t.d("canplaythrough", u.bind(this, this.G)), t.d("playing", u.bind(this, this.G)), t.d("seeking", u.bind(this, this.show)), t.d("seeked", u.bind(this, this.G)), t.d("ended", u.bind(this, this.G)), t.d("waiting", u.bind(this, this.show))
        }
    }), u.Zb.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-loading-spinner"
        })
    }, u.bb = u.s.extend(), u.bb.prototype.e = function() {
        return u.s.prototype.e.call(this, "div", {
            className: "vjs-big-play-button",
            innerHTML: '<span aria-hidden="true"></span>',
            "aria-label": "play video"
        })
    }, u.bb.prototype.q = function() {
        this.c.play()
    }, u.gb = u.a.extend({
        h: function(t, e) {
            u.a.call(this, t, e), this.update(), t.d("error", u.bind(this, this.update))
        }
    }), u.gb.prototype.e = function() {
        var t = u.a.prototype.e.call(this, "div", {
            className: "vjs-error-display"
        });
        return this.u = u.e("div"), t.appendChild(this.u), t
    }, u.gb.prototype.update = function() {
        this.m().error() && (this.u.innerHTML = this.m().error().message)
    }, u.t = u.a.extend({
        h: function(t, e, n) {
            e = e || {}, e.Ec = l, u.a.call(this, t, e, n);
            var i, o;
            o = this, i = this.m(), t = function() {
                if (i.controls() && !i.usingNativeControls()) {
                    var t;
                    o.d("mousedown", o.q), o.d("touchstart", function(e) {
                        e.preventDefault(), t = this.c.userActive()
                    }), o.d("touchmove", function() {
                        t && this.m().reportUserActivity()
                    }), I(o), o.d("tap", o.Dd)
                }
            }, e = u.bind(o, o.Hd), this.J(t), i.d("controlsenabled", t), i.d("controlsdisabled", e), this.J(function() {
                this.networkState && 0 < this.networkState() && this.m().k("loadstart")
            })
        }
    }), t = u.t.prototype, t.Hd = function() {
        this.p("tap"), this.p("touchstart"), this.p("touchmove"), this.p("touchleave"), this.p("touchcancel"), this.p("touchend"), this.p("click"), this.p("mousedown")
    }, t.q = function(t) {
        0 === t.button && this.m().controls() && (this.m().paused() ? this.m().play() : this.m().pause())
    }, t.Dd = function() {
        this.m().userActive(!this.m().userActive())
    }, t.Pb = m(), t.n = {
        volumeControl: f,
        fullscreenResize: l,
        playbackRate: l,
        progressEvents: l,
        timeupdateEvents: l
    }, u.media = {}, u.f = u.t.extend({
        h: function(t, e, n) {
            for (this.n.volumeControl = u.f.dd(), this.n.playbackRate = u.f.cd(), this.n.movingMediaElementInDOM = !u.Sc, this.n.fullscreenResize = f, u.t.call(this, t, e, n), n = u.f.hb.length - 1; 0 <= n; n--) u.d(this.b, u.f.hb[n], u.bind(this, this.md));
            if ((e = e.source) && this.b.currentSrc !== e.src && (this.b.src = e.src), u.ec && t.options().nativeControlsForTouch !== l) {
                var i, o, r, s;
                i = this, o = this.m(), e = o.controls(), i.b.controls = !!e, r = function() {
                    i.b.controls = f
                }, s = function() {
                    i.b.controls = l
                }, o.d("controlsenabled", r), o.d("controlsdisabled", s), e = function() {
                    o.p("controlsenabled", r), o.p("controlsdisabled", s)
                }, i.d("dispose", e), o.d("usingcustomcontrols", e), o.usingNativeControls(f)
            }
            t.J(function() {
                this.P && this.j.autoplay && this.paused() && (delete this.P.poster, this.play())
            }), this.Ea()
        }
    }), t = u.f.prototype, t.dispose = function() {
        u.t.prototype.dispose.call(this)
    }, t.e = function() {
        var t, e = this.c,
            n = e.P;
        n && this.n.movingMediaElementInDOM !== l || (n ? (t = n.cloneNode(l), u.f.mc(n), n = t, e.P = j) : n = u.e("video", {
            id: e.id() + "_html5_api",
            className: "vjs-tech"
        }), n.player = e, u.Db(n, e.w())), t = ["autoplay", "preload", "loop", "muted"];
        for (var i = t.length - 1; 0 <= i; i--) {
            var o = t[i];
            e.j[o] !== j && (n[o] = e.j[o])
        }
        return n
    }, t.md = function(t) {
        "error" == t.type ? this.m().error(this.error().code) : (t.bubbles = l, this.m().k(t))
    }, t.play = function() {
        this.b.play()
    }, t.pause = function() {
        this.b.pause()
    }, t.paused = function() {
        return this.b.paused
    }, t.currentTime = function() {
        return this.b.currentTime
    }, t.Jd = function(t) {
        try {
            this.b.currentTime = t
        }
        catch (e) {
            u.log(e, "Video is not ready. (Video.js)")
        }
    }, t.duration = function() {
        return this.b.duration || 0
    }, t.buffered = function() {
        return this.b.buffered
    }, t.volume = function() {
        return this.b.volume
    }, t.Pd = function(t) {
        this.b.volume = t
    }, t.muted = function() {
        return this.b.muted
    }, t.Md = function(t) {
        this.b.muted = t
    }, t.width = function() {
        return this.b.offsetWidth
    }, t.height = function() {
        return this.b.offsetHeight
    }, t.ab = function() {
        return "function" != typeof this.b.webkitEnterFullScreen || !/Android/.test(u.M) && /Chrome|Mac OS X 10.5/.test(u.M) ? l : f
    }, t.nc = function() {
        var t = this.b;
        t.paused && t.networkState <= t.Yd ? (this.b.play(), setTimeout(function() {
            t.pause(), t.webkitEnterFullScreen()
        }, 0)) : t.webkitEnterFullScreen()
    }, t.nd = function() {
        this.b.webkitExitFullScreen()
    }, t.src = function(t) {
        this.b.src = t
    }, t.load = function() {
        this.b.load()
    }, t.currentSrc = function() {
        return this.b.currentSrc
    }, t.poster = function() {
        return this.b.poster
    }, t.Pb = function(t) {
        this.b.poster = t
    }, t.Xa = function() {
        return this.b.Xa
    }, t.Od = function(t) {
        this.b.Xa = t
    }, t.autoplay = function() {
        return this.b.autoplay
    }, t.Id = function(t) {
        this.b.autoplay = t
    }, t.controls = function() {
        return this.b.controls
    }, t.loop = function() {
        return this.b.loop
    }, t.Ld = function(t) {
        this.b.loop = t
    }, t.error = function() {
        return this.b.error
    }, t.seeking = function() {
        return this.b.seeking
    }, t.ended = function() {
        return this.b.ended
    }, t.playbackRate = function() {
        return this.b.playbackRate
    }, t.Nd = function(t) {
        this.b.playbackRate = t
    }, t.networkState = function() {
        return this.b.networkState
    }, u.f.isSupported = function() {
        try {
            u.A.volume = .5
        }
        catch (t) {
            return l
        }
        return !!u.A.canPlayType
    }, u.f.tb = function(t) {
        try {
            return !!u.A.canPlayType(t.type)
        }
        catch (e) {
            return ""
        }
    }, u.f.dd = function() {
        var t = u.A.volume;
        return u.A.volume = t / 2 + .1, t !== u.A.volume
    }, u.f.cd = function() {
        var t = u.A.playbackRate;
        return u.A.playbackRate = t / 2 + .1, t !== u.A.playbackRate
    };
    var W, ha = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
        ia = /^video\/mp4/i;
    u.f.zc = function() {
        4 <= u.Tb && (W || (W = u.A.constructor.prototype.canPlayType), u.A.constructor.prototype.canPlayType = function(t) {
            return t && ha.test(t) ? "maybe" : W.call(this, t)
        }), u.Wc && (W || (W = u.A.constructor.prototype.canPlayType), u.A.constructor.prototype.canPlayType = function(t) {
            return t && ia.test(t) ? "maybe" : W.call(this, t)
        })
    }, u.f.Ud = function() {
        var t = u.A.constructor.prototype.canPlayType;
        return u.A.constructor.prototype.canPlayType = W, W = j, t
    }, u.f.zc(), u.f.hb = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" "), u.f.mc = function(t) {
        if (t) {
            for (t.player = j, t.parentNode && t.parentNode.removeChild(t); t.hasChildNodes();) t.removeChild(t.firstChild);
            if (t.removeAttribute("src"), "function" == typeof t.load) try {
                t.load()
            }
            catch (e) {}
        }
    }, u.i = u.t.extend({
        h: function(t, e, n) {
            u.t.call(this, t, e, n);
            var i = e.source;
            n = e.parentEl;
            var o = this.b = u.e("div", {
                    id: t.id() + "_temp_flash"
                }),
                r = t.id() + "_flash_api";
            t = t.j;
            var s, a = u.l.B({
                    readyFunction: "videojs.Flash.onReady",
                    eventProxyFunction: "videojs.Flash.onEvent",
                    errorEventProxyFunction: "videojs.Flash.onError",
                    autoplay: t.autoplay,
                    preload: t.Xa,
                    loop: t.loop,
                    muted: t.muted
                }, e.flashVars),
                c = u.l.B({
                    wmode: "opaque",
                    bgcolor: "#000000"
                }, e.params),
                h = u.l.B({
                    id: r,
                    name: r,
                    "class": "vjs-tech"
                }, e.attributes);
            if (i && (i.type && u.i.ud(i.type) ? (t = u.i.Ic(i.src), a.rtmpConnection = encodeURIComponent(t.vb), a.rtmpStream = encodeURIComponent(t.Qb)) : a.src = encodeURIComponent(u.qc(i.src))), this.setCurrentTime = function(t) {
                    s = t, this.b.vjs_setProperty("currentTime", t)
                }, this.currentTime = function() {
                    return this.seeking() ? s : this.b.vjs_getProperty("currentTime")
                }, u.Db(o, n), e.startTime && this.J(function() {
                    this.load(), this.play(), this.currentTime(e.startTime)
                }), u.Xb && this.J(function() {
                    u.d(this.w(), "mousemove", u.bind(this, function() {
                        this.m().k({
                            type: "mousemove",
                            bubbles: l
                        })
                    }))
                }), e.iFrameMode !== f || u.Xb) u.i.ld(e.swf, o, a, c, h);
            else {
                var d = u.e("iframe", {
                    id: r + "_iframe",
                    name: r + "_iframe",
                    className: "vjs-tech",
                    scrolling: "no",
                    marginWidth: 0,
                    marginHeight: 0,
                    frameBorder: 0
                });
                a.readyFunction = "ready", a.eventProxyFunction = "events", a.errorEventProxyFunction = "errors", u.d(d, "load", u.bind(this, function() {
                    var t, n = d.contentWindow;
                    t = d.contentDocument ? d.contentDocument : d.contentWindow.document, t.write(u.i.rc(e.swf, a, c, h)), n.player = this.c, n.ready = u.bind(this.c, function(e) {
                        var n = this.g;
                        n.b = t.getElementById(e), u.i.ub(n)
                    }), n.events = u.bind(this.c, function(t, e) {
                        this && "flash" === this.Ca && this.k(e)
                    }), n.errors = u.bind(this.c, function(t, e) {
                        u.log("Flash Error", e)
                    })
                })), o.parentNode.replaceChild(d, o)
            }
        }
    }), t = u.i.prototype, t.dispose = function() {
        u.t.prototype.dispose.call(this)
    }, t.play = function() {
        this.b.vjs_play()
    }, t.pause = function() {
        this.b.vjs_pause()
    }, t.src = function(t) {
        if (t === b) return this.currentSrc();
        if (u.i.td(t) ? (t = u.i.Ic(t), this.ge(t.vb), this.he(t.Qb)) : (t = u.qc(t), this.b.vjs_src(t)), this.c.autoplay()) {
            var e = this;
            setTimeout(function() {
                e.play()
            }, 0)
        }
    }, t.currentSrc = function() {
        var t = this.b.vjs_getProperty("currentSrc");
        if (t == j) {
            var e = this.rtmpConnection(),
                n = this.rtmpStream();
            e && n && (t = u.i.Qd(e, n))
        }
        return t
    }, t.load = function() {
        this.b.vjs_load()
    }, t.poster = function() {
        this.b.vjs_getProperty("poster")
    }, t.Pb = m(), t.buffered = function() {
        return u.yb(0, this.b.vjs_getProperty("buffered"))
    }, t.ab = r(l), t.nc = r(l);
    var ja = u.i.prototype,
        X = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),
        ka = "error networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" "),
        Y;
    for (Y = 0; Y < X.length; Y++) ma(X[Y]), la();
    for (Y = 0; Y < ka.length; Y++) ma(ka[Y]);
    if (u.i.isSupported = function() {
            return 10 <= u.i.version()[0]
        }, u.i.tb = function(t) {
            return t.type ? (t = t.type.replace(/;.*/, "").toLowerCase(), t in u.i.pd || t in u.i.Jc ? "maybe" : void 0) : ""
        }, u.i.pd = {
            "video/flv": "FLV",
            "video/x-flv": "FLV",
            "video/mp4": "MP4",
            "video/m4v": "MP4"
        }, u.i.Jc = {
            "rtmp/mp4": "MP4",
            "rtmp/flv": "FLV"
        }, u.i.onReady = function(t) {
            t = u.w(t);
            var e = t.player || t.parentNode.player,
                n = e.g;
            t.player = e, n.b = t, u.i.ub(n)
        }, u.i.ub = function(t) {
            t.w().vjs_getProperty ? t.Ea() : setTimeout(function() {
                u.i.ub(t)
            }, 50)
        }, u.i.onEvent = function(t, e) {
            u.w(t).player.k(e)
        }, u.i.onError = function(t, e) {
            var n = u.w(t).player,
                i = "FLASH: " + e;
            "srcnotfound" == e ? n.error({
                code: 4,
                message: i
            }) : n.error(i)
        }, u.i.version = function() {
            var t = "0,0,0";
            try {
                t = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
            }
            catch (e) {
                try {
                    navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (t = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
                }
                catch (n) {}
            }
            return t.split(",")
        }, u.i.ld = function(t, e, n, i, o) {
            t = u.i.rc(t, n, i, o), t = u.e("div", {
                innerHTML: t
            }).childNodes[0], n = e.parentNode, e.parentNode.replaceChild(t, e);
            var r = n.childNodes[0];
            setTimeout(function() {
                r.style.display = "block"
            }, 1e3)
        }, u.i.rc = function(t, e, n, i) {
            var o = "",
                r = "",
                s = "";
            return e && u.l.wa(e, function(t, e) {
                o += t + "=" + e + "&amp;"
            }), n = u.l.B({
                movie: t,
                flashvars: o,
                allowScriptAccess: "always",
                allowNetworking: "all"
            }, n), u.l.wa(n, function(t, e) {
                r += '<param name="' + t + '" value="' + e + '" />'
            }), i = u.l.B({
                data: t,
                width: "100%",
                height: "100%"
            }, i), u.l.wa(i, function(t, e) {
                s += t + '="' + e + '" '
            }), '<object type="application/x-shockwave-flash"' + s + ">" + r + "</object>"
        }, u.i.Qd = function(t, e) {
            return t + "&" + e
        }, u.i.Ic = function(t) {
            var e = {
                vb: "",
                Qb: ""
            };
            if (!t) return e;
            var n, i = t.indexOf("&");
            return -1 !== i ? n = i + 1 : (i = n = t.lastIndexOf("/") + 1, 0 === i && (i = n = t.length)), e.vb = t.substring(0, i), e.Qb = t.substring(n, t.length), e
        }, u.i.ud = function(t) {
            return t in u.i.Jc
        }, u.i.Yc = /^rtmp[set]?:\/\//i, u.i.td = function(t) {
            return u.i.Yc.test(t)
        }, u.Xc = u.a.extend({
            h: function(t, e, n) {
                if (u.a.call(this, t, e, n), t.j.sources && 0 !== t.j.sources.length) t.src(t.j.sources);
                else
                    for (e = 0, n = t.j.techOrder; e < n.length; e++) {
                        var i = u.$(n[e]),
                            o = window.videojs[i];
                        if (o && o.isSupported()) {
                            R(t, i);
                            break
                        }
                    }
            }
        }), u.Player.prototype.textTracks = function() {
            return this.Da = this.Da || []
        }, u.C = u.a.extend({
            h: function(t, e) {
                u.a.call(this, t, e), this.T = e.id || "vjs_" + e.kind + "_" + e.language + "_" + u.v++, this.Fc = e.src, this.hd = e["default"] || e.dflt, this.Sd = e.title, this.de = e.srclang, this.vd = e.label, this.aa = [], this.qb = [], this.ka = this.la = 0, this.c.d("fullscreenchange", u.bind(this, this.$c))
            }
        }), t = u.C.prototype, t.K = q("H"), t.src = q("Fc"), t.Qa = q("hd"), t.title = q("Sd"), t.label = q("vd"), t.ed = q("aa"), t.Zc = q("qb"), t.readyState = q("la"), t.mode = q("ka"), t.$c = function() {
            this.b.style.fontSize = this.c.isFullScreen() ? 140 * (screen.width / this.c.width()) + "%" : ""
        }, t.e = function() {
            return u.a.prototype.e.call(this, "div", {
                className: "vjs-" + this.H + " vjs-text-track"
            })
        }, t.show = function() {
            pa(this), this.ka = 2, u.a.prototype.show.call(this)
        }, t.G = function() {
            pa(this), this.ka = 1, u.a.prototype.G.call(this)
        }, t.disable = function() {
            2 == this.ka && this.G(), this.c.p("timeupdate", u.bind(this, this.update, this.T)), this.c.p("ended", u.bind(this, this.reset, this.T)), this.reset(), this.c.ja("textTrackDisplay").removeChild(this), this.ka = 0
        }, t.load = function() {
            0 === this.la && (this.la = 1, u.get(this.Fc, u.bind(this, this.Ed), u.bind(this, this.yd)))
        }, t.yd = function(t) {
            this.error = t, this.la = 3, this.k("error")
        }, t.Ed = function(t) {
            var e, n;
            t = t.split("\n");
            for (var i = "", o = 1, r = t.length; o < r; o++)
                if (i = u.trim(t[o])) {
                    for (-1 == i.indexOf("-->") ? (e = i, i = u.trim(t[++o])) : e = this.aa.length, e = {
                            id: e,
                            index: this.aa.length
                        }, n = i.split(" --> "), e.startTime = qa(n[0]), e.xa = qa(n[1]), n = []; t[++o] && (i = u.trim(t[o]));) n.push(i);
                    e.text = n.join("<br/>"), this.aa.push(e)
                }
            this.la = 2, this.k("loaded")
        }, t.update = function() {
            if (0 < this.aa.length) {
                var t = this.c.options().trackTimeOffset || 0,
                    t = this.c.currentTime() + t;
                if (this.Ob === b || t < this.Ob || this.Ta <= t) {
                    var e, n, i, o, r = this.aa,
                        s = this.c.duration(),
                        a = 0,
                        u = l,
                        c = [];
                    for (t >= this.Ta || this.Ta === b ? o = this.zb !== b ? this.zb : 0 : (u = f, o = this.Gb !== b ? this.Gb : r.length - 1);;) {
                        if (i = r[o], i.xa <= t) a = Math.max(a, i.xa), i.Ma && (i.Ma = l);
                        else if (t < i.startTime) {
                            if (s = Math.min(s, i.startTime), i.Ma && (i.Ma = l), !u) break
                        }
                        else u ? (c.splice(0, 0, i), n === b && (n = o), e = o) : (c.push(i), e === b && (e = o), n = o), s = Math.min(s, i.xa), a = Math.max(a, i.startTime), i.Ma = f;
                        if (u) {
                            if (0 === o) break;
                            o--
                        }
                        else {
                            if (o === r.length - 1) break;
                            o++
                        }
                    }
                    for (this.qb = c, this.Ta = s, this.Ob = a, this.zb = e, this.Gb = n, e = this.qb, n = "", t = 0, r = e.length; t < r; t++) n += '<span class="vjs-tt-cue">' + e[t].text + "</span>";
                    this.b.innerHTML = n, this.k("cuechange")
                }
            }
        }, t.reset = function() {
            this.Ta = 0, this.Ob = this.c.duration(), this.Gb = this.zb = 0
        }, u.Vb = u.C.extend(), u.Vb.prototype.H = "captions", u.dc = u.C.extend(), u.dc.prototype.H = "subtitles", u.Wb = u.C.extend(), u.Wb.prototype.H = "chapters", u.fc = u.a.extend({
            h: function(t, e, n) {
                if (u.a.call(this, t, e, n), t.j.tracks && 0 < t.j.tracks.length) {
                    e = this.c, t = t.j.tracks;
                    for (var i = 0; i < t.length; i++) n = t[i], na(e, n.kind, n.label, n.language, n)
                }
            }
        }), u.fc.prototype.e = function() {
            return u.a.prototype.e.call(this, "div", {
                className: "vjs-text-track-display"
            })
        }, u.Z = u.I.extend({
            h: function(t, e) {
                var n = this.ea = e.track;
                e.label = n.label(), e.selected = n.Qa(), u.I.call(this, t, e), this.c.d(n.K() + "trackchange", u.bind(this, this.update))
            }
        }), u.Z.prototype.q = function() {
            u.I.prototype.q.call(this), oa(this.c, this.ea.T, this.ea.K())
        }, u.Z.prototype.update = function() {
            this.selected(2 == this.ea.mode())
        }, u.jb = u.Z.extend({
            h: function(t, e) {
                e.track = {
                    K: function() {
                        return e.kind
                    },
                    m: t,
                    label: function() {
                        return e.kind + " off"
                    },
                    Qa: r(l),
                    mode: r(l)
                }, u.Z.call(this, t, e), this.selected(f)
            }
        }), u.jb.prototype.q = function() {
            u.Z.prototype.q.call(this), oa(this.c, this.ea.T, this.ea.K())
        }, u.jb.prototype.update = function() {
            for (var t, e = this.c.textTracks(), n = 0, i = e.length, o = f; n < i; n++) t = e[n], t.K() == this.ea.K() && 2 == t.mode() && (o = l);
            this.selected(o)
        }, u.U = u.L.extend({
            h: function(t, e) {
                u.L.call(this, t, e), 1 >= this.O.length && this.G()
            }
        }), u.U.prototype.ua = function() {
            var t, e = [];
            e.push(new u.jb(this.c, {
                kind: this.H
            }));
            for (var n = 0; n < this.c.textTracks().length; n++) t = this.c.textTracks()[n], t.K() === this.H && e.push(new u.Z(this.c, {
                track: t
            }));
            return e
        }, u.Fa = u.U.extend({
            h: function(t, e, n) {
                u.U.call(this, t, e, n), this.b.setAttribute("aria-label", "Captions Menu")
            }
        }), u.Fa.prototype.H = "captions", u.Fa.prototype.sa = "Captions", u.Fa.prototype.className = "vjs-captions-button", u.La = u.U.extend({
            h: function(t, e, n) {
                u.U.call(this, t, e, n), this.b.setAttribute("aria-label", "Subtitles Menu")
            }
        }), u.La.prototype.H = "subtitles", u.La.prototype.sa = "Subtitles", u.La.prototype.className = "vjs-subtitles-button", u.Ga = u.U.extend({
            h: function(t, e, n) {
                u.U.call(this, t, e, n), this.b.setAttribute("aria-label", "Chapters Menu")
            }
        }), t = u.Ga.prototype, t.H = "chapters", t.sa = "Chapters", t.className = "vjs-chapters-button", t.ua = function() {
            for (var t, e = [], n = 0; n < this.c.textTracks().length; n++) t = this.c.textTracks()[n], t.K() === this.H && e.push(new u.Z(this.c, {
                track: t
            }));
            return e
        }, t.va = function() {
            for (var t, e, n = this.c.textTracks(), i = 0, o = n.length, r = this.O = []; i < o; i++)
                if (t = n[i], t.K() == this.H && t.Qa()) {
                    if (2 > t.readyState()) return this.ae = t, void t.d("loaded", u.bind(this, this.va));
                    e = t;
                    break
                }
            if (n = this.za = new u.ga(this.c), n.ia().appendChild(u.e("li", {
                    className: "vjs-menu-title",
                    innerHTML: u.$(this.H),
                    Rd: -1
                })), e) {
                t = e.aa;
                for (var s, i = 0, o = t.length; i < o; i++) s = t[i], s = new u.cb(this.c, {
                    track: e,
                    cue: s
                }), r.push(s), n.V(s)
            }
            return 0 < this.O.length && this.show(), n
        }, u.cb = u.I.extend({
            h: function(t, e) {
                var n = this.ea = e.track,
                    i = this.cue = e.cue,
                    o = t.currentTime();
                e.label = i.text, e.selected = i.startTime <= o && o < i.xa, u.I.call(this, t, e), n.d("cuechange", u.bind(this, this.update))
            }
        }), u.cb.prototype.q = function() {
            u.I.prototype.q.call(this), this.c.currentTime(this.cue.startTime), this.update(this.cue.startTime)
        }, u.cb.prototype.update = function() {
            var t = this.cue,
                e = this.c.currentTime();
            this.selected(t.startTime <= e && e < t.xa)
        }, u.l.B(u.Ha.prototype.j.children, {
            subtitlesButton: {},
            captionsButton: {},
            chaptersButton: {}
        }), "undefined" != typeof window.JSON && "function" === window.JSON.parse) u.JSON = window.JSON;
    else {
        u.JSON = {};
        var Z = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        u.JSON.parse = function(a, c) {
            function d(t, e) {
                var n, i, o = t[e];
                if (o && "object" == typeof o)
                    for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (i = d(o, n), i !== b ? o[n] = i : delete o[n]);
                return c.call(t, e, o)
            }
            var e;
            if (a = String(a), Z.lastIndex = 0, Z.test(a) && (a = a.replace(Z, function(t) {
                    return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" == typeof c ? d({
                "": e
            }, "") : e;
            throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")
        }
    }
    u.ic = function() {
        var t, e, n = document.getElementsByTagName("video");
        if (n && 0 < n.length)
            for (var i = 0, o = n.length; i < o; i++) {
                if (!(e = n[i]) || !e.getAttribute) {
                    u.rb();
                    break
                }
                e.player === b && (t = e.getAttribute("data-setup"), t !== j && (t = u.JSON.parse(t || "{}"), videojs(e, t)))
            }
        else u.Oc || u.rb()
    }, u.rb = function() {
        setTimeout(u.ic, 1)
    }, "complete" === document.readyState ? u.Oc = f : u.W(window, "load", function() {
        u.Oc = f
    }), u.rb(), u.Gd = function(t, e) {
        u.Player.prototype[t] = e
    };
    var ra = this;
    ra.Xd = f, $("videojs", u), $("_V_", u), $("videojs.options", u.options), $("videojs.players", u.Aa), $("videojs.TOUCH_ENABLED", u.ec), $("videojs.cache", u.ta), $("videojs.Component", u.a), u.a.prototype.player = u.a.prototype.m, u.a.prototype.options = u.a.prototype.options, u.a.prototype.init = u.a.prototype.h, u.a.prototype.dispose = u.a.prototype.dispose, u.a.prototype.createEl = u.a.prototype.e, u.a.prototype.contentEl = u.a.prototype.ia, u.a.prototype.el = u.a.prototype.w, u.a.prototype.addChild = u.a.prototype.V, u.a.prototype.getChild = u.a.prototype.ja, u.a.prototype.getChildById = u.a.prototype.qd, u.a.prototype.children = u.a.prototype.children, u.a.prototype.initChildren = u.a.prototype.uc, u.a.prototype.removeChild = u.a.prototype.removeChild, u.a.prototype.on = u.a.prototype.d, u.a.prototype.off = u.a.prototype.p, u.a.prototype.one = u.a.prototype.W, u.a.prototype.trigger = u.a.prototype.k, u.a.prototype.triggerReady = u.a.prototype.Ea, u.a.prototype.show = u.a.prototype.show, u.a.prototype.hide = u.a.prototype.G, u.a.prototype.width = u.a.prototype.width, u.a.prototype.height = u.a.prototype.height, u.a.prototype.dimensions = u.a.prototype.jd, u.a.prototype.ready = u.a.prototype.J, u.a.prototype.addClass = u.a.prototype.o, u.a.prototype.removeClass = u.a.prototype.r, u.a.prototype.buildCSSClass = u.a.prototype.S, u.Player.prototype.ended = u.Player.prototype.ended, $("videojs.MediaLoader", u.Xc), $("videojs.TextTrackDisplay", u.fc), $("videojs.ControlBar", u.Ha), $("videojs.Button", u.s), $("videojs.PlayToggle", u.ac), $("videojs.FullscreenToggle", u.Ia), $("videojs.BigPlayButton", u.bb), $("videojs.LoadingSpinner", u.Zb), $("videojs.CurrentTimeDisplay", u.eb), $("videojs.DurationDisplay", u.fb), $("videojs.TimeDivider", u.gc), $("videojs.RemainingTimeDisplay", u.mb), $("videojs.LiveDisplay", u.Yb), $("videojs.ErrorDisplay", u.gb), $("videojs.Slider", u.Q), $("videojs.ProgressControl", u.lb), $("videojs.SeekBar", u.cc), $("videojs.LoadProgressBar", u.ib), $("videojs.PlayProgressBar", u.$b), $("videojs.SeekHandle", u.Ka), $("videojs.VolumeControl", u.ob), $("videojs.VolumeBar", u.nb), $("videojs.VolumeLevel", u.hc), $("videojs.VolumeMenuButton", u.qa), $("videojs.VolumeHandle", u.pb), $("videojs.MuteToggle", u.ha), $("videojs.PosterImage", u.Ja), $("videojs.Menu", u.ga), $("videojs.MenuItem", u.I), $("videojs.MenuButton", u.L), $("videojs.PlaybackRateMenuButton", u.bc), u.L.prototype.createItems = u.L.prototype.ua, u.U.prototype.createItems = u.U.prototype.ua, u.Ga.prototype.createItems = u.Ga.prototype.ua, $("videojs.SubtitlesButton", u.La), $("videojs.CaptionsButton", u.Fa), $("videojs.ChaptersButton", u.Ga), $("videojs.MediaTechController", u.t), u.t.prototype.features = u.t.prototype.n, u.t.prototype.n.volumeControl = u.t.prototype.n.Nc, u.t.prototype.n.fullscreenResize = u.t.prototype.n.be, u.t.prototype.n.progressEvents = u.t.prototype.n.fe, u.t.prototype.n.timeupdateEvents = u.t.prototype.n.ie, u.t.prototype.setPoster = u.t.prototype.Pb, $("videojs.Html5", u.f), u.f.Events = u.f.hb, u.f.isSupported = u.f.isSupported, u.f.canPlaySource = u.f.tb, u.f.patchCanPlayType = u.f.zc, u.f.unpatchCanPlayType = u.f.Ud, u.f.prototype.setCurrentTime = u.f.prototype.Jd, u.f.prototype.setVolume = u.f.prototype.Pd, u.f.prototype.setMuted = u.f.prototype.Md, u.f.prototype.setPreload = u.f.prototype.Od, u.f.prototype.setAutoplay = u.f.prototype.Id, u.f.prototype.setLoop = u.f.prototype.Ld, u.f.prototype.enterFullScreen = u.f.prototype.nc, u.f.prototype.exitFullScreen = u.f.prototype.nd, u.f.prototype.playbackRate = u.f.prototype.playbackRate, u.f.prototype.setPlaybackRate = u.f.prototype.Nd, $("videojs.Flash", u.i), u.i.isSupported = u.i.isSupported, u.i.canPlaySource = u.i.tb, u.i.onReady = u.i.onReady, $("videojs.TextTrack", u.C), u.C.prototype.label = u.C.prototype.label, u.C.prototype.kind = u.C.prototype.K, u.C.prototype.mode = u.C.prototype.mode, u.C.prototype.cues = u.C.prototype.ed, u.C.prototype.activeCues = u.C.prototype.Zc, $("videojs.CaptionsTrack", u.Vb), $("videojs.SubtitlesTrack", u.dc), $("videojs.ChaptersTrack", u.Wb), $("videojs.autoSetup", u.ic), $("videojs.plugin", u.Gd), $("videojs.createTimeRange", u.yb), $("videojs.util", u.oa), u.oa.mergeOptions = u.oa.Jb
}(),
function() {
    "use strict";

    function t() {}

    function e(t, e) {
        for (var n = t.length; n--;)
            if (t[n].listener === e) return n;
        return -1
    }

    function n(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var i = t.prototype;
    i.getListeners = function(t) {
        var e, n, i = this._getEvents();
        if ("object" == typeof t) {
            e = {};
            for (n in i) i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n])
        }
        else e = i[t] || (i[t] = []);
        return e
    }, i.flattenListeners = function(t) {
        var e, n = [];
        for (e = 0; e < t.length; e += 1) n.push(t[e].listener);
        return n
    }, i.getListenersAsObject = function(t) {
        var e, n = this.getListeners(t);
        return n instanceof Array && (e = {}, e[t] = n), e || n
    }, i.addListener = function(t, n) {
        var i, o = this.getListenersAsObject(t),
            r = "object" == typeof n;
        for (i in o) o.hasOwnProperty(i) && -1 === e(o[i], n) && o[i].push(r ? n : {
            listener: n,
            once: !1
        });
        return this
    }, i.on = n("addListener"), i.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, i.once = n("addOnceListener"), i.defineEvent = function(t) {
        return this.getListeners(t), this
    }, i.defineEvents = function(t) {
        for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
        return this
    }, i.removeListener = function(t, n) {
        var i, o, r = this.getListenersAsObject(t);
        for (o in r) r.hasOwnProperty(o) && (i = e(r[o], n), -1 !== i && r[o].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, i.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, i.manipulateListeners = function(t, e, n) {
        var i, o, r = t ? this.removeListener : this.addListener,
            s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (i = n.length; i--;) r.call(this, e, n[i]);
        else
            for (i in e) e.hasOwnProperty(i) && (o = e[i]) && ("function" == typeof o ? r.call(this, i, o) : s.call(this, i, o));
        return this
    }, i.removeEvent = function(t) {
        var e, n = typeof t,
            i = this._getEvents();
        if ("string" === n) delete i[t];
        else if ("object" === n)
            for (e in i) i.hasOwnProperty(e) && t.test(e) && delete i[e];
        else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(t, e) {
        var n, i, o, r, s = this.getListenersAsObject(t);
        for (o in s)
            if (s.hasOwnProperty(o))
                for (i = s[o].length; i--;) n = s[o][i], n.once === !0 && this.removeListener(t, n.listener), r = n.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, i.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, i._getOnceReturnValue = function() {
        return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
    }, i._getEvents = function() {
        return this._events || (this._events = {})
    }, "function" == typeof define && define.amd ? define(function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this),
    function(t) {
        "use strict";

        function e(t, e) {
            for (var n in e) t[n] = e[n];
            return t
        }

        function n(t) {
            return "[object Array]" === l.call(t)
        }

        function i(t) {
            var e = [];
            if (n(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0, o = t.length; i < o; i++) e.push(t[i]);
            else e.push(t);
            return e
        }

        function o(t, n) {
            function o(t, n, s) {
                if (!(this instanceof o)) return new o(t, n);
                "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = i(t), this.options = e({}, this.options), "function" == typeof n ? s = n : e(this.options, n), s && this.on("always", s), this.getImages(), r && (this.jqDeferred = new r.Deferred);
                var a = this;
                setTimeout(function() {
                    a.check()
                })
            }

            function l(t) {
                this.img = t
            }
            o.prototype = new t, o.prototype.options = {}, o.prototype.getImages = function() {
                this.images = [];
                for (var t = 0, e = this.elements.length; t < e; t++) {
                    var n = this.elements[t];
                    "IMG" === n.nodeName && this.addImage(n);
                    for (var i = n.querySelectorAll("img"), o = 0, r = i.length; o < r; o++) {
                        var s = i[o];
                        this.addImage(s)
                    }
                }
            }, o.prototype.addImage = function(t) {
                var e = new l(t);
                this.images.push(e)
            }, o.prototype.check = function() {
                function t(t, o) {
                    return e.options.debug && a && s.log("confirm", t, o), e.progress(t), n++, n === i && e.complete(), !0
                }
                var e = this,
                    n = 0,
                    i = this.images.length;
                if (this.hasAnyBroken = !1, !i) return void this.complete();
                for (var o = 0; o < i; o++) {
                    var r = this.images[o];
                    r.on("confirm", t), r.check()
                }
            }, o.prototype.progress = function(t) {
                this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
                var e = this;
                setTimeout(function() {
                    e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify(e, t)
                })
            }, o.prototype.complete = function() {
                var t = this.hasAnyBroken ? "fail" : "done";
                this.isComplete = !0;
                var e = this;
                setTimeout(function() {
                    if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                        var n = e.hasAnyBroken ? "reject" : "resolve";
                        e.jqDeferred[n](e)
                    }
                })
            }, r && (r.fn.imagesLoaded = function(t, e) {
                var n = new o(this, t, e);
                return n.jqDeferred.promise(r(this))
            });
            var u = {};
            return l.prototype = new t, l.prototype.check = function() {
                var t = u[this.img.src];
                if (t) return void this.useCached(t);
                if (u[this.img.src] = this, this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
                var e = this.proxyImage = new Image;
                n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.img.src
            }, l.prototype.useCached = function(t) {
                if (t.isConfirmed) this.confirm(t.isLoaded, "cached was confirmed");
                else {
                    var e = this;
                    t.on("confirm", function(t) {
                        return e.confirm(t.isLoaded, "cache emitted confirmed"), !0
                    })
                }
            }, l.prototype.confirm = function(t, e) {
                this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
            }, l.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, l.prototype.onload = function() {
                this.confirm(!0, "onload"), this.unbindProxyEvents()
            }, l.prototype.onerror = function() {
                this.confirm(!1, "onerror"), this.unbindProxyEvents()
            }, l.prototype.unbindProxyEvents = function() {
                n.unbind(this.proxyImage, "load", this), n.unbind(this.proxyImage, "error", this)
            }, o
        }
        var r = t.jQuery,
            s = t.console,
            a = "undefined" != typeof s,
            l = Object.prototype.toString;
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], o) : t.imagesLoaded = o(t.EventEmitter, t.eventie)
    }(window),
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery", "videojs", "imagesloaded", "jquery-ui"], t) : t(jQuery, videojs)
    }(function(t, e) {
        t.BigVideo = function(n) {
            function i() {
                var e = $.container.outerWidth() < t(window).width() ? $.container.outerWidth() : t(window).width(),
                    n = $.container.outerHeight() < t(window).height() ? $.container.outerHeight() : t(window).height(),
                    i = e / n;
                $.container.is(t("body")) && t("html,body").css("height", t(window).height() > t("body").css("height", "auto").height() ? "100%" : "auto"), i < v ? "video" == d ? (c.width(n * v).height(n), $.shrinkable ? t(m).css("top", -(e / v - n) / 2).css("left", 0).css("height", e / v) : t(m).css("top", 0).css("left", -(n * v - e) / 2).css("height", n), t(m + "_html5_api").css("width", n * v).css("height", n), t(m + "_flash_api").css("width", n * v).css("height", n)) : t("#big-video-image").css({
                    width: "auto",
                    height: n,
                    top: 0,
                    left: -(n * v - e) / 2
                }) : "video" == d ? (c.width(e).height(e / v), t(m).css("top", -(e / v - n) / 2).css("left", 0).css("height", e / v), t(m + "_html5_api").css("width", t(m + "_html5_api").parent().width() + "px").css("height", "auto"), t(m + "_flash_api").css("width", e).css("height", e / v)) : t("#big-video-image").css({
                    width: e,
                    height: "auto",
                    top: -(e / v - n) / 2,
                    left: 0
                })
            }

            function o() {
                var e = '<div id="big-video-control-container"><div id="big-video-control"><a href="#" id="big-video-control-play"></a><div id="big-video-control-middle"><div id="big-video-control-bar"><div id="big-video-control-bound-left"></div><div id="big-video-control-progress"></div><div id="big-video-control-track"></div><div id="big-video-control-bound-right"></div></div></div>\t<div id="big-video-control-timer"></div></div></div>';
                $.container.append(e), t("#big-video-control-container").css("display", "none"), t("#big-video-control-timer").css("display", "none"), t("#big-video-control-track").slider({
                    animate: !0,
                    step: .01,
                    slide: function(e, n) {
                        x = !0, t("#big-video-control-progress").css("width", n.value - .16 + "%"), c.currentTime(n.value / 100 * c.duration())
                    },
                    stop: function(t, e) {
                        x = !1, c.currentTime(e.value / 100 * c.duration())
                    }
                }), t("#big-video-control-bar").click(function(e) {
                    c.currentTime(e.offsetX / t(this).width() * c.duration())
                }), t("#big-video-control-play").click(function(t) {
                    t.preventDefault(), r("toggle")
                }), c.on("timeupdate", function() {
                    if (!x && c.currentTime() / c.duration()) {
                        var e = c.currentTime(),
                            n = Math.floor(e / 60),
                            i = Math.floor(e) - 60 * n;
                        i < 10 && (i = "0" + i);
                        var o = c.currentTime() / c.duration() * 100;
                        t("#big-video-control-track").slider("value", o), t("#big-video-control-progress").css("width", o - .16 + "%"), t("#big-video-control-timer").text(n + ":" + i + "/" + y)
                    }
                })
            }

            function r(e) {
                var n = e || "toggle";
                "toggle" == n && (n = _ ? "pause" : "play"), "pause" == n ? (c.pause(), t("#big-video-control-play").css("background-position", "-16px"), _ = !1) : "play" == n ? (c.play(), t("#big-video-control-play").css("background-position", "0"), _ = !0) : "skip" == n && a()
            }

            function s() {
                c.play(), $.container.off("click", s)
            }

            function a() {
                h++, h === C.length && (h = 0), l(C[h])
            }

            function l(e) {
                t(m).css("display", "block"), d = "video", c.src(e), _ = !0, T ? (t("#big-video-control-container").css("display", "none"), c.ready(function() {
                    c.volume(0)
                }), doLoop = !0) : (t("#big-video-control-container").css("display", "block"), c.ready(function() {
                    c.volume(b)
                }), doLoop = !1), t("#big-video-image").css("display", "none"), t(m).css("display", "block")
            }

            function u(e) {
                t("#big-video-image").remove(), c.pause(), t(m).css("display", "none"), t("#big-video-control-container").css("display", "none"), d = "image";
                var n = t('<img id="big-video-image" src=' + e + " />");
                g.append(n), t("#big-video-image").imagesLoaded(function() {
                    v = t("#big-video-image").width() / t("#big-video-image").height(), i()
                })
            }
            var c, h, d, p = {
                    useFlashForFirefox: !0,
                    forceAutoplay: !1,
                    controls: !1,
                    doLoop: !1,
                    container: t("body"),
                    shrinkable: !1
                },
                f = {},
                m = "#big-video-vid",
                g = t('<div id="big-video-wrap"></div>'),
                v = (t(""), 16 / 9),
                y = 0,
                b = .8,
                w = !1,
                x = !1,
                _ = !1,
                k = !1,
                T = !1,
                C = [],
                $ = t.extend({}, p, n);
            return f.init = function() {
                if (!w) {
                    $.container.prepend(g);
                    var n = $.forceAutoplay ? "autoplay" : "";
                    c = t('<video id="' + m.substr(1) + '" class="video-js vjs-default-skin" height="1" width="1" preload="auto" data-setup="{}" ' + n + " webkit-playsinline></video>"), c.css("position", "absolute"), g.append(c);
                    var r = ["html5", "flash"],
                        l = navigator.userAgent.toLowerCase(),
                        u = l.indexOf("firefox") != -1;
                    $.useFlashForFirefox && u && (r = ["flash", "html5"]), c = e(m.substr(1), {
                        controls: !1,
                        autoplay: !0,
                        preload: "auto",
                        techOrder: r
                    }), $.controls && o(), i(), w = !0, _ = !1, $.forceAutoplay && t("body").on("click", s), t("#big-video-vid_flash_api").attr("scale", "noborder").attr("width", "100%").attr("height", "100%"), t(window).on("resize.bigvideo", function() {
                        i()
                    }), c.on("loadedmetadata", function(e) {
                        v = document.getElementById("big-video-vid_flash_api") ? document.getElementById("big-video-vid_flash_api").vjs_getProperty("videoWidth") / document.getElementById("big-video-vid_flash_api").vjs_getProperty("videoHeight") : t("#big-video-vid_html5_api").prop("videoWidth") / t("#big-video-vid_html5_api").prop("videoHeight"), i();
                        var n = Math.round(c.duration()),
                            o = Math.floor(n / 60),
                            r = n - 60 * o;
                        r < 10 && (r = "0" + r), y = o + ":" + r
                    }), c.on("ended", function() {
                        $.doLoop && (c.currentTime(0), c.play()), k && a()
                    })
                }
            }, f.show = function(e, n) {
                if (void 0 === n && (n = {}), T = n.ambient === !0, (T || n.doLoop) && ($.doLoop = !0), "string" == typeof e) {
                    var i = e.lastIndexOf("?") > 0 ? e.substring(e.lastIndexOf(".") + 1, e.lastIndexOf("?")) : e.substring(e.lastIndexOf(".") + 1);
                    "jpg" == i || "gif" == i || "png" == i ? u(e) : "mp4" != i && "ogg" != i && "ogv" != i && "webm" != i || (l(e), n.onShown && n.onShown(), k = !1)
                }
                else if (t.isArray(e)) l(e);
                else {
                    if ("object" != typeof e || !e.src || !e.type) throw "BigVideo.show received invalid input for parameter source";
                    l([e])
                }
            }, f.showPlaylist = function(e, n) {
                if (!t.isArray(e)) throw "BigVideo.showPlaylist parameter files accepts only arrays";
                void 0 === n && (n = {}), T = n.ambient === !0, (T || n.doLoop) && ($.doLoop = !0), C = e, h = 0, this.show(C[h]), n.onShown && n.onShown(), k = !0
            }, f.getPlayer = function() {
                return c
            }, f.remove = f.dispose = function() {
                w = !1, g.remove(), t(window).off("resize.bigvideo"), c && (c.off("loadedmetadata"), c.off("ended"), c.dispose())
            }, f.triggerPlayer = function(t) {
                r(t)
            }, f
        }
    });
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
            var n, i, o, r, s = function() {
                    t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = s.prototype.setRatio
                },
                a = _gsScope._gsDefine.globals,
                l = {},
                u = s.prototype = new t("css");
            u.constructor = s, s.version = "1.15.1", s.API = 2, s.defaultTransformPerspective = 0, s.defaultSkewType = "compensated", u = "px", s.suffixMap = {
                top: u,
                right: u,
                bottom: u,
                left: u,
                width: u,
                height: u,
                fontSize: u,
                padding: u,
                margin: u,
                perspective: u,
                lineHeight: ""
            };
            var c, h, d, p, f, m, g = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                v = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                y = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                w = /(?:\d|\-|\+|=|#|\.)*/g,
                x = /opacity *= *([^)]*)/i,
                _ = /opacity:([^;]*)/i,
                k = /alpha\(opacity *=.+?\)/i,
                T = /^(rgb|hsl)/,
                C = /([A-Z])/g,
                $ = /-([a-z])/gi,
                S = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                F = function(t, e) {
                    return e.toUpperCase()
                },
                j = /(?:Left|Right|Width)/i,
                E = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                P = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                M = /,(?=[^\)]*(?:\(|$))/gi,
                A = Math.PI / 180,
                O = 180 / Math.PI,
                D = {},
                N = document,
                L = function(t) {
                    return N.createElementNS ? N.createElementNS("http://www.w3.org/1999/xhtml", t) : N.createElement(t)
                },
                R = L("div"),
                I = L("img"),
                q = s._internals = {
                    _specialProps: l
                },
                z = navigator.userAgent,
                H = function() {
                    var t = z.indexOf("Android"),
                        e = L("a");
                    return d = -1 !== z.indexOf("Safari") && -1 === z.indexOf("Chrome") && (-1 === t || Number(z.substr(t + 8, 1)) > 3), f = d && 6 > Number(z.substr(z.indexOf("Version/") + 8, 1)), p = -1 !== z.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(z) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(z)) && (m = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity))
                }(),
                V = function(t) {
                    return x.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                B = function(t) {
                    window.console && console.log(t)
                },
                W = "",
                X = "",
                U = function(t, e) {
                    e = e || R;
                    var n, i, o = e.style;
                    if (void 0 !== o[t]) return t;
                    for (t = t.charAt(0).toUpperCase() + t.substr(1), n = ["O", "Moz", "ms", "Ms", "Webkit"], i = 5; --i > -1 && void 0 === o[n[i] + t];);
                    return i >= 0 ? (X = 3 === i ? "ms" : n[i], W = "-" + X.toLowerCase() + "-", X + t) : null
                },
                Y = N.defaultView ? N.defaultView.getComputedStyle : function() {},
                Q = s.getStyle = function(t, e, n, i, o) {
                    var r;
                    return H || "opacity" !== e ? (!i && t.style[e] ? r = t.style[e] : (n = n || Y(t)) ? r = n[e] || n.getPropertyValue(e) || n.getPropertyValue(e.replace(C, "-$1").toLowerCase()) : t.currentStyle && (r = t.currentStyle[e]), null == o || r && "none" !== r && "auto" !== r && "auto auto" !== r ? r : o) : V(t)
                },
                J = q.convertToPixels = function(t, n, i, o, r) {
                    if ("px" === o || !o) return i;
                    if ("auto" === o || !i) return 0;
                    var a, l, u, c = j.test(n),
                        h = t,
                        d = R.style,
                        p = 0 > i;
                    if (p && (i = -i), "%" === o && -1 !== n.indexOf("border")) a = i / 100 * (c ? t.clientWidth : t.clientHeight);
                    else {
                        if (d.cssText = "border:0 solid red;position:" + Q(t, "position") + ";line-height:0;", "%" !== o && h.appendChild) d[c ? "borderLeftWidth" : "borderTopWidth"] = i + o;
                        else {
                            if (h = t.parentNode || N.body, l = h._gsCache, u = e.ticker.frame, l && c && l.time === u) return l.width * i / 100;
                            d[c ? "width" : "height"] = i + o
                        }
                        h.appendChild(R), a = parseFloat(R[c ? "offsetWidth" : "offsetHeight"]), h.removeChild(R), c && "%" === o && s.cacheWidths !== !1 && (l = h._gsCache = h._gsCache || {}, l.time = u, l.width = 100 * (a / i)), 0 !== a || r || (a = J(t, n, i, o, !0))
                    }
                    return p ? -a : a
                },
                G = q.calculateOffset = function(t, e, n) {
                    if ("absolute" !== Q(t, "position", n)) return 0;
                    var i = "left" === e ? "Left" : "Top",
                        o = Q(t, "margin" + i, n);
                    return t["offset" + i] - (J(t, e, parseFloat(o), o.replace(w, "")) || 0)
                },
                K = function(t, e) {
                    var n, i, o = {};
                    if (e = e || Y(t, null))
                        for (n in e)(-1 === n.indexOf("Transform") || _t === n) && (o[n] = e[n]);
                    else if (e = t.currentStyle || t.style)
                        for (n in e) "string" == typeof n && void 0 === o[n] && (o[n.replace($, F)] = e[n]);
                    return H || (o.opacity = V(t)), i = Mt(t, e, !1), o.rotation = i.rotation, o.skewX = i.skewX, o.scaleX = i.scaleX, o.scaleY = i.scaleY, o.x = i.x, o.y = i.y, Ct && (o.z = i.z, o.rotationX = i.rotationX, o.rotationY = i.rotationY, o.scaleZ = i.scaleZ), o.filters && delete o.filters, o
                },
                Z = function(t, e, n, i, o) {
                    var r, s, a, l = {},
                        u = t.style;
                    for (s in n) "cssText" !== s && "length" !== s && isNaN(s) && (e[s] !== (r = n[s]) || o && o[s]) && -1 === s.indexOf("Origin") && ("number" == typeof r || "string" == typeof r) && (l[s] = "auto" !== r || "left" !== s && "top" !== s ? "" !== r && "auto" !== r && "none" !== r || "string" != typeof e[s] || "" === e[s].replace(b, "") ? r : 0 : G(t, s), void 0 !== u[s] && (a = new pt(u, s, u[s], a)));
                    if (i)
                        for (s in i) "className" !== s && (l[s] = i[s]);
                    return {
                        difs: l,
                        firstMPT: a
                    }
                },
                tt = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                et = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                nt = function(t, e, n) {
                    var i = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                        o = tt[e],
                        r = o.length;
                    for (n = n || Y(t, null); --r > -1;) i -= parseFloat(Q(t, "padding" + o[r], n, !0)) || 0, i -= parseFloat(Q(t, "border" + o[r] + "Width", n, !0)) || 0;
                    return i
                },
                it = function(t, e) {
                    (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                    var n = t.split(" "),
                        i = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : n[0],
                        o = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : n[1];
                    return null == o ? o = "center" === i ? "50%" : "0" : "center" === o && (o = "50%"), ("center" === i || isNaN(parseFloat(i)) && -1 === (i + "").indexOf("=")) && (i = "50%"), e && (e.oxp = -1 !== i.indexOf("%"), e.oyp = -1 !== o.indexOf("%"), e.oxr = "=" === i.charAt(1), e.oyr = "=" === o.charAt(1), e.ox = parseFloat(i.replace(b, "")), e.oy = parseFloat(o.replace(b, ""))), i + " " + o + (n.length > 2 ? " " + n[2] : "")
                },
                ot = function(t, e) {
                    return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                },
                rt = function(t, e) {
                    return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
                },
                st = function(t, e, n, i) {
                    var o, r, s, a, l, u = 1e-6;
                    return null == t ? a = e : "number" == typeof t ? a = t : (o = 360, r = t.split("_"), l = "=" === t.charAt(1), s = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(r[0].substr(2)) : parseFloat(r[0])) * (-1 === t.indexOf("rad") ? 1 : O) - (l ? 0 : e), r.length && (i && (i[n] = e + s), -1 !== t.indexOf("short") && (s %= o, s !== s % (o / 2) && (s = 0 > s ? s + o : s - o)), -1 !== t.indexOf("_cw") && 0 > s ? s = (s + 9999999999 * o) % o - (0 | s / o) * o : -1 !== t.indexOf("ccw") && s > 0 && (s = (s - 9999999999 * o) % o - (0 | s / o) * o)), a = e + s), u > a && a > -u && (a = 0), a
                },
                at = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                lt = function(t, e, n) {
                    return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (n - e) * t : .5 > t ? n : 2 > 3 * t ? e + 6 * (n - e) * (2 / 3 - t) : e) + .5
                },
                ut = s.parseColor = function(t) {
                    var e, n, i, o, r, s;
                    return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), at[t] ? at[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), n = t.charAt(2), i = t.charAt(3), t = "#" + e + e + n + n + i + i), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(g), o = Number(t[0]) % 360 / 360, r = Number(t[1]) / 100, s = Number(t[2]) / 100, n = .5 >= s ? s * (r + 1) : s + r - s * r, e = 2 * s - n, t.length > 3 && (t[3] = Number(t[3])), t[0] = lt(o + 1 / 3, e, n), t[1] = lt(o, e, n), t[2] = lt(o - 1 / 3, e, n), t) : (t = t.match(g) || at.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : at.black
                },
                ct = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
            for (u in at) ct += "|" + u + "\\b";
            ct = RegExp(ct + ")", "gi");
            var ht = function(t, e, n, i) {
                    if (null == t) return function(t) {
                        return t
                    };
                    var o, r = e ? (t.match(ct) || [""])[0] : "",
                        s = t.split(r).join("").match(y) || [],
                        a = t.substr(0, t.indexOf(s[0])),
                        l = ")" === t.charAt(t.length - 1) ? ")" : "",
                        u = -1 !== t.indexOf(" ") ? " " : ",",
                        c = s.length,
                        h = c > 0 ? s[0].replace(g, "") : "";
                    return c ? o = e ? function(t) {
                        var e, d, p, f;
                        if ("number" == typeof t) t += h;
                        else if (i && M.test(t)) {
                            for (f = t.replace(M, "|").split("|"), p = 0; f.length > p; p++) f[p] = o(f[p]);
                            return f.join(",")
                        }
                        if (e = (t.match(ct) || [r])[0], d = t.split(e).join("").match(y) || [], p = d.length, c > p--)
                            for (; c > ++p;) d[p] = n ? d[0 | (p - 1) / 2] : s[p];
                        return a + d.join(u) + u + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                    } : function(t) {
                        var e, r, d;
                        if ("number" == typeof t) t += h;
                        else if (i && M.test(t)) {
                            for (r = t.replace(M, "|").split("|"), d = 0; r.length > d; d++) r[d] = o(r[d]);
                            return r.join(",")
                        }
                        if (e = t.match(y) || [], d = e.length, c > d--)
                            for (; c > ++d;) e[d] = n ? e[0 | (d - 1) / 2] : s[d];
                        return a + e.join(u) + l
                    } : function(t) {
                        return t
                    }
                },
                dt = function(t) {
                    return t = t.split(","),
                        function(e, n, i, o, r, s, a) {
                            var l, u = (n + "").split(" ");
                            for (a = {}, l = 0; 4 > l; l++) a[t[l]] = u[l] = u[l] || u[(l - 1) / 2 >> 0];
                            return o.parse(e, a, r, s)
                        }
                },
                pt = (q._setPluginRatio = function(t) {
                    this.plugin.setRatio(t);
                    for (var e, n, i, o, r = this.data, s = r.proxy, a = r.firstMPT, l = 1e-6; a;) e = s[a.v], a.r ? e = Math.round(e) : l > e && e > -l && (e = 0), a.t[a.p] = e, a = a._next;
                    if (r.autoRotate && (r.autoRotate.rotation = s.rotation), 1 === t)
                        for (a = r.firstMPT; a;) {
                            if (n = a.t, n.type) {
                                if (1 === n.type) {
                                    for (o = n.xs0 + n.s + n.xs1, i = 1; n.l > i; i++) o += n["xn" + i] + n["xs" + (i + 1)];
                                    n.e = o
                                }
                            }
                            else n.e = n.s + n.xs0;
                            a = a._next
                        }
                }, function(t, e, n, i, o) {
                    this.t = t, this.p = e, this.v = n, this.r = o, i && (i._prev = this, this._next = i)
                }),
                ft = (q._parseToProxy = function(t, e, n, i, o, r) {
                    var s, a, l, u, c, h = i,
                        d = {},
                        p = {},
                        f = n._transform,
                        m = D;
                    for (n._transform = null, D = e, i = c = n.parse(t, e, i, o), D = m, r && (n._transform = f, h && (h._prev = null, h._prev && (h._prev._next = null))); i && i !== h;) {
                        if (1 >= i.type && (a = i.p, p[a] = i.s + i.c, d[a] = i.s, r || (u = new pt(i, "s", a, u, i.r), i.c = 0), 1 === i.type))
                            for (s = i.l; --s > 0;) l = "xn" + s, a = i.p + "_" + l, p[a] = i.data[l], d[a] = i[l], r || (u = new pt(i, l, a, u, i.rxp[l]));
                        i = i._next
                    }
                    return {
                        proxy: d,
                        end: p,
                        firstMPT: u,
                        pt: c
                    }
                }, q.CSSPropTween = function(t, e, i, o, s, a, l, u, c, h, d) {
                    this.t = t, this.p = e, this.s = i, this.c = o, this.n = l || e, t instanceof ft || r.push(this.n), this.r = u, this.type = a || 0, c && (this.pr = c, n = !0), this.b = void 0 === h ? i : h, this.e = void 0 === d ? i + o : d, s && (this._next = s, s._prev = this)
                }),
                mt = s.parseComplex = function(t, e, n, i, o, r, s, a, l, u) {
                    n = n || r || "", s = new ft(t, e, 0, 0, s, u ? 2 : 1, null, (!1), a, n, i), i += "";
                    var h, d, p, f, m, y, b, w, x, _, k, C, $ = n.split(", ").join(",").split(" "),
                        S = i.split(", ").join(",").split(" "),
                        F = $.length,
                        j = c !== !1;
                    for ((-1 !== i.indexOf(",") || -1 !== n.indexOf(",")) && ($ = $.join(" ").replace(M, ", ").split(" "), S = S.join(" ").replace(M, ", ").split(" "), F = $.length), F !== S.length && ($ = (r || "").split(" "), F = $.length), s.plugin = l, s.setRatio = u, h = 0; F > h; h++)
                        if (f = $[h], m = S[h], w = parseFloat(f), w || 0 === w) s.appendXtra("", w, ot(m, w), m.replace(v, ""), j && -1 !== m.indexOf("px"), !0);
                        else if (o && ("#" === f.charAt(0) || at[f] || T.test(f))) C = "," === m.charAt(m.length - 1) ? ")," : ")", f = ut(f), m = ut(m), x = f.length + m.length > 6, x && !H && 0 === m[3] ? (s["xs" + s.l] += s.l ? " transparent" : "transparent", s.e = s.e.split(S[h]).join("transparent")) : (H || (x = !1), s.appendXtra(x ? "rgba(" : "rgb(", f[0], m[0] - f[0], ",", !0, !0).appendXtra("", f[1], m[1] - f[1], ",", !0).appendXtra("", f[2], m[2] - f[2], x ? "," : C, !0), x && (f = 4 > f.length ? 1 : f[3], s.appendXtra("", f, (4 > m.length ? 1 : m[3]) - f, C, !1)));
                    else if (y = f.match(g)) {
                        if (b = m.match(v), !b || b.length !== y.length) return s;
                        for (p = 0, d = 0; y.length > d; d++) k = y[d], _ = f.indexOf(k, p), s.appendXtra(f.substr(p, _ - p), Number(k), ot(b[d], k), "", j && "px" === f.substr(_ + k.length, 2), 0 === d), p = _ + k.length;
                        s["xs" + s.l] += f.substr(p)
                    }
                    else s["xs" + s.l] += s.l ? " " + f : f;
                    if (-1 !== i.indexOf("=") && s.data) {
                        for (C = s.xs0 + s.data.s, h = 1; s.l > h; h++) C += s["xs" + h] + s.data["xn" + h];
                        s.e = C + s["xs" + h]
                    }
                    return s.l || (s.type = -1, s.xs0 = s.e), s.xfirst || s
                },
                gt = 9;
            for (u = ft.prototype, u.l = u.pr = 0; --gt > 0;) u["xn" + gt] = 0, u["xs" + gt] = "";
            u.xs0 = "", u._next = u._prev = u.xfirst = u.data = u.plugin = u.setRatio = u.rxp = null, u.appendXtra = function(t, e, n, i, o, r) {
                var s = this,
                    a = s.l;
                return s["xs" + a] += r && a ? " " + t : t || "", n || 0 === a || s.plugin ? (s.l++, s.type = s.setRatio ? 2 : 1, s["xs" + s.l] = i || "", a > 0 ? (s.data["xn" + a] = e + n, s.rxp["xn" + a] = o, s["xn" + a] = e, s.plugin || (s.xfirst = new ft(s, "xn" + a, e, n, s.xfirst || s, 0, s.n, o, s.pr), s.xfirst.xs0 = 0), s) : (s.data = {
                    s: e + n
                }, s.rxp = {}, s.s = e, s.c = n, s.r = o, s)) : (s["xs" + a] += e + (i || ""), s)
            };
            var vt = function(t, e) {
                    e = e || {}, this.p = e.prefix ? U(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || ht(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                },
                yt = q._registerComplexSpecialProp = function(t, e, n) {
                    "object" != typeof e && (e = {
                        parser: n
                    });
                    var i, o, r = t.split(","),
                        s = e.defaultValue;
                    for (n = n || [s], i = 0; r.length > i; i++) e.prefix = 0 === i && e.prefix, e.defaultValue = n[i] || s, o = new vt(r[i], e)
                },
                bt = function(t) {
                    if (!l[t]) {
                        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                        yt(t, {
                            parser: function(t, n, i, o, r, s, u) {
                                var c = a.com.greensock.plugins[e];
                                return c ? (c._cssRegister(), l[i].parse(t, n, i, o, r, s, u)) : (B("Error: " + e + " js file not loaded."), r)
                            }
                        })
                    }
                };
            u = vt.prototype, u.parseComplex = function(t, e, n, i, o, r) {
                var s, a, l, u, c, h, d = this.keyword;
                if (this.multi && (M.test(n) || M.test(e) ? (a = e.replace(M, "|").split("|"), l = n.replace(M, "|").split("|")) : d && (a = [e], l = [n])), l) {
                    for (u = l.length > a.length ? l.length : a.length, s = 0; u > s; s++) e = a[s] = a[s] || this.dflt, n = l[s] = l[s] || this.dflt, d && (c = e.indexOf(d), h = n.indexOf(d), c !== h && (n = -1 === h ? l : a, n[s] += " " + d));
                    e = a.join(", "), n = l.join(", ")
                }
                return mt(t, this.p, e, n, this.clrs, this.dflt, i, this.pr, o, r)
            }, u.parse = function(t, e, n, i, r, s) {
                return this.parseComplex(t.style, this.format(Q(t, this.p, o, !1, this.dflt)), this.format(e), r, s)
            }, s.registerSpecialProp = function(t, e, n) {
                yt(t, {
                    parser: function(t, i, o, r, s, a) {
                        var l = new ft(t, o, 0, 0, s, 2, o, (!1), n);
                        return l.plugin = a, l.setRatio = e(t, i, r._tween, o), l
                    },
                    priority: n
                })
            };
            var wt, xt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                _t = U("transform"),
                kt = W + "transform",
                Tt = U("transformOrigin"),
                Ct = null !== U("perspective"),
                $t = q.Transform = function() {
                    this.perspective = parseFloat(s.defaultTransformPerspective) || 0, this.force3D = !(s.defaultForce3D === !1 || !Ct) && (s.defaultForce3D || "auto")
                },
                St = window.SVGElement,
                Ft = function(t, e, n) {
                    var i, o = N.createElementNS("http://www.w3.org/2000/svg", t),
                        r = /([a-z])([A-Z])/g;
                    for (i in n) o.setAttributeNS(null, i.replace(r, "$1-$2").toLowerCase(), n[i]);
                    return e.appendChild(o), o
                },
                jt = document.documentElement,
                Et = function() {
                    var t, e, n, i = m || /Android/i.test(z) && !window.chrome;
                    return N.createElementNS && !i && (t = Ft("svg", jt), e = Ft("rect", t, {
                        width: 100,
                        height: 50,
                        x: 100
                    }), n = e.getBoundingClientRect().width, e.style[Tt] = "50% 50%", e.style[_t] = "scaleX(0.5)", i = n === e.getBoundingClientRect().width && !(p && Ct), jt.removeChild(t)), i
                }(),
                Pt = function(t, e, n) {
                    var i = t.getBBox();
                    e = it(e).split(" "), n.xOrigin = (-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * i.width : parseFloat(e[0])) + i.x, n.yOrigin = (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * i.height : parseFloat(e[1])) + i.y
                },
                Mt = q.getTransform = function(t, e, n, i) {
                    if (t._gsTransform && n && !i) return t._gsTransform;
                    var r, a, l, u, c, h, d, p, f, m, g = n ? t._gsTransform || new $t : new $t,
                        v = 0 > g.scaleX,
                        y = 2e-5,
                        b = 1e5,
                        w = Ct ? parseFloat(Q(t, Tt, e, !1, "0 0 0").split(" ")[2]) || g.zOrigin || 0 : 0,
                        x = parseFloat(s.defaultTransformPerspective) || 0;
                    if (_t ? a = Q(t, kt, e, !0) : t.currentStyle && (a = t.currentStyle.filter.match(E), a = a && 4 === a.length ? [a[0].substr(4), Number(a[2].substr(4)), Number(a[1].substr(4)), a[3].substr(4), g.x || 0, g.y || 0].join(",") : ""), r = !a || "none" === a || "matrix(1, 0, 0, 1, 0, 0)" === a, g.svg = !!(St && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM)), g.svg && (Pt(t, Q(t, Tt, o, !1, "50% 50%") + "", g), wt = s.useSVGTransformAttr || Et, l = t.getAttribute("transform"), r && l && -1 !== l.indexOf("matrix") && (a = l, r = 0)), !r) {
                        for (l = (a || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], u = l.length; --u > -1;) c = Number(l[u]), l[u] = (h = c - (c |= 0)) ? (0 | h * b + (0 > h ? -.5 : .5)) / b + c : c;
                        if (16 === l.length) {
                            var _, k, T, C, $, S = l[0],
                                F = l[1],
                                j = l[2],
                                P = l[3],
                                M = l[4],
                                A = l[5],
                                D = l[6],
                                N = l[7],
                                L = l[8],
                                R = l[9],
                                I = l[10],
                                q = l[12],
                                z = l[13],
                                H = l[14],
                                V = l[11],
                                B = Math.atan2(D, I);
                            g.zOrigin && (H = -g.zOrigin, q = L * H - l[12], z = R * H - l[13], H = I * H + g.zOrigin - l[14]), g.rotationX = B * O, B && (C = Math.cos(-B), $ = Math.sin(-B), _ = M * C + L * $, k = A * C + R * $, T = D * C + I * $, L = M * -$ + L * C, R = A * -$ + R * C, I = D * -$ + I * C, V = N * -$ + V * C, M = _, A = k, D = T), B = Math.atan2(L, I), g.rotationY = B * O, B && (C = Math.cos(-B), $ = Math.sin(-B), _ = S * C - L * $, k = F * C - R * $, T = j * C - I * $, R = F * $ + R * C, I = j * $ + I * C, V = P * $ + V * C, S = _, F = k, j = T), B = Math.atan2(F, S), g.rotation = B * O, B && (C = Math.cos(-B), $ = Math.sin(-B), S = S * C + M * $, k = F * C + A * $, A = F * -$ + A * C, D = j * -$ + D * C, F = k), g.rotationX && Math.abs(g.rotationX) + Math.abs(g.rotation) > 359.9 && (g.rotationX = g.rotation = 0, g.rotationY += 180), g.scaleX = (0 | Math.sqrt(S * S + F * F) * b + .5) / b, g.scaleY = (0 | Math.sqrt(A * A + R * R) * b + .5) / b, g.scaleZ = (0 | Math.sqrt(D * D + I * I) * b + .5) / b, g.skewX = 0, g.perspective = V ? 1 / (0 > V ? -V : V) : 0, g.x = q, g.y = z, g.z = H
                        }
                        else if (!(Ct && !i && l.length && g.x === l[4] && g.y === l[5] && (g.rotationX || g.rotationY) || void 0 !== g.x && "none" === Q(t, "display", e))) {
                            var W = l.length >= 6,
                                X = W ? l[0] : 1,
                                U = l[1] || 0,
                                Y = l[2] || 0,
                                J = W ? l[3] : 1;
                            g.x = l[4] || 0, g.y = l[5] || 0, d = Math.sqrt(X * X + U * U), p = Math.sqrt(J * J + Y * Y), f = X || U ? Math.atan2(U, X) * O : g.rotation || 0, m = Y || J ? Math.atan2(Y, J) * O + f : g.skewX || 0, Math.abs(m) > 90 && 270 > Math.abs(m) && (v ? (d *= -1, m += 0 >= f ? 180 : -180, f += 0 >= f ? 180 : -180) : (p *= -1, m += 0 >= m ? 180 : -180)), g.scaleX = d, g.scaleY = p, g.rotation = f, g.skewX = m, Ct && (g.rotationX = g.rotationY = g.z = 0, g.perspective = x, g.scaleZ = 1)
                        }
                        g.zOrigin = w;
                        for (u in g) y > g[u] && g[u] > -y && (g[u] = 0)
                    }
                    return n && (t._gsTransform = g), g
                },
                At = function(t) {
                    var e, n, i = this.data,
                        o = -i.rotation * A,
                        r = o + i.skewX * A,
                        s = 1e5,
                        a = (0 | Math.cos(o) * i.scaleX * s) / s,
                        l = (0 | Math.sin(o) * i.scaleX * s) / s,
                        u = (0 | Math.sin(r) * -i.scaleY * s) / s,
                        c = (0 | Math.cos(r) * i.scaleY * s) / s,
                        h = this.t.style,
                        d = this.t.currentStyle;
                    if (d) {
                        n = l, l = -u, u = -n, e = d.filter, h.filter = "";
                        var p, f, g = this.t.offsetWidth,
                            v = this.t.offsetHeight,
                            y = "absolute" !== d.position,
                            b = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + u + ", M22=" + c,
                            _ = i.x + g * i.xPercent / 100,
                            k = i.y + v * i.yPercent / 100;
                        if (null != i.ox && (p = (i.oxp ? .01 * g * i.ox : i.ox) - g / 2, f = (i.oyp ? .01 * v * i.oy : i.oy) - v / 2, _ += p - (p * a + f * l), k += f - (p * u + f * c)), y ? (p = g / 2, f = v / 2, b += ", Dx=" + (p - (p * a + f * l) + _) + ", Dy=" + (f - (p * u + f * c) + k) + ")") : b += ", sizingMethod='auto expand')", h.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(P, b) : b + " " + e, (0 === t || 1 === t) && 1 === a && 0 === l && 0 === u && 1 === c && (y && -1 === b.indexOf("Dx=0, Dy=0") || x.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && h.removeAttribute("filter")), !y) {
                            var T, C, $, S = 8 > m ? 1 : -1;
                            for (p = i.ieOffsetX || 0, f = i.ieOffsetY || 0, i.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > l ? -l : l) * v)) / 2 + _), i.ieOffsetY = Math.round((v - ((0 > c ? -c : c) * v + (0 > u ? -u : u) * g)) / 2 + k), gt = 0; 4 > gt; gt++) C = et[gt], T = d[C], n = -1 !== T.indexOf("px") ? parseFloat(T) : J(this.t, C, parseFloat(T), T.replace(w, "")) || 0, $ = n !== i[C] ? 2 > gt ? -i.ieOffsetX : -i.ieOffsetY : 2 > gt ? p - i.ieOffsetX : f - i.ieOffsetY, h[C] = (i[C] = Math.round(n - $ * (0 === gt || 2 === gt ? 1 : S))) + "px"
                        }
                    }
                },
                Ot = q.set3DTransformRatio = function(t) {
                    var e, n, i, o, r, s, a, l, u, c, h, d, f, m, g, v, y, b, w, x, _, k = this.data,
                        T = this.t.style,
                        C = k.rotation * A,
                        $ = k.scaleX,
                        S = k.scaleY,
                        F = k.scaleZ,
                        j = k.x,
                        E = k.y,
                        P = k.z,
                        M = k.perspective;
                    if (!(1 !== t && 0 !== t && k.force3D || k.force3D === !0 || k.rotationY || k.rotationX || 1 !== F || M || P)) return void Dt.call(this, t);
                    if (p && (m = 1e-4, m > $ && $ > -m && ($ = F = 2e-5), m > S && S > -m && (S = F = 2e-5), !M || k.z || k.rotationX || k.rotationY || (M = 0)), C || k.skewX) g = e = Math.cos(C), v = o = Math.sin(C), k.skewX && (C -= k.skewX * A, g = Math.cos(C), v = Math.sin(C), "simple" === k.skewType && (y = Math.tan(k.skewX * A), y = Math.sqrt(1 + y * y), g *= y, v *= y)), n = -v, r = g;
                    else {
                        if (!(k.rotationY || k.rotationX || 1 !== F || M || k.svg)) return void(T[_t] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) translate3d(" : "translate3d(") + j + "px," + E + "px," + P + "px)" + (1 !== $ || 1 !== S ? " scale(" + $ + "," + S + ")" : ""));
                        e = r = 1, n = o = 0
                    }
                    u = 1, i = s = a = l = c = h = 0, d = M ? -1 / M : 0, f = k.zOrigin, m = 1e-6, x = ",", _ = "0", C = k.rotationY * A, C && (g = Math.cos(C), v = Math.sin(C), a = -v, c = d * -v, i = e * v, s = o * v, u = g, d *= g, e *= g, o *= g), C = k.rotationX * A, C && (g = Math.cos(C), v = Math.sin(C), y = n * g + i * v, b = r * g + s * v, l = u * v, h = d * v, i = n * -v + i * g, s = r * -v + s * g, u *= g, d *= g, n = y, r = b), 1 !== F && (i *= F, s *= F, u *= F, d *= F), 1 !== S && (n *= S, r *= S, l *= S, h *= S), 1 !== $ && (e *= $, o *= $, a *= $, c *= $), (f || k.svg) && (f && (j += i * -f, E += s * -f, P += u * -f + f), k.svg && (j += k.xOrigin - (k.xOrigin * e + k.yOrigin * n), E += k.yOrigin - (k.xOrigin * o + k.yOrigin * r)), m > j && j > -m && (j = _), m > E && E > -m && (E = _), m > P && P > -m && (P = 0)), w = k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix3d(" : "matrix3d(", w += (m > e && e > -m ? _ : e) + x + (m > o && o > -m ? _ : o) + x + (m > a && a > -m ? _ : a), w += x + (m > c && c > -m ? _ : c) + x + (m > n && n > -m ? _ : n) + x + (m > r && r > -m ? _ : r), k.rotationX || k.rotationY ? (w += x + (m > l && l > -m ? _ : l) + x + (m > h && h > -m ? _ : h) + x + (m > i && i > -m ? _ : i), w += x + (m > s && s > -m ? _ : s) + x + (m > u && u > -m ? _ : u) + x + (m > d && d > -m ? _ : d) + x) : w += ",0,0,0,0,1,0,", w += j + x + E + x + P + x + (M ? 1 + -P / M : 1) + ")", T[_t] = w
                },
                Dt = q.set2DTransformRatio = function(t) {
                    var e, n, i, o, r, s, a, l, u, c, h, d = this.data,
                        p = this.t,
                        f = p.style,
                        m = d.x,
                        g = d.y;
                    return !(d.rotationX || d.rotationY || d.z || d.force3D === !0 || "auto" === d.force3D && 1 !== t && 0 !== t) || d.svg && wt || !Ct ? (o = d.scaleX, r = d.scaleY, void(d.rotation || d.skewX || d.svg ? (e = d.rotation * A, n = e - d.skewX * A, i = 1e5, s = Math.cos(e) * o, a = Math.sin(e) * o, l = Math.sin(n) * -r, u = Math.cos(n) * r, d.svg && (m += d.xOrigin - (d.xOrigin * s + d.yOrigin * l), g += d.yOrigin - (d.xOrigin * a + d.yOrigin * u), h = 1e-6, h > m && m > -h && (m = 0), h > g && g > -h && (g = 0)), c = (0 | s * i) / i + "," + (0 | a * i) / i + "," + (0 | l * i) / i + "," + (0 | u * i) / i + "," + m + "," + g + ")", d.svg && wt ? p.setAttribute("transform", "matrix(" + c) : f[_t] = (d.xPercent || d.yPercent ? "translate(" + d.xPercent + "%," + d.yPercent + "%) matrix(" : "matrix(") + c) : f[_t] = (d.xPercent || d.yPercent ? "translate(" + d.xPercent + "%," + d.yPercent + "%) matrix(" : "matrix(") + o + ",0,0," + r + "," + m + "," + g + ")")) : (this.setRatio = Ot, void Ot.call(this, t))
                };
            u = $t.prototype, u.x = u.y = u.z = u.skewX = u.skewY = u.rotation = u.rotationX = u.rotationY = u.zOrigin = u.xPercent = u.yPercent = 0, u.scaleX = u.scaleY = u.scaleZ = 1, yt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
                parser: function(t, e, n, i, r, a, l) {
                    if (i._lastParsedTransform === l) return r;
                    i._lastParsedTransform = l;
                    var u, c, h, d, p, f, m, g = i._transform = Mt(t, o, !0, l.parseTransform),
                        v = t.style,
                        y = 1e-6,
                        b = xt.length,
                        w = l,
                        x = {};
                    if ("string" == typeof w.transform && _t) h = R.style, h[_t] = w.transform, h.display = "block", h.position = "absolute", N.body.appendChild(R), u = Mt(R, null, !1), N.body.removeChild(R);
                    else if ("object" == typeof w) {
                        if (u = {
                                scaleX: rt(null != w.scaleX ? w.scaleX : w.scale, g.scaleX),
                                scaleY: rt(null != w.scaleY ? w.scaleY : w.scale, g.scaleY),
                                scaleZ: rt(w.scaleZ, g.scaleZ),
                                x: rt(w.x, g.x),
                                y: rt(w.y, g.y),
                                z: rt(w.z, g.z),
                                xPercent: rt(w.xPercent, g.xPercent),
                                yPercent: rt(w.yPercent, g.yPercent),
                                perspective: rt(w.transformPerspective, g.perspective)
                            }, m = w.directionalRotation, null != m)
                            if ("object" == typeof m)
                                for (h in m) w[h] = m[h];
                            else w.rotation = m;
                            "string" == typeof w.x && -1 !== w.x.indexOf("%") && (u.x = 0, u.xPercent = rt(w.x, g.xPercent)), "string" == typeof w.y && -1 !== w.y.indexOf("%") && (u.y = 0, u.yPercent = rt(w.y, g.yPercent)), u.rotation = st("rotation" in w ? w.rotation : "shortRotation" in w ? w.shortRotation + "_short" : "rotationZ" in w ? w.rotationZ : g.rotation, g.rotation, "rotation", x), Ct && (u.rotationX = st("rotationX" in w ? w.rotationX : "shortRotationX" in w ? w.shortRotationX + "_short" : g.rotationX || 0, g.rotationX, "rotationX", x), u.rotationY = st("rotationY" in w ? w.rotationY : "shortRotationY" in w ? w.shortRotationY + "_short" : g.rotationY || 0, g.rotationY, "rotationY", x)), u.skewX = null == w.skewX ? g.skewX : st(w.skewX, g.skewX), u.skewY = null == w.skewY ? g.skewY : st(w.skewY, g.skewY), (c = u.skewY - g.skewY) && (u.skewX += c, u.rotation += c)
                    }
                    for (Ct && null != w.force3D && (g.force3D = w.force3D, f = !0), g.skewType = w.skewType || g.skewType || s.defaultSkewType, p = g.force3D || g.z || g.rotationX || g.rotationY || u.z || u.rotationX || u.rotationY || u.perspective, p || null == w.scale || (u.scaleZ = 1); --b > -1;) n = xt[b], d = u[n] - g[n], (d > y || -y > d || null != w[n] || null != D[n]) && (f = !0, r = new ft(g, n, g[n], d, r), n in x && (r.e = x[n]), r.xs0 = 0, r.plugin = a, i._overwriteProps.push(r.n));
                    return d = w.transformOrigin, d && g.svg && (Pt(t, it(d), u), r = new ft(g, "xOrigin", g.xOrigin, u.xOrigin - g.xOrigin, r, (-1), "transformOrigin"), r.b = g.xOrigin, r.e = r.xs0 = u.xOrigin, r = new ft(g, "yOrigin", g.yOrigin, u.yOrigin - g.yOrigin, r, (-1), "transformOrigin"), r.b = g.yOrigin, r.e = r.xs0 = u.yOrigin, d = "0px 0px"), (d || Ct && p && g.zOrigin) && (_t ? (f = !0, n = Tt, d = (d || Q(t, n, o, !1, "50% 50%")) + "", r = new ft(v, n, 0, 0, r, (-1), "transformOrigin"), r.b = v[n], r.plugin = a, Ct ? (h = g.zOrigin, d = d.split(" "), g.zOrigin = (d.length > 2 && (0 === h || "0px" !== d[2]) ? parseFloat(d[2]) : h) || 0, r.xs0 = r.e = d[0] + " " + (d[1] || "50%") + " 0px", r = new ft(g, "zOrigin", 0, 0, r, (-1), r.n), r.b = h, r.xs0 = r.e = g.zOrigin) : r.xs0 = r.e = d) : it(d + "", g)), f && (i._transformType = g.svg && wt || !p && 3 !== this._transformType ? 2 : 3), r
                },
                prefix: !0
            }), yt("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), yt("borderRadius", {
                defaultValue: "0px",
                parser: function(t, e, n, r, s) {
                    e = this.format(e);
                    var a, l, u, c, h, d, p, f, m, g, v, y, b, w, x, _, k = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        T = t.style;
                    for (m = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), a = e.split(" "), l = 0; k.length > l; l++) this.p.indexOf("border") && (k[l] = U(k[l])), h = c = Q(t, k[l], o, !1, "0px"), -1 !== h.indexOf(" ") && (c = h.split(" "), h = c[0], c = c[1]), d = u = a[l], p = parseFloat(h), y = h.substr((p + "").length), b = "=" === d.charAt(1), b ? (f = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), f *= parseFloat(d), v = d.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(d), v = d.substr((f + "").length)), "" === v && (v = i[n] || y), v !== y && (w = J(t, "borderLeft", p, y), x = J(t, "borderTop", p, y), "%" === v ? (h = 100 * (w / m) + "%", c = 100 * (x / g) + "%") : "em" === v ? (_ = J(t, "borderLeft", 1, "em"), h = w / _ + "em", c = x / _ + "em") : (h = w + "px", c = x + "px"), b && (d = parseFloat(h) + f + v, u = parseFloat(c) + f + v)), s = mt(T, k[l], h + " " + c, d + " " + u, !1, "0px", s);
                    return s
                },
                prefix: !0,
                formatter: ht("0px 0px 0px 0px", !1, !0)
            }), yt("backgroundPosition", {
                defaultValue: "0 0",
                parser: function(t, e, n, i, r, s) {
                    var a, l, u, c, h, d, p = "background-position",
                        f = o || Y(t, null),
                        g = this.format((f ? m ? f.getPropertyValue(p + "-x") + " " + f.getPropertyValue(p + "-y") : f.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                        v = this.format(e);
                    if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && (d = Q(t, "backgroundImage").replace(S, ""), d && "none" !== d)) {
                        for (a = g.split(" "), l = v.split(" "), I.setAttribute("src", d), u = 2; --u > -1;) g = a[u], c = -1 !== g.indexOf("%"), c !== (-1 !== l[u].indexOf("%")) && (h = 0 === u ? t.offsetWidth - I.width : t.offsetHeight - I.height, a[u] = c ? parseFloat(g) / 100 * h + "px" : 100 * (parseFloat(g) / h) + "%");
                        g = a.join(" ")
                    }
                    return this.parseComplex(t.style, g, v, r, s)
                },
                formatter: it
            }), yt("backgroundSize", {
                defaultValue: "0 0",
                formatter: it
            }), yt("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), yt("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), yt("transformStyle", {
                prefix: !0
            }), yt("backfaceVisibility", {
                prefix: !0
            }), yt("userSelect", {
                prefix: !0
            }), yt("margin", {
                parser: dt("marginTop,marginRight,marginBottom,marginLeft")
            }), yt("padding", {
                parser: dt("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), yt("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function(t, e, n, i, r, s) {
                    var a, l, u;
                    return 9 > m ? (l = t.currentStyle, u = 8 > m ? " " : ",", a = "rect(" + l.clipTop + u + l.clipRight + u + l.clipBottom + u + l.clipLeft + ")", e = this.format(e).split(",").join(u)) : (a = this.format(Q(t, this.p, o, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, r, s)
                }
            }), yt("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), yt("autoRound,strictUnits", {
                parser: function(t, e, n, i, o) {
                    return o
                }
            }), yt("border", {
                defaultValue: "0px solid #000",
                parser: function(t, e, n, i, r, s) {
                    return this.parseComplex(t.style, this.format(Q(t, "borderTopWidth", o, !1, "0px") + " " + Q(t, "borderTopStyle", o, !1, "solid") + " " + Q(t, "borderTopColor", o, !1, "#000")), this.format(e), r, s)
                },
                color: !0,
                formatter: function(t) {
                    var e = t.split(" ");
                    return e[0] + " " + (e[1] || "solid") + " " + (t.match(ct) || ["#000"])[0]
                }
            }), yt("borderWidth", {
                parser: dt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), yt("float,cssFloat,styleFloat", {
                parser: function(t, e, n, i, o) {
                    var r = t.style,
                        s = "cssFloat" in r ? "cssFloat" : "styleFloat";
                    return new ft(r, s, 0, 0, o, (-1), n, (!1), 0, r[s], e)
                }
            });
            var Nt = function(t) {
                var e, n = this.t,
                    i = n.filter || Q(this.data, "filter") || "",
                    o = 0 | this.s + this.c * t;
                100 === o && (-1 === i.indexOf("atrix(") && -1 === i.indexOf("radient(") && -1 === i.indexOf("oader(") ? (n.removeAttribute("filter"), e = !Q(this.data, "filter")) : (n.filter = i.replace(k, ""), e = !0)), e || (this.xn1 && (n.filter = i = i || "alpha(opacity=" + o + ")"), -1 === i.indexOf("pacity") ? 0 === o && this.xn1 || (n.filter = i + " alpha(opacity=" + o + ")") : n.filter = i.replace(x, "opacity=" + o))
            };
            yt("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(t, e, n, i, r, s) {
                    var a = parseFloat(Q(t, "opacity", o, !1, "1")),
                        l = t.style,
                        u = "autoAlpha" === n;
                    return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), u && 1 === a && "hidden" === Q(t, "visibility", o) && 0 !== e && (a = 0), H ? r = new ft(l, "opacity", a, e - a, r) : (r = new ft(l, "opacity", 100 * a, 100 * (e - a), r), r.xn1 = u ? 1 : 0, l.zoom = 1, r.type = 2, r.b = "alpha(opacity=" + r.s + ")", r.e = "alpha(opacity=" + (r.s + r.c) + ")", r.data = t, r.plugin = s, r.setRatio = Nt), u && (r = new ft(l, "visibility", 0, 0, r, (-1), null, (!1), 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), r.xs0 = "inherit", i._overwriteProps.push(r.n), i._overwriteProps.push(n)), r
                }
            });
            var Lt = function(t, e) {
                    e && (t.removeProperty ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)), t.removeProperty(e.replace(C, "-$1").toLowerCase())) : t.removeAttribute(e))
                },
                Rt = function(t) {
                    if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                        this.t.setAttribute("class", 0 === t ? this.b : this.e);
                        for (var e = this.data, n = this.t.style; e;) e.v ? n[e.p] = e.v : Lt(n, e.p), e = e._next;
                        1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    }
                    else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                };
            yt("className", {
                parser: function(t, e, i, r, s, a, l) {
                    var u, c, h, d, p, f = t.getAttribute("class") || "",
                        m = t.style.cssText;
                    if (s = r._classNamePT = new ft(t, i, 0, 0, s, 2), s.setRatio = Rt, s.pr = -11, n = !0, s.b = f, c = K(t, o), h = t._gsClassPT) {
                        for (d = {}, p = h.data; p;) d[p.p] = 1, p = p._next;
                        h.setRatio(1)
                    }
                    return t._gsClassPT = s, s.e = "=" !== e.charAt(1) ? e : f.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), r._tween._duration && (t.setAttribute("class", s.e), u = Z(t, c, K(t), l, d), t.setAttribute("class", f), s.data = u.firstMPT, t.style.cssText = m, s = s.xfirst = r.parse(t, u.difs, s, a)), s
                }
            });
            var It = function(t) {
                if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var e, n, i, o, r = this.t.style,
                        s = l.transform.parse;
                    if ("all" === this.e) r.cssText = "", o = !0;
                    else
                        for (e = this.e.split(" ").join("").split(","), i = e.length; --i > -1;) n = e[i], l[n] && (l[n].parse === s ? o = !0 : n = "transformOrigin" === n ? Tt : l[n].p), Lt(r, n);
                    o && (Lt(r, _t), this.t._gsTransform && delete this.t._gsTransform)
                }
            };
            for (yt("clearProps", {
                    parser: function(t, e, i, o, r) {
                        return r = new ft(t, i, 0, 0, r, 2), r.setRatio = It, r.e = e, r.pr = -10, r.data = o._tween, n = !0, r
                    }
                }), u = "bezier,throwProps,physicsProps,physics2D".split(","), gt = u.length; gt--;) bt(u[gt]);
            u = s.prototype, u._firstPT = u._lastParsedTransform = u._transform = null, u._onInitTween = function(t, e, a) {
                if (!t.nodeType) return !1;
                this._target = t, this._tween = a, this._vars = e, c = e.autoRound, n = !1, i = e.suffixMap || s.suffixMap, o = Y(t, ""), r = this._overwriteProps;
                var l, u, p, m, g, v, y, b, w, x = t.style;
                if (h && "" === x.zIndex && (l = Q(t, "zIndex", o), ("auto" === l || "" === l) && this._addLazySet(x, "zIndex", 0)), "string" == typeof e && (m = x.cssText, l = K(t, o), x.cssText = m + ";" + e, l = Z(t, l, K(t)).difs, !H && _.test(e) && (l.opacity = parseFloat(RegExp.$1)), e = l, x.cssText = m), this._firstPT = u = this.parse(t, e, null), this._transformType) {
                    for (w = 3 === this._transformType, _t ? d && (h = !0, "" === x.zIndex && (y = Q(t, "zIndex", o), ("auto" === y || "" === y) && this._addLazySet(x, "zIndex", 0)), f && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (w ? "visible" : "hidden"))) : x.zoom = 1, p = u; p && p._next;) p = p._next;
                    b = new ft(t, "transform", 0, 0, null, 2), this._linkCSSP(b, null, p), b.setRatio = w && Ct ? Ot : _t ? Dt : At, b.data = this._transform || Mt(t, o, !0), r.pop()
                }
                if (n) {
                    for (; u;) {
                        for (v = u._next, p = m; p && p.pr > u.pr;) p = p._next;
                        (u._prev = p ? p._prev : g) ? u._prev._next = u: m = u, (u._next = p) ? p._prev = u : g = u, u = v
                    }
                    this._firstPT = m
                }
                return !0
            }, u.parse = function(t, e, n, r) {
                var s, a, u, h, d, p, f, m, g, v, y = t.style;
                for (s in e) p = e[s], a = l[s], a ? n = a.parse(t, p, s, this, n, r, e) : (d = Q(t, s, o) + "", g = "string" == typeof p, "color" === s || "fill" === s || "stroke" === s || -1 !== s.indexOf("Color") || g && T.test(p) ? (g || (p = ut(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), n = mt(y, s, d, p, !0, "transparent", n, 0, r)) : !g || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (u = parseFloat(d), f = u || 0 === u ? d.substr((u + "").length) : "", ("" === d || "auto" === d) && ("width" === s || "height" === s ? (u = nt(t, s, o), f = "px") : "left" === s || "top" === s ? (u = G(t, s, o), f = "px") : (u = "opacity" !== s ? 0 : 1, f = "")), v = g && "=" === p.charAt(1), v ? (h = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), h *= parseFloat(p), m = p.replace(w, "")) : (h = parseFloat(p), m = g ? p.replace(w, "") : ""), "" === m && (m = s in i ? i[s] : f), p = h || 0 === h ? (v ? h + u : h) + m : e[s], f !== m && "" !== m && (h || 0 === h) && u && (u = J(t, s, u, f), "%" === m ? (u /= J(t, s, 100, "%") / 100, e.strictUnits !== !0 && (d = u + "%")) : "em" === m ? u /= J(t, s, 1, "em") : "px" !== m && (h = J(t, s, h, m), m = "px"), v && (h || 0 === h) && (p = h + u + m)), v && (h += u), !u && 0 !== u || !h && 0 !== h ? void 0 !== y[s] && (p || "NaN" != p + "" && null != p) ? (n = new ft(y, s, h || u || 0, 0, n, (-1), s, (!1), 0, d, p), n.xs0 = "none" !== p || "display" !== s && -1 === s.indexOf("Style") ? p : d) : B("invalid " + s + " tween value: " + e[s]) : (n = new ft(y, s, u, h - u, n, 0, s, c !== !1 && ("px" === m || "zIndex" === s), 0, d, p), n.xs0 = m)) : n = mt(y, s, d, p, !0, null, n, 0, r)), r && n && !n.plugin && (n.plugin = r);
                return n
            }, u.setRatio = function(t) {
                var e, n, i, o = this._firstPT,
                    r = 1e-6;
                if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                    if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                        for (; o;) {
                            if (e = o.c * t + o.s, o.r ? e = Math.round(e) : r > e && e > -r && (e = 0), o.type)
                                if (1 === o.type)
                                    if (i = o.l, 2 === i) o.t[o.p] = o.xs0 + e + o.xs1 + o.xn1 + o.xs2;
                                    else if (3 === i) o.t[o.p] = o.xs0 + e + o.xs1 + o.xn1 + o.xs2 + o.xn2 + o.xs3;
                            else if (4 === i) o.t[o.p] = o.xs0 + e + o.xs1 + o.xn1 + o.xs2 + o.xn2 + o.xs3 + o.xn3 + o.xs4;
                            else if (5 === i) o.t[o.p] = o.xs0 + e + o.xs1 + o.xn1 + o.xs2 + o.xn2 + o.xs3 + o.xn3 + o.xs4 + o.xn4 + o.xs5;
                            else {
                                for (n = o.xs0 + e + o.xs1, i = 1; o.l > i; i++) n += o["xn" + i] + o["xs" + (i + 1)];
                                o.t[o.p] = n
                            }
                            else -1 === o.type ? o.t[o.p] = o.xs0 : o.setRatio && o.setRatio(t);
                            else o.t[o.p] = e + o.xs0;
                            o = o._next
                        }
                    else
                        for (; o;) 2 !== o.type ? o.t[o.p] = o.b : o.setRatio(t), o = o._next;
                    else
                        for (; o;) 2 !== o.type ? o.t[o.p] = o.e : o.setRatio(t), o = o._next
            }, u._enableTransforms = function(t) {
                this._transform = this._transform || Mt(this._target, o, !0), this._transformType = this._transform.svg && wt || !t && 3 !== this._transformType ? 2 : 3
            };
            var qt = function() {
                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
            };
            u._addLazySet = function(t, e, n) {
                var i = this._firstPT = new ft(t, e, 0, 0, this._firstPT, 2);
                i.e = n, i.setRatio = qt, i.data = this
            }, u._linkCSSP = function(t, e, n, i) {
                return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, i = !0), n ? n._next = t : i || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = n), t
            }, u._kill = function(e) {
                var n, i, o, r = e;
                if (e.autoAlpha || e.alpha) {
                    r = {};
                    for (i in e) r[i] = e[i];
                    r.opacity = 1, r.autoAlpha && (r.visibility = 1)
                }
                return e.className && (n = this._classNamePT) && (o = n.xfirst, o && o._prev ? this._linkCSSP(o._prev, n._next, o._prev._prev) : o === this._firstPT && (this._firstPT = n._next), n._next && this._linkCSSP(n._next, n._next._next, o._prev), this._classNamePT = null), t.prototype._kill.call(this, r)
            };
            var zt = function(t, e, n) {
                var i, o, r, s;
                if (t.slice)
                    for (o = t.length; --o > -1;) zt(t[o], e, n);
                else
                    for (i = t.childNodes, o = i.length; --o > -1;) r = i[o], s = r.type, r.style && (e.push(K(r)), n && n.push(r)), 1 !== s && 9 !== s && 11 !== s || !r.childNodes.length || zt(r, e, n)
            };
            return s.cascadeTo = function(t, n, i) {
                var o, r, s, a = e.to(t, n, i),
                    l = [a],
                    u = [],
                    c = [],
                    h = [],
                    d = e._internals.reservedProps;
                for (t = a._targets || a.target, zt(t, u, h), a.render(n, !0), zt(t, c), a.render(0, !0), a._enabled(!0), o = h.length; --o > -1;)
                    if (r = Z(h[o], u[o], c[o]), r.firstMPT) {
                        r = r.difs;
                        for (s in i) d[s] && (r[s] = i[s]);
                        l.push(e.to(h[o], n, r))
                    }
                return l
            }, t.activate([s]), s
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[t]
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = e())
    }("CSSPlugin");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    var t = document.documentElement,
        e = window,
        n = function(n, i) {
            var o = "x" === i ? "Width" : "Height",
                r = "scroll" + o,
                s = "client" + o,
                a = document.body;
            return n === e || n === t || n === a ? Math.max(t[r], a[r]) - (e["inner" + o] || Math.max(t[s], a[s])) : n[r] - n["offset" + o]
        },
        i = _gsScope._gsDefine.plugin({
            propName: "scrollTo",
            API: 2,
            version: "1.7.4",
            init: function(t, i, o) {
                return this._wdw = t === e, this._target = t, this._tween = o, "object" != typeof i && (i = {
                    y: i
                }), this.vars = i, this._autoKill = i.autoKill !== !1, this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != i.x ? (this._addTween(this, "x", this.x, "max" === i.x ? n(t, "x") : i.x, "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != i.y ? (this._addTween(this, "y", this.y, "max" === i.y ? n(t, "y") : i.y, "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
            },
            set: function(t) {
                this._super.setRatio.call(this, t);
                var i = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                    o = this._wdw || !this.skipY ? this.getY() : this.yPrev,
                    r = o - this.yPrev,
                    s = i - this.xPrev;
                this._autoKill && (!this.skipX && (s > 7 || -7 > s) && n(this._target, "x") > i && (this.skipX = !0), !this.skipY && (r > 7 || -7 > r) && n(this._target, "y") > o && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))), this._wdw ? e.scrollTo(this.skipX ? i : this.x, this.skipY ? o : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
            }
        }),
        o = i.prototype;
    i.max = n, o.getX = function() {
        return this._wdw ? null != e.pageXOffset ? e.pageXOffset : null != t.scrollLeft ? t.scrollLeft : document.body.scrollLeft : this._target.scrollLeft
    }, o.getY = function() {
        return this._wdw ? null != e.pageYOffset ? e.pageYOffset : null != t.scrollTop ? t.scrollTop : document.body.scrollTop : this._target.scrollTop
    }, o._kill = function(t) {
        return t.scrollTo_x && (this.skipX = !0), t.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, t)
    }
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()();
var Froogaloop = function() {
    function t(e) {
        return new t.fn.init(e)
    }

    function e(t, e, n) {
        if (!n.contentWindow.postMessage) return !1;
        var i = n.getAttribute("src").split("?")[0],
            t = JSON.stringify({
                method: t,
                value: e
            });
        "//" === i.substr(0, 2) && (i = window.location.protocol + i), n.contentWindow.postMessage(t, i)
    }

    function n(t) {
        var e, n;
        try {
            e = JSON.parse(t.data), n = e.event || e.method
        }
        catch (i) {}
        if ("ready" == n && !r && (r = !0), t.origin != s) return !1;
        var t = e.value,
            a = e.data,
            l = "" === l ? null : e.player_id;
        return e = l ? o[l][n] : o[n], n = [], !!e && (void 0 !== t && n.push(t), a && n.push(a), l && n.push(l), 0 < n.length ? e.apply(null, n) : e.call())
    }

    function i(t, e, n) {
        n ? (o[n] || (o[n] = {}), o[n][t] = e) : o[t] = e
    }
    var o = {},
        r = !1,
        s = "";
    return t.fn = t.prototype = {
        element: null,
        init: function(t) {
            "string" == typeof t && (t = document.getElementById(t)), this.element = t, t = this.element.getAttribute("src"), "//" === t.substr(0, 2) && (t = window.location.protocol + t);
            for (var t = t.split("/"), e = "", n = 0, i = t.length; n < i && 3 > n; n++) e += t[n], 2 > n && (e += "/");
            return s = e, this
        },
        api: function(t, n) {
            if (!this.element || !t) return !1;
            var o = this.element,
                r = "" !== o.id ? o.id : null,
                s = n && n.constructor && n.call && n.apply ? null : n,
                a = n && n.constructor && n.call && n.apply ? n : null;
            return a && i(t, a, r), e(t, s, o), this
        },
        addEvent: function(t, n) {
            if (!this.element) return !1;
            var o = this.element,
                s = "" !== o.id ? o.id : null;
            return i(t, n, s), "ready" != t ? e("addEventListener", t, o) : "ready" == t && r && n.call(null, s), this
        },
        removeEvent: function(t) {
            if (!this.element) return !1;
            var n, i = this.element;
            t: {
                if ((n = "" !== i.id ? i.id : null) && o[n]) {
                    if (!o[n][t]) {
                        n = !1;
                        break t
                    }
                    o[n][t] = null
                }
                else {
                    if (!o[t]) {
                        n = !1;
                        break t
                    }
                    o[t] = null
                }
                n = !0
            }
            "ready" != t && n && e("removeEventListener", t, i)
        }
    }, t.fn.init.prototype = t.fn, window.addEventListener ? window.addEventListener("message", n, !1) : window.attachEvent("onmessage", n), window.Froogaloop = window.$f = t
}();
! function(t, e, n) {
    t.fn.backstretch = function(i, o) {
        return (i === n || 0 === i.length) && t.error("No images were supplied for Backstretch"), 0 === t(e).scrollTop() && e.scrollTo(0, 0), this.each(function() {
            var e = t(this),
                n = e.data("backstretch");
            if (n) {
                if ("string" == typeof i && "function" == typeof n[i]) return void n[i](o);
                o = t.extend(n.options, o), n.destroy(!0)
            }
            n = new r(this, i, o), e.data("backstretch", n)
        })
    }, t.backstretch = function(e, n) {
        return t("body").backstretch(e, n).data("backstretch")
    }, t.expr[":"].backstretch = function(e) {
        return t(e).data("backstretch") !== n
    }, t.fn.backstretch.defaults = {
        centeredX: !0,
        centeredY: !0,
        duration: 5e3,
        fade: 0
    };
    var i = {
            left: 0,
            top: 0,
            overflow: "hidden",
            margin: 0,
            padding: 0,
            height: "100%",
            width: "100%",
            zIndex: -999999
        },
        o = {
            position: "absolute",
            display: "none",
            margin: 0,
            padding: 0,
            border: "none",
            width: "auto",
            height: "auto",
            maxHeight: "none",
            maxWidth: "none",
            zIndex: -999999
        },
        r = function(n, o, r) {
            this.options = t.extend({}, t.fn.backstretch.defaults, r || {}), this.images = t.isArray(o) ? o : [o], t.each(this.images, function() {
                t("<img />")[0].src = this
            }), this.isBody = n === document.body, this.$container = t(n), this.$root = this.isBody ? t(s ? e : document) : this.$container, n = this.$container.children(".backstretch").first(), this.$wrap = n.length ? n : t('<div class="backstretch"></div>').css(i).appendTo(this.$container), this.isBody || (n = this.$container.css("position"), o = this.$container.css("zIndex"), this.$container.css({
                position: "static" === n ? "relative" : n,
                zIndex: "auto" === o ? 0 : o,
                background: "none"
            }), this.$wrap.css({
                zIndex: -999998
            })), this.$wrap.css({
                position: this.isBody && s ? "fixed" : "absolute"
            }), this.index = 0, this.show(this.index), t(e).on("resize.backstretch", t.proxy(this.resize, this)).on("orientationchange.backstretch", t.proxy(function() {
                this.isBody && 0 === e.pageYOffset && (e.scrollTo(0, 1), this.resize())
            }, this))
        };
    r.prototype = {
        resize: function() {
            try {
                var t, n = {
                        left: 0,
                        top: 0
                    },
                    i = this.isBody ? this.$root.width() : this.$root.innerWidth(),
                    o = i,
                    r = this.isBody ? e.innerHeight ? e.innerHeight : this.$root.height() : this.$root.innerHeight(),
                    s = o / this.$img.data("ratio");
                s >= r ? (t = (s - r) / 2, this.options.centeredY && (n.top = "-" + t + "px")) : (s = r, o = s * this.$img.data("ratio"), t = (o - i) / 2, this.options.centeredX && (n.left = "-" + t + "px")), this.$wrap.css({
                    width: i,
                    height: r
                }).find("img:not(.deleteable)").css({
                    width: o,
                    height: s
                }).css(n)
            }
            catch (a) {}
            return this
        },
        show: function(e) {
            if (!(Math.abs(e) > this.images.length - 1)) {
                var n = this,
                    i = n.$wrap.find("img").addClass("deleteable"),
                    r = {
                        relatedTarget: n.$container[0]
                    };
                return n.$container.trigger(t.Event("backstretch.before", r), [n, e]), this.index = e, clearInterval(n.interval), n.$img = t("<img />").css(o).bind("load", function(o) {
                    var s = this.width || t(o.target).width();
                    o = this.height || t(o.target).height(), t(this).data("ratio", s / o), t(this).fadeIn(n.options.speed || n.options.fade, function() {
                        i.remove(), n.paused || n.cycle(), t(["after", "show"]).each(function() {
                            n.$container.trigger(t.Event("backstretch." + this, r), [n, e])
                        })
                    }), n.resize()
                }).appendTo(n.$wrap), n.$img.attr("src", n.images[e]), n
            }
        },
        next: function() {
            return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0)
        },
        prev: function() {
            return this.show(0 === this.index ? this.images.length - 1 : this.index - 1)
        },
        pause: function() {
            return this.paused = !0, this
        },
        resume: function() {
            return this.paused = !1, this.next(), this
        },
        cycle: function() {
            return 1 < this.images.length && (clearInterval(this.interval), this.interval = setInterval(t.proxy(function() {
                this.paused || this.next()
            }, this), this.options.duration)), this
        },
        destroy: function(n) {
            t(e).off("resize.backstretch orientationchange.backstretch"), clearInterval(this.interval), n || this.$wrap.remove(), this.$container.removeData("backstretch")
        }
    };
    var s, a = navigator.userAgent,
        l = navigator.platform,
        u = a.match(/AppleWebKit\/([0-9]+)/),
        u = !!u && u[1],
        c = a.match(/Fennec\/([0-9]+)/),
        c = !!c && c[1],
        h = a.match(/Opera Mobi\/([0-9]+)/),
        d = !!h && h[1],
        p = a.match(/MSIE ([0-9]+)/),
        p = !!p && p[1];
    s = !((-1 < l.indexOf("iPhone") || -1 < l.indexOf("iPad") || -1 < l.indexOf("iPod")) && u && 534 > u || e.operamini && "[object OperaMini]" === {}.toString.call(e.operamini) || h && 7458 > d || -1 < a.indexOf("Android") && u && 533 > u || c && 6 > c || "palmGetResource" in e && u && 534 > u || -1 < a.indexOf("MeeGo") && -1 < a.indexOf("NokiaBrowser/8.5.0") || p && 6 >= p)
}(jQuery, window),
function(t) {
    t.fn.binnacle = function(e) {
        var n, i = {
                className: "binnacle",
                color: "#ffffff",
                height: 40,
                width: 40,
                image: '<svg width="{{width}}" height="{{height}}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" enable-background="new 0 0 40 40"><path fill="{{color}}" d="M36.4-.1h-32.8c-2 0-3.6 1.7-3.6 3.7v32.8c0 2 1.6 3.6 3.6 3.6h32.8c2 0 3.6-1.6 3.6-3.6v-32.8c0-2-1.6-3.7-3.6-3.7zm-23 7.9c1.3 0 2.4 1 2.4 2.4s-1.1 2.4-2.4 2.4-2.4-1-2.4-2.4c-.1-1.4 1-2.4 2.4-2.4zm16.3 23c-2.5 0-3.7-1.5-3.7-3.5 0-.6.1-1.2.3-1.8l1.2-4.2c.1-.5.2-.9.2-1.3 0-1.4-.8-2.2-2.2-2.2-1.7 0-2.8 1.2-3.4 3.5l-2.3 9.2h-4l.7-2.9c-1.2 1.9-2.8 3.1-4.9 3.1-2.4 0-3.6-1.4-3.6-3.5 0-.5.1-1.2.2-1.8l1.8-7.5h-2.7l.9-3.2h6.8l-2.7 10.7c-.2.7-.3 1.2-.3 1.6 0 .7.3.9.9 1 .3.1 2.9 0 4.3-3.1l1.8-7.1h-2.9l.9-3.2h6.1l-.8 3.6c1.1-2 3.2-3.9 5.4-3.9 2.3 0 4.1 1.6 4.1 4.7 0 .8-.1 1.7-.4 2.6l-1.2 4.4c-.1.4-.2.8-.2 1.1 0 .7.3 1.1.8 1.1s1.2-.4 2-2.6l1.6.6c-.9 3.2-2.6 4.6-4.7 4.6z"/></svg>',
                displayMode: !1
            },
            o = t.extend({}, i, e),
            r = t(document);
        return n = o.image.replace("{{color}}", o.color).replace("{{height}}", o.height).replace("{{width}}", o.width), this.each(function() {
            var e = t(this),
                i = t('<div class="' + o.className + '">' + n + "</div>"),
                s = function() {
                    e.append(i), i.siblings().addClass("alpha-zero")
                },
                a = function() {
                    i.siblings().removeClass("alpha-zero"), i.remove()
                },
                l = function() {
                    e.append(i), i.siblings().css({
                        opacity: "0.5"
                    })
                };
            return o.displayMode ? void l() : (r.ajaxStart(s), r.ajaxError(a), void r.ajaxStop(a))
        })
    }
}(jQuery),
function(t) {
    if ("function" == typeof define && define.amd) define(t);
    else if ("object" == typeof exports) module.exports = t();
    else {
        var e = window.Cookies,
            n = window.Cookies = t(window.jQuery);
        n.noConflict = function() {
            return window.Cookies = e, n
        }
    }
}(function() {
    function t() {
        for (var t = 0, e = {}; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n) e[i] = n[i]
        }
        return e
    }

    function e(n) {
        function i(e, o, r) {
            var s;
            if (arguments.length > 1) {
                if (r = t(i.defaults, r), "number" == typeof r.expires) {
                    var a = new Date;
                    a.setMilliseconds(a.getMilliseconds() + 864e5 * r.expires), r.expires = a
                }
                try {
                    s = JSON.stringify(o), /^[\{\[]/.test(s) && (o = s)
                }
                catch (l) {}
                return o = encodeURIComponent(String(o)), o = o.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), e = encodeURIComponent(String(e)), e = e.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), e = e.replace(/[\(\)]/g, escape), document.cookie = [e, "=", o, r.expires && "; expires=" + r.expires.toUTCString(), r.path && "; path=" + r.path, r.domain && "; domain=" + r.domain, r.secure && "; secure"].join("")
            }
            e || (s = {});
            for (var u = document.cookie ? document.cookie.split("; ") : [], c = /(%[0-9A-Z]{2})+/g, h = 0; h < u.length; h++) {
                var d = u[h].split("="),
                    p = d[0].replace(c, decodeURIComponent),
                    f = d.slice(1).join("=");
                if ('"' === f.charAt(0) && (f = f.slice(1, -1)), f = n && n(f, p) || f.replace(c, decodeURIComponent), this.json) try {
                    f = JSON.parse(f)
                }
                catch (l) {}
                if (e === p) {
                    s = f;
                    break
                }
                e || (s[p] = f)
            }
            return s
        }
        return i.get = i.set = i, i.getJSON = function() {
            return i.apply({
                json: !0
            }, [].slice.call(arguments))
        }, i.defaults = {}, i.remove = function(e, n) {
            i(e, "", t(n, {
                expires: -1
            }))
        }, i.withConverter = e, i
    }
    return e()
}),
function(t) {
    t.customSelect = function(e) {
        var n, i, o = t(e);
        return o.wrap('<div class="input-select-wrapper ' + o.get(0).className + '" style="width:' + o.width() + 'px;"></div>'), o.after('<span class="input-select-wrappertext">' + o.find("option:selected").text() + "</span>"), n = o.parent(), i = n.find(".input-select-wrappertext"), "none" === !o.css("display") && n.hide(), o.is(":disabled") && n.addClass(".input-select-disabled"), o.on("change keyup didChange", function(t) {
            return i.text(o.find("option:selected").text())
        }).on("focus", function() {
            n.addClass("focused")
        }).on("blur", function() {
            n.removeClass("focused")
        })
    }, t.fn.customSelect = function() {
        return this.each(function() {
            if (void 0 == t(this).data("customSelect") && t(this).is("select")) {
                var e = new t.customSelect(this);
                t(this).data("customSelect", e)
            }
        })
    }
}(jQuery);
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
            var e, n, i, o = _gsScope.GreenSockGlobals || _gsScope,
                r = o.com.greensock,
                s = 2 * Math.PI,
                a = Math.PI / 2,
                l = r._class,
                u = function(e, n) {
                    var i = l("easing." + e, function() {}, !0),
                        o = i.prototype = new t;
                    return o.constructor = i, o.getRatio = n, i
                },
                c = t.register || function() {},
                h = function(t, e, n, i, o) {
                    var r = l("easing." + t, {
                        easeOut: new e,
                        easeIn: new n,
                        easeInOut: new i
                    }, !0);
                    return c(r, t), r
                },
                d = function(t, e, n) {
                    this.t = t, this.v = e, n && (this.next = n, n.prev = this, this.c = n.v - e, this.gap = n.t - t)
                },
                p = function(e, n) {
                    var i = l("easing." + e, function(t) {
                            this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                        }, !0),
                        o = i.prototype = new t;
                    return o.constructor = i, o.getRatio = n, o.config = function(t) {
                        return new i(t)
                    }, i
                },
                f = h("Back", p("BackOut", function(t) {
                    return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                }), p("BackIn", function(t) {
                    return t * t * ((this._p1 + 1) * t - this._p1)
                }), p("BackInOut", function(t) {
                    return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                })),
                m = l("easing.SlowMo", function(t, e, n) {
                    e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = n === !0
                }, !0),
                g = m.prototype = new t;
            return g.constructor = m, g.getRatio = function(t) {
                var e = t + (.5 - t) * this._p;
                return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
            }, m.ease = new m(.7, .7), g.config = m.config = function(t, e, n) {
                return new m(t, e, n)
            }, e = l("easing.SteppedEase", function(t) {
                t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
            }, !0), g = e.prototype = new t, g.constructor = e, g.getRatio = function(t) {
                return t < 0 ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
            }, g.config = e.config = function(t) {
                return new e(t)
            }, n = l("easing.RoughEase", function(e) {
                e = e || {};
                for (var n, i, o, r, s, a, l = e.taper || "none", u = [], c = 0, h = 0 | (e.points || 20), p = h, f = e.randomize !== !1, m = e.clamp === !0, g = e.template instanceof t ? e.template : null, v = "number" == typeof e.strength ? .4 * e.strength : .4; --p > -1;) n = f ? Math.random() : 1 / h * p, i = g ? g.getRatio(n) : n, "none" === l ? o = v : "out" === l ? (r = 1 - n, o = r * r * v) : "in" === l ? o = n * n * v : n < .5 ? (r = 2 * n, o = r * r * .5 * v) : (r = 2 * (1 - n), o = r * r * .5 * v), f ? i += Math.random() * o - .5 * o : p % 2 ? i += .5 * o : i -= .5 * o, m && (i > 1 ? i = 1 : i < 0 && (i = 0)), u[c++] = {
                    x: n,
                    y: i
                };
                for (u.sort(function(t, e) {
                        return t.x - e.x
                    }), a = new d(1, 1, null), p = h; --p > -1;) s = u[p], a = new d(s.x, s.y, a);
                this._prev = new d(0, 0, 0 !== a.t ? a : a.next)
            }, !0), g = n.prototype = new t, g.constructor = n, g.getRatio = function(t) {
                var e = this._prev;
                if (t > e.t) {
                    for (; e.next && t >= e.t;) e = e.next;
                    e = e.prev
                }
                else
                    for (; e.prev && t <= e.t;) e = e.prev;
                return this._prev = e, e.v + (t - e.t) / e.gap * e.c
            }, g.config = function(t) {
                return new n(t)
            }, n.ease = new n, h("Bounce", u("BounceOut", function(t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }), u("BounceIn", function(t) {
                return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : t < 2 / 2.75 ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
            }), u("BounceInOut", function(t) {
                var e = t < .5;
                return t = e ? 1 - 2 * t : 2 * t - 1, t = t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
            })), h("Circ", u("CircOut", function(t) {
                return Math.sqrt(1 - (t -= 1) * t)
            }), u("CircIn", function(t) {
                return -(Math.sqrt(1 - t * t) - 1)
            }), u("CircInOut", function(t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            })), i = function(e, n, i) {
                var o = l("easing." + e, function(t, e) {
                        this._p1 = t || 1, this._p2 = e || i, this._p3 = this._p2 / s * (Math.asin(1 / this._p1) || 0)
                    }, !0),
                    r = o.prototype = new t;
                return r.constructor = o, r.getRatio = n, r.config = function(t, e) {
                    return new o(t, e)
                }, o
            }, h("Elastic", i("ElasticOut", function(t) {
                return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * s / this._p2) + 1
            }, .3), i("ElasticIn", function(t) {
                return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2))
            }, .3), i("ElasticInOut", function(t) {
                return (t *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2)) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2) * .5 + 1
            }, .45)), h("Expo", u("ExpoOut", function(t) {
                return 1 - Math.pow(2, -10 * t)
            }), u("ExpoIn", function(t) {
                return Math.pow(2, 10 * (t - 1)) - .001
            }), u("ExpoInOut", function(t) {
                return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
            })), h("Sine", u("SineOut", function(t) {
                return Math.sin(t * a)
            }), u("SineIn", function(t) {
                return -Math.cos(t * a) + 1
            }), u("SineInOut", function(t) {
                return -.5 * (Math.cos(Math.PI * t) - 1)
            })), l("easing.EaseLookup", {
                find: function(e) {
                    return t.map[e]
                }
            }, !0), c(o.SlowMo, "SlowMo", "ease,"), c(n, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), f
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
    }(function(t) {
        function e(t) {
            return a.raw ? t : encodeURIComponent(t)
        }

        function n(t) {
            return a.raw ? t : decodeURIComponent(t)
        }

        function i(t) {
            return e(a.json ? JSON.stringify(t) : String(t))
        }

        function o(t) {
            0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return t = decodeURIComponent(t.replace(s, " ")), a.json ? JSON.parse(t) : t
            }
            catch (e) {}
        }

        function r(e, n) {
            var i = a.raw ? e : o(e);
            return t.isFunction(n) ? n(i) : i
        }
        var s = /\+/g,
            a = t.cookie = function(o, s, l) {
                if (void 0 !== s && !t.isFunction(s)) {
                    if (l = t.extend({}, a.defaults, l), "number" == typeof l.expires) {
                        var u = l.expires,
                            c = l.expires = new Date;
                        c.setTime(+c + 864e5 * u)
                    }
                    return document.cookie = [e(o), "=", i(s), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
                }
                for (var h = o ? void 0 : {}, d = document.cookie ? document.cookie.split("; ") : [], p = 0, f = d.length; p < f; p++) {
                    var m = d[p].split("="),
                        g = n(m.shift()),
                        v = m.join("=");
                    if (o && o === g) {
                        h = r(v, s);
                        break
                    }
                    o || void 0 === (v = r(v)) || (h[g] = v)
                }
                return h
            };
        a.defaults = {}, t.removeCookie = function(e, n) {
            return void 0 !== t.cookie(e) && (t.cookie(e, "", t.extend({}, n, {
                expires: -1
            })), !t.cookie(e))
        }
    }),
    function(t, e, n, i) {
        "use strict";

        function o(e, n) {
            this.element = e, this.settings = t.extend({}, a, n), this._defaults = a, this.cookie = r(this.settings.cookieName);
            var i = t("body").hasClass("blockspring");
            i || this.init()
        }

        function r(t) {
            var e = new RegExp("(?:^" + t + "|;s*" + t + ")=(.*?)(?:;|$)", "g"),
                i = e.exec(n.cookie);
            return null === i ? null : i[1]
        }
        var s = "csrfValidator",
            a = {
                token: t('input[name="xsrfFormToken"]').val(),
                cookieName: "FORM_TOKEN",
                tokenName: "csrfToken"
            };
        t.extend(o.prototype, {
            init: function() {
                "string" == typeof this.settings.token && this.populateAjaxRequest(this.settings.token)
            },
            populateAjaxRequest: function(e) {
                var n = this.settings;
                t.ajaxPrefilter(function(e) {
                    var i = t('input[name="xsrfFormToken"]').val();
                    e.data && (e.data += "&"), e.data += n.tokenName + "=" + i
                })
            },
            validate: function(t) {
                return this.cookie === t
            }
        }), t.fn[s] = function(e) {
            return this.each(function() {
                t.data(this, "plugin_" + s) || t.data(this, "plugin_" + s, new o(this, e))
            })
        }
    }(jQuery, window, document),
    function(t, e, n, i) {
        "use strict";
        var o = n("html"),
            r = n(t),
            s = n(e),
            a = n.tinybox = function() {
                a.open.apply(this, arguments)
            },
            l = navigator.userAgent.match(/msie/i),
            u = null,
            c = e.createTouch !== i,
            h = function(t) {
                return t && t.hasOwnProperty && t instanceof n
            },
            d = function(t) {
                return t && "string" === n.type(t)
            },
            p = function(t) {
                return d(t) && t.indexOf("%") > 0
            },
            f = function(t) {
                return t && !(t.style.overflow && "hidden" === t.style.overflow) && (t.clientWidth && t.scrollWidth > t.clientWidth || t.clientHeight && t.scrollHeight > t.clientHeight)
            },
            m = function(t, e) {
                var n = parseInt(t, 10) || 0;
                return e && p(t) && (n = a.getViewport()[e] / 100 * n), Math.ceil(n)
            },
            g = function(t, e) {
                return m(t, e) + "px"
            };
        n.extend(a, {
            version: "2.1.5",
            defaults: {
                padding: 15,
                margin: 20,
                width: 800,
                height: 600,
                minWidth: 100,
                minHeight: 100,
                maxWidth: 9999,
                maxHeight: 9999,
                pixelRatio: 1,
                autoSize: !0,
                autoHeight: !1,
                autoWidth: !1,
                autoResize: !0,
                autoCenter: !c,
                fitToView: !0,
                aspectRatio: !1,
                topRatio: .5,
                leftRatio: .5,
                scrolling: "auto",
                wrapCSS: "",
                arrows: !0,
                closeBtn: !0,
                closeClick: !1,
                nextClick: !1,
                mouseWheel: !0,
                autoPlay: !1,
                playSpeed: 3e3,
                preload: 3,
                modal: !1,
                loop: !0,
                ajax: {
                    dataType: "html",
                    headers: {
                        "X-tinyBox": !0
                    }
                },
                iframe: {
                    scrolling: "auto",
                    preload: !0
                },
                swf: {
                    wmode: "transparent",
                    allowfullscreen: "true",
                    allowscriptaccess: "always"
                },
                keys: {
                    next: {
                        13: "left",
                        34: "up",
                        39: "left",
                        40: "up"
                    },
                    prev: {
                        8: "right",
                        33: "down",
                        37: "right",
                        38: "down"
                    },
                    close: [27],
                    play: [32],
                    toggle: [70]
                },
                direction: {
                    next: "left",
                    prev: "right"
                },
                scrollOutside: !0,
                index: 0,
                type: null,
                href: null,
                content: null,
                title: null,
                tpl: {
                    wrap: '<div class="tinybox-wrap" tabIndex="-1"><div class="tinybox-skin"><div class="tinybox-outer"><div class="tinybox-inner"></div></div></div></div>',
                    image: '<img class="tinybox-image" src="{href}" alt="" />',
                    iframe: '<iframe id="tinybox-frame{rnd}" name="tinybox-frame{rnd}" class="tinybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
                    error: '<p class="tinybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                    closeBtn: '<a title="Close" class="tinybox-item tinybox-close" href="javascript:;"></a>',
                    next: '<a title="Next" class="tinybox-nav tinybox-next" href="javascript:;"><span></span></a>',
                    prev: '<a title="Previous" class="tinybox-nav tinybox-prev" href="javascript:;"><span></span></a>'
                },
                openEffect: "fade",
                openSpeed: 250,
                openEasing: "swing",
                openOpacity: !0,
                openMethod: "zoomIn",
                closeEffect: "fade",
                closeSpeed: 250,
                closeEasing: "swing",
                closeOpacity: !0,
                closeMethod: "zoomOut",
                nextEffect: "elastic",
                nextSpeed: 250,
                nextEasing: "swing",
                nextMethod: "changeIn",
                prevEffect: "elastic",
                prevSpeed: 250,
                prevEasing: "swing",
                prevMethod: "changeOut",
                helpers: {
                    overlay: !0,
                    title: !0
                },
                onCancel: n.noop,
                beforeLoad: n.noop,
                afterLoad: n.noop,
                beforeShow: n.noop,
                afterShow: n.noop,
                beforeChange: n.noop,
                beforeClose: n.noop,
                afterClose: n.noop
            },
            group: {},
            opts: {},
            previous: null,
            coming: null,
            current: null,
            isActive: !1,
            isOpen: !1,
            isOpened: !1,
            wrap: null,
            skin: null,
            outer: null,
            inner: null,
            player: {
                timer: null,
                isActive: !1
            },
            ajaxLoad: null,
            imgPreload: null,
            transitions: {},
            helpers: {},
            open: function(t, e) {
                if (t && (n.isPlainObject(e) || (e = {}), !1 !== a.close(!0))) return n.isArray(t) || (t = h(t) ? n(t).get() : [t]), n.each(t, function(o, r) {
                    var s, l, u, c, p, f, m, g = {};
                    "object" === n.type(r) && (r.nodeType && (r = n(r)), h(r) ? (g = {
                        href: r.data("tinybox-href") || r.attr("href"),
                        title: n("<div/>").text(r.data("tinybox-title") || r.attr("title")).html(),
                        isDom: !0,
                        element: r
                    }, n.metadata && n.extend(!0, g, r.metadata())) : g = r), s = e.href || g.href || (d(r) ? r : null), l = e.title !== i ? e.title : g.title || "", u = e.content || g.content, c = u ? "html" : e.type || g.type, !c && g.isDom && (c = r.data("tinybox-type"), c || (p = r.prop("class").match(/tinybox\.(\w+)/), c = p ? p[1] : null)), d(s) && (c || (a.isImage(s) ? c = "image" : a.isSWF(s) ? c = "swf" : "#" === s.charAt(0) ? c = "inline" : d(r) && (c = "html", u = r)), "ajax" === c && (f = s.split(/\s+/, 2), s = f.shift(), m = f.shift())), u || ("inline" === c ? s ? u = n(d(s) ? s.replace(/.*(?=#[^\s]+$)/, "") : s) : g.isDom && (u = r) : "html" === c ? u = s : c || s || !g.isDom || (c = "inline", u = r)), n.extend(g, {
                        href: s,
                        type: c,
                        content: u,
                        title: l,
                        selector: m
                    }), t[o] = g
                }), a.opts = n.extend(!0, {}, a.defaults, e), e.keys !== i && (a.opts.keys = !!e.keys && n.extend({}, a.defaults.keys, e.keys)), a.group = t, a._start(a.opts.index)
            },
            cancel: function() {
                var t = a.coming;
                t && !1 === a.trigger("onCancel") || (a.hideLoading(), t && (a.ajaxLoad && a.ajaxLoad.abort(), a.ajaxLoad = null, a.imgPreload && (a.imgPreload.onload = a.imgPreload.onerror = null), t.wrap && t.wrap.stop(!0, !0).trigger("onReset").remove(), a.coming = null, a.current || a._afterZoomOut(t)))
            },
            close: function(t) {
                a.cancel(), !1 !== a.trigger("beforeClose") && (a.unbindEvents(), a.isActive && (a.isOpen && t !== !0 ? (a.isOpen = a.isOpened = !1, a.isClosing = !0, n(".tinybox-item, .tinybox-nav").remove(), a.wrap.stop(!0, !0).removeClass("tinybox-opened"), a.transitions[a.current.closeMethod]()) : (n(".tinybox-wrap").stop(!0).trigger("onReset").remove(), a._afterZoomOut())))
            },
            play: function(t) {
                var e = function() {
                        clearTimeout(a.player.timer)
                    },
                    n = function() {
                        e(), a.current && a.player.isActive && (a.player.timer = setTimeout(a.next, a.current.playSpeed))
                    },
                    i = function() {
                        e(), s.unbind(".player"), a.player.isActive = !1, a.trigger("onPlayEnd")
                    },
                    o = function() {
                        a.current && (a.current.loop || a.current.index < a.group.length - 1) && (a.player.isActive = !0, s.bind({
                            "onCancel.player beforeClose.player": i,
                            "onUpdate.player": n,
                            "beforeLoad.player": e
                        }), n(), a.trigger("onPlayStart"))
                    };
                t === !0 || !a.player.isActive && t !== !1 ? o() : i()
            },
            next: function(t) {
                var e = a.current;
                e && (d(t) || (t = e.direction.next), a.jumpto(e.index + 1, t, "next"))
            },
            prev: function(t) {
                var e = a.current;
                e && (d(t) || (t = e.direction.prev), a.jumpto(e.index - 1, t, "prev"))
            },
            jumpto: function(t, e, n) {
                var o = a.current;
                o && (t = m(t), a.direction = e || o.direction[t >= o.index ? "next" : "prev"], a.router = n || "jumpto", o.loop && (t < 0 && (t = o.group.length + t % o.group.length), t %= o.group.length), o.group[t] !== i && (a.cancel(), a._start(t)))
            },
            reposition: function(t, e) {
                var i, o = a.current,
                    r = o ? o.wrap : null;
                r && (i = a._getPosition(e), t && "scroll" === t.type ? (delete i.position, r.stop(!0, !0).animate(i, 200)) : (r.css(i), o.pos = n.extend({}, o.dim, i)))
            },
            update: function(t) {
                var e = t && t.originalEvent && t.originalEvent.type,
                    n = !e || "orientationchange" === e;
                n && (clearTimeout(u), u = null), a.isOpen && !u && (u = setTimeout(function() {
                    var i = a.current;
                    i && !a.isClosing && (a.wrap.removeClass("tinybox-tmp"), (n || "load" === e || "resize" === e && i.autoResize) && a._setDimension(), "scroll" === e && i.canShrink || a.reposition(t), a.trigger("onUpdate"), u = null)
                }, n && !c ? 0 : 300))
            },
            toggle: function(t) {
                a.isOpen && (a.current.fitToView = "boolean" === n.type(t) ? t : !a.current.fitToView, c && (a.wrap.removeAttr("style").addClass("tinybox-tmp"), a.trigger("onUpdate")), a.update())
            },
            hideLoading: function() {
                s.unbind(".loading"), n("#tinybox-loading").remove()
            },
            showLoading: function() {
                var t, e;
                a.hideLoading(), t = n('<div id="tinybox-loading"><div></div></div>').click(a.cancel).appendTo("body"), s.bind("keydown.loading", function(t) {
                    27 === (t.which || t.keyCode) && (t.preventDefault(), a.cancel())
                }), a.defaults.fixed || (e = a.getViewport(), t.css({
                    position: "absolute",
                    top: .5 * e.h + e.y,
                    left: .5 * e.w + e.x
                })), a.trigger("onLoading")
            },
            getViewport: function() {
                var e = a.current && a.current.locked || !1,
                    n = {
                        x: r.scrollLeft(),
                        y: r.scrollTop()
                    };
                return e && e.length ? (n.w = e[0].clientWidth, n.h = e[0].clientHeight) : (n.w = c && t.innerWidth ? t.innerWidth : r.width(), n.h = c && t.innerHeight ? t.innerHeight : r.height()), n
            },
            unbindEvents: function() {
                a.wrap && h(a.wrap) && a.wrap.unbind(".fb"), s.unbind(".fb"), r.unbind(".fb")
            },
            bindEvents: function() {
                var t, e = a.current;
                e && (r.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), a.update), t = e.keys, t && s.bind("keydown.fb", function(o) {
                    var r = o.which || o.keyCode,
                        s = o.target || o.srcElement;
                    return (27 !== r || !a.coming) && void(o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || s && (s.type || n(s).is("[contenteditable]")) || n.each(t, function(t, s) {
                        return e.group.length > 1 && s[r] !== i ? (a[t](s[r]), o.preventDefault(), !1) : n.inArray(r, s) > -1 ? (a[t](), o.preventDefault(), !1) : void 0
                    }))
                }), n.fn.mousewheel && e.mouseWheel && a.wrap.bind("mousewheel.fb", function(t, i, o, r) {
                    for (var s = t.target || null, l = n(s), u = !1; l.length && !(u || l.is(".tinybox-skin") || l.is(".tinybox-wrap"));) u = f(l[0]), l = n(l).parent();
                    0 === i || u || a.group.length > 1 && !e.canShrink && (r > 0 || o > 0 ? a.prev(r > 0 ? "down" : "left") : (r < 0 || o < 0) && a.next(r < 0 ? "up" : "right"), t.preventDefault())
                }))
            },
            trigger: function(t, e) {
                var i, o = e || a.coming || a.current;
                if (o) {
                    if (n.isFunction(o[t]) && (i = o[t].apply(o, Array.prototype.slice.call(arguments, 1))), i === !1) return !1;
                    o.helpers && n.each(o.helpers, function(e, i) {
                        i && a.helpers[e] && n.isFunction(a.helpers[e][t]) && a.helpers[e][t](n.extend(!0, {}, a.helpers[e].defaults, i), o)
                    })
                }
                s.trigger(t)
            },
            isImage: function(t) {
                return d(t) && t.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
            },
            isSWF: function(t) {
                return d(t) && t.match(/\.(swf)((\?|#).*)?$/i)
            },
            _start: function(t) {
                var e, i, o, r, s, l = {};
                if (t = m(t), e = a.group[t] || null, !e) return !1;
                if (l = n.extend(!0, {}, a.opts, e), r = l.margin, s = l.padding, "number" === n.type(r) && (l.margin = [r, r, r, r]), "number" === n.type(s) && (l.padding = [s, s, s, s]), l.modal && n.extend(!0, l, {
                        closeBtn: !1,
                        closeClick: !1,
                        nextClick: !1,
                        arrows: !1,
                        mouseWheel: !1,
                        keys: null,
                        helpers: {
                            overlay: {
                                closeClick: !1
                            }
                        }
                    }), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), "auto" === l.height && (l.autoHeight = !0), l.group = a.group, l.index = t, a.coming = l, !1 === a.trigger("beforeLoad")) return void(a.coming = null);
                if (o = l.type, i = l.href, !o) return a.coming = null, !(!a.current || !a.router || "jumpto" === a.router) && (a.current.index = t, a[a.router](a.direction));
                if (a.isActive = !0, "image" !== o && "swf" !== o || (l.autoHeight = l.autoWidth = !1, l.scrolling = "visible"), "image" === o && (l.aspectRatio = !0), "iframe" === o && c && (l.scrolling = "scroll"), l.wrap = n(l.tpl.wrap).addClass("tinybox-" + (c ? "mobile" : "desktop") + " tinybox-type-" + o + " tinybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), n.extend(l, {
                        skin: n(".tinybox-skin", l.wrap),
                        outer: n(".tinybox-outer", l.wrap),
                        inner: n(".tinybox-inner", l.wrap)
                    }), n.each(["Top", "Right", "Bottom", "Left"], function(t, e) {
                        l.skin.css("padding" + e, g(l.padding[t]))
                    }), a.trigger("onReady"), "inline" === o || "html" === o) {
                    if (!l.content || !l.content.length) return a._error("content")
                }
                else if (!i) return a._error("href");
                "image" === o ? a._loadImage() : "ajax" === o ? a._loadAjax() : "iframe" === o ? a._loadIframe() : a._afterLoad()
            },
            _error: function(t) {
                n.extend(a.coming, {
                    type: "html",
                    autoWidth: !0,
                    autoHeight: !0,
                    minWidth: 0,
                    minHeight: 0,
                    scrolling: "no",
                    hasError: t,
                    content: a.coming.tpl.error
                }), a._afterLoad()
            },
            _loadImage: function() {
                var t = a.imgPreload = new Image;
                t.onload = function() {
                    this.onload = this.onerror = null, a.coming.width = this.width / a.opts.pixelRatio, a.coming.height = this.height / a.opts.pixelRatio, a._afterLoad()
                }, t.onerror = function() {
                    this.onload = this.onerror = null, a._error("image")
                }, t.src = a.coming.href, t.complete !== !0 && a.showLoading()
            },
            _loadAjax: function() {
                var t = a.coming;
                a.showLoading(), a.ajaxLoad = n.ajax(n.extend({}, t.ajax, {
                    url: t.href,
                    error: function(t, e) {
                        a.coming && "abort" !== e ? a._error("ajax", t) : a.hideLoading()
                    },
                    success: function(e, n) {
                        "success" === n && (t.content = e, a._afterLoad())
                    }
                }))
            },
            _loadIframe: function() {
                var t = a.coming,
                    e = n(t.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", c ? "auto" : t.iframe.scrolling).attr("src", t.href);
                n(t.wrap).bind("onReset", function() {
                    try {
                        n(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                    }
                    catch (t) {}
                }), t.iframe.preload && (a.showLoading(), e.one("load", function() {
                    n(this).data("ready", 1), c || n(this).bind("load.fb", a.update), n(this).parents(".tinybox-wrap").width("100%").removeClass("tinybox-tmp").show(), a._afterLoad()
                })), t.content = e.appendTo(t.inner), t.iframe.preload || a._afterLoad()
            },
            _preloadImages: function() {
                var t, e, n = a.group,
                    i = a.current,
                    o = n.length,
                    r = i.preload ? Math.min(i.preload, o - 1) : 0;
                for (e = 1; e <= r; e += 1) t = n[(i.index + e) % o], "image" === t.type && t.href && ((new Image).src = t.href)
            },
            _afterLoad: function() {
                var t, e, i, o, r, s, l = a.coming,
                    u = a.current,
                    c = "tinybox-placeholder";
                if (a.hideLoading(), l && a.isActive !== !1) {
                    if (!1 === a.trigger("afterLoad", l, u)) return l.wrap.stop(!0).trigger("onReset").remove(), void(a.coming = null);
                    switch (u && (a.trigger("beforeChange", u), u.wrap.stop(!0).removeClass("tinybox-opened").find(".tinybox-item, .tinybox-nav").remove()), a.unbindEvents(), t = l, e = l.content, i = l.type, o = l.scrolling, n.extend(a, {
                        wrap: t.wrap,
                        skin: t.skin,
                        outer: t.outer,
                        inner: t.inner,
                        current: t,
                        previous: u
                    }), r = t.href, i) {
                        case "inline":
                        case "ajax":
                        case "html":
                            t.selector ? e = n("<div>").html(e).find(t.selector) : h(e) && (e.data(c) || e.data(c, n('<div class="' + c + '"></div>').insertAfter(e).hide()), e = e.show().detach(), t.wrap.bind("onReset", function() {
                                n(this).find(e).length && e.hide().replaceAll(e.data(c)).data(c, !1)
                            }));
                            break;
                        case "image":
                            e = t.tpl.image.replace(/\{href\}/g, r);
                            break;
                        case "swf":
                            e = '<object id="tinybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + r + '"></param>', s = "", n.each(t.swf, function(t, n) {
                                e += '<param name="' + t + '" value="' + n + '"></param>', s += " " + t + '="' + n + '"'
                            }), e += '<embed src="' + r + '" type="application/x-shockwave-flash" width="100%" height="100%"' + s + "></embed></object>"
                    }
                    h(e) && e.parent().is(t.inner) || t.inner.append(e), a.trigger("beforeShow"), t.inner.css("overflow", "yes" === o ? "scroll" : "no" === o ? "hidden" : o), a._setDimension(), a.reposition(), a.isOpen = !1, a.coming = null, a.bindEvents(), a.isOpened ? u.prevMethod && a.transitions[u.prevMethod]() : n(".tinybox-wrap").not(t.wrap).stop(!0).trigger("onReset").remove(), a.transitions[a.isOpened ? t.nextMethod : t.openMethod](), a._preloadImages()
                }
            },
            _setDimension: function() {
                var t, e, i, o, r, s, l, u, c, h, d, f, v, y, b, w = a.getViewport(),
                    x = 0,
                    _ = !1,
                    k = !1,
                    T = a.wrap,
                    C = a.skin,
                    $ = a.inner,
                    S = a.current,
                    F = S.width,
                    j = S.height,
                    E = S.minWidth,
                    P = S.minHeight,
                    M = S.maxWidth,
                    A = S.maxHeight,
                    O = S.scrolling,
                    D = S.scrollOutside ? S.scrollbarWidth : 0,
                    N = S.margin,
                    L = m(N[1] + N[3]),
                    R = m(N[0] + N[2]);
                if (T.add(C).add($).width("auto").height("auto").removeClass("tinybox-tmp"), t = m(C.outerWidth(!0) - C.width()), e = m(C.outerHeight(!0) - C.height()), i = L + t, o = R + e, r = p(F) ? (w.w - i) * m(F) / 100 : F, s = p(j) ? (w.h - o) * m(j) / 100 : j, "iframe" === S.type) {
                    if (y = S.content, S.autoHeight && 1 === y.data("ready")) try {
                        y[0].contentWindow.document.location && ($.width(r).height(9999), b = y.contents().find("body"), D && b.css("overflow-x", "hidden"), s = b.outerHeight(!0))
                    }
                    catch (I) {}
                }
                else(S.autoWidth || S.autoHeight) && ($.addClass("tinybox-tmp"), S.autoWidth || $.width(r), S.autoHeight || $.height(s), S.autoWidth && (r = $.width()), S.autoHeight && (s = $.height()), $.removeClass("tinybox-tmp"));
                if (F = m(r), j = m(s), c = r / s, E = m(p(E) ? m(E, "w") - i : E), M = m(p(M) ? m(M, "w") - i : M), P = m(p(P) ? m(P, "h") - o : P), A = m(p(A) ? m(A, "h") - o : A), l = M, u = A, S.fitToView && (M = Math.min(w.w - i, M), A = Math.min(w.h - o, A)), f = w.w - L, v = w.h - R, S.aspectRatio ? (F > M && (F = M, j = m(F / c)), j > A && (j = A, F = m(j * c)), F < E && (F = E, j = m(F / c)), j < P && (j = P, F = m(j * c))) : (F = Math.max(E, Math.min(F, M)), S.autoHeight && "iframe" !== S.type && ($.width(F), j = $.height()), j = Math.max(P, Math.min(j, A))), S.fitToView)
                    if ($.width(F).height(j), T.width(F + t), h = T.width(), d = T.height(), S.aspectRatio)
                        for (;
                            (h > f || d > v) && F > E && j > P && !(x++ > 19);) j = Math.max(P, Math.min(A, j - 10)), F = m(j * c), F < E && (F = E, j = m(F / c)), F > M && (F = M, j = m(F / c)), $.width(F).height(j), T.width(F + t), h = T.width(), d = T.height();
                    else F = Math.max(E, Math.min(F, F - (h - f))), j = Math.max(P, Math.min(j, j - (d - v)));
                D && "auto" === O && j < s && F + t + D < f && (F += D), $.width(F).height(j), T.width(F + t), h = T.width(), d = T.height(), _ = (h > f || d > v) && F > E && j > P, k = S.aspectRatio ? F < l && j < u && F < r && j < s : (F < l || j < u) && (F < r || j < s), n.extend(S, {
                    dim: {
                        width: g(h),
                        height: g(d)
                    },
                    origWidth: r,
                    origHeight: s,
                    canShrink: _,
                    canExpand: k,
                    wPadding: t,
                    hPadding: e,
                    wrapSpace: d - C.outerHeight(!0),
                    skinSpace: C.height() - j
                }), !y && S.autoHeight && j > P && j < A && !k && $.height("auto")
            },
            _getPosition: function(t) {
                var e = a.current,
                    n = a.getViewport(),
                    i = e.margin,
                    o = a.wrap.width() + i[1] + i[3],
                    r = a.wrap.height() + i[0] + i[2],
                    s = {
                        position: "absolute",
                        top: i[0],
                        left: i[3]
                    };
                return e.autoCenter && e.fixed && !t && r <= n.h && o <= n.w ? s.position = "fixed" : e.locked || (s.top += n.y, s.left += n.x), s.top = g(Math.max(s.top, s.top + (n.h - r) * e.topRatio)), s.left = g(Math.max(s.left, s.left + (n.w - o) * e.leftRatio)), s
            },
            _afterZoomIn: function() {
                var t = a.current;
                t && (a.isOpen = a.isOpened = !0, a.wrap.css("overflow", "visible").addClass("tinybox-opened"), a.update(), (t.closeClick || t.nextClick && a.group.length > 1) && a.inner.css("cursor", "pointer").bind("click.fb", function(e) {
                    n(e.target).is("a") || n(e.target).parent().is("a") || (e.preventDefault(), a[t.closeClick ? "close" : "next"]())
                }), t.closeBtn && n(t.tpl.closeBtn).appendTo(a.skin).bind("click.fb", function(t) {
                    t.preventDefault(), a.close()
                }), t.arrows && a.group.length > 1 && ((t.loop || t.index > 0) && n(t.tpl.prev).appendTo(a.outer).bind("click.fb", a.prev), (t.loop || t.index < a.group.length - 1) && n(t.tpl.next).appendTo(a.outer).bind("click.fb", a.next)), a.trigger("afterShow"), t.loop || t.index !== t.group.length - 1 ? a.opts.autoPlay && !a.player.isActive && (a.opts.autoPlay = !1, a.play(!0)) : a.play(!1))
            },
            _afterZoomOut: function(t) {
                t = t || a.current, n(".tinybox-wrap").trigger("onReset").remove(), n.extend(a, {
                    group: {},
                    opts: {},
                    router: !1,
                    current: null,
                    isActive: !1,
                    isOpened: !1,
                    isOpen: !1,
                    isClosing: !1,
                    wrap: null,
                    skin: null,
                    outer: null,
                    inner: null
                }), a.trigger("afterClose", t)
            }
        }), a.transitions = {
            getOrigPosition: function() {
                var t = a.current,
                    e = t.element,
                    n = t.orig,
                    i = {},
                    o = 50,
                    r = 50,
                    s = t.hPadding,
                    l = t.wPadding,
                    u = a.getViewport();
                return !n && t.isDom && e.is(":visible") && (n = e.find("img:first"), n.length || (n = e)), h(n) ? (i = n.offset(), n.is("img") && (o = n.outerWidth(), r = n.outerHeight())) : (i.top = u.y + (u.h - r) * t.topRatio, i.left = u.x + (u.w - o) * t.leftRatio), ("fixed" === a.wrap.css("position") || t.locked) && (i.top -= u.y, i.left -= u.x), i = {
                    top: g(i.top - s * t.topRatio),
                    left: g(i.left - l * t.leftRatio),
                    width: g(o + l),
                    height: g(r + s)
                }
            },
            step: function(t, e) {
                var n, i, o, r = e.prop,
                    s = a.current,
                    l = s.wrapSpace,
                    u = s.skinSpace;
                "width" !== r && "height" !== r || (n = e.end === e.start ? 1 : (t - e.start) / (e.end - e.start), a.isClosing && (n = 1 - n), i = "width" === r ? s.wPadding : s.hPadding, o = t - i, a.skin[r](m("width" === r ? o : o - l * n)), a.inner[r](m("width" === r ? o : o - l * n - u * n)))
            },
            zoomIn: function() {
                var t = a.current,
                    e = t.pos,
                    i = t.openEffect,
                    o = "elastic" === i,
                    r = n.extend({
                        opacity: 1
                    }, e);
                delete r.position, o ? (e = this.getOrigPosition(), t.openOpacity && (e.opacity = .1)) : "fade" === i && (e.opacity = .1), a.wrap.css(e).animate(r, {
                    duration: "none" === i ? 0 : t.openSpeed,
                    easing: t.openEasing,
                    step: o ? this.step : null,
                    complete: a._afterZoomIn
                })
            },
            zoomOut: function() {
                var t = a.current,
                    e = t.closeEffect,
                    n = "elastic" === e,
                    i = {
                        opacity: .1
                    };
                n && (i = this.getOrigPosition(), t.closeOpacity && (i.opacity = .1)), a.wrap.animate(i, {
                    duration: "none" === e ? 0 : t.closeSpeed,
                    easing: t.closeEasing,
                    step: n ? this.step : null,
                    complete: a._afterZoomOut
                })
            },
            changeIn: function() {
                var t, e = a.current,
                    n = e.nextEffect,
                    i = e.pos,
                    o = {
                        opacity: 1
                    },
                    r = a.direction,
                    s = 200;
                i.opacity = .1, "elastic" === n && (t = "down" === r || "up" === r ? "top" : "left", "down" === r || "right" === r ? (i[t] = g(m(i[t]) - s), o[t] = "+=" + s + "px") : (i[t] = g(m(i[t]) + s), o[t] = "-=" + s + "px")), "none" === n ? a._afterZoomIn() : a.wrap.css(i).animate(o, {
                    duration: e.nextSpeed,
                    easing: e.nextEasing,
                    complete: a._afterZoomIn
                })
            },
            changeOut: function() {
                var t = a.previous,
                    e = t.prevEffect,
                    i = {
                        opacity: .1
                    },
                    o = a.direction,
                    r = 200;
                "elastic" === e && (i["down" === o || "up" === o ? "top" : "left"] = ("up" === o || "left" === o ? "-" : "+") + "=" + r + "px"), t.wrap.animate(i, {
                    duration: "none" === e ? 0 : t.prevSpeed,
                    easing: t.prevEasing,
                    complete: function() {
                        n(this).trigger("onReset").remove()
                    }
                })
            }
        }, a.helpers.overlay = {
            defaults: {
                closeClick: !0,
                speedOut: 200,
                showEarly: !0,
                css: {},
                locked: !c,
                fixed: !0
            },
            overlay: null,
            fixed: !1,
            el: n("html"),
            create: function(t) {
                var e;
                t = n.extend({}, this.defaults, t), this.overlay && this.close(), e = a.coming ? a.coming.parent : t.parent, this.overlay = n('<div class="tinybox-overlay"></div>').appendTo(e && e.lenth ? e : "body"), this.fixed = !1, t.fixed && a.defaults.fixed && (this.overlay.addClass("tinybox-overlay-fixed"), this.fixed = !0)
            },
            open: function(t) {
                var e = this;
                t = n.extend({}, this.defaults, t), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(t), this.fixed || (r.bind("resize.overlay", n.proxy(this.update, this)), this.update()), t.closeClick && this.overlay.bind("click.overlay", function(t) {
                    if (n(t.target).hasClass("tinybox-overlay")) return a.isActive ? a.close() : e.close(), !1
                }), this.overlay.css(t.css).show()
            },
            close: function() {
                r.unbind("resize.overlay"), this.el.hasClass("tinybox-lock") && (n(".tinybox-margin").removeClass("tinybox-margin"), this.el.removeClass("tinybox-lock"), r.scrollTop(this.scrollV).scrollLeft(this.scrollH)), n(".tinybox-overlay").remove().hide(), n.extend(this, {
                    overlay: null,
                    fixed: !1
                })
            },
            update: function() {
                var t, n = "100%";
                this.overlay.width(n).height("100%"), l ? (t = Math.max(e.documentElement.offsetWidth, e.body.offsetWidth), s.width() > t && (n = s.width())) : s.width() > r.width() && (n = s.width()), this.overlay.width(n).height(s.height())
            },
            onReady: function(t, e) {
                var i = this.overlay;
                n(".tinybox-overlay").stop(!0, !0), i || this.create(t), t.locked && this.fixed && e.fixed && (e.locked = this.overlay.append(e.wrap), e.fixed = !1), t.showEarly === !0 && this.beforeShow.apply(this, arguments)
            },
            beforeShow: function(t, e) {
                e.locked && !this.el.hasClass("tinybox-lock") && (this.fixPosition !== !1 && n("*").filter(function() {
                    return "fixed" === n(this).css("position") && !n(this).hasClass("tinybox-overlay") && !n(this).hasClass("tinybox-wrap")
                }).addClass("tinybox-margin"), this.el.addClass("tinybox-margin"), this.scrollV = r.scrollTop(), this.scrollH = r.scrollLeft(), this.el.addClass("tinybox-lock"), r.scrollTop(this.scrollV).scrollLeft(this.scrollH)), this.open(t)
            },
            onUpdate: function() {
                this.fixed || this.update()
            },
            afterClose: function(t) {
                this.overlay && !a.coming && this.overlay.fadeOut(t.speedOut, n.proxy(this.close, this))
            }
        }, a.helpers.title = {
            defaults: {
                type: "float",
                position: "bottom"
            },
            beforeShow: function(t) {
                var e, i, o = a.current,
                    r = o.title,
                    s = t.type;
                if (n.isFunction(r) && (r = r.call(o.element, o)), d(r) && "" !== n.trim(r)) {
                    switch (e = n('<div class="tinybox-title tinybox-title-' + s + '-wrap">' + r + "</div>"), s) {
                        case "inside":
                            i = a.skin;
                            break;
                        case "outside":
                            i = a.wrap;
                            break;
                        case "over":
                            i = a.inner;
                            break;
                        default:
                            i = a.skin, e.appendTo("body"), l && e.width(e.width()), e.wrapInner('<span class="child"></span>'), a.current.margin[2] += Math.abs(m(e.css("margin-bottom")))
                    }
                    e["top" === t.position ? "prependTo" : "appendTo"](i)
                }
            }
        }, n.fn.tinybox = function(t) {
            var e, i = n(this),
                o = this.selector || "",
                r = function(r) {
                    var s, l, u = n(this).blur(),
                        c = e;
                    r.ctrlKey || r.altKey || r.shiftKey || r.metaKey || u.is(".tinybox-wrap") || (s = t.groupAttr || "data-tinybox-group", l = u.attr(s), l || (s = "rel", l = u.get(0)[s]), l && "" !== l && "nofollow" !== l && (u = o.length ? n(o) : i, u = u.filter("[" + s + '="' + l + '"]'), c = u.index(this)), t.index = c, a.open(u, t) !== !1 && r.preventDefault())
                };
            return t = t || {}, e = t.index || 0, o && t.live !== !1 ? s.undelegate(o, "click.fb-start").delegate(o + ":not('.tinybox-item, .tinybox-nav')", "click.fb-start", r) : i.unbind("click.fb-start").bind("click.fb-start", r), this.filter("[data-tinybox-start=1]").trigger("click"), this
        }, s.ready(function() {
            n.scrollbarWidth === i && (n.scrollbarWidth = function() {
                var t = n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                    e = t.children(),
                    i = e.innerWidth() - e.height(99).innerWidth();
                return t.remove(), i
            }), n.support.fixedPosition === i && (n.support.fixedPosition = function() {
                var t = n('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                    e = 20 === t[0].offsetTop || 15 === t[0].offsetTop;
                return t.remove(), e
            }()), n.extend(a.defaults, {
                scrollbarWidth: n.scrollbarWidth(),
                fixed: n.support.fixedPosition,
                parent: n("body")
            })
        }), s.load(function() {
            var e, i;
            e = n(t).width(), o.addClass("tinybox-lock-test"), i = n(t).width(), o.removeClass("tinybox-lock-test"), n("<style type='text/css'>.tinybox-margin{margin-right:" + (i - e) + "px !important;}</style>").appendTo("head")
        })
    }(window, document, jQuery),
    function(t) {
        "use strict";
        var e = t.tinybox,
            n = function(e, n, i) {
                return i = i || "", "object" === t.type(i) && (i = t.param(i, !0)), t.each(n, function(t, n) {
                    e = e.replace("$" + t, n || "")
                }), i.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + i), e
            };
        e.helpers.media = {
            defaults: {
                youtube: {
                    matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                    params: {
                        autoplay: 1,
                        autohide: 1,
                        fs: 1,
                        rel: 0,
                        hd: 1,
                        wmode: "opaque",
                        enablejsapi: 1
                    },
                    type: "iframe",
                    url: "//www.youtube.com/embed/$3"
                },
                vimeo: {
                    matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                    params: {
                        autoplay: 1,
                        hd: 1,
                        show_title: 1,
                        show_byline: 1,
                        show_portrait: 0,
                        fullscreen: 1
                    },
                    type: "iframe",
                    url: "//player.vimeo.com/video/$1"
                },
                metacafe: {
                    matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                    params: {
                        autoPlay: "yes"
                    },
                    type: "swf",
                    url: function(e, n, i) {
                        return i.swf.flashVars = "playerVars=" + t.param(n, !0), "//www.metacafe.com/fplayer/" + e[1] + "/.swf"
                    }
                },
                dailymotion: {
                    matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
                    params: {
                        additionalInfos: 0,
                        autoStart: 1
                    },
                    type: "swf",
                    url: "//www.dailymotion.com/swf/video/$1"
                },
                twitvid: {
                    matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                    params: {
                        autoplay: 0
                    },
                    type: "iframe",
                    url: "//www.twitvid.com/embed.php?guid=$1"
                },
                twitpic: {
                    matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                    type: "image",
                    url: "//twitpic.com/show/full/$1/"
                },
                instagram: {
                    matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                    type: "image",
                    url: "//$1/p/$2/media/?size=l"
                },
                google_maps: {
                    matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                    type: "iframe",
                    url: function(t) {
                        return "//maps.google." + t[1] + "/" + t[3] + t[4] + "&output=" + (t[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
                    }
                }
            },
            beforeLoad: function(e, i) {
                var o, r, s, a, l = i.href || "",
                    u = !1;
                for (o in e)
                    if (e.hasOwnProperty(o) && (r = e[o], s = l.match(r.matcher))) {
                        u = r.type, a = t.extend(!0, {}, r.params, i[o] || (t.isPlainObject(e[o]) ? e[o].params : null)), l = "function" === t.type(r.url) ? r.url.call(this, s, a, i) : n(r.url, s, a);
                        break
                    }
                u && (i.href = l, i.type = u, i.autoHeight = !1)
            }
        }
    }(jQuery),
    function(t) {
        t.InFieldLabels = function(e, n, i) {
            var o = this;
            o.$label = t(e), o.label = e, o.$field = t(n), o.field = n, o.$label.data("InFieldLabels", o), o.showing = !0, o.init = function() {
                var e;
                o.options = t.extend({}, t.InFieldLabels.defaultOptions, i), o.options.className && o.$label.addClass(o.options.className), setTimeout(function() {
                    "" !== o.$field.val() ? (o.$label.hide(), o.showing = !1) : (o.$label.show(), o.showing = !0)
                }, 200), o.$field.focus(function() {
                    o.fadeOnFocus()
                }).blur(function() {
                    o.checkForEmpty(!0)
                }).bind("keydown.infieldlabel", function(t) {
                    o.hideOnChange(t)
                }).bind("paste", function() {
                    o.setOpacity(0)
                }).change(function() {
                    o.checkForEmpty()
                }).bind("onPropertyChange", function() {
                    o.checkForEmpty()
                }).bind("keyup.infieldlabel", function() {
                    o.checkForEmpty()
                }), o.options.pollDuration > 0 && (e = setInterval(function() {
                    "" !== o.$field.val() && (o.$label.hide(), o.showing = !1, clearInterval(e))
                }, o.options.pollDuration))
            }, o.fadeOnFocus = function() {
                o.showing && o.setOpacity(o.options.fadeOpacity)
            }, o.setOpacity = function(t) {
                o.$label.stop().animate({
                    opacity: t
                }, o.options.fadeDuration, function() {
                    0 == t && o.$label.hide()
                }), o.showing = t > 0
            }, o.checkForEmpty = function(t) {
                "" === o.$field.val() ? (o.prepForShow(), o.setOpacity(t ? 1 : o.options.fadeOpacity)) : o.setOpacity(0)
            }, o.prepForShow = function() {
                o.showing || (o.$label.css({
                    opacity: 0
                }).show(), o.$field.bind("keydown.infieldlabel", function(t) {
                    o.hideOnChange(t)
                }))
            }, o.hideOnChange = function(t) {
                16 !== t.keyCode && 9 !== t.keyCode && (o.showing && (o.$label.hide(), o.showing = !1), o.$field.unbind("keydown.infieldlabel"))
            }, o.init()
        }, t.InFieldLabels.defaultOptions = {
            fadeOpacity: .5,
            fadeDuration: 300,
            pollDuration: 0,
            enabledInputTypes: ["text", "search", "tel", "url", "email", "password", "number", "textarea"],
            className: !1
        }, t.fn.inFieldLabels = function(e) {
            var n = e && e.enabledInputTypes || t.InFieldLabels.defaultOptions.enabledInputTypes;
            return this.each(function() {
                var i, o, r = t(this).attr("for");
                r && (i = document.getElementById(r), i && (o = t.inArray(i.type, n), o === -1 && "TEXTAREA" !== i.nodeName || new t.InFieldLabels(this, i, e)))
            })
        }
    }(jQuery),
    function(t) {
        t.fn.responsiveHero = function(e) {
            function n(t, e) {
                return void 0 == e && (e = 16), t / e + "em"
            }

            function i() {
                var e = 0;
                return l.container.children().each(function() {
                    e += t(this).outerHeight(!0)
                }), e
            }

            function o(e) {
                return "object" == typeof e ? t(e).outerHeight(!0) : e
            }

            function r() {
                var e = o(l.navigationHeight),
                    r = o(l.logoContainerHeight),
                    s = t(window),
                    a = s.outerHeight();
                if (s.innerWidth() > l.desktopWidth || l.calculateOnMobile === !0) {
                    var u = Math.round((a - r - e - i()) / 2);
                    u < l.remainingSpaceMin ? u = l.remainingSpaceMin : u > l.remainingSpaceMax && (u = l.remainingSpaceMax), l.container.css({
                        paddingTop: n(u + l.containerOffsetTop),
                        paddingBottom: n(u - l.containerOffsetTop)
                    })
                }
                else l.container.attr("style", null);
                "" !== l.backstretchImageUrl && l.hero.backstretch("resize")
            }
            var s, a = {
                    hero: t(this),
                    container: t(".hero-container"),
                    navigationHeight: 0,
                    logoContainerHeight: 0,
                    backstretchImageUrl: "",
                    remainingSpaceMin: 200,
                    remainingSpaceMax: 350,
                    desktopWidth: 1024,
                    containerOffsetTop: 0,
                    calculateOnMobile: !1,
                    windowDebounce: 200
                },
                l = t.extend({}, a, e);
            window.onresize = function() {
                clearTimeout(s), s = setTimeout(r, l.windowDebounce)
            }, r(), "" !== l.backstretchImageUrl && l.hero.backstretch(l.backstretchImageUrl)
        }
    }(jQuery),
    function(t) {
        t.extend(t.fn, {
            validate: function(e) {
                if (!this.length) return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
                var n = t.data(this[0], "validator");
                return n ? n : (this.attr("novalidate", "novalidate"), n = new t.validator(e, this[0]), t.data(this[0], "validator", n), n.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
                    n.settings.submitHandler && (n.submitButton = e.target), t(e.target).hasClass("cancel") && (n.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (n.cancelSubmit = !0)
                }), this.submit(function(e) {
                    function i() {
                        var i;
                        return !n.settings.submitHandler || (n.submitButton && (i = t("<input type='hidden'/>").attr("name", n.submitButton.name).val(t(n.submitButton).val()).appendTo(n.currentForm)), n.settings.submitHandler.call(n, n.currentForm, e), n.submitButton && i.remove(), !1)
                    }
                    return n.settings.debug && e.preventDefault(), n.cancelSubmit ? (n.cancelSubmit = !1, i()) : n.form() ? n.pendingRequest ? (n.formSubmitted = !0, !1) : i() : (n.focusInvalid(), !1)
                })), n)
            },
            valid: function() {
                if (t(this[0]).is("form")) return this.validate().form();
                var e = !0,
                    n = t(this[0].form).validate();
                return this.each(function() {
                    e = e && n.element(this)
                }), e
            },
            removeAttrs: function(e) {
                var n = {},
                    i = this;
                return t.each(e.split(/\s/), function(t, e) {
                    n[e] = i.attr(e), i.removeAttr(e)
                }), n
            },
            rules: function(e, n) {
                var i = this[0];
                if (e) {
                    var o = t.data(i.form, "validator").settings,
                        r = o.rules,
                        s = t.validator.staticRules(i);
                    switch (e) {
                        case "add":
                            t.extend(s, t.validator.normalizeRule(n)), delete s.messages, r[i.name] = s, n.messages && (o.messages[i.name] = t.extend(o.messages[i.name], n.messages));
                            break;
                        case "remove":
                            if (!n) return delete r[i.name], s;
                            var a = {};
                            return t.each(n.split(/\s/), function(t, e) {
                                a[e] = s[e], delete s[e]
                            }), a
                    }
                }
                var l = t.validator.normalizeRules(t.extend({}, t.validator.classRules(i), t.validator.attributeRules(i), t.validator.dataRules(i), t.validator.staticRules(i)), i);
                if (l.required) {
                    var u = l.required;
                    delete l.required, l = t.extend({
                        required: u
                    }, l)
                }
                return l
            }
        }), t.extend(t.expr[":"], {
            blank: function(e) {
                return !t.trim("" + t(e).val())
            },
            filled: function(e) {
                return !!t.trim("" + t(e).val())
            },
            unchecked: function(e) {
                return !t(e).prop("checked")
            }
        }), t.validator = function(e, n) {
            this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = n, this.init()
        }, t.validator.format = function(e, n) {
            return 1 === arguments.length ? function() {
                var n = t.makeArray(arguments);
                return n.unshift(e), t.validator.format.apply(this, n)
            } : (arguments.length > 2 && n.constructor !== Array && (n = t.makeArray(arguments).slice(1)), n.constructor !== Array && (n = [n]), t.each(n, function(t, n) {
                e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function() {
                    return n
                })
            }), e)
        }, t.extend(t.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusInvalid: !0,
                errorContainer: t([]),
                errorLabelContainer: t([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function(t, e) {
                    this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
                },
                onfocusout: function(t, e) {
                    this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
                },
                onkeyup: function(t, e) {
                    9 === e.which && "" === this.elementValue(t) || (t.name in this.submitted || t === this.lastElement) && this.element(t)
                },
                onclick: function(t, e) {
                    t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
                },
                highlight: function(e, n, i) {
                    "radio" === e.type ? this.findByName(e.name).addClass(n).removeClass(i) : t(e).addClass(n).removeClass(i)
                },
                unhighlight: function(e, n, i) {
                    "radio" === e.type ? this.findByName(e.name).removeClass(n).addClass(i) : t(e).removeClass(n).addClass(i)
                }
            },
            setDefaults: function(e) {
                t.extend(t.validator.defaults, e)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: t.validator.format("Please enter no more than {0} characters."),
                minlength: t.validator.format("Please enter at least {0} characters."),
                rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
                range: t.validator.format("Please enter a value between {0} and {1}."),
                max: t.validator.format("Please enter a value less than or equal to {0}."),
                min: t.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function() {
                    function e(e) {
                        var n = t.data(this[0].form, "validator"),
                            i = "on" + e.type.replace(/^validate/, "");
                        n.settings[i] && n.settings[i].call(n, this[0], e)
                    }
                    this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var n = this.groups = {};
                    t.each(this.settings.groups, function(e, i) {
                        "string" == typeof i && (i = i.split(/\s/)), t.each(i, function(t, i) {
                            n[i] = e
                        })
                    });
                    var i = this.settings.rules;
                    t.each(i, function(e, n) {
                        i[e] = t.validator.normalizeRule(n)
                    }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                },
                form: function() {
                    return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function() {
                    this.prepareForm();
                    for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                    return this.valid()
                },
                element: function(e) {
                    e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                    var n = this.check(e) !== !1;
                    return n ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), n
                },
                showErrors: function(e) {
                    if (e) {
                        t.extend(this.errorMap, e), this.errorList = [];
                        for (var n in e) this.errorList.push({
                            message: e[n],
                            element: this.findByName(n)[0]
                        });
                        this.successList = t.grep(this.successList, function(t) {
                            return !(t.name in e)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function() {
                    t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
                },
                numberOfInvalids: function() {
                    return this.objectLength(this.invalid)
                },
                objectLength: function(t) {
                    var e = 0;
                    for (var n in t) e++;
                    return e
                },
                hideErrors: function() {
                    this.addWrapper(this.toHide).hide()
                },
                valid: function() {
                    return 0 === this.size()
                },
                size: function() {
                    return this.errorList.length
                },
                focusInvalid: function() {
                    if (this.settings.focusInvalid) try {
                        t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    }
                    catch (e) {}
                },
                findLastActive: function() {
                    var e = this.lastActive;
                    return e && 1 === t.grep(this.errorList, function(t) {
                        return t.element.name === e.name
                    }).length && e
                },
                elements: function() {
                    var e = this,
                        n = {};
                    return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                        return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), !(this.name in n || !e.objectLength(t(this).rules())) && (n[this.name] = !0, !0)
                    })
                },
                clean: function(e) {
                    return t(e)[0]
                },
                errors: function() {
                    var e = this.settings.errorClass.replace(" ", ".");
                    return t(this.settings.errorElement + "." + e, this.errorContext)
                },
                reset: function() {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
                },
                prepareForm: function() {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function(t) {
                    this.reset(), this.toHide = this.errorsFor(t)
                },
                elementValue: function(e) {
                    var n = t(e).attr("type"),
                        i = t(e).val();
                    return "radio" === n || "checkbox" === n ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof i ? i.replace(/\r/g, "") : i
                },
                check: function(e) {
                    e = this.validationTargetFor(this.clean(e));
                    var n, i = t(e).rules(),
                        o = !1,
                        r = this.elementValue(e);
                    for (var s in i) {
                        var a = {
                            method: s,
                            parameters: i[s]
                        };
                        try {
                            if (n = t.validator.methods[s].call(this, r, e, a.parameters), "dependency-mismatch" === n) {
                                o = !0;
                                continue
                            }
                            if (o = !1, "pending" === n) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                            if (!n) return this.formatAndAdd(e, a), !1
                        }
                        catch (l) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + a.method + "' method.", l), l
                        }
                    }
                    if (!o) return this.objectLength(i) && this.successList.push(e), !0
                },
                customDataMessage: function(e, n) {
                    return t(e).data("msg-" + n.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + n.toLowerCase())
                },
                customMessage: function(t, e) {
                    var n = this.settings.messages[t];
                    return n && (n.constructor === String ? n : n[e])
                },
                findDefined: function() {
                    for (var t = 0; t < arguments.length; t++)
                        if (void 0 !== arguments[t]) return arguments[t]
                },
                defaultMessage: function(e, n) {
                    return this.findDefined(this.customMessage(e.name, n), this.customDataMessage(e, n), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[n], "<strong>Warning: No message defined for " + e.name + "</strong>")
                },
                formatAndAdd: function(e, n) {
                    var i = this.defaultMessage(e, n.method),
                        o = /\$?\{(\d+)\}/g;
                    "function" == typeof i ? i = i.call(this, n.parameters, e) : o.test(i) && (i = t.validator.format(i.replace(o, "{$1}"), n.parameters)), this.errorList.push({
                        message: i,
                        element: e
                    }), this.errorMap[e.name] = i, this.submitted[e.name] = i
                },
                addWrapper: function(t) {
                    return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
                },
                defaultShowErrors: function() {
                    var t, e;
                    for (t = 0; this.errorList[t]; t++) {
                        var n = this.errorList[t];
                        this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message)
                    }
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                    if (this.settings.unhighlight)
                        for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function() {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function() {
                    return t(this.errorList).map(function() {
                        return this.element
                    })
                },
                showLabel: function(e, n) {
                    var i = this.errorsFor(e);
                    i.length ? (i.removeClass(this.settings.validClass).addClass(this.settings.errorClass), i.html(n)) : (i = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(n || ""), this.settings.wrapper && (i = i.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(i).length || (this.settings.errorPlacement ? this.settings.errorPlacement(i, t(e)) : i.insertAfter(e))), !n && this.settings.success && (i.text(""), "string" == typeof this.settings.success ? i.addClass(this.settings.success) : this.settings.success(i, e)), this.toShow = this.toShow.add(i)
                },
                errorsFor: function(e) {
                    var n = this.idOrName(e);
                    return this.errors().filter(function() {
                        return t(this).attr("for") === n
                    })
                },
                idOrName: function(t) {
                    return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
                },
                validationTargetFor: function(t) {
                    return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
                },
                checkable: function(t) {
                    return /radio|checkbox/i.test(t.type)
                },
                findByName: function(e) {
                    return t(this.currentForm).find("[name='" + e + "']")
                },
                getLength: function(e, n) {
                    switch (n.nodeName.toLowerCase()) {
                        case "select":
                            return t("option:selected", n).length;
                        case "input":
                            if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length
                    }
                    return e.length
                },
                depend: function(t, e) {
                    return !this.dependTypes[typeof t] || this.dependTypes[typeof t](t, e)
                },
                dependTypes: {
                    "boolean": function(t, e) {
                        return t
                    },
                    string: function(e, n) {
                        return !!t(e, n.form).length
                    },
                    "function": function(t, e) {
                        return t(e)
                    }
                },
                optional: function(e) {
                    var n = this.elementValue(e);
                    return !t.validator.methods.required.call(this, n, e) && "dependency-mismatch"
                },
                startRequest: function(t) {
                    this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
                },
                stopRequest: function(e, n) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], n && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !n && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function(e) {
                    return t.data(e, "previousValue") || t.data(e, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(e, "remote")
                    })
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function(e, n) {
                e.constructor === String ? this.classRuleSettings[e] = n : t.extend(this.classRuleSettings, e)
            },
            classRules: function(e) {
                var n = {},
                    i = t(e).attr("class");
                return i && t.each(i.split(" "), function() {
                    this in t.validator.classRuleSettings && t.extend(n, t.validator.classRuleSettings[this])
                }), n
            },
            attributeRules: function(e) {
                var n = {},
                    i = t(e),
                    o = i[0].getAttribute("type");
                for (var r in t.validator.methods) {
                    var s;
                    "required" === r ? (s = i.get(0).getAttribute(r), "" === s && (s = !0), s = !!s) : s = i.attr(r), /min|max/.test(r) && (null === o || /number|range|text/.test(o)) && (s = Number(s)), s ? n[r] = s : o === r && "range" !== o && (n[r] = !0)
                }
                return n.maxlength && /-1|2147483647|524288/.test(n.maxlength) && delete n.maxlength, n
            },
            dataRules: function(e) {
                var n, i, o = {},
                    r = t(e);
                for (n in t.validator.methods) i = r.data("rule-" + n.toLowerCase()), void 0 !== i && (o[n] = i);
                return o
            },
            staticRules: function(e) {
                var n = {},
                    i = t.data(e.form, "validator");
                return i.settings.rules && (n = t.validator.normalizeRule(i.settings.rules[e.name]) || {}), n
            },
            normalizeRules: function(e, n) {
                return t.each(e, function(i, o) {
                    if (o === !1) return void delete e[i];
                    if (o.param || o.depends) {
                        var r = !0;
                        switch (typeof o.depends) {
                            case "string":
                                r = !!t(o.depends, n.form).length;
                                break;
                            case "function":
                                r = o.depends.call(n, n)
                        }
                        r ? e[i] = void 0 === o.param || o.param : delete e[i]
                    }
                }), t.each(e, function(i, o) {
                    e[i] = t.isFunction(o) ? o(n) : o
                }), t.each(["minlength", "maxlength"], function() {
                    e[this] && (e[this] = Number(e[this]))
                }), t.each(["rangelength", "range"], function() {
                    var n;
                    e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (n = e[this].split(/[\s,]+/), e[this] = [Number(n[0]), Number(n[1])]))
                }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
            },
            normalizeRule: function(e) {
                if ("string" == typeof e) {
                    var n = {};
                    t.each(e.split(/\s/), function() {
                        n[this] = !0
                    }), e = n
                }
                return e
            },
            addMethod: function(e, n, i) {
                t.validator.methods[e] = n, t.validator.messages[e] = void 0 !== i ? i : t.validator.messages[e], n.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
            },
            methods: {
                required: function(e, n, i) {
                    if (!this.depend(i, n)) return "dependency-mismatch";
                    if ("select" === n.nodeName.toLowerCase()) {
                        var o = t(n).val();
                        return o && o.length > 0
                    }
                    return this.checkable(n) ? this.getLength(e, n) > 0 : t.trim(e).length > 0
                },
                email: function(t, e) {
                    return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
                },
                url: function(t, e) {
                    return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
                },
                date: function(t, e) {
                    return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
                },
                dateISO: function(t, e) {
                    return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
                },
                number: function(t, e) {
                    return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
                },
                digits: function(t, e) {
                    return this.optional(e) || /^\d+$/.test(t)
                },
                creditcard: function(t, e) {
                    if (this.optional(e)) return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(t)) return !1;
                    var n = 0,
                        i = 0,
                        o = !1;
                    t = t.replace(/\D/g, "");
                    for (var r = t.length - 1; r >= 0; r--) {
                        var s = t.charAt(r);
                        i = parseInt(s, 10), o && (i *= 2) > 9 && (i -= 9), n += i, o = !o
                    }
                    return n % 10 === 0
                },
                minlength: function(e, n, i) {
                    var o = t.isArray(e) ? e.length : this.getLength(t.trim(e), n);
                    return this.optional(n) || o >= i
                },
                maxlength: function(e, n, i) {
                    var o = t.isArray(e) ? e.length : this.getLength(t.trim(e), n);
                    return this.optional(n) || o <= i
                },
                rangelength: function(e, n, i) {
                    var o = t.isArray(e) ? e.length : this.getLength(t.trim(e), n);
                    return this.optional(n) || o >= i[0] && o <= i[1]
                },
                min: function(t, e, n) {
                    return this.optional(e) || t >= n
                },
                max: function(t, e, n) {
                    return this.optional(e) || t <= n
                },
                range: function(t, e, n) {
                    return this.optional(e) || t >= n[0] && t <= n[1]
                },
                equalTo: function(e, n, i) {
                    var o = t(i);
                    return this.settings.onfocusout && o.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        t(n).valid()
                    }), e === o.val()
                },
                remote: function(e, n, i) {
                    if (this.optional(n)) return "dependency-mismatch";
                    var o = this.previousValue(n);
                    if (this.settings.messages[n.name] || (this.settings.messages[n.name] = {}), o.originalMessage = this.settings.messages[n.name].remote, this.settings.messages[n.name].remote = o.message, i = "string" == typeof i && {
                            url: i
                        } || i, o.old === e) return o.valid;
                    o.old = e;
                    var r = this;
                    this.startRequest(n);
                    var s = {};
                    return s[n.name] = e, t.ajax(t.extend(!0, {
                        url: i,
                        mode: "abort",
                        port: "validate" + n.name,
                        dataType: "json",
                        data: s,
                        success: function(i) {
                            r.settings.messages[n.name].remote = o.originalMessage;
                            var s = i === !0 || "true" === i;
                            if (s) {
                                var a = r.formSubmitted;
                                r.prepareElement(n), r.formSubmitted = a, r.successList.push(n), delete r.invalid[n.name], r.showErrors()
                            }
                            else {
                                var l = {},
                                    u = i || r.defaultMessage(n, "remote");
                                l[n.name] = o.message = t.isFunction(u) ? u(e) : u, r.invalid[n.name] = !0, r.showErrors(l)
                            }
                            o.valid = s, r.stopRequest(n, s)
                        }
                    }, i)), "pending"
                }
            }
        }), t.format = t.validator.format
    }(jQuery),
    function(t) {
        var e = {};
        if (t.ajaxPrefilter) t.ajaxPrefilter(function(t, n, i) {
            var o = t.port;
            "abort" === t.mode && (e[o] && e[o].abort(), e[o] = i)
        });
        else {
            var n = t.ajax;
            t.ajax = function(i) {
                var o = ("mode" in i ? i : t.ajaxSettings).mode,
                    r = ("port" in i ? i : t.ajaxSettings).port;
                return "abort" === o ? (e[r] && e[r].abort(), e[r] = n.apply(this, arguments), e[r]) : n.apply(this, arguments)
            }
        }
    }(jQuery),
    function(t) {
        t.extend(t.fn, {
            validateDelegate: function(e, n, i) {
                return this.bind(n, function(n) {
                    var o = t(n.target);
                    if (o.is(e)) return i.apply(o, arguments)
                })
            }
        })
    }(jQuery),
    function(t, e) {
        var n = {
            catchMethods: {
                methodreturn: [],
                count: 0
            },
            init: function(e) {
                var n, i, o;
                e.originalEvent.origin.match(/vimeo/g) && "data" in e.originalEvent && (o = "string" === t.type(e.originalEvent.data) ? t.parseJSON(e.originalEvent.data) : e.originalEvent.data, o && (n = this.setPlayerID(o), i = this.setVimeoAPIurl(n), o.hasOwnProperty("event") && this.handleEvent(o, n, i), o.hasOwnProperty("method") && this.handleMethod(o, n, i)))
            },
            setPlayerID: function(e) {
                return e.hasOwnProperty("player_id") ? t(t("#" + e.player_id).length ? "#" + e.player_id : "iframe[src*=" + e.player_id + "]") : t("iframe[src*='vimeo']").eq(0)
            },
            setVimeoAPIurl: function(t) {
                return "http" !== t.attr("src").substr(0, 4) ? "https:" !== e.location.protocol ? "http:" + t.attr("src").split("?")[0] : "https:" + t.attr("src").split("?")[0] : t.attr("src").split("?")[0]
            },
            handleMethod: function(t, e, n) {
                this.catchMethods.methodreturn.push(t.value)
            },
            handleEvent: function(e, n, i) {
                switch (e.event.toLowerCase()) {
                    case "ready":
                        for (var o in t._data(n[0], "events")) o.match(/loadProgress|playProgress|play|pause|finish|seek|cuechange/) && n[0].contentWindow.postMessage(JSON.stringify({
                            method: "addEventListener",
                            value: o
                        }), i);
                        if (n.data("vimeoAPICall")) {
                            for (var r = n.data("vimeoAPICall"), s = 0; s < r.length; s++) n[0].contentWindow.postMessage(JSON.stringify(r[s].message), r[s].api);
                            n.removeData("vimeoAPICall")
                        }
                        n.data("vimeoReady", !0), n.triggerHandler("ready");
                        break;
                    case "seek":
                        n.triggerHandler("seek", [e.data]);
                        break;
                    case "loadprogress":
                        n.triggerHandler("loadProgress", [e.data]);
                        break;
                    case "playprogress":
                        n.triggerHandler("playProgress", [e.data]);
                        break;
                    case "pause":
                        n.triggerHandler("pause");
                        break;
                    case "finish":
                        n.triggerHandler("finish");
                        break;
                    case "play":
                        n.triggerHandler("play");
                        break;
                    case "cuechange":
                        n.triggerHandler("cuechange")
                }
            }
        };
        t(e).on("message", function(t) {
            n.init(t)
        }), t.vimeo = function(t, i, o) {
            var r = {},
                s = n.catchMethods.methodreturn.length;
            if ("string" == typeof i && (r.method = i), void 0 !== typeof o && "function" != typeof o && (r.value = o), "iframe" === t.prop("tagName").toLowerCase() && r.hasOwnProperty("method"))
                if (t.data("vimeoReady")) t[0].contentWindow.postMessage(JSON.stringify(r), n.setVimeoAPIurl(t));
                else {
                    var a = t.data("vimeoAPICall") ? t.data("vimeoAPICall") : [];
                    a.push({
                        message: r,
                        api: n.setVimeoAPIurl(t)
                    }), t.data("vimeoAPICall", a)
                }
            return "get" !== i.toString().substr(0, 3) && "paused" !== i.toString() || "function" != typeof o || (! function(t, i, o) {
                var r = e.setInterval(function() {
                    n.catchMethods.methodreturn.length != t && (e.clearInterval(r), i(n.catchMethods.methodreturn[o]))
                }, 10)
            }(s, o, n.catchMethods.count), n.catchMethods.count++), t
        }, t.fn.vimeo = function(e, n) {
            return t.vimeo(this, e, n)
        }
    }(jQuery, window),
    function() {
        function t() {}

        function e(t, e) {
            this.path = t, "undefined" != typeof e && null !== e ? (this.at_2x_path = e, this.perform_check = !1) : (this.at_2x_path = t.replace(/\.\w+$/, function(t) {
                return "@2x" + t
            }), this.perform_check = !0)
        }

        function n(t) {
            this.el = t, this.path = new e(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
            var n = this;
            this.path.check_2x_variant(function(t) {
                t && n.swap()
            })
        }
        var i = "undefined" == typeof exports ? window : exports,
            o = {
                check_mime_type: !0
            };
        i.Retina = t, t.configure = function(t) {
            null == t && (t = {});
            for (var e in t) o[e] = t[e]
        }, t.init = function(t) {
            null == t && (t = i);
            var e = t.onload || new Function;
            t.onload = function() {
                var t, i, o = document.querySelectorAll("img:not(.no-retina)"),
                    r = [];
                for (t = 0; t < o.length; t++) i = o[t], r.push(new n(i));
                e()
            }
        }, t.isRetina = function() {
            var t = "(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";
            return i.devicePixelRatio > 1 || !(!i.matchMedia || !i.matchMedia(t).matches)
        }, i.RetinaImagePath = e, e.confirmed_paths = [], e.prototype.is_external = function() {
            return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
        }, e.prototype.check_2x_variant = function(t) {
            var n, i = this;
            return this.is_external() ? t(!1) : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in e.confirmed_paths ? t(!0) : (n = new XMLHttpRequest, n.open("HEAD", this.at_2x_path), n.onreadystatechange = function() {
                if (4 != n.readyState) return t(!1);
                if (n.status >= 200 && n.status <= 399) {
                    if (o.check_mime_type) {
                        var r = n.getResponseHeader("Content-Type");
                        if (null == r || !r.match(/^image/i)) return t(!1)
                    }
                    return e.confirmed_paths.push(i.at_2x_path), t(!0)
                }
                return t(!1)
            }, n.send(), void 0) : t(!0)
        }, i.RetinaImage = n, n.prototype.swap = function(t) {
            function e() {
                n.el.complete ? (n.el.setAttribute("width", n.el.offsetWidth), n.el.setAttribute("height", n.el.offsetHeight), n.el.setAttribute("src", t)) : setTimeout(e, 5)
            }
            "undefined" == typeof t && (t = this.path.at_2x_path);
            var n = this;
            e()
        }, t.isRetina() && t.init(i)
    }(),
    function(t, e) {
        "use strict";
        var n = t.GreenSockGlobals = t.GreenSockGlobals || t;
        if (!n.TweenLite) {
            var i, o, r, s, a, l = function(t) {
                    var e, i = t.split("."),
                        o = n;
                    for (e = 0; i.length > e; e++) o[i[e]] = o = o[i[e]] || {};
                    return o
                },
                u = l("com.greensock"),
                c = 1e-10,
                h = function(t) {
                    var e, n = [],
                        i = t.length;
                    for (e = 0; e !== i; n.push(t[e++]));
                    return n
                },
                d = function() {},
                p = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(n) {
                        return null != n && (n instanceof Array || "object" == typeof n && !!n.push && t.call(n) === e)
                    }
                }(),
                f = {},
                m = function(i, o, r, s) {
                    this.sc = f[i] ? f[i].sc : [], f[i] = this, this.gsClass = null, this.func = r;
                    var a = [];
                    this.check = function(u) {
                        for (var c, h, d, p, g = o.length, v = g; --g > -1;)(c = f[o[g]] || new m(o[g], [])).gsClass ? (a[g] = c.gsClass, v--) : u && c.sc.push(this);
                        if (0 === v && r)
                            for (h = ("com.greensock." + i).split("."), d = h.pop(), p = l(h.join("."))[d] = this.gsClass = r.apply(r, a), s && (n[d] = p, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + i.split(".").pop(), [], function() {
                                    return p
                                }) : i === e && "undefined" != typeof module && module.exports && (module.exports = p)), g = 0; this.sc.length > g; g++) this.sc[g].check()
                    }, this.check(!0)
                },
                g = t._gsDefine = function(t, e, n, i) {
                    return new m(t, e, n, i)
                },
                v = u._class = function(t, e, n) {
                    return e = e || function() {}, g(t, [], function() {
                        return e
                    }, n), e
                };
            g.globals = n;
            var y = [0, 0, 1, 1],
                b = [],
                w = v("easing.Ease", function(t, e, n, i) {
                    this._func = t, this._type = n || 0, this._power = i || 0, this._params = e ? y.concat(e) : y
                }, !0),
                x = w.map = {},
                _ = w.register = function(t, e, n, i) {
                    for (var o, r, s, a, l = e.split(","), c = l.length, h = (n || "easeIn,easeOut,easeInOut").split(","); --c > -1;)
                        for (r = l[c], o = i ? v("easing." + r, null, !0) : u.easing[r] || {}, s = h.length; --s > -1;) a = h[s], x[r + "." + a] = x[a + r] = o[a] = t.getRatio ? t : t[a] || new t
                };
            for (r = w.prototype, r._calcEnd = !1, r.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        n = this._power,
                        i = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                    return 1 === n ? i *= i : 2 === n ? i *= i * i : 3 === n ? i *= i * i * i : 4 === n && (i *= i * i * i * i), 1 === e ? 1 - i : 2 === e ? i : .5 > t ? i / 2 : 1 - i / 2
                }, i = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], o = i.length; --o > -1;) r = i[o] + ",Power" + o, _(new w(null, null, 1, o), r, "easeOut", !0), _(new w(null, null, 2, o), r, "easeIn" + (0 === o ? ",easeNone" : "")), _(new w(null, null, 3, o), r, "easeInOut");
            x.linear = u.easing.Linear.easeIn, x.swing = u.easing.Quad.easeInOut;
            var k = v("events.EventDispatcher", function(t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            r = k.prototype, r.addEventListener = function(t, e, n, i, o) {
                o = o || 0;
                var r, l, u = this._listeners[t],
                    c = 0;
                for (null == u && (this._listeners[t] = u = []), l = u.length; --l > -1;) r = u[l], r.c === e && r.s === n ? u.splice(l, 1) : 0 === c && o > r.pr && (c = l + 1);
                u.splice(c, 0, {
                    c: e,
                    s: n,
                    up: i,
                    pr: o
                }), this !== s || a || s.wake()
            }, r.removeEventListener = function(t, e) {
                var n, i = this._listeners[t];
                if (i)
                    for (n = i.length; --n > -1;)
                        if (i[n].c === e) return void i.splice(n, 1)
            }, r.dispatchEvent = function(t) {
                var e, n, i, o = this._listeners[t];
                if (o)
                    for (e = o.length, n = this._eventTarget; --e > -1;) i = o[e], i && (i.up ? i.c.call(i.s || n, {
                        type: t,
                        target: n
                    }) : i.c.call(i.s || n))
            };
            var T = t.requestAnimationFrame,
                C = t.cancelAnimationFrame,
                $ = Date.now || function() {
                    return (new Date).getTime()
                },
                S = $();
            for (i = ["ms", "moz", "webkit", "o"], o = i.length; --o > -1 && !T;) T = t[i[o] + "RequestAnimationFrame"], C = t[i[o] + "CancelAnimationFrame"] || t[i[o] + "CancelRequestAnimationFrame"];
            v("Ticker", function(t, e) {
                var n, i, o, r, l, u = this,
                    h = $(),
                    p = e !== !1 && T,
                    f = 500,
                    m = 33,
                    g = "tick",
                    v = function(t) {
                        var e, s, a = $() - S;
                        a > f && (h += a - m), S += a, u.time = (S - h) / 1e3, e = u.time - l, (!n || e > 0 || t === !0) && (u.frame++, l += e + (e >= r ? .004 : r - e), s = !0), t !== !0 && (o = i(v)), s && u.dispatchEvent(g)
                    };
                k.call(u), u.time = u.frame = 0, u.tick = function() {
                    v(!0)
                }, u.lagSmoothing = function(t, e) {
                    f = t || 1 / c, m = Math.min(e, f, 0)
                }, u.sleep = function() {
                    null != o && (p && C ? C(o) : clearTimeout(o), i = d, o = null, u === s && (a = !1))
                }, u.wake = function() {
                    null !== o ? u.sleep() : u.frame > 10 && (S = $() - f + 5), i = 0 === n ? d : p && T ? T : function(t) {
                        return setTimeout(t, 0 | 1e3 * (l - u.time) + 1)
                    }, u === s && (a = !0), v(2)
                }, u.fps = function(t) {
                    return arguments.length ? (n = t, r = 1 / (n || 60), l = this.time + r, void u.wake()) : n
                }, u.useRAF = function(t) {
                    return arguments.length ? (u.sleep(), p = t, void u.fps(n)) : p
                }, u.fps(t), setTimeout(function() {
                    p && (!o || 5 > u.frame) && u.useRAF(!1)
                }, 1500)
            }), r = u.Ticker.prototype = new u.events.EventDispatcher, r.constructor = u.Ticker;
            var F = v("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, V) {
                    a || s.wake();
                    var n = this.vars.useFrames ? H : V;
                    n.add(this, n._time), this.vars.paused && this.paused(!0)
                }
            });
            s = F.ticker = new u.Ticker, r = F.prototype, r._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1;
            var j = function() {
                a && $() - S > 2e3 && s.wake(), setTimeout(j, 2e3)
            };
            j(), r.play = function(t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, r.pause = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, r.resume = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, r.seek = function(t, e) {
                return this.totalTime(Number(t), e !== !1)
            }, r.restart = function(t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
            }, r.reverse = function(t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, r.render = function() {}, r.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, r.isActive = function() {
                var t, e = this._timeline,
                    n = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= n && n + this.totalDuration() / this._timeScale > t
            }, r._enabled = function(t, e) {
                return a || s.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, r._kill = function() {
                return this._enabled(!1, !1)
            }, r.kill = function(t, e) {
                return this._kill(t, e), this
            }, r._uncache = function(t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, r._swapSelfInParams = function(t) {
                for (var e = t.length, n = t.concat(); --e > -1;) "{self}" === t[e] && (n[e] = this);
                return n
            }, r.eventCallback = function(t, e, n, i) {
                if ("on" === (t || "").substr(0, 2)) {
                    var o = this.vars;
                    if (1 === arguments.length) return o[t];
                    null == e ? delete o[t] : (o[t] = e, o[t + "Params"] = p(n) && -1 !== n.join("").indexOf("{self}") ? this._swapSelfInParams(n) : n, o[t + "Scope"] = i), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, r.delay = function(t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, r.duration = function(t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, r.totalDuration = function(t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, r.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, r.totalTime = function(t, e, n) {
                if (a || s.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > t && !n && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var i = this._totalDuration,
                            o = this._timeline;
                        if (t > i && !n && (t = i), this._startTime = (this._paused ? this._pauseTime : o._time) - (this._reversed ? i - t : t) / this._timeScale, o._dirty || this._uncache(!1), o._timeline)
                            for (; o._timeline;) o._timeline._time !== (o._startTime + o._totalTime) / o._timeScale && o.totalTime(o._totalTime, !0), o = o._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), O.length && B())
                }
                return this
            }, r.progress = r.totalProgress = function(t, e) {
                return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
            }, r.startTime = function(t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, r.endTime = function(t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
            }, r.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || c, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        n = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = n - (n - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, r.reversed = function(t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, r.paused = function(t) {
                if (!arguments.length) return this._paused;
                if (t != this._paused && this._timeline) {
                    a || t || s.wake();
                    var e = this._timeline,
                        n = e.rawTime(),
                        i = n - this._pauseTime;
                    !t && e.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? n : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (n - this._startTime) / this._timeScale, !0, !0)
                }
                return this._gc && !t && this._enabled(!0, !1), this
            };
            var E = v("core.SimpleTimeline", function(t) {
                F.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            r = E.prototype = new F, r.constructor = E, r.kill()._gc = !1, r._first = r._last = r._recent = null, r._sortChildren = !1, r.add = r.insert = function(t, e) {
                var n, i;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), n = this._last, this._sortChildren)
                    for (i = t._startTime; n && n._startTime > i;) n = n._prev;
                return n ? (t._next = n._next, n._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = n, this._recent = t, this._timeline && this._uncache(!0), this
            }, r._remove = function(t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, r.render = function(t, e, n) {
                var i, o = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; o;) i = o._next, (o._active || t >= o._startTime && !o._paused) && (o._reversed ? o.render((o._dirty ? o.totalDuration() : o._totalDuration) - (t - o._startTime) * o._timeScale, e, n) : o.render((t - o._startTime) * o._timeScale, e, n)), o = i
            }, r.rawTime = function() {
                return a || s.wake(), this._totalTime
            };
            var P = v("TweenLite", function(e, n, i) {
                    if (F.call(this, n, i), this.render = P.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : P.selector(e) || e;
                    var o, r, s, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? z[P.defaultOverwrite] : "number" == typeof l ? l >> 0 : z[l], (a || e instanceof Array || e.push && p(e)) && "number" != typeof e[0])
                        for (this._targets = s = h(e), this._propLookup = [], this._siblings = [], o = 0; s.length > o; o++) r = s[o], r ? "string" != typeof r ? r.length && r !== t && r[0] && (r[0] === t || r[0].nodeType && r[0].style && !r.nodeType) ? (s.splice(o--, 1), this._targets = s = s.concat(h(r))) : (this._siblings[o] = W(r, this, !1), 1 === l && this._siblings[o].length > 1 && U(r, this, null, 1, this._siblings[o])) : (r = s[o--] = P.selector(r), "string" == typeof r && s.splice(o + 1, 1)) : s.splice(o--, 1);
                    else this._propLookup = {}, this._siblings = W(e, this, !1), 1 === l && this._siblings.length > 1 && U(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === n && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -c, this.render(-this._delay))
                }, !0),
                M = function(e) {
                    return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                },
                A = function(t, e) {
                    var n, i = {};
                    for (n in t) q[n] || n in e && "transform" !== n && "x" !== n && "y" !== n && "width" !== n && "height" !== n && "className" !== n && "border" !== n || !(!L[n] || L[n] && L[n]._autoCSS) || (i[n] = t[n], delete t[n]);
                    t.css = i
                };
            r = P.prototype = new F, r.constructor = P, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = r._lazy = !1, P.version = "1.15.1", P.defaultEase = r._ease = new w(null, null, 1, 1), P.defaultOverwrite = "auto", P.ticker = s, P.autoSleep = !0, P.lagSmoothing = function(t, e) {
                s.lagSmoothing(t, e)
            }, P.selector = t.$ || t.jQuery || function(e) {
                var n = t.$ || t.jQuery;
                return n ? (P.selector = n, n(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
            };
            var O = [],
                D = {},
                N = P._internals = {
                    isArray: p,
                    isSelector: M,
                    lazyTweens: O
                },
                L = P._plugins = {},
                R = N.tweenLookup = {},
                I = 0,
                q = N.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1
                },
                z = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                H = F._rootFramesTimeline = new E,
                V = F._rootTimeline = new E,
                B = N.lazyRender = function() {
                    var t, e = O.length;
                    for (D = {}; --e > -1;) t = O[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                    O.length = 0
                };
            V._startTime = s.time, H._startTime = s.frame, V._active = H._active = !0, setTimeout(B, 1), F._updateRoot = P.render = function() {
                var t, e, n;
                if (O.length && B(), V.render((s.time - V._startTime) * V._timeScale, !1, !1), H.render((s.frame - H._startTime) * H._timeScale, !1, !1), O.length && B(), !(s.frame % 120)) {
                    for (n in R) {
                        for (e = R[n].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete R[n]
                    }
                    if (n = V._first, (!n || n._paused) && P.autoSleep && !H._first && 1 === s._listeners.tick.length) {
                        for (; n && n._paused;) n = n._next;
                        n || s.sleep()
                    }
                }
            }, s.addEventListener("tick", F._updateRoot);
            var W = function(t, e, n) {
                    var i, o, r = t._gsTweenID;
                    if (R[r || (t._gsTweenID = r = "t" + I++)] || (R[r] = {
                            target: t,
                            tweens: []
                        }), e && (i = R[r].tweens, i[o = i.length] = e, n))
                        for (; --o > -1;) i[o] === e && i.splice(o, 1);
                    return R[r].tweens
                },
                X = function(t, e, n, i) {
                    var o, r, s = t.vars.onOverwrite;
                    return s && (o = s(t, e, n, i)), s = P.onOverwrite, s && (r = s(t, e, n, i)), o !== !1 && r !== !1
                },
                U = function(t, e, n, i, o) {
                    var r, s, a, l;
                    if (1 === i || i >= 4) {
                        for (l = o.length, r = 0; l > r; r++)
                            if ((a = o[r]) !== e) a._gc || X(a, e) && a._enabled(!1, !1) && (s = !0);
                            else if (5 === i) break;
                        return s
                    }
                    var u, h = e._startTime + c,
                        d = [],
                        p = 0,
                        f = 0 === e._duration;
                    for (r = o.length; --r > -1;)(a = o[r]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (u = u || Y(e, 0, f), 0 === Y(a, u, f) && (d[p++] = a)) : h >= a._startTime && a._startTime + a.totalDuration() / a._timeScale > h && ((f || !a._initted) && 2e-10 >= h - a._startTime || (d[p++] = a)));
                    for (r = p; --r > -1;)
                        if (a = d[r], 2 === i && a._kill(n, t, e) && (s = !0), 2 !== i || !a._firstPT && a._initted) {
                            if (2 !== i && !X(a, e)) continue;
                            a._enabled(!1, !1) && (s = !0)
                        }
                    return s
                },
                Y = function(t, e, n) {
                    for (var i = t._timeline, o = i._timeScale, r = t._startTime; i._timeline;) {
                        if (r += i._startTime, o *= i._timeScale, i._paused) return -100;
                        i = i._timeline
                    }
                    return r /= o, r > e ? r - e : n && r === e || !t._initted && 2 * c > r - e ? c : (r += t.totalDuration() / t._timeScale / o) > e + c ? 0 : r - e - c
                };
            r._init = function() {
                var t, e, n, i, o, r = this.vars,
                    s = this._overwrittenProps,
                    a = this._duration,
                    l = !!r.immediateRender,
                    u = r.ease;
                if (r.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), o = {};
                    for (i in r.startAt) o[i] = r.startAt[i];
                    if (o.overwrite = !1, o.immediateRender = !0, o.lazy = l && r.lazy !== !1, o.startAt = o.delay = null, this._startAt = P.to(this.target, 0, o), l)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== a) return
                }
                else if (r.runBackwards && 0 !== a)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (l = !1), n = {};
                        for (i in r) q[i] && "autoCSS" !== i || (n[i] = r[i]);
                        if (n.overwrite = 0, n.data = "isFromStart", n.lazy = l && r.lazy !== !1, n.immediateRender = l, this._startAt = P.to(this.target, 0, n), l) {
                            if (0 === this._time) return
                        }
                        else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = u = u ? u instanceof w ? u : "function" == typeof u ? new w(u, r.easeParams) : x[u] || P.defaultEase : P.defaultEase, r.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, r.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], s ? s[t] : null) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, s);
                if (e && P._onPluginEvent("_onInitAllProps", this), s && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)
                    for (n = this._firstPT; n;) n.s += n.c, n.c = -n.c, n = n._next;
                this._onUpdate = r.onUpdate, this._initted = !0
            }, r._initProps = function(e, n, i, o) {
                var r, s, a, l, u, c;
                if (null == e) return !1;
                D[e._gsTweenID] && B(), this.vars.css || e.style && e !== t && e.nodeType && L.css && this.vars.autoCSS !== !1 && A(this.vars, e);
                for (r in this.vars) {
                    if (c = this.vars[r], q[r]) c && (c instanceof Array || c.push && p(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[r] = c = this._swapSelfInParams(c, this));
                    else if (L[r] && (l = new L[r])._onInitTween(e, this.vars[r], this)) {
                        for (this._firstPT = u = {
                                _next: this._firstPT,
                                t: l,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: !0,
                                n: r,
                                pg: !0,
                                pr: l._priority
                            }, s = l._overwriteProps.length; --s > -1;) n[l._overwriteProps[s]] = this._firstPT;
                        (l._priority || l._onInitAllProps) && (a = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
                    }
                    else this._firstPT = n[r] = u = {
                        _next: this._firstPT,
                        t: e,
                        p: r,
                        f: "function" == typeof e[r],
                        n: r,
                        pg: !1,
                        pr: 0
                    }, u.s = u.f ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r]), u.c = "string" == typeof c && "=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * Number(c.substr(2)) : Number(c) - u.s || 0;
                    u && u._next && (u._next._prev = u)
                }
                return o && this._kill(o, e) ? this._initProps(e, n, i, o) : this._overwrite > 1 && this._firstPT && i.length > 1 && U(e, this, n, this._overwrite, i) ? (this._kill(n, e), this._initProps(e, n, i, o)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (D[e._gsTweenID] = !0), a)
            }, r.render = function(t, e, n) {
                var i, o, r, s, a = this._time,
                    l = this._duration,
                    u = this._rawPrevTime;
                if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (i = !0, o = "onComplete"), 0 === l && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > u || u === c && "isPause" !== this.data) && u !== t && (n = !0, u > c && (o = "onReverseComplete")), this._rawPrevTime = s = !e || t || u === t ? t : c);
                else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && u > 0 && u !== c) && (o = "onReverseComplete", i = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || n) && (u >= 0 && (u !== c || "isPause" !== this.data) && (n = !0), this._rawPrevTime = s = !e || t || u === t ? t : c)), this._initted || (n = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var h = t / l,
                        d = this._easeType,
                        p = this._easePower;
                    (1 === d || 3 === d && h >= .5) && (h = 1 - h), 3 === d && (h *= 2), 1 === p ? h *= h : 2 === p ? h *= h * h : 3 === p ? h *= h * h * h : 4 === p && (h *= h * h * h * h), this.ratio = 1 === d ? 1 - h : 2 === d ? h : .5 > t / l ? h / 2 : 1 - h / 2
                }
                else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== a || n) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = u, O.push(this), void(this._lazy = [t, e]);
                        this._time && !i ? this.ratio = this._ease.getRatio(this._time / l) : i && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, n) : o || (o = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || b))), r = this._firstPT; r;) r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s, r = r._next;
                    this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, n), e || (this._time !== a || i) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || b)), o && (!this._gc || n) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, n), i && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || b), 0 === l && this._rawPrevTime === c && s !== c && (this._rawPrevTime = 0))
                }
            }, r._kill = function(t, e, n) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : P.selector(e) || e;
                var i, o, r, s, a, l, u, c, h;
                if ((p(e) || M(e)) && "number" != typeof e[0])
                    for (i = e.length; --i > -1;) this._kill(t, e[i]) && (l = !0);
                else {
                    if (this._targets) {
                        for (i = this._targets.length; --i > -1;)
                            if (e === this._targets[i]) {
                                a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], o = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                                break
                            }
                    }
                    else {
                        if (e !== this.target) return !1;
                        a = this._propLookup, o = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (a) {
                        if (u = t || a, c = t !== o && "all" !== o && t !== a && ("object" != typeof t || !t._tempKill), n && (P.onOverwrite || this.vars.onOverwrite)) {
                            for (r in u) a[r] && (h || (h = []), h.push(r));
                            if (!X(this, n, e, h)) return !1
                        }
                        for (r in u)(s = a[r]) && (s.pg && s.t._kill(u) && (l = !0), s.pg && 0 !== s.t._overwriteProps.length || (s._prev ? s._prev._next = s._next : s === this._firstPT && (this._firstPT = s._next), s._next && (s._next._prev = s._prev), s._next = s._prev = null), delete a[r]), c && (o[r] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, r.invalidate = function() {
                return this._notifyPluginsOfEnabled && P._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], F.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -c, this.render(-this._delay)), this
            }, r._enabled = function(t, e) {
                if (a || s.wake(), t && this._gc) {
                    var n, i = this._targets;
                    if (i)
                        for (n = i.length; --n > -1;) this._siblings[n] = W(i[n], this, !0);
                    else this._siblings = W(this.target, this, !0)
                }
                return F.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && P._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
            }, P.to = function(t, e, n) {
                return new P(t, e, n)
            }, P.from = function(t, e, n) {
                return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new P(t, e, n)
            }, P.fromTo = function(t, e, n, i) {
                return i.startAt = n, i.immediateRender = 0 != i.immediateRender && 0 != n.immediateRender, new P(t, e, i)
            }, P.delayedCall = function(t, e, n, i, o) {
                return new P(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: n,
                    onCompleteScope: i,
                    onReverseComplete: e,
                    onReverseCompleteParams: n,
                    onReverseCompleteScope: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: o,
                    overwrite: 0
                })
            }, P.set = function(t, e) {
                return new P(t, 0, e)
            }, P.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : P.selector(t) || t;
                var n, i, o, r;
                if ((p(t) || M(t)) && "number" != typeof t[0]) {
                    for (n = t.length, i = []; --n > -1;) i = i.concat(P.getTweensOf(t[n], e));
                    for (n = i.length; --n > -1;)
                        for (r = i[n], o = n; --o > -1;) r === i[o] && i.splice(n, 1)
                }
                else
                    for (i = W(t).concat(), n = i.length; --n > -1;)(i[n]._gc || e && !i[n].isActive()) && i.splice(n, 1);
                return i
            }, P.killTweensOf = P.killDelayedCallsTo = function(t, e, n) {
                "object" == typeof e && (n = e, e = !1);
                for (var i = P.getTweensOf(t, e), o = i.length; --o > -1;) i[o]._kill(n, t)
            };
            var Q = v("plugins.TweenPlugin", function(t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = Q.prototype
            }, !0);
            if (r = Q.prototype, Q.version = "1.10.1", Q.API = 2, r._firstPT = null, r._addTween = function(t, e, n, i, o, r) {
                    var s, a;
                    return null != i && (s = "number" == typeof i || "=" !== i.charAt(1) ? Number(i) - n : parseInt(i.charAt(0) + "1", 10) * Number(i.substr(2))) ? (this._firstPT = a = {
                        _next: this._firstPT,
                        t: t,
                        p: e,
                        s: n,
                        c: s,
                        f: "function" == typeof t[e],
                        n: o || e,
                        r: r
                    }, a._next && (a._next._prev = a), a) : void 0
                }, r.setRatio = function(t) {
                    for (var e, n = this._firstPT, i = 1e-6; n;) e = n.c * t + n.s, n.r ? e = Math.round(e) : i > e && e > -i && (e = 0), n.f ? n.t[n.p](e) : n.t[n.p] = e, n = n._next
                }, r._kill = function(t) {
                    var e, n = this._overwriteProps,
                        i = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = n.length; --e > -1;) null != t[n[e]] && n.splice(e, 1);
                    for (; i;) null != t[i.n] && (i._next && (i._next._prev = i._prev), i._prev ? (i._prev._next = i._next, i._prev = null) : this._firstPT === i && (this._firstPT = i._next)), i = i._next;
                    return !1
                }, r._roundProps = function(t, e) {
                    for (var n = this._firstPT; n;)(t[this._propName] || null != n.n && t[n.n.split(this._propName + "_").join("")]) && (n.r = e), n = n._next
                }, P._onPluginEvent = function(t, e) {
                    var n, i, o, r, s, a = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; a;) {
                            for (s = a._next, i = o; i && i.pr > a.pr;) i = i._next;
                            (a._prev = i ? i._prev : r) ? a._prev._next = a: o = a, (a._next = i) ? i._prev = a : r = a, a = s
                        }
                        a = e._firstPT = o
                    }
                    for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (n = !0), a = a._next;
                    return n
                }, Q.activate = function(t) {
                    for (var e = t.length; --e > -1;) t[e].API === Q.API && (L[(new t[e])._propName] = t[e]);
                    return !0
                }, g.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, n = t.propName,
                        i = t.priority || 0,
                        o = t.overwriteProps,
                        r = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_roundProps",
                            initAll: "_onInitAllProps"
                        },
                        s = v("plugins." + n.charAt(0).toUpperCase() + n.substr(1) + "Plugin", function() {
                            Q.call(this, n, i), this._overwriteProps = o || []
                        }, t.global === !0),
                        a = s.prototype = new Q(n);
                    a.constructor = s, s.API = t.API;
                    for (e in r) "function" == typeof t[e] && (a[r[e]] = t[e]);
                    return s.version = t.version, Q.activate([s]), s
                }, i = t._gsQueue) {
                for (o = 0; i.length > o; o++) i[o]();
                for (r in f) f[r].func || t.console.log("GSAP encountered missing dependency: com.greensock." + r)
            }
            a = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite"),
    function() {
        var t = [].indexOf || function(t) {
                for (var e = 0, n = this.length; e < n; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            },
            e = [].slice;
        ! function(t, e) {
            return "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            }) : e(t.jQuery, t)
        }(this, function(n, i) {
            var o, r, s, a, l, u, c, h, d, p, f, m, g, v, y, b;
            return o = n(i), h = t.call(i, "ontouchstart") >= 0, a = {
                horizontal: {},
                vertical: {}
            }, l = 1, c = {}, u = "waypoints-context-id", f = "resize.waypoints", m = "scroll.waypoints", g = 1, v = "waypoints-waypoint-ids", y = "waypoint", b = "waypoints", r = function() {
                function t(t) {
                    var e = this;
                    this.$element = t, this.element = t[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + l++, this.oldScroll = {
                        x: t.scrollLeft(),
                        y: t.scrollTop()
                    }, this.waypoints = {
                        horizontal: {},
                        vertical: {}
                    }, this.element[u] = this.id, c[this.id] = this, t.bind(m, function() {
                        var t;
                        if (!e.didScroll && !h) return e.didScroll = !0, t = function() {
                            return e.doScroll(), e.didScroll = !1
                        }, i.setTimeout(t, n[b].settings.scrollThrottle)
                    }), t.bind(f, function() {
                        var t;
                        if (!e.didResize) return e.didResize = !0, t = function() {
                            return n[b]("refresh"), e.didResize = !1
                        }, i.setTimeout(t, n[b].settings.resizeThrottle)
                    })
                }
                return t.prototype.doScroll = function() {
                    var t, e = this;
                    return t = {
                        horizontal: {
                            newScroll: this.$element.scrollLeft(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left"
                        },
                        vertical: {
                            newScroll: this.$element.scrollTop(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up"
                        }
                    }, !h || t.vertical.oldScroll && t.vertical.newScroll || n[b]("refresh"), n.each(t, function(t, i) {
                        var o, r, s;
                        return s = [], r = i.newScroll > i.oldScroll, o = r ? i.forward : i.backward, n.each(e.waypoints[t], function(t, e) {
                            var n, o;
                            return i.oldScroll < (n = e.offset) && n <= i.newScroll ? s.push(e) : i.newScroll < (o = e.offset) && o <= i.oldScroll ? s.push(e) : void 0
                        }), s.sort(function(t, e) {
                            return t.offset - e.offset
                        }), r || s.reverse(), n.each(s, function(t, e) {
                            if (e.options.continuous || t === s.length - 1) return e.trigger([o])
                        })
                    }), this.oldScroll = {
                        x: t.horizontal.newScroll,
                        y: t.vertical.newScroll
                    }
                }, t.prototype.refresh = function() {
                    var t, e, i, o = this;
                    return i = n.isWindow(this.element), e = this.$element.offset(), this.doScroll(), t = {
                        horizontal: {
                            contextOffset: i ? 0 : e.left,
                            contextScroll: i ? 0 : this.oldScroll.x,
                            contextDimension: this.$element.width(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left",
                            offsetProp: "left"
                        },
                        vertical: {
                            contextOffset: i ? 0 : e.top,
                            contextScroll: i ? 0 : this.oldScroll.y,
                            contextDimension: i ? n[b]("viewportHeight") : this.$element.height(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up",
                            offsetProp: "top"
                        }
                    }, n.each(t, function(t, e) {
                        return n.each(o.waypoints[t], function(t, i) {
                            var o, r, s, a, l;
                            if (o = i.options.offset, s = i.offset, r = n.isWindow(i.element) ? 0 : i.$element.offset()[e.offsetProp], n.isFunction(o) ? o = o.apply(i.element) : "string" == typeof o && (o = parseFloat(o), i.options.offset.indexOf("%") > -1 && (o = Math.ceil(e.contextDimension * o / 100))), i.offset = r - e.contextOffset + e.contextScroll - o, (!i.options.onlyOnScroll || null == s) && i.enabled) return null !== s && s < (a = e.oldScroll) && a <= i.offset ? i.trigger([e.backward]) : null !== s && s > (l = e.oldScroll) && l >= i.offset ? i.trigger([e.forward]) : null === s && e.oldScroll >= i.offset ? i.trigger([e.forward]) : void 0
                        })
                    })
                }, t.prototype.checkEmpty = function() {
                    if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) return this.$element.unbind([f, m].join(" ")), delete c[this.id]
                }, t
            }(), s = function() {
                function t(t, e, i) {
                    var o, r;
                    i = n.extend({}, n.fn[y].defaults, i), "bottom-in-view" === i.offset && (i.offset = function() {
                        var t;
                        return t = n[b]("viewportHeight"), n.isWindow(e.element) || (t = e.$element.height()), t - n(this).outerHeight()
                    }), this.$element = t, this.element = t[0], this.axis = i.horizontal ? "horizontal" : "vertical", this.callback = i.handler, this.context = e, this.enabled = i.enabled, this.id = "waypoints" + g++, this.offset = null, this.options = i, e.waypoints[this.axis][this.id] = this, a[this.axis][this.id] = this, o = null != (r = this.element[v]) ? r : [], o.push(this.id), this.element[v] = o
                }
                return t.prototype.trigger = function(t) {
                    if (this.enabled) return null != this.callback && this.callback.apply(this.element, t), this.options.triggerOnce ? this.destroy() : void 0
                }, t.prototype.disable = function() {
                    return this.enabled = !1
                }, t.prototype.enable = function() {
                    return this.context.refresh(), this.enabled = !0
                }, t.prototype.destroy = function() {
                    return delete a[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
                }, t.getWaypointsByElement = function(t) {
                    var e, i;
                    return (i = t[v]) ? (e = n.extend({}, a.horizontal, a.vertical), n.map(i, function(t) {
                        return e[t]
                    })) : []
                }, t
            }(), p = {
                init: function(t, e) {
                    var i;
                    return null == e && (e = {}), null == (i = e.handler) && (e.handler = t), this.each(function() {
                        var t, i, o, a;
                        return t = n(this), o = null != (a = e.context) ? a : n.fn[y].defaults.context, n.isWindow(o) || (o = t.closest(o)), o = n(o), i = c[o[0][u]], i || (i = new r(o)), new s(t, i, e)
                    }), n[b]("refresh"), this
                },
                disable: function() {
                    return p._invoke.call(this, "disable")
                },
                enable: function() {
                    return p._invoke.call(this, "enable")
                },
                destroy: function() {
                    return p._invoke.call(this, "destroy")
                },
                prev: function(t, e) {
                    return p._traverse.call(this, t, e, function(t, e, n) {
                        if (e > 0) return t.push(n[e - 1])
                    })
                },
                next: function(t, e) {
                    return p._traverse.call(this, t, e, function(t, e, n) {
                        if (e < n.length - 1) return t.push(n[e + 1])
                    })
                },
                _traverse: function(t, e, o) {
                    var r, s;
                    return null == t && (t = "vertical"), null == e && (e = i), s = d.aggregate(e), r = [], this.each(function() {
                        var e;
                        return e = n.inArray(this, s[t]), o(r, e, s[t])
                    }), this.pushStack(r)
                },
                _invoke: function(t) {
                    return this.each(function() {
                        var e;
                        return e = s.getWaypointsByElement(this), n.each(e, function(e, n) {
                            return n[t](), !0
                        })
                    }), this
                }
            }, n.fn[y] = function() {
                var t, i;
                return i = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], p[i] ? p[i].apply(this, t) : n.isFunction(i) ? p.init.apply(this, arguments) : n.isPlainObject(i) ? p.init.apply(this, [null, i]) : i ? n.error("The " + i + " method does not exist in jQuery Waypoints.") : n.error("jQuery Waypoints needs a callback function or handler option.")
            }, n.fn[y].defaults = {
                context: i,
                continuous: !0,
                enabled: !0,
                horizontal: !1,
                offset: 0,
                triggerOnce: !1
            }, d = {
                refresh: function() {
                    return n.each(c, function(t, e) {
                        return e.refresh()
                    })
                },
                viewportHeight: function() {
                    var t;
                    return null != (t = i.innerHeight) ? t : o.height()
                },
                aggregate: function(t) {
                    var e, i, o;
                    return e = a, t && (e = null != (o = c[n(t)[0][u]]) ? o.waypoints : void 0), e ? (i = {
                        horizontal: [],
                        vertical: []
                    }, n.each(i, function(t, o) {
                        return n.each(e[t], function(t, e) {
                            return o.push(e)
                        }), o.sort(function(t, e) {
                            return t.offset - e.offset
                        }), i[t] = n.map(o, function(t) {
                            return t.element
                        }), i[t] = n.unique(i[t])
                    }), i) : []
                },
                above: function(t) {
                    return null == t && (t = i), d._filter(t, "vertical", function(t, e) {
                        return e.offset <= t.oldScroll.y
                    })
                },
                below: function(t) {
                    return null == t && (t = i), d._filter(t, "vertical", function(t, e) {
                        return e.offset > t.oldScroll.y
                    })
                },
                left: function(t) {
                    return null == t && (t = i), d._filter(t, "horizontal", function(t, e) {
                        return e.offset <= t.oldScroll.x
                    })
                },
                right: function(t) {
                    return null == t && (t = i), d._filter(t, "horizontal", function(t, e) {
                        return e.offset > t.oldScroll.x
                    })
                },
                enable: function() {
                    return d._invoke("enable")
                },
                disable: function() {
                    return d._invoke("disable")
                },
                destroy: function() {
                    return d._invoke("destroy")
                },
                extendFn: function(t, e) {
                    return p[t] = e
                },
                _invoke: function(t) {
                    var e;
                    return e = n.extend({}, a.vertical, a.horizontal), n.each(e, function(e, n) {
                        return n[t](), !0
                    })
                },
                _filter: function(t, e, i) {
                    var o, r;
                    return (o = c[n(t)[0][u]]) ? (r = [], n.each(o.waypoints[e], function(t, e) {
                        if (i(o, e)) return r.push(e)
                    }), r.sort(function(t, e) {
                        return t.offset - e.offset
                    }), n.map(r, function(t) {
                        return t.element
                    })) : []
                }
            }, n[b] = function() {
                var t, n;
                return n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], d[n] ? d[n].apply(null, t) : d.aggregate.call(null, n)
            }, n[b].settings = {
                resizeThrottle: 100,
                scrollThrottle: 30
            }, o.load(function() {
                return n[b]("refresh")
            })
        })
    }.call(this),
    function() {
        ! function(t, e) {
            return "function" == typeof define && define.amd ? define(["jquery", "waypoints"], e) : e(t.jQuery)
        }(this, function(t) {
            var e, n;
            return e = {
                wrapper: '<div class="sticky-wrapper" />',
                stuckClass: "stuck"
            }, n = function(t, e) {
                return t.wrap(e.wrapper), t.parent()
            }, t.waypoints("extendFn", "sticky", function(i) {
                var o, r, s;
                return r = t.extend({}, t.fn.waypoint.defaults, e, i), o = n(this, r), s = r.handler, r.handler = function(e) {
                    var n, i;
                    if (n = t(this).children(":first"), i = "down" === e || "right" === e, n.toggleClass(r.stuckClass, i), o.height(i ? n.outerHeight() : ""), null != s) return s.call(this, e)
                }, o.waypoint(r), this.data("stuckClass", r.stuckClass)
            }), t.waypoints("extendFn", "unsticky", function() {
                return this.parent().waypoint("destroy"), this.unwrap(), this.removeClass(this.data("stuckClass"))
            })
        })
    }.call(this);
var $body = $("body"),
    isValidUserENTFlag = !1;

var setCookieWithExpiry = function(t, e, n) {
    var i = new Date;
    i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3);
    var o = "expires=" + i.toUTCString();
    document.cookie = t + "=" + e + ";" + o
};
! function(t) {
    "use strict";
    t.ENTTwoStepForms = t.ENTTwoStepForms || {};
    var e = (navigator.userAgent.match(/(iPod|iPhone|iPad)/), {
        firstname: "Enter your first name",
        lastname: "Enter your last name",
        email: "Enter a valid email address",
        phone: "Enter your phone number",
        company: "Enter your company name",
        dropdown: "Please select from dropdown",
        number_of_designers: "Enter number of designers at your company",
        company_size__c: "Enter number of employees at your company"
    });
    ENTTwoStepForms.cacheSelectors = function() {
        ENTTwoStepForms.cache = {
            $html: $("html"),
            $body: $("body"),
            $form: $body.find(".hbspt-form"),
            $inputDivs: $body.find(".hbspt-form .hs-form-field"),
            $nameDivs: $body.find(".hbspt-form .hs_firstname.hs-form-field, .hbspt-form .hs_lastname.hs-form-field"),
            $firstInputDivs: $body.find(".hbspt-form .hs-form-field:lt(4)"),
            $secondInputDivs: $body.find(".hbspt-form .hs-form-field:gt(3)"),
            $submitSection: $body.find(".hbspt-form .hs_submit"),
            $inputs: $body.find(".hbspt-form .hs-form-field input")
        }
    }, ENTTwoStepForms.globalSelectors = function() {
        ENTTwoStepForms.global = {
            $win: $(t),
            windowWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        }
    }, ENTTwoStepForms.init = function(t) {
        $(t).wrap('<div class="hbspt-form"></div>'), $(t).before('<p id="form_steps">Step <span>1</span> of 2</p>'), $(t).binnacle({
            color: "#2386db"
        }), ENTTwoStepForms.cacheSelectors(), n(), r(), i()
    };
    var n = function() {
            ENTTwoStepForms.cache.$nameDivs.addClass("inline"), ENTTwoStepForms.cache.$secondInputDivs.hide(), $(".hbspt-form form>div:gt(3):not(.hs_submit)").hide(), ENTTwoStepForms.cache.$inputDivs.each(function() {
                var t = $(this).find("input"),
                    n = $(this).find("select"),
                    i = t.attr("name"),
                    o = '<svg class="chevron" viewBox="0 0 50 50"><polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 "/></svg>';
                t.after('<span class="error off">' + e[i] + "</span>"), n.after('<span class="error off">' + e.dropdown + "</span>"), "" != $(this).find("input").val() && 0 == $(this).find("select").length ? $(this).find("label").addClass("on") : $(this).find("select").length > 0 && ($(this).addClass("dropdownDiv"), "" != $(this).val() && $(this).find("label").addClass("on"), $(this).append(o));
                var r = $(this).find("label").text();
                $(this).find("label").text(r.replace("*", ""))
            }), ENTTwoStepForms.cache.$inputs.each(function() {
                $(this).removeAttr("placeholder")
            }), ENTTwoStepForms.cache.$inputDivs.on("click", function() {
                $(this).hasClass("dropdownDiv") && ($(this).closest(".hs-form-field").addClass("on"), $(this).closest(".hs-form-field").find("label").addClass("on"))
            }), ENTTwoStepForms.cache.$inputs.on("focus", function() {
                $(this).closest(".hs-form-field").addClass("on"), $(this).closest(".hs-form-field").find("label").addClass("on")
            }), ENTTwoStepForms.cache.$inputs.on("blur", function() {
                $(this).closest(".hs-form-field").removeClass("error"), $(this).closest(".hs-form-field").removeClass("on"), $(this).closest(".hs-form-field").find("span.error").addClass("off"), "" == $(this).val() && $(this).closest(".hs-form-field").find("label").removeClass("on")
            })
        },
        i = function() {
            $('<div class="checked hidden"><svg version="1.1" width="15" height="12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 15 12" enable-background="new 0 0 15 12" xml:space="preserve"><polygon fill="#1679D9" points="4.8,12 0,6.8 1.8,5.1 4.9,8.4 13.2,0 15,1.8 "/></svg></div>');
            $(".hbspt-form").find("form").each(function() {
                var t = $(this),
                    e = t.find('[name="firstname"]'),
                    n = t.find('[name="lastname"]'),
                    i = t.find('[name="email"]'),
                    o = t.find('[name="phone"]'),
                    r = t.find('[name="company"]'),
                    s = t.find('[name="number_of_designers"]'),
                    a = t.find('[name="company_size__c"]'),
                    l = (t.find("input"), new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$", "i"), t.find('[type="submit"]')),
                    u = function(t, e) {
                        var n = "undefined" == typeof e || e,
                            i = t;
                        return !i.hasClass("required") && "" === i.val() || i.find(".hs-error-msgs") ? (n && (i.addClass("error"), i.closest(".hs-form-field").addClass("error")), !1) : (i.removeClass("error"), 0 === i.parent().find(".checked").length, !0)
                    },
                    c = function(t, e) {
                        var n = "undefined" == typeof e || e,
                            i = t;
                        return i.hasClass("required") || "" !== i.val() ? (i.removeClass("error"), 0 === i.parent().find(".checked").length, !0) : (n && i.addClass("error"), !1)
                    },
                    h = function(t, e) {
                        var n = t;
                        return "" == n.val() || (n.removeClass("error"), 0 === n.parent().find(".checked").length), !0
                    },
                    d = function(t, e) {
                        var n = "undefined" == typeof e || e,
                            i = t;
                        return i.hasClass("required") || "" !== i.val() ? (i.css({
                            "border-color": "#e5e5e5"
                        }), setTimeout(function() {
                            i.removeClass("error")
                        }, 250), !0) : (n && i.addClass("error"), i.removeAttr("style"), !1)
                    },
                    p = function(t, e) {
                        var n = "undefined" == typeof e || e,
                            i = t;
                        return i.hasClass("required") || "" !== i.val() ? (i.removeClass("error"), 0 === i.parent().find(".checked").length, !0) : (n && i.addClass("error"), !1)
                    },
                    f = function(t, e) {
                        var n = "undefined" == typeof e || e,
                            i = t;
                        return i.hasClass("required") || null != i.val() ? (i.removeClass("error"), !0) : (n && i.addClass("error"), !1)
                    };
                u(e, !1), c(n, !1), h(i, !1), d(o, !1), p(r, !1), f(s, !1), f(a, !1), e.on("change", function() {
                    u($(this))
                }), n.on("change", function() {
                    c($(this))
                }), i.on("change", function() {
                    var t = $(this);
                    "" != t.val() && (t.removeClass("error"), t.removeClass("invalid"), 0 === t.parent().find(".checked").length), setTimeout(function() {
                        t.hasClass("error") || t.hasClass("invalid")
                    }, 500)
                }), o.on("change", function() {
                    d($(this))
                }), r.on("change", function() {
                    p($(this))
                }), s.on("change", function() {
                    f($(this), !0)
                }), a.on("change", function() {
                    f($(this), !0)
                }), l.click(function(e) {
                    e.preventDefault();
                    var n = ENTTwoStepForms.cache.$secondInputDivs,
                        o = 0;
                    if (n.each(function() {
                            var t = $(this).find("input"),
                                e = $(this).find("select.hide-me"),
                                n = $(this).find("span.error");
                            return t.length && "" === t.val() || e.length && null === e.val() ? (t.addClass("error"), e.addClass("error"), $(this).addClass("error"), n.removeClass("off"), o++, !1) : (t.removeClass("error"), e.removeClass("error"), $(this).removeClass("error"), n.addClass("off"), void 0)
                        }), o > 0) return !1;
                    t.submit();
                    var r = new Track;
                    r.signupEnterprise(i.val()), window.optimizely.push(["trackEvent", "enterpriseSignup"])
                })
            })
        };
    ENTTwoStepForms.styleDropdown = function() {
        var t = $(".hs-input").css("color"),
            e = $("select.hs-input");
        e.change(function() {
            $(this).css("color") != t && $(this).css("color", t)
        })
    }, ENTTwoStepForms.closeDropdown = function(t) {
        var e = $(t);
        e.removeClass("open"), e.find(".options").stop().animate({
            height: 0
        }, 150)
    };
    var o = function(t) {
        var e = $(t),
            n = e.find("select"),
            i = 100;
        n.each(function() {
            var t = $(this),
                e = t.val(),
                n = t.clone(),
                o = t.parents(".input");
            if (n.val(e).change(), o.addClass("custom-dropdown").prepend('<div class="overlay"></div>').after(n.addClass("hide-me")), t.attr("name", "faux"), t.attr("data-clone-of", n.attr("name")), void 0 != typeof e && null != e && (t.closest(".hs-form-field").find("label").addClass("on"), t.css({
                    visibility: "visible"
                })), t.siblings(".options").length <= 0) {
                t.after('<div class="options"></div>');
                var r = t.siblings(".options");
                t.find("option:not(:first)").each(function() {
                    r.append('<div class="option"><p>' + $(this).text() + "</p></div>"), t.parents(".hs-form-field").css({
                        "z-index": i--
                    })
                })
            }
        }), e.find("select.hide-me").attr("type", "hidden").hide(), $(t).find(".option").on("click", function(t) {
            t.stopPropagation();
            var e = $(this).find("p").text(),
                n = $(this).closest(".hs-form-field"),
                i = $(this).parents(".options"),
                o = $(this).parents(".input"),
                r = o.find('[name="faux"]'),
                s = i.siblings("select"),
                a = o.siblings("select.hide-me"),
                l = n.find("span.error");
            s.val(e).change(), a.val(e).change(), i.stop().animate({
                height: 0
            }, 150, function() {
                $(this).parents(".custom-dropdown").removeClass("open")
            }), s.addClass("selected"), r.css({
                visibility: "visible"
            }), n.removeClass("on").removeClass("error"), l.addClass("off")
        }), $(t).find(".custom-dropdown").on("click", function(t) {
            var e = $(this),
                n = e.find("select"),
                i = e.hasClass("open"),
                o = e.find(".option:first").outerHeight(),
                r = i ? 0 : n.children("option").length - 1;
            i || ENTTwoStepForms.closeDropdown($(".custom-dropdown.open")), e.find(".options").stop().animate({
                height: o * r
            }, 150, function() {
                i ? e.removeClass("open") : e.addClass("open")
            })
        }), $(":not(.custom-dropdown)").on("click", function() {
            ENTTwoStepForms.closeDropdown($(".custom-dropdown.open"))
        }), $(window).resize(function() {
            ENTTwoStepForms.closeDropdown($(".custom-dropdown.open"))
        })
    };
    ENTTwoStepForms.validateEmailOnBVStyle = function(t, e) {
        var n = e,
            i = n.closest(".hs-form-field"),
            o = i.find("span.error");
        $.post("/api/validateEmailBV", {
            email: n.val(),
            hs_context: JSON.stringify({
                hutk: Cookies.get("hubspotutk"),
                pageUrl: "https://criticoapp.com/trial/enterprise",
                pageName: "Enterprise Trial"
            })
        }, function(e) {
            return "invalid" != e.status ? (n.removeClass("error"), o.addClass("off"), n.closest(".hs-form-field").removeClass("error"), null !== t && t(), !0) : (n.addClass("error"), o.removeClass("off"), n.closest(".hs-form-field").addClass("error"), !1)
        })
    };
    var r = function(t) {
        var e = ENTTwoStepForms.cache.$form,
            n = ENTTwoStepForms.cache.$body.find("p#form_steps span"),
            i = ENTTwoStepForms.cache.$firstInputDivs,
            r = ENTTwoStepForms.cache.$secondInputDivs,
            s = e.find(".hs_submit"),
            a = s.find("input").hide(),
            l = '<a id="continueBtn" class="try-ent-cta primary large">Continue</a>';
        a.before(l), o(e);
        var u = e.find("#continueBtn");
        u.on("click", function() {
            var t = e.find('[name="email"]'),
                o = i.hasClass("error").length,
                s = o > 0,
                l = !1;
            return i.each(function() {
                var t = $(this).find("input"),
                    e = t.closest(".hs-form-field"),
                    n = e.find("span.error");
                return "" === t.val() ? (t.addClass("error"), e.addClass("error"), n.removeClass("off"), l = !0, !1) : void(t.hasClass("error") || t.hasClass("invalid") || (t.removeClass("error"), e.removeClass("error"), n.addClass("off")))
            }), !s && !l && void ENTTwoStepForms.validateEmailOnBVStyle(function() {
                n.text("2"), u.remove(), i.hide(), $(".hbspt-form form>div:lt(4):not(.hs_submit)").hide(), $(".hbspt-form form>div:gt(3):not(.hs_submit)").show(), r.show(), a.show()
            }, t)
        })
    }
}(this), $(function() {
        function t() {
            $("#fixed-ad").remove(), $("#tshirt_modal").remove(), $("#tshirt_sticky").remove(), $.tinybox({
                padding: 0,
                autoDimensions: !0,
                href: "#enterprise_offer_modal",
                wrapCSS: "enterprise_offer_modal",
                afterShow: function() {
                    i.fadeOut()
                },
                afterClose: function() {}
            })
        }
        var e = $("body");
        if (!(e.hasClass("home") || e.hasClass("customers") || e.hasClass("plans"))) return !1;
        var n = $("#enterprise_offer_modal"),
            i = $("#enterprise_offer_sticky");
        Modernizr.mq("(min-width: 1024px)"),
            navigator.userAgent.match(/(Android|WebOS|iPhone|iPad|iPod|Blackberry|IE mobile|Opera Mini)/);
        n.find("a.close").click(function() {
            $.tinybox.close()
        }), isValidUserENTFlag && 1 != Cookies.get("dont-show-ent-offer") && (e.hasClass("home") || e.hasClass("customers") || e.hasClass("plans")) && (t(), setCookieWithExpiry("dont-show-ent-offer", 1, 60))
    }), $(function() {
        function t(t, e, n) {
            this.form = $(t), this.thankYouSection = $(e);
            var i = !1,
                o = $.extend({
                    apiPath: "",
                    formID: ""
                }, n || {}),
                r = function() {
                    $(".dropdown .option").mousedown(function() {
                        $input_field_container = $(this).parents(".input_field"), $input = $(this).parents(".dropdown").siblings(".dropdown_input_field"), $input.val($(this).data("value")), $input_field_container.addClass("entered")
                    }), $(t).find(".dropdown_input_field").focus(function(t) {
                        $dropdown = $(this).siblings("section.dropdown"), i && $dropdown.css({
                            width: "300%",
                            left: "-200%"
                        }), $dropdown.show(200), t.preventDefault()
                    }), $(t).find(".dropdown_input_field").blur(function(t) {
                        $dropdown = $(this).siblings("section.dropdown"), $dropdown.hide(200), t.preventDefault()
                    })
                },
                s = (function() {
                    $(t).find('input[type="submit"]').click(function() {
                        $(this).parents("form.critico_form").attr("data-attempted-submit", "true")
                    }), r()
                }(), function() {
                    $(t).addClass("submitted"), $(t).find(".row").addClass("submitted"), $(t).find("input").addClass("submitted"), $(t).siblings("hgroup").addClass("submitted"), $(e).addClass("show"), $("[data-ent-video-bg]").each(function() {
                        var t = $(this);
                        t.backstretch("/assets/img/enterprise/" + t.data("ent-video-bg") + ".jpg", {
                            centeredX: !0,
                            centeredY: !1
                        })
                    });
                    var n = $(e).find("#overlay"),
                        i = $(e).find("#video #poster");
                    $(e).find("#play-cta svg").click(function(t) {
                        $(i).animate({
                            opacity: 0
                        }, 1e3, function() {
                            $(i).hide()
                        }), $(n).animate({
                            opacity: 0
                        }, 1e3, function() {
                            $(n).hide()
                        });
                        var e = Wistia.api("thank-you-video");
                        e.play(), t.preventDefault()
                    })
                }),
                a = function() {
                    $inputs = $(t).find(".input_field input"), $inputs.each(function() {
                        $parent = $(this).parents(".input_field"), $label = $(this).siblings("label"), "" === $(this).val() ? $(this).parents(".input_field").removeClass("focus entered") : $(this).parents(".input_field").addClass("entered").removeClass("focus"), "true" === $(this).parents("form.critico_form").attr("data-attempted-submit") && ($(this).valid() === !0 ? $label.addClass("error_override") : $label.removeClass("error_override"))
                    })
                };
            this.manageFields = function() {
                a(), $inputs = this.form.find("input"), $inputs.focus(function() {
                    a(), $(this).parents(".input_field").addClass("focus")
                }), $inputs.blur(function() {
                    a(), $(this).parents(".input_field").removeClass("focus"), $(this).valid() === !0 || ($(this).removeClass("error"), $(this).siblings("label").addClass("error_override"))
                })
            }, this.setupFormValidation = function() {
                s(), resetThisForm = function(n) {
                    n.find(".show").removeClass("show"), $inputs = $(t).find(".input_field input"), $inputs.each(function() {
                        $(this).removeClass("error")
                    });
                    var i = $(e).find("#overlay"),
                        o = $(e).find("#video #poster");
                    i.show().css({
                        opacity: 1
                    }), o.show().css({
                        opacity: 1
                    })
                }, this.form.binnacle({
                    className: "binnacle w100",
                    color: "#ff3366"
                }), this.form.validate({
                    rules: {
                        request_firstname: {
                            required: !0
                        },
                        request_lastname: {
                            required: !0
                        },
                        request_email: {
                            required: !0,
                            email: !0
                        },
                        request_phone: {
                            required: !0
                        },
                        request_company: {
                            required: !0
                        },
                        request_company_size: {
                            required: !0
                        },
                        request_comments: {
                            required: !1
                        }
                    },
                    messages: {
                        request_firstname: "Enter your First Name",
                        request_lastname: "Enter your Last Name",
                        request_email: "Enter your Email",
                        request_phone: "Enter your Phone Number",
                        request_company: "Enter your Company Name",
                        request_company_size: "Size?"
                    },
                    submitHandler: function(t) {
                        var e = document.getElementsByTagName("title")[0].innerHTML,
                            n = window.location.href,
                            i = "https://forms.hubspot.com/uploads/form/v2/425470/" + o.formID,
                            r = $("#xsrfFormToken").val(),
                            a = function(a) {
                                $.post(o.apiPath, {
                                    request_firstname: $("#request_firstname").val(),
                                    request_lastname: $("#request_lastname").val(),
                                    request_email: $("#request_email").val(),
                                    request_phone: $("#request_phone").val(),
                                    request_company: $("#request_company").val(),
                                    request_company_size: $("#request_company_size").val(),
                                    request_comments: $("#request_comments").val(),
                                    formUrl: i,
                                    token: r,
                                    hs_context: JSON.stringify({
                                        hutk: Cookies.get("hubspotutk"),
                                        pageUrl: n,
                                        pageName: e
                                    })
                                }, function(e) {
                                    if (200 === e.status) {
                                        s();
                                        var n = new Track;
                                        n.lead($("#request_email").val()), $(t).attr("data-attempted-submit", "false"), $(t).find(".entered").removeClass("entered"), $(t).find(".error").removeClass("error"), e.newToken && $("input#xsrfFormToken").val(e.newToken);
                                        var i = $(t).validate();
                                        i.resetForm(), $(t)[0].reset(), resetThisForm($(t))
                                    }
                                })
                            },
                            l = $("#request_email");
                        $.post("/api/validateEmailBV", {
                            email: l.val(),
                            hs_context: JSON.stringify({
                                hutk: Cookies.get("hubspotutk"),
                                pageUrl: "https://criticoapp.com",
                                pageName: "Marketing Form"
                            })
                        }, function(t) {
                            return "invalid" == t.status ? (l.next(".bv-error").remove(), l.after('<label class="bv-error error">Please Enter an Active Email</label>'), !1) : void a(t)
                        })
                    }
                })
            }
        }
        var e = new t("form.critico_form", "#thanks_enterprise", {
            apiPath: "/api/letsTalk",
            formID: "e74740ea-1216-4b51-88af-d12892a950a3"
        });
        e.setupFormValidation(), e.manageFields()
    }), $(function() {
        function t(t, e, n) {
            var i = {};
            return $.each(t, function(t, o) {
                o[e] == n && (i = o)
            }), i
        }
        if (Modernizr.touch || $("html").hasClass("lt-ie9")) return !1;
        var e = ($("body"), $("#psd_download_modal")),
            n = location.search.replace("?", "").split("&").map(function(t) {
                return t.split("=")
            }),
            i = n[0][1];
        if (isNaN(i)) return !1;
        var o = [{
                downloadID: 1,
                imageURL: "/images/dribble_1.png",
                downloadURL: "https://www.dropbox.com/s/1jh475srlf5izi8/critico-skins.psd",
                emailIntro: "Hey, here's your free PSD download!",
                emailDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat porttitor libero.",
                emailTwitterLink: "",
                emailFBLink: "",
                emailPinLink: ""
            }, {
                downloadID: 2,
                imageURL: "/images/sketch_2.png",
                downloadURL: "https://s3.amazonaws.com/www-assets.criticoapp.com/source.sketch",
                emailIntro: "Hey, here's your free Sketch UI kit!",
                emailDescription: "Your design buddies are going to love this.",
                emailTwitterLink: "",
                emailFBLink: "",
                emailPinLink: ""
            }],
            r = t(o, "downloadID", i);
        if (void 0 === r.imageURL) return !1;
        var s = (r.shotID, r.downloadURL, r.imageURL);
        e.find(".shot").append('<img width="400px" src="' + s + '"/>');
        var a, l = ($(this), $("#psd_download_email"));
        $.tinybox({
            padding: 0,
            autoDimensions: !0,
            href: "#psd_download_modal",
            afterShow: function() {
                e.find("input[type=text]").focus()
            }
        }), $(".psd_download_form").validate({
            rules: {
                psd_download_email: {
                    required: !0,
                    email: !0
                }
            },
            submitHandler: function(t) {
                $.post("/api/psdDownload", {
                    email: l.val(),
                    downloadID: i,
                    hs_context: JSON.stringify({
                        hutk: $.cookie("hubspotutk"),
                        pageUrl: window.location.href,
                        pageName: document.title
                    })
                }, function() {
                    $.tinybox({
                        content: $("#psd_download_modal_confirmation"),
                        padding: 0,
                        afterShow: function() {
                            a = setTimeout(function() {
                                $.tinybox.close()
                            }, 5e3)
                        },
                        afterClose: function() {
                            clearTimeout(a)
                        }
                    })
                })
            }
        })
    }), $(function() {
        function t() {
            try {
                ! function(t, e, n, i, o, r, s) {
                    t.fbq || (o = t.fbq = function() {
                        o.callMethod ? o.callMethod.apply(o, arguments) : o.queue.push(arguments)
                    }, t._fbq || (t._fbq = o), o.push = o, o.loaded = !0, o.version = "2.0", o.queue = [], r = e.createElement(n), r.async = !0, r.src = i, s = e.getElementsByTagName(n)[0], s.parentNode.insertBefore(r, s))
                }(window, document, "script", "//connect.facebook.net/en_US/fbevents.js"), fbq("init", "609729382476743"), fbq("track", "Lead")
            }
            catch (t) {}
            try {
                ! function(t, e, n, i, o, r, s) {
                    t.GoogleAnalyticsObject = o, t[o] = t[o] || function() {
                        (t[o].q = t[o].q || []).push(arguments)
                    }, t[o].l = 1 * new Date, r = e.createElement(n), s = e.getElementsByTagName(n)[0], r.async = 1, r.src = i, s.parentNode.insertBefore(r, s)
                }(window, document, "script", "https://www.google-analytics.com/analytics_debug.js", "ga"), window.ga_debug = {
                    trace: !0
                }, ga("create", "UA-24306919-2", "auto"), ga("send", {
                    hitType: "event",
                    eventCategory: "CTA",
                    eventAction: "Click",
                    eventLabel: "Contact Sales"
                })
            }
            catch (t) {}
        }
        $("a#contact_sales").click(function() {
            t()
        });
        var e = function() {
                $("#request_call_bkg").animate({
                    opacity: 0
                }, 200, function() {
                    $("#request_call_bkg").css({
                        display: "none"
                    })
                })
            },
            n = function() {
                $(".modal_form_thanks").removeClass("show"), $("form").each(function() {
                    "false" === $(this).attr("data-attempted-submit") && $(this).find(".error").each(function() {
                        $(this).removeClass("error")
                    })
                }), $(".submitted").each(function() {
                    $(this).removeClass("submitted")
                }), $("#request_call_bkg").css({
                    display: "block"
                }).animate({
                    opacity: 1
                }, 200)
            };
        $("a#contact_sales").click(function() {
            n()
        }), $("a#contact_sales").on("open-contact-sales", function() {
            n()
        }), $("#request_call_bkg").click(function() {
            e()
        }), $("#request_call_bkg #request_call_modal").click(function(t) {
            t.stopPropagation()
        }), $form = $("form.critico_form"), $submitBtn = $form.find('input[type="submit"]'), $submitBtn.click(function() {
            $("span#required").addClass("submitted")
        })
    }),
    function(t) {
        "use strict";
        t.SignupModal = t.SignupModal || {}, SignupModal.cacheSelectors = function() {
            SignupModal.cache = {
                $html: $("html"),
                $body: $("body"),
                $modal: $(".signup-modal"),
                $stdModal: $(".signup-modal.standard-trial"),
                $entModal: $(".signup-modal.enterprise-trial"),
                $input: $(".signup-modal").find("input[type=text], input[type=password]"),
                $modalTrigger: $(".trial-trigger"),
                $btnClose: $(".signup-modal").find(".close"),
                $modalContent: $(".signup-modal").find(".content"),
                $modalViewThankyou: $(".signup-modal").find(".thankyou"),
                $modalViewSignUp: $(".signup-modal").find(".signup"),
                $modalForm: $(".signup-modal").find("form"),
                $btnShare: $(".signup-modal").find(".share a"),
                $btnVideoPlay: $(".signup-modal").find("#play-cta svg"),
                query: SignupModal.parseURL()
            }
        }, SignupModal.init = function() {
            SignupModal.cacheSelectors(), SignupModal.openModal(), SignupModal.closeModal(), SignupModal.labelShift(), SignupModal.submitForm(), SignupModal.playVideo(), SignupModal.bindShares(), SignupModal.isValidUser(), SignupModal.parseQueryParams()
        }, SignupModal.isValidUser = function() {
            return "YES" == Cookies.get("INV_CUSTOMER_LOCAL") || "YES" == Cookies.get("INV_CUSTOMER_QA") || "YES" == Cookies.get("INV_CUSTOMER_LIVE")
        }, SignupModal.parseURL = function() {
            return document.location.search.replace(/(^\?)/, "").split("&").map(function(t) {
                return t = t.split("="), this[t[0]] = t[1], this
            }.bind({}))[0]
        }, SignupModal.parseQueryParams = function() {
            function e(t, e) {
                e || (e = window.location.href), t = t.replace(/[\[\]]/g, "\\$&");
                var n = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)"),
                    i = n.exec(e);
                return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
            }
            var n = SignupModal.cache.query,
                i = e("standard_trial_modal"),
                o = e("enterprise_trial_modal");
            if (n.hasOwnProperty("standard_trial_modal") && SignupModal.cache.$stdModal || n.hasOwnProperty("enterprise_trial_modal") && SignupModal.cache.$entModal) {
                "true" == i ? SignupModal.standardModalOn() : "true" == o && SignupModal.enterpriseModalOn();
                var r = t.location.toString();
                if (r.indexOf("?") > 0 && t.history.replaceState) {
                    var s = r.substring(0, r.indexOf("?"));
                    t.history.replaceState({}, document.title, s)
                }
            }
            else n.hasOwnProperty("contact-sales") && $("a#contact_sales").trigger("open-contact-sales")
        }, SignupModal.openModal = function() {
            SignupModal.cache.$modalTrigger.on("click", function(t) {
                SignupModal.enterpriseModalOn()
            })
        }, SignupModal.standardModalOn = function() {
            SignupModal.cache.$stdModal.addClass("on")
        }, SignupModal.enterpriseModalOn = function() {
            SignupModal.cache.$entModal.addClass("on")
        }, SignupModal.closeModal = function() {
            SignupModal.cache.$modal.on("click", function(t) {
                ($(t.target).hasClass("signup-modal") || $(t.target).hasClass("close")) && (SignupModal.cache.$modal.removeClass("on"), SignupModal.cache.$modalContent.removeClass("thankyou"), SignupModal.cache.$modalViewThankyou.hide(), SignupModal.cache.$modalViewSignUp.fadeIn())
            })
        }, SignupModal.labelShift = function() {
            SignupModal.cache.$input.on("focus", function() {
                $(this).parent().find("label").addClass("on"), $(this).parent().addClass("on"), SignupModal.cache.$input.not(this).each(function() {
                    var t = $(this).val();
                    "" == t && $(this).parent().find("label").removeClass("on")
                })
            }), SignupModal.cache.$input.on("blur", function() {
                var t = $(this).val();
                $(this).parent().removeClass("on"), "" != t && ($(this).parent().removeClass("error"), $(this).parent().find("span.error").addClass("off"))
            })
        }, SignupModal.submitForm = function() {
            SignupModal.cache.$modalForm.each(function() {
                var t, e = $(this),
                    n = $(this).closest(".signup-modal");
                e.submit(function(i) {
                    i.preventDefault(), n.hasClass("enterprise-trial") ? (t = "enterprise", e.binnacle({
                        color: "#2f7bbd"
                    })) : (t = "standard", e.binnacle({
                        color: "#ff3366"
                    })), e.find("span.error").remove();
                    var o = e.find("#firstname").val(),
                        r = e.find("#lastname").val(),
                        s = (e.find("#signup_first").val(), e.find("#email").val()),
                        a = e.find("#phone").val(),
                        l = e.find("#companyname").val(),
                        u = e.find("#signup_email").val(),
                        c = 0,
                        h = e.find("input[type=text], input[type=password]");
                    h.each(function() {
                        var t = $(this).val(),
                            e = !$(this).hasClass("optional_field"),
                            n = "phone" === $(this).attr("id");
                        if ("" == t && (!n || n && e)) {
                            c = 1;
                            var i = $(this).data("errormsg");
                            $(this).parent().addClass("error").append('<span class="error">' + i + "</span>")
                        }
                    });
                    var d = function(t, e) {
                        var n = t.find("#email").parent();
                        n.find(".error").remove(), n.addClass("error"), n.append('<span class="error">' + e + "</span>")
                    };
                    if ("standard" == t && u.length < 5) {
                        c = 1;
                        var p = $(this).find("#signup_email"),
                            f = p.data("errormsg");
                        p.parent().addClass("error").append('<span class="error">' + f + "</span>")
                    }
                    var m = function(e) {
                        var n = 0;
                        if (n = "invalid" != e.status ? 0 : 1, 1 == n) {
                            var i = SignupModal.cache.$modalForm.find("#email"),
                                u = i.data("errormsg");
                            i.parent().addClass("error").append('<span class="error">' + u + "</span>")
                        }
                        else {
                            var c = $("#xsrfFormToken").val();
                            if ("enterprise" == t) $.post("/api/modalsignup", {
                                firstname: o,
                                lastname: r,
                                email: s,
                                phone: a,
                                companyName: l,
                                token: c,
                                formurl: "https://forms.hubspot.com/uploads/form/v2/425470/11e387b4-fff3-4915-884e-e714e13ead32",
                                hs_context: JSON.stringify({
                                    hutk: Cookies.get("hubspotutk"),
                                    pageUrl: "https://criticoapp.com/enterprise",
                                    pageName: "Enterprise"
                                })
                            }, function(t) {
                                t.newToken && $("input#xsrfFormToken").val(t.newToken), $("[data-ent-video-bg]").each(function() {
                                    var t = $(this);
                                    t.backstretch("/assets/img/enterprise/" + t.data("ent-video-bg") + ".jpg", {
                                        centeredX: !0,
                                        centeredY: !1
                                    })
                                }), SignupModal.cache.$modalViewSignUp.hide(), SignupModal.cache.$modalContent.addClass("thankyou"), SignupModal.cache.$modalViewThankyou.show(), "" != a && window.optimizely.push(["trackEvent", "phone_number_received"]);
                                var e = new Track;
                                $.when(e.signupEnterprise(s)).done(function() {
                                    SignupModal.cache.$input.val("")
                                }), window.optimizely = window.optimizely || [], window.optimizely.push(["trackEvent", "enterpriseSignup"])
                            }).always(function() {
                                SignupModal.cache.$modalForm.data("isSubmissionInProgress", !1)
                            });
                            else {
                                SignupModal.cache.$modalForm.addClass("process"), SignupModal.cache.$modalForm.append('<div class="binnacle"><svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" enable-background="new 0 0 40 40"><path fill="#ff3366" d="M36.4-.1h-32.8c-2 0-3.6 1.7-3.6 3.7v32.8c0 2 1.6 3.6 3.6 3.6h32.8c2 0 3.6-1.6 3.6-3.6v-32.8c0-2-1.6-3.7-3.6-3.7zm-23 7.9c1.3 0 2.4 1 2.4 2.4s-1.1 2.4-2.4 2.4-2.4-1-2.4-2.4c-.1-1.4 1-2.4 2.4-2.4zm16.3 23c-2.5 0-3.7-1.5-3.7-3.5 0-.6.1-1.2.3-1.8l1.2-4.2c.1-.5.2-.9.2-1.3 0-1.4-.8-2.2-2.2-2.2-1.7 0-2.8 1.2-3.4 3.5l-2.3 9.2h-4l.7-2.9c-1.2 1.9-2.8 3.1-4.9 3.1-2.4 0-3.6-1.4-3.6-3.5 0-.5.1-1.2.2-1.8l1.8-7.5h-2.7l.9-3.2h6.8l-2.7 10.7c-.2.7-.3 1.2-.3 1.6 0 .7.3.9.9 1 .3.1 2.9 0 4.3-3.1l1.8-7.1h-2.9l.9-3.2h6.1l-.8 3.6c1.1-2 3.2-3.9 5.4-3.9 2.3 0 4.1 1.6 4.1 4.7 0 .8-.1 1.7-.4 2.6l-1.2 4.4c-.1.4-.2.8-.2 1.1 0 .7.3 1.1.8 1.1s1.2-.4 2-2.6l1.6.6c-.9 3.2-2.6 4.6-4.7 4.6z"></path></svg></div>'), SignupModal.cache.$modalForm[0].submit();
                                var h = new Track;
                                h.signupSelfServe(s), window.optimizely = window.optimizely || [], window.optimizely.push(["trackEvent", "StandardSignup"])
                            }
                        }
                    };
                    return 1 != c && void $.post("/api/validateEmailBV", {
                        email: s,
                        hs_context: JSON.stringify({
                            hutk: Cookies.get("hubspotutk"),
                            pageUrl: "https://criticoapp.com",
                            pageName: "Signup Modal"
                        })
                    }, function(t) {
                        return "invalid" == t.status ? (d(e, "Please enter an active email."), !1) : void m(t)
                    })
                })
            })
        }, SignupModal.playVideo = function() {
            SignupModal.cache.$btnVideoPlay.on("click", function(t) {
                SignupModal.cache.$modal.find("#overlay").fadeOut();
                var e = Wistia.api("thank-you-video-enterprise");
                e.play(), t.preventDefault()
            })
        }, SignupModal.bindShares = function() {
            SignupModal.cache.$btnShare.on("click", function(t) {
                var e = $(this).attr("href"),
                    n = $(this).attr("data-share-title");
                window.open(e, n, "height=600, width=500"), t.preventDefault()
            })
        }, $(SignupModal.init)
    }(this);
var $body = $("body"),
    $tshirtModal = $("#tshirt_modal"),
    $tshirtTweet = $("#tshirt_tweet").clone(),
    $tshirtFollow = $("#tshirt_follow").clone(),
    isShirtModalOpen = !1,
    shirtTimer, modalDelay = 3e5,
    $tshirtSticky = $("#tshirt_sticky");
setupShirtModal(), tshirtFormSubmission(), $(function() {
    "use strict";

    function t() {
        n.fadeIn(500), a.length > 0 && (a.css({
            bottom: "200px",
            right: "25px"
        }), $(".zopim").css({
            bottom: "280px"
        })), n.find(".close").on("click", function(t) {
            t.preventDefault(), e()
        }), i.find(".button a").on("click", function(t) {
            t.preventDefault(), i.fadeOut(250, function() {
                o.fadeIn(250), o.find("input[name=email]").focus()
            })
        })
    }

    function e() {
        $.cookie("dont-show-tshirt-sticky-modal", 1, {
            path: "/",
            expires: 7300
        }), n.fadeOut(250), a.length > 0 && (a.css({
            bottom: "10px",
            right: "10px"
        }), $(".zopim").css({
            bottom: "90px"
        }))
    }
    if (Modernizr.touch || $.cookie("dont-show-tshirt-sticky-modal") || !$("body").hasClass("home") || $("body").hasClass("ent_boxes")) return !1;
    var n = $("#tshirt_sticky"),
        i = n.find(".one"),
        o = n.find(".two"),
        r = n.find(".three"),
        s = n.find(".four"),
        a = $(".zopim-widget-in"),
        l = ($(this), n.find("form").find("input[name=email]"));
    n.find("form").validate({
        rules: {
            email: {
                required: !0,
                email: !0
            }
        },
        submitHandler: function(t) {
            $.post("/api/tshirtSubmission", {
                email: l.val(),
                listSource: "biscuit-tshirt-sticky",
                hs_context: JSON.stringify({
                    hutk: $.cookie("hubspotutk"),
                    pageUrl: window.location.href,
                    pageName: document.title
                })
            }, function() {
                var t = new Track;
                t.lead(l.val()), o.fadeOut(250, function() {
                    r.fadeIn(250), r.find(".button a, .opt-out a").on("click", function() {
                        s.fadeIn(250, function() {
                            $(".global-share a").on("click", function() {
                                e()
                            })
                        })
                    })
                }), $.cookie("dont-show-tshirt-modal", 1, {
                    expires: 30,
                    path: "/"
                }), $.cookie("dont-show-tshirt-sticky-modal", 1, {
                    path: "/",
                    expires: 7300
                })
            })
        }
    }), t()
}), $(function() {
    if ($("body").hasClass("company")) {
        var t = $("#contact_form"),
            e = $("#contact_email"),
            n = $("#contact_name"),
            i = $("#contact_purpose"),
            o = $("#contact_question"),
            r = $("#contact-form-wrapper"),
            s = $("#contact-thankyou-wrapper"),
            a = $("button", s),
            l = $("#core_values"),
            u = $("ul a", l),
            c = 300,
            h = 0;
        u.on("mouseenter", function() {
            var t = $(this);
            h = setTimeout(function() {
                d(t)
            }, 200)
        }).on("mouseleave", function() {
            clearTimeout(h)
        }).on("click", function(t) {
            t.preventDefault()
        });
        var d = function(t) {
            u.removeClass("active"), t.addClass("active"), l.find(".tab.active").finish().fadeOut(c, function() {
                $(this).removeClass("active"), $(".tab" + t.attr("href")).addClass("active").fadeIn(c)
            })
        };
        t.binnacle({
            color: "#ff3366",
            className: "binnacle w100"
        }), t.validate({
            rules: {
                name: {
                    required: !0
                },
                email: {
                    required: !0,
                    email: !0
                },
                question: {
                    required: !0,
                    minlength: 10
                }
            },
            submitHandler: function(a) {
                if (t.data("isSubmissionInProgress")) return !1;
                t.data("isSubmissionInProgress", !0), t.find(".bv-error").remove();
                var l = function(a) {
                    var l = "enterprise" == i.val() ? "/api/getInTouch" : "/api/contact";
                    $.post(l, {
                        name: n.val(),
                        email: e.val(),
                        question: o.val(),
                        purpose: i.val(),
                        hs_context: JSON.stringify({
                            hutk: Cookies.get("hubspotutk"),
                            pageUrl: "https://criticoapp.com",
                            pageName: "Contact Form"
                        })
                    }, function(t) {
                        var a = new Track;
                        $.when(a.lead(e.val())).done(function() {
                            r.fadeOut(300, function() {
                                s.fadeIn(300, function() {
                                    n.val(""), e.val(""), o.val(""), i.val(""), $("label").each(function() {
                                        $(this).data("InFieldLabels").checkForEmpty()
                                    })
                                })
                            })
                        })
                    }).always(function() {
                        t.data("isSubmissionInProgress", !1)
                    })
                };
                $.post("/api/validateEmailBV", {
                    email: e.val(),
                    hs_context: JSON.stringify({
                        hutk: Cookies.get("hubspotutk"),
                        pageUrl: "https://criticoapp.com",
                        pageName: "Contact Form"
                    })
                }, function(n) {
                    return "invalid" == n.status ? (e.addClass("error"), e.parent().after('<p class="bv-error">Please enter an active email.</p>'), t.data("isSubmissionInProgress", !1), !1) : void l(n)
                })
            }
        }), a.on("click", function(t) {
            t.preventDefault(), s.fadeOut(300, function() {
                r.fadeIn(300, function() {
                    n.focus()
                })
            })
        })
    }
})

$(function() {
    function t(t) {
        t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var e = new RegExp("[\\?&]" + t + "=([^&#]*)"),
            n = e.exec(location.search);
        return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
    }
    if ($("body").hasClass("home") || $("body").hasClass("home2") || $("body").hasClass("home3")) {
        window.location.hash && $(window.location.hash).length && (setTimeout(function() {
            location.hash && window.scrollTo(0, 0)
        }, 1), setTimeout(function() {
            TweenLite.to(window, 1, {
                scrollTo: {
                    y: $(window.location.hash).offset().top
                },
                ease: Power2.easeOut
            })
        }, 500)), $("#home-cta").on("click", function(t) {
            t.preventDefault(), TweenLite.to(window, 1, {
                scrollTo: {
                    y: $(".footer-signup").offset().top
                },
                ease: Power2.easeOut,
                onComplete: function() {
                    $(".footer-signup #signup_first").focus()
                }
            })
        }), $("a[href*=#]:not([href=#])").click(function() {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var t = $(this.hash),
                    e = $(this),
                    n = e.data("offset") || 0,
                    i = e.data("duration") || .8;
                if (t = t.length ? t : $("[name=" + this.hash.slice(1) + "]"), t.length) return TweenLite.to(window, i, {
                    scrollTo: {
                        y: t.offset().top - n
                    },
                    ease: Power2.easeOut
                }), !1
            }
        });
        var e = $(document.body),
            n = function() {
                var t = $(window).height();
                t > 1e3 ? e.addClass("large-viewport").removeClass("narrow-viewport") : t < 800 ? e.removeClass("large-viewport").addClass("narrow-viewport") : e.removeClass("large-viewport narrow-viewport")
            };
        n();
        var i;
        $(window).on("resize", function() {
            clearTimeout(i), i = setTimeout(n, 200)
        }), $(".hero").responsiveHero({
            calculateOnMobile: !0,
            logoContainerHeight: $(".trusted-by"),
            navigationHeight: 0,
            remainingSpaceMin: 100,
            containerOffsetTop: 45
        }), $("a.video").tinybox({
            openEffect: "none",
            closeEffect: "none",
            height: 540,
            width: 960,
            helpers: {
                media: {}
            },
            padding: 0,
            beforeShow: function() {
                $.cookie("modal-showing", 1)
            },
            beforeClose: function() {
                $.removeCookie("modal-showing")
            }
        });
        var o = $(".tour-item"),
            r = [{
                base: "mobile",
                dur: 6e3,
                width: 1049,
                height: 706
            }, {
                base: "realtime",
                dur: 4e3,
                width: 932,
                height: 663
            }, {
                base: "feedback",
                dur: 4e3,
                width: 1142,
                height: 748
            }, {
                base: "manage",
                dur: 3e3,
                width: 926,
                height: 665
            }, {
                base: "sourcecontrol",
                dur: 6e3,
                width: 934,
                height: 662
            }];
        e.hasClass("alt") && (r = [{
            base: "section 1",
            id: "1",
            width: "900",
            height: "517"
        }, {
            base: "section 2",
            id: "2",
            width: "900",
            height: "517"
        }, {
            base: "section 3",
            id: "3",
            width: "1235",
            height: "800"
        }, {
            base: "section 4",
            id: "4",
            width: "1235",
            height: "800"
        }, {
            base: "section 5",
            id: "5",
            width: "1235",
            height: "800"
        }, {
            base: "section 6",
            id: "6",
            width: "1235",
            height: "800"
        }, {
            base: "section 7",
            id: "7",
            width: "1235",
            height: "800"
        }, {
            base: "section 8",
            id: "8",
            width: "1235",
            height: "800"
        }, {
            base: "section 9",
            id: "9",
            width: "1235",
            height: "800"
        }]), o.each(function() {
            var t = $(this),
                n = r[t.data("i")];
            e.hasClass("alt") ? $(".ani-wrapper", t).html('<img class="no-retina" alt="lorem ipsum whatever ' + n.base + '" src="/images/homepage/main_image-' + n.id + '.png" width="' + n.width + '" height="' + n.height + '" />').show() : (t.data("playing", !1).data("dur", n.dur), $(".ani-wrapper", t).html('<img class="no-retina" alt="prototyping and mockup and ' + n.base + '" src="/assets/img/home/animations/prototyping-mockup-' + n.base + '.gif" width="' + n.width + '" height="' + n.height + '" />').hide(), setTimeout(function() {
                t.data("playing", !1)
            }, n.dur))
        });
        var s = function(t) {
            if (t.data("playing") === !1) {
                var e = r[t.data("i")],
                    n = "/images/homepage/main_image-" + e.base + ".png?r=" + (new Date).getTime();
                $(".ani-wrapper img", t).attr("src", n), $(".ani-wrapper", t).show(), t.data("playing", !0), setTimeout(function() {
                    t.data("playing", !1)
                }, e.dur)
            }
        };
        o.waypoint({
            handler: function(t) {
                "down" == t && s($(this))
            },
            offset: "75%"
        }).waypoint({
            handler: function(t) {
                "up" == t && s($(this))
            },
            offset: "-80%"
        }), Modernizr.touch && $(".userstory").on("touchstart", function() {
            $(this).trigger("mouseenter")
        }).on("touchend", function() {
            $(this).trigger("mouseleave")
        });
        var a = new FullscreenVideo({
            playerId: "ad",
            mp4: "",
            webm: "",
            ogv: ""
        });
        a.initialize();
        var l = window.location.hash;
        l = l.match(/#[^?&\/]*/g);
        var u = t("video");
        "y" == u && a.openVideoModal(), $(".hero-play").on("click touchend", function() {
            return a.openVideoModal(), !1
        }), $(".hero-modal-close").on("click touchend", function() {
            return a.closeVideoModal(), !1
        }), $("button.inspect").on("click touchend", function() {
            document.location.href = "/feature/inspect"
        }), $(window).on("keyup", function(t) {
            27 == t.keyCode && a.modalVideoOpen && a.closeVideoModal()
        });
        var c = new QuoteSlider;
        c.initialize();
        var h = $("#fixed-ad.ent_banner_on"),
            d = $("#fixed-ad.inspect_on"),
            p = $("#ent-banner-wrapper"),
            f = $("body.home"),
            m = f.find(".hero"),
            g = $("a.hero-modal-close");
        $.cookie("dont-show-inspect-banner") ? $.cookie("dont-show-ent-banner") || (d.hide(), h.show()) : (d.show(), h.hide());
        var v = h.add(d);
        v.each(function() {
            var t = $(this),
                e = "",
                n = "",
                i = t.find("a"),
                o = t.find(".close");
            t.is(h) ? (e = "dont-show-ent-banner", n = "ClickEntLink") : t.is(d) && (e = "dont-show-inspect-banner", n = "ClickInspectLink"), $.cookie(e) && t.hide(), f.length && t.is(":visible") && (f.prepend(t), m.css({
                height: m.outerHeight() - t.outerHeight()
            }), g.css({
                top: "5em"
            })), o.click(function() {
                setCookieWithExpiry(e, 1, 60), t.add(p).animate({
                    top: "-50px"
                }), m.animate({
                    height: m.outerHeight() + t.outerHeight()
                }), setTimeout(throttle, 250)
            }), i.click(function() {
                dataLayer.push({
                    event: "GAEvent",
                    eventCategory: "Banner",
                    eventAction: n,
                    eventLabel: "Source: Homepage",
                    eventValue: void 0
                })
            })
        })
    }
}), $(function() {
    var t = $(document.body);
    t.hasClass("new_feature_single") && ($("#feature-share").waypoint("sticky", {
        offset: 165
    }), function() {
        var e = $(".featured-article").children(),
            n = /IMG|DIV|IFRAME|A/;
        if (!n.test(e[0].tagName) || $(e[0]).hasClass("pro-tip")) {
            var i = e.first().children()[0];
            if ("undefined" != typeof i && !n.test(i.tagName) && !$(e[0]).hasClass("pro-tip")) return;
            t.addClass("no-featured-image")
        }
    }()), $(".featured-article a img").parent().each(function() {
        var t = $(this),
            e = t.attr("href");
        /\.(jpg|jpeg|png|gif)$/.test(e) && t.on("click", function(t) {
            t.preventDefault(), $.tinybox({
                href: e,
                autoSize: !0,
                closeClick: !1,
                openEffect: "fade",
                closeEffect: "fade",
                padding: 0
            })
        })
    }), $("#feature-share a:not(.icon-twitter)").on("click", function(t) {
        t.preventDefault(), popupCenter($(this).attr("href"), "Share critico News", 800, 400)
    }), window.featureURL && "" !== window.featureURL && (window.encodedFeatureURL = encodeURIComponent(window.featureURL), window.encodedFeatureTitle = encodeURIComponent(window.featureText), window.setTimeout(loadTwitterSM, 1e3), window.setTimeout(loadRedditSM, 1e3), window.setTimeout(loadFBLikeSM, 1e3), window.setTimeout(loadLinkedinSM, 1e3), window.setTimeout(loadDeliciousSM, 1e3))
}), $(function() {
    if ($("body").hasClass("new_features")) {
        var t = ["#1abc9c", "#9b59b6", "#3498db", "#ff6d3a", "#2ecc71", "#32cdc7", "#009a9a", "#fe80c0", "#b24a7d", "#76bcff", "#8d708e", "#807fff", "#e74c3c", "#16a085", "#f1c40f", "#27ae60"],
            e = t.length,
            n = Math.floor(Math.random() * e),
            i = function() {
                return n++, n = n >= e ? 0 : n, t[n]
            };
        $(".featured-grid .grid li a").each(function() {
            var t = i();
            $(this).data("hex", t).css("border-top-color", t)
        }).hover(function() {
            var t = $(this);
            t.css({
                background: t.data("hex"),
                "border-color": t.data("hex")
            })
        }, function() {
            var t = $(this);
            t.css({
                background: "none",
                "border-color": "#e1e3e5",
                "border-top-color": t.data("hex")
            })
        })
    }
}), $(function() {
    if ($("body").hasClass("plans")) {
        var t = $("#pricing-matrix").find(".button a"),
            e = ($(".plan-name").text(), $("#fixed-ad.ent_banner_on")),
            n = e.find("span.close"),
            i = e.find("a.fixed-ad-button"),
            o = "dont-show-ent-banner",
            r = $.cookie(o);
        $(t).click(function(t) {
            t.preventDefault();
            var e = $(this),
                n = $(this).closest("td").find(".plan-name").text(),
                i = $(this).attr("href");
            $.when(dataLayer.push({
                event: "GAEvent",
                eventCategory: "CTA Button",
                eventAction: "PlanClick" + n,
                eventLabel: "Source: Plans Page",
                eventValue: void 0
            })).done(function() {
                e.hasClass("enterprise-trigger") || (document.location.href = i)
            })
        }), "undefined" != r && 1 != r && (i.addClass("top-align"), e.addClass("plans-ent-banner").show(), n.add(i).click(function() {
            e.addClass("closed"), setCookieWithExpiry(o, 1)
        }))
    }
}), $(function() {
    "use strict";
    if ($("body").hasClass("security")) {
        var t = $(".all-plans-content"),
            e = $(".enterprise-content"),
            n = $(".compliance-content"),
            i = $(".private-cloud-content"),
            o = $(".all-plans-content, .enterprise-content, .private-cloud-content, .compliance-content"),
            r = $(".all-plans-trigger, .enterprise-trigger, .private-cloud-trigger, .compliance-trigger");
        $(".tab-nav a").on("click", function(s) {
            s.preventDefault();
            var a = $(this);
            o.fadeOut(200), r.removeClass("on"), a.addClass("on"), a.hasClass("all-plans-trigger") ? t.fadeIn(200) : a.hasClass("enterprise-trigger") ? e.fadeIn(200) : a.hasClass("compliance-trigger") ? n.fadeIn(200) : i.fadeIn(200)
        })
    }
}), $(function() {
    if ($("body").hasClass("tshirt")) {
        var t = function() {
            skrollr.init({
                forceHeight: !1
            })
        };
        Modernizr.touch || $.getScript("/assets/js/non-build/skrollr.min.js").then(t), $("#collage li").not(".non-hover").each(function() {
            $(this).data("z", $(this).css("z-index"))
        }).hover(function() {
            $(this).css("z-index", 8)
        }, function() {
            var t = $(this);
            t.css("z-index", t.data("z"))
        });
        var e = function(t) {
            var n = 6,
                i = 4e3,
                o = t < n ? t + 1 : 1;
            $("#critico .quote-container:not(quote-" + t + ")").css("opacity", 0), $("#critico .quote-container.quote-" + t).css("opacity", 1), setTimeout(function() {
                e(o)
            }, i)
        };
        e(1), $("a.video").tinybox({
            openEffect: "none",
            closeEffect: "none",
            height: 540,
            width: 960,
            helpers: {
                media: {}
            },
            padding: 0,
            beforeShow: function() {
                $.cookie("modal-showing", 1)
            },
            beforeClose: function() {
                $.removeCookie("modal-showing")
            }
        }), $(document).on("videoCTA.signup", function() {
            $.tinybox.close(), $("html,body").animate({
                scrollTop: $(".signup-form-wrapper").offset().top - 200
            }, 1e3, function() {
                $(".signup-form-wrapper #signup_first").focus()
            })
        });
        var n = "%23criticotee",
            i = 180;
        $.getJSON("/api/getTshirtTweetPhotos?q=" + n + "&count=" + i + "&since_id=", function(t) {
            var e = "",
                n = "";
            $.each(t, function(t, i) {
                t <= 20 && (e += '<li title="' + i.USER.screen_name + '"><img width="50" height="50" class="avatar" src="' + i.USER.profile_image_url + '"></li>'), n += '<li title="' + i.USER.screen_name + '"><img width="112" height="112" class="avatar" src="' + i.USER.profile_image_url + '"></li></li>'
            }), $("#entrants").html(e), $("#entrants-bg").html(n), $("#entrants img, #entrants-bg img").one("load", function() {
                $(this).parent().animate({
                    opacity: 1
                }, 300), this.complete && $(this).load()
            })
        });
        var o = $("#tshirt_tweet").clone();
        $("#tshirt_form").validate({
            rules: {
                email: {
                    required: !0,
                    email: !0
                }
            },
            submitHandler: function(t) {
                var e = $(t),
                    n = e.find("#tshirt_email");
                $.post("/api/tshirtSubmission", {
                    email: n.val()
                }, function() {
                    $("#signup_last").val(n.val()), $("label").each(function() {
                        $(this).data("InFieldLabels").checkForEmpty()
                    });
                    var t = new Track;
                    t.lead(n.val()), $.tinybox({
                        content: o,
                        padding: 0,
                        afterShow: function() {
                            $(".tshirt_tweet_link").on("click", function(t) {
                                t.preventDefault(), $.tinybox.close(), popupCenter($(".tshirt_tweet_link").attr("href"), "Tweet about critico", 800, 400)
                            })
                        },
                        afterClose: function() {
                            setTimeout(function() {
                                $("html,body").animate({
                                    scrollTop: $("#critico").offset().top - 30
                                }, 750, function() {
                                    $("#signup_first").focus()
                                })
                            }, 1e3)
                        }
                    })
                })
            }
        })
    }
}), $(function() {
    function t() {
        l.removeClass("noTransition")
    }

    function e() {
        a.css({
            position: "",
            display: "block"
        })
    }
    var n = $("body"),
        i = ($(window), $(document));
    $("[data-bg]").each(function() {
        var t = $(this);
        t.backstretch("../images/" + t.data("bg") + ".jpg", {
            centeredX: !0,
            centeredY: !1
        })
    }), $("label").inFieldLabels(), $("select").customSelect(), $('a:not(".no-redirect")[target="_blank"]').each(function() {
        var t = $(this),
            e = t.attr("href");
        t.removeAttr("target"), t.click(function(t) {
            t.preventDefault(), window.open("/redirect?redirect_url=" + e)
        })
    });
    var o = /#feature-([0-9]+)$/;
    if ("/new-features/" == window.location.pathname && o.test(window.location.hash)) {
        var r = window.location.hash.match(/\d+/g);
        n.empty(), $.getJSON("/getFeatureURL/" + r, function(t) {
            t.URL && (window.location = t.URL)
        })
    }
    if (!n.hasClass("fixed-nav")) {
        var s = $("#nav-anchor"),
            a = $("#main-nav-wrapper"),
            l = $("a", a),
            u = 0,
            c = 0;
        s.waypoint({
            handler: function(i) {
                clearTimeout(u), clearTimeout(c), l.addClass("noTransition"), "down" == i ? (n.addClass("fixed-nav"), a.finish().css({
                    "margin-top": -90
                }).animate({
                    "margin-top": 0
                }, 250, function() {
                    u = setTimeout(t, 500)
                })) : a.finish().animate({
                    "margin-top": -90
                }, 100, function() {
                    n.removeClass("fixed-nav"), a.css({
                        "margin-top": 0,
                        display: "none",
                        position: "fixed"
                    }), u = setTimeout(t, 500), c = setTimeout(e, 10)
                })
            },
            offset: -250
        })
    }

    var p = $(".video-container");
    if (p.length && p.find("#tour_video").length) {
        var f = "Tour Video",
            m = $f("tour_video");
        m.addEvent("ready", function() {
            p.find(".play-overlay a").on("click", function(t) {
                t.preventDefault(), $(this).parent().fadeOut(250, function() {
                    m.api("play")
                })
            }), m.addEvent("play", function() {
                analytics.track("Played Video", {
                    video: f
                })
            }), m.addEvent("pause", function(t) {
                analytics.track("Paused Video", {
                    video: f
                })
            }), m.addEvent("finish", function() {
                analytics.track("Finished Video", {
                    video: f
                }), p.find(".play-overlay").fadeIn(250)
            })
        })
    }
    i.on("videoCTA.signup", function() {
        $.tinybox.close(), $("html,body").animate({
            scrollTop: $(".footer-signup").offset().top
        }, 1e3, function() {
            $(".footer-signup #signup_first").focus()
        })
    }), $(".tiny").tinybox({
        fitToView: !1,
        autoSize: !0,
        closeClick: !1,
        openEffect: "none",
        closeEffect: "none",
        padding: 0,
        beforeShow: function() {
            $.cookie("modal-showing", 1)
        },
        beforeClose: function() {
            $.removeCookie("modal-showing")
        }
    }), $(".signup_form").each(function() {
        var t = $(this);
        t.binnacle({
            className: "binnacle w100",
        }), t.validate({
            rules: {
                name: {
                    required: !0
                },
                email: {
                    required: !0,
                    email: !0
                },
                password: {
                    required: !0,
                    minlength: 3
                }
            },
            submitHandler: function(t) {
                var e = $(t).find("input[name=email]"),
                    n = e.val();
                $.post("/api/validateEmailBV", {
                    email: n,
                    hs_context: JSON.stringify({
                        hutk: Cookies.get("hubspotutk"),
                        pageUrl: "https://criticoapp.com/",
                        pageName: "Footer Signup"
                    })
                }, function(i) {
                    var o = 0;
                    if (o = "invalid" != i.status ? 0 : 1, 1 == o) e.addClass("error");
                    else {
                        $("body").hasClass("home") && (window.optimizely = window.optimizely || [], window.optimizely.push(["trackEvent", "homeSignup"])), t.submit();
                        var r = new Track;
                        r.signupSelfServe(n)
                    }
                })
            }
        })
    }), $(".subscribe-form form").validate({
        rules: {
            email: {
                required: !0,
                email: !0
            }
        },
        submitHandler: function(t) {
            var e = $("#subscribe_email");
            $.post("/api/tshirtSubmission", {
                email: e.val(),
                listSource: "website-new-features"
            }, function() {
                var t = new Track;
                $.when(t.lead(e.val())).done(function() {
                    window.location.href = criticoURLs.subscriptionConfirmation
                })
            })
        }
    }), $("#critico_logo").on("contextmenu", function() {
        return $.tinybox({
            padding: 0,
            autoSize: !1,
            autoDimensions: !1,
            width: 660,
            height: "auto",
            href: "#download_modal",
            tpl: {
                wrap: '<div class="tinybox-wrap brand-assets-modal" tabIndex="-1"><div class="tinybox-skin"><div class="tinybox-outer"><div class="tinybox-inner"></div></div></div></div>'
            },
            helpers: {
                overlay: {
                    css: {
                        background: "rgba(29, 32, 41, 0.90)"
                    }
                }
            }
        }), !1
    }), $("#tshirt_sticky .button").on("click", function(t) {
        var e = t.target,
            n = null,
            i = $(e).closest(".step");
        i.hasClass("one") ? n = "one" : i.hasClass("two") ? n = "two" : i.hasClass("three") && (n = "three")
    }), $(".global-share a, a.global-share").on("click touchend", function(t) {
        t.preventDefault();
        var e = $(this);
        window.open(e.attr("href"), e.data("name"), "width=" + e.data("width") + ",height=" + e.data("height"))
    }), $(".zopim-widget-in").length > 0 && (window.$zopim || function(t, e) {
        var n = $zopim = function(t) {
                n._.push(t)
            },
            i = n.s = t.createElement(e),
            o = t.getElementsByTagName(e)[0];
        n.set = function(t) {
            n.set._.push(t)
        }, n._ = [], n.set._ = [], i.async = !0, i.setAttribute("charset", "utf-8"), i.src = "//v2.zopim.com/?2dlFtrBeQiB5Epxk1gjONRlsKsTW7HvB", n.t = +new Date, i.type = "text/javascript", o.parentNode.insertBefore(i, o)
    }(document, "script"), $zopim(function() {
        $zopim.livechat.window.setOffsetVertical(90)
    }), $zopim(function() {
        function t(t) {
            "online" == t ? $("div.zopim-widget-in").show() : $("div.zopim-widget-in").hide()
        }
        $zopim.livechat.setOnStatus(t)
    }), $("div.zopim-widget-in").on("click", function() {
        $zopim.livechat.window.toggle(), $(this).toggleClass("active")
    })), $("form").length && n.csrfValidator(), $("a.segment_track").click(function() {
        var t = $(this).text();
        if ("critico Sync (Mac)" === t) {
            var e = new Track;
            e.download()
        }
    })
});



