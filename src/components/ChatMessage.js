import styles from "./ChatMessage.css?inline";
import { LOADING_AVATAR, TIME_TO_HIDE } from "../modules/config.js";
import { getUserInfo } from "../services/getUserInfo.js";
import "./UserBadges.js";
import "./UserMessage.js";

class ChatMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.avatar = LOADING_AVATAR;
  }

  connectedCallback() {
    this.classList.add("off");
    this.render();
    setTimeout(() => this.classList.remove("off"), 350);
    this.setDuration(TIME_TO_HIDE);

    this.badges = this.shadowRoot.querySelector("user-badges");
    this.message = this.shadowRoot.querySelector("user-message");
  }

  setDuration(duration) {
    this.hideTimer = setTimeout(() => this.hideMessage(), duration);
  }

  hideMessage() {
    this.classList.add("fadeout");
    const options = { detail: { message: this }, composed: true, bubbles: true };
    const event = new CustomEvent("MESSAGE_HIDDEN", options);
    this.dispatchEvent(event);
  }

  destroy() {
    clearTimeout(this.hideTimer);
    this.remove();
  }

  setColor(color) {
    this.style.setProperty("--nick-color", color);
  }

  // username 15 characters
  // displayName 4-25 characters
  setNick(nick) {
    this.nick = nick;
    this.shadowRoot.querySelector(".nick").textContent = this.nick;
  }

  setAvatar(name) {
    getUserInfo(name)
      .then(user => {
        const isRaider = Boolean(user.raid);
        const avatar = this.shadowRoot.querySelector(".user-info img");
        this.avatar = user.picture;
        avatar.src = this.avatar;
        isRaider && this.badges.add("raider");
      });
  }

  setData({ username, nick, message, options = {} }) {
    this.setNick(nick);
    this.setAvatar(username);
    this.message.setMessage(message, options);

    this.badges.setOptions(options);
    options.color && this.setColor(options.color);
    options.firstMessage && this.classList.add("first");
    options.reply && this.setReply(options.reply);
  }

  setReply(username) {
    const nick = this.shadowRoot.querySelector(".nick");
    nick.insertAdjacentHTML("beforebegin", /* html */`<p class="reply">En respuesta a <span>${username}</span></p>`);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${styles}</style>
    <div class="container off">
      <div class="user-info">
        <img src="${this.avatar}" alt=" ">
      </div>
      <div class="user-message">
        <user-badges></user-badges>
        <div class="nick"></div>
        <user-message></user-message>
        <div class="message"></div>
      </div>
    </div>`;
  }
}

customElements.define("chat-message", ChatMessage);
