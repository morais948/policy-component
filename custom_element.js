class CustomPolicy extends HTMLElement{

    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})

        //text
        this.purecookieTitle = this.getAttribute("purecookie-title") || "Política de Cookies"
        this.purecookieDesc = this.getAttribute("purecookie-desc") || "Usamos cookies para melhorar sua experiência de navegação no site. Ao utilizar nosso site, trataremos os cookies de acordo com a nossa política de Cookies. Para ter mais informações sobre como isso é feito."
        this.purecookieLink = `<a href="${this.getAttribute("purecookie-link") || '#'}">clique aqui.</a>`
        this.purecookieLabelButton = this.getAttribute("purecookie-label-button") || "ok"
        //colors
        this.purecookieColorFontTitle = this.getAttribute("purecookie-color-font-title") || "#252525"
        this.purecookieColorFontContent = this.getAttribute("purecookie-color-font-content") || "#252525"
        this.purecookieColorBackgroundBtn = this.getAttribute("purecookie-color-background-btn") || "#2ddad0"
        this.purecookieColorBtn = this.getAttribute("purecookie-color-btn") || "#252525"
        this.purecookieBackgroundColorContent = this.getAttribute("purecookie-background-color-content") || "white"
        this.start()
    }

    start(){
        this.setStyle()
        window.addEventListener('load', this.cookieConsent.bind(this))
    }

    setStyle(){
    
        const style = document.createElement('style')
        style.textContent = `
            .cookieConsentContainer {
                z-index: 999999999;
                width: 350px;
                min-height: 20px;
                box-sizing: border-box;
                padding: 30px 30px 30px 30px;
                background: ${this.purecookieBackgroundColorContent};
                overflow: hidden;
                position: fixed;
                bottom: 30px;
                right: 30px;
                display: none;
                border-radius: 5px;
                box-shadow: 2px 2px 5px #888888;
            }

            .cookieConsentContainer .cookieTitle a {
                font-family: OpenSans, arial, sans-serif;
                color: ${this.purecookieColorFontTitle};
                font-size: 22px;
                line-height: 20px;
                display: block
            }

            .cookieConsentContainer .cookieDesc p {
                margin: 0;
                padding: 0;
                font-family: OpenSans, arial, sans-serif;
                color: ${this.purecookieColorFontContent};
                font-size: 13px;
                line-height: 20px;
                display: block;
                margin-top: 10px
            }

            .cookieConsentContainer .cookieDesc a {
                font-family: OpenSans, arial, sans-serif;
                color: #252525;
                text-decoration: underline
            }

            .cookieConsentContainer .cookieButton a {
                display: inline-block;
                font-family: OpenSans, arial, sans-serif;
                background: ${this.purecookieColorBackgroundBtn};
                color: ${this.purecookieColorBtn};
                font-size: 14px;
                font-weight: 700;
                margin-top: 14px;
                box-sizing: border-box;
                padding: 15px 24px;
                text-align: center;
                transition: background .3s;
                border: white solid 2px;
                border-radius: 5px;
                transition: ease-in-out 100ms;
            }

            .cookieConsentContainer .cookieButton a:hover {
                cursor: pointer;
                transform: scale(1.05);
                background: ${this.purecookieColorBtn};
                color: ${this.purecookieColorBackgroundBtn};
            }

            @media (max-width:980px) {
                .cookieConsentContainer {
                    bottom: 0 !important;
                    left: 0 !important;
                    width: 100% !important;
                }
            }

            /*animação de paragrafo de cookies(opcional)*/
            @keyframes anim {
                from {
                    background-color: #2ddad0;
                    opacity: 0.5;
                }
                to {
                    background-color: white;
                    opacity: 1;
                }
            }
        `
        this.shadow.appendChild(style)
        document.querySelector('head').appendChild(style)
    }

    pureFadeIn(e, o) {
        var i = document.getElementById(e);
        i.style.opacity = 0, i.style.display = o || "block",
            function e() {
                var o = parseFloat(i.style.opacity);
                (o += .08) > 1 || (i.style.opacity = o, requestAnimationFrame(e))
            }()
    }

    pureFadeOut(e) {
        var o = document.getElementById(e);
        o.style.opacity = 1,
            function e() {
                (o.style.opacity -= .02) < 0 ? o.style.display = "none" : requestAnimationFrame(e)
            }()
    }

    setCookie(e, o, i) {
        var t = "";
        if (i) {
            var n = new Date;
            n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3), t = "; expires=" + n.toUTCString()
        }
        document.cookie = e + "=" + (o || "") + t + "; path=/"
    }

    getCookie(e) {
        for (var o = e + "=", i = document.cookie.split(";"), t = 0; t < i.length; t++) {
            for (var n = i[t];
                " " == n.charAt(0);) n = n.substring(1, n.length);
            if (0 == n.indexOf(o)) return n.substring(o.length, n.length)
        }
        return null
    }

    eraseCookie(e) {
        document.cookie = e + "=; Max-Age=-99999999;"
    }

    cookieConsent() {
        this.getCookie("purecookieDismiss") || (document.querySelector('body').innerHTML +=
            '<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>' +
            this.purecookieTitle + '</a></div><div class="cookieDesc"><p>' + this.purecookieDesc + " " + this.purecookieLink +
            '</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">' + this.purecookieLabelButton +
            "</a></div></div>", this.pureFadeIn("cookieConsentContainer"))
    }

    purecookieDismiss() {
        this.setCookie("purecookieDismiss", "1", 7), this.pureFadeOut("cookieConsentContainer")
    }
}

customElements.define('custom-policy', CustomPolicy)