const fs = require('fs-extra');
const axios = require('axios');

const username = 'Flarxx'; // tu usuario de GitHub
const distPath = './dist/snake.svg';

async function getContributions(username) {
  const url = `https://github.com/users/${username}/contributions`;
  const res = await axios.get(url);
  return res.data;
}

async function generateSVG() {
  const html = await getContributions(username);
  
  const rects = html.match(/<rect .*?\/>/g) || [];
  
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="110">
${rects.join('\n')}
</svg>`;
  
  await fs.writeFile(distPath, svgContent, 'utf8');
  console.log('snake.svg generado!');
}

generateSVG();
