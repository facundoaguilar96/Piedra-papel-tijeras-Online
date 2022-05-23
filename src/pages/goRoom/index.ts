import { Router } from "@vaadin/router";
import { state } from "../../state";

export class GoRoom extends HTMLElement {
  connectedCallback() {
    this.render();

    const boton = document.querySelector(".boton");
    const formulario = document.querySelector(".formulario");
    const input = document.querySelector(".input");
    const h2 = document.querySelector(".h2");

    const atras = document.querySelector(".atras");
    atras.addEventListener("click", () => {
      Router.go("/");
    });

    window.addEventListener("beforeunload", function (event) {
      state.playerOffline();
    });

    formulario.addEventListener("submit", (e) => {
      e.preventDefault();

      boton.classList.add("display");

      input.classList.add("display");
      h2.classList.replace("display", "cargando");
      const targete = e.target as any;

      if (targete.room.value == "") {
        window.alert("No se ingreso una room valida");
        Router.go("/");
      } else {
        state.setRoomId(targete.room.value);
      }

      state.accesToRoom(
        () => {
          const cs = state.getState();
          console.log(state.getState().roomId);
          window.setTimeout(() => {
            if (cs.currentGame.length == 1) {
              console.log(cs.currentGame.length);
              console.log(cs.currentGame);
              console.log("puedes ingresar hay 1 solo jugador");
              state.playerPushStatus();
              Router.go("/wait");
            } else if (
              (cs.currentGame[0].name == cs.name &&
                cs.currentGame[1].name !== cs.name) ||
              (cs.currentGame[1].name == cs.name &&
                cs.currentGame[0].name !== cs.name)
            ) {
              console.log(
                "puedes ingresar tu nombre coincide con los jugadores"
              );
              console.log(state.getState().playerRef);

              Router.go("/wait");
              // state.playerPushStatus();
            } else if (cs.currentGame.length >= 2) {
              console.log(cs.currentGame.length);
              console.log(cs.currentGame);
              console.log(
                "no puedes ingresar se llego al limite de jugadores y tu nombre no coincide con ninguno"
              );
              Router.go("/fullRoom");
            } else {
              console.log("no puedes ingresar");
              Router.go("/fullRoom");
            }
          }, 3000);
        },
        () => {
          window.alert("La sala no existe");
          Router.go("/");
        }
      );
    });
  }
  connectRoom() {
    state.ListenRoomOnline();
  }
  render() {
    this.innerHTML = `
    <div class="container">
    <button-comp variant="30px" class="atras">←</button-comp>
    <div class="text-container">
      <text-comp variant="title">Piedra Papel ó Tijeras</text-comp>
    </div>
        <div>
           <h2 class="display h2">Cargando</h2>
            <form class="formulario">
            
                <input class="input" type="text" autocomplete="off" name="room" placeholder="Código" >
                <button class="botonAnim boton">Ingresar a la sala</button>
            </form>
        </div>
        
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
    .container{
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: baseline;
      height: 110vh;
      padding:0 20px;
      gap:20px;
      }
      @media (min-width: 769px) {
      .container {
       
        height: inherit;
      
      }
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
    
    width:100%;
    color:#D8FCFC;
    background-color: #006CFC;
    border:10px solid #001997;
    font-size:45px;
    font-family:"Odibee Sans";
    border-radius: 10px;
    cursor: pointer;
    

  }
  .input{
    width: 100%;
    height: 55px;
    font-weight: bold;
    margin-bottom:15px;
}

.label-container{
  width:100%;
  display:flex;
  justify-content: center;
}
.atras{
 position: fixed;
 top:1px;
 left:1px;
}
.cargando{
 display: inherit;
 font-size: 100px;
 }
 
.display{
 display: none;
}
.label{
 font-size:30px;
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
 width:100%;
             color:#D8FCFC;
             background-color: #006CFC;
             border:10px solid #001997;
             font-size:35px;
             font-family:"Odibee Sans";
             border-radius: 10px;
             cursor: pointer;
   

}
.boton:hover {
 background-color: #2f44ad;
}
.input{
 width: 100%;
 height: 55px;
 font-weight: bold;
 margin-bottom:5vh;
}



.gap{
margin-bottom:20px;
}
@media (min-width: 769px) {
.gap{
 margin-bottom:50px;
}
}
.text-container{

max-width:317px;
}   
.buttom-container{
width:100%;
max-width:404px;
}


.move-container{
display:flex;
width:100%;
position: fixed;
bottom: 10px;
left:1vh;
height: 150px;
justify-content: center;
padding:0 5px;

}
@media (min-width: 769px) {
.move-container{
height: 21.277481vh;
width:500px;
padding:0;
gap:67px;
left:inherit;

}
}
.hand{
     
}
@media (min-width: 769px) {
.hand{
 width:100%;
}
}
.desktop{}
@media (min-width: 769px) {
.desktop{
 display:flex;
 width:100%;
 
 justify-content: center;
}
}`;

    this.appendChild(style);
  }
}
customElements.define("goroom-page", GoRoom);
