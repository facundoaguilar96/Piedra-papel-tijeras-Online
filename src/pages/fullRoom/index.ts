import { Router } from "@vaadin/router";
import { state } from "../../state";

export class FullRoom extends HTMLElement {
  connectedCallback() {
    this.render();

    const boton = document.querySelector(".button");
    boton.addEventListener("click", () => {
      Router.go("/");
    });
  }

  render() {
    this.innerHTML = `
    <div class="contenedor">
        <h1>Piedra papel o tijeras</h1>
        <h2>Ups, esta sala está completa y tu nombre no coincide con nadie en la sala.</h2>
        <button class="button boton">Inicio</button>
    </div>
        `;
    const style = document.createElement("style");
    style.innerHTML = `
    *{
      box-sizing: border-box;
  }
   body{
    
   }
   .cargando{
    display: inherit;
    font-size: 100px;
    }
    .contenedor{
      display: flex;
      height: 100vh;
      flex-direction: column;
      justify-content: flex-start;
      gap:50px;
      align-items: center;
      background-color:#646562;
      font-weight: bold;
  }
  .display{
    display: none;
}
  .label{
    font-size:24px;
    height: 28px;
  
  }
  .form{
    font-weight: bold;
  }
  .botonAnim:hover{
    background-color: #008CBA;
    color: white;
    
  }
  .h1{
    font-size: 52px;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
}
  
  .boton{
    
      cursor: pointer;
      padding:10px;
      margin-top:5vh;
      width: 100%;
      font-size:22px;
      border: solid 1px;
      background-color: #0AAC11;
      border-radius: 4px;
      font-weight: bold;
    

  }
  .input{
    width: 100%;
    height: 55px;
    font-weight: bold;
    margin-bottom:15px;
}`;

    this.appendChild(style);
  }
}
customElements.define("fullroom-page", FullRoom);
