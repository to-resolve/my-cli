import { input, select } from '@inquirer/prompts';
import { clone } from '../utils/clone';
import path from 'path';
import fs from 'fs-extra';

export interface TemplateInfo {
  name: string; // 项目名称
  downloadUrl: string; // 下载地址
  description: string; // 项目描述
  branch: string; // 项目分支
} 

export const templates: Map<string, TemplateInfo> = new Map(
  [
    ["Vue2-ElementUi-Template", {
      name: "admin-template",
      downloadUrl: 'https://github.com/PanJiaChen/vue-admin-template.git',
      description: 'Vue2+ElementUi开发模板',
      branch: 'master'
    }],
    ["Vue3-ElementPlus-Vite-TypeScript-template", {
      name: "admin-template",
      downloadUrl: 'https://gitee.com/youlaiorg/vue3-element-admin.git',
      description: 'Vue3企业级后台管理前端模板',
      branch: 'master'
    }]
  ]
)

export const isOverwrite = async (fileName: string) => {
  console.warn(`${fileName} 文件已存在 !`)
  return select({
    message: '是否覆盖原文件: ',
    choices: [
      {name: '覆盖', value: true},
      {name: '取消', value: false}
    ]
  });
}

export async function create(projectName?: string) {
  const templateList = [...templates.entries()].map((item: [string, TemplateInfo]) => {
    const [name, info] = item;
    return {
      name,
      value: name,
      description: info.description
    }
  });
  if (!projectName) {
    projectName = await input({message: '请输入项目名称'})
  }
  // 如果文件已存在需要让用户判断是否覆盖原文件
  const filePath = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(projectName)
    if (run) {
      await fs.remove(filePath)
    } else {
      return // 不覆盖直接结束
    }
  }

  const templateName = await select({
    message: '请选择模版',
    choices: templateList,
  });
  const info = templates.get(templateName);
  console.log(info);
  if (info) {
    clone(info.downloadUrl, projectName, ['-b', info.branch])
  }

}