import {
  SiReact as ReactjsIcon,
  SiTypescript as TypescriptIcon,
  SiNodedotjs as NodejsIcon,
  SiNextdotjs as NextjsIcon,
  SiJavascript as JavascriptIcon,
  SiHtml5 as HtmlIcon,
  SiCss3 as CssIcon,
  SiStyledcomponents as StyledComponentsIcon,
  SiPostgresql as PostgresIcon,
  SiPrisma as PrismaIcon,
  SiExpress as ExpressIcon,
  SiDocker as DockerIcon,
  SiJest as JestIcon,
  SiSwagger as SwaggerIcon,
  SiAxios as AxiosIcon,
  SiGit as GitIcon,
  SiGithubactions as GithubActionsIcon,
  SiDotenv as DotenvIcon,
  SiPassport as PassportIcon,
  SiRedux as ReduxIcon,
  SiFlutter as FlutterIcon,
  SiDart as DartIcon,
  SiFramer as FramerIcon,
  SiLinux as LinuxIcon,
  SiNginx as NginxIcon,
  SiNpm as NpmIcon,
  SiStorybook as StorybookIcon,
  SiWebstorm as WebstormIcon,
  SiIterm2 as ItermIcon,
  SiMacos as MacosIcon,
  SiZsh as ZshIcon,
} from "react-icons/si";
import { VscVscode as VsCodeIcon } from "react-icons/vsc";

export interface TechnologyIcon {
  name: string;
  icon: React.ComponentType;
  color?: string;
}

export const environmentIcons: TechnologyIcon[] = [
  { name: "Iterm2", icon: ItermIcon, color: "#ffffff" },
  { name: "Zsh", icon: ZshIcon, color: "#c5db00" },
  { name: "VSCode", icon: VsCodeIcon, color: "#007ACC" },
  { name: "Webstorm", icon: WebstormIcon, color: "#00CDD7" },
  { name: "MacOS", icon: MacosIcon, color: "#ffffff" },
  { name: "Linux", icon: LinuxIcon, color: "#FCC624" },
  { name: "Npm", icon: NpmIcon, color: "#CB3837" },
  { name: "Git", icon: GitIcon, color: "#F05032" },
];

export const languageIcons: TechnologyIcon[] = [
  { name: "TypeScript", icon: TypescriptIcon, color: "#3178C6" },
  { name: "JavaScript", icon: JavascriptIcon, color: "#F7DF1E" },
  { name: "HTML", icon: HtmlIcon, color: "#E34F26" },
  { name: "CSS", icon: CssIcon, color: "#1572B6" },
  { name: "Dart", icon: DartIcon, color: "#0175C2" },
];

export const frameworkIcons: TechnologyIcon[] = [
  { name: "React", icon: ReactjsIcon, color: "#61DAFB" },
  { name: "Next.js", icon: NextjsIcon, color: "#ffffff" },
  { name: "Express", icon: ExpressIcon, color: "#ffffff" },
  { name: "Flutter", icon: FlutterIcon, color: "#02569B" },
  { name: "Redux", icon: ReduxIcon, color: "#764ABC" },
];

export const toolsAndTechnologies: TechnologyIcon[] = [
  { name: "Node.js", icon: NodejsIcon, color: "#339933" },
  { name: "Styled Components", icon: StyledComponentsIcon, color: "#DB7093" },
  { name: "PostgreSQL", icon: PostgresIcon, color: "#4169E1" },
  { name: "Prisma", icon: PrismaIcon, color: "#ffffff" },
  { name: "Docker", icon: DockerIcon, color: "#2496ED" },
  { name: "Jest", icon: JestIcon, color: "#C21325" },
  { name: "Swagger", icon: SwaggerIcon, color: "#85EA2D" },
  { name: "Axios", icon: AxiosIcon, color: "#5A29E4" },
  { name: "GitHub Actions", icon: GithubActionsIcon, color: "#2088FF" },
  { name: "dotenv", icon: DotenvIcon, color: "#ECD53F" },
  { name: "Passport", icon: PassportIcon, color: "#34E27A" },
  { name: "Framer", icon: FramerIcon, color: "#ffffff" },
  { name: "Nginx", icon: NginxIcon, color: "#009639" },
  { name: "Storybook", icon: StorybookIcon, color: "#FF4785" },
];

export const allTechnologyIcons: TechnologyIcon[] = [
  ...environmentIcons,
  ...languageIcons,
  ...frameworkIcons,
  ...toolsAndTechnologies,
];

export {
  ReactjsIcon,
  TypescriptIcon,
  NodejsIcon,
  NextjsIcon,
  JavascriptIcon,
  HtmlIcon,
  CssIcon,
  StyledComponentsIcon,
  PostgresIcon,
  PrismaIcon,
  ExpressIcon,
  DockerIcon,
  JestIcon,
  SwaggerIcon,
  AxiosIcon,
  GithubIcon,
  GithubActionsIcon,
  DotenvIcon,
  PassportIcon,
  ReduxIcon,
  FlutterIcon,
  DartIcon,
  FramerIcon,
  LinuxIcon,
};
