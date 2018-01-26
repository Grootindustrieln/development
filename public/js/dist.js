function Tracker(e) {
    var n = $.extend({
        email: "",
        event: "",
        value: "0",
        enableFB: !0
    }, e || {});
    this.track = function() {
        var e = {};
        n.email && (e.email = n.email), n.event && (e.event = n.event), n.value && ("Download" == e.event ? e.value = "1" : "Lead" == e.event ? e.value = "5" : "SignupSelfServe" == e.event ? e.value = "15" : "SignupEnterprise" == e.event ? e.value = "25" : e.value = "0"), n.enableFB && (e.enableFB = n.enableFB);
        try {
            "" != e.email && analytics.identify({
                email: e.email
            }), analytics.track(n.event, {
                value: e.value
            }, {
                integrations: {
                    "Facebook Pixel": e.enableFB
                }
            })
        }
        catch (e) {}
    }
}

function Track() {
    this.download = function() {
        var e = new Tracker({
            event: "Download"
        });
        e.track()
    }, this.lead = function(e) {
        var n = new Tracker({
            email: e,
            event: "Lead"
        });
        n.track()
    }, this.signupSelfServe = function(e) {
        var n = new Tracker({
            email: e,
            event: "SignupSelfServe"
        });
        n.track()
    }, this.signupEnterprise = function(e) {
        var n = new Tracker({
            email: e,
            event: "SignupEnterprise"
        });
        n.track()
    }
}! function(e) {
    e.fn.binnacle = function(n) {
        var a, i = {
                className: "binnacle",
                color: "#ffffff",
                height: 40,
                width: 40,
                image: '<svg width="{{width}}" height="{{height}}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" enable-background="new 0 0 40 40"><path fill="{{color}}" d="M36.4-.1h-32.8c-2 0-3.6 1.7-3.6 3.7v32.8c0 2 1.6 3.6 3.6 3.6h32.8c2 0 3.6-1.6 3.6-3.6v-32.8c0-2-1.6-3.7-3.6-3.7zm-23 7.9c1.3 0 2.4 1 2.4 2.4s-1.1 2.4-2.4 2.4-2.4-1-2.4-2.4c-.1-1.4 1-2.4 2.4-2.4zm16.3 23c-2.5 0-3.7-1.5-3.7-3.5 0-.6.1-1.2.3-1.8l1.2-4.2c.1-.5.2-.9.2-1.3 0-1.4-.8-2.2-2.2-2.2-1.7 0-2.8 1.2-3.4 3.5l-2.3 9.2h-4l.7-2.9c-1.2 1.9-2.8 3.1-4.9 3.1-2.4 0-3.6-1.4-3.6-3.5 0-.5.1-1.2.2-1.8l1.8-7.5h-2.7l.9-3.2h6.8l-2.7 10.7c-.2.7-.3 1.2-.3 1.6 0 .7.3.9.9 1 .3.1 2.9 0 4.3-3.1l1.8-7.1h-2.9l.9-3.2h6.1l-.8 3.6c1.1-2 3.2-3.9 5.4-3.9 2.3 0 4.1 1.6 4.1 4.7 0 .8-.1 1.7-.4 2.6l-1.2 4.4c-.1.4-.2.8-.2 1.1 0 .7.3 1.1.8 1.1s1.2-.4 2-2.6l1.6.6c-.9 3.2-2.6 4.6-4.7 4.6z"/></svg>',
                displayMode: !1
            },
            t = e.extend({}, i, n),
            l = e(document);
        return a = t.image.replace("{{color}}", t.color).replace("{{height}}", t.height).replace("{{width}}", t.width), this.each(function() {
            var n = e(this),
                i = e('<div class="' + t.className + '">' + a + "</div>"),
                o = function() {
                    n.append(i), i.siblings().addClass("alpha-zero")
                },
                d = function() {
                    i.siblings().removeClass("alpha-zero"), i.remove()
                },
                s = function() {
                    n.append(i), i.siblings().css({
                        opacity: "0.5"
                    })
                };
            return t.displayMode ? void s() : (l.ajaxStart(o), l.ajaxError(d), void l.ajaxStop(d))
        })
    }
}(jQuery),
function(e) {
    e.fn.hotdrop = function() {
        var n = e(document),
            a = e(this),
            i = a.closest(".input").siblings("label"),
            t = a.find("option"),
            l = (e(this).closest(".input").siblings("label").text(), !0);
        a.before('<div class="faux dropdown"><div class="arrow"></div><div class="default"></div><div class="options"></div></div>');
        var o = a.siblings(".faux.dropdown"),
            d = o.find(".default");
        t.each(function() {
            var n = l ? i.text().replace("*", "") : e(this).text();
            l ? (o.find(".default").append('<div class="option"><span>' + n + "</span></div>"), l = !1) : o.find(".options").append('<div class="option"><span>' + n + "</span></div>")
        }), e(".option").on("click", function() {
            var n = e(this).text();
            d.addClass("selected"), d.find("span").text(n), a.val(n).change()
        }), o.on("click", function(n) {
            n.stopPropagation();
            var a = e(this);
            a.hasClass("open") ? s() : a.addClass("open")
        }), n.click(function() {
            o.hasClass("open") && s()
        });
        var s = function() {
            var e = o.find(".options");
            e.animate({
                height: 0
            }, 150, function() {
                setTimeout(function() {
                    o.removeClass("open"), e.removeAttr("style")
                }, 200)
            })
        }
    }
}(jQuery),
function(e) {
    e.fn.speakeasy = function(n) {
        var a, i, t, l = {
                id: e("body").attr("data-validation-name"),
                api: "validateSpeakeasyCode",
                xsrfFormToken: "need-token"
            },
            o = e.extend({}, l, n),
            d = e("html"),
            s = e("body"),
            r = d.add(s),
            c = "/api/" + o.api,
            u = "googleSheet" == o.api ? ' class="ignore" ' : "",
            v = function() {
                s.prepend('<div class="landing-modal"><form class="landing-modal-form" autocomplete="off"><input type="hidden" name="xsrfFormToken" ' + u + ' value="' + o.xsrfFormToken + '" /><input type="hidden" name="client_name" id="client_name" value="' + o.id + '"/><p><label class="landing-modal-label" for="validation">Validation Code</label><br /><input class="landing-modal-input" type="text" id="validation" name="validation" value="" placeholder="" /></p><input class="landing-modal-submit" value="Submit" readonly="readonly"/></form></div><div class="landing-overlay"></div>'), a = s.find("form.landing-modal-form"), $formInput = a.find("input.landing-modal-input"), i = a.find("input.landing-modal-submit"), t = a.closest(".landing-modal")
            },
            f = function(e, n) {
                document.cookie = e + "=" + n + "; path=/"
            },
            p = function(e) {
                for (var n = e + "=", a = document.cookie.split(";"), i = 0; i < a.length; i++) {
                    for (var t = a[i];
                        " " == t.charAt(0);) t = t.substring(1);
                    if (0 === t.indexOf(n)) return t.substring(n.length, t.length)
                }
                return ""
            },
            m = function() {
                function n(n, t) {
                    var l = e.Deferred();
                    if ("validateSpeakeasyCode" == o.api) e.getJSON(c, {
                        validation_code: n,
                        client_name: t
                    }, function(e) {
                        a.find('[name="xsrfFormToken"]').val(e.newToken), e.result ? l.resolve() : l.reject()
                    });

                }

                function t(a, i, t) {
                    var l = e("#validation").val();
                    n(l, v).then(i).fail(t), d()
                }

                function l(n) {
                    n.preventDefault();
                    var a = e(".landing-modal-input");
                    t(n, function() {
                        s.hasClass("no-save") || f("validationCodeAccepted_" + v, 1), a.removeClass("is-invalid").addClass("is-valid").delay(600).queue(function(e) {
                            r.removeClass("landing-modal-is-open"), e()
                        })
                    }, function() {
                        a.addClass("is-invalid")
                    })
                }

                function d() {
                    var n = e("input[name=validationCode]"),
                        a = e("#validation").val();
                    n.val(a)
                }

                function u() {
                    var e, n, a = decodeURIComponent(window.location.search.substring(1)),
                        i = a.split("&");
                    for (n = 0; n < i.length; n++)
                        if (e = i[n].split("="), "utm_campaign" === e[0]) return void 0 === e[1] || e[1];
                    return ""
                }
                var v = e("#client_name").val(),
                    m = u();
                e(document).ready(function() {
                    1 != p("validationCodeAccepted_" + v) && "design+ethics" != m ? (r.addClass("landing-modal-is-open"), i.on("click", function(e) {
                        return e.preventDefault(), l(e), !1
                    }), $formInput.keydown(function(e) {
                        if (13 == e.which) return e.preventDefault(), l(e), !1
                    }), a.on("submit", function(e) {
                        e.preventDefault(), t(event, function() {
                            return !0
                        }, function() {
                            return !1
                        })
                    })) : "design+ethics" == m && e("input[name=validationCode]").val("design+ethics_automated"), a.find("label").inFieldLabels()
                })
            };
        v(), m()
    }
}(jQuery);
