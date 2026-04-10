#! /usr/bin/env node

import { Command } from 'commander';
import pkg from './package.json' with { type: 'json' };
import askProjectInfo from './lib/prompt.js';
import copyTemplate from './lib/generate.js';
import installDependencies from './lib/install.js';
import chalkPkg from 'chalk';
import inquirer from 'inquirer';
import degitClone from './lib/degitClone.js';
import beautify from './lib/beautify.js';
import process from 'process';
import { ExitPromptError } from '@inquirer/core';


const GITHUB_TEMPLATE_URL = 'promiseLC/cli-template#main';

const inquirerApi = inquirer.default || inquirer;

const prompt = inquirerApi.prompt || inquirer.createPromptModule();

const chalk = chalkPkg.default || chalkPkg;

const program = new Command();

let children = null;

program.addHelpCommand(false); // 关闭自动 help 子命令

program
  .name('promise-create')
  .description('一个创建vite+react+ts的admin后台项目的脚手架')
  .version(pkg.version, '-v, --version', '查看版本')


program
  .command('create')
  .description('创建一个新的项目')
  .option('-n, --name <projectName>', '项目名称')
  .option('-t, --template <template>', '模板类型')
  .option('--mock', '启用 mock 数据')
  .action(async (cmdOpts) => {
    try {
      await beautify('Promise Create');

      const info = await askProjectInfo(cmdOpts);

      console.log(`开始创建项目: ${info.projectName}`);

      const tpl = String(info.template ?? '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
      if (tpl === 'basic') {
        await copyTemplate('basic', info.projectName);
      } else {
        await degitClone(GITHUB_TEMPLATE_URL, info.projectName);
      }

      const { shouldInstall } = await prompt([
        {
          type: 'confirm',
          name: 'shouldInstall',
          message: '是否自动安装依赖?',
          default: true
        }
      ]);

      if (shouldInstall) {
        const { installPromise, child } = installDependencies(info.projectName);
        children = child;
        await installPromise;
        children = null;
      }

      console.log(chalk.green('\n项目创建成功!'));

      console.log(`\n下一步:\n  cd ${info.projectName}\n  npm run start\n`);
    } catch (err) {
      if (err instanceof ExitPromptError || err?.name === 'ExitPromptError') {
        console.log(chalk.yellow('\n已取消操作（Ctrl+C）'));
        process.exit(130);
      }
      throw err;
    }
  })


process.on('SIGINT', () => {
  console.log(chalk.red('\n用户取消操作'));
  children?.kill?.('SIGINT');
  children = null;
  process.exit(130);
});

program.parse(process.argv);


