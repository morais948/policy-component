class CustomPolicy extends HTMLElement{

    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        //variaveis
        this.purecookieTitle = "Política de Cookies"
        this.purecookieDesc = "Usamos cookies para melhorar sua experiência de navegação no site. Ao utilizar nosso site, trataremos os cookies de acordo com a nossa política de Cookies. Para ter mais informações sobre como isso é feito."
        this.purecookieLink = '<a href="/politica-de-privacidade#cookies">clique aqui.</a>'
        this.purecookieButton = "ok"
        

        //this.defaultColor = this.getAttribute("color-font") || '#056162'

        this.start()
    }


    start(){
        this.raiz = document.createElement('div')
        this.raiz.innerHTML = '<h1>TESTE</h1>'
        this.raiz.setAttribute('class', 'raiz')
        this.setStyle()
        this.shadow.appendChild(this.raiz)

        //this.shadow.getElementById('darkMode').addEventListener('click', this.darkMode.bind(this))

        //window.onload = this.cookieConsent()
        window.addEventListener('load', this.cookieConsent.bind(this))
    }

    setStyle(){
    
        const style = document.createElement('style')
        style.textContent = `
            .raiz .cookieConsentContainer {
                z-index: 999999999;
                width: 350px;
                min-height: 20px;
                box-sizing: border-box;
                padding: 30px 30px 30px 30px;
                background: white;
                overflow: hidden;
                position: fixed;
                bottom: 30px;
                right: 30px;
                display: none;
                border-radius: 5px;
                box-shadow: 2px 2px 5px #888888;
            }

            .raiz .cookieConsentContainer .cookieTitle a {
                font-family: OpenSans, arial, sans-serif;
                color: #252525;
                font-size: 22px;
                line-height: 20px;
                display: block
            }

            .raiz .cookieConsentContainer .cookieDesc p {
                margin: 0;
                padding: 0;
                font-family: OpenSans, arial, sans-serif;
                color: #252525;
                font-size: 13px;
                line-height: 20px;
                display: block;
                margin-top: 10px
            }

            .raiz .cookieConsentContainer .cookieDesc a {
                font-family: OpenSans, arial, sans-serif;
                color: #252525;
                text-decoration: underline
            }

            .raiz .cookieConsentContainer .cookieButton a {
                display: inline-block;
                font-family: OpenSans, arial, sans-serif;
                background: #2ddad0;
                color: #252525;
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

            .raiz .cookieConsentContainer .cookieButton a:hover {
                cursor: pointer;
                transform: scale(1.05);
                background: #252525;
                color: #2ddad0;
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
        this.getCookie("purecookieDismiss") || (this.raiz.innerHTML +=
            '<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>' +
            this.purecookieTitle + '</a></div><div class="cookieDesc"><p>' + this.purecookieDesc + " " + this.purecookieLink +
            '</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">' + this.purecookieButton +
            "</a></div></div>", this.pureFadeIn("cookieConsentContainer"))
    }

    purecookieDismiss() {
        this.setCookie("purecookieDismiss", "1", 7), this.pureFadeOut("cookieConsentContainer")
    }
}

customElements.define('custom-policy', CustomPolicy)