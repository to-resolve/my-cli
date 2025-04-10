import simpleGit, {SimpleGitOptions} from 'simple-git';
import createLogger from 'progress-estimator';
import chalk from "chalk";
import log from './log';
const figlet = require("figlet");

const logger = createLogger({ // 初始化进度条
  spinner: {
    interval: 300, // 变换时间 ms
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.blue(item)) // 设置加载动画
  }
})

const goodPrinter = () => {
  const data = figlet.textSync('luo-cli', {
    font: 'Standard', // 不要加 .flf 后缀
    horizontalLayout: 'default',
    verticalLayout: 'default',
  })

  console.log(chalk.rgb(220, 220, 170)(data))
}

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
};
export const clone = async (url: string, projectName: string, options: string[]) => {
  const git = simpleGit(gitOptions)
  try {
    // 开始下载代码并展示预估时间进度条
    await logger(git.clone(url, projectName, options), '代码下载中: ', {
      estimate: 8000 // 展示预估时间
    })

    console.log()
    goodPrinter()
    console.log()
    console.log(`${chalk.blue(`=========================================`)}`)
    console.log(`${chalk.blue(`===== 欢迎使用 luo-handy-cli 脚手架 =====`)}`)
    console.log(`${chalk.blue(`=========================================`)}`)
    console.log()
    console.log()
    log.success(`项目创建成功 ${chalk.blue(projectName)}`)
    log.success(`执行以下命令启动项目：`)
    log.info(`cd ${chalk.blue(projectName)}`)
    log.info(`${chalk.yellow('pnpm')} install`)
    log.info(`${chalk.yellow('pnpm')} run dev`)
    console.log()
    console.log()


  } catch (err: any) {
    log.error(chalk.red('下载失败'))
    console.log(err)
    }
} 