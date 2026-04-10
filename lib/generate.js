import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyTemplate(template, targetDir) {
  const templateDir = path.join(__dirname, '..', 'templates', template);

  if (!(await fs.pathExists(templateDir))) {
    throw new Error(`模板不存在: ${template}`);
  }


  if (await fs.pathExists(targetDir)) {
    const files = await fs.readdir(targetDir);
    if (files.length > 0) {
      throw new Error(`目标目录不为空: ${targetDir}`);
    }
  }
  // 这行代码的意思是：确保目标目录存在，如果没有则创建它，相当于 mkdir -p
  await fs.ensureDir(targetDir);
  await fs.copy(templateDir, targetDir);

}


export default copyTemplate;