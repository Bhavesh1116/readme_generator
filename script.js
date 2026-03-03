// Stage selection
let currentStage = 1;
const stageBtns = document.querySelectorAll('.stage-btn');
const form = document.getElementById('readmeForm');
const previewSection = document.getElementById('previewSection');
const previewContent = document.getElementById('previewContent');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Stage button click handlers
stageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        stageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentStage = parseInt(btn.dataset.stage);
    });
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    generateReadme();
});

// Copy to clipboard
copyBtn.addEventListener('click', () => {
    const text = previewContent.textContent;
    navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
            copyBtn.textContent = '📋 Copy to Clipboard';
        }, 2000);
    });
});

// Download README
downloadBtn.addEventListener('click', () => {
    const text = previewContent.textContent;
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
});

// Get form data
function getFormData() {
    return {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        tagline: document.getElementById('tagline').value,
        bio: document.getElementById('bio').value,
        role: document.getElementById('role').value,
        location: document.getElementById('location').value,
        skills: document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s),
        projects: document.getElementById('projects').value.split('\n').filter(p => p.trim()),
        linkedin: document.getElementById('linkedin').value,
        email: document.getElementById('email').value,
        instagram: document.getElementById('instagram').value,
        twitter: document.getElementById('twitter').value,
        spotify: document.getElementById('spotify').value
    };
}

// Generate README based on stage
function generateReadme() {
    const data = getFormData();
    let readme = '';

    switch(currentStage) {
        case 1:
            readme = generateBasic(data);
            break;
        case 2:
            readme = generateSimple(data);
            break;
        case 3:
            readme = generateStandard(data);
            break;
        case 4:
            readme = generateAdvanced(data);
            break;
        case 5:
            readme = generateEnhanced(data);
            break;
    }

    previewContent.textContent = readme;
    previewSection.style.display = 'block';
    previewSection.scrollIntoView({ behavior: 'smooth' });
}

// Stage 1: Basic
function generateBasic(data) {
    return `# Hi there 👋, I'm ${data.name}

## About Me
${data.bio}

${data.role ? `- 🎓 ${data.role}` : ''}
${data.location ? `- 📍 ${data.location}` : ''}

## Skills
${data.skills.map(skill => `- ${skill}`).join('\n')}

## Connect with me
${data.linkedin ? `- [LinkedIn](${data.linkedin})` : ''}
${data.email ? `- Email: ${data.email}` : ''}
${data.instagram ? `- [Instagram](https://instagram.com/${data.instagram})` : ''}
${data.twitter ? `- [Twitter](https://twitter.com/${data.twitter})` : ''}
`;
}

// Stage 2: Simple
function generateSimple(data) {
    return `<div align="center">
  <h1>Hi 👋, I'm ${data.name}</h1>
  <h3>${data.tagline}</h3>
</div>

---

## 🚀 About Me

${data.bio}

${data.role ? `- 🎓 ${data.role}` : ''}
${data.location ? `- 📍 ${data.location}` : ''}

---

## 💻 Tech Stack

${data.skills.map(skill => `![${skill}](https://img.shields.io/badge/${skill.replace(/ /g, '%20')}-informational?style=for-the-badge)`).join('\n')}

---

## 📊 GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${data.username}&show_icons=true&theme=tokyonight)

---

## 📫 Connect With Me

${data.linkedin ? `[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](${data.linkedin})` : ''}
${data.email ? `[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${data.email})` : ''}
${data.instagram ? `[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/${data.instagram})` : ''}
${data.twitter ? `[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${data.twitter})` : ''}
`;
}

// Stage 3: Standard
function generateStandard(data) {
    const projectsHtml = data.projects.length > 0 ? data.projects.map((project, index) => {
        const parts = project.split('|').map(p => p.trim());
        return `### ${index + 1}. ${parts[0] || 'Project Name'}
**${parts[1] || 'Project Description'}**

${parts[2] ? `**Tech Stack:** \`${parts[2]}\`` : ''}

---`;
    }).join('\n\n') : '';

    return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=200&text=${data.name.replace(/ /g, '%20')}&fontSize=80&fontColor=FFFFFF&animation=twinkling&desc=${data.tagline.replace(/ /g, '%20')}&descSize=20&color=gradient" />
</div>

<div align="center">
  
  [![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&pause=1000&color=4A90E2&center=true&vCenter=true&width=600&lines=${data.tagline.replace(/ /g, '+')})](https://git.io/typing-svg)
  
  ![Profile Views](https://komarev.com/ghpvc/?username=${data.username}&label=Profile%20Views&color=4A90E2&style=for-the-badge)
  
</div>

---

## 🚀 About Me

> ${data.bio}

${data.role ? `- 🎓 **Current Role:** ${data.role}` : ''}
${data.location ? `- 📍 **Location:** ${data.location}` : ''}
- 💼 **Open to:** Collaborations, Projects, and Opportunities
- 🌱 **Currently:** Learning and building amazing things
- ⚡ **Fun fact:** I turn ideas into reality through code

---

## 💻 Tech Stack & Tools

<div align="center">

### Languages
${data.skills.slice(0, 5).map(skill => `![${skill}](https://img.shields.io/badge/${skill.replace(/ /g, '%20')}-informational?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, '-')}&logoColor=white)`).join('\n')}

${data.skills.length > 5 ? `### Tools & Technologies
${data.skills.slice(5).map(skill => `![${skill}](https://img.shields.io/badge/${skill.replace(/ /g, '%20')}-informational?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, '-')}&logoColor=white)`).join('\n')}` : ''}

</div>

---

## 📊 GitHub Statistics

<div align="center">
  <img width="49%" src="https://github-readme-stats.vercel.app/api?username=${data.username}&show_icons=true&theme=tokyonight&hide_border=true&count_private=true&include_all_commits=true" alt="GitHub Stats" />
  <img width="49%" src="https://github-readme-streak-stats.herokuapp.com/?user=${data.username}&theme=tokyonight&hide_border=true" alt="GitHub Streak" />
</div>

<div align="center">
  <img width="49%" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.username}&layout=compact&theme=tokyonight&hide_border=true&langs_count=8" alt="Top Languages" />
  <img width="49%" src="https://github-contributor-stats.vercel.app/api?username=${data.username}&limit=5&theme=tokyonight&combine_all_yearly_contributions=true&hide_border=true" alt="Contribution Stats" />
</div>

---

${data.projects.length > 0 ? `## 🏆 Featured Projects

${projectsHtml}

` : ''}

## 🌟 What I'm Up To

<table>
<tr>
<td width="50%">

#### 🔭 Currently Working On
- Building innovative solutions
- Contributing to open source
- Learning new technologies
- Collaborating with amazing people

</td>
<td width="50%">

#### 🌱 Currently Learning
- Advanced development concepts
- Best practices and patterns
- Industry-standard tools
- Problem-solving techniques

</td>
</tr>
<tr>
<td width="50%">

#### 👯 Looking to Collaborate On
- Open-source projects
- Innovative ideas
- Real-world solutions
- Team challenges

</td>
<td width="50%">

#### 💬 Ask Me About
- My projects and experiences
- Tech stack and tools
- Collaboration opportunities
- Anything tech-related!

</td>
</tr>
</table>

---

## 📫 Connect With Me

<div align="center">
  
${data.linkedin ? `  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](${data.linkedin})` : ''}
${data.email ? `  [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${data.email})` : ''}
${data.instagram ? `  [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/${data.instagram})` : ''}
${data.twitter ? `  [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${data.twitter})` : ''}
  
  <br/>
  
  ${data.email ? `### 📧 ${data.email}` : ''}
  ### 💼 Open for collaborations and opportunities!
  
</div>

---

## 🏅 Achievements

<div align="center">

![Profile Trophy](https://github-profile-trophy.vercel.app/?username=${data.username}&theme=tokyonight&no-frame=true&no-bg=false&margin-w=4&row=1)

</div>

---

<div align="center">
  
  ### ⭐ From [${data.username}](https://github.com/${data.username}) with 💙
  
  ![Visitor Count](https://profile-counter.glitch.me/${data.username}/count.svg)
  
  <img src="https://capsule-render.vercel.app/api?type=waving&height=100&section=footer&color=gradient" />
  
</div>
`;
}

// Stage 4: Advanced
function generateAdvanced(data) {
    const projectsHtml = data.projects.length > 0 ? data.projects.map((project, index) => {
        const parts = project.split('|').map(p => p.trim());
        return `<tr>
<td width="50%">

### 🎯 ${parts[0] || 'Project Name'}
**The Challenge:** Real-world problem that needed solving

**My Solution:**
${parts[1] || 'Detailed description of the solution and approach taken'}

**Impact:** ${parts[1] ? 'Making a difference through technology' : 'Building solutions that matter'}

**Tech Stack:** ${parts[2] ? `\`${parts[2]}\`` : 'Various technologies'}

</td>
${index % 2 === 0 && data.projects[index + 1] ? '' : `<td width="50%"></td>
</tr>`}`;
    }).join('\n') : '';

    return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=200&section=header&text=${data.name.replace(/ /g, '%20')}&fontSize=80&fontColor=FFFFFF&fontAlign=50&fontAlignY=35&animation=twinkling&desc=${data.tagline.replace(/ /g, '%20')}&descSize=20&descAlign=50&descAlignY=55&color=gradient" />
</div>

<div align="center">
  
  [![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=4A90E2&center=true&vCenter=true&random=false&width=700&lines=${data.tagline.replace(/ /g, '+')})](https://git.io/typing-svg)
  
  <img src="https://komarev.com/ghpvc/?username=${data.username}&label=Profile%20Views&color=4A90E2&style=for-the-badge" alt="Profile Views" />
  
</div>

---

## 🎯 Who Am I?

\`\`\`python
class ${data.name.replace(/ /g, '')}:
    def __init__(self):
        self.name = "${data.name}"
        ${data.role ? `self.role = "${data.role}"` : ''}
        ${data.location ? `self.location = "${data.location}"` : ''}
        self.passions = ["Coding", "Problem Solving", "Innovation"]
        
    def my_story(self):
        return """
        ${data.bio}
        
        I believe in building solutions that make a real impact.
        Every line of code is an opportunity to solve a problem.
        """
    
    def current_focus(self):
        return {
            "learning": "Always expanding my knowledge",
            "building": "Creating meaningful projects",
            "collaborating": "Working with amazing people",
            "growing": "Becoming better every day"
        }
    
    def say_hi(self):
        print("Thanks for visiting! Let's build something amazing together 🚀")

me = ${data.name.replace(/ /g, '')}()
me.say_hi()
\`\`\`

> 💡 ${data.bio}

---

## 💪 My Core Strengths

<table>
<tr>
<td width="33%" align="center">

### 🎯 Problem Solving
**Turning Challenges into Solutions**

- Deep problem analysis
- Creative solution design
- Practical implementation
- Continuous improvement

</td>
<td width="33%" align="center">

### 💻 Technical Skills
**Building with Purpose**

- Clean, maintainable code
- Best practices
- Modern technologies
- Scalable solutions

</td>
<td width="33%" align="center">

### 🤝 Collaboration
**Growing Together**

- Team player
- Open communication
- Knowledge sharing
- Community contribution

</td>
</tr>
</table>

---

## 🛠️ Tech Stack & Tools

<div align="center">

### Languages & Frameworks
${data.skills.slice(0, 5).map(skill => `![${skill}](https://img.shields.io/badge/${skill.replace(/ /g, '%20')}-informational?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, '-')}&logoColor=white)`).join('\n')}

${data.skills.length > 5 ? `### Tools & Platforms
${data.skills.slice(5, 10).map(skill => `![${skill}](https://img.shields.io/badge/${skill.replace(/ /g, '%20')}-informational?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, '-')}&logoColor=white)`).join('\n')}` : ''}

${data.skills.length > 10 ? `### Additional Technologies
${data.skills.slice(10).map(skill => `![${skill}](https://img.shields.io/badge/${skill.replace(/ /g, '%20')}-informational?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, '-')}&logoColor=white)`).join('\n')}` : ''}

</div>

---

## 📊 GitHub Analytics

<div align="center">
  <img width="49%" src="https://github-readme-stats.vercel.app/api?username=${data.username}&show_icons=true&theme=tokyonight&hide_border=true&count_private=true&include_all_commits=true" alt="GitHub Stats" />
  <img width="49%" src="https://github-readme-streak-stats.herokuapp.com/?user=${data.username}&theme=tokyonight&hide_border=true" alt="GitHub Streak" />
</div>

<div align="center">
  <img width="49%" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.username}&layout=compact&theme=tokyonight&hide_border=true&langs_count=8" alt="Top Languages" />
  <img width="49%" src="https://github-contributor-stats.vercel.app/api?username=${data.username}&limit=5&theme=tokyonight&combine_all_yearly_contributions=true&hide_border=true" alt="Contribution Stats" />
</div>

---

${data.projects.length > 0 ? `## 🏆 Featured Projects

<table>
${projectsHtml}
</table>

---

` : ''}

## 🌟 What I'm Up To

<table>
<tr>
<td width="50%">

#### 🔭 Currently Working On
- 🚀 Building innovative solutions
- 🤖 Exploring new technologies
- 📊 Contributing to open source
- 🔐 Creating secure applications
- 🎯 Solving real-world problems

</td>
<td width="50%">

#### 🌱 Currently Learning
- 📚 Advanced development concepts
- 🏗️ System design and architecture
- ⚡ Performance optimization
- 🔒 Security best practices
- 🌐 Cloud technologies

</td>
</tr>
<tr>
<td width="50%">

#### 👯 Looking to Collaborate On
- 💡 Innovative open-source projects
- 🌍 Social impact initiatives
- 🎓 Educational tech solutions
- 🤝 Team-based challenges
- 🚀 Startup ideas

</td>
<td width="50%">

#### 💬 Ask Me About
- 💻 My projects and experiences
- 🛠️ Tech stack and tools I use
- 🤝 Collaboration opportunities
- 📖 Learning resources
- 🎯 Problem-solving approaches

</td>
</tr>
</table>

---

## 🎓 Skills & Expertise

<div align="center">

### Technical Proficiency
\`\`\`
████████████████████░░  85%  Development & Implementation
███████████████████░░░  80%  Problem Analysis & Design
██████████████████░░░░  75%  System Architecture
█████████████████░░░░░  70%  Database Management
████████████████░░░░░░  65%  DevOps & Deployment
\`\`\`

### Soft Skills
\`\`\`
████████████████████░░  90%  Communication & Collaboration
███████████████████░░░  85%  Problem Solving
██████████████████░░░░  80%  Project Management
███████████████████░░░  85%  Continuous Learning
\`\`\`

</div>

---

${data.spotify ? `## 🎵 Currently Vibing To

<div align="center">
  <a href="https://open.spotify.com/user/${data.spotify}">
    <img src="https://spotify-recently-played-readme.vercel.app/api?user=${data.spotify}&count=5&unique=true&width=600" alt="Spotify recently played" />
  </a>
</div>

---

` : ''}

## 📫 Let's Connect & Collaborate

<div align="center">
  
${data.linkedin ? `  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](${data.linkedin})` : ''}
${data.email ? `  [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${data.email})` : ''}
${data.instagram ? `  [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/${data.instagram})` : ''}
${data.twitter ? `  [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${data.twitter})` : ''}
  
  <br/>
  
  ${data.email ? `### 📧 ${data.email}` : ''}
  
  ### 💼 Open for: Team Projects | Collaborations | Opportunities | Freelance Work
  
</div>

---

## 🎨 Beyond Coding

<div align="center">

| 💻 Technical | 🎯 Personal | 🌱 Growth | 🤝 Community |
|:-------:|:--------:|:-----------:|:---------:|
| Building solutions | Problem solving | Continuous learning | Open source |
| Code quality | Strategic thinking | Skill development | Knowledge sharing |
| Best practices | Innovation | Self-improvement | Mentoring |

</div>

---

## 🏅 Achievements & Recognition

<div align="center">

![Profile Trophy](https://github-profile-trophy.vercel.app/?username=${data.username}&theme=tokyonight&no-frame=true&no-bg=false&margin-w=4&row=1)

</div>

---

## 💭 My Philosophy

<div align="center">

\`\`\`javascript
const myPhilosophy = {
    vision: "Create solutions that make real impact",
    approach: "Learn, Build, Share, Repeat",
    values: ["Quality", "Innovation", "Collaboration", "Growth"],
    motto: "Every problem is an opportunity to learn and grow",
    goal: "Build technology that improves lives"
};
\`\`\`

</div>

---

## 🐍 Contribution Activity

<div align="center">
  
  ![Snake animation](https://raw.githubusercontent.com/${data.username}/${data.username}/output/github-contribution-grid-snake-dark.svg)
  
</div>

---

## 📈 GitHub Activity Graph

<div align="center">
  
  [![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${data.username}&theme=tokyo-night&hide_border=true&area=true)](https://github.com/ashutosh00710/github-readme-activity-graph)
  
</div>

---

<div align="center">
  
  ### 💡 "The best way to predict the future is to create it"
  
  ### ⭐ From [${data.username}](https://github.com/${data.username}) with 💙
  
  ![Visitor Count](https://profile-counter.glitch.me/${data.username}/count.svg)
  
  <img src="https://capsule-render.vercel.app/api?type=waving&height=100&section=footer&color=gradient" />
  
</div>
`;
}

// Stage 5: Enhanced (Most Advanced)
function generateEnhanced(data) {
    return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=200&section=header&text=${data.name.replace(/ /g, '%20')}&fontSize=80&fontColor=FFFFFF&fontAlign=50&fontAlignY=35&animation=twinkling&desc=${data.tagline.replace(/ /g, '%20')}&descSize=20&descAlign=50&descAlignY=55&color=gradient" />
</div>

<div align="center">
  
  [![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=4A90E2&center=true&vCenter=true&random=false&width=700&lines=${data.tagline.replace(/ /g, '+')})](https://git.io/typing-svg)
  
  <img src="https://komarev.com/ghpvc/?username=${data.username}&label=Profile%20Views&color=4A90E2&style=for-the-badge" alt="Profile Views" />
  
</div>

---

## 🎯 Who Am I?

\`\`\`python
class ${data.name.replace(/ /g, '')}:
    def __init__(self):
        self.name = "${data.name}"
        ${data.role ? `self.role = "${data.role}"` : ''}
        ${data.location ? `self.location = "${data.location}"` : ''}
        
    def my_story(self):
        return """
        ${data.bio}
        """
    
    def say_hi(self):
        print("Thanks for visiting my profile! Let's build something amazing together 🚀")

me = ${data.name.replace(/ /g, '')}()
me.say_hi()
\`\`\`

---

## 💻 Tech Stack

<div align="center">

### Languages & Frameworks
${data.skills.slice(0, 5).map(skill => `![${skill}](https://img.shields.io/badge/${skill.replace(/ /g, '%20')}-informational?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, '-')}&logoColor=white)`).join('\n')}

${data.skills.length > 5 ? `### Tools & Platforms
${data.skills.slice(5).map(skill => `![${skill}](https://img.shields.io/badge/${skill.replace(/ /g, '%20')}-informational?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, '-')}&logoColor=white)`).join('\n')}` : ''}

</div>

---

## 📊 GitHub Analytics

<div align="center">
  <img width="49%" src="https://github-readme-stats.vercel.app/api?username=${data.username}&show_icons=true&theme=tokyonight&hide_border=true&count_private=true&include_all_commits=true" alt="GitHub Stats" />
  <img width="49%" src="https://github-readme-streak-stats.herokuapp.com/?user=${data.username}&theme=tokyonight&hide_border=true" alt="GitHub Streak" />
</div>

<div align="center">
  <img width="49%" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.username}&layout=compact&theme=tokyonight&hide_border=true&langs_count=8" alt="Top Languages" />
  <img width="49%" src="https://github-contributor-stats.vercel.app/api?username=${data.username}&limit=5&theme=tokyonight&combine_all_yearly_contributions=true&hide_border=true" alt="Contribution Stats" />
</div>

---

${data.projects.length > 0 ? `## 🏆 Featured Projects

<table>
${data.projects.map((project, index) => {
    const parts = project.split('|').map(p => p.trim());
    if (index % 2 === 0) {
        return `<tr>
<td width="50%">

### ${parts[0] || 'Project'}
${parts[1] || 'Description'}

${parts[2] ? `\`${parts[2]}\`` : ''}

</td>`;
    } else {
        return `<td width="50%">

### ${parts[0] || 'Project'}
${parts[1] || 'Description'}

${parts[2] ? `\`${parts[2]}\`` : ''}

</td>
</tr>`;
    }
}).join('\n')}
${data.projects.length % 2 !== 0 ? '<td width="50%"></td>\n</tr>' : ''}
</table>

---

` : ''}

## 🌟 What I'm Up To

<table>
<tr>
<td width="50%">

#### 🔭 Currently Working On
- Building amazing projects
- Learning new technologies
- Contributing to open source

</td>
<td width="50%">

#### 🌱 Currently Learning
- Advanced concepts
- Best practices
- Industry standards

</td>
</tr>
<tr>
<td width="50%">

#### 👯 Looking to Collaborate On
- Open-source projects
- Innovative ideas
- Team challenges

</td>
<td width="50%">

#### 💬 Ask Me About
- My projects
- Tech stack
- Collaboration opportunities

</td>
</tr>
</table>

---

${data.spotify ? `## 🎵 Currently Listening To

<div align="center">
  <a href="https://open.spotify.com/user/${data.spotify}">
    <img src="https://spotify-recently-played-readme.vercel.app/api?user=${data.spotify}&count=5&unique=true&width=600" alt="Spotify recently played" />
  </a>
</div>

---

` : ''}

## 📫 Connect With Me

<div align="center">
  
${data.linkedin ? `  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](${data.linkedin})` : ''}
${data.email ? `  [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${data.email})` : ''}
${data.instagram ? `  [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/${data.instagram})` : ''}
${data.twitter ? `  [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${data.twitter})` : ''}
  
  <br/>
  
  ${data.email ? `### 📧 ${data.email}` : ''}
  ### 💼 Open for collaborations and opportunities!
  
</div>

---

## 🎨 Fun Facts

<div align="center">

\`\`\`javascript
const aboutMe = {
    pronouns: "He/Him",
    code: ${JSON.stringify(data.skills.slice(0, 4))},
    askMeAbout: ["Projects", "Tech", "Collaboration"],
    funFact: "I turn coffee into code ☕➡️💻"
};
\`\`\`

</div>

---

## 🏅 Achievements

<div align="center">

![Profile Trophy](https://github-profile-trophy.vercel.app/?username=${data.username}&theme=tokyonight&no-frame=true&no-bg=false&margin-w=4&row=1)

</div>

---

## 💭 Random Dev Quote

<div align="center">
  
  [![Readme Quotes](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=tokyonight)](https://github.com/piyushsuthar/github-readme-quotes)
  
</div>

---

## 🐍 Contribution Activity

<div align="center">
  
  ![Snake animation](https://raw.githubusercontent.com/${data.username}/${data.username}/output/github-contribution-grid-snake-dark.svg)
  
</div>

---

## 📈 Activity Graph

<div align="center">
  
  [![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${data.username}&theme=tokyo-night&hide_border=true&area=true)](https://github.com/ashutosh00710/github-readme-activity-graph)
  
</div>

---

<div align="center">
  
  ### 💡 "Code is like humor. When you have to explain it, it's bad." – Cory House
  
  ### ⭐ From [${data.username}](https://github.com/${data.username}) with 💙
  
  ![Visitor Count](https://profile-counter.glitch.me/${data.username}/count.svg)
  
  <img src="https://capsule-render.vercel.app/api?type=waving&height=100&section=footer&color=gradient" />
  
</div>
`;
}
