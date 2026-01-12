import command from '../config.json' with {type: 'json'};

const REPO_LINK = command.repoLink;

const defaultObj = {
  "message": [
    "",
    "command not found",
    "type <span class='command'>help</span> for available commands",
    "",
  ]
}

const whoamiObj = {
  "message" : [
    [
      "in the kaleidoscope of existence,",
      "i am but a reflection questioning the enigma —"
    ],
    [
      "amidst cosmic whispers,",
      "i navigate the maze of self-discovery,",
      "echoing the eternal refrain —"
    ],
    [
      "in the symphony of life,",
      "i am a note inquiring its own melody,",
      "harmonizing with the universal query —",
    ],
    [
      "as stardust contemplating its journey,",
      "i ponder the cosmic query,",
      "silently asking —",
    ],
    [
      "in the tapestry of reality,",
      "i am the thread of self-inquiry,",
      "weaving through the eternal question —"
    ],
    [
      "in the tapestry of time,",
      "i weave threads of thought,",
      "exploring the intricate dance of destiny —",
    ],
    [
      "amidst the ocean of stars,",
      "i sail the vessel of my soul,",
      "charting courses through celestial dreams —"
    ],
    [
      "beneath the veil of reality,",
      "i peer into the abyss of the unknown,",
      "seeking truths in the shadows of mystery —"
    ],
    [
      "in the labyrinth of consciousness,",
      "i wander with purpose,",
      "deciphering the enigma of my own being —"
    ],
    [
      "as a composer of silence,",
      "i orchestrate the symphony of my thoughts,",
      "playing the music of the inner self —"
    ],
    [
      "in the garden of the universe,",
      "i bloom with curiosity,",
      "nurturing seeds of wisdom in the soil of experience —"
    ]
  ],
}

const helpObj = {
  "commands": [
    ["about", "who is sanjeed?"],
    ["projects", "things i've built"],
    ["skills", "tech stack & tools"],
    ["etc", "everything else"],
    ["whoami", "a perplexing question"],
    ["sudo", "???"],
    ["repo", "view the source code"],
    ["clear", "clear the terminal"],
    ["home", "go back to sanjeed.in"]
  ],
}

const createProject = () : string[] => {
  const projects : string[] = [];
  
  projects.push("");
  projects.push("<span class='section-title'>projects</span>");
  projects.push("");

  command.projects.forEach((ele, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    let link = `<a href="${ele[2]}" target="_blank">${ele[0]}</a>`;
    projects.push(`<span class='project-num'>${num}</span>  ${link}`);
    projects.push(`<span class='project-num'>&nbsp;&nbsp;</span>  <span style="color: var(--text-muted);">${ele[1]}</span>`);
    if (idx < command.projects.length - 1) projects.push("");
  });

  projects.push("");
  return projects
}

const createBanner = () : string[] => {
  const banner : string[] = [];
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  
  banner.push("");
  banner.push("<span class='banner-name'>sanjeed</span>");
  banner.push("<span class='banner-role'>ai engineer & consultant</span>");
  banner.push("");
  banner.push(`<span class='banner-meta'>session started · ${dateStr.toLowerCase()} · ${timeStr}</span>`);
  banner.push("");
  banner.push("—");
  banner.push("");
  banner.push("type <span class='command'>about</span> to learn more");
  banner.push("type <span class='command'>help</span> for all commands");
  banner.push("");
  return banner;
}

const createDefault = () : string[] => {
  const defaultMsg : string[] = [];

  defaultObj.message.forEach((ele) => {
    defaultMsg.push(ele);
  })

  return defaultMsg;
}

const createWhoami = () : string[] => {
  const whoami : string[] = [];  
  const r = Math.floor(Math.random() * whoamiObj.message.length);
  whoami.push("");

  whoamiObj.message[r].forEach((ele, idx) => {
    if (idx === whoamiObj.message[r].length - 1) {
      ele += " <span class='command'>who am i?</span>";
    }
    whoami.push(ele);
  })

  whoami.push("");

  return whoami
}

const createAbout = () : string[] => {
  const about : string[] = [];

  about.push("");
  about.push("<span class='section-title'>about</span>");
  about.push("");
  about.push(command.aboutGreeting);
  about.push("");
  about.push("<span class='section-title'>connect</span>");
  about.push("");
  about.push("<span class='social-label'>email</span>     <a target='_blank' href='mailto:" + command.social.email + "'>" + command.social.email + "</a>");
  about.push("<span class='social-label'>github</span>    <a target='_blank' href='https://github.com/" + command.social.github + "'>" + command.social.github + "</a>");
  about.push("<span class='social-label'>twitter</span>   <a target='_blank' href='https://x.com/" + command.social.twitter + "'>" + command.social.twitter + "</a>");
  about.push("<span class='social-label'>linkedin</span>  <a target='_blank' href='https://linkedin.com/in/" + command.social.linkedin + "'>" + command.social.linkedin + "</a>");
  about.push("");
  
  return about
}

const createHelp = () : string[] => {
  const help : string[] = []
  help.push("")
  help.push("<span class='section-title'>commands</span>");
  help.push("")

  helpObj.commands.forEach((ele) => {
    const padded = ele[0].padEnd(10, ' ').replace(/ /g, '&nbsp;');
    help.push(`<span class='command'>${padded}</span><span style="color: var(--text-muted);">${ele[1]}</span>`);
  })

  help.push("");
  help.push("<span class='help-hint'>[tab] autocomplete · [↑↓] history · [esc] clear</span>")
  help.push("")
  return help
}

const createSkills = () : string[] => {
  const skills : string[] = [];

  skills.push("");
  skills.push("<span class='section-title'>skills</span>");
  skills.push("");
  skills.push("<span class='skill-cat'>ai</span>        cursor · langchain · crewai · openai · claude");
  skills.push("<span class='skill-cat'>frontend</span>   react · typescript · vite · tailwind");
  skills.push("<span class='skill-cat'>backend</span>    node · python · firebase · cloudflare · docker");
  skills.push("<span class='skill-cat'>tools</span>      cursor · obsidian · raycast · pnpm · uv");
  skills.push("");

  return skills;
}

const createEtc = () : string[] => {
  const etc : string[] = [];

  etc.push("");
  etc.push("<span class='section-title'>etc</span>");
  etc.push("");
  etc.push("i sing. performed with 10+ instruments.");
  etc.push("will literally fly for good food.");
  etc.push("");
  etc.push("<span class='social-label'>instagram</span> <a target='_blank' href='https://instagram.com/sanjeed.i'>@sanjeed.i</a>");
  etc.push("");

  return etc;
}

const BANNER = createBanner();
const DEFAULT = createDefault();
const HELP = createHelp();
const ABOUT = createAbout();
const PROJECTS = createProject();
const SKILLS = createSkills();
const ETC = createEtc();

export { BANNER, DEFAULT, HELP, ABOUT, PROJECTS, SKILLS, ETC, REPO_LINK, createWhoami as WHOAMI } 
