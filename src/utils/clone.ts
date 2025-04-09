import simpleGit, {SimpleGitOptions} from 'simple-git';
import createLogger from 'progress-estimator';
import chalk from "chalk";

const logger = createLogger({ // 初始化进度条
  spinner: {
    interval: 300, // 变换时间 ms
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.blue(item)) // 设置加载动画
  }
})
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
    console.log()
    console.log(chalk.blueBright(`=========================================`))
    console.log(chalk.blueBright(`===== 欢迎使用 luo-handy-cli 脚手架 =====`))
    console.log(chalk.blueBright(`=========================================`))
    console.log()
    console.log()
    console.log(`项目创建成功 ${chalk.blueBright(projectName)}`)
    console.log(`执行以下命令启动项目：`)
    console.log(`cd ${chalk.blueBright(projectName)}`)
    console.log(`${chalk.yellow('pnpm')} install`)
    console.log(`${chalk.yellow('pnpm')} run dev`)
    console.log()
    console.log()


  } catch (err: any) {
    console.error(chalk.red('下载失败'))
    console.log(err)
    }
} 