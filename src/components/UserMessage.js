import styles from "./UserMessage.css?inline";
import { parseEmotes } from "../modules/parseEmotes.js";
import { parseMessage } from "../modules/parseMessage.js";

class UserMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.emotes = {};
  }

  static get styles() {
    return styles;
  }

  connectedCallback() {
    this.render();
  }

  // Max length of the message: 500 characters
  // 12 messages per minute, per channel
  setMessage(message, options) {
    if (options.emotes) {
      this.emotes = parseEmotes(message, options);
    }

    const textMessage = parseMessage(message, options, this.emotes);
    this.shadowRoot.querySelector(".message").appendChild(textMessage);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${UserMessage.styles}</style>
    <div class="message"></div>`;
  }
}

customElements.define("user-message", UserMessage);
