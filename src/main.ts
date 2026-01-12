import * as com from "./commands";

//mutWriteLines gets deleted and reassigned
let mutWriteLines = document.getElementById("write-lines");
let historyIdx = 0
let tempInput = ""
let userInput : string;
let isSudo = false;
let isPasswordInput = false;
let passwordCounter = 0;
let bareMode = false;

//WRITELINESCOPY is used to during the "clear" command
const WRITELINESCOPY = mutWriteLines;
const TERMINAL = document.getElementById("terminal");
const USERINPUT = document.getElementById("user-input") as HTMLInputElement;
const INPUT_HIDDEN = document.getElementById("input-hidden");
const PASSWORD = document.getElementById("password-input");
const PASSWORD_INPUT = document.getElementById("password-field") as HTMLInputElement;
const PROMPT = document.getElementById("prompt");
const COMMANDS = ["about", "clear", "etc", "help", "home", "ls", "projects", "repo", "skills", "sudo", "whoami"];
const REPO_LINK = com.REPO_LINK;
const HISTORY : string[] = [];
const SUDO_PASSWORD = "301223"

const scrollToBottom = () => {
  if(!TERMINAL) return
  TERMINAL.scrollTop = TERMINAL.scrollHeight;
}

function userInputHandler(e : KeyboardEvent) {
  const key = e.key;

  switch(key) {
    case "Enter":
    case "Go":
    case "Next":
      e.preventDefault()
      if (!isPasswordInput) {
        enterKey();
      } else {
        passwordHandler();
      }

      scrollToBottom();
      break;
    case "Escape":
      USERINPUT.value = "";
      break;
    case "ArrowUp":
      arrowKeys(key);
      e.preventDefault();
      break;
    case "ArrowDown":
      arrowKeys(key);
      break;
    case "Tab":
      tabKey();
      e.preventDefault();
      break;
  }
}

function enterKey() {
  if (!mutWriteLines || !PROMPT) return
  const resetInput = "";
  let newUserInput;
  userInput = USERINPUT.value;
  if (bareMode) {
    newUserInput = userInput;
  } else {
    newUserInput = `<span class='output'>${userInput}</span>`;
  }

  HISTORY.push(userInput);
  historyIdx = HISTORY.length

  //if clear then early return
  if (userInput === 'clear') {
    commandHandler(userInput.toLowerCase().trim());
    USERINPUT.value = resetInput;
    userInput = resetInput;
    return
  }

  const div = document.createElement("div");
  div.innerHTML = `${PROMPT.innerHTML} ${newUserInput}`;

  if (mutWriteLines.parentNode) {
    mutWriteLines.parentNode.insertBefore(div, mutWriteLines);
  }

  /*
  if input is empty or a collection of spaces, 
  just insert a prompt before #write-lines
  */
  if (userInput.trim().length !== 0) {
      commandHandler(userInput.toLowerCase().trim());
    }
  
  USERINPUT.value = resetInput;
  userInput = resetInput; 
}

function tabKey() {
  let currInput = USERINPUT.value;

  for (const ele of COMMANDS) {
    if(ele.startsWith(currInput)) {
      USERINPUT.value = ele;
      return
    }
  }
}

function arrowKeys(e : string) {
  switch(e){
    case "ArrowDown":      
      if (historyIdx !== HISTORY.length) {
          historyIdx += 1;
          USERINPUT.value = HISTORY[historyIdx];
          if (historyIdx === HISTORY.length) USERINPUT.value = tempInput;  
      }      
      break;
    case "ArrowUp":
      if (historyIdx === HISTORY.length) tempInput = USERINPUT.value;
      if (historyIdx !== 0) {
        historyIdx -= 1;
        USERINPUT.value = HISTORY[historyIdx];
      }
      break;
  }
}

function commandHandler(input : string) {
  if(input.startsWith("rm -rf") && input.trim() !== "rm -rf") {
    if (isSudo) {
      if(input === "rm -rf src" && !bareMode) {
        bareMode = true;

        setTimeout(() => {
          if(!TERMINAL || !WRITELINESCOPY) return
          TERMINAL.innerHTML = "";
          TERMINAL.appendChild(WRITELINESCOPY);
          mutWriteLines = WRITELINESCOPY;
        });

        easterEggStyles();
        setTimeout(() => {
          writeLines(["", "what made you think that was a good idea?"]);
        }, 200)

        setTimeout(() => {
          writeLines(["now everything is ruined.", ""]);
        }, 1200)

        } else if (input === "rm -rf src" && bareMode) {
          writeLines(["there's no more src folder.", ""])
        } else {
          if(bareMode) {
            writeLines(["what else are you trying to delete?", ""])
          } else {
            writeLines(["", "directory not found", "type <span class='command'>ls</span> for a list of directories", ""]);
          }
        } 
      } else {
        writeLines(["permission denied", ""]);
    }
    return
  }

  switch(input) {
    case 'clear':
      setTimeout(() => {
        if(!TERMINAL || !WRITELINESCOPY) return
        TERMINAL.innerHTML = "";
        TERMINAL.appendChild(WRITELINESCOPY);
        mutWriteLines = WRITELINESCOPY;
        // Show banner after clear
        if(!bareMode) {
          writeBanner(com.BANNER);
        }
      })
      break;
    case 'help':
      if(bareMode) {
        writeLines(["try refreshing", ""])
        break;
      }
      writeLines(com.HELP);
      break;
    case 'whoami':      
      if(bareMode) {
        writeLines(["guest", ""])
        break;
      }
      writeLines(com.WHOAMI());
      break;
    case 'about':
      if(bareMode) {
        writeLines(["nothing here", ""])
        break;
      }
      writeLines(com.ABOUT);
      break;
    case 'projects':
      if(bareMode) {
        writeLines(["projects are gone", ""])
        break;
      }
      writeLines(com.PROJECTS);
      break;
    case 'skills':
      if(bareMode) {
        writeLines(["skills? what skills?", ""])
        break;
      }
      writeLines(com.SKILLS);
      break;
    case 'etc':
      if(bareMode) {
        writeLines(["nothing here", ""])
        break;
      }
      writeLines(com.ETC);
      break;
    case 'repo':
      writeLines(["opening github...", ""]);
      setTimeout(() => {
        window.open(REPO_LINK, '_blank');
      }, 300);
      break;
    case 'home':
      writeLines(["opening sanjeed.in...", ""]);
      setTimeout(() => {
        window.open('https://sanjeed.in', '_blank');
      }, 300);
      break;
    case 'rm -rf':
      if (bareMode) {
        writeLines(["don't", ""])
        break;
      }

      if (isSudo) {
        writeLines(["usage: <span class='command'>rm -rf &lt;dir&gt;</span>", ""]);
      } else {
        writeLines(["permission denied", ""])
      }
        break;
    case 'sudo':
      if(bareMode) {
        writeLines(["no.", ""])
        break;
      }
      if(!PASSWORD) return
      isPasswordInput = true;
      USERINPUT.disabled = true;

      if(INPUT_HIDDEN) INPUT_HIDDEN.style.display = "none";
      PASSWORD.style.display = "block";
      setTimeout(() => {
        PASSWORD_INPUT.focus();
      }, 100);

      break;
    case 'ls':
      if(bareMode) {
        writeLines(["", ""])
        break;
      }

      if (isSudo) {
        writeLines(["src", ""]);
      } else {
        writeLines(["permission denied", ""]);
      }
      break;
    default:
      if(bareMode) {
        writeLines(["type help", ""])
        break;
      }

      writeLines(com.DEFAULT);
      break;
  }  
}

function writeLines(message : string[], fast = false) {
  if (!mutWriteLines || !mutWriteLines.parentNode) return;
  
  const delay = fast ? 0 : 12; // 12ms between lines - fast but perceptible
  
  message.forEach((item, idx) => {
    setTimeout(() => {
      if (!mutWriteLines || !mutWriteLines.parentNode) return;
      const p = document.createElement("p");
      p.innerHTML = item;
      mutWriteLines.parentNode!.insertBefore(p, mutWriteLines);
      scrollToBottom();
    }, delay * idx);
  });
}

function revertPasswordChanges() {
    if (!INPUT_HIDDEN || !PASSWORD) return
    PASSWORD_INPUT.value = "";
    USERINPUT.disabled = false;
    INPUT_HIDDEN.style.display = "block";
    PASSWORD.style.display = "none";
    isPasswordInput = false;

    setTimeout(() => {
      USERINPUT.focus();
    }, 200)
}

function passwordHandler() {
  if (passwordCounter === 2) {
    if (!INPUT_HIDDEN || !mutWriteLines || !PASSWORD) return
    writeLines(["", "incorrect password", "check console for hint", ""])
    revertPasswordChanges();
    passwordCounter = 0;
    return
  }

  if (PASSWORD_INPUT.value === SUDO_PASSWORD) {
    if (!mutWriteLines || !mutWriteLines.parentNode) return
    writeLines(["", "access granted", "try <span class='command'>rm -rf</span>", ""])
    revertPasswordChanges();
    isSudo = true;
    return
  } else {
    PASSWORD_INPUT.value = "";
    passwordCounter++;
  }
}

function easterEggStyles() {   
  const bars = document.getElementById("bars");
  const body = document.body;
  const main = document.getElementById("main");
  const span = document.getElementsByTagName("span");

  if (!bars) return
  bars.innerHTML = "";
  bars.remove()

  if (main) {
    main.style.border = "none";
    main.style.boxShadow = "none";
    main.style.background = "transparent";
  }

  body.style.backgroundColor = "#0a0a0a";
  body.style.color = "#666";

  for (let i = 0; i < span.length; i++) {
    span[i].style.color = "#666";
  }

  USERINPUT.style.backgroundColor = "transparent";
  USERINPUT.style.color = "#666";

}

const initEventListeners = () => {
  window.addEventListener('load', () => {
    // Slightly slower reveal for the banner (25ms) - more impactful
    writeBanner(com.BANNER);
    USERINPUT.addEventListener('keydown', userInputHandler);
    PASSWORD_INPUT.addEventListener('keydown', userInputHandler);
  });
  
  window.addEventListener('click', () => {
    USERINPUT.focus();
  });

  console.log("%cpassword: 311223 - 1d", "color: #c9a66b; font-size: 14px; font-family: monospace;");
}

function writeBanner(message: string[]) {
  if (!mutWriteLines || !mutWriteLines.parentNode) return;
  
  message.forEach((item, idx) => {
    setTimeout(() => {
      if (!mutWriteLines || !mutWriteLines.parentNode) return;
      const p = document.createElement("p");
      p.innerHTML = item;
      mutWriteLines.parentNode!.insertBefore(p, mutWriteLines);
      scrollToBottom();
    }, 30 * idx); // 30ms for banner - more deliberate
  });
}

initEventListeners();
