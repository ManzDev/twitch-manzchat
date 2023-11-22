import styles from "./UserBadges.css?inline";
import { getBadgeImage } from "../services/getBadgeImage.js";

class UserBadges extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return styles;
  }

  add(type) {
    const badges = this.shadowRoot.querySelector(".badges");
    const badge = document.createElement("div");
    badge.classList.add(type);
    badges.appendChild(badge);
    return badge;
  }

  setOptions(options) {
    options.moderator && this.add("mod");
    options.prime && this.add("prime");
    options.vip && this.add("vip");
    options.bits && this.add("bits");
    options.train && this.add("train");
    options.partner && this.add("partner");
    options.founder && this.add("founder");
    options.noAudio && this.add("no-audio");
    options.noVideo && this.add("no-video");
    options.raider && this.add("raider");
    options.broadcaster && this.add("broadcaster");

    if (options.gifter > 0) {
      options.gifter && this.add("gifter");
    }

    if (options.subscriber >= 0 && !options.broadcaster) {
      const sub = this.add("sub");

      let months = options.subscriber;
      let tier = 1;

      if (months > 3000) {
        months = 3000 - months;
        tier = 3;
      } else if (months > 2000) {
        months = 2000 - months;
        tier = 2;
      }

      months = Math.max(1, options.subscriber);
      sub.setAttribute("months", months);
      getBadgeImage(months).then(url => {
        sub.style.setProperty("--image", `url("${url}")`);
      });
      sub.setAttribute("tier", tier);
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${UserBadges.styles}</style>
    <div class="badges">
    </div>`;
  }
}

customElements.define("user-badges", UserBadges);
