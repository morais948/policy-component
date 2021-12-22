class CustomPolicy extends HTMLElement{

    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.raiz = document.createElement('div')
        
        //text
        this.purecookieTitle = this.getAttribute("purecookie-title") || "Política de Cookies"
        this.purecookieDesc = this.getAttribute("purecookie-desc") || "Usamos cookies para melhorar sua experiência de navegação no site. Ao utilizar nosso site, trataremos os cookies de acordo com a nossa política de Cookies. Para ter mais informações sobre como isso é feito."
        this.purecookieLink = `<a href="${this.getAttribute("purecookie-link") || '#'}">clique aqui.</a>`
        this.purecookieLabelButton = this.getAttribute("purecookie-label-button") || "ok"
        this.purecookieTimeTransition = this.getAttribute("purecookie-time-transition") || "500ms"
        //colors
        this.purecookieColorFontTitle = this.getAttribute("purecookie-color-font-title") || "#252525"
        this.purecookieColorFontContent = this.getAttribute("purecookie-color-font-content") || "#252525"
        this.purecookieColorBackgroundBtn = this.getAttribute("purecookie-color-background-btn") || "#2ddad0"
        this.purecookieColorBtn = this.getAttribute("purecookie-color-btn") || "#252525"
        this.purecookieBackgroundColorContent = this.getAttribute("purecookie-background-color-content") || "white"
        
        this.start()
        this.shadow.appendChild(this.raiz)
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
                display: block;
                border-radius: 5px;
                box-shadow: 2px 2px 5px #888888;
                animation-name: anim;
                animation-duration: ${this.purecookieTimeTransition};
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

            .animate-reverse{
                animation-name: anim-reverse !important;
                animation-duration: ${this.purecookieTimeTransition} !important;
            }

            @media (max-width:980px) {
                .cookieConsentContainer {
                    bottom: 0 !important;
                    left: 0 !important;
                    width: 100% !important;
                }
            }

            @keyframes anim {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            @keyframes anim-reverse {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `
        this.shadow.appendChild(style)
    }

    pureFadeOut(e) {
        var el = document.querySelector('custom-policy').shadow.querySelector(e)
        el.addEventListener("webkitAnimationEnd", () => el.style.display = 'none')
        el.addEventListener("animationend", () => el.style.display = 'none')
        el.classList.add('animate-reverse')
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

    showPolicy(){       
        let div = document.createElement('div')
        div.setAttribute('class', 'cookieConsentContainer')
        div.setAttribute('id', 'cookieConsentContainer')

        let div2 = document.createElement('div')
        div2.setAttribute('class', 'cookieTitle')
        let aTitle = document.createElement('a')
        aTitle.innerHTML = this.purecookieTitle
        div2.appendChild(aTitle)

        let div3 = document.createElement('div')
        div3.setAttribute('class', 'cookieDesc')
        let p = document.createElement('p')
        let aLink = document.createElement('a')
        aLink.innerHTML = this.purecookieLink
        p.innerHTML = this.purecookieDesc
        p.appendChild(aLink)
        div3.appendChild(p)

        let div4 = document.createElement('div')
        div4.setAttribute('class', 'cookieButton')
        let a = document.createElement('a')
        a.setAttribute('id', 'dismiss')
        a.innerHTML = this.purecookieLabelButton
        a.addEventListener('click', this.purecookieDismiss.bind(this))
        div4.appendChild(a)

        div.appendChild(div2)
        div.appendChild(div3)
        div.appendChild(div4)

        this.raiz.appendChild(div)
    }

    cookieConsent() {
        this.getCookie("purecookieDismiss") || this.showPolicy()
    }

    purecookieDismiss() {
        this.setCookie("purecookieDismiss", "1", 7), this.pureFadeOut("#cookieConsentContainer")
    }
}

customElements.define('custom-policy', CustomPolicy)