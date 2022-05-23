import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Rules extends HTMLElement {
  connectedCallback() {
    this.render();

    const cs = state.getState();
    console.log(cs.win);
    const ready = document.querySelector(".ready");
    const h2 = document.querySelector(".h2");
    const h1 = document.querySelector(".h1");

    window.addEventListener("beforeunload", function (event) {
      state.playerOffline();
      state.playerNotReady();
    });

    ready.addEventListener("click", () => {
      state.playerReady();
    });

    state.subscribe(() => {
      const cs = state.getState();
      console.log("ejecutando funcion player listos");
      console.log(cs.player1Ready);
      console.log(cs.player2Ready);
      // && cs.player2Ready == true
      if (cs.player1Ready == true && cs.player2Ready == true) {
        console.log("entre en este if");
        Router.go("/play");
      } else {
      }
    });
  }
  name = state.getState().currentGame[0].name;
  name2 = state.getState().currentGame[1].name;
  room = state.getState().roomId;

  render() {
    this.innerHTML = `
    <div class="container">
      <div class="header-cont">
        <div>
            <h3 class="h3"> ${this.name}: 0</h3>
            <h3 class="h3"> ${this.name2}: 0</h3>
        </div>
        <div>
          <h3 class="h3">Sala: ${this.room}</h3>
        </div>
      </div>
        
        <text-comp variant="body">Presioná jugar
        y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</text-comp>
        <h2 class="h2">Esperando a que el rival le de listo</h2>
        <div class="buttom-container"><button-comp  variant="35px" class=" ready">Jugar!</button-comp></div>
    
        
    </div>
        `;
    const style = document.createElement("style");
    style.innerHTML = `
    *{
      box-sizing: border-box;
  }
   h2{
    display:none;
   }
   .buttom-container{
    width:100%;
    max-width:404px;
}
   .header-cont{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
   }
   .container{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding:0 20px;
    gap:8vh;
    }
    @media (min-width: 769px) {
    .container {
     
      height: inherit;
    
    }
    }
  .display{
    display: none;
}
.displayOn{
  display: inherit;
}
  }
  .botonAnim:hover{
    background-color: #008CBA;
    color: white;
  }
  .h3{
    margin:0;
    font-size: 20px;
    font-family: 'Odibee Sans', cursive;
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
customElements.define("rules-page", Rules);
