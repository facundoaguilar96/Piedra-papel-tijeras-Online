// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://api-piedra-papel-tijeras.herokuapp.com";
import { rtdb } from "./rtdb";
import map from "lodash/map";
import { Router } from "@vaadin/router";
type jugada = {
  from: string;
  mensaje: string;
};

const state = {
  data: {
    name: "",
    namePlayer2: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    choice: "",
    currentGame: [],
    playerRef: {},
    player2Ref: {},

    win: [],

    playerOnline: "",
    playerOnline2: "",

    player1Choice: "",
    player2Choice: "",

    player1Ready: false,
    player2Ready: false,
  },
  listeners: [],
  ListenRoomOnline() {
    const cs = state.getState();
    console.log(cs.rtdbRoomId);
    const chatrooms = rtdb.ref("/rooms/" + cs.rtdbRoomId);
    chatrooms.on("value", (snap) => {
      const valor = snap.val();
      console.log(valor);
      const game = map(valor.currentGame);

      const online = game[0].online;
      const player2 = game[1]?.name;

      // cs.player2Ref = { ref: game[1]?.ref, userId: game[1]?.userId };

      console.log(game);
      cs.currentGame = game;
      cs.namePlayer2 = player2;

      cs.player1Choice = game[0].choice;
      cs.player2Choice = game[1]?.choice;

      cs.playerOnline2 = game[1]?.online;
      cs.playerOnline = online;

      cs.player1Ready = game[0].start;
      cs.player2Ready = game[1]?.start;
      this.setState(cs);
    });
  },
  pushWinner() {
    const cs = this.getState();

    fetch(API_BASE_URL + "/rooms/" + cs.roomId + "/game", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        winners: cs.win,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {});
  },
  filterWin() {
    const cs = state.getState();

    let player1 = cs.win.filter((i) => {
      return i == 0;
    });
    let counterPlayer1 = player1.length;

    let player2 = cs.win.filter((i) => {
      return i == 1;
    });
    let counterPlayer2 = player2.length;
    let counterPlayers = { counterPlayer1, counterPlayer2 };
    return counterPlayers;
  },

  whoWins() {
    const data = this.getState();

    const winWhitPaper =
      data.player1Choice == "papel" && data.player2Choice == "piedra";
    const winWhitRock =
      data.player1Choice == "piedra" && data.player2Choice == "tijeras";
    const winWhitScissors =
      data.player1Choice == "tijeras" && data.player2Choice == "papel";
    const win1 = [winWhitPaper, winWhitRock, winWhitScissors].includes(true);

    const missWhitPaper =
      data.player2Choice == "papel" && data.player1Choice == "piedra";
    const missWhitRock =
      data.player2Choice == "piedra" && data.player1Choice == "tijeras";
    const missWhitScissors =
      data.player2Choice == "tijeras" && data.player1Choice == "papel";
    const win2 = [missWhitPaper, missWhitRock, missWhitScissors].includes(true);

    if (win1 == true) {
      data.win.push(0);
    } else if (win2 == true) {
      data.win.push(1);
    } else {
      console.log("empate");
    }

    if (win1 == true) {
      console.log("gano player ", data.currentGame[0].name);
      if (data.name == data.currentGame[0].name) {
        this.pushWinner();
        Router.go("/win");
      } else {
        Router.go("/loose");
      }
    } else if (win2 == true) {
      if (data.name == data.currentGame[1].name) {
        this.pushWinner();
        Router.go("/win");
      } else {
        Router.go("/loose");
      }
      console.log("gano player ", data.currentGame[1].name);
    } else {
      console.log("empate");
      Router.go("/tie");
    }
  },
  playerReady() {
    const cs = this.getState();
    const ref = cs.playerRef.ref;
    console.log(ref);

    fetch(API_BASE_URL + "/ready", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        roomId: cs.rtdbRoomId,
        ref: ref,
        start: true,
        userId: cs.userId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {});
  },
  playerNotReady() {
    const cs = this.getState();
    const ref = cs.playerRef.ref;
    console.log(ref);

    fetch(API_BASE_URL + "/ready", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        roomId: cs.rtdbRoomId,
        ref: ref,
        start: false,
        userId: cs.userId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {});
  },
  playerOffline() {
    const cs = this.getState();
    const ref = cs.playerRef.ref;
    console.log(ref);

    fetch(API_BASE_URL + "/online", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        roomId: cs.rtdbRoomId,
        ref: ref,
        online: false,
        userId: cs.userId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {});
  },
  playerOnline() {
    const cs = this.getState();
    const ref = cs.playerRef.ref;
    console.log(ref);

    fetch(API_BASE_URL + "/online", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        roomId: cs.rtdbRoomId,
        ref: ref,
        online: true,
        userId: cs.userId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("player de nuevo online");
      });
  },

  playerChoice() {
    const cs = this.getState();
    const ref = cs.playerRef.ref;
    console.log(ref);

    fetch(API_BASE_URL + "/choice", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        roomId: cs.rtdbRoomId,
        ref: ref,
        choice: cs.choice,
        userId: cs.userId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {});
  },
  init() {},

  setChoice(choice) {
    const currentState = state.getState();
    currentState.choice = choice;
    this.setState(currentState);
  },

  getState() {
    return this.data;
  },
  setName(name: string) {
    const currentState = state.getState();
    currentState.name = name;
    this.setState(currentState);
  },
  setRoomId(roomId) {
    const currentState = state.getState();
    currentState.roomId = roomId;
    this.setState(currentState);
  },

  playerPushStatus() {
    const cs = this.getState();
    fetch(API_BASE_URL + "/status", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: cs.userId,
        name: cs.name,
        choice: cs.choice,
        roomId: cs.rtdbRoomId,
        online: true,
        start: false,
        ref: "",
        time: new Date(),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.playerRef = { ref: data.id, player: cs.userId };
        this.setState(data);
      });
  },
  pushRefPlayer1Db() {
    const cs = this.getState();

    console.log(cs.roomId);
    fetch(API_BASE_URL + "/rooms/" + cs.roomId + "/game", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        userId1: cs.userId,
        ref1: cs.playerRef.ref,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {});
  },
  pushRefPlayer2Db() {
    const cs = this.getState();

    console.log(cs.roomId);
    fetch(API_BASE_URL + "/rooms/" + cs.roomId + "/game", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        userId2: cs.userId,
        ref2: cs.playerRef.ref,
        // userId2: cs.currentGame[1].userId,
        // ref2: cs.player2Ref.ref,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {});
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("hola soy el state, he cambiado", this.getState());
  },
  subscribe(callback) {
    this.listeners.push(callback);
  },
  registerUser(callback?, err?) {
    const cs = this.getState();
    fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ nombre: cs.name }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          this.authUser(() => {
            this.askNewRoom(() => {
              console.log(this.getState().roomId);
              this.accesToRoom(() => {
                console.log(this.getState());
                this.playerPushStatus();
                Router.go("/wait");
              });
            });
          });
          if (err) err();
        } else {
          cs.userId = data.id;
          this.setState(cs);
          callback();
        }
      });
  },
  userToRoom(callback?, err?) {
    const cs = this.getState();
    fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ nombre: cs.name }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          this.authUser(() => {
            console.log("user ya existe y es ", cs.userId);
            Router.go("/goRoom");
          });
          if (err) err();
        } else {
          cs.userId = data.id;
          this.setState(cs);
          console.log("user creado: ", cs.userId);
          callback();
        }
      });
  },
  connectUserToRoom() {
    const cs = state.getState();
    this.accesToRoom();
  },
  authUser(callback?, err?) {
    const cs = this.getState();
    if (cs.name) {
      fetch(API_BASE_URL + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre: cs.name }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.userId = data.id;
          this.setState(cs);
          if (data.message) {
            if (err) err();
          } else {
            if (callback) callback();
          }
        });
    } else {
      // window.alert("No se ingreso un nombre");
    }
  },
  askNewRoom(callback?) {
    const cs = this.getState();
    if (cs.userId) {
      fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: cs.userId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.roomId = data.id;
          this.setState(cs);

          if (callback) callback();
        });
    } else {
      console.error("No hay un userId en el state");
    }
  },
  accesToRoom(callback?, err?) {
    const cs = this.getState();
    const roomId = cs.roomId;
    fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + cs.userId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.userId1);

        if (data.userId1 == cs.userId) {
          cs.playerRef = { ref: data.ref1, userId: data.userId1 };
        } else if (data.userId2 == cs.userId) {
          cs.playerRef = { ref: data.ref2, userId: data.userId2 };
        }

        console.log(data);
        if (data.winners) cs.win = data.winners;
        cs.rtdbRoomId = data.rtdbRoomId;
        this.setState(cs);
        this.playerOnline();
        this.ListenRoomOnline();
        console.log(this.getState().playerRef);

        if (data.message) {
          console.log(data.message);

          err();
        } else {
          if (callback) callback();
        }
      });
  },
};

export { state };
