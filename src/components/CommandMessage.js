import styles from "./CommandMessage.css?inline";
import { TIME_TO_HIDE } from "../modules/config.js";

export const MAX_MESSAGE_LENGTH = 55;

class CommandMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return styles;
  }

  connectedCallback() {
    // this.classList.add("small");
    this.classList.add("off");
    this.render();
    setTimeout(() => this.classList.remove("off"), 350);
    this.setDuration(TIME_TO_HIDE);
  }

  setDuration(duration) {
    this.hideTimer = setTimeout(() => this.hideMessage(), duration);
  }

  hideMessage() {
    this.classList.add("off");
    const options = { detail: { message: this }, composed: true, bubbles: true };
    const event = new CustomEvent("MESSAGE_HIDDEN", options);
    this.dispatchEvent(event);
  }

  destroy() {
    clearTimeout(this.hideTimer);
    this.remove();
  }

  setData({ nick, message }) {
    this.setNick(nick);
    this.setMessage(message);
  }

  setNick(nick) {
    this.nick = nick;
    this.shadowRoot.querySelector(".nick").textContent = this.nick;
  }

  setMessage(message) {
    const isTooLarge = message.length > MAX_MESSAGE_LENGTH;
    this.message = isTooLarge ? `${message.substring(0, MAX_MESSAGE_LENGTH)}...` : message;
    this.shadowRoot.querySelector(".message").textContent = this.message;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CommandMessage.styles}</style>
    <div class="container off">
      <div class="nick"></div>
      <div class="message"></div>
    </div>`;
  }
}

customElements.define("command-message", CommandMessage);
