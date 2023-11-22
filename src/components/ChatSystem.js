import styles from "./ChatSystem.css?inline";
import "./ChatMessage.js";
import "./CommandMessage.js";

class ChatSystem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.messages = 0;
  }

  static get styles() {
    return styles;
  }

  addChatMessage(username, nick, message, options = {}) {
    const container = this.shadowRoot.querySelector(".container");

    if (options.isCommand) {
      const commandMessage = document.createElement("command-message");
      container.appendChild(commandMessage);
      commandMessage.setData({ nick, message });
    }

    if (!options.isCommand) {
      const chatMessage = document.createElement("chat-message");
      container.appendChild(chatMessage);
      chatMessage.setData({ username, nick, message, options });
    }

    this.incMessages();
  }

  decMessages() {
    this.messages--;
  }

  incMessages() {
    this.messages++;
  }

  connectedCallback() {
    const height = Number(new URL(location.href).searchParams.get("height"));
    height && this.style.setProperty("--chat-height", `${height}px`);
    this.render();
    this.addEventListener("MESSAGE_HIDDEN", (ev) => this.removeMessage(ev.detail.message));
  }

  removeMessage(message) {
    this.decMessages();
    setTimeout(() => message.destroy(), 1000);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ChatSystem.styles}</style>
    <div class="fake-container">
      <div class="container">
      </div>
    </div>`;
  }
}

customElements.define("chat-system", ChatSystem);
