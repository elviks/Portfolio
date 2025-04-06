const content = {
     about: `
        # ABOUT ME

        Name: Elvik Sharma
        Role: Full Stack Developer
        Location: Pokhara, Nepal
        
        I'm a fullstack developer with experience in building web applications.
        My focus is on creating clean, efficient, and user-friendly solutions to complex problems.
        
        When I'm not coding, you can find me gaming, watching sci-fi and horror movies, or exploring tech stuffs.
      `,

     skills: `
        # SKILLS
        
        ## Programming Languages
        - JavaScript/TypeScript
        - Dart
        - Python
        - C/C++
        - C#
        
        ## Frameworks
        - React Js
        - Next Js
        - Express Js
        - Flutter
        - Taiwlind
        - Bootstrap
        - Firebase
        - Supabase

        ## Creative Softwares
        - After Effects
        - Premiere Pro
        - Blender
        - Unity3D
        - Godot
        - Unreal Engine 5
        
        ## Other
        - Git/GitHub
      `,

     experience: `
        # EXPERIENCE
        
        ## Motion Graphic Designer | Misguided Nepal
        2021 - 2024
        
        ## Content Creator | Bingo Labs
        2024 - Present
      `,

     projects: `
        # PROJECTS
        
        ## Premiere Pro Beginners Course
        Planned and edited an entire video editing course focusing on beginners
        
        ## GamerGears : E-commerce Platform
        A complete online shopping solution with payment processing and inventory management.
        Tech: NextJs, React-Native, PostgreSQL, 
      `,

     education: `
        # EDUCATION

        ## Bachelor of Science in Computer Science and Information Technology
        Mount Annapurna Campus, Pokhara | 2020 - 2025
      `,

     contact: `
        # CONTACT
        
        Email: elviksharma111@gmail.com
        LinkedIn: [linkedin.com/in/elviksharma](https://www.linkedin.com/in/elvik-sharma-13b52b202/)
        GitHub: [github.com/elviks](https://github.com/elviks)
        Instagram: [@reallyelvik](https://www.instagram.com/reallyelvik/)
      `,
};

const commands = {
     help: "Displays available commands",
     about: "Displays information about me",
     skills: "Lists my technical skills",
     experience: "Shows my work experience",
     projects: "Displays my portfolio projects",
     education: "Shows my educational background",
     contact: "Displays my contact information",
     clear: "Clears the terminal",
     email: "Opens your email client to contact me",
     all: "Displays all information",
};

const terminal = document.getElementById("terminal");
const userInput = document.getElementById("user-input");
const timeDisplay = document.getElementById("current-time");

function updateTime() {
     const now = new Date();
     timeDisplay.textContent = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
     });
}

setInterval(updateTime, 1000);
updateTime();

userInput.addEventListener("keypress", function (e) {
     if (e.key === "Enter") {
          const command = userInput.value.trim().toLowerCase();
          userInput.value = "";

          const promptElement = document.createElement("div");
          promptElement.className = "terminal-prompt";
          promptElement.innerHTML = `<span class="prompt-sign">$</span><span class="prompt-command">${command}</span>`;
          terminal.appendChild(promptElement);

          processCommand(command);

          terminal.scrollTop = terminal.scrollHeight;
     }
});

function processCommand(command) {
     const responseElement = document.createElement("div");
     responseElement.className = "response";

     switch (command) {
          case "help":
               let helpText = "Available commands:\n\n";
               for (const [cmd, desc] of Object.entries(commands)) {
                    helpText += `${cmd}: ${desc}\n`;
               }
               responseElement.innerHTML = formatOutput(helpText);
               break;

          case "about":
          case "skills":
          case "experience":
          case "projects":
          case "education":
          case "contact":
               responseElement.innerHTML = formatOutput(content[command]);
               break;

          case "clear":
               terminal.innerHTML = "";
               return;

          case "email":
               responseElement.innerHTML = "Opening email client...";
               setTimeout(
                    () =>
                         (window.location.href =
                              "mailto:elviksharma111@gmail.com"),
                    500
               );
               break;

          case "all":
               responseElement.innerHTML = formatOutput(
                    content.about +
                         "\n\n" +
                         content.skills +
                         "\n\n" +
                         content.experience +
                         "\n\n" +
                         content.projects +
                         "\n\n" +
                         content.education +
                         "\n\n" +
                         content.contact
               );
               break;

          default:
               responseElement.innerHTML = `Command not found: ${command}. Type 'help' to see available commands.`;
     }

     terminal.appendChild(responseElement);
}

function formatOutput(text) {
     return text
          .replace(/^# (.+)$/gm, "<h2>$1</h2>")
          .replace(/^## (.+)$/gm, "<h3>$1</h3>")
          .replace(/^- (.+)$/gm, "• $1<br>")
          .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
          .replace(/\[(.+?)\]/g, '<a href="#">$1</a>')
          .replace(/\n/g, "<br>");
}

document.addEventListener("DOMContentLoaded", function () {
     setTimeout(() => {
          const responseElement = document.createElement("div");
          responseElement.className = "terminal-prompt";
          responseElement.innerHTML = `<span class="prompt-sign">$</span><span class="prompt-command">whoami</span>`;
          terminal.appendChild(responseElement);

          const whoamiResponse = document.createElement("div");
          whoamiResponse.className = "response";
          whoamiResponse.innerHTML = "Elvik Sharma - Full Stack Developer";
          terminal.appendChild(whoamiResponse);
     }, 1000);
});
