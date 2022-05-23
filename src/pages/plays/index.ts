import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Plays extends HTMLElement {
  connectedCallback() {
    this.render();

    window.addEventListener("beforeunload", function (event) {
      state.playerOffline();
      state.playerNotReady();
    });

    const cs = state.getState();
    let myMove = cs.choice;
    let oponentMove = "";
    if (cs.userId == cs.currentGame[0].userId) {
      oponentMove = cs.player2Choice;
    } else {
      oponentMove = cs.player1Choice;
    }

    this.myMove(myMove);
    this.oponentMove(oponentMove);

    setTimeout(() => {
      state.whoWins();
    }, 3000);
  }
  myMove(myMove: string) {
    const myPiedra = document.querySelector(".myPiedra");
    const myPapel = document.querySelector(".myPapel");
    const myTijeras = document.querySelector(".myTijeras");
    if (myMove == "papel") {
      myPapel.classList.add("displayOn");
    } else if (myMove == "piedra") {
      myPiedra.classList.add("displayOn");
    } else if (myMove == "tijeras") {
      myTijeras.classList.add("displayOn");
    } else {
      console.log("entro en if else");
    }
  }
  oponentMove(oponentMove: string) {
    const oponentPapel = document.querySelector(".opponent-papel");
    const oponentTijeras = document.querySelector(".opponent-tijeras");
    const oponentPiedra = document.querySelector(".opponent-piedra");
    if (oponentMove == "papel") {
      oponentPapel.classList.add("displayOn");
    } else if (oponentMove == "piedra") {
      oponentPiedra.classList.add("displayOn");
    } else if (oponentMove == "tijeras") {
      oponentTijeras.classList.add("displayOn");
    } else {
      console.log("entro en if else de otro player");
    }
  }
  render() {
    this.innerHTML = `
    
    
    
    
        <div class="user-move papel myPapel userAnimation"><papel-mov></papel-mov></div>
        <div class="user-move piedra myPiedra userAnimation"><piedra-mov></piedra-mov></div>
        <div class="user-move tijeras myTijeras userAnimation"><tijeras-mov></tijeras-mov></div>

    
        <div  class="move-pc opponent-papel pcAnimation"><papel-mov></papel-mov></div>
        <div  class="move-pc opponent-piedra pcAnimation"><piedra-mov></piedra-mov></div>
        <div class="move-pc opponent-tijeras pcAnimation"><tijeras-mov></tijeras-mov></div>
    

    
    
    
    
    
        
        `;
    const style = document.createElement("style");
    style.innerHTML = `
    *{
      box-sizing: border-box;
  }

  .move-pc{
    position: fixed;
    top: 0px;
    left: 35%;
    transform: rotate(180deg);
    display:none;
    
}
.displayNo{
    display:none;
}
.displayfalse{
  display:none;
}

.user-move{
    position: fixed;
    bottom: 0;
    left: 35%;
    height: 350px;
    display:none;
}
@media (min-width: 769px) {
    .user-move{
        left: 37%;
    }
}

.userAnimation{
    animation-duration: 3s;
    animation-name: toTop;
  }
  
  @keyframes toTop {
    from {
        margin-top: 60%;
        height: 100px;
    }
  
    to {
        margin-bottom: 140px;
        height: 50px;
      
    }
  }
  @media (min-width: 769px) {
    .userAnimation{
        animation-duration: 3s;
        animation-name: toTop;
      }
      
      @keyframes toTop {
        from {
            margin-top: 60%;
            height: 100px;
        }
      
        to {
            margin-bottom: 160px;
            height: 50px;
          
        }
      }
  }







  .pcAnimation{
    animation-duration: 3s;
    animation-name: slidein;
  }
  
  @keyframes slidein {
    from {
        margin-bottom: 100px;
        height: 50px;
    }
  
    to {
      
      margin-top: 34%;
      height: 50px;
    }
}

@media (min-width: 769px) {
    .pcAnimation{
        animation-duration: 3s;
        animation-name: slidein;
      }
      
      @keyframes slidein {
        from {
            margin-bottom: 100px;
            height: 50px;
        }
      
        to {
          
          margin-top: 10%;
          height: 50px;
        }
    }
}

.displayOn{
    display:inherit;
}


  body{
    margin:0;
  
  }
  
   




}`;

    this.appendChild(style);
  }
}

customElements.define("plays-page", Plays);
