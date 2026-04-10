import clear from 'clear';
import figlet from 'figlet';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';



export default async function beautify(message) {
  message = message || "Promise Create";
  // 打印欢迎画面
  clear();
  const logo = figlet.textSync(message, {
    // font: "Ghost",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  });

  const rainbow = chalkAnimation.rainbow(logo);

  return new Promise((resolve) => {
    setTimeout(() => {
      rainbow.stop(); // Animation stops
      resolve();
    }, 500);
  });
}