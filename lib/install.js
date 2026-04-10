import { spawn } from 'child_process';

export default function installDependencies(targetDir) {


  const child = spawn('npm', ['install'], {
    cwd: targetDir,
    stdio: 'inherit',
    shell: true
  });

  const installPromise = new Promise((resolve, reject) => {

    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`npm install 失败，退出码 ${code}`));
    });

    child.on('error', (err) => {
      reject(new Error(`npm install 失败，错误: ${err.message}`));
    });
  });

  return {
    installPromise,
    child
  };
}