import degitPkg from 'degit';
import fs from 'fs-extra';
import path from 'path';
import cliProgress from 'cli-progress';

const degit = degitPkg.default ?? degitPkg;

export default async function degitClone(source, target) {
  // 将 target 转为绝对路径
  const absoluteTarget = path.isAbsolute(target) ? target : path.resolve(process.cwd(), target);



  if (await fs.pathExists(absoluteTarget)) {
    const files = await fs.readdir(absoluteTarget);
    if (files.length > 0) {
      throw new Error(`目标目录不为空: ${absoluteTarget}`);
    }
  }
  // 这行代码的意思是：确保目标目录存在，如果没有则创建它，相当于 mkdir -p
  await fs.ensureDir(absoluteTarget);

  const emitter = degit(source, { verbose: true });

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  let progress = 0
  bar.start(100, progress, { phase: '准备' });

  let intervalId = null;

  intervalId = setInterval(() => {
    progress = Math.min(progress + 1, 92);
    bar.update(progress);
  }, 200);

  emitter.on('info', (info) => {
    bar.update(progress, { phase: info.message });
  });



  return emitter.clone(absoluteTarget).then(() => {
    progress = 100;
    bar.update(progress, { phase: '完成' })
  }).finally(() => {
    clearInterval(intervalId);
    bar.stop();
  });

}