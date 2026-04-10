import inquirer from 'inquirer';
import { select } from '@inquirer/prompts';
const inquirerApi = inquirer.default || inquirer;


const prompt = inquirerApi.prompt || inquirer.createPromptModule();

export default async function askProjectInfo(cliOptions = {}) {
  const questions = [];

  if (!cliOptions.name) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称:',
      default: 'my-app',
      validate(input) {
        if (!input || !input.trim()) return '项目名称不能为空';
        return true;
      }
    });
  }

  if (!cliOptions.mock) {
    questions.push({
      type: 'confirm',
      name: 'mock',
      message: '是否启用mock并需要生成mock数据?',
      default: false,
    });
  }

  const answers = await prompt(questions);

  answers.template = await select({ message: '选择模板？', choices: ['Basic', 'react-admin'] });


  return {
    projectName: cliOptions.name || answers.projectName,
    template: cliOptions.template || answers.template,
    mock: cliOptions.mock || answers.mock,
  };
}

